import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../config/sqlConfig";
import { v4 } from "uuid";
import { Request, response, Response } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/userValidator";
import Connection from "../services/dbConnect";
import { ExtendedUser } from "../middleware/verifyToken";

const dbhelpers = new Connection();

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;
    let _id = v4();
    let { error } = validateRegisterUser.validate(req.body);

    if (error) {
      return res.status(404).json({
        message: "Either username, email or password may be incorrect ",
        error: error.details,
      });
    }

    const hashedPwd = await bcrypt.hash(password, 5);

    const pool = await mssql.connect(sqlConfig);

    let result = await pool
      .request()
      .input("_id", mssql.VarChar, _id)
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

    const user = (
      await pool.request().input("email", email).execute("loginUser")
    ).recordset;

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
      expiresIn: "48hr",
    });

    return res.status(200).json({
      message: "Logged in Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const checkUserDetails = async (
  request: ExtendedUser,
  res: Response
) => {
  try {
    const userInfo = request.info;
    console.log(userInfo);

    if (userInfo) {
      console.log(userInfo);

      return res.json({
        info: userInfo,
      });
    } else {
      return res.status(404).json({
        error: "User details not found",
      });
    }
  } catch (error) {
    console.error("Error checking user details:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    console.log(_id);

    const deleteUser = await dbhelpers.execute("deleteUser", { _id });

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};


