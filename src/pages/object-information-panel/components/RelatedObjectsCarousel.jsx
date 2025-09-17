import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedObjectsCarousel = ({ currentObject, onObjectSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const relatedObjects = [
    {
      id: 'andromeda-m31',
      name: 'Andromeda Galaxy',
      type: 'Spiral Galaxy',
      distance: '2.537 million light-years',
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop',
      relationship: 'Nearest major galaxy',
      similarity: 95
    },
    {
      id: 'triangulum-m33',
      name: 'Triangulum Galaxy',
      type: 'Spiral Galaxy',
      distance: '2.73 million light-years',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
      relationship: 'Local Group member',
      similarity: 88
    },
    {
      id: 'whirlpool-m51',
      name: 'Whirlpool Galaxy',
      type: 'Spiral Galaxy',
      distance: '23 million light-years',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=300&h=200&fit=crop',
      relationship: 'Similar structure',
      similarity: 82
    },
    {
      id: 'sombrero-m104',
      name: 'Sombrero Galaxy',
      type: 'Spiral Galaxy',
      distance: '29.3 million light-years',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
      relationship: 'Edge-on spiral',
      similarity: 75
    },
    {
      id: 'pinwheel-m101',
      name: 'Pinwheel Galaxy',
      type: 'Spiral Galaxy',
      distance: '20.9 million light-years',
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop',
      relationship: 'Face-on spiral',
      similarity: 79
    }
  ];

  const itemsPerView = 3;
  const maxIndex = Math.max(0, relatedObjects?.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleObjectClick = (object) => {
    if (onObjectSelect) {
      onObjectSelect(object);
    }
  };

  return (
    <div className="border-t border-border bg-card/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground flex items-center space-x-2">
            <Icon name="Network" size={18} className="text-primary" />
            <span>Related Objects</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="font-data text-xs text-muted-foreground">
              {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, relatedObjects?.length)} of {relatedObjects?.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex cosmic-transition"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(relatedObjects?.length / itemsPerView) * 100}%`
            }}
          >
            {relatedObjects?.map((object, index) => (
              <div
                key={object?.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / relatedObjects?.length}%` }}
              >
                <div
                  className="cosmic-backdrop rounded-cosmic-lg overflow-hidden border border-border hover:border-primary/30 cosmic-transition cursor-pointer group"
                  onClick={() => handleObjectClick(object)}
                >
                  {/* Object Image */}
                  <div className="relative">
                    <Image
                      src={object?.image}
                      alt={object?.name}
                      className="w-full h-32 object-cover group-hover:scale-105 cosmic-transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Similarity Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-primary/80 rounded-cosmic-sm">
                      <span className="font-data text-xs text-white">
                        {object?.similarity}% match
                      </span>
                    </div>
                    
                    {/* Navigation Icon */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cosmic-transition">
                      <Icon name="ArrowRight" size={12} className="text-white" />
                    </div>
                  </div>

                  {/* Object Info */}
                  <div className="p-3">
                    <h4 className="font-heading font-semibold text-foreground mb-1 text-sm">
                      {object?.name}
                    </h4>
                    <p className="font-caption text-xs text-muted-foreground mb-2">
                      {object?.type} • {object?.distance}
                    </p>
                    
                    {/* Relationship */}
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-4 bg-primary rounded-cosmic-sm"></div>
                      <span className="font-body text-xs text-foreground">
                        {object?.relationship}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Tools */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            <span className="font-caption text-sm text-muted-foreground">
              Compare objects side-by-side
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
            >
              Add to Compare
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
            >
              View All
            </Button>
          </div>
        </div>

        {/* Quick Stats Comparison */}
        <div className="mt-4 cosmic-backdrop rounded-cosmic-md p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="font-caption text-xs text-muted-foreground">
              Average Distance
            </span>
            <span className="font-data text-xs text-foreground">
              15.7 million light-years
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-caption text-xs text-muted-foreground">
              Most Common Type
            </span>
            <span className="font-data text-xs text-foreground">
              Spiral Galaxy
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-xs text-muted-foreground">
              Closest Object
            </span>
            <span className="font-data text-xs text-foreground">
              Andromeda Galaxy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedObjectsCarousel;