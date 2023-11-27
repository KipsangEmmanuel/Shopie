import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";
import { sqlConfig } from "../config/sqlConfig";
import { sendEmail } from "../helpers/emailHelpers";
dotenv.config();

export const welcomeUser = async () => {

  
  const pool = await mssql.connect(sqlConfig);


  console.log('Welcome user function is reached');

  const users = await (
    await pool.request().query("SELECT * FROM users WHERE welcomed = 0")
  ).recordset;
  

  console.log(users);

  for (let user of users) {
    ejs.renderFile(
      "templates/welcomeUser.ejs",
      { Name: user.username },
      async (error, data) => {
        let mailOptions = {
          from: process.env.EMAIL as string,
          to: user.email,
          subject: "Welcome Onboard",
          html: data,
        };

        try {
          await sendEmail(mailOptions);
          await pool
            .request()
            .query("UPDATE users SET welcomed = 1 WHERE welcomed = 0");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};
