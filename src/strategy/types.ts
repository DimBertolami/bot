export interface StrategyPerformanceMetrics {
    name: string;
    value: number;
    description?: string;
}

export interface Trade {
    entryPrice: number;
    exitPrice: number;
    entryTime: Date;
    exitTime: Date;
    size: number;
    type: 'long' | 'short';
    profit: number;
    fees: number;
}

export interface StrategyParameters {
    [key: string]: any;
}

export interface BacktestResult {
    metrics: StrategyPerformanceMetrics[];
    trades: Trade[];
    totalProfit: number;
    totalFees: number;
    totalTrades: number;
    winRate: number;
    maxDrawdown: number;
    sharpeRatio: number;
    sortinoRatio: number;
}
