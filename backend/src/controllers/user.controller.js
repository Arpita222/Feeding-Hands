import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  const { fullname, email, username, password, role } = req.body;

  // if(fullName ===" "){
  //     throw new ApiError(400,"fullname is required")
  // }
  //Advance method of these ->
  //validation - not empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required !!");
  }
  const normalizedUsername = username.toLowerCase();

  //check if user already exists: username,email
  const existedUser = await User.findOne({
    $or: [{ username: normalizedUsername }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //create user object - create entry in db
  const user = await User.create({
    fullname: fullname,
    email,
    password,
    username: normalizedUsername,
    role,
  });

  //remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went Wrong while registering a user");
  }

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Sucessfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or password is required");
  }

  //find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  //password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  //generate access and refresh token
  // generateAccessAndRefereshTokens make method
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //send cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Succesfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //This is server-side logout.
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return (
    res
      .status(200)
      //This is client-side logout.
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"))
  );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unautorized request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or use");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, newrefreshToken } =
      await generateAccessAndRefereshTokens(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newrefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid refresh token")
  }
});

const changeCurrentPassword =asyncHandler(async(req,res) =>{

  const {oldPassword, newPassword} =req.body;
  const user =await User.findById(req.user?.id)
  const isPasswordCorrect =await user.
  isPasswordCorrect(oldPassword)

  if(!isPasswordCorrect){
    throw new ApiError(400,"Invalid old Password")
  }

  user.password= newPassword
  await user.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(new ApiResponse(200),{},"Password changed successfully")
})

const getCurrentUser = asyncHandler( async(req,res) =>{
  return res
  .status(200)
  .json(
    new ApiResponse(200,req.user,"current user fetched successfully")
  )
})

const updateAccountDetails = asyncHandler(async(req,res) =>{
  const {fullname,email} = req.body
  
  if(!(fullname || email)){
    throw new ApiError(400,"All fields are required")
  }
  const user =await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        fullname,
        email: email

      }
    },
    {new: true}
  ).select("-password")

  return res
  .status(200)
  .json(
    new ApiResponse(200,user,"Account details updated successfully")
  )
})

const getAllVolunteers = asyncHandler(async (req, res) => {
  const volunteers = await User.find({ role: "VOLUNTEER" }).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, volunteers, "Volunteers fetched successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

export { registerUser, loginUser, logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails,getAllVolunteers,getAllUsers, };
