import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ComparisonTool = ({ currentObject, isVisible, onClose }) => {
  const [selectedObjects, setSelectedObjects] = useState([currentObject]);
  const [comparisonMetric, setComparisonMetric] = useState('size');

  const availableObjects = [
    {
      id: 'earth',
      name: 'Earth',
      type: 'Planet',
      diameter: '12,742 km',
      mass: '5.97 × 10²⁴ kg',
      distance: '0 km',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=150&h=150&fit=crop'
    },
    {
      id: 'moon',
      name: 'Moon',
      type: 'Natural Satellite',
      diameter: '3,474 km',
      mass: '7.35 × 10²² kg',
      distance: '384,400 km',
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=150&h=150&fit=crop'
    },
    {
      id: 'sun',
      name: 'Sun',
      type: 'Star',
      diameter: '1,391,000 km',
      mass: '1.99 × 10³⁰ kg',
      distance: '149.6 million km',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      type: 'Gas Giant',
      diameter: '139,820 km',
      mass: '1.90 × 10²⁷ kg',
      distance: '628.7 million km',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=150&h=150&fit=crop'
    }
  ];

  const comparisonMetrics = [
    { value: 'size', label: 'Size Comparison' },
    { value: 'mass', label: 'Mass Comparison' },
    { value: 'distance', label: 'Distance Comparison' },
    { value: 'brightness', label: 'Brightness Comparison' }
  ];

  const objectOptions = availableObjects?.map(obj => ({
    value: obj?.id,
    label: obj?.name,
    description: obj?.type
  }));

  const addObjectToComparison = (objectId) => {
    const object = availableObjects?.find(obj => obj?.id === objectId);
    if (object && !selectedObjects?.find(obj => obj?.id === objectId)) {
      setSelectedObjects(prev => [...prev, object]);
    }
  };

  const removeObjectFromComparison = (objectId) => {
    setSelectedObjects(prev => prev?.filter(obj => obj?.id !== objectId));
  };

  const getRelativeSize = (object) => {
    // Mock calculation for visual representation
    const earthDiameter = 12742;
    const objectDiameter = parseFloat(object?.diameter?.replace(/[^\d.]/g, '') || '12742');
    return Math.min((objectDiameter / earthDiameter) * 50, 200);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-cosmic-sm bg-primary/20 flex items-center justify-center">
              <Icon name="BarChart3" size={16} className="text-primary" />
            </div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Object Comparison Tool
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Select
                label="Add Object to Compare"
                options={objectOptions}
                value=""
                onChange={(value) => addObjectToComparison(value)}
                placeholder="Select an object..."
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Select
                label="Comparison Metric"
                options={comparisonMetrics}
                value={comparisonMetric}
                onChange={setComparisonMetric}
                className="w-full"
              />
            </div>
          </div>

          {/* Selected Objects */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Selected Objects ({selectedObjects?.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedObjects?.map((object) => (
                <div
                  key={object?.id}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary/20 border border-primary/30 rounded-cosmic-md"
                >
                  <span className="font-body text-sm text-foreground">
                    {object?.name}
                  </span>
                  {selectedObjects?.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeObjectFromComparison(object?.id)}
                      className="w-4 h-4 text-primary hover:text-primary/80"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Visualization */}
          <div className="space-y-6">
            
            {/* Size Comparison */}
            {comparisonMetric === 'size' && (
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Size Comparison (Relative to Earth)
                </h4>
                <div className="cosmic-backdrop rounded-cosmic-lg p-6 border border-border">
                  <div className="flex items-end justify-center space-x-8 min-h-[200px]">
                    {selectedObjects?.map((object) => (
                      <div key={object?.id} className="flex flex-col items-center">
                        <div
                          className="rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-sm mb-2"
                          style={{
                            width: `${getRelativeSize(object)}px`,
                            height: `${getRelativeSize(object)}px`,
                            minWidth: '20px',
                            minHeight: '20px'
                          }}
                        />
                        <p className="font-caption text-xs text-foreground text-center">
                          {object?.name}
                        </p>
                        <p className="font-data text-xs text-muted-foreground">
                          {object?.diameter}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Detailed Comparison
              </h4>
              <div className="cosmic-backdrop rounded-cosmic-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30 border-b border-border">
                      <tr>
                        <th className="text-left p-3 font-heading font-semibold text-foreground">
                          Object
                        </th>
                        <th className="text-left p-3 font-heading font-semibold text-foreground">
                          Type
                        </th>
                        <th className="text-left p-3 font-heading font-semibold text-foreground">
                          Diameter
                        </th>
                        <th className="text-left p-3 font-heading font-semibold text-foreground">
                          Mass
                        </th>
                        <th className="text-left p-3 font-heading font-semibold text-foreground">
                          Distance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedObjects?.map((object, index) => (
                        <tr
                          key={object?.id}
                          className={`border-b border-border ${
                            index % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'
                          }`}
                        >
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-cosmic-sm overflow-hidden">
                                <Image
                                  src={object?.image}
                                  alt={object?.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-body text-sm text-foreground">
                                {object?.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 font-body text-sm text-muted-foreground">
                            {object?.type}
                          </td>
                          <td className="p-3 font-data text-sm text-foreground">
                            {object?.diameter}
                          </td>
                          <td className="p-3 font-data text-sm text-foreground">
                            {object?.mass}
                          </td>
                          <td className="p-3 font-data text-sm text-foreground">
                            {object?.distance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Comparison
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedObjects([currentObject])}
                >
                  Reset
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onClose}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;