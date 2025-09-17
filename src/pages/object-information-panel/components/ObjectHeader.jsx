import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ObjectHeader = ({ 
  object, 
  onClose, 
  onBookmark, 
  isBookmarked = false,
  onShare 
}) => {
  if (!object) return null;

  return (
    <div className="relative">
      {/* Header Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stellar-blue/20 via-nebula-purple/10 to-transparent rounded-t-cosmic-lg"></div>
      <div className="relative p-6 border-b border-border">
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-cosmic-sm">
              <span className="font-caption text-xs font-medium text-primary">
                {object?.classification}
              </span>
            </div>
            <div className="px-3 py-1 bg-muted/50 border border-border rounded-cosmic-sm">
              <span className="font-caption text-xs text-muted-foreground">
                {object?.constellation}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBookmark}
              className={`cosmic-transition ${
                isBookmarked 
                  ? 'text-solar-gold hover:text-solar-gold/80' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Share" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Object Image and Basic Info */}
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-cosmic-lg overflow-hidden cosmic-glow-sm border border-border">
              <Image
                src={object?.image}
                alt={object?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {object?.isNew && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-aurora-green rounded-full flex items-center justify-center">
                <Icon name="Sparkles" size={12} className="text-deep-space-navy" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
              {object?.name}
            </h1>
            <p className="font-body text-muted-foreground text-sm mb-2">
              {object?.alternativeNames}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-caption text-xs text-muted-foreground">Distance</p>
                <p className="font-data text-sm text-foreground">{object?.distance}</p>
              </div>
              <div>
                <p className="font-caption text-xs text-muted-foreground">Magnitude</p>
                <p className="font-data text-sm text-foreground">{object?.magnitude}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            iconName="Navigation"
            iconPosition="left"
            className="cosmic-transition hover:cosmic-glow-sm"
          >
            Navigate To
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            className="cosmic-transition hover:cosmic-glow-sm"
          >
            Start Tour
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Camera"
            iconPosition="left"
            className="cosmic-transition hover:cosmic-glow-sm"
          >
            Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObjectHeader;