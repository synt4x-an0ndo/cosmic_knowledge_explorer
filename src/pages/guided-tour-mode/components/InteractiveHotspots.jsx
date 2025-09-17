import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveHotspots = ({ 
  hotspots = [],
  onHotspotClick = () => {},
  isVisible = true,
  className = '' 
}) => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const mockHotspots = hotspots?.length > 0 ? hotspots : [
    {
      id: 'sun-core',
      position: { x: 45, y: 30 },
      title: 'Solar Core',
      type: 'info',
      description: 'The Sun\'s core reaches temperatures of 15 million°C where nuclear fusion occurs.',
      icon: 'Zap',
      color: 'solar-gold'
    },
    {
      id: 'solar-flares',
      position: { x: 60, y: 25 },
      title: 'Solar Flares',
      type: 'interactive',
      description: 'Massive eruptions of electromagnetic energy from the Sun\'s surface.',
      icon: 'Flame',
      color: 'red-giant-crimson'
    },
    {
      id: 'earth-orbit',
      position: { x: 75, y: 55 },
      title: 'Earth\'s Orbit',
      type: 'measurement',
      description: 'Earth orbits the Sun at an average distance of 149.6 million kilometers.',
      icon: 'RotateCcw',
      color: 'stellar-blue'
    },
    {
      id: 'asteroid-belt',
      position: { x: 85, y: 45 },
      title: 'Asteroid Belt',
      type: 'exploration',
      description: 'A region containing thousands of rocky objects between Mars and Jupiter.',
      icon: 'Circle',
      color: 'nebula-purple'
    }
  ];

  const getHotspotColor = (color) => {
    const colorMap = {
      'solar-gold': 'text-solar-gold bg-solar-gold/20 border-solar-gold/40',
      'red-giant-crimson': 'text-red-giant-crimson bg-red-giant-crimson/20 border-red-giant-crimson/40',
      'stellar-blue': 'text-stellar-blue bg-stellar-blue/20 border-stellar-blue/40',
      'nebula-purple': 'text-nebula-purple bg-nebula-purple/20 border-nebula-purple/40',
      'aurora-green': 'text-aurora-green bg-aurora-green/20 border-aurora-green/40'
    };
    return colorMap?.[color] || 'text-primary bg-primary/20 border-primary/40';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'info': return 'Info';
      case 'interactive': return 'MousePointer';
      case 'measurement': return 'Ruler';
      case 'exploration': return 'Compass';
      default: return 'Circle';
    }
  };

  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(activeHotspot?.id === hotspot?.id ? null : hotspot);
    onHotspotClick(hotspot);
  };

  if (!isVisible) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none z-30 ${className}`}>
      {mockHotspots?.map((hotspot) => (
        <div key={hotspot?.id} className="absolute pointer-events-auto">
          
          {/* Hotspot Marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ 
              left: `${hotspot?.position?.x}%`, 
              top: `${hotspot?.position?.y}%` 
            }}
            onClick={() => handleHotspotClick(hotspot)}
            onMouseEnter={() => setHoveredHotspot(hotspot?.id)}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            {/* Pulsing Ring */}
            <div className={`absolute inset-0 w-8 h-8 rounded-full ${getHotspotColor(hotspot?.color)} animate-cosmic-pulse opacity-60`} />
            
            {/* Main Hotspot */}
            <div className={`relative w-8 h-8 rounded-full ${getHotspotColor(hotspot?.color)} border-2 cosmic-glow-sm flex items-center justify-center cosmic-transition hover:scale-110 ${
              activeHotspot?.id === hotspot?.id ? 'scale-125 cosmic-glow-md' : ''
            }`}>
              <Icon 
                name={hotspot?.icon} 
                size={16} 
                className={`${hotspot?.color === 'solar-gold' ? 'text-solar-gold' : 
                  hotspot?.color === 'red-giant-crimson' ? 'text-red-giant-crimson' :
                  hotspot?.color === 'stellar-blue' ? 'text-stellar-blue' :
                  hotspot?.color === 'nebula-purple'? 'text-nebula-purple' : 'text-primary'}`}
              />
            </div>

            {/* Hover Tooltip */}
            {hoveredHotspot === hotspot?.id && activeHotspot?.id !== hotspot?.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 cosmic-backdrop rounded-cosmic-md border border-border whitespace-nowrap z-10">
                <div className="flex items-center space-x-2">
                  <Icon name={getTypeIcon(hotspot?.type)} size={14} className="text-muted-foreground" />
                  <span className="font-body text-sm text-foreground font-medium">
                    {hotspot?.title}
                  </span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
              </div>
            )}
          </div>

          {/* Expanded Information Panel */}
          {activeHotspot?.id === hotspot?.id && (
            <div
              className="absolute z-20"
              style={{ 
                left: `${Math.min(hotspot?.position?.x + 5, 70)}%`, 
                top: `${Math.max(hotspot?.position?.y - 10, 10)}%` 
              }}
            >
              <div className="w-80 cosmic-backdrop rounded-cosmic-lg border border-border cosmic-glow-md p-4 animate-in slide-in-from-left duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-cosmic-sm ${getHotspotColor(hotspot?.color)}`}>
                      <Icon name={hotspot?.icon} size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">
                        {hotspot?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Icon name={getTypeIcon(hotspot?.type)} size={12} className="text-muted-foreground" />
                        <span className="font-caption text-xs text-muted-foreground capitalize">
                          {hotspot?.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveHotspot(null)}
                    className="w-6 h-6"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="font-body text-sm text-foreground leading-relaxed">
                    {hotspot?.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="BookOpen"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Learn More
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Navigation"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Focus Here
                    </Button>
                  </div>

                  {/* Additional Info Based on Type */}
                  {hotspot?.type === 'measurement' && (
                    <div className="pt-2 border-t border-border">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-caption text-muted-foreground">Distance:</span>
                          <p className="font-data text-foreground">149.6M km</p>
                        </div>
                        <div>
                          <span className="font-caption text-muted-foreground">Scale:</span>
                          <p className="font-data text-foreground">1 AU</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {hotspot?.type === 'interactive' && (
                    <div className="pt-2 border-t border-border">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Play"
                        iconPosition="left"
                        className="w-full"
                      >
                        Start Interactive Demo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Hotspot Legend */}
      <div className="absolute top-4 right-4 cosmic-backdrop rounded-cosmic-lg border border-border p-3 pointer-events-auto">
        <h5 className="font-heading font-medium text-foreground mb-2 text-sm">
          Interactive Elements
        </h5>
        <div className="space-y-1">
          {[
            { type: 'info', label: 'Information', icon: 'Info' },
            { type: 'interactive', label: 'Interactive', icon: 'MousePointer' },
            { type: 'measurement', label: 'Measurements', icon: 'Ruler' },
            { type: 'exploration', label: 'Exploration', icon: 'Compass' }
          ]?.map((item) => (
            <div key={item?.type} className="flex items-center space-x-2">
              <Icon name={item?.icon} size={12} className="text-muted-foreground" />
              <span className="font-caption text-xs text-muted-foreground">
                {item?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveHotspots;