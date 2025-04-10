export interface IntervalConfig {
    id: string;
    label: string;
    value: string;
    description: string;
    apiInterval: string;
    minPauseMs: number;
}

export const INTERVALS: IntervalConfig[] = [
    {
        id: '30s',
        label: '30 Seconds',
        value: '30s',
        description: '30-second candles',
        apiInterval: '30',
        minPauseMs: 1000 * 30 // 30 seconds
    },
    {
        id: '1m',
        label: '1 Minute',
        value: '1m',
        description: '1-minute candles',
        apiInterval: '1',
        minPauseMs: 1000 * 60 // 1 minute
    },
    {
        id: '5m',
        label: '5 Minutes',
        value: '5m',
        description: '5-minute candles',
        apiInterval: '5',
        minPauseMs: 1000 * 60 * 5 // 5 minutes
    },
    {
        id: '10m',
        label: '10 Minutes',
        value: '10m',
        description: '10-minute candles',
        apiInterval: '10',
        minPauseMs: 1000 * 60 * 10 // 10 minutes
    },
    {
        id: '30m',
        label: '30 Minutes',
        value: '30m',
        description: '30-minute candles',
        apiInterval: '30',
        minPauseMs: 1000 * 60 * 30 // 30 minutes
    },
    {
        id: '1h',
        label: '1 Hour',
        value: '1h',
        description: '1-hour candles',
        apiInterval: '60',
        minPauseMs: 1000 * 60 * 60 // 1 hour
    },
    {
        id: '1d',
        label: '1 Day',
        value: '1d',
        description: '1-day candles',
        apiInterval: '1440',
        minPauseMs: 1000 * 60 * 60 * 24 // 24 hours
    },
    {
        id: '1w',
        label: '1 Week',
        value: '1w',
        description: '1-week candles',
        apiInterval: '10080',
        minPauseMs: 1000 * 60 * 60 * 24 * 7 // 7 days
    },
    {
        id: '1mo',
        label: '1 Month',
        value: '1mo',
        description: '1-month candles',
        apiInterval: '43200',
        minPauseMs: 1000 * 60 * 60 * 24 * 30 // 30 days
    },
    {
        id: '1y',
        label: '1 Year',
        value: '1y',
        description: '1-year candles',
        apiInterval: '525600',
        minPauseMs: 1000 * 60 * 60 * 24 * 365 // 365 days
    }
];

export const DEFAULT_INTERVAL = INTERVALS[3]; // Default to 10-minute interval

export const getIntervalById = (id: string): IntervalConfig | undefined => {
    return INTERVALS.find(interval => interval.id === id);
};
