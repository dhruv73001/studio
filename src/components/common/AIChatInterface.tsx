'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, User, Send, Loader2, Sparkles, FileText, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { answerResearchQuestion } from '@/ai/flows/answer-research-questions';
import { summarizeResearchContent } from '@/ai/flows/summarize-research-content';
import { generateMCQQuestions } from '@/ai/flows/generate-mcq-questions';

type Message = {
  role: 'user' | 'bot';
  content: React.ReactNode;
};

type AiAction = 'question' | 'summary' | 'mcq';

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<AiAction>('question');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages([{ role: 'bot', content: 'Hello! I am Student GPT. How can I help you with your research today? Choose an option below or ask me a question.' }]);
  }, []);

  const handleActionSelect = (action: AiAction) => {
    setCurrentAction(action);
    setInput('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      let response;
      if (currentAction === 'question') {
        response = await answerResearchQuestion({ question: input });
        setMessages((prev) => [...prev, { role: 'bot', content: response.answer }]);
      } else if (currentAction === 'summary') {
        response = await summarizeResearchContent({ content: input });
        setMessages((prev) => [...prev, { role: 'bot', content: response.summary }]);
      } else if (currentAction === 'mcq') {
        response = await generateMCQQuestions({ topic: input, numQuestions: 5 });
        const mcqContent = (
          <div className="space-y-4">
            <p>Here are 5 multiple-choice questions on "{input}":</p>
            {response.questions.map((q, index) => (
              <div key={index} className="text-sm p-2 border rounded-md">
                <p className="font-semibold">{index + 1}. {q.question}</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
                <p className="mt-2 text-primary font-bold">Answer: {q.answer}</p>
              </div>
            ))}
          </div>
        );
        setMessages((prev) => [...prev, { role: 'bot', content: mcqContent }]);
      }
    } catch (error) {
      console.error("AI action failed:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Student GPT could not be reached. Please try again.",
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const getActionProps = () => {
    switch (currentAction) {
      case 'summary':
        return { placeholder: 'Paste the content you want to summarize...', Component: Textarea };
      case 'mcq':
        return { placeholder: 'Enter a topic to generate MCQs (e.g., Photosynthesis)', Component: Input };
      case 'question':
      default:
        return { placeholder: 'Ask a research question...', Component: Input };
    }
  };
  
  const { placeholder, Component } = getActionProps();

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-muted/40">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.role === 'bot' && <div className="p-2 rounded-full bg-primary text-primary-foreground"><Bot className="w-5 h-5" /></div>}
              <Card className={cn('max-w-sm', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card')}>
                <CardContent className="p-3 text-sm">{msg.content}</CardContent>
              </Card>
              {msg.role === 'user' && <div className="p-2 rounded-full bg-secondary"><User className="w-5 h-5" /></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="p-2 rounded-full bg-primary text-primary-foreground"><Bot className="w-5 h-5" /></div>
               <Card className="bg-card">
                <CardContent className="p-3 text-sm flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin" />
                   <span>Thinking...</span>
                </CardContent>
               </Card>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 mb-2">
            <Button variant={currentAction === 'question' ? 'default' : 'outline'} size="sm" onClick={() => handleActionSelect('question')}><Sparkles className="mr-2 h-4 w-4" />Ask</Button>
            <Button variant={currentAction === 'summary' ? 'default' : 'outline'} size="sm" onClick={() => handleActionSelect('summary')}><FileText className="mr-2 h-4 w-4" />Summarize</Button>
            <Button variant={currentAction === 'mcq' ? 'default' : 'outline'} size="sm" onClick={() => handleActionSelect('mcq')}><ListChecks className="mr-2 h-4 w-4" />MCQs</Button>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Component
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            rows={currentAction === 'summary' ? 4 : undefined}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
