import exp from 'constants';
import dotenv from 'dotenv';
dotenv.config();

export const Port = process.env.PORT
export const MONGO_URI=process.env.MONGO_URI
export const  COINGECKO_API_KEY = process.env.COINGECKO_API_KE