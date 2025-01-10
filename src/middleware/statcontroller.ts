import { Request, Response } from 'express';
import crypto from '../model/crypto';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coin } = req.query;

    
    if (!coin) {
      res.status(400).json({ error: 'Coin parameter is required' });
      return;
    }

    
    const latestData = await crypto.findOne({ coin }).sort({ timestamp: -1 });

    
    if (!latestData) {
      res.status(404).json({ error: 'No data found for the requested coin' });
      return;
    }

    
    res.status(200).json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData["24hChange"], 
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
