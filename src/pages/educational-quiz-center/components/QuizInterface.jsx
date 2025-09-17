import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuizInterface = ({ 
  quiz, 
  onComplete = () => {},
  onExit = () => {},
  className = '' 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit * 60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerActive(false);
            handleQuizComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
    setIsTimerActive(false);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setIsTimerActive(true);
    
    if (currentQuestion < quiz?.questions?.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const score = calculateScore();
    onComplete({
      score,
      answers: selectedAnswers,
      timeSpent: (quiz?.timeLimit * 60) - timeRemaining
    });
  };

  const calculateScore = () => {
    let correct = 0;
    quiz?.questions?.forEach((question, index) => {
      if (selectedAnswers?.[index] === question?.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz?.questions?.length) * 100);
  };

  const currentQ = quiz?.questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz?.questions?.length) * 100;
  const isAnswered = selectedAnswers?.hasOwnProperty(currentQuestion);
  const isCorrect = selectedAnswers?.[currentQuestion] === currentQ?.correctAnswer;

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Quiz Header */}
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-cosmic-sm bg-primary/20 border border-primary/30">
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg text-foreground">
                {quiz?.title}
              </h2>
              <p className="font-caption text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quiz?.questions?.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className={`font-data text-sm ${timeRemaining < 60 ? 'text-red-giant-crimson' : 'text-foreground'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onExit}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-caption text-sm text-muted-foreground">
              Progress
            </span>
            <span className="font-data text-sm text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-cosmic-sm overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-stellar-blue to-nebula-purple cosmic-transition"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      {/* Question Content */}
      <div className="cosmic-backdrop rounded-cosmic-lg border border-border p-6 mb-6">
        <div className="mb-6">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
            {currentQ?.question}
          </h3>
          
          {currentQ?.image && (
            <div className="mb-6 rounded-cosmic-md overflow-hidden">
              <Image 
                src={currentQ?.image} 
                alt="Question illustration"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          
          {currentQ?.context && (
            <div className="bg-card/30 rounded-cosmic-md p-4 mb-6 border border-border">
              <p className="font-body text-sm text-muted-foreground">
                {currentQ?.context}
              </p>
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQ?.options?.map((option, index) => {
            const isSelected = selectedAnswers?.[currentQuestion] === index;
            const isCorrectAnswer = index === currentQ?.correctAnswer;
            
            let buttonVariant = 'outline';
            let additionalClasses = '';
            
            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonVariant = 'success';
                additionalClasses = 'border-aurora-green bg-aurora-green/10';
              } else if (isSelected && !isCorrectAnswer) {
                buttonVariant = 'destructive';
                additionalClasses = 'border-red-giant-crimson bg-red-giant-crimson/10';
              }
            } else if (isSelected) {
              buttonVariant = 'default';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-cosmic-md border cosmic-transition hover:border-primary/50 ${
                  isSelected && !showFeedback ? 'border-primary bg-primary/10' : 'border-border'
                } ${additionalClasses} ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-body text-foreground">
                    {option}
                  </span>
                  {showFeedback && isCorrectAnswer && (
                    <Icon name="CheckCircle" size={20} className="text-aurora-green ml-auto" />
                  )}
                  {showFeedback && isSelected && !isCorrectAnswer && (
                    <Icon name="XCircle" size={20} className="text-red-giant-crimson ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <div className={`rounded-cosmic-md p-4 border ${
            isCorrect 
              ? 'bg-aurora-green/10 border-aurora-green/30' :'bg-red-giant-crimson/10 border-red-giant-crimson/30'
          }`}>
            <div className="flex items-start space-x-3">
              <Icon 
                name={isCorrect ? "CheckCircle" : "XCircle"} 
                size={20} 
                className={isCorrect ? "text-aurora-green" : "text-red-giant-crimson"} 
              />
              <div>
                <p className={`font-body font-medium text-sm mb-2 ${
                  isCorrect ? "text-aurora-green" : "text-red-giant-crimson"
                }`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="font-body text-sm text-foreground">
                  {currentQ?.explanation}
                </p>
                {currentQ?.learnMoreLink && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 p-0 h-auto"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    Learn more about this topic
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={onExit}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Exit Quiz
          </Button>
          
          <div className="flex space-x-3">
            {!showFeedback ? (
              <Button
                variant="default"
                onClick={handleSubmitAnswer}
                disabled={!isAnswered}
                iconName="Send"
                iconPosition="right"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleNextQuestion}
                iconName={currentQuestion === quiz?.questions?.length - 1 ? "Trophy" : "ArrowRight"}
                iconPosition="right"
              >
                {currentQuestion === quiz?.questions?.length - 1 ? "Complete Quiz" : "Next Question"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;