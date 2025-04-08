export interface ChartData {
    timestamp: string[];
    price: number[];
    sma20: number[];
    sma50: number[];
    sma200: number[];
    ema12: number[];
    ema26: number[];
    macd: number[];
    macdSignal: number[];
    rsi: number[];
    bollingerUpper: number[];
    bollingerLower: number[];
}
