'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateRoadmap, type GenerateRoadmapOutput } from '@/ai/flows/generate-roadmap-flow';
import { RoadmapTimeline } from '@/components/common/RoadmapTimeline';

export default function AIRoadmapGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<GenerateRoadmapOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateRoadmap = async () => {
    if (!topic) {
      toast({
        variant: 'destructive',
        title: 'Topic is required',
        description: 'Please enter a topic for your roadmap.',
      });
      return;
    }

    setLoading(true);
    setRoadmap(null);
    try {
      const result = await generateRoadmap({ topic });
      setRoadmap(result);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the roadmap. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="AI Roadmap Generator" subtitle="Create a custom learning path" />
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">What do you want to learn?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="e.g., 'Prepare for my Physics exam' or 'Learn Python'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            />
            <Button onClick={handleGenerateRoadmap} disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Roadmap
            </Button>
          </CardContent>
        </Card>

        {roadmap && (
          <Card>
            <CardHeader>
              <CardTitle>{roadmap.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <RoadmapTimeline steps={roadmap.steps} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
