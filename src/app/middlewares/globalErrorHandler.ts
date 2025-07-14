/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { success } from "zod";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500
    let message = "Something Went Wrong!!"

    if(err instanceof AppError){
        statusCode = err.statusCode
        message = err.message
    } else if(err instanceof Error){
        statusCode = 5000
        message = err.message
    }
    
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV==="development" ? err.stack : null
    })
}