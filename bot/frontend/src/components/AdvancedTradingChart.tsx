import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { ChartData } from '../types/ChartData';

interface AdvancedTradingChartProps {
  data: ChartData;
  height?: number;
  loading?: boolean;
}

const AdvancedTradingChart: React.FC<AdvancedTradingChartProps> = ({ 
  data, 
  height = 600,
  loading = false 
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [layout, setLayout] = useState<any>({});

  useEffect(() => {
    if (!data || loading) return;

    // Create a trace for each indicator
    const createTrace = (data, name, color, lineType = 'solid', visible = true) => ({
      x: data.timestamp,
      y: data.values,
      name,
      type: 'scatter',
      line: { 
        color,
        width: 2,
        dash: lineType
      },
      visible: visible ? 'true' : 'legendonly'
    });

    // Create all the traces for our chart
    const traces = [
      // Actual Price (solid line)
      createTrace(data.price, 'Actual Price', '#000000', 'solid', true),
      
      // Moving Averages (dashed lines)
      createTrace(data.sma20, 'SMA 20', '#2E8B57', 'dash', true),
      createTrace(data.sma50, 'SMA 50', '#FFD700', 'dash', true),
      createTrace(data.sma200, 'SMA 200', '#FF4500', 'dash', true),
      
      // Exponential Moving Averages (dotted lines)
      createTrace(data.ema12, 'EMA 12', '#00BFFF', 'dot', true),
      createTrace(data.ema26, 'EMA 26', '#FF69B4', 'dot', true),
      
      // RSI with thresholds (dashed line)
      createTrace({
        timestamp: data.timestamp,
        values: data.rsi
      }, 'RSI (14)', '#00BFFF', 'dash', true),
      createTrace({
        timestamp: data.timestamp,
        values: Array(data.timestamp.length).fill(70)
      }, 'RSI Overbought', '#FF0000', 'dash', true),
      createTrace({
        timestamp: data.timestamp,
        values: Array(data.timestamp.length).fill(30)
      }, 'RSI Oversold', '#00FF00', 'dash', true),
      
      // MACD (dotted line with signal)
      createTrace(data.macd, 'MACD', '#FFA500', 'dot', true),
      createTrace(data.macdSignal, 'MACD Signal', '#808080', 'dot', true),
      
      // Bollinger Bands (dashed lines)
      createTrace(data.bollingerUpper, 'Bollinger Upper', '#A9A9A9', 'dash', true),
      createTrace(data.bollingerLower, 'Bollinger Lower', '#A9A9A9', 'dash', true)
    ];

    setChartData(traces);

    // Set up the chart layout
    setLayout({
      title: {
        text: 'Advanced Trading Analysis',
        font: { size: 24 },
        x: 0.5
      },
      xaxis: {
        autorange: true,
        title: {
          text: 'Time',
          font: { size: 16 }
        },
        rangeslider: { visible: true }
      },
      yaxis: {
        title: {
          text: 'Price',
          font: { size: 16 }
        },
        side: 'left',
        showgrid: true,
        gridcolor: '#f0f0f0'
      },
      yaxis2: {
        title: {
          text: 'RSI',
          font: { size: 16 }
        },
        side: 'right',
        overlaying: 'y',
        range: [0, 100],
        showgrid: true,
        gridcolor: '#f0f0f0'
      },
      yaxis3: {
        title: {
          text: 'MACD',
          font: { size: 16 }
        },
        side: 'right',
        overlaying: 'y',
        anchor: 'free',
        position: 1.05,
        showgrid: true,
        gridcolor: '#f0f0f0'
      },
      legend: {
        x: 1,
        y: 1,
        xanchor: 'right',
        yanchor: 'top',
        font: { size: 12 }
      },
      margin: {
        l: 50,
        r: 100,
        t: 100,
        b: 50
      },
      hovermode: 'x unified',
      paper_bgcolor: '#f5f5f5',
      plot_bgcolor: '#ffffff'
    });
  }, [data, loading]);

  return (
    <div className="chart-container">
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <Plot
          data={chartData}
          layout={layout}
          config={{
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'],
            displaylogo: false
          }}
          style={{ width: '100%', height: `${height}px` }}
        />
      )}
    </div>
  );
};

export default AdvancedTradingChart;
