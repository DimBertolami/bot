import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { format } from 'date-fns';
import { useInterval } from '../../contexts/IntervalContext';
import { CoinGeckoService } from '../../services/CoinGeckoService';
import { TechnicalIndicator } from './types';

interface EnhancedPriceChartProps {
  coinId: string;
  width?: number;
  height?: number;
}

const EnhancedPriceChart: React.FC<EnhancedPriceChartProps> = ({ coinId, width = 800, height = 600 }) => {
  const { currentInterval, intervals, setCurrentInterval } = useInterval();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndicator, setSelectedIndicator] = useState<string>('');
  const [cryptoOptions, setCryptoOptions] = useState<string[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState(coinId);
  const slotMachineRef = useRef<HTMLDivElement>(null);

  // Available technical indicators
  const indicators: TechnicalIndicator[] = [
    { name: '20 SMA', values: [], color: '#4299e1', strokeWidth: 2 },
    { name: '50 SMA', values: [], color: '#48bb78', strokeWidth: 2 },
    { name: '200 SMA', values: [], color: '#818cf8', strokeWidth: 2 },
    { name: 'RSI', values: [], color: '#ed8936', strokeWidth: 1 },
    { name: 'MACD', values: [], color: '#4a5568', strokeWidth: 1 },
    { name: 'Bollinger Upper', values: [], color: '#f6ad55', strokeWidth: 1, dashArray: '5 5' },
    { name: 'Bollinger Middle', values: [], color: '#f6ad55', strokeWidth: 1 },
    { name: 'Bollinger Lower', values: [], color: '#f6ad55', strokeWidth: 1, dashArray: '5 5' },
    { name: 'Volume', values: [], color: '#4fd1c5', strokeWidth: 1 }
  ];

  // Fetch data with rate limiting based on interval
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coinData = await CoinGeckoService.getHistoricalData(selectedCrypto, currentInterval);
        setData(coinData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Rate limiting based on interval
    const intervalMap = {
      '1m': 60000,
      '5m': 300000,
      '15m': 900000,
      '1h': 3600000
    };

    const timer = setInterval(fetchData, intervalMap[currentInterval]);
    return () => clearInterval(timer);
  }, [selectedCrypto, currentInterval]);

  // Slot machine animation
  const triggerSlotMachine = () => {
    const options = cryptoOptions;
    const randomIndex = Math.floor(Math.random() * options.length);
    const newCrypto = options[randomIndex];
    
    // Animate the slot machine
    const slotMachine = slotMachineRef.current;
    if (slotMachine) {
      slotMachine.style.transform = 'rotateY(360deg)';
      slotMachine.style.transition = 'transform 0.5s ease-out';
      
      setTimeout(() => {
        slotMachine.style.transform = 'rotateY(0deg)';
        setSelectedCrypto(newCrypto);
      }, 500);
    }
  };

  // Calculate technical indicators
  const calculateIndicators = (priceData: any[]) => {
    // Implement indicator calculations here
    // This is a placeholder for actual calculations
    return indicators.map(indicator => ({
      ...indicator,
      values: priceData.map(d => d.close) // Placeholder with price data
    }));
  };

  const indicatorData = calculateIndicators(data);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="p-2 border rounded"
          >
            {cryptoOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <div
            ref={slotMachineRef}
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            onClick={triggerSlotMachine}
          >
            Slot
          </div>
        </div>
        
        <div className="flex space-x-2">
          {intervals.map(interval => (
            <button
              key={interval.id}
              onClick={() => setCurrentInterval(interval.id)}
              className={`px-4 py-2 rounded ${
                currentInterval === interval.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200'
              }`}
            >
              {interval.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(time) => format(new Date(time), 'MMM d')}
            />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            
            {/* Price Line */}
            <Line 
              type="monotone" 
              dataKey="close" 
              name="Price" 
              stroke="#4299e1" 
              strokeWidth={2}
            />
            
            {/* Indicators */}
            {indicatorData.map((indicator, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={indicator.name}
                stroke={indicator.color}
                strokeWidth={indicator.strokeWidth}
                dot={false}
                name={indicator.name}
                strokeDasharray={indicator.dashArray}
              />
            ))}
            
            {/* Volume Area Chart */}
            <AreaChart 
              data={data}
              width={width}
              height={100}
              margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(time) => format(new Date(time), 'MMM d')}
              />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#4fd1c5"
                fill="rgba(79, 209, 197, 0.1)"
              />
            </AreaChart>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <Legend 
          wrapperStyle={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            gap: '1rem'
          }}
          onClick={(entry) => {
            const updatedIndicator = indicators.find(i => i.name === entry.name);
            if (updatedIndicator) {
              setSelectedIndicator(entry.name);
            }
          }}
          onMouseOver={(entry) => {
            const updatedIndicator = indicators.find(i => i.name === entry.name);
            if (updatedIndicator) {
              setSelectedIndicator(entry.name);
            }
          }}
          onMouseOut={() => setSelectedIndicator('')}
        />
      </div>
    </div>
  );
};

export default EnhancedPriceChart;
