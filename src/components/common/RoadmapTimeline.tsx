'use client';

import { CheckCircle, Circle, Milestone } from 'lucide-react';
import { cn } from '@/lib/utils';

type RoadmapStep = {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  orderIndex: number;
};

type RoadmapTimelineProps = {
  steps: RoadmapStep[];
};

export function RoadmapTimeline({ steps }: RoadmapTimelineProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      textColor: 'text-accent',
      borderColor: 'border-accent',
    },
    'in-progress': {
      icon: Milestone,
      textColor: 'text-primary',
      borderColor: 'border-primary',
    },
    'not-started': {
      icon: Circle,
      textColor: 'text-muted-foreground',
      borderColor: 'border-border',
    },
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No steps found for this roadmap.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
      {steps.map((item, index) => {
        const config = statusConfig[item.status] || statusConfig['not-started'];
        const Icon = config.icon;

        return (
          <div key={item.orderIndex} className="relative mb-8 pl-8">
            <div
              className={cn(
                'absolute -left-0.5 top-1 h-6 w-6 rounded-full bg-background border-2 flex items-center justify-center -translate-x-1/2',
                config.borderColor
              )}
            >
              <Icon className={cn('w-4 h-4', config.textColor)} />
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className={cn('font-bold text-base', config.textColor)}>{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
