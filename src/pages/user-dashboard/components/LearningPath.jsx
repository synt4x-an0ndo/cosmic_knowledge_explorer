import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPath = () => {
  const learningTopics = [
    {
      id: 1,
      title: 'Solar System Basics',
      description: 'Explore planets, moons, and asteroids in our solar system',
      progress: 100,
      status: 'completed',
      icon: 'Sun',
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/20',
      estimatedTime: '2 hours',
      objectsCount: 25
    },
    {
      id: 2,
      title: 'Stellar Evolution',
      description: 'Understanding the life cycle of stars from birth to death',
      progress: 75,
      status: 'in-progress',
      icon: 'Star',
      color: 'text-aurora-green',
      bgColor: 'bg-aurora-green/20',
      estimatedTime: '3 hours',
      objectsCount: 18
    },
    {
      id: 3,
      title: 'Galactic Structures',
      description: 'Discover galaxies, nebulae, and cosmic formations',
      progress: 45,
      status: 'in-progress',
      icon: 'Sparkles',
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/20',
      estimatedTime: '4 hours',
      objectsCount: 32
    },
    {
      id: 4,
      title: 'Black Holes & Exotic Objects',
      description: 'Explore the most mysterious objects in the universe',
      progress: 0,
      status: 'locked',
      icon: 'Circle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/20',
      estimatedTime: '2.5 hours',
      objectsCount: 15
    },
    {
      id: 5,
      title: 'Exoplanets & Habitability',
      description: 'Search for life beyond our solar system',
      progress: 0,
      status: 'locked',
      icon: 'Globe',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/20',
      estimatedTime: '3.5 hours',
      objectsCount: 28
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'PlayCircle';
      case 'locked':
        return 'Lock';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-primary';
      case 'locked':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActionButton = (topic) => {
    switch (topic?.status) {
      case 'completed':
        return (
          <Button variant="outline" size="sm" iconName="RotateCcw" iconPosition="left">
            Review
          </Button>
        );
      case 'in-progress':
        return (
          <Button variant="default" size="sm" iconName="Play" iconPosition="left">
            Continue
          </Button>
        );
      case 'locked':
        return (
          <Button variant="ghost" size="sm" disabled iconName="Lock" iconPosition="left">
            Locked
          </Button>
        );
      default:
        return (
          <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
            Start
          </Button>
        );
    }
  };

  return (
    <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-cosmic-sm bg-aurora-green/20 border border-aurora-green/30">
            <Icon name="BookOpen" size={20} className="text-aurora-green" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Learning Path
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              Structured cosmic education journey
            </p>
          </div>
        </div>
        
        <Link to="/guided-tour-mode">
          <Button variant="outline" size="sm" iconName="Route" iconPosition="left">
            All Tours
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {learningTopics?.map((topic, index) => (
          <div key={topic?.id} className={`relative cosmic-backdrop rounded-cosmic-lg border border-border p-4 ${
            topic?.status === 'locked' ? 'opacity-60' : 'hover:border-primary/30'
          } cosmic-transition`}>
            
            {/* Connection Line */}
            {index < learningTopics?.length - 1 && (
              <div className="absolute left-8 top-16 w-0.5 h-8 bg-border"></div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className={`relative p-3 rounded-cosmic-lg ${topic?.bgColor} border border-border/50 flex-shrink-0`}>
                <Icon name={topic?.icon} size={20} className={topic?.color} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card flex items-center justify-center ${
                  topic?.status === 'completed' ? 'bg-success' : 
                  topic?.status === 'in-progress' ? 'bg-primary' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getStatusIcon(topic?.status)} 
                    size={10} 
                    className={getStatusColor(topic?.status)}
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-body font-semibold text-foreground">
                      {topic?.title}
                    </h3>
                    <p className="font-caption text-sm text-muted-foreground mt-1">
                      {topic?.description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {getActionButton(topic)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span className="font-data">{topic?.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Telescope" size={12} />
                      <span className="font-data">{topic?.objectsCount} objects</span>
                    </div>
                  </div>
                  
                  {topic?.status !== 'locked' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-1.5 bg-muted rounded-cosmic-sm overflow-hidden">
                        <div 
                          className={`h-full cosmic-transition ${
                            topic?.status === 'completed' ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{ width: `${topic?.progress}%` }}
                        />
                      </div>
                      <span className="font-data text-xs text-muted-foreground">
                        {topic?.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 cosmic-backdrop rounded-cosmic-lg border border-primary/30 bg-primary/5">
        <div className="flex items-center space-x-3">
          <Icon name="Trophy" size={20} className="text-solar-gold" />
          <div>
            <p className="font-body font-medium text-foreground">
              Complete all paths to unlock the Master Explorer badge!
            </p>
            <p className="font-caption text-sm text-muted-foreground">
              2 of 5 paths completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;