/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from "../utils/catchAsync"
import { Response, Request, NextFunction } from "express"
import { sendResponse } from "../utils/sendResponse"
import httpStatus from "http-status-codes"
import { authServices } from "./auth.service"


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await authServices.credentialsLogin(req.body)
    
    sendResponse(res, { 
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
})

export const AuthControllers = {
    credentialsLogin
}