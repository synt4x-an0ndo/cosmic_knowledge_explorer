import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizSidebar = ({ 
  categories = [],
  selectedCategory = null,
  onCategorySelect = () => {},
  userStats = {},
  className = '' 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'Circle';
      case 'Intermediate':
        return 'CircleDot';
      case 'Advanced':
        return 'Target';
      default:
        return 'Circle';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-aurora-green';
      case 'Intermediate':
        return 'text-solar-gold';
      case 'Advanced':
        return 'text-red-giant-crimson';
      default:
        return 'text-stellar-blue';
    }
  };

  return (
    <div className={`cosmic-backdrop border border-border rounded-cosmic-lg ${
      isCollapsed ? 'w-16' : 'w-80'
    } cosmic-transition ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={20} className="text-primary" />
              <h2 className="font-heading font-semibold text-foreground">
                Quiz Categories
              </h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="w-8 h-8"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
            />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <>
          {/* User Stats */}
          <div className="p-4 border-b border-border">
            <h3 className="font-body font-medium text-foreground mb-3">
              Your Progress
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-cosmic-sm bg-card/20">
                <div className="font-data text-lg font-bold text-foreground">
                  {userStats?.totalQuizzes || 0}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Completed
                </div>
              </div>
              <div className="text-center p-2 rounded-cosmic-sm bg-card/20">
                <div className="font-data text-lg font-bold text-foreground">
                  {userStats?.averageScore || 0}%
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Avg Score
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span className="font-caption text-xs text-muted-foreground">
                  Overall Progress
                </span>
                <span className="font-data text-xs text-foreground">
                  {userStats?.overallProgress || 0}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-cosmic-sm overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-stellar-blue to-nebula-purple cosmic-transition"
                  style={{ width: `${userStats?.overallProgress || 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Categories List */}
          <div className="p-4">
            <div className="space-y-2">
              {categories?.map((category) => {
                const isSelected = selectedCategory?.id === category?.id;
                
                return (
                  <button
                    key={category?.id}
                    onClick={() => onCategorySelect(category)}
                    className={`w-full text-left p-3 rounded-cosmic-md cosmic-transition ${
                      isSelected 
                        ? 'bg-primary/20 border border-primary/30 cosmic-glow-sm' :'hover:bg-muted/30 border border-transparent hover:border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={category?.icon} 
                          size={18} 
                          className={isSelected ? 'text-primary' : 'text-muted-foreground'} 
                        />
                        <span className={`font-body font-medium text-sm ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}>
                          {category?.name}
                        </span>
                      </div>
                      <Icon 
                        name={getDifficultyIcon(category?.difficulty)} 
                        size={14} 
                        className={getDifficultyColor(category?.difficulty)} 
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {category?.totalQuestions} questions
                      </span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {category?.averageTime}
                        </span>
                      </div>
                    </div>
                    {category?.bestScore > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">
                            Best: {category?.bestScore}%
                          </span>
                          {category?.achievements > 0 && (
                            <div className="flex items-center space-x-1">
                              <Icon name="Trophy" size={10} className="text-solar-gold" />
                              <span className="text-xs text-muted-foreground">
                                {category?.achievements}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="h-1 bg-muted rounded-cosmic-sm overflow-hidden">
                          <div 
                            className="h-full bg-stellar-blue rounded-cosmic-sm"
                            style={{ width: `${category?.bestScore}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            <h3 className="font-body font-medium text-foreground mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                iconName="Shuffle"
                iconPosition="left"
              >
                Random Quiz
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                iconName="TrendingUp"
                iconPosition="left"
              >
                View Progress
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                iconName="Settings"
                iconPosition="left"
              >
                Quiz Settings
              </Button>
            </div>
          </div>
        </>
      )}
      {/* Collapsed State */}
      {isCollapsed && (
        <div className="p-2">
          <div className="space-y-2">
            {categories?.slice(0, 6)?.map((category) => (
              <button
                key={category?.id}
                onClick={() => onCategorySelect(category)}
                className={`w-full p-2 rounded-cosmic-md cosmic-transition ${
                  selectedCategory?.id === category?.id 
                    ? 'bg-primary/20 border border-primary/30' :'hover:bg-muted/30'
                }`}
                title={category?.name}
              >
                <Icon 
                  name={category?.icon} 
                  size={20} 
                  className={selectedCategory?.id === category?.id ? 'text-primary' : 'text-muted-foreground'} 
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSidebar;