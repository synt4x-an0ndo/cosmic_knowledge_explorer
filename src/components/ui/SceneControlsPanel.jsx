import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SceneControlsPanel = ({ 
  className = '',
  onZoomIn = () => {},
  onZoomOut = () => {},
  onResetView = () => {},
  onToggleAnimation = () => {},
  isAnimationPlaying = false,
  currentTime = 0,
  onTimeChange = () => {},
  maxTime = 100
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState('3d');

  const viewModes = [
    { id: '3d', label: '3D View', icon: 'Box' },
    { id: 'orbit', label: 'Orbit', icon: 'RotateCcw' },
    { id: 'free', label: 'Free Cam', icon: 'Move3D' }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-6 left-6 z-40 ${className}`}>
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border cosmic-glow-sm">
        
        {/* Collapse/Expand Button */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={16} className="text-primary" />
            <span className="font-caption text-sm font-medium text-foreground">
              Scene Controls
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="w-6 h-6"
          >
            <Icon 
              name={isExpanded ? 'ChevronDown' : 'ChevronUp'} 
              size={14} 
            />
          </Button>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            
            {/* View Mode Selection */}
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                View Mode
              </p>
              <div className="flex space-x-1">
                {viewModes?.map((mode) => (
                  <Button
                    key={mode?.id}
                    variant={viewMode === mode?.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode(mode?.id)}
                    className="flex-1"
                    iconName={mode?.icon}
                    iconPosition="left"
                  >
                    <span className="hidden sm:inline">{mode?.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Zoom Controls */}
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                Zoom & Navigation
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onZoomIn}
                  iconName="ZoomIn"
                  className="cosmic-transition hover:cosmic-glow-sm"
                >
                  <span className="sr-only">Zoom In</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetView}
                  iconName="RotateCcw"
                  className="cosmic-transition hover:cosmic-glow-sm"
                >
                  <span className="sr-only">Reset View</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onZoomOut}
                  iconName="ZoomOut"
                  className="cosmic-transition hover:cosmic-glow-sm"
                >
                  <span className="sr-only">Zoom Out</span>
                </Button>
              </div>
            </div>

            {/* Animation Controls */}
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                Time Controls
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isAnimationPlaying ? 'default' : 'outline'}
                    size="sm"
                    onClick={onToggleAnimation}
                    iconName={isAnimationPlaying ? 'Pause' : 'Play'}
                    className="cosmic-transition"
                  >
                    {isAnimationPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <div className="flex-1 text-right">
                    <span className="font-data text-xs text-muted-foreground">
                      {Math.round(currentTime)}%
                    </span>
                  </div>
                </div>
                
                {/* Time Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={maxTime}
                    value={currentTime}
                    onChange={(e) => onTimeChange(Number(e?.target?.value))}
                    className="w-full h-2 bg-muted rounded-cosmic-sm appearance-none cursor-pointer cosmic-transition focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${currentTime}%, var(--color-muted) ${currentTime}%, var(--color-muted) 100%)`
                    }}
                  />
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full cosmic-glow-sm pointer-events-none"
                    style={{ left: `calc(${currentTime}% - 8px)` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Home"
                  iconPosition="left"
                  className="cosmic-transition hover:cosmic-glow-sm"
                >
                  Home
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Maximize"
                  iconPosition="left"
                  className="cosmic-transition hover:cosmic-glow-sm"
                >
                  Fullscreen
                </Button>
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs text-muted-foreground">
                  Performance
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-aurora-green animate-cosmic-pulse"></div>
                  <span className="font-data text-xs text-foreground">60 FPS</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneControlsPanel;