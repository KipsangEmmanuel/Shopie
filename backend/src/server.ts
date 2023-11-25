import express, {json, NextFunction, Request, Response} from "express";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();


app.use(json());
app.use(cors());

app.use((error: Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: error.message
    })
})


const port = process.env.PORT || 9600

app.listen(port, () => {
    console.log(`server up and running at port ${port}`)
})
