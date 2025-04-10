import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PerformanceData {
    time: Date;
    portfolioValue: number;
    benchmark: number;
}

export const PortfolioPerformanceChart = ({ data }: { data: PerformanceData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
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
                    dataKey="portfolioValue" 
                    name="Portfolio Value" 
                    stroke="#8884d8"
                    strokeWidth={2}
                />
                <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    name="Benchmark" 
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
