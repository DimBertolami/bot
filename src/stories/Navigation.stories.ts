import React from 'react';
import { Navigation } from '../components/Navigation';

export default {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    activePath: '/',
    onNavigate: (path: string) => console.log('Navigating to:', path),
  },
};

export const WithCustomNavigationItems = {
  args: {
    activePath: '/custom',
    onNavigate: (path: string) => console.log('Navigating to:', path),
    navigationItems: [
      {
        id: 'dashboard',
        label: 'Custom Dashboard',
        icon: () => <div className="w-4 h-4 bg-blue-500 rounded" />,
        path: '/custom'
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: () => <div className="w-4 h-4 bg-green-500 rounded" />,
        path: '/settings'
      }
    ]
  },
};
