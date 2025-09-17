import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      name: 'Planet Hunter',
      description: 'Discovered all 8 planets in our solar system',
      icon: 'Globe',
      color: 'text-stellar-blue',
      bgColor: 'bg-stellar-blue/20',
      borderColor: 'border-stellar-blue/30',
      earned: true,
      earnedDate: '2025-09-15',
      rarity: 'Common'
    },
    {
      id: 2,
      name: 'Star Gazer',
      description: 'Explored 25 different stellar objects',
      icon: 'Star',
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/20',
      borderColor: 'border-solar-gold/30',
      earned: true,
      earnedDate: '2025-09-14',
      rarity: 'Uncommon'
    },
    {
      id: 3,
      name: 'Galaxy Explorer',
      description: 'Visited 5 different galaxies',
      icon: 'Sparkles',
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/20',
      borderColor: 'border-nebula-purple/30',
      earned: true,
      earnedDate: '2025-09-12',
      rarity: 'Rare'
    },
    {
      id: 4,
      name: 'Quiz Master',
      description: 'Scored 90% or higher on 5 quizzes',
      icon: 'Brain',
      color: 'text-aurora-green',
      bgColor: 'bg-aurora-green/20',
      borderColor: 'border-aurora-green/30',
      earned: false,
      progress: 3,
      total: 5,
      rarity: 'Uncommon'
    },
    {
      id: 5,
      name: 'Black Hole Researcher',
      description: 'Study all types of black holes',
      icon: 'Circle',
      color: 'text-foreground',
      bgColor: 'bg-muted/20',
      borderColor: 'border-muted/30',
      earned: false,
      progress: 1,
      total: 4,
      rarity: 'Epic'
    },
    {
      id: 6,
      name: 'Cosmic Cartographer',
      description: 'Complete 10 guided tours',
      icon: 'Map',
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      borderColor: 'border-warning/30',
      earned: false,
      progress: 7,
      total: 10,
      rarity: 'Rare'
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'text-muted-foreground';
      case 'Uncommon':
        return 'text-stellar-blue';
      case 'Rare':
        return 'text-nebula-purple';
      case 'Epic':
        return 'text-solar-gold';
      case 'Legendary':
        return 'text-aurora-green';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-cosmic-sm bg-solar-gold/20 border border-solar-gold/30">
            <Icon name="Trophy" size={20} className="text-solar-gold" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Achievement Badges
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              Your cosmic exploration milestones
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-data text-sm text-foreground">
            3 of 6 earned
          </p>
          <p className="font-caption text-xs text-muted-foreground">
            50% complete
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements?.map((achievement) => (
          <div 
            key={achievement?.id} 
            className={`relative p-4 cosmic-backdrop rounded-cosmic-lg border ${
              achievement?.earned 
                ? `${achievement?.borderColor} cosmic-glow-sm` 
                : 'border-border opacity-75'
            } cosmic-transition hover:scale-105`}
          >
            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <span className={`font-caption text-xs px-2 py-1 rounded-cosmic-sm bg-card/80 backdrop-blur-sm border border-border/50 ${getRarityColor(achievement?.rarity)}`}>
                {achievement?.rarity}
              </span>
            </div>

            {/* Badge Icon */}
            <div className={`w-16 h-16 mx-auto mb-3 p-4 rounded-cosmic-lg ${achievement?.bgColor} border ${achievement?.borderColor} ${
              achievement?.earned ? 'cosmic-glow-sm' : ''
            }`}>
              <Icon 
                name={achievement?.icon} 
                size={32} 
                className={`${achievement?.color} ${achievement?.earned ? '' : 'opacity-50'}`} 
              />
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h3 className={`font-body font-semibold mb-1 ${
                achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.name}
              </h3>
              <p className="font-caption text-xs text-muted-foreground mb-3 leading-relaxed">
                {achievement?.description}
              </p>

              {/* Progress or Earned Date */}
              {achievement?.earned ? (
                <div className="flex items-center justify-center space-x-1">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="font-data text-xs text-success">
                    Earned {formatDate(achievement?.earnedDate)}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-full h-1.5 bg-muted rounded-cosmic-sm overflow-hidden">
                    <div 
                      className={`h-full ${achievement?.bgColor?.replace('/20', '')} cosmic-transition`}
                      style={{ width: `${(achievement?.progress / achievement?.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Target" size={12} className="text-muted-foreground" />
                    <span className="font-data text-xs text-muted-foreground">
                      {achievement?.progress}/{achievement?.total}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Earned Overlay */}
            {achievement?.earned && (
              <div className="absolute inset-0 rounded-cosmic-lg bg-gradient-to-br from-transparent via-transparent to-success/10 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
      {/* Achievement Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="font-data text-lg font-semibold text-foreground">3</p>
            <p className="font-caption text-xs text-muted-foreground">Earned</p>
          </div>
          <div className="text-center">
            <p className="font-data text-lg font-semibold text-foreground">3</p>
            <p className="font-caption text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="font-data text-lg font-semibold text-foreground">47</p>
            <p className="font-caption text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <p className="font-data text-lg font-semibold text-foreground">#127</p>
            <p className="font-caption text-xs text-muted-foreground">Global Rank</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;