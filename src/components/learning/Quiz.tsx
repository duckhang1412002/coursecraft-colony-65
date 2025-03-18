
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
}

interface QuizProps {
  quiz: {
    id: string;
    title: string;
    questions: QuizQuestion[];
  };
  onComplete: (results: {
    score: number;
    totalQuestions: number;
    correctAnswers: string[];
    userAnswers: Record<string, string>;
  }) => void;
}

const Quiz = ({ quiz, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quiz Unavailable</CardTitle>
          <CardDescription>
            No questions are available for this quiz.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  
  const handleAnswerSelect = (value: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: value
    });
  };
  
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  const handleNext = () => {
    if (isLastQuestion) {
      if (!showFeedback) {
        setShowFeedback(true);
      } else {
        // Calculate results
        let score = 0;
        const correctAnswers: string[] = [];
        
        quiz.questions.forEach(question => {
          if (userAnswers[question.id] === question.correctAnswer) {
            score++;
            correctAnswers.push(question.id);
          }
        });
        
        onComplete({
          score,
          totalQuestions,
          correctAnswers,
          userAnswers
        });
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    }
  };
  
  const isCorrect = userAnswers[currentQuestion.id] === currentQuestion.correctAnswer;
  const hasAnswered = !!userAnswers[currentQuestion.id];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-lg font-medium mb-4">{currentQuestion.question}</div>
        
        <RadioGroup 
          value={userAnswers[currentQuestion.id] || ""} 
          onValueChange={handleAnswerSelect}
          className="space-y-3"
          disabled={showFeedback}
        >
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 p-3 rounded-md border ${
                showFeedback
                  ? option.id === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : option.id === userAnswers[currentQuestion.id]
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-transparent"
                  : "hover:bg-muted"
              }`}
            >
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label 
                htmlFor={`option-${option.id}`} 
                className="flex-1 cursor-pointer py-1"
              >
                {option.text}
              </Label>
              {showFeedback && option.id === currentQuestion.correctAnswer && (
                <Check className="h-5 w-5 text-green-500" />
              )}
              {showFeedback && option.id === userAnswers[currentQuestion.id] && option.id !== currentQuestion.correctAnswer && (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {showFeedback && (
          <div className={`p-4 rounded-md flex items-start ${
            isCorrect 
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" 
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
          }`}>
            {isCorrect ? (
              <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium">
                {isCorrect ? "Correct!" : "Incorrect!"}
              </p>
              <p className="text-sm">
                {isCorrect 
                  ? "Great job! You selected the right answer." 
                  : `The correct answer is: ${currentQuestion.options.find(o => o.id === currentQuestion.correctAnswer)?.text}`
                }
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex(currentQuestionIndex - 1);
              setShowFeedback(false);
            }
          }}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!hasAnswered}
        >
          {isLastQuestion 
            ? (showFeedback ? "Finish Quiz" : "Check Answer") 
            : (showFeedback ? "Next Question" : "Check Answer")
          }
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
