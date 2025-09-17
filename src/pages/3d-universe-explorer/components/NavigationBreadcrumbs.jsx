import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationBreadcrumbs = ({
  currentLocation = 'Solar System',
  selectedObject = null,
  onLocationChange = () => {},
  className = ''
}) => {
  const cosmicHierarchy = [
    { id: 'observable-universe', name: 'Observable Universe', level: 0, icon: 'Infinity' },
    { id: 'local-group', name: 'Local Group', level: 1, icon: 'Network' },
    { id: 'milky-way', name: 'Milky Way Galaxy', level: 2, icon: 'Sparkles' },
    { id: 'orion-arm', name: 'Orion Arm', level: 3, icon: 'Route' },
    { id: 'solar-system', name: 'Solar System', level: 4, icon: 'Sun' },
    { id: 'inner-planets', name: 'Inner Planets', level: 5, icon: 'Circle' }
  ];

  const getCurrentPath = () => {
    if (selectedObject) {
      const basePath = cosmicHierarchy?.slice(0, 5);
      return [...basePath, {
        id: selectedObject?.id,
        name: selectedObject?.name,
        level: 5,
        icon: getObjectIcon(selectedObject?.type)
      }];
    }
    return cosmicHierarchy?.slice(0, 5);
  };

  const getObjectIcon = (type) => {
    const iconMap = {
      'planet': 'Globe',
      'dwarf-planet': 'Circle',
      'star': 'Star',
      'red-giant': 'Sun',
      'main-sequence': 'Star',
      'spiral-galaxy': 'Sparkles',
      'galaxy-center': 'Zap',
      'emission-nebula': 'Cloud',
      'star-forming': 'CloudRain',
      'supermassive-black-hole': 'Circle'
    };
    return iconMap?.[type] || 'Circle';
  };

  const currentPath = getCurrentPath();

  const handleLocationClick = (location) => {
    onLocationChange(location);
  };

  return (
    <div className={`fixed top-20 left-6 z-40 ${className}`}>
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border cosmic-glow-sm">
        <div className="p-4">
          
          {/* Header */}
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="font-caption text-sm font-medium text-foreground">
              Current Location
            </span>
          </div>

          {/* Breadcrumb Navigation */}
          <nav className="space-y-2">
            {currentPath?.map((location, index) => {
              const isLast = index === currentPath?.length - 1;
              const isSelected = selectedObject?.id === location?.id;
              
              return (
                <div key={location?.id} className="flex items-center">
                  {index > 0 && (
                    <div className="flex items-center mr-2">
                      <div className="w-px h-4 bg-border mr-2"></div>
                      <Icon name="ChevronRight" size={12} className="text-muted-foreground mr-2" />
                    </div>
                  )}
                  <Button
                    variant={isSelected ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLocationClick(location)}
                    className={`justify-start cosmic-transition ${
                      isLast && !isSelected ? 'text-primary' : ''
                    } ${isSelected ? 'cosmic-glow-sm' : 'hover:cosmic-glow-sm'}`}
                    iconName={location?.icon}
                    iconPosition="left"
                  >
                    <span className="truncate max-w-32">
                      {location?.name}
                    </span>
                  </Button>
                </div>
              );
            })}
          </nav>

          {/* Quick Navigation */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="font-caption text-xs text-muted-foreground mb-2">
              Quick Navigation
            </p>
            <div className="flex flex-wrap gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLocationClick(cosmicHierarchy?.[4])}
                iconName="Home"
                iconPosition="left"
                className="cosmic-transition hover:cosmic-glow-sm"
              >
                Home
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLocationClick(cosmicHierarchy?.[2])}
                iconName="Sparkles"
                iconPosition="left"
                className="cosmic-transition hover:cosmic-glow-sm"
              >
                Galaxy
              </Button>
            </div>
          </div>

          {/* Distance Indicator */}
          {selectedObject && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs text-muted-foreground">
                  Distance from Earth
                </span>
                <span className="font-data text-xs text-foreground">
                  {getDistanceFromEarth(selectedObject)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function getDistanceFromEarth(object) {
    const distances = {
      'sun': '149.6 million km',
      'mercury': '77.3 million km',
      'venus': '41.4 million km',
      'mars': '78.3 million km',
      'jupiter': '628.7 million km',
      'saturn': '1.35 billion km',
      'uranus': '2.72 billion km',
      'neptune': '4.35 billion km',
      'pluto': '5.91 billion km',
      'betelgeuse': '642.5 light-years',
      'sirius': '8.6 light-years',
      'andromeda': '2.537 million light-years'
    };
    return distances?.[object?.id] || 'Unknown distance';
  }
};

export default NavigationBreadcrumbs;