import React from 'react';
import { useInterval } from '../contexts/IntervalContext';
import { INTERVALS } from '../config/intervals';

const IntervalSelector: React.FC = () => {
    const { currentInterval, setCurrentInterval } = useInterval();

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200">
            <select 
                value={currentInterval}
                onChange={(e) => setCurrentInterval(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {INTERVALS.map(interval => (
                    <option 
                        key={interval.id} 
                        value={interval.id}
                        className="text-gray-700"
                    >
                        {interval.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default IntervalSelector;
