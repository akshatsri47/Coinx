# Cryptocurrency Data Fetcher and API

## Project Overview
This project is a server-side application that uses **Node.js** and **MongoDB** to:
1. Periodically fetch cryptocurrency data (Bitcoin, Matic, Ethereum) using the CoinGecko API.
2. Store the fetched data in a database.
3. Expose APIs to retrieve and analyze the stored data.

---

## Features

### 1. Background Job
- Fetches the following data every 2 hours:
  - Current price in USD.
  - Market cap in USD.
  - 24-hour change (percentage).
- Saves the data into MongoDB.

### 2. `/stats` API
- Returns the latest data for the requested cryptocurrency.
- Query Parameter: `coin` (e.g., bitcoin, matic-network, ethereum).

### 3. `/deviation` API
- Calculates the standard deviation of the `price` for the last 100 records of the requested cryptocurrency.
- Query Parameter: `coin` (e.g., bitcoin, matic-network, ethereum).

---

## Tech Stack
- **Backend**: Node.js (TypeScript)
- **Database**: MongoDB
- **Scheduler**: Node-Cron
- **HTTP Client**: Axios
- **API Provider**: [CoinGecko API](https://docs.coingecko.com/v3.0.1/reference/introduction)

---

##Configure Environment Variables

Create a .env file in the project root with the following content:

-**MONGO_URI**=mongodb://localhost:27017/crypto
-**COINGECKO_API**=https://api.coingecko.com/api/v3
-**PORT**=3000



## Run the Application
```bash
npm install
npm run dev


