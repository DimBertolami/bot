import React, { useState } from 'react';
import { LayoutDashboard, Lightbulb, BarChart, DollarSign, Clock, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Icon wrapper component to handle className prop
const IconWrapper: React.FC<{ icon: React.ComponentType<any>, className?: string }> = ({ icon: Icon, className }) => (
  <Icon className={className} />
);

interface NavigationItem {
    id: string;
    label: string;
    icon: React.ComponentType;
    path: string;
    children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
    {
        id: 'theme',
        label: 'Theme',
        icon: Lightbulb,
        path: '#'
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/'
    },
    {
        id: 'analysis',
        label: 'Crypto Analysis',
        icon: BarChart,
        path: '/analysis',
        children: [
            {
                id: 'paper-trading',
                label: 'Paper Trading',
                icon: DollarSign,
                path: '/paper-trading'
            },
            {
                id: 'backtesting',
                label: 'Backtesting',
                icon: Clock,
                path: '/backtesting'
            }
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/settings'
    }
];

interface NavigationProps {
    activePath: string;
    onNavigate: (path: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePath, onNavigate }) => {
    const { theme, toggleTheme } = useTheme();
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

    const handleNavigationClick = (path: string) => {
        if (path === '#') {
            toggleTheme();
            return;
        }
        onNavigate(path);
    };

    return (
        <nav className="space-y-1">
            {navigationItems.map((item) => (
                <div key={item.id}>
                    {item.children ? (
                        <div className="space-y-1">
                            <button
                                onClick={() => setIsAnalysisOpen(!isAnalysisOpen)}
                                className={`
                                    flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700
                                    ${activePath === item.path ? 'bg-gray-700 text-blue-400' : ''}
                                `}
                            >
                                <IconWrapper icon={item.icon} className="mr-3 h-5 w-5" />
                                {item.label}
                            </button>
                            {isAnalysisOpen && (
                                <div className="pl-8 space-y-1">
                                    {item.children.map((child) => (
                                        <button
                                            key={child.id}
                                            onClick={() => handleNavigationClick(child.path)}
                                            className={`
                                                flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700
                                                ${activePath === child.path ? 'bg-gray-700 text-blue-400' : ''}
                                            `}
                                        >
                                            <IconWrapper icon={child.icon} className="mr-3 h-4 w-4" />
                                            {child.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => handleNavigationClick(item.path)}
                            className={`
                                flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700
                                ${activePath === item.path ? 'bg-gray-700 text-blue-400' : ''}
                            `}
                        >
                            <IconWrapper icon={item.icon} className="mr-3 h-5 w-5" />
                            {item.label}
                        </button>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Navigation;
