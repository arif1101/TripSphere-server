/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import httpstatus from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { success } from "zod";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const user = await UserServices.createUser(req.body)

    // res.status(httpstatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res,{
        success: true,
        statusCode: httpstatus.CREATED,
        message: "Created User Successfully",
        data: user,
    })
})

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    // res.status(httpstatus.OK).json({
    //     success: true,
    //     message: "All Users Retrived Successfully",
    //     data: users
    // })

    sendResponse(res,{
        success: true,
        statusCode: httpstatus.CREATED,
        message: "All User Retrived Successfully",
        data: result.data,
        meta: result.meta
    })
    
})

export const UserControllers = {
    createUser,
    getAllUsers
}

// working process 
// route matching -> controller -> service -> model -> DB