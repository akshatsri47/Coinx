import { Request, Response } from 'express';
import crypto from '../model/crypto';

export const getDeviation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coin } = req.query;


    if (!coin) {
      res.status(400).json({ error: 'Coin parameter is required' });
      return;
    }

    const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
    if (!validCoins.includes(coin as string)) {
      res.status(400).json({ error: `Invalid coin parameter. Valid options are: ${validCoins.join(', ')}` });
      return;
    }

    
    const records = await crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (records.length === 0) {
      res.status(404).json({ error: 'No data found for the requested coin' });
      return;
    }

   
    const prices = records.map((record) => record.price).filter((price) => price !== undefined);

    
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    
    res.status(200).json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
