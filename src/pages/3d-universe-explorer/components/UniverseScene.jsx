import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const UniverseScene = ({ 
  selectedObject = null,
  onObjectSelect = () => {},
  viewMode = '3d',
  isAnimationPlaying = false,
  currentTime = 0,
  searchQuery = '',
  activeFilter = 'all'
}) => {
  const sceneRef = useRef(null);
  const [hoveredObject, setHoveredObject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Realistic cosmic objects data with accurate proportions and distances
  const cosmicObjects = [
    // Solar System - Sun and Planets with realistic proportions
    { 
      id: 'sun', 
      name: 'Sun', 
      type: 'star', 
      category: 'stars', 
      position: { x: 0, y: 0, z: 0 }, 
      size: 45, 
      color: '#FDB813', 
      glow: true,
      orbitDistance: 0,
      orbitSpeed: 0,
      temperature: '5778K',
      inclination: 0
    },
    { 
      id: 'mercury', 
      name: 'Mercury', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 70, y: 0, z: 0 }, 
      size: 4, 
      color: '#8C7853',
      orbitDistance: 70,
      orbitSpeed: 4.15,
      temperature: '167°C',
      inclination: 7.0
    },
    { 
      id: 'venus', 
      name: 'Venus', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 110, y: 0, z: 0 }, 
      size: 9, 
      color: '#FFC649',
      orbitDistance: 110,
      orbitSpeed: 1.62,
      temperature: '464°C',
      inclination: 3.4
    },
    { 
      id: 'earth', 
      name: 'Earth', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 150, y: 0, z: 0 }, 
      size: 10, 
      color: '#6B93D6',
      orbitDistance: 150,
      orbitSpeed: 1.0,
      temperature: '15°C',
      inclination: 0,
      hasAtmosphere: true
    },
    { 
      id: 'mars', 
      name: 'Mars', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 228, y: 0, z: 0 }, 
      size: 5, 
      color: '#CD5C5C',
      orbitDistance: 228,
      orbitSpeed: 0.53,
      temperature: '-65°C',
      inclination: 1.9
    },
    // Asteroid Belt
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `asteroid-${i}`,
      name: `Asteroid ${i + 1}`,
      type: 'asteroid',
      category: 'asteroids',
      position: { 
        x: 280 + Math.random() * 80 - 40,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 40
      },
      size: Math.random() * 2 + 1,
      color: '#8B7355',
      orbitDistance: 280 + Math.random() * 80 - 40,
      orbitSpeed: 0.3 + Math.random() * 0.2,
      inclination: Math.random() * 10
    })),
    { 
      id: 'jupiter', 
      name: 'Jupiter', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 420, y: 0, z: 0 }, 
      size: 35, 
      color: '#D8CA9D',
      orbitDistance: 420,
      orbitSpeed: 0.084,
      temperature: '-110°C',
      inclination: 1.3,
      hasGreatRedSpot: true
    },
    { 
      id: 'saturn', 
      name: 'Saturn', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 550, y: 0, z: 0 }, 
      size: 30, 
      color: '#FAD5A5', 
      hasRings: true,
      orbitDistance: 550,
      orbitSpeed: 0.034,
      temperature: '-140°C',
      inclination: 2.5
    },
    { 
      id: 'uranus', 
      name: 'Uranus', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 680, y: 0, z: 0 }, 
      size: 18, 
      color: '#4FD0E7',
      orbitDistance: 680,
      orbitSpeed: 0.012,
      temperature: '-195°C',
      inclination: 0.8,
      axialTilt: 98
    },
    { 
      id: 'neptune', 
      name: 'Neptune', 
      type: 'planet', 
      category: 'planets', 
      position: { x: 800, y: 0, z: 0 }, 
      size: 17, 
      color: '#4B70DD',
      orbitDistance: 800,
      orbitSpeed: 0.006,
      temperature: '-200°C',
      inclination: 1.8
    },
    
    // Major Moons
    { 
      id: 'moon', 
      name: 'Moon', 
      type: 'moon', 
      category: 'moons', 
      parent: 'earth',
      position: { x: 150, y: 0, z: 0 }, 
      size: 3, 
      color: '#C0C0C0',
      orbitDistance: 25,
      orbitSpeed: 13.4,
      inclination: 5.1
    },
    { 
      id: 'phobos', 
      name: 'Phobos', 
      type: 'moon', 
      category: 'moons', 
      parent: 'mars',
      position: { x: 228, y: 0, z: 0 }, 
      size: 1, 
      color: '#8B7355',
      orbitDistance: 8,
      orbitSpeed: 1128,
      inclination: 1.1
    },
    { 
      id: 'deimos', 
      name: 'Deimos', 
      type: 'moon', 
      category: 'moons', 
      parent: 'mars',
      position: { x: 228, y: 0, z: 0 }, 
      size: 0.8, 
      color: '#696969',
      orbitDistance: 12,
      orbitSpeed: 285,
      inclination: 1.8
    },
    { 
      id: 'io', 
      name: 'Io', 
      type: 'moon', 
      category: 'moons', 
      parent: 'jupiter',
      position: { x: 420, y: 0, z: 0 }, 
      size: 4, 
      color: '#FFFF99',
      orbitDistance: 28,
      orbitSpeed: 203,
      inclination: 0.04
    },
    { 
      id: 'europa', 
      name: 'Europa', 
      type: 'moon', 
      category: 'moons', 
      parent: 'jupiter',
      position: { x: 420, y: 0, z: 0 }, 
      size: 3, 
      color: '#87CEEB',
      orbitDistance: 35,
      orbitSpeed: 101,
      inclination: 0.47
    },
    { 
      id: 'ganymede', 
      name: 'Ganymede', 
      type: 'moon', 
      category: 'moons', 
      parent: 'jupiter',
      position: { x: 420, y: 0, z: 0 }, 
      size: 5, 
      color: '#8B7D6B',
      orbitDistance: 42,
      orbitSpeed: 50,
      inclination: 0.2
    },
    { 
      id: 'titan', 
      name: 'Titan', 
      type: 'moon', 
      category: 'moons', 
      parent: 'saturn',
      position: { x: 550, y: 0, z: 0 }, 
      size: 5, 
      color: '#E5B76B',
      orbitDistance: 50,
      orbitSpeed: 22.6,
      inclination: 0.35,
      hasAtmosphere: true
    },
    
    // Dwarf Planets with realistic positions
    { 
      id: 'ceres', 
      name: 'Ceres', 
      type: 'dwarf-planet', 
      category: 'dwarf-planets', 
      position: { x: 290, y: 15, z: 0 }, 
      size: 3, 
      color: '#8C7853',
      orbitDistance: 290,
      orbitSpeed: 0.23,
      inclination: 10.6
    },
    { 
      id: 'pluto', 
      name: 'Pluto', 
      type: 'dwarf-planet', 
      category: 'dwarf-planets', 
      position: { x: 950, y: 0, z: 0 }, 
      size: 2, 
      color: '#A0522D',
      orbitDistance: 950,
      orbitSpeed: 0.004,
      inclination: 17.2
    },
    { 
      id: 'eris', 
      name: 'Eris', 
      type: 'dwarf-planet', 
      category: 'dwarf-planets', 
      position: { x: 1100, y: 60, z: 0 }, 
      size: 2, 
      color: '#D3D3D3',
      orbitDistance: 1100,
      orbitSpeed: 0.002,
      inclination: 44.2
    },
    
    // Stars
    { id: 'betelgeuse', name: 'Betelgeuse', type: 'red-giant', category: 'stars', position: { x: -300, y: 200, z: -400 }, size: 80, color: '#FF4500', glow: true },
    { id: 'sirius', name: 'Sirius', type: 'main-sequence', category: 'stars', position: { x: 400, y: -150, z: -300 }, size: 25, color: '#87CEEB', glow: true },
    { id: 'vega', name: 'Vega', type: 'main-sequence', category: 'stars', position: { x: -200, y: -300, z: -500 }, size: 22, color: '#FFFFFF', glow: true },
    
    // Galaxies
    { id: 'andromeda', name: 'Andromeda Galaxy', type: 'spiral-galaxy', category: 'galaxies', position: { x: 0, y: 0, z: -1000 }, size: 200, color: '#DDA0DD', spiral: true },
    { id: 'milky-way-center', name: 'Milky Way Center', type: 'galaxy-center', category: 'galaxies', position: { x: 0, y: 0, z: -800 }, size: 150, color: '#FFD700', glow: true },
    
    // Nebulae
    { id: 'orion-nebula', name: 'Orion Nebula', type: 'emission-nebula', category: 'nebulae', position: { x: -400, y: 100, z: -600 }, size: 120, color: '#FF69B4', gasCloud: true },
    { id: 'eagle-nebula', name: 'Eagle Nebula', type: 'star-forming', category: 'nebulae', position: { x: 300, y: -200, z: -700 }, size: 100, color: '#32CD32', gasCloud: true },
    
    // Black Holes
    { id: 'sagittarius-a', name: 'Sagittarius A*', type: 'supermassive-black-hole', category: 'black-holes', position: { x: 0, y: 0, z: -800 }, size: 40, color: '#000000', accretionDisk: true }
  ];

  // Filter objects based on search and category
  const filteredObjects = cosmicObjects?.filter(obj => {
    const matchesSearch = obj?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = activeFilter === 'all' || obj?.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Handle mouse movement for hover effects
  const handleMouseMove = (event) => {
    const rect = sceneRef?.current?.getBoundingClientRect();
    setMousePosition({
      x: event?.clientX - rect?.left,
      y: event?.clientY - rect?.top
    });
  };

  // Handle object click
  const handleObjectClick = (object, event) => {
    event?.stopPropagation();
    onObjectSelect(object);
  };

  // Handle object hover
  const handleObjectHover = (object) => {
    setHoveredObject(object);
  };

  // Clear hover when mouse leaves object
  const handleObjectLeave = () => {
    setHoveredObject(null);
  };

  // Generate more realistic stars for background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 300; i++) {
      stars?.push({
        id: `star-${i}`,
        x: Math.random() * 1400 - 700,
        y: Math.random() * 900 - 450,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.9 + 0.1,
        twinkle: Math.random() > 0.7,
        color: ['#FFFFFF', '#FFE4B5', '#87CEEB', '#FFA500']?.[Math.floor(Math.random() * 4)]
      });
    }
    return stars;
  };

  const backgroundStars = generateStars();

  // Enhanced realistic animation with proper orbital mechanics
  const getAnimatedPosition = (object) => {
    if (!isAnimationPlaying) return object?.position;
    
    const timeOffset = (currentTime / 10) * object?.orbitSpeed;
    
    if (object?.type === 'planet' || object?.type === 'dwarf-planet') {
      const inclinationRad = (object?.inclination || 0) * Math.PI / 180;
      return {
        x: Math.cos(timeOffset) * object?.orbitDistance,
        y: Math.sin(timeOffset) * object?.orbitDistance * Math.sin(inclinationRad),
        z: Math.sin(timeOffset) * object?.orbitDistance * Math.cos(inclinationRad)
      };
    }
    
    if (object?.type === 'moon') {
      // Find parent planet
      const parent = cosmicObjects?.find(obj => obj?.id === object?.parent);
      if (parent) {
        const parentPos = getAnimatedPosition(parent);
        const moonTimeOffset = (currentTime / 10) * object?.orbitSpeed;
        const inclinationRad = (object?.inclination || 0) * Math.PI / 180;
        
        return {
          x: parentPos?.x + Math.cos(moonTimeOffset) * object?.orbitDistance,
          y: parentPos?.y + Math.sin(moonTimeOffset) * object?.orbitDistance * Math.sin(inclinationRad),
          z: parentPos?.z + Math.sin(moonTimeOffset) * object?.orbitDistance * Math.cos(inclinationRad)
        };
      }
    }
    
    if (object?.type === 'asteroid') {
      const inclinationRad = (object?.inclination || 0) * Math.PI / 180;
      return {
        x: Math.cos(timeOffset) * object?.orbitDistance,
        y: object?.position?.y + Math.sin(timeOffset) * object?.orbitDistance * Math.sin(inclinationRad),
        z: Math.sin(timeOffset) * object?.orbitDistance * Math.cos(inclinationRad)
      };
    }
    
    return object?.position;
  };

  return (
    <div 
      ref={sceneRef}
      className="relative w-full h-full bg-gradient-to-b from-deep-space-navy via-black to-deep-space-navy overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleObjectLeave}
    >
      {/* Enhanced Background Stars */}
      <div className="absolute inset-0">
        {backgroundStars?.map((star) => (
          <div
            key={star?.id}
            className={`absolute rounded-full ${star?.twinkle ? 'animate-cosmic-pulse' : ''}`}
            style={{
              left: `${star?.x + 700}px`,
              top: `${star?.y + 450}px`,
              width: `${star?.size}px`,
              height: `${star?.size}px`,
              backgroundColor: star?.color,
              opacity: star?.opacity,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${star?.size * 2}px ${star?.color}40`
            }}
          />
        ))}
      </div>
      {/* 3D Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ transform: 'perspective(1500px) rotateX(15deg)' }}>
          
          {/* Cosmic Objects */}
          {filteredObjects?.map((object) => {
            const animatedPos = getAnimatedPosition(object);
            const isSelected = selectedObject?.id === object?.id;
            const isHovered = hoveredObject?.id === object?.id;
            
            return (
              <div key={object?.id} className="absolute">
                {/* Object Sphere with enhanced visuals */}
                <div
                  className={`absolute rounded-full cursor-pointer cosmic-transition ${
                    object?.glow ? 'cosmic-glow-md' : ''
                  } ${isSelected ? 'cosmic-glow-lg ring-2 ring-primary' : ''} ${
                    isHovered ? 'cosmic-glow-sm scale-110' : ''
                  }`}
                  style={{
                    left: `${animatedPos?.x}px`,
                    top: `${animatedPos?.y}px`,
                    width: `${object?.size}px`,
                    height: `${object?.size}px`,
                    backgroundColor: object?.color,
                    transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px)`,
                    boxShadow: object?.glow 
                      ? `0 0 ${object?.size * 2}px ${object?.color}60, inset -5px -5px 10px ${object?.color}20`
                      : `inset -2px -2px 4px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)`,
                    background: object?.hasGreatRedSpot 
                      ? `radial-gradient(circle at 70% 30%, #D2691E 15%, ${object?.color} 40%)`
                      : object?.color
                  }}
                  onClick={(e) => handleObjectClick(object, e)}
                  onMouseEnter={() => handleObjectHover(object)}
                  onMouseLeave={handleObjectLeave}
                />

                {/* Earth's Atmosphere */}
                {object?.id === 'earth' && (
                  <div
                    className="absolute rounded-full opacity-30"
                    style={{
                      left: `${animatedPos?.x}px`,
                      top: `${animatedPos?.y}px`,
                      width: `${object?.size * 1.3}px`,
                      height: `${object?.size * 1.3}px`,
                      transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px)`,
                      background: `radial-gradient(circle, transparent 70%, #87CEEB40 100%)`,
                      border: '1px solid rgba(135, 206, 235, 0.2)'
                    }}
                  />
                )}

                {/* Titan's Atmosphere */}
                {object?.id === 'titan' && (
                  <div
                    className="absolute rounded-full opacity-40"
                    style={{
                      left: `${animatedPos?.x}px`,
                      top: `${animatedPos?.y}px`,
                      width: `${object?.size * 1.2}px`,
                      height: `${object?.size * 1.2}px`,
                      transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px)`,
                      background: `radial-gradient(circle, transparent 60%, #FFA50040 100%)`,
                      border: '1px solid rgba(255, 165, 0, 0.3)'
                    }}
                  />
                )}

                {/* Enhanced Saturn's Rings */}
                {object?.hasRings && (
                  <>
                    <div
                      className="absolute border border-gray-300 rounded-full opacity-70"
                      style={{
                        left: `${animatedPos?.x}px`,
                        top: `${animatedPos?.y}px`,
                        width: `${object?.size * 2.2}px`,
                        height: `${object?.size * 0.4}px`,
                        transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px) rotateX(75deg)`,
                        boxShadow: `0 0 5px rgba(255,255,255,0.3)`
                      }}
                    />
                    <div
                      className="absolute border border-gray-400 rounded-full opacity-50"
                      style={{
                        left: `${animatedPos?.x}px`,
                        top: `${animatedPos?.y}px`,
                        width: `${object?.size * 2.5}px`,
                        height: `${object?.size * 0.4}px`,
                        transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px) rotateX(75deg)`
                      }}
                    />
                  </>
                )}
                {/* Spiral Galaxy Arms */}
                {object?.spiral && (
                  <div
                    className="absolute opacity-40"
                    style={{
                      left: `${animatedPos?.x}px`,
                      top: `${animatedPos?.y}px`,
                      width: `${object?.size}px`,
                      height: `${object?.size}px`,
                      transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px)`,
                      background: `radial-gradient(ellipse, transparent 20%, ${object?.color}20 40%, transparent 80%)`
                    }}
                  />
                )}
                {/* Gas Cloud Effect for Nebulae */}
                {object?.gasCloud && (
                  <div
                    className="absolute opacity-30 animate-cosmic-pulse"
                    style={{
                      left: `${animatedPos?.x}px`,
                      top: `${animatedPos?.y}px`,
                      width: `${object?.size * 1.5}px`,
                      height: `${object?.size * 1.5}px`,
                      transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px)`,
                      background: `radial-gradient(circle, ${object?.color}40 0%, ${object?.color}20 50%, transparent 100%)`,
                      borderRadius: '50%'
                    }}
                  />
                )}
                {/* Accretion Disk for Black Holes */}
                {object?.accretionDisk && (
                  <div
                    className="absolute opacity-60 animate-spin"
                    style={{
                      left: `${animatedPos?.x}px`,
                      top: `${animatedPos?.y}px`,
                      width: `${object?.size * 3}px`,
                      height: `${object?.size * 0.3}px`,
                      transform: `translate(-50%, -50%) translateZ(${animatedPos?.z}px)`,
                      background: `linear-gradient(90deg, transparent 0%, #FFD700 30%, #FF4500 70%, transparent 100%)`,
                      borderRadius: '50%',
                      animationDuration: '10s'
                    }}
                  />
                )}
                {/* Object Label */}
                {(isHovered || isSelected) && (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: `${animatedPos?.x}px`,
                      top: `${animatedPos?.y - object?.size - 30}px`,
                      transform: `translate(-50%, -100%) translateZ(${animatedPos?.z}px)`
                    }}
                  >
                    <div className="cosmic-backdrop rounded-cosmic-sm px-3 py-2 border border-border">
                      <p className="font-caption text-xs text-foreground whitespace-nowrap font-bold">
                        {object?.name}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground">
                        {object?.type?.replace('-', ' ')}
                      </p>
                      {object?.temperature && (
                        <p className="font-caption text-xs text-muted-foreground">
                          Temp: {object?.temperature}
                        </p>
                      )}
                      {object?.orbitSpeed && object?.orbitSpeed > 0 && (
                        <p className="font-caption text-xs text-muted-foreground">
                          Orbit: {object?.orbitSpeed?.toFixed(2)} rel. speed
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Realistic Orbital Paths */}
          {isAnimationPlaying && filteredObjects?.filter(obj => 
            (obj?.type === 'planet' || obj?.type === 'dwarf-planet') && obj?.orbitDistance > 0
          )?.map((object) => {
            const inclinationRad = (object?.inclination || 0) * Math.PI / 180;
            return (
              <div
                key={`orbit-${object?.id}`}
                className="absolute border border-muted-foreground/15 rounded-full"
                style={{
                  left: '0px',
                  top: '0px',
                  width: `${object?.orbitDistance * 2}px`,
                  height: `${object?.orbitDistance * 2 * Math.cos(inclinationRad)}px`,
                  transform: `translate(-50%, -50%) rotateX(${object?.inclination || 0}deg)`
                }}
              />
            );
          })}

          {/* Asteroid Belt Visualization */}
          {isAnimationPlaying && (
            <div
              className="absolute border border-yellow-600/20 rounded-full"
              style={{
                left: '0px',
                top: '0px',
                width: '560px',
                height: '560px',
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </div>
      </div>
      {/* Hover Tooltip */}
      {hoveredObject && (
        <div
          className="fixed pointer-events-none z-20 cosmic-backdrop rounded-cosmic-md p-3 border border-border cosmic-glow-sm"
          style={{
            left: `${mousePosition?.x + 15}px`,
            top: `${mousePosition?.y - 10}px`,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={14} className="text-primary" />
            <p className="font-body font-medium text-sm text-foreground">
              {hoveredObject?.name}
            </p>
          </div>
          <p className="font-caption text-xs text-muted-foreground mb-1">
            Type: {hoveredObject?.type?.replace('-', ' ')}
          </p>
          <p className="font-caption text-xs text-muted-foreground">
            Click to explore
          </p>
        </div>
      )}
      {/* Loading Indicator */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2 cosmic-backdrop rounded-cosmic-sm px-3 py-2 border border-border">
          <div className="w-2 h-2 rounded-full bg-aurora-green animate-cosmic-pulse"></div>
          <span className="font-caption text-xs text-foreground">
            Realistic Solar System
          </span>
        </div>
      </div>
    </div>
  );
};

export default UniverseScene;