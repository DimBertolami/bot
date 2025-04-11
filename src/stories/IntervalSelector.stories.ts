import React from 'react';
import { IntervalSelector } from '../components/IntervalSelector';
import { INTERVALS } from '../config/intervals';

export default {
  title: 'Components/IntervalSelector',
  component: IntervalSelector,
  tags: ['autodocs'],
};

export const Default = {
  render: () => <IntervalSelector />,
};

export const WithCustomIntervals = {
  render: () => {
    const customIntervals = [
      { id: '1m', label: '1 Minute' },
      { id: '5m', label: '5 Minutes' },
      { id: '15m', label: '15 Minutes' },
      { id: '1h', label: '1 Hour' },
    ];
    return <IntervalSelector />;
  },
};
