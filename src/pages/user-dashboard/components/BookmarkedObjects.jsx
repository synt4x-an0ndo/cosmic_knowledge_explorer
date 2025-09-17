import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookmarkedObjects = () => {
  const bookmarkedObjects = [
    {
      id: 1,
      name: 'Andromeda Galaxy',
      type: 'Spiral Galaxy',
      distance: '2.537 million ly',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      lastViewed: '2 days ago',
      category: 'galaxy'
    },
    {
      id: 2,
      name: 'Jupiter',
      type: 'Gas Giant',
      distance: '628.7 million km',
      image: 'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?w=400&h=300&fit=crop',
      lastViewed: '1 week ago',
      category: 'planet'
    },
    {
      id: 3,
      name: 'Orion Nebula',
      type: 'Emission Nebula',
      distance: '1,344 light-years',
      image: 'https://images.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg?w=400&h=300&fit=crop',
      lastViewed: '3 days ago',
      category: 'nebula'
    },
    {
      id: 4,
      name: 'Betelgeuse',
      type: 'Red Supergiant',
      distance: '548 light-years',
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop',
      lastViewed: '5 days ago',
      category: 'star'
    },
    {
      id: 5,
      name: 'Cygnus X-1',
      type: 'Stellar Black Hole',
      distance: '6,070 light-years',
      image: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?w=400&h=300&fit=crop',
      lastViewed: '1 day ago',
      category: 'blackhole'
    },
    {
      id: 6,
      name: 'Halley\'s Comet',
      type: 'Periodic Comet',
      distance: '35 AU (current)',
      image: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg?w=400&h=300&fit=crop',
      lastViewed: '4 days ago',
      category: 'comet'
    }
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      galaxy: 'Sparkles',
      planet: 'Globe',
      nebula: 'Cloud',
      star: 'Star',
      blackhole: 'Circle',
      comet: 'Zap'
    };
    return icons?.[category] || 'Telescope';
  };

  const getCategoryColor = (category) => {
    const colors = {
      galaxy: 'text-nebula-purple',
      planet: 'text-stellar-blue',
      nebula: 'text-solar-gold',
      star: 'text-aurora-green',
      blackhole: 'text-foreground',
      comet: 'text-warning'
    };
    return colors?.[category] || 'text-primary';
  };

  return (
    <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-cosmic-sm bg-solar-gold/20 border border-solar-gold/30">
            <Icon name="Bookmark" size={20} className="text-solar-gold" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Bookmarked Objects
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              Your saved cosmic discoveries
            </p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add More
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarkedObjects?.map((object) => (
          <div key={object?.id} className="group cosmic-backdrop rounded-cosmic-lg border border-border hover:border-primary/30 cosmic-transition overflow-hidden">
            <div className="relative h-32 overflow-hidden">
              <Image
                src={object?.image}
                alt={object?.name}
                className="w-full h-full object-cover group-hover:scale-105 cosmic-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 right-2">
                <div className={`p-1.5 rounded-cosmic-sm bg-card/80 backdrop-blur-sm border border-border/50`}>
                  <Icon 
                    name={getCategoryIcon(object?.category)} 
                    size={14} 
                    className={getCategoryColor(object?.category)} 
                  />
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="font-caption text-xs text-white/80">
                  {object?.lastViewed}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-body font-semibold text-foreground group-hover:text-primary cosmic-transition">
                  {object?.name}
                </h3>
                <p className="font-caption text-sm text-muted-foreground">
                  {object?.type}
                </p>
                <p className="font-data text-xs text-muted-foreground mt-1">
                  {object?.distance}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <Link
                  to="/3d-universe-explorer"
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 cosmic-transition"
                >
                  <Icon name="Eye" size={14} />
                  <span className="font-caption text-xs">Explore</span>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Icon name="Share" size={12} />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Icon name="BookmarkX" size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/3d-universe-explorer"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 cosmic-transition"
        >
          <span className="font-body text-sm">View all bookmarks</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BookmarkedObjects;