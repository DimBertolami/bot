import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RiskMetric {
    name: string;
    value: number;
    color: string;
}

export const RiskMetrics = ({ metrics }: { metrics: RiskMetric[] }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">{metric.name}</h3>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={[{ name: metric.name, value: metric.value }]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" hide />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill={metric.color} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};
