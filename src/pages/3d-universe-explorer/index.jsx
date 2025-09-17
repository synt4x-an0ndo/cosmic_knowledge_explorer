import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FloatingNavigationHub from '../../components/ui/FloatingNavigationHub';
import ContextualInformationOverlay from '../../components/ui/ContextualInformationOverlay';
import SceneControlsPanel from '../../components/ui/SceneControlsPanel';
import LearningProgressIndicator from '../../components/ui/LearningProgressIndicator';
import UniverseScene from './components/UniverseScene';
import SearchAndFilter from './components/SearchAndFilter';
import NavigationBreadcrumbs from './components/NavigationBreadcrumbs';
import BookmarkPanel from './components/BookmarkPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UniverseExplorer = () => {
  // Core state management
  const [selectedObject, setSelectedObject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentLocation, setCurrentLocation] = useState('Solar System');
  const [bookmarkedObjects, setBookmarkedObjects] = useState([]);
  
  // 3D scene controls
  const [viewMode, setViewMode] = useState('3d');
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // UI state
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(false);
  const [isGuidedTourActive, setIsGuidedTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize the application
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate loading time for 3D scene initialization
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    
    initializeApp();
  }, []);

  // Handle object selection
  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    setIsInfoOverlayOpen(true);
  };

  // Handle search functionality
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle filtering
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handle location navigation
  const handleLocationChange = (location) => {
    setCurrentLocation(location?.name);
    // Reset view when changing location
    setSelectedObject(null);
    setIsInfoOverlayOpen(false);
  };

  // Handle bookmarking
  const handleBookmarkAdd = (object) => {
    setBookmarkedObjects(prev => [...prev, object]);
  };

  const handleBookmarkRemove = (objectId) => {
    setBookmarkedObjects(prev => prev?.filter(obj => obj?.id !== objectId));
  };

  const handleBookmarkSelect = (bookmark) => {
    setSelectedObject(bookmark);
    setIsInfoOverlayOpen(true);
  };

  // Handle 3D scene controls
  const handleZoomIn = () => {
    console.log('Zooming in...');
  };

  const handleZoomOut = () => {
    console.log('Zooming out...');
  };

  const handleResetView = () => {
    setSelectedObject(null);
    setIsInfoOverlayOpen(false);
    setCurrentTime(0);
    console.log('Resetting view...');
  };

  const handleToggleAnimation = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
  };

  const handleTimeChange = (time) => {
    setCurrentTime(time);
  };

  // Handle guided tour
  const handleStartGuidedTour = () => {
    setIsGuidedTourActive(true);
    setTourStep(1);
  };

  const handleTourNext = () => {
    if (tourStep < 10) {
      setTourStep(tourStep + 1);
    } else {
      setIsGuidedTourActive(false);
      setTourStep(1);
    }
  };

  const handleTourPrevious = () => {
    if (tourStep > 1) {
      setTourStep(tourStep - 1);
    }
  };

  const handleTourSkip = () => {
    setIsGuidedTourActive(false);
    setTourStep(1);
  };

  const handleTourExit = () => {
    setIsGuidedTourActive(false);
    setTourStep(1);
  };

  // Handle fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event?.key) {
        case 'Escape':
          if (isInfoOverlayOpen) {
            setIsInfoOverlayOpen(false);
          }
          break;
        case ' ':
          event?.preventDefault();
          handleToggleAnimation();
          break;
        case 'f': case'F':
          if (event?.ctrlKey) {
            event?.preventDefault();
            handleToggleFullscreen();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isInfoOverlayOpen, isAnimationPlaying]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-lg flex items-center justify-center mx-auto">
            <Icon name="Telescope" size={32} color="white" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-xl text-foreground">
              Initializing 3D Universe
            </h2>
            <p className="font-body text-muted-foreground">
              Loading cosmic objects and preparing the scene...
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-stellar-blue animate-cosmic-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-nebula-purple animate-cosmic-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-solar-gold animate-cosmic-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main 3D Universe Scene */}
      <main className="pt-16 h-screen">
        <UniverseScene
          selectedObject={selectedObject}
          onObjectSelect={handleObjectSelect}
          viewMode={viewMode}
          isAnimationPlaying={isAnimationPlaying}
          currentTime={currentTime}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
        />
      </main>

      {/* Search and Filter Panel */}
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onClearSearch={handleClearSearch}
      />

      {/* Navigation Breadcrumbs */}
      <NavigationBreadcrumbs
        currentLocation={currentLocation}
        selectedObject={selectedObject}
        onLocationChange={handleLocationChange}
      />

      {/* Scene Controls Panel */}
      <SceneControlsPanel
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onToggleAnimation={handleToggleAnimation}
        isAnimationPlaying={isAnimationPlaying}
        currentTime={currentTime}
        onTimeChange={handleTimeChange}
        maxTime={100}
      />

      {/* Bookmark Panel */}
      <BookmarkPanel
        bookmarkedObjects={bookmarkedObjects}
        onBookmarkAdd={handleBookmarkAdd}
        onBookmarkRemove={handleBookmarkRemove}
        onBookmarkSelect={handleBookmarkSelect}
        selectedObject={selectedObject}
      />

      {/* Floating Navigation Hub */}
      <FloatingNavigationHub />

      {/* Contextual Information Overlay */}
      <ContextualInformationOverlay
        isOpen={isInfoOverlayOpen}
        onClose={() => setIsInfoOverlayOpen(false)}
        selectedObject={selectedObject}
      />

      {/* Learning Progress Indicator for Guided Tours */}
      <LearningProgressIndicator
        isVisible={isGuidedTourActive}
        mode="tour"
        currentStep={tourStep}
        totalSteps={10}
        title="Cosmic Discovery Tour"
        subtitle="Exploring the wonders of our universe"
        onNext={handleTourNext}
        onPrevious={handleTourPrevious}
        onSkip={handleTourSkip}
        onExit={handleTourExit}
        canGoNext={true}
        canGoPrevious={tourStep > 1}
      />

      {/* Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        {!isGuidedTourActive && (
          <Button
            variant="default"
            size="lg"
            onClick={handleStartGuidedTour}
            iconName="Play"
            iconPosition="left"
            className="cosmic-glow-md hover:cosmic-glow-lg cosmic-transition"
          >
            Start Tour
          </Button>
        )}
        
        <Link to="/educational-quiz-center">
          <Button
            variant="outline"
            size="lg"
            iconName="Brain"
            iconPosition="left"
            className="cosmic-transition hover:cosmic-glow-sm"
          >
            Take Quiz
          </Button>
        </Link>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="cosmic-backdrop rounded-cosmic-md px-4 py-2 border border-border">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">Space</kbd>
              <span className="text-muted-foreground">Play/Pause</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">Esc</kbd>
              <span className="text-muted-foreground">Close Panel</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">Ctrl+F</kbd>
              <span className="text-muted-foreground">Fullscreen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseExplorer;