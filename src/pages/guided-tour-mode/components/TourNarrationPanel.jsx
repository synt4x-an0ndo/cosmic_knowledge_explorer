import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TourNarrationPanel = ({ 
  isVisible = true,
  currentTour = null,
  currentStep = 1,
  totalSteps = 10,
  isPlaying = false,
  onPlayPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onSkip = () => {},
  onExit = () => {},
  playbackSpeed = 1,
  onSpeedChange = () => {},
  showCaptions = true,
  onToggleCaptions = () => {},
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const mockNarrationContent = {
    title: currentTour?.title || "Solar System Basics",
    currentTopic: `Step ${currentStep}: ${
      currentStep === 1 ? "Introduction to Our Solar System" :
      currentStep === 2 ? "The Sun - Our Central Star" :
      currentStep === 3 ? "Inner Rocky Planets" :
      currentStep === 4 ? "The Asteroid Belt" :
      currentStep === 5 ? "Outer Gas Giants": "Dwarf Planets and Beyond"
    }`,
    narrationText: `Welcome to our exploration of the Solar System. In this segment, we'll discover the fascinating world of ${
      currentStep === 1 ? "our cosmic neighborhood, formed 4.6 billion years ago from a collapsing cloud of gas and dust." :
      currentStep === 2 ? "the Sun, a G-type main-sequence star that contains 99.86% of the Solar System's mass." :
      currentStep === 3 ? "Mercury, Venus, Earth, and Mars - the terrestrial planets with solid surfaces and thin atmospheres." :
      currentStep === 4 ? "millions of rocky objects orbiting between Mars and Jupiter, remnants from planetary formation." :
      currentStep === 5 ? "Jupiter, Saturn, Uranus, and Neptune - massive worlds composed primarily of hydrogen and helium." :"Pluto, Ceres, and other dwarf planets that help us understand the outer reaches of our solar system."
    }`,
    captions: showCaptions ? `[Narrator]: ${
      currentStep === 1 ? "The Solar System formed from a nebular cloud..." :
      currentStep === 2 ? "Our Sun generates energy through nuclear fusion..." :
      currentStep === 3 ? "These rocky worlds show diverse geological features..." :
      currentStep === 4 ? "The asteroid belt contains over one million objects..." :
      currentStep === 5 ? "Gas giants possess complex ring systems and many moons..." :"Dwarf planets maintain their own orbital paths around the Sun..."
    }` : null
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + (1 * playbackSpeed);
          return newTime >= duration ? duration : newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 cosmic-backdrop border-t border-border ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Collapse/Expand Toggle */}
        <div className="flex items-center justify-center py-2 border-b border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronDown' : 'ChevronUp'}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Minimize' : 'Expand'} Tour Panel
          </Button>
        </div>

        {isExpanded && (
          <div className="p-6 space-y-4">
            
            {/* Tour Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-cosmic-md bg-nebula-purple/20 border border-nebula-purple/30 flex items-center justify-center">
                  <Icon name="Route" size={18} className="text-nebula-purple" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    {mockNarrationContent?.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {mockNarrationContent?.currentTopic}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-data text-sm text-muted-foreground">
                  {currentStep} / {totalSteps}
                </span>
                <Button variant="ghost" size="icon" onClick={onExit}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">
                  Audio Progress
                </span>
                <span className="font-data text-sm text-foreground">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="relative h-2 bg-muted rounded-cosmic-sm overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-nebula-purple cosmic-transition"
                  style={{ width: `${progressPercentage}%` }}
                />
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent to-white/20"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Narration Text */}
              <div className="lg:col-span-2 space-y-4">
                <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
                  <h4 className="font-heading font-medium text-foreground mb-3">
                    Current Narration
                  </h4>
                  <p className="font-body text-foreground leading-relaxed">
                    {mockNarrationContent?.narrationText}
                  </p>
                </div>
                
                {/* Captions */}
                {showCaptions && mockNarrationContent?.captions && (
                  <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border bg-card/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Subtitles" size={16} className="text-primary" />
                      <span className="font-caption text-sm font-medium text-foreground">
                        Live Captions
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground italic">
                      {mockNarrationContent?.captions}
                    </p>
                  </div>
                )}
              </div>

              {/* Controls Panel */}
              <div className="space-y-4">
                
                {/* Playback Controls */}
                <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
                  <h4 className="font-heading font-medium text-foreground mb-3">
                    Playback Controls
                  </h4>
                  
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onPrevious}
                      disabled={currentStep === 1}
                    >
                      <Icon name="SkipBack" size={18} />
                    </Button>
                    
                    <Button
                      variant="default"
                      size="lg"
                      onClick={onPlayPause}
                      iconName={isPlaying ? 'Pause' : 'Play'}
                      className="cosmic-glow-sm"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onNext}
                      disabled={currentStep === totalSteps}
                    >
                      <Icon name="SkipForward" size={18} />
                    </Button>
                  </div>

                  {/* Speed Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-caption text-sm text-muted-foreground">
                        Speed
                      </span>
                      <span className="font-data text-sm text-foreground">
                        {playbackSpeed}x
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {speedOptions?.map((speed) => (
                        <Button
                          key={speed}
                          variant={playbackSpeed === speed ? 'default' : 'outline'}
                          size="xs"
                          onClick={() => onSpeedChange(speed)}
                          className="text-xs"
                        >
                          {speed}x
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tour Navigation */}
                <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
                  <h4 className="font-heading font-medium text-foreground mb-3">
                    Tour Navigation
                  </h4>
                  
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconName="List"
                      iconPosition="left"
                    >
                      View All Steps
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconName="FastForward"
                      iconPosition="left"
                      onClick={onSkip}
                    >
                      Skip to End
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconName={showCaptions ? 'EyeOff' : 'Eye'}
                      iconPosition="left"
                      onClick={onToggleCaptions}
                    >
                      {showCaptions ? 'Hide' : 'Show'} Captions
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
                  <h4 className="font-heading font-medium text-foreground mb-3">
                    Quick Actions
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Bookmark"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Share"
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Camera"
                    >
                      Screenshot
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="HelpCircle"
                    >
                      Help
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourNarrationPanel;