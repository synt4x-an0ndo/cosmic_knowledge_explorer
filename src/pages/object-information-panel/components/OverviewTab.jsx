import React from 'react';
import Icon from '../../../components/AppIcon';

const OverviewTab = ({ object }) => {
  if (!object) return null;

  const keyFacts = [
    { label: 'Type', value: object?.type, icon: 'Tag' },
    { label: 'Distance from Earth', value: object?.distance, icon: 'Ruler' },
    { label: 'Apparent Magnitude', value: object?.magnitude, icon: 'Eye' },
    { label: 'Constellation', value: object?.constellation, icon: 'Stars' },
    { label: 'Discovery Date', value: object?.discoveryDate, icon: 'Calendar' },
    { label: 'Discoverer', value: object?.discoverer, icon: 'User' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Description */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
          About {object?.name}
        </h3>
        <p className="font-body text-foreground text-sm leading-relaxed">
          {object?.description}
        </p>
      </div>
      {/* Key Facts Grid */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Key Facts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {keyFacts?.map((fact, index) => (
            <div
              key={index}
              className="cosmic-backdrop rounded-cosmic-md p-4 border border-border hover:border-primary/30 cosmic-transition"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/20 rounded-cosmic-sm flex-shrink-0">
                  <Icon name={fact?.icon} size={16} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-caption text-xs text-muted-foreground mb-1">
                    {fact?.label}
                  </p>
                  <p className="font-body text-sm text-foreground font-medium">
                    {fact?.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Interesting Facts */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Interesting Facts
        </h3>
        <div className="space-y-3">
          {object?.interestingFacts?.map((fact, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 cosmic-backdrop rounded-cosmic-md p-4 border border-border"
            >
              <div className="w-6 h-6 rounded-full bg-solar-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Lightbulb" size={12} className="text-solar-gold" />
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed">
                {fact}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Observation Tips */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border bg-nebula-purple/5">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-nebula-purple/20 rounded-cosmic-sm flex-shrink-0">
            <Icon name="Telescope" size={18} className="text-nebula-purple" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-2">
              Observation Tips
            </h4>
            <p className="font-body text-sm text-foreground leading-relaxed">
              {object?.observationTips}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;