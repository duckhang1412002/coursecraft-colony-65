
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  BookOpen, 
  GripVertical,
  Copy
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizEditorProps {
  initialQuiz?: Quiz;
  lessonId: string;
  onSave: (quiz: Quiz) => void;
}

const QuizEditor = ({ initialQuiz, lessonId, onSave }: QuizEditorProps) => {
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz>(
    initialQuiz || {
      id: `quiz-${lessonId}`,
      title: "Lesson Quiz",
      questions: [
        {
          id: "q1",
          question: "What is the main topic of this lesson?",
          options: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
            { id: "d", text: "Option D" }
          ],
          correctAnswer: "a"
        }
      ]
    }
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({
      ...quiz,
      title: e.target.value
    });
  };

  const handleQuestionChange = (questionId: string, value: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => 
        q.id === questionId 
          ? { ...q, question: value } 
          : q
      )
    });
  };

  const handleOptionChange = (questionId: string, optionId: string, value: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options.map(o => 
                o.id === optionId 
                  ? { ...o, text: value } 
                  : o
              ) 
            } 
          : q
      )
    });
  };

  const handleCorrectAnswerChange = (questionId: string, value: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => 
        q.id === questionId 
          ? { ...q, correctAnswer: value } 
          : q
      )
    });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q${quiz.questions.length + 1}`,
      question: "New question",
      options: [
        { id: "a", text: "Option A" },
        { id: "b", text: "Option B" },
        { id: "c", text: "Option C" },
        { id: "d", text: "Option D" }
      ],
      correctAnswer: "a"
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  const removeQuestion = (questionId: string) => {
    if (quiz.questions.length <= 1) {
      toast({
        title: "Cannot Remove Question",
        description: "A quiz must have at least one question.",
        variant: "destructive"
      });
      return;
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.filter(q => q.id !== questionId)
    });
  };

  const addOption = (questionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) return;

    // Generate new option ID based on existing options
    const optionIds = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const existingOptionIds = question.options.map(o => o.id);
    const newOptionId = optionIds.find(id => !existingOptionIds.includes(id));

    if (!newOptionId) {
      toast({
        title: "Maximum Options Reached",
        description: "A question cannot have more than 8 options.",
        variant: "destructive"
      });
      return;
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: [...q.options, { id: newOptionId, text: `Option ${newOptionId.toUpperCase()}` }]
            } 
          : q
      )
    });
  };

  const removeOption = (questionId: string, optionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question || question.options.length <= 2) {
      toast({
        title: "Cannot Remove Option",
        description: "A question must have at least 2 options.",
        variant: "destructive"
      });
      return;
    }

    // If removing the correct answer, set correct answer to first remaining option
    let updatedCorrectAnswer = question.correctAnswer;
    if (question.correctAnswer === optionId) {
      const remainingOptions = question.options.filter(o => o.id !== optionId);
      updatedCorrectAnswer = remainingOptions[0]?.id || "";
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options.filter(o => o.id !== optionId),
              correctAnswer: updatedCorrectAnswer
            } 
          : q
      )
    });
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = quiz.questions.find(q => q.id === questionId);
    if (!questionToDuplicate) return;

    const newQuestionId = `q${Date.now()}`;
    const newQuestion = {
      ...questionToDuplicate,
      id: newQuestionId
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  const handleSave = () => {
    // Validate quiz
    if (!quiz.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for the quiz.",
        variant: "destructive"
      });
      return;
    }

    // Validate questions
    for (const question of quiz.questions) {
      if (!question.question.trim()) {
        toast({
          title: "Empty Question",
          description: "Please fill in all questions.",
          variant: "destructive"
        });
        return;
      }

      for (const option of question.options) {
        if (!option.text.trim()) {
          toast({
            title: "Empty Option",
            description: "Please fill in all options for all questions.",
            variant: "destructive"
          });
          return;
        }
      }
    }

    // Save quiz
    onSave(quiz);
    toast({
      title: "Quiz Saved",
      description: "Your quiz has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Editor</CardTitle>
          <CardDescription>
            Create or edit a quiz for this lesson
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quiz-title">Quiz Title</Label>
            <Input 
              id="quiz-title" 
              value={quiz.title} 
              onChange={handleTitleChange} 
              placeholder="Enter quiz title"
            />
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="w-full" defaultValue={quiz.questions.map(q => q.id)}>
        {quiz.questions.map((question, index) => (
          <AccordionItem key={question.id} value={question.id} className="border rounded-lg mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-muted/50 rounded-t-lg">
              <div className="flex items-center w-full">
                <GripVertical className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="text-left">
                  <span className="font-medium">Question {index + 1}</span>
                  <p className="text-sm text-muted-foreground truncate max-w-md">
                    {question.question || "New question"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${question.id}`}>Question</Label>
                  <Textarea
                    id={`question-${question.id}`}
                    value={question.question}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    placeholder="Enter your question"
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Options</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addOption(question.id)}
                      disabled={question.options.length >= 8}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted">
                          {option.id.toUpperCase()}
                        </div>
                        <Input
                          value={option.text}
                          onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(question.id, option.id)}
                          disabled={question.options.length <= 2}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`correct-answer-${question.id}`}>Correct Answer</Label>
                  <Select
                    value={question.correctAnswer}
                    onValueChange={(value) => handleCorrectAnswerChange(question.id, value)}
                  >
                    <SelectTrigger id={`correct-answer-${question.id}`}>
                      <SelectValue placeholder="Select the correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.id.toUpperCase()}: {option.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateQuestion(question.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => removeQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-between">
        <Button variant="outline" onClick={addQuestion}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizEditor;
