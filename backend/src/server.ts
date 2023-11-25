import express, {json} from "express";
import dotenv from 'dotenv'

dotenv.config();

const app = express();


app.use(json());

const port = process.env.PORT || 9600

app.listen(port, () => {
    console.log(`server up and running at port ${port}`)
})
