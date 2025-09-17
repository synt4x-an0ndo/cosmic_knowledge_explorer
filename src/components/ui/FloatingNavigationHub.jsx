import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingNavigationHub = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Explore Universe',
      path: '/3d-universe-explorer',
      icon: 'Globe',
      color: 'text-stellar-blue'
    },
    {
      label: 'Guided Tours',
      path: '/guided-tour-mode',
      icon: 'Route',
      color: 'text-nebula-purple'
    },
    {
      label: 'Quiz Center',
      path: '/educational-quiz-center',
      icon: 'Brain',
      color: 'text-solar-gold'
    },
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'BarChart3',
      color: 'text-aurora-green'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed top-20 right-6 z-40 ${className}`}>
      <div className="relative">
        {/* Main Hub Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleExpanded}
          className={`w-14 h-14 rounded-full cosmic-backdrop border border-border cosmic-glow-md hover:cosmic-glow-lg cosmic-transition ${
            isExpanded ? 'cosmic-glow-lg' : ''
          }`}
        >
          <Icon 
            name={isExpanded ? 'X' : 'Navigation'} 
            size={24} 
            className="text-primary" 
          />
        </Button>

        {/* Expanded Navigation Items */}
        {isExpanded && (
          <div className="absolute top-16 right-0 space-y-3 cosmic-transition">
            {navigationItems?.map((item, index) => (
              <div
                key={item?.path}
                className="animate-in slide-in-from-right duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={item?.path}
                  onClick={() => setIsExpanded(false)}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-cosmic-lg cosmic-backdrop border border-border cosmic-transition hover:cosmic-glow-md ${
                    isActivePath(item?.path) 
                      ? 'cosmic-glow-sm border-primary/50' :'hover:border-primary/30'
                  }`}
                >
                  <div className={`p-2 rounded-cosmic-sm bg-card/50 ${item?.color}`}>
                    <Icon name={item?.icon} size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-body font-medium text-sm ${
                      isActivePath(item?.path) ? 'text-primary' : 'text-foreground'
                    }`}>
                      {item?.label}
                    </p>
                  </div>
                  
                  {/* Active Indicator */}
                  {isActivePath(item?.path) && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-cosmic-pulse"></div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Backdrop Overlay */}
        {isExpanded && (
          <div 
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FloatingNavigationHub;