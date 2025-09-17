import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualInformationOverlay = ({ 
  isOpen = false, 
  onClose = () => {}, 
  selectedObject = null,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnimating, setIsAnimating] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'properties', label: 'Properties', icon: 'Settings' },
    { id: 'exploration', label: 'Explore', icon: 'Compass' },
    { id: 'related', label: 'Related', icon: 'Network' }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 200);
  };

  if (!isOpen) return null;

  const mockObjectData = {
    name: selectedObject?.name || 'Andromeda Galaxy',
    type: selectedObject?.type || 'Spiral Galaxy',
    distance: selectedObject?.distance || '2.537 million light-years',
    magnitude: selectedObject?.magnitude || '3.44',
    constellation: selectedObject?.constellation || 'Andromeda',
    description: selectedObject?.description || 'The Andromeda Galaxy is a barred spiral galaxy and is the nearest major galaxy to the Milky Way. It was originally named the Andromeda Nebula and is cataloged as Messier 31, M31, and NGC 224.',
    properties: {
      'Diameter': '220,000 light-years',
      'Mass': '1.5 × 10¹² solar masses',
      'Stars': '~1 trillion',
      'Age': '10.01 billion years'
    },
    relatedObjects: [
      { name: 'M32', type: 'Elliptical Galaxy', distance: '2.65 Mly' },
      { name: 'M110', type: 'Elliptical Galaxy', distance: '2.69 Mly' },
      { name: 'Milky Way', type: 'Spiral Galaxy', distance: '0 ly' }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {mockObjectData?.name}
              </h3>
              <p className="font-body text-muted-foreground text-sm mb-3">
                {mockObjectData?.type} • {mockObjectData?.constellation}
              </p>
              <p className="font-body text-foreground text-sm leading-relaxed">
                {mockObjectData?.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="cosmic-backdrop rounded-cosmic-md p-3 border border-border">
                <p className="font-caption text-xs text-muted-foreground mb-1">Distance</p>
                <p className="font-data text-sm text-foreground">{mockObjectData?.distance}</p>
              </div>
              <div className="cosmic-backdrop rounded-cosmic-md p-3 border border-border">
                <p className="font-caption text-xs text-muted-foreground mb-1">Magnitude</p>
                <p className="font-data text-sm text-foreground">{mockObjectData?.magnitude}</p>
              </div>
            </div>
          </div>
        );
      
      case 'properties':
        return (
          <div className="space-y-3">
            {Object.entries(mockObjectData?.properties)?.map(([key, value]) => (
              <div key={key} className="cosmic-backdrop rounded-cosmic-md p-3 border border-border">
                <div className="flex justify-between items-center">
                  <p className="font-caption text-sm text-muted-foreground">{key}</p>
                  <p className="font-data text-sm text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'exploration':
        return (
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start" iconName="Play" iconPosition="left">
              Start Guided Tour
            </Button>
            <Button variant="outline" className="w-full justify-start" iconName="Bookmark" iconPosition="left">
              Add to Favorites
            </Button>
            <Button variant="outline" className="w-full justify-start" iconName="Share" iconPosition="left">
              Share Discovery
            </Button>
            <Button variant="outline" className="w-full justify-start" iconName="Camera" iconPosition="left">
              Take Screenshot
            </Button>
          </div>
        );
      
      case 'related':
        return (
          <div className="space-y-3">
            {mockObjectData?.relatedObjects?.map((obj, index) => (
              <div key={index} className="cosmic-backdrop rounded-cosmic-md p-3 border border-border hover:border-primary/30 cosmic-transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body font-medium text-sm text-foreground">{obj?.name}</p>
                    <p className="font-caption text-xs text-muted-foreground">{obj?.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-data text-xs text-muted-foreground">{obj?.distance}</p>
                    <Icon name="ArrowRight" size={16} className="text-primary ml-auto mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cosmic-transition"
        onClick={handleClose}
      />
      {/* Overlay Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md z-50 cosmic-backdrop border-l border-border transform cosmic-transition ${
        isAnimating ? 'translate-x-full' : 'translate-x-0'
      } ${className}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-cosmic-sm bg-primary/20 flex items-center justify-center">
              <Icon name="Telescope" size={16} className="text-primary" />
            </div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Object Details
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 cosmic-transition ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-caption text-xs font-medium hidden sm:inline">
                {tab?.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="flex-1" iconName="BookOpen">
              Learn More
            </Button>
            <Button variant="default" size="sm" className="flex-1" iconName="Navigation">
              Navigate To
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContextualInformationOverlay;