import express from 'express';
import { Port } from './config/env';
import { CronJob } from 'cron'; 
import connectDB from './config/db';
import getCryptoData from './job/fetchcrypto';

const app = express();
connectDB()




const job = new CronJob('0 */2 * * *', getCryptoData);
job.start(); 

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
