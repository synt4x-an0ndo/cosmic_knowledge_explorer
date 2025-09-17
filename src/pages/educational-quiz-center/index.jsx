import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FloatingNavigationHub from '../../components/ui/FloatingNavigationHub';
import LearningProgressIndicator from '../../components/ui/LearningProgressIndicator';
import QuizCategoryCard from './components/QuizCategoryCard';
import QuizInterface from './components/QuizInterface';
import QuizResults from './components/QuizResults';
import QuizSidebar from './components/QuizSidebar';

const EducationalQuizCenter = () => {
  const [currentView, setCurrentView] = useState('categories'); // 'categories', 'quiz', 'results'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const quizCategories = [
    {
      id: 1,
      name: "Solar System",
      icon: "Sun",
      difficulty: "Beginner",
      description: "Test your knowledge of planets, moons, and other objects in our solar system.",
      totalQuestions: 25,
      averageTime: "15 min",
      bestScore: 85,
      completedQuizzes: 3,
      achievements: 2
    },
    {
      id: 2,
      name: "Stellar Classification",
      icon: "Star",
      difficulty: "Intermediate",
      description: "Learn about different types of stars, their properties, and life cycles.",
      totalQuestions: 30,
      averageTime: "20 min",
      bestScore: 72,
      completedQuizzes: 2,
      achievements: 1
    },
    {
      id: 3,
      name: "Galaxy Types",
      icon: "Sparkles",
      difficulty: "Advanced",
      description: "Explore the classification and characteristics of different galaxy types.",
      totalQuestions: 35,
      averageTime: "25 min",
      bestScore: 68,
      completedQuizzes: 1,
      achievements: 1
    },
    {
      id: 4,
      name: "Cosmic Phenomena",
      icon: "Zap",
      difficulty: "Advanced",
      description: "Understand black holes, supernovae, quasars, and other cosmic events.",
      totalQuestions: 40,
      averageTime: "30 min",
      bestScore: 0,
      completedQuizzes: 0,
      achievements: 0
    },
    {
      id: 5,
      name: "Exoplanets",
      icon: "Globe",
      difficulty: "Intermediate",
      description: "Discover planets beyond our solar system and their detection methods.",
      totalQuestions: 28,
      averageTime: "18 min",
      bestScore: 91,
      completedQuizzes: 4,
      achievements: 3
    },
    {
      id: 6,
      name: "Cosmology",
      icon: "Infinity",
      difficulty: "Advanced",
      description: "Explore the origin, evolution, and structure of the universe.",
      totalQuestions: 45,
      averageTime: "35 min",
      bestScore: 0,
      completedQuizzes: 0,
      achievements: 0
    }
  ];

  const userStats = {
    totalQuizzes: 10,
    averageScore: 79,
    overallProgress: 65,
    totalTime: "4h 32m",
    achievements: 7
  };

  const sampleQuiz = {
    id: 1,
    title: "Solar System Fundamentals",
    category: "Solar System",
    timeLimit: 20, // minutes
    questions: [
      {
        id: 1,
        question: "Which planet is known as the \'Red Planet\'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is called the 'Red Planet' due to iron oxide (rust) on its surface, which gives it a reddish appearance.",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&h=400&fit=crop",
        context: "Mars has been observed by humans for thousands of years due to its distinctive color.",
        learnMoreLink: "/object-information-panel?object=mars"
      },
      {
        id: 2,
        question: "What is the largest moon in our solar system?",
        options: ["Europa", "Titan", "Ganymede", "Callisto"],
        correctAnswer: 2,
        explanation: "Ganymede, one of Jupiter's moons, is the largest moon in our solar system and is even larger than the planet Mercury.",
        image: "https://images.pexels.com/photos/87009/earth-moon-space-planet-87009.jpeg?w=600&h=400&fit=crop",
        context: "Jupiter has 95 known moons, with four major ones discovered by Galileo.",
        learnMoreLink: "/object-information-panel?object=ganymede"
      },
      {
        id: 3,
        question: "Which planet has the most extensive ring system?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctAnswer: 1,
        explanation: "Saturn has the most prominent and extensive ring system, made up of countless ice and rock particles.",
        image: "https://images.pixabay.com/photo/2011/12/13/14/39/saturn-11068_1280.jpg?w=600&h=400&fit=crop",
        context: "All gas giants have ring systems, but Saturn's are the most visible from Earth.",
        learnMoreLink: "/object-information-panel?object=saturn"
      }
    ]
  };

  const handleStartQuiz = (category) => {
    setSelectedCategory(category);
    setCurrentQuiz(sampleQuiz);
    setCurrentView('quiz');
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setCurrentView('quiz');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setCurrentQuiz(null);
    setQuizResults(null);
  };

  const handleExitQuiz = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setCurrentQuiz(null);
  };

  const handleViewProgress = () => {
    // Navigate to user dashboard
    window.location.href = '/user-dashboard';
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    // Handle responsive sidebar
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingNavigationHub />
      <main className="pt-16">
        <div className="flex">
          {/* Sidebar */}
          {showSidebar && currentView === 'categories' && (
            <div className="hidden lg:block">
              <QuizSidebar
                categories={quizCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                userStats={userStats}
                className="fixed left-6 top-20 bottom-6 overflow-y-auto"
              />
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 ${showSidebar && currentView === 'categories' ? 'lg:ml-96' : ''}`}>
            <div className="p-6">
              
              {/* Categories View */}
              {currentView === 'categories' && (
                <>
                  {/* Header Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                          Educational Quiz Center
                        </h1>
                        <p className="font-body text-lg text-muted-foreground">
                          Test your cosmic knowledge and track your learning progress
                        </p>
                      </div>
                      
                      <div className="hidden lg:flex items-center space-x-4">
                        <Button
                          variant="outline"
                          onClick={toggleSidebar}
                          iconName={showSidebar ? "PanelLeftClose" : "PanelLeftOpen"}
                          iconPosition="left"
                        >
                          {showSidebar ? "Hide" : "Show"} Sidebar
                        </Button>
                        <Link to="/user-dashboard">
                          <Button
                            variant="default"
                            iconName="TrendingUp"
                            iconPosition="left"
                          >
                            View Progress
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {userStats?.totalQuizzes}
                        </div>
                        <div className="font-caption text-sm text-muted-foreground">
                          Quizzes Completed
                        </div>
                      </div>
                      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                        <div className="text-2xl font-bold text-stellar-blue mb-1">
                          {userStats?.averageScore}%
                        </div>
                        <div className="font-caption text-sm text-muted-foreground">
                          Average Score
                        </div>
                      </div>
                      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                        <div className="text-2xl font-bold text-nebula-purple mb-1">
                          {userStats?.achievements}
                        </div>
                        <div className="font-caption text-sm text-muted-foreground">
                          Achievements
                        </div>
                      </div>
                      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-4 text-center">
                        <div className="text-2xl font-bold text-solar-gold mb-1">
                          {userStats?.totalTime}
                        </div>
                        <div className="font-caption text-sm text-muted-foreground">
                          Study Time
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <Button
                        variant="outline"
                        iconName="Shuffle"
                        iconPosition="left"
                        onClick={() => handleStartQuiz(quizCategories?.[Math.floor(Math.random() * quizCategories?.length)])}
                      >
                        Random Quiz
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Clock"
                        iconPosition="left"
                      >
                        Timed Challenge
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Users"
                        iconPosition="left"
                      >
                        Multiplayer
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Trophy"
                        iconPosition="left"
                      >
                        Leaderboard
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Sidebar Toggle */}
                  <div className="lg:hidden mb-6">
                    <Button
                      variant="outline"
                      onClick={toggleSidebar}
                      iconName="Filter"
                      iconPosition="left"
                      className="w-full"
                    >
                      Filter Categories
                    </Button>
                  </div>

                  {/* Quiz Categories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {quizCategories?.map((category) => (
                      <QuizCategoryCard
                        key={category?.id}
                        category={category}
                        onStartQuiz={handleStartQuiz}
                      />
                    ))}
                  </div>

                  {/* Featured Section */}
                  <div className="mt-12">
                    <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">
                      Featured Content
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Icon name="BookOpen" size={24} className="text-stellar-blue" />
                          <h3 className="font-heading font-semibold text-lg text-foreground">
                            Study Guides
                          </h3>
                        </div>
                        <p className="font-body text-muted-foreground mb-4">
                          Comprehensive study materials to help you prepare for quizzes and deepen your understanding.
                        </p>
                        <Link to="/guided-tour-mode">
                          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                            Browse Guides
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Icon name="Telescope" size={24} className="text-nebula-purple" />
                          <h3 className="font-heading font-semibold text-lg text-foreground">
                            3D Explorer
                          </h3>
                        </div>
                        <p className="font-body text-muted-foreground mb-4">
                          Explore cosmic objects in 3D to better understand the concepts covered in quizzes.
                        </p>
                        <Link to="/3d-universe-explorer">
                          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                            Start Exploring
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Quiz Interface View */}
              {currentView === 'quiz' && currentQuiz && (
                <QuizInterface
                  quiz={currentQuiz}
                  onComplete={handleQuizComplete}
                  onExit={handleExitQuiz}
                />
              )}

              {/* Results View */}
              {currentView === 'results' && quizResults && (
                <QuizResults
                  results={quizResults}
                  quiz={currentQuiz}
                  onRetakeQuiz={handleRetakeQuiz}
                  onBackToCategories={handleBackToCategories}
                  onViewProgress={handleViewProgress}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Learning Progress Indicator for Quiz Mode */}
      {currentView === 'quiz' && (
        <LearningProgressIndicator
          isVisible={true}
          mode="quiz"
          currentStep={1}
          totalSteps={currentQuiz?.questions?.length || 1}
          title={currentQuiz?.title || "Quiz"}
          subtitle={selectedCategory?.name || "Educational Quiz"}
          onExit={handleExitQuiz}
        />
      )}
    </div>
  );
};

export default EducationalQuizCenter;