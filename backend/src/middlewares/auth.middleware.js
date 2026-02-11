import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req,res, next) => {
  try {
    //It verifies the access token
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "Unauthorization request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //It finds the user in DB
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      //TODO:
      throw new ApiError(401, "Invalid Access Token");
    }

    //It attaches user to:
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token")
  }
});
