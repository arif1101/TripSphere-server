import { Router } from "express";
import { UserRoutes } from "../user/user.route";
import { AuthRoutes } from "../auth/auth.route";
import { TourRoutes } from "../tour/Tour.route";
import { DivisionRoutes } from "../division/division.route";

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/tour",
        route: TourRoutes
    },
    {
        path: "/division",
        route: DivisionRoutes
    }

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})