import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';

export default {
  title: 'Components/ThemeToggle',
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <ThemeProvider>
      <button 
        data-theme="light" 
        onClick={() => {
          const theme = document.documentElement.getAttribute('data-theme');
          document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
        }}
        className="p-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Toggle Theme
      </button>
    </ThemeProvider>
  ),
};

export const WithLightTheme = {
  render: () => (
    <ThemeProvider>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-800">This is light theme content</p>
      </div>
    </ThemeProvider>
  ),
};

export const WithDarkTheme = {
  render: () => (
    <ThemeProvider>
      <div className="bg-gray-900 p-4 rounded-lg shadow">
        <p className="text-gray-200">This is dark theme content</p>
      </div>
    </ThemeProvider>
  ),
};
