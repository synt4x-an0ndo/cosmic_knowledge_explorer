import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LearningProgressIndicator = ({ 
  isVisible = false,
  mode = 'tour', // 'tour' | 'quiz' | 'exploration'
  currentStep = 1,
  totalSteps = 10,
  title = 'Guided Tour',
  subtitle = 'Exploring the Solar System',
  onNext = () => {},
  onPrevious = () => {},
  onSkip = () => {},
  onExit = () => {},
  canGoNext = true,
  canGoPrevious = true,
  className = ''
}) => {
  if (!isVisible) return null;

  const progressPercentage = (currentStep / totalSteps) * 100;

  const getModeConfig = () => {
    switch (mode) {
      case 'tour':
        return {
          icon: 'Route',
          color: 'text-nebula-purple',
          bgColor: 'bg-nebula-purple/20',
          borderColor: 'border-nebula-purple/30'
        };
      case 'quiz':
        return {
          icon: 'Brain',
          color: 'text-solar-gold',
          bgColor: 'bg-solar-gold/20',
          borderColor: 'border-solar-gold/30'
        };
      case 'exploration':
        return {
          icon: 'Compass',
          color: 'text-stellar-blue',
          bgColor: 'bg-stellar-blue/20',
          borderColor: 'border-stellar-blue/30'
        };
      default:
        return {
          icon: 'BookOpen',
          color: 'text-primary',
          bgColor: 'bg-primary/20',
          borderColor: 'border-primary/30'
        };
    }
  };

  const config = getModeConfig();

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}>
      <div className="cosmic-backdrop border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-cosmic-sm ${config?.bgColor} border ${config?.borderColor}`}>
                <Icon name={config?.icon} size={18} className={config?.color} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {title}
                </h3>
                <p className="font-caption text-sm text-muted-foreground">
                  {subtitle}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onExit}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="font-data text-sm text-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <div className="relative h-2 bg-muted rounded-cosmic-sm overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${config?.bgColor?.replace('/20', '')} cosmic-transition rounded-cosmic-sm`}
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent to-white/20 cosmic-transition rounded-cosmic-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                disabled={!canGoPrevious}
                iconName="ChevronLeft"
                iconPosition="left"
                className="cosmic-transition"
              >
                Previous
              </Button>
              
              {mode === 'tour' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip Tour
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Step Indicators */}
              <div className="hidden sm:flex items-center space-x-1 mx-4">
                {Array.from({ length: Math.min(totalSteps, 8) }, (_, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  
                  return (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full cosmic-transition ${
                        isActive 
                          ? `${config?.bgColor?.replace('/20', '')} cosmic-glow-sm` 
                          : isCompleted 
                            ? 'bg-success' :'bg-muted'
                      }`}
                    />
                  );
                })}
                {totalSteps > 8 && (
                  <span className="font-caption text-xs text-muted-foreground ml-2">
                    +{totalSteps - 8} more
                  </span>
                )}
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={onNext}
                disabled={!canGoNext}
                iconName="ChevronRight"
                iconPosition="right"
                className={`cosmic-transition ${config?.bgColor} ${config?.borderColor} hover:cosmic-glow-sm`}
              >
                {currentStep === totalSteps ? 'Complete' : 'Next'}
              </Button>
            </div>
          </div>

          {/* Additional Info for Quiz Mode */}
          {mode === 'quiz' && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="font-caption text-muted-foreground">
                      Correct: 7
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="XCircle" size={16} className="text-error" />
                    <span className="font-caption text-muted-foreground">
                      Incorrect: 2
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="font-data text-muted-foreground">
                    05:23
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningProgressIndicator;