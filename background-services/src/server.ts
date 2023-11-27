import express from 'express'
import cron from 'node-cron'
import { welcomeUser } from './mailservices/welcomeUser'


const app = express()

const run = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await welcomeUser()
    })
    
}

run()

const port = process.env.PORT || 4400

app.listen(port, ()=>{
    console.log(`Mail server up and running at port ${port}`); 
})