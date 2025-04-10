import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Candlestick, ReferenceLine, ResponsiveContainer, Brush } from 'recharts';
import { format, parseISO } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { CandlestickData, TechnicalIndicator } from './types';
import { useInterval } from '../../contexts/IntervalContext';
import { CoinGeckoService } from '../../services/CoinGeckoService';

interface CandlestickChartProps {
    coinId: string;
    width?: number;
    height?: number;
    indicators?: TechnicalIndicator[];
}

export const CandlestickChart = ({ 
    coinId,
    width = 800, 
    height = 600,
    indicators = [
        { name: '20 SMA', values: [], color: '#4299e1', strokeWidth: 2 },
        { name: '50 SMA', values: [], color: '#48bb78', strokeWidth: 2 },
        { name: 'RSI', values: [], color: '#ed8936', strokeWidth: 1 },
        { name: 'MACD', values: [], color: '#4a5568', strokeWidth: 1 }
    ]
}: CandlestickChartProps) => {
    const { currentInterval, intervals, setCurrentInterval } = useInterval();
    const [data, setData] = useState<CandlestickData[]>([]);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const [dragBox, setDragBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [brushDomain, setBrushDomain] = useState<any>(null);

    const coinGeckoService = CoinGeckoService.getInstance();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const candles = await coinGeckoService.getHistoricalData(coinId, 30, intervals.find(i => i.id === currentInterval)!);
                setData(candles);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [coinId, currentInterval]);

    // Calculate volume color based on price movement
    const getVolumeColor = (index: number): string => {
        if (index === 0) return '#82ca9d';
        const prevClose = data[index - 1].close;
        const currentClose = data[index].close;
        return currentClose > prevClose ? '#82ca9d' : '#ff7300';
    };

    return (
        <div 
            ref={chartRef}
            className="relative"
            style={{ width: width, height: height }}
        >
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/80">
                <select 
                    value={currentInterval}
                    onChange={(e) => {
                        const newInterval = e.target.value;
                        const interval = intervals.find(i => i.id === newInterval);
                        if (interval) {
                            setCurrentInterval(newInterval);
                        }
                    }}
                    className="px-2 py-1 border rounded"
                >
                    {intervals.map(interval => (
                        <option key={interval.id} value={interval.id}>
                            {interval.label}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Loading data...
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        
                        <XAxis 
                            dataKey="time" 
                            tickFormatter={(time: string) => format(parseISO(time), 'HH:mm')}
                            stroke="#666"
                        />
                        
                        <YAxis 
                            tickFormatter={(value: number) => `$${value.toFixed(2)}`}
                            stroke="#666"
                        />
                        
                        <Candlestick 
                            dataKey={{ open: 'open', high: 'high', low: 'low', close: 'close' }}
                            width={4}
                            stroke="#4a5568"
                            fill="#4a5568"
                            name="Price"
                        />
                        
                        {indicators.map((indicator, index) => (
                            <Line 
                                key={index}
                                type="monotone" 
                                dataKey={(d: CandlestickData, i: number) => indicator.values[i]}
                                stroke={indicator.color}
                                strokeWidth={indicator.strokeWidth}
                                dot={false}
                                name={indicator.name}
                            />
                        ))}
                        
                        <LineChart 
                            data={data}
                            width={width}
                            height={100}
                            margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
                        >
                            <XAxis hide />
                            <YAxis hide />
                            <Line 
                                type="monotone" 
                                dataKey="volume"
                                stroke={(d: CandlestickData, i: number) => getVolumeColor(i)}
                                strokeWidth={1}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                        
                        <ReferenceLine 
                            y={data[data.length - 1].close}
                            stroke="#4a5568"
                            strokeDasharray="3 3"
                            label={{
                                value: `$${data[data.length - 1].close.toFixed(2)}`,
                                position: 'left',
                                fill: '#4a5568'
                            }}
                        />
                        
                        <Brush
                            dataKey="time"
                            height={30}
                            stroke="#8884d8"
                            onChange={(data) => setBrushDomain(data)}
                            tickFormatter={(time: string) => format(parseISO(time), 'HH:mm')}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};
