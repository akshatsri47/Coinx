import express from 'express';
import { Port } from './config/env';
import { CronJob } from 'cron'; 
import connectDB from './config/db';
import getCryptoData from './job/fetchcrypto';
import router from './routes/routes';

const app = express();


connectDB()

app.use(express.json());
app.use("/",router);


const job = new CronJob('0 */2 * * *', getCryptoData);
job.start(); 

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
