import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'exploration',
      title: 'Explored Jupiter\'s Great Red Spot',
      description: 'Discovered fascinating details about the storm system',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'Eye',
      color: 'text-stellar-blue',
      bgColor: 'bg-stellar-blue/20',
      object: 'Jupiter',
      duration: '15 minutes'
    },
    {
      id: 2,
      type: 'quiz',
      title: 'Completed Stellar Evolution Quiz',
      description: 'Scored 87% on advanced stellar lifecycle questions',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'Brain',
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/20',
      score: 87,
      totalQuestions: 15
    },
    {
      id: 3,
      type: 'bookmark',
      title: 'Bookmarked Andromeda Galaxy',
      description: 'Added to favorites for future detailed exploration',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Bookmark',
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/20',
      object: 'Andromeda Galaxy'
    },
    {
      id: 4,
      type: 'tour',
      title: 'Started Solar System Tour',
      description: 'Began guided exploration of inner planets',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Route',
      color: 'text-aurora-green',
      bgColor: 'bg-aurora-green/20',
      progress: 60,
      totalSteps: 10
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Earned "Planet Hunter" Badge',
      description: 'Discovered all 8 planets in our solar system',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'Trophy',
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/20',
      badge: 'Planet Hunter'
    },
    {
      id: 6,
      type: 'exploration',
      title: 'Visited Orion Nebula',
      description: 'Studied star formation in this stellar nursery',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      icon: 'Sparkles',
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/20',
      object: 'Orion Nebula',
      duration: '22 minutes'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const getActivityDetails = (activity) => {
    switch (activity?.type) {
      case 'quiz':
        return (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Target" size={12} />
            <span className="font-data">{activity?.score}% • {activity?.totalQuestions} questions</span>
          </div>
        );
      case 'tour':
        return (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span className="font-data">{activity?.progress}% complete • Step {Math.floor(activity?.totalSteps * activity?.progress / 100)} of {activity?.totalSteps}</span>
          </div>
        );
      case 'exploration':
        return (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span className="font-data">{activity?.duration} • {activity?.object}</span>
          </div>
        );
      case 'bookmark':
        return (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Star" size={12} />
            <span className="font-data">{activity?.object}</span>
          </div>
        );
      case 'achievement':
        return (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Award" size={12} />
            <span className="font-data">{activity?.badge} Badge</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getActionButton = (activity) => {
    switch (activity?.type) {
      case 'tour':
        return (
          <Link to="/guided-tour-mode">
            <Button variant="ghost" size="sm" iconName="Play" iconPosition="left">
              Continue
            </Button>
          </Link>
        );
      case 'exploration':
        return (
          <Link to="/3d-universe-explorer">
            <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
              Revisit
            </Button>
          </Link>
        );
      case 'quiz':
        return (
          <Link to="/educational-quiz-center">
            <Button variant="ghost" size="sm" iconName="RotateCcw" iconPosition="left">
              Retake
            </Button>
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-cosmic-sm bg-stellar-blue/20 border border-stellar-blue/30">
            <Icon name="Activity" size={20} className="text-stellar-blue" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Recent Activity
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              Your latest cosmic adventures
            </p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="History" iconPosition="left">
          View All
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="relative flex items-start space-x-4 p-3 cosmic-backdrop rounded-cosmic-lg border border-border hover:border-primary/30 cosmic-transition">
            
            {/* Timeline connector */}
            {index < activities?.length - 1 && (
              <div className="absolute left-8 top-12 w-0.5 h-8 bg-border"></div>
            )}
            
            <div className={`p-2 rounded-cosmic-sm ${activity?.bgColor} border border-border/50 flex-shrink-0`}>
              <Icon name={activity?.icon} size={16} className={activity?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-body font-medium text-foreground">
                    {activity?.title}
                  </h3>
                  <p className="font-caption text-sm text-muted-foreground mt-1">
                    {activity?.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-data text-xs text-muted-foreground">
                        {formatTimestamp(activity?.timestamp)}
                      </span>
                      {getActivityDetails(activity)}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  {getActionButton(activity)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-solar-gold" />
            <span className="font-caption text-sm text-muted-foreground">
              You've been active for 3 days straight!
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={16} className="text-solar-gold" />
            <span className="font-data text-sm text-solar-gold font-semibold">
              3 day streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;