
'use client';

import { useState } from 'react';
import type { GenerateMCQQuestionsOutput } from '@/ai/flows/generate-mcq-questions';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

type InteractiveQuizProps = {
  quizData: GenerateMCQQuestionsOutput;
};

type SelectedAnswers = {
  [questionIndex: number]: string;
};

export function InteractiveQuiz({ quizData }: InteractiveQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    quizData.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
  };

  const getOptionLabelClassName = (questionIndex: number, option: string) => {
    if (!isSubmitted) return '';
    
    const question = quizData.questions[questionIndex];
    const isCorrect = option === question.answer;
    const isSelected = selectedAnswers[questionIndex] === option;

    if (isCorrect) return 'text-accent font-bold';
    if (isSelected && !isCorrect) return 'text-destructive font-bold';

    return 'text-muted-foreground';
  };

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-lg">You scored</p>
            <p className="text-4xl font-bold text-primary">
              {score} / {quizData.questions.length}
            </p>
          </div>
          <div className="space-y-4">
            {quizData.questions.map((q, index) => (
              <div key={index} className="text-sm p-3 border rounded-lg">
                <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((option, i) => (
                     <div
                      key={i}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-md",
                        getOptionLabelClassName(index, option).includes('text-accent') && 'bg-accent/10',
                        getOptionLabelClassName(index, option).includes('text-destructive') && 'bg-destructive/10'
                      )}
                    >
                      {getOptionLabelClassName(index, option).includes('text-accent') && <CheckCircle2 className="w-4 h-4 text-accent" />}
                      {getOptionLabelClassName(index, option).includes('text-destructive') && <XCircle className="w-4 h-4 text-destructive" />}
                      <span className={getOptionLabelClassName(index, option)}>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={() => { setIsSubmitted(false); setSelectedAnswers({}); setScore(0); }}>
                Try Again
            </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {quizData.questions.map((q, index) => (
        <Card key={index} className="text-sm">
            <CardHeader><CardTitle className="text-base">{index + 1}. {q.question}</CardTitle></CardHeader>
            <CardContent>
                <RadioGroup
                    value={selectedAnswers[index] || ''}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    disabled={isSubmitted}
                >
                    {q.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${index}-opt${i}`} />
                        <Label htmlFor={`q${index}-opt${i}`}>{option}</Label>
                    </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={Object.keys(selectedAnswers).length !== quizData.questions.length}
        className="w-full"
      >
        Submit Quiz
      </Button>
    </div>
  );
}
