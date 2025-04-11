import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { LayoutDashboard } from 'lucide-react';

function AppContent() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-900 flex data-[theme=light]:bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 shadow-md data-[theme=light]:bg-gray-50">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-400">CryptoWatch</h1>
        </div>
        <Navigation activePath={location.pathname} onNavigate={(path) => window.location.pathname = path} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-gray-800 shadow data-[theme=light]:bg-gray-50">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-100 data-[theme=light]:text-gray-900">Dashboard Overview</h2>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                priceData={[]}
                performanceData={[]} 
                riskMetrics={[]}
                strategyData={[]}
              />
            } />
            <Route path="/backtesting" element={<div>Backtesting Page</div>} />
            <Route path="/paper-trading" element={<div>Paper Trading Page</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;