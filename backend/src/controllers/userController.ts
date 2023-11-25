import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../config/sqlConfig";
import { v4 } from "uuid";
import { request, Request, response, Response } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/userValidator";

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    let { error } = validateRegisterUser.validate(req.body);

    if (error) {
      return res.status(404).json({ 
        message: "Either username, email or password may be incorrect ",
        error: error.details 
      });
    }

    const hashedPwd = await bcrypt.hash(password, 5);

    const pool = await mssql.connect(sqlConfig);

    let result = await pool
      .request()
      .input("id", mssql.VarChar, v4())
      .input("username", mssql.VarChar, username)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar, hashedPwd)
      .execute("registerUser");

    console.log(result);

    return res.status(200).json({
      message: "User Registered Successfully!",
    });
    
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = validateLoginUser.validate(req.body);

    if (error) {
      return res.status(422).json({
        error: error.message,
      });
    }

    const pool = await mssql.connect(sqlConfig);

    const user = (await pool
      .request()
      .input("email", email)
      .execute("loginUser")).recordset;

    if (user.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const correctPwd = await bcrypt.compare(password, user[0]?.password);

    if (!correctPwd) {
      return res.status(401).json({
        error: "Incorrect Password",
      });
    }

    const { password: _, ...userInfo } = user[0];

    const token = jwt.sign(userInfo, process.env.SECRET as string, {
      expiresIn: '48hr',
    });

    return res.status(200).json({
      message: "Logged in Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const checkUserDetails = async (request: any, res: Response) => {
  if(request.info) {
    console.log(request.info)

    return response.json({
      info: request.info
    })
  }
};
