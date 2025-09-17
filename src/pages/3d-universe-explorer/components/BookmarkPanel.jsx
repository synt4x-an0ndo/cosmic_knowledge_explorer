import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookmarkPanel = ({
  bookmarkedObjects = [],
  onBookmarkAdd = () => {},
  onBookmarkRemove = () => {},
  onBookmarkSelect = () => {},
  selectedObject = null,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock bookmarked objects
  const mockBookmarks = [
    { id: 'earth', name: 'Earth', type: 'planet', category: 'planets', dateAdded: '2025-01-15', notes: 'Our home planet' },
    { id: 'andromeda', name: 'Andromeda Galaxy', type: 'spiral-galaxy', category: 'galaxies', dateAdded: '2025-01-14', notes: 'Nearest major galaxy' },
    { id: 'betelgeuse', name: 'Betelgeuse', type: 'red-giant', category: 'stars', dateAdded: '2025-01-13', notes: 'Red supergiant star' },
    { id: 'orion-nebula', name: 'Orion Nebula', type: 'emission-nebula', category: 'nebulae', dateAdded: '2025-01-12', notes: 'Beautiful star-forming region' },
    { id: 'saturn', name: 'Saturn', type: 'planet', category: 'planets', dateAdded: '2025-01-11', notes: 'The ringed planet' }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: 'Bookmark' },
    { id: 'planets', label: 'Planets', icon: 'Globe' },
    { id: 'stars', label: 'Stars', icon: 'Star' },
    { id: 'galaxies', label: 'Galaxies', icon: 'Sparkles' },
    { id: 'nebulae', label: 'Nebulae', icon: 'Cloud' }
  ];

  const filteredBookmarks = mockBookmarks?.filter(bookmark => 
    activeCategory === 'all' || bookmark?.category === activeCategory
  );

  const isBookmarked = (objectId) => {
    return mockBookmarks?.some(bookmark => bookmark?.id === objectId);
  };

  const handleBookmarkToggle = () => {
    if (!selectedObject) return;
    
    if (isBookmarked(selectedObject?.id)) {
      onBookmarkRemove(selectedObject?.id);
    } else {
      onBookmarkAdd(selectedObject);
    }
  };

  const handleBookmarkClick = (bookmark) => {
    onBookmarkSelect(bookmark);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getObjectIcon = (type) => {
    const iconMap = {
      'planet': 'Globe',
      'dwarf-planet': 'Circle',
      'star': 'Star',
      'red-giant': 'Sun',
      'main-sequence': 'Star',
      'spiral-galaxy': 'Sparkles',
      'emission-nebula': 'Cloud',
      'star-forming': 'CloudRain'
    };
    return iconMap?.[type] || 'Circle';
  };

  return (
    <div className={`fixed top-1/2 right-6 transform -translate-y-1/2 z-40 ${className}`}>
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border cosmic-glow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={16} className="text-primary" />
            <span className="font-caption text-sm font-medium text-foreground">
              Bookmarks
            </span>
            <div className="px-2 py-1 rounded-cosmic-sm bg-primary/20 text-primary">
              <span className="font-data text-xs">{mockBookmarks?.length}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="w-6 h-6"
          >
            <Icon name={isExpanded ? 'ChevronRight' : 'ChevronLeft'} size={14} />
          </Button>
        </div>

        {/* Quick Bookmark Toggle */}
        {selectedObject && (
          <div className="p-3 border-b border-border">
            <Button
              variant={isBookmarked(selectedObject?.id) ? 'default' : 'outline'}
              size="sm"
              onClick={handleBookmarkToggle}
              iconName={isBookmarked(selectedObject?.id) ? 'BookmarkCheck' : 'BookmarkPlus'}
              iconPosition="left"
              className="w-full cosmic-transition"
            >
              {isBookmarked(selectedObject?.id) ? 'Bookmarked' : 'Add Bookmark'}
            </Button>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div className="w-80">
            
            {/* Category Filters */}
            <div className="p-4 border-b border-border">
              <p className="font-caption text-xs text-muted-foreground mb-2">
                Filter by Category
              </p>
              <div className="flex flex-wrap gap-1">
                {categories?.map((category) => (
                  <Button
                    key={category?.id}
                    variant={activeCategory === category?.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveCategory(category?.id)}
                    iconName={category?.icon}
                    iconPosition="left"
                    className="cosmic-transition"
                  >
                    {category?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bookmarks List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredBookmarks?.length > 0 ? (
                <div className="p-2 space-y-2">
                  {filteredBookmarks?.map((bookmark) => (
                    <div
                      key={bookmark?.id}
                      className="group cosmic-backdrop rounded-cosmic-md p-3 border border-border hover:border-primary/30 cosmic-transition cursor-pointer"
                      onClick={() => handleBookmarkClick(bookmark)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div className="p-2 rounded-cosmic-sm bg-card/50">
                            <Icon 
                              name={getObjectIcon(bookmark?.type)} 
                              size={16} 
                              className="text-primary" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-medium text-sm text-foreground truncate">
                              {bookmark?.name}
                            </p>
                            <p className="font-caption text-xs text-muted-foreground">
                              {bookmark?.type?.replace('-', ' ')}
                            </p>
                            {bookmark?.notes && (
                              <p className="font-caption text-xs text-muted-foreground mt-1 line-clamp-2">
                                {bookmark?.notes}
                              </p>
                            )}
                            <p className="font-data text-xs text-muted-foreground mt-1">
                              Added {bookmark?.dateAdded}
                            </p>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onBookmarkRemove(bookmark?.id);
                          }}
                          className="w-6 h-6 opacity-0 group-hover:opacity-100 cosmic-transition text-muted-foreground hover:text-error"
                        >
                          <Icon name="Trash2" size={12} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Icon name="BookmarkX" size={32} className="text-muted-foreground mx-auto mb-3" />
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    No bookmarks in this category
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Select an object and bookmark it to save for later
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {filteredBookmarks?.length > 0 && (
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    iconName="Trash2"
                    iconPosition="left"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsed State Quick Access */}
        {!isExpanded && mockBookmarks?.length > 0 && (
          <div className="p-3">
            <div className="space-y-2">
              {mockBookmarks?.slice(0, 3)?.map((bookmark) => (
                <Button
                  key={bookmark?.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmarkClick(bookmark)}
                  className="w-full justify-start cosmic-transition hover:cosmic-glow-sm"
                  iconName={getObjectIcon(bookmark?.type)}
                  iconPosition="left"
                >
                  <span className="truncate">{bookmark?.name}</span>
                </Button>
              ))}
              {mockBookmarks?.length > 3 && (
                <p className="font-caption text-xs text-muted-foreground text-center">
                  +{mockBookmarks?.length - 3} more
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPanel;