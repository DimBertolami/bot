import React, { createContext, useContext, useState, useEffect } from 'react';
import { INTERVALS, DEFAULT_INTERVAL } from '../config/intervals';

interface IntervalContextType {
    currentInterval: string;
    setCurrentInterval: (interval: string) => void;
    intervals: typeof INTERVALS;
}

const IntervalContext = createContext<IntervalContextType | undefined>(undefined);

export const IntervalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentInterval, setCurrentInterval] = useState(DEFAULT_INTERVAL.id);

    useEffect(() => {
        // Apply interval change to the entire application
        document.documentElement.dataset.interval = currentInterval;
    }, [currentInterval]);

    return (
        <IntervalContext.Provider value={{
            currentInterval,
            setCurrentInterval,
            intervals: INTERVALS
        }}>
            {children}
        </IntervalContext.Provider>
    );
};

export const useInterval = () => {
    const context = useContext(IntervalContext);
    if (context === undefined) {
        throw new Error('useInterval must be used within an IntervalProvider');
    }
    return context;
};
