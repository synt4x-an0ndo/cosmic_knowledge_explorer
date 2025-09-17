import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/',
      icon: 'Home',
      description: 'Return to homepage'
    },
    {
      label: 'Explore',
      path: '/3d-universe-explorer',
      icon: 'Globe',
      description: 'Navigate the 3D universe'
    },
    {
      label: 'Learn',
      path: '/guided-tour-mode',
      icon: 'BookOpen',
      description: 'Guided cosmic tours'
    },
    {
      label: 'Quiz',
      path: '/educational-quiz-center',
      icon: 'Brain',
      description: 'Test your knowledge'
    },
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'User',
      description: 'Your learning progress'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if we're on the landing page to show different header style
  const isLandingPage = location?.pathname === '/';

  if (isLandingPage) {
    // Landing page has its own header, don't render this one
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 cosmic-backdrop border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Enhanced Professional Logo */}
        <Link to="/" className="flex items-center space-x-3 cosmic-transition hover:opacity-80">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-sm flex items-center justify-center">
              <Icon name="Telescope" size={24} color="white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-solar-gold animate-cosmic-pulse"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading font-bold text-xl text-foreground">
              Cosmic Knowledge Hub
            </h1>
            <p className="font-caption text-xs text-muted-foreground -mt-1">
              Professional Astronomy Platform
            </p>
          </div>
        </Link>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group relative px-4 py-2.5 rounded-cosmic-md cosmic-transition ${
                isActivePath(item?.path)
                  ? 'bg-primary/20 text-primary cosmic-glow-sm border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={isActivePath(item?.path) ? 'text-primary' : 'text-current'} 
                />
                <span className="font-body font-medium">{item?.label}</span>
              </div>
              
              {/* Enhanced Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-2 bg-card border border-border rounded-cosmic-md opacity-0 group-hover:opacity-100 cosmic-transition pointer-events-none z-10 cosmic-glow-sm">
                <p className="font-caption text-sm text-card-foreground whitespace-nowrap">
                  {item?.description}
                </p>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-border"></div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/3d-universe-explorer">
            <Button 
              variant="default" 
              size="sm" 
              iconName="Rocket" 
              iconPosition="left" 
              className="cosmic-glow-sm hover:cosmic-glow-md"
            >
              Explore
            </Button>
          </Link>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-foreground hover:bg-muted/50 border border-transparent hover:border-border"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden cosmic-backdrop border-t border-border">
          <nav className="px-6 py-6 space-y-3">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 px-4 py-4 rounded-cosmic-lg cosmic-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary/20 text-primary cosmic-glow-sm border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={22} 
                  className={isActivePath(item?.path) ? 'text-primary' : 'text-current'} 
                />
                <div className="flex-1">
                  <p className="font-body font-semibold text-base">{item?.label}</p>
                  <p className="font-caption text-sm opacity-70">{item?.description}</p>
                </div>
                {isActivePath(item?.path) && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </Link>
            ))}

            {/* Mobile Quick Actions */}
            <div className="pt-4 border-t border-border space-y-3">
              <Link to="/3d-universe-explorer" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Rocket" 
                  iconPosition="left" 
                  className="w-full cosmic-glow-sm"
                >
                  Start Exploring
                </Button>
              </Link>
              <Link to="/educational-quiz-center" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="Brain" 
                  iconPosition="left" 
                  className="w-full"
                >
                  Take Quiz
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;