import mongoose, { Schema } from "mongoose";


export interface Cryptocurr extends Document {
    coin:string,
    price:number,
    marketCap:number,
    change24h:number,
    timestamp:Date
}

const CryptoSchema: Schema = new Schema({

    coin: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  });

export default mongoose.model<Cryptocurr>('Crypto',CryptoSchema)

