import React from 'react';
import { IntervalProvider } from '../contexts/IntervalContext';
import IntervalSelector from '../components/IntervalSelector';
import { PriceChart } from '../components/charts/PriceChart';
import { PortfolioPerformanceChart } from '../components/charts/PortfolioPerformanceChart';
import { RiskMetrics } from '../components/charts/RiskMetrics';
import { StrategyComparisonChart } from '../components/charts/StrategyComparisonChart';

interface DashboardProps {
    priceData: any[];
    performanceData: any[];
    riskMetrics: any[];
    strategyData: any[];
}

export const Dashboard = ({ priceData, performanceData, riskMetrics, strategyData }: DashboardProps) => {
    return (
        <IntervalProvider>
            <div className="min-h-screen bg-gray-50">
                <IntervalSelector />
                
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Price Chart */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
                                <PriceChart data={priceData} />
                            </div>
                        </div>

                        {/* Portfolio Performance */}
                        <div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
                                <PortfolioPerformanceChart data={performanceData} />
                            </div>
                        </div>

                        {/* Risk Metrics */}
                        <div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Risk Metrics</h2>
                                <RiskMetrics 
                                    metrics={[
                                        { name: 'Sharpe Ratio', value: 2.5, color: '#8884d8' },
                                        { name: 'Max Drawdown', value: 15, color: '#82ca9d' },
                                        { name: 'Win Rate', value: 65, color: '#ffc658' },
                                        { name: 'Profit Factor', value: 1.8, color: '#ff7300' }
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Strategy Comparison */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Strategy Comparison</h2>
                                <StrategyComparisonChart data={strategyData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IntervalProvider>
    );
};
