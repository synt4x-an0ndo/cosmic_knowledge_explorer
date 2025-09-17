import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TourSelectionPanel = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onSelectTour = () => {},
  className = '' 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tourCategories = [
    { id: 'all', label: 'All Tours', icon: 'Globe' },
    { id: 'solar-system', label: 'Solar System', icon: 'Sun' },
    { id: 'stellar', label: 'Stars & Stellar Evolution', icon: 'Star' },
    { id: 'galaxies', label: 'Galaxies & Nebulae', icon: 'Sparkles' },
    { id: 'deep-space', label: 'Deep Space Objects', icon: 'Telescope' }
  ];

  const availableTours = [
    {
      id: 'solar-basics',
      title: 'Solar System Basics',
      category: 'solar-system',
      difficulty: 'Beginner',
      duration: '15 min',
      description: 'Explore the eight planets and their unique characteristics in our solar system.',
      highlights: ['Planet formation', 'Orbital mechanics', 'Atmospheric composition'],
      thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop'
    },
    {
      id: 'stellar-evolution',
      title: 'Life Cycle of Stars',
      category: 'stellar',
      difficulty: 'Intermediate',
      duration: '25 min',
      description: 'Journey through stellar evolution from birth to death, including supernovas and black holes.',
      highlights: ['Main sequence stars', 'Red giants', 'Neutron stars', 'Black holes'],
      thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop'
    },
    {
      id: 'galaxy-formation',
      title: 'Galaxy Formation & Structure',
      category: 'galaxies',
      difficulty: 'Advanced',
      duration: '30 min',
      description: 'Understand how galaxies form, evolve, and interact across cosmic time.',
      highlights: ['Spiral arms', 'Dark matter', 'Galaxy collisions', 'Active galactic nuclei'],
      thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop'
    },
    {
      id: 'exoplanets',
      title: 'Exoplanet Discovery',
      category: 'deep-space',
      difficulty: 'Intermediate',
      duration: '20 min',
      description: 'Discover worlds beyond our solar system and the methods used to find them.',
      highlights: ['Transit method', 'Habitable zones', 'Super-Earths', 'Hot Jupiters'],
      thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop'
    },
    {
      id: 'cosmic-scale',
      title: 'Scale of the Universe',
      category: 'all',
      difficulty: 'Beginner',
      duration: '18 min',
      description: 'Experience the mind-boggling scale from atoms to the observable universe.',
      highlights: ['Powers of ten', 'Light years', 'Cosmic distances', 'Observable universe'],
      thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop'
    },
    {
      id: 'nebulae-exploration',
      title: 'Nebulae & Star Formation',
      category: 'galaxies',
      difficulty: 'Intermediate',
      duration: '22 min',
      description: 'Explore colorful nebulae where new stars are born and old stars meet their end.',
      highlights: ['Emission nebulae', 'Planetary nebulae', 'Supernova remnants', 'Star nurseries'],
      thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop'
    }
  ];

  const filteredTours = selectedCategory === 'all' 
    ? availableTours 
    : availableTours?.filter(tour => tour?.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-aurora-green bg-aurora-green/20 border-aurora-green/30';
      case 'Intermediate': return 'text-solar-gold bg-solar-gold/20 border-solar-gold/30';
      case 'Advanced': return 'text-red-giant-crimson bg-red-giant-crimson/20 border-red-giant-crimson/30';
      default: return 'text-muted-foreground bg-muted/20 border-muted/30';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Panel */}
      <div className={`fixed inset-4 md:inset-8 lg:inset-16 z-50 cosmic-backdrop rounded-cosmic-xl border border-border cosmic-glow-lg overflow-hidden ${className}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-cosmic-md bg-nebula-purple/20 border border-nebula-purple/30 flex items-center justify-center">
              <Icon name="Route" size={20} className="text-nebula-purple" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground">
                Choose Your Cosmic Journey
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Select a guided tour to explore the universe with expert narration
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {tourCategories?.map((category) => (
              <Button
                key={category?.id}
                variant={selectedCategory === category?.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category?.id)}
                iconName={category?.icon}
                iconPosition="left"
                className="cosmic-transition"
              >
                {category?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tours Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours?.map((tour) => (
              <div
                key={tour?.id}
                className="group cosmic-backdrop rounded-cosmic-lg border border-border hover:border-primary/30 cosmic-transition hover:cosmic-glow-sm cursor-pointer overflow-hidden"
                onClick={() => onSelectTour(tour)}
              >
                {/* Thumbnail */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={tour?.thumbnail}
                    alt={tour?.title}
                    className="w-full h-full object-cover group-hover:scale-105 cosmic-transition"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-cosmic-sm text-xs font-medium border ${getDifficultyColor(tour?.difficulty)}`}>
                      {tour?.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-white">
                    <Icon name="Clock" size={14} />
                    <span className="font-data text-sm">{tour?.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary cosmic-transition">
                    {tour?.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
                    {tour?.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="font-caption text-xs text-muted-foreground font-medium">
                      Tour Highlights:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tour?.highlights?.slice(0, 3)?.map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted/30 text-muted-foreground rounded-cosmic-sm text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                      {tour?.highlights?.length > 3 && (
                        <span className="px-2 py-1 bg-muted/30 text-muted-foreground rounded-cosmic-sm text-xs">
                          +{tour?.highlights?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-4 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary/10 group-hover:border-primary/30 cosmic-transition"
                    iconName="Play"
                    iconPosition="left"
                  >
                    Start Tour
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Info" size={16} />
              <span className="font-caption text-sm">
                Tours include narration, closed captions, and interactive elements
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourSelectionPanel;