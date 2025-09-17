import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EducationalContentTab = ({ object }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [activeVideo, setActiveVideo] = useState(null);

  if (!object) return null;

  const difficultyLevels = [
    { id: 'beginner', label: 'Beginner', icon: 'GraduationCap', color: 'text-aurora-green' },
    { id: 'intermediate', label: 'Intermediate', icon: 'BookOpen', color: 'text-stellar-blue' },
    { id: 'advanced', label: 'Advanced', icon: 'Microscope', color: 'text-nebula-purple' }
  ];

  const educationalContent = {
    beginner: {
      summary: `${object?.name} is a fascinating celestial object that can be observed from Earth. It's located in the ${object?.constellation} constellation and is approximately ${object?.distance} away from us.`,
      keyPoints: [
        `${object?.name} is classified as a ${object?.type}`,
        `It was discovered in ${object?.discoveryDate} by ${object?.discoverer}`,
        `You can see it with the naked eye under dark skies`,
        `It appears as a faint, fuzzy patch of light`
      ],
      activities: [
        'Locate it in the night sky using star charts','Draw what you observe through a telescope','Compare its brightness to nearby stars','Track its position over several nights'
      ]
    },
    intermediate: {
      summary: `${object?.name} represents an excellent example of ${object?.type} formation and evolution. Its physical properties and orbital characteristics provide insights into cosmic processes and stellar formation.`,
      keyPoints: [
        `Surface temperature ranges from ${object?.surfaceTemperature}`,
        `Orbital period of approximately ${object?.orbitalPeriod}`,
        `Composed primarily of ${object?.composition}`,
        `Exhibits unique spectral characteristics in ${object?.spectralClass}`
      ],
      activities: [
        'Calculate angular size using distance and diameter','Analyze light curves and brightness variations','Study spectroscopic data and composition','Model orbital mechanics and gravitational effects'
      ]
    },
    advanced: {
      summary: `${object?.name} serves as a crucial laboratory for understanding advanced astrophysical processes, including stellar nucleosynthesis, gravitational dynamics, and cosmic evolution mechanisms.`,
      keyPoints: [
        `Metallicity measurements indicate ${object?.metallicity}`,
        `Proper motion studies reveal ${object?.properMotion}`,
        `Radial velocity measurements show ${object?.radialVelocity}`,
        `Photometric analysis indicates ${object?.photometricData}`
      ],
      activities: [
        'Conduct photometric analysis using CCD imaging','Perform spectroscopic observations and analysis','Calculate space velocity and galactic orbit','Research current scientific literature and findings'
      ]
    }
  };

  const multimediaContent = [
    {
      type: 'video',
      title: `Introduction to ${object?.name}`,
      duration: '5:32',
      thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
      description: 'Basic overview and visual tour'
    },
    {
      type: 'video',
      title: 'Formation and Evolution',
      duration: '8:15',
      thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop',
      description: 'How this object formed and evolved'
    },
    {
      type: 'interactive',
      title: '3D Model Explorer',
      duration: 'Interactive',
      thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
      description: 'Explore detailed 3D visualization'
    },
    {
      type: 'simulation',
      title: 'Orbital Mechanics',
      duration: 'Interactive',
      thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=300&h=200&fit=crop',
      description: 'Interactive orbital simulation'
    }
  ];

  const quizQuestions = [
    {
      question: `What type of celestial object is ${object?.name}?`,
      options: [object?.type, 'Asteroid', 'Comet', 'Planet'],
      correct: 0
    },
    {
      question: `In which constellation can ${object?.name} be found?`,
      options: ['Orion', object?.constellation, 'Ursa Major', 'Cassiopeia'],
      correct: 1
    },
    {
      question: `Who discovered ${object?.name}?`,
      options: ['Galileo Galilei', 'Edwin Hubble', object?.discoverer, 'Johannes Kepler'],
      correct: 2
    }
  ];

  const currentContent = educationalContent?.[selectedDifficulty];

  return (
    <div className="p-6 space-y-6">
      {/* Difficulty Level Selector */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Educational Content
        </h3>
        <div className="flex items-center space-x-1 bg-muted/30 rounded-cosmic-md p-1">
          {difficultyLevels?.map((level) => (
            <Button
              key={level?.id}
              variant={selectedDifficulty === level?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDifficulty(level?.id)}
              iconName={level?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {level?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Content Summary */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border">
        <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="BookOpen" size={18} className="text-primary" />
          <span>Summary</span>
        </h4>
        <p className="font-body text-sm text-foreground leading-relaxed">
          {currentContent?.summary}
        </p>
      </div>
      {/* Key Learning Points */}
      <div>
        <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Target" size={18} className="text-stellar-blue" />
          <span>Key Learning Points</span>
        </h4>
        <div className="space-y-2">
          {currentContent?.keyPoints?.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 cosmic-backdrop rounded-cosmic-md p-3 border border-border"
            >
              <div className="w-6 h-6 rounded-full bg-stellar-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-data text-xs text-stellar-blue font-bold">
                  {index + 1}
                </span>
              </div>
              <p className="font-body text-sm text-foreground">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Multimedia Content */}
      <div>
        <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Play" size={18} className="text-nebula-purple" />
          <span>Multimedia Resources</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {multimediaContent?.map((content, index) => (
            <div
              key={index}
              className="cosmic-backdrop rounded-cosmic-lg overflow-hidden border border-border hover:border-primary/30 cosmic-transition cursor-pointer"
              onClick={() => setActiveVideo(content)}
            >
              <div className="relative">
                <Image
                  src={content?.thumbnail}
                  alt={content?.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cosmic-glow-sm">
                    <Icon 
                      name={content?.type === 'video' ? 'Play' : content?.type === 'interactive' ? 'MousePointer' : 'Settings'} 
                      size={20} 
                      className="text-white" 
                    />
                  </div>
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded-cosmic-sm">
                  <span className="font-data text-xs text-white">{content?.duration}</span>
                </div>
              </div>
              <div className="p-3">
                <h5 className="font-heading font-semibold text-foreground mb-1">
                  {content?.title}
                </h5>
                <p className="font-body text-xs text-muted-foreground">
                  {content?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Learning Activities */}
      <div>
        <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Lightbulb" size={18} className="text-solar-gold" />
          <span>Learning Activities</span>
        </h4>
        <div className="space-y-3">
          {currentContent?.activities?.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 cosmic-backdrop rounded-cosmic-md p-3 border border-border hover:border-primary/30 cosmic-transition"
            >
              <div className="w-8 h-8 bg-solar-gold/20 rounded-cosmic-sm flex items-center justify-center flex-shrink-0">
                <Icon name="CheckSquare" size={16} className="text-solar-gold" />
              </div>
              <p className="font-body text-sm text-foreground flex-1">
                {activity}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-muted-foreground hover:text-foreground"
              >
                <Icon name="ExternalLink" size={12} />
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Quiz */}
      <div className="cosmic-backdrop rounded-cosmic-lg p-4 border border-border bg-aurora-green/5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Brain" size={18} className="text-aurora-green" />
            <span>Quick Knowledge Check</span>
          </h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
          >
            Start Quiz
          </Button>
        </div>
        <p className="font-body text-sm text-muted-foreground mb-3">
          Test your understanding with {quizQuestions?.length} questions about {object?.name}
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="font-data text-muted-foreground">~3 minutes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} className="text-muted-foreground" />
            <span className="font-data text-muted-foreground">Earn points</span>
          </div>
        </div>
      </div>
      {/* Additional Resources */}
      <div>
        <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="ExternalLink" size={18} className="text-primary" />
          <span>Additional Resources</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="justify-start h-auto p-3"
            iconName="FileText"
            iconPosition="left"
          >
            <div className="text-left">
              <p className="font-body font-medium">Scientific Papers</p>
              <p className="font-caption text-xs text-muted-foreground">Latest research findings</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-3"
            iconName="Image"
            iconPosition="left"
          >
            <div className="text-left">
              <p className="font-body font-medium">Image Gallery</p>
              <p className="font-caption text-xs text-muted-foreground">High-resolution photos</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-3"
            iconName="Calculator"
            iconPosition="left"
          >
            <div className="text-left">
              <p className="font-body font-medium">Calculators</p>
              <p className="font-caption text-xs text-muted-foreground">Distance and size tools</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-3"
            iconName="Users"
            iconPosition="left"
          >
            <div className="text-left">
              <p className="font-body font-medium">Community</p>
              <p className="font-caption text-xs text-muted-foreground">Discussion forums</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationalContentTab;