import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FloatingNavigationHub from '../../components/ui/FloatingNavigationHub';
import LearningProgressIndicator from '../../components/ui/LearningProgressIndicator';

// Import components
import TourSelectionPanel from './components/TourSelectionPanel';
import TourNarrationPanel from './components/TourNarrationPanel';
import InteractiveHotspots from './components/InteractiveHotspots';
import TourCompletionModal from './components/TourCompletionModal';
import TourViewport3D from './components/TourViewport3D';

const GuidedTourMode = () => {
  const [isTourSelectionOpen, setIsTourSelectionOpen] = useState(false);
  const [activeTour, setActiveTour] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [tourProgress, setTourProgress] = useState({});

  // Tour state management
  useEffect(() => {
    // Auto-open tour selection on first visit
    if (!activeTour) {
      const timer = setTimeout(() => {
        setIsTourSelectionOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeTour]);

  const handleSelectTour = (tour) => {
    setActiveTour(tour);
    setCurrentStep(1);
    setTotalSteps(tour?.totalSteps || 8);
    setIsTourSelectionOpen(false);
    setIsPlaying(true);
    
    // Initialize tour progress
    setTourProgress({
      tourId: tour?.id,
      startTime: new Date(),
      stepsCompleted: 0,
      interactionsCount: 0
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setTourProgress(prev => ({
        ...prev,
        stepsCompleted: prev?.stepsCompleted + 1
      }));
    } else {
      // Tour completed
      setIsPlaying(false);
      setIsCompletionModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(totalSteps);
    setIsPlaying(false);
    setIsCompletionModalOpen(true);
  };

  const handleExitTour = () => {
    setActiveTour(null);
    setCurrentStep(1);
    setIsPlaying(false);
    setTourProgress({});
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleToggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const handleHotspotClick = (hotspot) => {
    setTourProgress(prev => ({
      ...prev,
      interactionsCount: prev?.interactionsCount + 1
    }));
  };

  const handleStartQuiz = () => {
    setIsCompletionModalOpen(false);
    // Navigate to quiz with tour context
    window.location.href = '/educational-quiz-center';
  };

  const handleExploreMore = () => {
    setIsCompletionModalOpen(false);
    // Navigate to free exploration
    window.location.href = '/3d-universe-explorer';
  };

  const handleRetakeTour = () => {
    setIsCompletionModalOpen(false);
    setCurrentStep(1);
    setIsPlaying(true);
    setTourProgress({
      ...tourProgress,
      startTime: new Date(),
      stepsCompleted: 0,
      interactionsCount: 0
    });
  };

  return (
    <div className="min-h-screen bg-deep-space-navy text-foreground">
      <Header />
      <FloatingNavigationHub />
      {/* Main Tour Interface */}
      <div className="pt-16 h-screen flex flex-col">
        
        {/* Tour Viewport */}
        <div className="flex-1 relative">
          {activeTour ? (
            <>
              {/* 3D Viewport */}
              <TourViewport3D
                currentTour={activeTour}
                currentStep={currentStep}
                isAnimating={isPlaying}
                onCameraMove={(position) => console.log('Camera moved:', position)}
                onObjectFocus={(object) => console.log('Focused on:', object)}
              />

              {/* Interactive Hotspots */}
              <InteractiveHotspots
                isVisible={activeTour && currentStep > 1}
                onHotspotClick={handleHotspotClick}
              />
            </>
          ) : (
            /* Welcome Screen */
            (<div className="h-full flex items-center justify-center bg-gradient-to-b from-deep-space-navy via-deep-space-navy/95 to-deep-space-navy">
              <div className="text-center max-w-2xl mx-auto px-6">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-nebula-purple to-stellar-blue cosmic-glow-lg flex items-center justify-center">
                  <Icon name="Route" size={48} className="text-white" />
                </div>
                
                <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                  Guided Tour Mode
                </h1>
                
                <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                  Embark on expertly crafted journeys through the cosmos with narrated content, 
                  interactive elements, and structured learning experiences designed to deepen 
                  your understanding of astronomical phenomena.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                    <Icon name="BookOpen" size={32} className="text-nebula-purple mx-auto mb-3" />
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Expert Narration
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Professional audio guides with scientific accuracy
                    </p>
                  </div>
                  
                  <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                    <Icon name="MousePointer" size={32} className="text-stellar-blue mx-auto mb-3" />
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Interactive Elements
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Clickable hotspots and immersive experiences
                    </p>
                  </div>
                  
                  <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                    <Icon name="Target" size={32} className="text-solar-gold mx-auto mb-3" />
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Structured Learning
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Progressive difficulty with clear learning objectives
                    </p>
                  </div>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setIsTourSelectionOpen(true)}
                  iconName="Play"
                  iconPosition="left"
                  className="cosmic-glow-md"
                >
                  Start Your Journey
                </Button>

                <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>15-30 min tours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Subtitles" size={16} />
                    <span>Closed captions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Smartphone" size={16} />
                    <span>Mobile optimized</span>
                  </div>
                </div>
              </div>
            </div>)
          )}
        </div>

        {/* Tour Narration Panel */}
        {activeTour && (
          <TourNarrationPanel
            isVisible={true}
            currentTour={activeTour}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
            onExit={handleExitTour}
            playbackSpeed={playbackSpeed}
            onSpeedChange={handleSpeedChange}
            showCaptions={showCaptions}
            onToggleCaptions={handleToggleCaptions}
          />
        )}

        {/* Learning Progress Indicator */}
        {activeTour && (
          <LearningProgressIndicator
            isVisible={true}
            mode="tour"
            currentStep={currentStep}
            totalSteps={totalSteps}
            title={activeTour?.title}
            subtitle={`Step ${currentStep}: ${
              currentStep === 1 ? "Introduction" :
              currentStep === 2 ? "Core Concepts" :
              currentStep === 3 ? "Detailed Exploration" :
              currentStep === 4 ? "Interactive Elements" :
              currentStep === 5 ? "Advanced Topics": "Summary & Conclusion"
            }`}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
            onExit={handleExitTour}
            canGoNext={currentStep < totalSteps}
            canGoPrevious={currentStep > 1}
            className="z-40"
          />
        )}
      </div>
      {/* Tour Selection Modal */}
      <TourSelectionPanel
        isOpen={isTourSelectionOpen}
        onClose={() => setIsTourSelectionOpen(false)}
        onSelectTour={handleSelectTour}
      />
      {/* Tour Completion Modal */}
      <TourCompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        tourData={activeTour}
        onStartQuiz={handleStartQuiz}
        onExploreMore={handleExploreMore}
        onRetakeTour={handleRetakeTour}
      />
      {/* Quick Access Toolbar */}
      {!activeTour && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-3">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Route"
                iconPosition="left"
                onClick={() => setIsTourSelectionOpen(true)}
              >
                Browse Tours
              </Button>
              
              <div className="w-px h-6 bg-border" />
              
              <Link to="/3d-universe-explorer">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Compass"
                  iconPosition="left"
                >
                  Free Explore
                </Button>
              </Link>
              
              <Link to="/educational-quiz-center">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Brain"
                  iconPosition="left"
                >
                  Take Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidedTourMode;