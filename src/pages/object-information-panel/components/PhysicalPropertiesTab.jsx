import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhysicalPropertiesTab = ({ object }) => {
  const [selectedUnit, setSelectedUnit] = useState('metric');
  
  if (!object) return null;

  const unitSystems = [
    { id: 'metric', label: 'Metric', icon: 'Ruler' },
    { id: 'imperial', label: 'Imperial', icon: 'Scale' },
    { id: 'astronomical', label: 'Astronomical', icon: 'Globe' }
  ];

  const physicalProperties = [
    {
      category: 'Size & Scale',
      properties: [
        { label: 'Diameter', value: object?.diameter, unit: 'km', icon: 'Circle' },
        { label: 'Radius', value: object?.radius, unit: 'km', icon: 'CircleDot' },
        { label: 'Surface Area', value: object?.surfaceArea, unit: 'km²', icon: 'Square' },
        { label: 'Volume', value: object?.volume, unit: 'km³', icon: 'Box' }
      ]
    },
    {
      category: 'Mass & Density',
      properties: [
        { label: 'Mass', value: object?.mass, unit: 'kg', icon: 'Weight' },
        { label: 'Density', value: object?.density, unit: 'g/cm³', icon: 'Layers' },
        { label: 'Surface Gravity', value: object?.surfaceGravity, unit: 'm/s²', icon: 'ArrowDown' },
        { label: 'Escape Velocity', value: object?.escapeVelocity, unit: 'km/s', icon: 'Rocket' }
      ]
    },
    {
      category: 'Orbital Characteristics',
      properties: [
        { label: 'Orbital Period', value: object?.orbitalPeriod, unit: 'days', icon: 'RotateCcw' },
        { label: 'Rotation Period', value: object?.rotationPeriod, unit: 'hours', icon: 'RefreshCw' },
        { label: 'Orbital Velocity', value: object?.orbitalVelocity, unit: 'km/s', icon: 'Zap' },
        { label: 'Axial Tilt', value: object?.axialTilt, unit: '°', icon: 'RotateCw' }
      ]
    },
    {
      category: 'Temperature & Atmosphere',
      properties: [
        { label: 'Surface Temperature', value: object?.surfaceTemperature, unit: 'K', icon: 'Thermometer' },
        { label: 'Core Temperature', value: object?.coreTemperature, unit: 'K', icon: 'Flame' },
        { label: 'Atmospheric Pressure', value: object?.atmosphericPressure, unit: 'atm', icon: 'Wind' },
        { label: 'Atmospheric Composition', value: object?.atmosphericComposition, unit: '', icon: 'Cloud' }
      ]
    }
  ];

  const comparisonObjects = [
    { name: 'Earth', value: '1.00x', icon: 'Globe' },
    { name: 'Moon', value: '0.27x', icon: 'Moon' },
    { name: 'Sun', value: '109.2x', icon: 'Sun' },
    { name: 'Jupiter', value: '11.2x', icon: 'Circle' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Unit System Selector */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Physical Properties
        </h3>
        <div className="flex items-center space-x-1 bg-muted/30 rounded-cosmic-md p-1">
          {unitSystems?.map((system) => (
            <Button
              key={system?.id}
              variant={selectedUnit === system?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedUnit(system?.id)}
              iconName={system?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {system?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Properties by Category */}
      {physicalProperties?.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
            <div className="w-1 h-6 bg-primary rounded-cosmic-sm"></div>
            <span>{category?.category}</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category?.properties?.map((property, index) => (
              <div
                key={index}
                className="cosmic-backdrop rounded-cosmic-md p-4 border border-border hover:border-primary/30 cosmic-transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/20 rounded-cosmic-sm">
                      <Icon name={property?.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-caption text-xs text-muted-foreground">
                        {property?.label}
                      </p>
                      <p className="font-data text-sm text-foreground font-medium">
                        {property?.value} {property?.unit}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="Info" size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Size Comparison */}
      <div>
        <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
          <div className="w-1 h-6 bg-stellar-blue rounded-cosmic-sm"></div>
          <span>Size Comparison</span>
        </h4>
        
        <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comparisonObjects?.map((obj, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-stellar-blue to-nebula-purple rounded-full flex items-center justify-center cosmic-glow-sm">
                  <Icon name={obj?.icon} size={20} className="text-white" />
                </div>
                <p className="font-caption text-xs text-muted-foreground mb-1">
                  {obj?.name}
                </p>
                <p className="font-data text-sm text-foreground font-medium">
                  {obj?.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Interactive Scale Visualization */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border bg-stellar-blue/5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-semibold text-foreground">
            Interactive Scale
          </h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Maximize"
            iconPosition="left"
          >
            Full View
          </Button>
        </div>
        
        <div className="relative h-32 bg-deep-space-navy rounded-cosmic-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-blue/20 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-solar-gold rounded-full cosmic-glow-md animate-cosmic-pulse"></div>
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground font-data">
            Scale: 1 pixel = 1,000 km
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalPropertiesTab;