import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DiscoveryHistoryTab = ({ object }) => {
  if (!object) return null;

  const timelineEvents = [
    {
      date: object?.discoveryDate,
      title: `Discovery of ${object?.name}`,
      description: `First observed by ${object?.discoverer} using ${object?.discoveryMethod}`,
      type: 'discovery',
      icon: 'Telescope'
    },
    {
      date: object?.firstPhotographDate,
      title: 'First Photograph',
      description: 'First photographic evidence captured, providing detailed visual documentation',
      type: 'milestone',
      icon: 'Camera'
    },
    {
      date: object?.catalogDate,
      title: 'Catalog Entry',
      description: `Added to ${object?.catalog} with designation ${object?.catalogNumber}`,
      type: 'classification',
      icon: 'BookOpen'
    },
    {
      date: object?.modernStudyDate,
      title: 'Modern Analysis',
      description: 'Advanced spectroscopic analysis revealed detailed composition and properties',
      type: 'research',
      icon: 'Microscope'
    }
  ];

  const discoveryMethods = [
    { method: 'Visual Observation', description: 'Direct observation through telescopes', icon: 'Eye' },
    { method: 'Photographic Survey', description: 'Systematic photographic mapping', icon: 'Camera' },
    { method: 'Spectroscopy', description: 'Analysis of light spectrum', icon: 'Zap' },
    { method: 'Radio Astronomy', description: 'Detection of radio waves', icon: 'Radio' }
  ];

  const keyDiscoverers = [
    {
      name: object?.discoverer,
      role: 'Primary Discoverer',
      contribution: 'First observation and documentation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: object?.cataloger,
      role: 'Cataloger',
      contribution: 'Systematic classification and naming',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: object?.modernResearcher,
      role: 'Modern Researcher',
      contribution: 'Contemporary analysis and understanding',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Discovery Overview */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
          Discovery Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-solar-gold/20 rounded-cosmic-sm flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-solar-gold" />
            </div>
            <p className="font-caption text-xs text-muted-foreground mb-1">Discovery Date</p>
            <p className="font-data text-sm text-foreground font-medium">{object?.discoveryDate}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-nebula-purple/20 rounded-cosmic-sm flex items-center justify-center">
              <Icon name="User" size={20} className="text-nebula-purple" />
            </div>
            <p className="font-caption text-xs text-muted-foreground mb-1">Discoverer</p>
            <p className="font-data text-sm text-foreground font-medium">{object?.discoverer}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-stellar-blue/20 rounded-cosmic-sm flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-stellar-blue" />
            </div>
            <p className="font-caption text-xs text-muted-foreground mb-1">Location</p>
            <p className="font-data text-sm text-foreground font-medium">{object?.discoveryLocation}</p>
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Discovery Timeline
        </h3>
        <div className="space-y-4">
          {timelineEvents?.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  event?.type === 'discovery' ? 'bg-solar-gold/20 border-2 border-solar-gold/50' :
                  event?.type === 'milestone' ? 'bg-stellar-blue/20 border-2 border-stellar-blue/50' :
                  event?.type === 'classification'? 'bg-nebula-purple/20 border-2 border-nebula-purple/50' : 'bg-aurora-green/20 border-2 border-aurora-green/50'
                }`}>
                  <Icon 
                    name={event?.icon} 
                    size={16} 
                    className={
                      event?.type === 'discovery' ? 'text-solar-gold' :
                      event?.type === 'milestone' ? 'text-stellar-blue' :
                      event?.type === 'classification'? 'text-nebula-purple' : 'text-aurora-green'
                    } 
                  />
                </div>
                {index < timelineEvents?.length - 1 && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-border"></div>
                )}
              </div>
              <div className="flex-1 cosmic-backdrop rounded-cosmic-md p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-semibold text-foreground">{event?.title}</h4>
                  <span className="font-data text-xs text-muted-foreground">{event?.date}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{event?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Discovery Methods */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Discovery Methods & Techniques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {discoveryMethods?.map((method, index) => (
            <div
              key={index}
              className="cosmic-backdrop rounded-cosmic-md p-4 border border-border hover:border-primary/30 cosmic-transition"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/20 rounded-cosmic-sm flex-shrink-0">
                  <Icon name={method?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    {method?.method}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {method?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Key Contributors */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Key Contributors
        </h3>
        <div className="space-y-4">
          {keyDiscoverers?.map((person, index) => (
            <div
              key={index}
              className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border hover:border-primary/30 cosmic-transition"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-cosmic-md overflow-hidden flex-shrink-0">
                  <Image
                    src={person?.image}
                    alt={person?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-semibold text-foreground">
                      {person?.name}
                    </h4>
                    <span className="px-2 py-1 bg-primary/20 border border-primary/30 rounded-cosmic-sm">
                      <span className="font-caption text-xs text-primary">{person?.role}</span>
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    {person?.contribution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Historical Context */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border bg-nebula-purple/5">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-nebula-purple/20 rounded-cosmic-sm flex-shrink-0">
            <Icon name="Clock" size={18} className="text-nebula-purple" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-2">
              Historical Context
            </h4>
            <p className="font-body text-sm text-foreground leading-relaxed">
              {object?.historicalContext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryHistoryTab;