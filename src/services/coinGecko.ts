import axios from 'axios';

const API_BASE = 'https://api.coingecko.com/api/v3';

export interface CoinGeckoMarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export const fetchCoinData = async (
  coinId: string,
  vsCurrency: string = 'usd',
  days: number | string = 'max',
  interval: 'daily' | 'hourly' | 'minute' = 'daily'
): Promise<CoinGeckoMarketData> => {
  try {
    const { data } = await axios.get(`${API_BASE}/coins/${coinId}/market_chart`, {
      params: { vs_currency: vsCurrency, days, interval }
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch CoinGecko data:', error);
    throw error;
  }
};

export const getSupportedCoins = async (): Promise<Array<{
  id: string;
  symbol: string;
  name: string;
}>> => {
  try {
    const { data } = await axios.get(`${API_BASE}/coins/list`);
    return data;
  } catch (error) {
    console.error('Failed to fetch supported coins:', error);
    throw error;
  }
};
