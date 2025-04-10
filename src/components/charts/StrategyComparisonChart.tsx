import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface StrategyData {
    time: Date;
    strategy1: number;
    strategy2: number;
    strategy3: number;
}

export const StrategyComparisonChart = ({ data }: { data: StrategyData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="time" 
                    tickFormatter={(time) => format(new Date(time), 'MMM d')}
                />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="strategy1" 
                    name="Strategy 1" 
                    stroke="#8884d8"
                    strokeWidth={2}
                />
                <Line 
                    type="monotone" 
                    dataKey="strategy2" 
                    name="Strategy 2" 
                    stroke="#82ca9d"
                    strokeWidth={2}
                />
                <Line 
                    type="monotone" 
                    dataKey="strategy3" 
                    name="Strategy 3" 
                    stroke="#ffc658"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
