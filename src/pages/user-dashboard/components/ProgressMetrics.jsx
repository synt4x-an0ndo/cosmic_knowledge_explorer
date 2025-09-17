import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressMetrics = () => {
  const metrics = [
    {
      id: 'exploration',
      label: 'Exploration Time',
      value: 47,
      total: 100,
      unit: 'hours',
      icon: 'Clock',
      color: 'text-stellar-blue',
      bgColor: 'bg-stellar-blue/20',
      strokeColor: 'stroke-stellar-blue'
    },
    {
      id: 'objects',
      label: 'Objects Discovered',
      value: 156,
      total: 200,
      unit: 'objects',
      icon: 'Telescope',
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/20',
      strokeColor: 'stroke-nebula-purple'
    },
    {
      id: 'tours',
      label: 'Tours Completed',
      value: 12,
      total: 15,
      unit: 'tours',
      icon: 'Route',
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/20',
      strokeColor: 'stroke-solar-gold'
    },
    {
      id: 'quizzes',
      label: 'Quiz Score',
      value: 87,
      total: 100,
      unit: '%',
      icon: 'Brain',
      color: 'text-aurora-green',
      bgColor: 'bg-aurora-green/20',
      strokeColor: 'stroke-aurora-green'
    }
  ];

  const calculateProgress = (value, total) => {
    return (value / total) * 100;
  };

  const CircularProgress = ({ progress, color, strokeColor }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${strokeColor} cosmic-transition`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-data text-lg font-semibold ${color}`}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-cosmic-sm bg-primary/20 border border-primary/30">
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Learning Progress
          </h2>
          <p className="font-caption text-sm text-muted-foreground">
            Your cosmic exploration journey
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics?.map((metric) => {
          const progress = calculateProgress(metric?.value, metric?.total);
          
          return (
            <div key={metric?.id} className="flex flex-col items-center space-y-3">
              <div className={`p-4 rounded-cosmic-lg ${metric?.bgColor} border border-border/50`}>
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={metric?.icon} size={24} className={metric?.color} />
                  <CircularProgress 
                    progress={progress} 
                    color={metric?.color}
                    strokeColor={metric?.strokeColor}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="font-body font-medium text-foreground">
                  {metric?.value} {metric?.unit}
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  {metric?.label}
                </p>
                <div className="mt-1 text-xs text-muted-foreground">
                  of {metric?.total} {metric?.unit}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressMetrics;