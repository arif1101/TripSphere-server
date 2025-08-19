import { Response } from "express";
<<<<<<< HEAD
=======

>>>>>>> a0f77854f632e572c69954b6801cc907b9e262e3

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
<<<<<<< HEAD
            secure: true,
            sameSite: "none"
=======

>>>>>>> a0f77854f632e572c69954b6801cc907b9e262e3
        })
    }

    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
<<<<<<< HEAD
            secure: true,
            sameSite: "none"
=======

>>>>>>> a0f77854f632e572c69954b6801cc907b9e262e3
        })
    }
}