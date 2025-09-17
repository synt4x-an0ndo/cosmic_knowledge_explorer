import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizResults = ({ 
  results, 
  quiz, 
  onRetakeQuiz = () => {},
  onBackToCategories = () => {},
  onViewProgress = () => {},
  className = '' 
}) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-aurora-green';
    if (score >= 70) return 'text-solar-gold';
    if (score >= 50) return 'text-stellar-blue';
    return 'text-red-giant-crimson';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return "Outstanding! You're a cosmic expert!";
    if (score >= 70) return "Great job! You have solid knowledge!";
    if (score >= 50) return "Good effort! Keep learning!";
    return "Don't give up! Practice makes perfect!";
  };

  const getAchievements = (score) => {
    const achievements = [];
    if (score === 100) achievements?.push({ name: "Perfect Score", icon: "Crown", color: "text-solar-gold" });
    if (score >= 90) achievements?.push({ name: "Expert Level", icon: "Trophy", color: "text-aurora-green" });
    if (score >= 70) achievements?.push({ name: "Knowledge Master", icon: "Award", color: "text-stellar-blue" });
    if (results?.timeSpent < quiz?.timeLimit * 60 * 0.5) achievements?.push({ name: "Speed Demon", icon: "Zap", color: "text-nebula-purple" });
    return achievements;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const correctAnswers = Object.keys(results?.answers)?.filter(
    questionIndex => results?.answers?.[questionIndex] === quiz?.questions?.[questionIndex]?.correctAnswer
  )?.length;

  const achievements = getAchievements(results?.score);

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-8">
          <div className="mb-6">
            <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center cosmic-glow-lg ${
              results?.score >= 70 ? 'bg-aurora-green/20 border-aurora-green/30' : 'bg-stellar-blue/20 border-stellar-blue/30'
            } border-2`}>
              <Icon 
                name={results?.score >= 70 ? "Trophy" : "Target"} 
                size={40} 
                className={getScoreColor(results?.score)} 
              />
            </div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Quiz Complete!
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              {getPerformanceMessage(results?.score)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(results?.score)}`}>
                {results?.score}%
              </div>
              <p className="font-caption text-sm text-muted-foreground">
                Final Score
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">
                {correctAnswers}/{quiz?.questions?.length}
              </div>
              <p className="font-caption text-sm text-muted-foreground">
                Correct Answers
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">
                {formatTime(results?.timeSpent)}
              </div>
              <p className="font-caption text-sm text-muted-foreground">
                Time Spent
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Achievements */}
      {achievements?.length > 0 && (
        <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6 mb-6">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-4 flex items-center">
            <Icon name="Award" size={24} className="text-solar-gold mr-2" />
            Achievements Unlocked
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-cosmic-md bg-card/30 border border-border">
                <Icon name={achievement?.icon} size={20} className={achievement?.color} />
                <span className="font-body font-medium text-foreground">
                  {achievement?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Performance Breakdown */}
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6 mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={24} className="text-stellar-blue mr-2" />
          Performance Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-body font-medium text-foreground mb-3">
              Question Breakdown
            </h3>
            <div className="space-y-2">
              {quiz?.questions?.map((question, index) => {
                const isCorrect = results?.answers?.[index] === question?.correctAnswer;
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-cosmic-sm bg-card/20">
                    <span className="font-caption text-sm text-muted-foreground">
                      Question {index + 1}
                    </span>
                    <Icon 
                      name={isCorrect ? "CheckCircle" : "XCircle"} 
                      size={16} 
                      className={isCorrect ? "text-aurora-green" : "text-red-giant-crimson"} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-body font-medium text-foreground mb-3">
              Knowledge Areas
            </h3>
            <div className="space-y-3">
              {[
                { area: "Basic Concepts", score: 85, color: "stellar-blue" },
                { area: "Advanced Topics", score: 72, color: "nebula-purple" },
                { area: "Practical Application", score: 90, color: "aurora-green" }
              ]?.map((area, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-caption text-sm text-muted-foreground">
                      {area?.area}
                    </span>
                    <span className="font-data text-sm text-foreground">
                      {area?.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-cosmic-sm overflow-hidden">
                    <div 
                      className={`h-full bg-${area?.color} rounded-cosmic-sm cosmic-transition`}
                      style={{ width: `${area?.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6 mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-4 flex items-center">
          <Icon name="Lightbulb" size={24} className="text-solar-gold mr-2" />
          Recommended Next Steps
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-cosmic-md bg-card/20 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BookOpen" size={18} className="text-stellar-blue" />
              <h3 className="font-body font-medium text-foreground">
                Study Suggestions
              </h3>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Review stellar classification types</li>
              <li>• Practice galaxy identification</li>
              <li>• Study cosmic distance measurements</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-cosmic-md bg-card/20 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={18} className="text-nebula-purple" />
              <h3 className="font-body font-medium text-foreground">
                Practice Areas
              </h3>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Take more advanced quizzes</li>
              <li>• Explore 3D universe models</li>
              <li>• Join guided tour sessions</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          onClick={onRetakeQuiz}
          iconName="RotateCcw"
          iconPosition="left"
          className="cosmic-glow-sm"
        >
          Retake Quiz
        </Button>
        <Button
          variant="outline"
          onClick={onBackToCategories}
          iconName="Grid3X3"
          iconPosition="left"
        >
          Browse Categories
        </Button>
        <Button
          variant="outline"
          onClick={onViewProgress}
          iconName="TrendingUp"
          iconPosition="left"
        >
          View Progress
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;