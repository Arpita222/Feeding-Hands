import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app =express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))  
app.use(express.urlencoded({extended :true ,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from './routes/user.routes.js'
import donationRouter from "./routes/donation.routes.js";
import impactRouter from "./routes/impact.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import donorRouter from "./routes/donor.routes.js";


//routes declaration (mount route)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/donations", donationRouter);
app.use("/api/v1/impact", impactRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/donor", donorRouter);


// http://localhost:8000/api/users/register

export { app }