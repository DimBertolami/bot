import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PriceData {
    time: Date;
    price: number;
    volume: number;
}

export const PriceChart = ({ data }: { data: PriceData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="time" 
                    tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="price" 
                    name="Price" 
                    stroke="#8884d8"
                    strokeWidth={2}
                />
                <Line 
                    type="monotone" 
                    dataKey="volume" 
                    name="Volume" 
                    stroke="#82ca9d"
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
