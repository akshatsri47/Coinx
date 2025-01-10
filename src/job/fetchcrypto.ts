import axios from 'axios';
import crypto from '../model/crypto';

interface CryptoData {
  [key: string]: {
    usd: number;
    usd_market_cap?: number;
    usd_24h_change?: number;
  };
}

const getCryptoData = async (): Promise<void> => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];

    const COINGECKO_API_KEY = process.env.COIN_API_KEY;

    for (const coin of coins) {
      const response = await axios.get<CryptoData>("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: coin,
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_change: 'true',
        },
        headers: {
          'x-cg-demo-api-key': COINGECKO_API_KEY,
        },
      });

      const coinData = response.data[coin];
      if (coinData) {
        const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = coinData;

        // Store data in the database
        await crypto.create({
          coin,
          price,
          marketCap,
          change24h,
        });

        console.log(`Data for ${coin}:`, coinData);
      } else {
        console.warn(`No data found for ${coin}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching crypto data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export default getCryptoData;
