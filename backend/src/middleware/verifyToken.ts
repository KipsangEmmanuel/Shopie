import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { checkDetailsUser } from "../types/userInterface";
dotenv.config();



export interface ExtendedUser extends Request {
    info?: checkDetailsUser;
}

export const verifyToken = (
    request: ExtendedUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = request.headers["token"] as string;
        // console.log(token);
        
        if (!token) {
          return res.status(401).json({
            message: "No token provided",
          });
        }
        const decoded = jwt.verify(
          token,
          process.env.SECRET as string
        ) as checkDetailsUser;
        console.log(decoded);
        
        request.info = decoded;
        console.log(request.info);
        
    } catch (error) {
        return res.json((error as Error).message);
    
    }

    next();
   
}
