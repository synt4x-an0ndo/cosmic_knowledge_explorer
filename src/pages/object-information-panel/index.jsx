import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ObjectHeader from './components/ObjectHeader';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import PhysicalPropertiesTab from './components/PhysicalPropertiesTab';
import DiscoveryHistoryTab from './components/DiscoveryHistoryTab';
import EducationalContentTab from './components/EducationalContentTab';
import RelatedObjectsCarousel from './components/RelatedObjectsCarousel';
import ComparisonTool from './components/ComparisonTool';

const ObjectInformationPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedObject, setSelectedObject] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'properties', label: 'Properties', icon: 'Settings' },
    { id: 'history', label: 'Discovery', icon: 'Clock' },
    { id: 'education', label: 'Learn', icon: 'BookOpen', badge: true }
  ];

  // Mock object data
  const mockObject = {
    id: 'andromeda-galaxy',
    name: 'Andromeda Galaxy',
    alternativeNames: 'M31, NGC 224, Messier 31',
    classification: 'Spiral Galaxy',
    type: 'Barred Spiral Galaxy',
    constellation: 'Andromeda',
    distance: '2.537 million light-years',
    magnitude: '3.44',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop',
    isNew: false,
    description: `The Andromeda Galaxy is a barred spiral galaxy and is the nearest major galaxy to the Milky Way. It was originally named the Andromeda Nebula and is cataloged as Messier 31, M31, and NGC 224. With a diameter of about 220,000 light-years, Andromeda is the largest galaxy in the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.`,
    
    // Physical Properties
    diameter: '220,000 light-years',
    radius: '110,000 light-years',
    surfaceArea: '1.52 × 10¹¹ ly²',
    volume: '5.58 × 10¹⁶ ly³',
    mass: '1.5 × 10¹² solar masses',
    density: '0.3 solar masses/pc³',
    surfaceGravity: 'Variable',
    escapeVelocity: '~300 km/s',
    orbitalPeriod: '~4.5 billion years',
    rotationPeriod: '~250 million years',
    orbitalVelocity: '~110 km/s',
    axialTilt: '77°',
    surfaceTemperature: '2.7 K (cosmic background)',
    coreTemperature: '~10⁷ K',
    atmosphericPressure: 'N/A',
    atmosphericComposition: 'Interstellar medium',
    composition: 'Stars, gas, dust, dark matter',
    spectralClass: 'Sb',
    metallicity: 'Solar-like',
    properMotion: '-301 mas/yr',
    radialVelocity: '-301 km/s',
    photometricData: 'B-V = 0.92',
    
    // Discovery Information
    discoveryDate: '964 AD',
    discoverer: 'Abd al-Rahman al-Sufi',
    discoveryMethod: 'Visual observation',
    discoveryLocation: 'Isfahan, Persia',
    firstPhotographDate: '1887',
    catalogDate: '1764',
    catalog: 'Messier Catalog',
    catalogNumber: 'M31',
    modernStudyDate: '1925',
    cataloger: 'Charles Messier',
    modernResearcher: 'Edwin Hubble',
    historicalContext: `The Andromeda Galaxy was first described by Persian astronomer Abd al-Rahman al-Sufi in 964 AD as a "nebulous smear." It remained a mystery for centuries until Edwin Hubble's groundbreaking observations in 1925 proved it was actually a separate galaxy beyond our own Milky Way, revolutionizing our understanding of the universe's scale.`,
    
    // Educational Content
    interestingFacts: [
      'Contains approximately one trillion stars, more than twice the number in the Milky Way',
      'Is approaching the Milky Way at about 250,000 mph and will collide in approximately 4.5 billion years',
      'Has a supermassive black hole at its center with a mass of 100-230 million solar masses',
      'Can be seen with the naked eye from Earth under dark skies as a faint, fuzzy patch',
      'Has at least 14 dwarf satellite galaxies orbiting around it'
    ],
    observationTips: `Best viewed during autumn months in the Northern Hemisphere. Look for a faint, oval-shaped smudge in the constellation Andromeda. Use binoculars or a small telescope to see more detail. The galaxy appears largest when viewed away from city lights in dark sky locations.`
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSelectedObject(mockObject);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedObject?.name} - Cosmic Knowledge Explorer`,
        text: `Learn about ${selectedObject?.name} and its fascinating properties`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    setActiveTab('overview');
  };

  const renderTabContent = () => {
    if (!selectedObject) return null;

    switch (activeTab) {
      case 'overview':
        return <OverviewTab object={selectedObject} />;
      case 'properties':
        return <PhysicalPropertiesTab object={selectedObject} />;
      case 'history':
        return <DiscoveryHistoryTab object={selectedObject} />;
      case 'education':
        return <EducationalContentTab object={selectedObject} />;
      default:
        return <OverviewTab object={selectedObject} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-lg animate-cosmic-pulse flex items-center justify-center">
            <Icon name="Telescope" size={24} className="text-white" />
          </div>
          <p className="font-body text-muted-foreground">Loading cosmic data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Breadcrumb */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/3d-universe-explorer" 
              className="text-muted-foreground hover:text-foreground cosmic-transition"
            >
              3D Explorer
            </Link>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Object Information</span>
            {selectedObject && (
              <>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                <span className="text-primary">{selectedObject?.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>
      <div className="flex min-h-[calc(100vh-60px)]">
        {/* 3D View Placeholder */}
        <div className="hidden lg:block w-1/3 bg-deep-space-navy border-r border-border relative">
          <div className="absolute inset-0 bg-gradient-to-br from-stellar-blue/10 via-transparent to-nebula-purple/10">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-xl animate-cosmic-pulse flex items-center justify-center">
                  <Icon name="Globe" size={32} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  3D Universe View
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Interactive 3D visualization would appear here
                </p>
                <Link to="/3d-universe-explorer">
                  <Button variant="outline" iconName="ArrowLeft" iconPosition="left">
                    Return to Explorer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="flex-1 flex flex-col">
          {selectedObject && (
            <>
              {/* Object Header */}
              <ObjectHeader
                object={selectedObject}
                onClose={() => window.history?.back()}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked}
                onShare={handleShare}
              />

              {/* Tab Navigation */}
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs}
              />

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {renderTabContent()}
              </div>

              {/* Related Objects Carousel */}
              <RelatedObjectsCarousel
                currentObject={selectedObject}
                onObjectSelect={handleObjectSelect}
              />
            </>
          )}
        </div>
      </div>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={() => setShowComparison(true)}
          className="w-14 h-14 rounded-full cosmic-glow-md hover:cosmic-glow-lg"
        >
          <Icon name="BarChart3" size={20} />
        </Button>
        
        <Link to="/guided-tour-mode">
          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full cosmic-backdrop border-border hover:border-primary/30"
          >
            <Icon name="Route" size={20} />
          </Button>
        </Link>
        
        <Link to="/educational-quiz-center">
          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full cosmic-backdrop border-border hover:border-primary/30"
          >
            <Icon name="Brain" size={20} />
          </Button>
        </Link>
      </div>
      {/* Comparison Tool Modal */}
      <ComparisonTool
        currentObject={selectedObject}
        isVisible={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default ObjectInformationPanel;