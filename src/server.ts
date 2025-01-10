import express from 'express';
import { Port } from './config/env'; 
import connectDB from './config/db';

const app = express();
connectDB()
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
