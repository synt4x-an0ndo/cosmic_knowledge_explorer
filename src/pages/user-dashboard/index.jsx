import React from 'react';
import Header from '../../components/ui/Header';
import FloatingNavigationHub from '../../components/ui/FloatingNavigationHub';
import ProgressMetrics from './components/ProgressMetrics';
import BookmarkedObjects from './components/BookmarkedObjects';
import LearningPath from './components/LearningPath';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import AchievementBadges from './components/AchievementBadges';
import Icon from '../../components/AppIcon';

const UserDashboard = () => {
  const currentDate = new Date()?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const userStats = {
    name: 'Alex Chen',
    level: 'Cosmic Explorer',
    joinDate: 'March 2025',
    totalExplorationTime: '47 hours',
    favoriteObject: 'Andromeda Galaxy',
    currentStreak: 3
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingNavigationHub />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stellar-blue to-nebula-purple cosmic-glow-md flex items-center justify-center">
                      <Icon name="User" size={28} color="white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-aurora-green border-2 border-card flex items-center justify-center">
                      <Icon name="CheckCircle" size={12} className="text-card" />
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="font-heading font-bold text-2xl text-foreground">
                      Welcome back, {userStats?.name}!
                    </h1>
                    <p className="font-body text-muted-foreground mt-1">
                      {userStats?.level} • Member since {userStats?.joinDate}
                    </p>
                    <p className="font-caption text-sm text-muted-foreground mt-1">
                      {currentDate}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Flame" size={16} className="text-solar-gold" />
                    <span className="font-data text-sm text-solar-gold font-semibold">
                      {userStats?.currentStreak} day streak
                    </span>
                  </div>
                  <p className="font-caption text-xs text-muted-foreground">
                    Total exploration: {userStats?.totalExplorationTime}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Favorite: {userStats?.favoriteObject}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Progress Metrics */}
              <ProgressMetrics />
              
              {/* Bookmarked Objects */}
              <BookmarkedObjects />
              
              {/* Achievement Badges */}
              <AchievementBadges />
              
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Learning Path */}
              <LearningPath />
              
              {/* Recent Activity */}
              <RecentActivity />
              
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-12">
            <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
              <div className="text-center mb-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Your Cosmic Journey
                </h3>
                <p className="font-caption text-sm text-muted-foreground">
                  Explore the universe, one discovery at a time
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 p-3 rounded-cosmic-lg bg-stellar-blue/20 border border-stellar-blue/30">
                    <Icon name="Globe" size={24} className="text-stellar-blue" />
                  </div>
                  <p className="font-data text-lg font-semibold text-foreground">156</p>
                  <p className="font-caption text-xs text-muted-foreground">Objects Discovered</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 p-3 rounded-cosmic-lg bg-nebula-purple/20 border border-nebula-purple/30">
                    <Icon name="Route" size={24} className="text-nebula-purple" />
                  </div>
                  <p className="font-data text-lg font-semibold text-foreground">12</p>
                  <p className="font-caption text-xs text-muted-foreground">Tours Completed</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 p-3 rounded-cosmic-lg bg-solar-gold/20 border border-solar-gold/30">
                    <Icon name="Brain" size={24} className="text-solar-gold" />
                  </div>
                  <p className="font-data text-lg font-semibold text-foreground">87%</p>
                  <p className="font-caption text-xs text-muted-foreground">Quiz Average</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 p-3 rounded-cosmic-lg bg-aurora-green/20 border border-aurora-green/30">
                    <Icon name="Trophy" size={24} className="text-aurora-green" />
                  </div>
                  <p className="font-data text-lg font-semibold text-foreground">3</p>
                  <p className="font-caption text-xs text-muted-foreground">Badges Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;