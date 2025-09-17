import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: '3D Universe Explorer',
      description: 'Navigate through an immersive 3D cosmic environment with realistic celestial objects, orbital mechanics, and stunning visual effects.',
      icon: 'Globe',
      path: '/3d-universe-explorer',
      color: 'stellar-blue'
    },
    {
      title: 'Interactive Learning',
      description: 'Engage with guided tours, educational quizzes, and interactive content designed to enhance your understanding of astronomy.',
      icon: 'BookOpen',
      path: '/guided-tour-mode',
      color: 'nebula-purple'
    },
    {
      title: 'Knowledge Assessment',
      description: 'Test your cosmic knowledge with comprehensive quizzes, track your progress, and earn achievements as you learn.',
      icon: 'Brain',
      path: '/educational-quiz-center',
      color: 'solar-gold'
    },
    {
      title: 'Personal Dashboard',
      description: 'Monitor your learning journey, view bookmarked objects, and access personalized recommendations for continued exploration.',
      icon: 'User',
      path: '/user-dashboard',
      color: 'aurora-green'
    }
  ];

  const stats = [
    { value: '150+', label: 'Celestial Objects', icon: 'Star' },
    { value: '50+', label: 'Interactive Tours', icon: 'Route' },
    { value: '200+', label: 'Quiz Questions', icon: 'HelpCircle' },
    { value: '10+', label: 'Learning Paths', icon: 'TrendingUp' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features?.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header for Landing */}
      <header className="fixed top-0 left-0 right-0 z-50 cosmic-backdrop border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center space-x-3 cosmic-transition hover:opacity-80">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-sm flex items-center justify-center">
                <Icon name="Telescope" size={24} color="white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-solar-gold animate-cosmic-pulse"></div>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">
                Cosmic Knowledge Hub
              </h1>
              <p className="font-caption text-xs text-muted-foreground -mt-1">
                Professional Astronomy Education Platform
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="font-body text-muted-foreground hover:text-foreground cosmic-transition">
              Features
            </Link>
            <Link to="#about" className="font-body text-muted-foreground hover:text-foreground cosmic-transition">
              About
            </Link>
            <Link to="/3d-universe-explorer">
              <Button variant="default" size="lg" iconName="Rocket" iconPosition="left" className="cosmic-glow-sm">
                Start Exploring
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className={`pt-24 pb-20 px-6 cosmic-transition-slow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Explore the
                <span className="block bg-gradient-to-r from-stellar-blue via-nebula-purple to-solar-gold bg-clip-text text-transparent">
                  Infinite Universe
                </span>
              </h2>
              <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Immerse yourself in a cutting-edge 3D astronomy education platform. Discover celestial wonders, 
                learn through interactive experiences, and expand your cosmic knowledge like never before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/3d-universe-explorer">
                <Button 
                  variant="default" 
                  size="xl" 
                  iconName="Play" 
                  iconPosition="left"
                  className="cosmic-glow-md hover:cosmic-glow-lg min-w-48"
                >
                  Launch Explorer
                </Button>
              </Link>
              <Link to="/guided-tour-mode">
                <Button 
                  variant="outline" 
                  size="xl" 
                  iconName="BookOpen" 
                  iconPosition="left"
                  className="min-w-48"
                >
                  Take a Tour
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {stats?.map((stat, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-stellar-blue/20 to-nebula-purple/20 border border-border flex items-center justify-center">
                    <Icon name={stat?.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-3xl md:text-4xl font-bold text-foreground">{stat?.value}</p>
                    <p className="font-body text-muted-foreground">{stat?.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Features Showcase */}
      <section id="features" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Professional Features
            </h3>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive suite of tools designed for serious astronomy education and exploration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Display */}
            <div className="space-y-8">
              {features?.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-cosmic-lg border cosmic-transition cursor-pointer ${
                    currentFeature === index
                      ? 'bg-card border-primary cosmic-glow-sm' :'bg-card/50 border-border hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-cosmic-md bg-gradient-to-br from-${feature?.color}/20 to-${feature?.color}/10 border border-${feature?.color}/20`}>
                      <Icon name={feature?.icon} size={24} className={`text-${feature?.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                        {feature?.title}
                      </h4>
                      <p className="font-body text-muted-foreground leading-relaxed mb-4">
                        {feature?.description}
                      </p>
                      <Link to={feature?.path}>
                        <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                          Explore Feature
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Preview */}
            <div className="relative">
              <div className="aspect-video rounded-cosmic-xl bg-gradient-to-br from-stellar-blue/10 to-nebula-purple/10 border border-border cosmic-glow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-md flex items-center justify-center">
                      <Icon name={features?.[currentFeature]?.icon} size={32} color="white" />
                    </div>
                    <div>
                      <h5 className="font-heading text-2xl font-bold text-foreground">
                        {features?.[currentFeature]?.title}
                      </h5>
                      <p className="font-body text-muted-foreground mt-2">
                        Interactive Preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Leading the Future of
                <span className="block text-primary">Astronomy Education</span>
              </h3>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Our platform combines cutting-edge 3D visualization technology with comprehensive educational content 
                to create an unparalleled learning experience. Whether you're a student, educator, or astronomy 
                enthusiast, our tools provide the depth and interactivity needed for meaningful cosmic exploration.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="font-body text-foreground">Real-time 3D Rendering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="font-body text-foreground">Scientific Accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="font-body text-foreground">Interactive Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="font-body text-foreground">Progress Tracking</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-cosmic-xl bg-gradient-to-br from-background to-card border border-border p-8">
                <div className="h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-xl flex items-center justify-center">
                      <Icon name="Telescope" size={48} color="white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-solar-gold cosmic-glow-md flex items-center justify-center">
                      <Icon name="Star" size={20} className="text-background" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-aurora-green cosmic-glow-sm flex items-center justify-center">
                      <Icon name="Zap" size={16} className="text-background" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Professional Footer */}
      <footer className="py-16 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-sm flex items-center justify-center">
                  <Icon name="Telescope" size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground">Cosmic Knowledge Hub</h4>
                  <p className="font-caption text-xs text-muted-foreground">Professional Platform</p>
                </div>
              </Link>
              <p className="font-body text-muted-foreground">
                Advancing astronomy education through innovative 3D visualization and interactive learning experiences.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-heading font-semibold text-foreground">Explore</h5>
              <nav className="space-y-2">
                <Link to="/3d-universe-explorer" className="block font-body text-muted-foreground hover:text-foreground cosmic-transition">
                  3D Universe Explorer
                </Link>
                <Link to="/guided-tour-mode" className="block font-body text-muted-foreground hover:text-foreground cosmic-transition">
                  Guided Tours
                </Link>
                <Link to="/educational-quiz-center" className="block font-body text-muted-foreground hover:text-foreground cosmic-transition">
                  Educational Quizzes
                </Link>
                <Link to="/user-dashboard" className="block font-body text-muted-foreground hover:text-foreground cosmic-transition">
                  Dashboard
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="font-heading font-semibold text-foreground">Features</h5>
              <nav className="space-y-2">
                <span className="block font-body text-muted-foreground">Real-time 3D Rendering</span>
                <span className="block font-body text-muted-foreground">Interactive Learning</span>
                <span className="block font-body text-muted-foreground">Progress Tracking</span>
                <span className="block font-body text-muted-foreground">Knowledge Assessment</span>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="font-heading font-semibold text-foreground">Technology</h5>
              <nav className="space-y-2">
                <span className="block font-body text-muted-foreground">WebGL 3D Graphics</span>
                <span className="block font-body text-muted-foreground">React.js Framework</span>
                <span className="block font-body text-muted-foreground">Modern Design System</span>
                <span className="block font-body text-muted-foreground">Responsive Interface</span>
              </nav>
            </div>
          </div>

          <div className="border-t border-border pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="font-caption text-muted-foreground">
                © 2024 Cosmic Knowledge Hub. Professional astronomy education platform.
              </p>
              <div className="flex items-center space-x-4">
                <span className="font-caption text-muted-foreground">Built with modern web technologies</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-cosmic-pulse"></div>
                  <span className="font-caption text-xs text-success">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;