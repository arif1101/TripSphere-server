/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from "../utils/catchAsync"
import { Response, Request, NextFunction } from "express"
import { sendResponse } from "../utils/sendResponse"
import httpStatus from "http-status-codes"
import { authServices } from "./auth.service"
import AppError from "../../errorHelpers/AppError"
import { setAuthCookie } from "../utils/setCookie"
import { JwtPayload } from "jsonwebtoken"
import { createUserTokens } from "../utils/userTokens"
import { envVars } from "../../config/env"
import passport from "passport"


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", async(err: any, user: any, info: any) => {
        if(err){
            return next(new AppError(401, err))
        }
        if(!user){
            console.log(user)
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserTokens(user)
        const {password: pass, ...rest} = user.toObject()
        setAuthCookie(res, userTokens)
        
        sendResponse(res, { 
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            },
        })
        
    })(req,res,next)
})


const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved form cookies")
    }
    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string)

    setAuthCookie(res, tokenInfo)
    
    sendResponse(res, { 
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    
    sendResponse(res, { 
        success: true,
        statusCode: httpStatus.OK,
        message: "Logout Successfully",
        data: null,
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

    await authServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})

const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string: ""

    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1)
    }

    const user = req.user;

    // console.log("user", user)
    
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }
    const tokenInfo = await createUserTokens(user)

    setAuthCookie(res,tokenInfo)
    
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}