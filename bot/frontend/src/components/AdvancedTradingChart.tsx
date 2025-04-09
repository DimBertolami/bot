import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { ChartData } from '../types/ChartData';
import { Data, Layout } from 'plotly.js';

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
  const [chartData, setChartData] = useState<Data[]>([]);
  const [layout, setLayout] = useState<Partial<Layout>>({});

  useEffect(() => {
    if (!data || loading) return;

    // Create a trace for each indicator
    const createTrace = (data: ChartData, name: string, color: string, lineType: 'solid' | 'dash' | 'dot' = 'solid', visible: boolean = true): Data => ({
      x: data.timestamp,
      y: data.price,
      name,
      type: 'scatter',
      line: { 
        color,
        width: 2,
        dash: lineType
      },
      visible: visible ? true : 'legendonly'
    });

    // Create all the traces for our chart
    const traces = [
      // Actual Price (solid line)
      createTrace(data, 'Actual Price', '#000000', 'solid', true),
      
      // Moving Averages (dashed lines)
      {
        x: data.timestamp,
        y: data.sma20,
        name: 'SMA 20',
        type: 'scatter' as const,
        line: { 
          color: '#2E8B57',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: data.sma50,
        name: 'SMA 50',
        type: 'scatter' as const,
        line: { 
          color: '#FFD700',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: data.sma200,
        name: 'SMA 200',
        type: 'scatter' as const,
        line: { 
          color: '#FF4500',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      
      // Exponential Moving Averages (dotted lines)
      {
        x: data.timestamp,
        y: data.ema12,
        name: 'EMA 12',
        type: 'scatter' as const,
        line: { 
          color: '#00BFFF',
          width: 2,
          dash: 'dot' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: data.ema26,
        name: 'EMA 26',
        type: 'scatter' as const,
        line: { 
          color: '#FF69B4',
          width: 2,
          dash: 'dot' as const
        },
        visible: true
      },
      
      // RSI with thresholds (dashed line)
      {
        x: data.timestamp,
        y: data.rsi,
        name: 'RSI (14)',
        type: 'scatter' as const,
        line: { 
          color: '#00BFFF',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: Array(data.timestamp.length).fill(70),
        name: 'RSI Overbought',
        type: 'scatter' as const,
        line: { 
          color: '#FF0000',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: Array(data.timestamp.length).fill(30),
        name: 'RSI Oversold',
        type: 'scatter' as const,
        line: { 
          color: '#00FF00',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      
      // MACD (dotted line with signal)
      {
        x: data.timestamp,
        y: data.macd,
        name: 'MACD',
        type: 'scatter' as const,
        line: { 
          color: '#FFA500',
          width: 2,
          dash: 'dot' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: data.macdSignal,
        name: 'MACD Signal',
        type: 'scatter' as const,
        line: { 
          color: '#808080',
          width: 2,
          dash: 'dot' as const
        },
        visible: true
      },
      
      // Bollinger Bands (dashed lines)
      {
        x: data.timestamp,
        y: data.bollingerUpper,
        name: 'Bollinger Upper',
        type: 'scatter' as const,
        line: { 
          color: '#A9A9A9',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      },
      {
        x: data.timestamp,
        y: data.bollingerLower,
        name: 'Bollinger Lower',
        type: 'scatter' as const,
        line: { 
          color: '#A9A9A9',
          width: 2,
          dash: 'dash' as const
        },
        visible: true
      }
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
