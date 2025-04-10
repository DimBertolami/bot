import axios from 'axios';
import { CandlestickData } from '../components/charts/types';
import { IntervalConfig } from '../config/intervals';
import { useInterval } from '../contexts/IntervalContext';

interface CoinGeckoResponse {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

interface RateLimitConfig {
    maxRequests: number;
    resetIntervalMs: number;
}

export class CoinGeckoService {
    private static instance: CoinGeckoService;
    private lastFetchTime: Map<string, number> = new Map();
    private requestCount: Map<string, number> = new Map();
    private lastResetTime: Map<string, number> = new Map();
    private rateLimitConfig: RateLimitConfig = {
        maxRequests: 10, // Maximum requests per reset interval
        resetIntervalMs: 1000 * 60 // Reset every 1 minute
    };
    private baseUrl = 'https://api.coingecko.com/api/v3';

    private constructor() {}

    public static getInstance(): CoinGeckoService {
        if (!CoinGeckoService.instance) {
            CoinGeckoService.instance = new CoinGeckoService();
        }
        return CoinGeckoService.instance;
    }

    private checkRateLimit(interval: IntervalConfig): Promise<void> {
        const intervalId = interval.id;
        const currentTime = Date.now();

        // Check if we need to reset the request count
        const lastReset = this.lastResetTime.get(intervalId) || 0;
        if (currentTime - lastReset >= this.rateLimitConfig.resetIntervalMs) {
            this.requestCount.set(intervalId, 0);
            this.lastResetTime.set(intervalId, currentTime);
        }

        // Check if we've reached the max requests
        const currentCount = this.requestCount.get(intervalId) || 0;
        if (currentCount >= this.rateLimitConfig.maxRequests) {
            const waitTime = this.rateLimitConfig.resetIntervalMs - (currentTime - lastReset);
            return new Promise(resolve => setTimeout(resolve, waitTime));
        }

        // Check interval-specific minimum pause
        const lastFetch = this.lastFetchTime.get(intervalId) || 0;
        const timeSinceLastFetch = currentTime - lastFetch;
        if (timeSinceLastFetch < interval.minPauseMs) {
            const waitTime = interval.minPauseMs - timeSinceLastFetch;
            return new Promise(resolve => setTimeout(resolve, waitTime));
        }

        // Update request count and last fetch time
        this.requestCount.set(intervalId, currentCount + 1);
        this.lastFetchTime.set(intervalId, currentTime);
        return Promise.resolve();
    }

    private formatCandlestickData(
        prices: [number, number][],
        volumes: [number, number][],
        interval: IntervalConfig
    ): CandlestickData[] {
        const candles: CandlestickData[] = [];
        const priceMap = new Map(prices.map(([ts, price]) => [ts, price]));
        const volumeMap = new Map(volumes.map(([ts, volume]) => [ts, volume]));

        const timestamps = Array.from(new Set([...priceMap.keys(), ...volumeMap.keys()])).sort();

        for (let i = 0; i < timestamps.length; i++) {
            const ts = timestamps[i];
            const price = priceMap.get(ts) || 0;
            const volume = volumeMap.get(ts) || 0;

            // Calculate OHLC values for the interval
            const endTs = ts;
            const startTs = endTs - (parseInt(interval.apiInterval) * 60 * 1000);

            const pricesInInterval = Array.from(priceMap.entries())
                .filter(([k, _]) => k >= startTs && k <= endTs)
                .map(([_, v]) => v);

            if (pricesInInterval.length > 0) {
                candles.push({
                    time: new Date(endTs).toISOString(),
                    open: pricesInInterval[0],
                    high: Math.max(...pricesInInterval),
                    low: Math.min(...pricesInInterval),
                    close: pricesInInterval[pricesInInterval.length - 1],
                    volume: volume
                });
            }
        }

        return candles;
    }

    public async getHistoricalData(
        coinId: string,
        days: number = 30,
        interval: IntervalConfig = DEFAULT_INTERVAL
    ): Promise<CandlestickData[]> {
        try {
            await this.checkRateLimit(interval);

            const response = await axios.get<CoinGeckoResponse>(
                `${this.baseUrl}/coins/${coinId}/market_chart`,
                {
                    params: {
                        vs_currency: 'usd',
                        days: days,
                        interval: interval.apiInterval + 'm'
                    }
                }
            );

            const candles = this.formatCandlestickData(
                response.data.prices,
                response.data.total_volumes,
                interval
            );

            return candles;
        } catch (error) {
            console.error('Error fetching data from CoinGecko:', error);
            throw error;
        }
    }
}
