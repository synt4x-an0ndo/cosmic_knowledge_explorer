import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizCategoryCard = ({ 
  category, 
  onStartQuiz = () => {},
  className = '' 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-aurora-green bg-aurora-green/20 border-aurora-green/30';
      case 'Intermediate':
        return 'text-solar-gold bg-solar-gold/20 border-solar-gold/30';
      case 'Advanced':
        return 'text-red-giant-crimson bg-red-giant-crimson/20 border-red-giant-crimson/30';
      default:
        return 'text-stellar-blue bg-stellar-blue/20 border-stellar-blue/30';
    }
  };

  const getIconColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'solar system':
        return 'text-solar-gold';
      case 'stellar classification':
        return 'text-stellar-blue';
      case 'galaxy types':
        return 'text-nebula-purple';
      case 'cosmic phenomena':
        return 'text-red-giant-crimson';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={`cosmic-backdrop rounded-cosmic-lg border border-border p-6 cosmic-transition hover:cosmic-glow-sm hover:border-primary/30 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-cosmic-md bg-card/50 ${getIconColor(category?.name)}`}>
          <Icon name={category?.icon} size={24} />
        </div>
        <div className={`px-3 py-1 rounded-cosmic-sm text-xs font-medium border ${getDifficultyColor(category?.difficulty)}`}>
          {category?.difficulty}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          {category?.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {category?.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="font-data text-2xl font-bold text-foreground">
            {category?.totalQuestions}
          </p>
          <p className="font-caption text-xs text-muted-foreground">
            Questions
          </p>
        </div>
        <div className="text-center">
          <p className="font-data text-2xl font-bold text-foreground">
            {category?.averageTime}
          </p>
          <p className="font-caption text-xs text-muted-foreground">
            Avg Time
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-caption text-xs text-muted-foreground">
            Best Score
          </span>
          <span className="font-data text-sm text-foreground">
            {category?.bestScore}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-cosmic-sm overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-stellar-blue to-nebula-purple rounded-cosmic-sm cosmic-transition"
            style={{ width: `${category?.bestScore}%` }}
          />
        </div>
      </div>
      <Button
        variant="default"
        className="w-full"
        onClick={() => onStartQuiz(category)}
        iconName="Play"
        iconPosition="left"
      >
        Start Quiz
      </Button>
      {category?.completedQuizzes > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="font-caption text-muted-foreground">
              Completed: {category?.completedQuizzes} times
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="Trophy" size={12} className="text-solar-gold" />
              <span className="font-caption text-muted-foreground">
                {category?.achievements} badges
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCategoryCard;