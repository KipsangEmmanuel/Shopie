import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET as string;

export const generateToken = (
    email: string,
    id: string,
    username: string,
    role: string
): string => {
    return jwt.sign(
        {
            username,
            email,
            id,
            role,
        },
        secretKey,
        {expiresIn: '24hr'}
    );
};