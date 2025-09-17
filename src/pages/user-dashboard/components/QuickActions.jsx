import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'resume-tour',
      title: 'Resume Solar System Tour',
      description: 'Continue from Mars exploration',
      icon: 'Play',
      color: 'text-aurora-green',
      bgColor: 'bg-aurora-green/20',
      borderColor: 'border-aurora-green/30',
      route: '/guided-tour-mode',
      progress: 60,
      badge: 'In Progress'
    },
    {
      id: 'retake-quiz',
      title: 'Retake Stellar Quiz',
      description: 'Improve your 73% score',
      icon: 'RotateCcw',
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/20',
      borderColor: 'border-solar-gold/30',
      route: '/educational-quiz-center',
      score: 73,
      badge: 'Retry Available'
    },
    {
      id: 'continue-exploration',
      title: 'Continue Exploration',
      description: 'Return to Andromeda Galaxy',
      icon: 'Navigation',
      color: 'text-stellar-blue',
      bgColor: 'bg-stellar-blue/20',
      borderColor: 'border-stellar-blue/30',
      route: '/3d-universe-explorer',
      lastObject: 'Andromeda Galaxy',
      badge: 'Last Viewed'
    },
    {
      id: 'daily-challenge',
      title: 'Daily Challenge',
      description: 'Find 3 exoplanets today',
      icon: 'Target',
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/20',
      borderColor: 'border-nebula-purple/30',
      route: '/3d-universe-explorer',
      challenge: '2/3 completed',
      badge: 'New'
    }
  ];

  const preferences = [
    {
      id: 'units',
      label: 'Measurement Units',
      value: 'Metric',
      icon: 'Ruler',
      options: ['Metric', 'Imperial', 'Astronomical']
    },
    {
      id: 'theme',
      label: 'Viewing Mode',
      value: 'Dark Space',
      icon: 'Moon',
      options: ['Dark Space', 'Bright Stars', 'High Contrast']
    },
    {
      id: 'notifications',
      label: 'Learning Reminders',
      value: 'Daily',
      icon: 'Bell',
      options: ['Off', 'Daily', 'Weekly']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-cosmic-sm bg-primary/20 border border-primary/30">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Quick Actions
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              Pick up where you left off
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <Link key={action?.id} to={action?.route}>
              <div className={`group p-4 cosmic-backdrop rounded-cosmic-lg border ${action?.borderColor} hover:cosmic-glow-sm cosmic-transition cursor-pointer`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-cosmic-sm ${action?.bgColor} border border-border/50`}>
                    <Icon name={action?.icon} size={18} className={action?.color} />
                  </div>
                  <div className={`px-2 py-1 rounded-cosmic-sm ${action?.bgColor} border ${action?.borderColor}`}>
                    <span className={`font-caption text-xs ${action?.color}`}>
                      {action?.badge}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-body font-semibold text-foreground group-hover:text-primary cosmic-transition mb-1">
                  {action?.title}
                </h3>
                <p className="font-caption text-sm text-muted-foreground mb-3">
                  {action?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {action?.progress && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-muted rounded-cosmic-sm overflow-hidden">
                        <div 
                          className={`h-full ${action?.bgColor?.replace('/20', '')} cosmic-transition`}
                          style={{ width: `${action?.progress}%` }}
                        />
                      </div>
                      <span className="font-data text-xs text-muted-foreground">
                        {action?.progress}%
                      </span>
                    </div>
                  )}
                  
                  {action?.score && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={12} className="text-muted-foreground" />
                      <span className="font-data text-xs text-muted-foreground">
                        {action?.score}%
                      </span>
                    </div>
                  )}
                  
                  {action?.lastObject && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} className="text-muted-foreground" />
                      <span className="font-data text-xs text-muted-foreground">
                        {action?.lastObject}
                      </span>
                    </div>
                  )}
                  
                  {action?.challenge && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Trophy" size={12} className="text-muted-foreground" />
                      <span className="font-data text-xs text-muted-foreground">
                        {action?.challenge}
                      </span>
                    </div>
                  )}
                  
                  <Icon name="ArrowRight" size={16} className={`${action?.color} group-hover:translate-x-1 cosmic-transition`} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Preferences Panel */}
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-cosmic-sm bg-muted/20 border border-border">
            <Icon name="Settings" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Preferences
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              Customize your learning experience
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {preferences?.map((pref) => (
            <div key={pref?.id} className="flex items-center justify-between p-3 cosmic-backdrop rounded-cosmic-lg border border-border">
              <div className="flex items-center space-x-3">
                <Icon name={pref?.icon} size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-body font-medium text-foreground">
                    {pref?.label}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Current: {pref?.value}
                  </p>
                </div>
              </div>
              
              <Button variant="outline" size="sm" iconName="ChevronDown" iconPosition="right">
                Change
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="font-caption text-sm text-muted-foreground">
                All data synced and backed up
              </span>
            </div>
            <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;