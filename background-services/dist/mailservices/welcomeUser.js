"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeUser = void 0;
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const sqlConfig_1 = require("../config/sqlConfig");
const emailHelpers_1 = require("../helpers/emailHelpers");
dotenv_1.default.config();
const welcomeUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
    console.log('Welcome user function is reached');
    const users = yield (yield pool.request().query("SELECT * FROM users WHERE welcomed = 0")).recordset;
    console.log(users);
    for (let user of users) {
        ejs_1.default.renderFile("templates/welcomeUser.ejs", { Name: user.username }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Welcome Onboard",
                html: data,
            };
            try {
                yield (0, emailHelpers_1.sendEmail)(mailOptions);
                yield pool
                    .request()
                    .query("UPDATE users SET welcomed = 1 WHERE welcomed = 0");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.welcomeUser = welcomeUser;
