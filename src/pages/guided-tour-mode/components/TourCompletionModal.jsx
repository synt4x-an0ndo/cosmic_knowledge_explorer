import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TourCompletionModal = ({ 
  isOpen = false,
  onClose = () => {},
  tourData = null,
  onStartQuiz = () => {},
  onExploreMore = () => {},
  onRetakeTour = () => {},
  className = ''
}) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const mockTourData = tourData || {
    title: 'Solar System Basics',
    duration: '15 minutes',
    stepsCompleted: 8,
    totalSteps: 8,
    category: 'Beginner',
    achievements: [
      { id: 'first-tour', name: 'First Tour Complete', icon: 'Award' },
      { id: 'solar-expert', name: 'Solar System Explorer', icon: 'Sun' },
      { id: 'perfect-score', name: 'Perfect Attention', icon: 'Star' }
    ],
    stats: {
      timeSpent: '14:32',
      interactionsCompleted: 12,
      hotspotsExplored: 8,
      averageEngagement: 95
    },
    relatedTours: [
      {
        id: 'stellar-evolution',
        title: 'Life Cycle of Stars',
        difficulty: 'Intermediate',
        duration: '25 min',
        thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&h=120&fit=crop'
      },
      {
        id: 'exoplanets',
        title: 'Exoplanet Discovery',
        difficulty: 'Intermediate',
        duration: '20 min',
        thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=120&fit=crop'
      },
      {
        id: 'cosmic-scale',
        title: 'Scale of the Universe',
        difficulty: 'Beginner',
        duration: '18 min',
        thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&h=120&fit=crop'
      }
    ]
  };

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
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
      {/* Modal */}
      <div className={`fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 z-50 cosmic-backdrop rounded-cosmic-xl border border-border cosmic-glow-lg overflow-hidden ${className}`}>
        
        {/* Header */}
        <div className="relative p-6 border-b border-border bg-gradient-to-r from-nebula-purple/10 to-stellar-blue/10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aurora-green/20 border-2 border-aurora-green/40 flex items-center justify-center cosmic-glow-md">
              <Icon name="CheckCircle" size={32} className="text-aurora-green" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
              Tour Complete!
            </h2>
            <p className="font-body text-muted-foreground">
              Congratulations on completing "{mockTourData?.title}"
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Tour Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Stats */}
              <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} className="text-primary" />
                  <span>Tour Statistics</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded-cosmic-md">
                    <p className="font-data text-2xl font-bold text-foreground">
                      {mockTourData?.stats?.timeSpent}
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      Time Spent
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-cosmic-md">
                    <p className="font-data text-2xl font-bold text-foreground">
                      {mockTourData?.stats?.interactionsCompleted}
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      Interactions
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-cosmic-md">
                    <p className="font-data text-2xl font-bold text-foreground">
                      {mockTourData?.stats?.hotspotsExplored}
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      Hotspots Explored
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-cosmic-md">
                    <p className="font-data text-2xl font-bold text-foreground">
                      {mockTourData?.stats?.averageEngagement}%
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      Engagement
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Trophy" size={20} className="text-solar-gold" />
                  <span>Achievements Unlocked</span>
                </h3>
                
                <div className="space-y-3">
                  {mockTourData?.achievements?.map((achievement) => (
                    <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-cosmic-md">
                      <div className="w-10 h-10 rounded-cosmic-sm bg-solar-gold/20 border border-solar-gold/30 flex items-center justify-center">
                        <Icon name={achievement?.icon} size={18} className="text-solar-gold" />
                      </div>
                      <div>
                        <p className="font-body font-medium text-foreground">
                          {achievement?.name}
                        </p>
                        <p className="font-caption text-xs text-muted-foreground">
                          Just unlocked!
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={onStartQuiz}
                iconName="Brain"
                iconPosition="left"
                className="cosmic-glow-sm"
              >
                Take Quiz
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={onExploreMore}
                iconName="Compass"
                iconPosition="left"
              >
                Free Explore
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={onRetakeTour}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Retake Tour
              </Button>
            </div>

            {/* Related Tours */}
            <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Route" size={20} className="text-nebula-purple" />
                <span>Continue Your Journey</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockTourData?.relatedTours?.map((tour) => (
                  <div
                    key={tour?.id}
                    className="group cosmic-backdrop rounded-cosmic-lg border border-border hover:border-primary/30 cosmic-transition hover:cosmic-glow-sm cursor-pointer overflow-hidden"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <img
                        src={tour?.thumbnail}
                        alt={tour?.title}
                        className="w-full h-full object-cover group-hover:scale-105 cosmic-transition"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-cosmic-sm text-xs font-medium border ${getDifficultyColor(tour?.difficulty)}`}>
                          {tour?.difficulty}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white">
                        <Icon name="Clock" size={12} />
                        <span className="font-data text-xs">{tour?.duration}</span>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h4 className="font-heading font-medium text-sm text-foreground group-hover:text-primary cosmic-transition">
                        {tour?.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                <span>How was your experience?</span>
              </h3>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5]?.map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    size="icon"
                    className="text-solar-gold hover:text-solar-gold hover:bg-solar-gold/10"
                  >
                    <Icon name="Star" size={24} />
                  </Button>
                ))}
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button variant="outline" size="sm" iconName="ThumbsUp">
                  Helpful
                </Button>
                <Button variant="outline" size="sm" iconName="Share">
                  Share Tour
                </Button>
                <Button variant="outline" size="sm" iconName="Flag">
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/10">
          <div className="flex items-center justify-between">
            <p className="font-caption text-sm text-muted-foreground">
              Thank you for exploring the cosmos with us!
            </p>
            <Button variant="default" onClick={onClose}>
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourCompletionModal;