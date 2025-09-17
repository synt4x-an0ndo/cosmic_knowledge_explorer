import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TourViewport3D = ({ 
  currentTour = null,
  currentStep = 1,
  isAnimating = false,
  onCameraMove = () => {},
  onObjectFocus = () => {},
  className = ''
}) => {
  const [viewMode, setViewMode] = useState('guided');
  const [isLoading, setIsLoading] = useState(false);
  const [currentObject, setCurrentObject] = useState(null);

  const mockTourSteps = {
    1: {
      title: 'Welcome to the Solar System',
      focusObject: 'solar-system-overview',
      cameraPosition: { x: 0, y: 0, z: 100 },
      description: 'Our solar system formed 4.6 billion years ago from a collapsing cloud of gas and dust.',
      objects: ['sun', 'planets', 'asteroid-belt']
    },
    2: {
      title: 'The Sun - Our Central Star',
      focusObject: 'sun',
      cameraPosition: { x: 0, y: 0, z: 50 },
      description: 'The Sun contains 99.86% of the Solar System\'s mass and generates energy through nuclear fusion.',
      objects: ['sun', 'solar-flares', 'corona']
    },
    3: {
      title: 'Inner Rocky Planets',
      focusObject: 'inner-planets',
      cameraPosition: { x: -30, y: 10, z: 60 },
      description: 'Mercury, Venus, Earth, and Mars are terrestrial planets with solid surfaces.',
      objects: ['mercury', 'venus', 'earth', 'mars']
    },
    4: {
      title: 'The Asteroid Belt',
      focusObject: 'asteroid-belt',
      cameraPosition: { x: 0, y: 20, z: 80 },
      description: 'Millions of rocky objects orbit between Mars and Jupiter.',
      objects: ['asteroid-belt', 'ceres', 'vesta']
    },
    5: {
      title: 'Outer Gas Giants',
      focusObject: 'outer-planets',
      cameraPosition: { x: 40, y: -10, z: 90 },
      description: 'Jupiter, Saturn, Uranus, and Neptune are massive worlds of gas and ice.',
      objects: ['jupiter', 'saturn', 'uranus', 'neptune']
    }
  };

  const currentStepData = mockTourSteps?.[currentStep] || mockTourSteps?.[1];

  useEffect(() => {
    if (currentStepData) {
      setIsLoading(true);
      setCurrentObject(currentStepData?.focusObject);
      
      // Simulate camera movement and object loading
      const timer = setTimeout(() => {
        setIsLoading(false);
        onCameraMove(currentStepData?.cameraPosition);
        onObjectFocus(currentStepData?.focusObject);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentStep, currentStepData, onCameraMove, onObjectFocus]);

  const mockCosmicObjects = [
    {
      id: 'sun',
      name: 'The Sun',
      type: 'star',
      position: { x: 0, y: 0, z: 0 },
      scale: 1.0,
      color: '#FFA500',
      glowing: true,
      visible: currentStepData?.objects?.includes('sun')
    },
    {
      id: 'mercury',
      name: 'Mercury',
      type: 'planet',
      position: { x: -15, y: 0, z: 0 },
      scale: 0.1,
      color: '#8C7853',
      visible: currentStepData?.objects?.includes('mercury')
    },
    {
      id: 'venus',
      name: 'Venus',
      type: 'planet',
      position: { x: -25, y: 0, z: 0 },
      scale: 0.15,
      color: '#FFC649',
      visible: currentStepData?.objects?.includes('venus')
    },
    {
      id: 'earth',
      name: 'Earth',
      type: 'planet',
      position: { x: -35, y: 0, z: 0 },
      scale: 0.16,
      color: '#6B93D6',
      visible: currentStepData?.objects?.includes('earth')
    },
    {
      id: 'mars',
      name: 'Mars',
      type: 'planet',
      position: { x: -45, y: 0, z: 0 },
      scale: 0.12,
      color: '#CD5C5C',
      visible: currentStepData?.objects?.includes('mars')
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      type: 'planet',
      position: { x: -70, y: 0, z: 0 },
      scale: 0.8,
      color: '#D8CA9D',
      visible: currentStepData?.objects?.includes('jupiter')
    },
    {
      id: 'saturn',
      name: 'Saturn',
      type: 'planet',
      position: { x: -90, y: 0, z: 0 },
      scale: 0.7,
      color: '#FAD5A5',
      rings: true,
      visible: currentStepData?.objects?.includes('saturn')
    }
  ];

  return (
    <div className={`relative w-full h-full bg-gradient-to-b from-deep-space-navy via-deep-space-navy/90 to-deep-space-navy overflow-hidden ${className}`}>
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-cosmic-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
      {/* 3D Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl max-h-4xl">
          
          {/* Cosmic Objects */}
          {mockCosmicObjects?.map((object) => (
            object?.visible && (
              <div
                key={object?.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cosmic-transition ${
                  isAnimating ? 'animate-cosmic-pulse' : ''
                } ${
                  currentObject === object?.id ? 'cosmic-glow-lg scale-110' : 'hover:cosmic-glow-sm hover:scale-105'
                }`}
                style={{
                  left: `${50 + object?.position?.x}%`,
                  top: `${50 + object?.position?.y}%`,
                  width: `${object?.scale * 60}px`,
                  height: `${object?.scale * 60}px`,
                  zIndex: object?.type === 'star' ? 10 : 5
                }}
              >
                {/* Object Sphere */}
                <div
                  className={`w-full h-full rounded-full ${
                    object?.glowing ? 'cosmic-glow-xl animate-cosmic-pulse' : ''
                  } ${
                    object?.type === 'star' ? 'shadow-2xl' : 'shadow-lg'
                  }`}
                  style={{
                    backgroundColor: object?.color,
                    boxShadow: object?.glowing 
                      ? `0 0 ${object?.scale * 40}px ${object?.color}40, 0 0 ${object?.scale * 80}px ${object?.color}20`
                      : `0 0 ${object?.scale * 10}px rgba(0,0,0,0.5)`
                  }}
                />

                {/* Saturn's Rings */}
                {object?.rings && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="border-2 border-gray-400/60 rounded-full"
                      style={{
                        width: `${object?.scale * 120}px`,
                        height: `${object?.scale * 120}px`
                      }}
                    />
                    <div
                      className="absolute border border-gray-300/40 rounded-full"
                      style={{
                        width: `${object?.scale * 100}px`,
                        height: `${object?.scale * 100}px`
                      }}
                    />
                  </div>
                )}

                {/* Object Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="cosmic-backdrop rounded-cosmic-sm px-2 py-1 border border-border">
                    <span className="font-caption text-xs text-foreground">
                      {object?.name}
                    </span>
                  </div>
                </div>

                {/* Focus Indicator */}
                {currentObject === object?.id && (
                  <div className="absolute inset-0 border-2 border-primary rounded-full animate-cosmic-pulse" />
                )}
              </div>
            )
          ))}

          {/* Asteroid Belt */}
          {currentStepData?.objects?.includes('asteroid-belt') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {Array.from({ length: 50 }, (_, i) => {
                  const angle = (i / 50) * 2 * Math.PI;
                  const radius = 200 + Math.random() * 40;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius * 0.3;
                  
                  return (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-400 rounded-full"
                      style={{
                        left: `${50 + (x / 10)}%`,
                        top: `${50 + (y / 10)}%`,
                        opacity: 0.6 + Math.random() * 0.4
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 cosmic-backdrop flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-body text-foreground">
              Navigating to {currentStepData?.title}...
            </p>
          </div>
        </div>
      )}
      {/* View Mode Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-2">
          <div className="flex space-x-1">
            <Button
              variant={viewMode === 'guided' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('guided')}
              iconName="Route"
            >
              Guided
            </Button>
            <Button
              variant={viewMode === 'free' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('free')}
              iconName="Move3D"
            >
              Free
            </Button>
          </div>
        </div>
      </div>
      {/* Current Focus Info */}
      <div className="absolute top-4 right-4 z-10">
        <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-3 max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="font-caption text-sm font-medium text-foreground">
              Current Focus
            </span>
          </div>
          <h4 className="font-heading font-semibold text-foreground">
            {currentStepData?.title}
          </h4>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {currentStepData?.description}
          </p>
        </div>
      </div>
      {/* Performance Indicator */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="cosmic-backdrop rounded-cosmic-md border border-border p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-aurora-green animate-cosmic-pulse" />
            <span className="font-data text-xs text-foreground">60 FPS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourViewport3D;