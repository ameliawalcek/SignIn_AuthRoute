import express from "express"
const userRouter = express.Router()

import { signIn, signUp } from "../controllers/user.js"

userRouter.post("/signin", signIn)
userRouter.post("/signup", signUp)

export default userRouter