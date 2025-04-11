import React from 'react';
import { PriceChart } from '../components/charts/PriceChart';
import { mockPriceData } from '../mocks/mockData';

export default {
  title: 'Charts/PriceChart',
  component: PriceChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => <PriceChart data={mockPriceData} />,
};

export const WithCustomRange = {
  args: {
    data: mockPriceData.slice(0, 50),
  },
};

export const WithMultipleSeries = {
  render: () => (
    <PriceChart
      data={[
        ...mockPriceData,
        ...mockPriceData.map(d => ({ ...d, price: d.price * 1.1, series: 'Series 2' })),
      ]}
    />
  ),
};
