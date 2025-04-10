export interface CandlestickData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface TechnicalIndicator {
    name: string;
    values: number[];
    color: string;
    strokeWidth: number;
}

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
