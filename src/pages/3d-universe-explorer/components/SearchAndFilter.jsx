import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({
  searchQuery = '',
  onSearchChange = () => {},
  activeFilter = 'all',
  onFilterChange = () => {},
  onClearSearch = () => {},
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Objects', description: 'Show all cosmic objects' },
    { value: 'planets', label: 'Planets', description: 'Solar system planets' },
    { value: 'dwarf-planets', label: 'Dwarf Planets', description: 'Pluto, Ceres, Eris, etc.' },
    { value: 'stars', label: 'Stars', description: 'Main sequence, giants, dwarfs' },
    { value: 'galaxies', label: 'Galaxies', description: 'Spiral, elliptical galaxies' },
    { value: 'nebulae', label: 'Nebulae', description: 'Gas clouds and star nurseries' },
    { value: 'black-holes', label: 'Black Holes', description: 'Stellar and supermassive' }
  ];

  const quickSearches = [
    { query: 'Earth', icon: 'Globe' },
    { query: 'Sun', icon: 'Sun' },
    { query: 'Andromeda', icon: 'Sparkles' },
    { query: 'Betelgeuse', icon: 'Star' }
  ];

  const handleQuickSearch = (query) => {
    onSearchChange(query);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed top-20 right-6 z-40 ${className}`}>
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border cosmic-glow-sm">
        
        {/* Main Search Bar */}
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search cosmic objects..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {searchQuery ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClearSearch}
                    className="w-5 h-5 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                ) : (
                  <Icon name="Search" size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={toggleExpanded}
              className={`cosmic-transition ${isExpanded ? 'cosmic-glow-sm' : ''}`}
            >
              <Icon name="Filter" size={16} />
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="border-t border-border p-4 space-y-4">
            
            {/* Category Filter */}
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                Filter by Category
              </p>
              <Select
                options={filterOptions}
                value={activeFilter}
                onChange={onFilterChange}
                placeholder="Select category..."
              />
            </div>

            {/* Quick Searches */}
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                Quick Searches
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickSearches?.map((item) => (
                  <Button
                    key={item?.query}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSearch(item?.query)}
                    iconName={item?.icon}
                    iconPosition="left"
                    className="justify-start cosmic-transition hover:cosmic-glow-sm"
                  >
                    {item?.query}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search Stats */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs text-muted-foreground">
                  Objects Found
                </span>
                <span className="font-data text-xs text-foreground">
                  {searchQuery ? '12' : '21'} results
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Preview */}
        {searchQuery && !isExpanded && (
          <div className="border-t border-border p-3">
            <div className="flex items-center justify-between">
              <span className="font-caption text-xs text-muted-foreground">
                Found 12 objects
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="text-primary hover:text-primary/80"
              >
                View All
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default SearchAndFilter;