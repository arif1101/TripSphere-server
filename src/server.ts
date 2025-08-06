/* eslint-disable no-console */

import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/modules/utils/seedSuperAdmin";
import { connectRedis } from "./app/config/redis.config";

let server: Server;


const startServer = async () => {
    try{
        await mongoose.connect(envVars.DB_URL)

        console.log("Connect to DB!!")

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

(
async() => {
    await connectRedis()
    await startServer()
    await seedSuperAdmin()
})()

// -------- error -1 ==> unhandle rejection --------
process.on("unhandledRejection", () => {
    console.log("Unhandle Rejection detected... server shutting down")

    if(server){
        server.close(()=> {
            process.exit(1)
        });
    }
    process.exit(1)
})

// -------- error -1 ==> uncaughtException rejection --------
process.on("uncaughtException", () => {
    console.log("uncaughtException Rejection detected... server shutting down")

    if(server){
        server.close(()=> {
            process.exit(1)
        });
    }
    process.exit(1)
})


process.on("SIGTERM", () => {
    console.log("SIGTERM signal recived...  server shutting down")

    if(server){
        server.close(()=> {
            process.exit(1)
        });
    }
    process.exit(1)
})
process.on("SIGINT", () => {
    console.log("SIGINT signal recived...  server shutting down")

    if(server){
        server.close(()=> {
            process.exit(1)
        });
    }
    process.exit(1)
})

// Promise.reject(new Error("I forgot to catch this promise"))
// throw new Error("I forgot to handle this local  error")