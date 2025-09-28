
'use client';

import { useEffect, useState } from "react";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Milestone } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

type RoadmapStep = {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  orderIndex: number;
};

type Roadmap = {
  title: string;
  description: string;
  steps: RoadmapStep[];
};

export default function RoadmapDetailPage({ params }: { params: { id: string } }) {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "roadmaps", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Roadmap;
          // Ensure steps are sorted by orderIndex if they exist
          if (data.steps && Array.isArray(data.steps)) {
            data.steps.sort((a, b) => a.orderIndex - b.orderIndex);
          }
          setRoadmap(data);
        } else {
          setError("Roadmap not found. It may have been removed.");
        }
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setError("Failed to load the roadmap. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [params.id]);

  const statusConfig = {
    completed: {
      icon: CheckCircle,
      textColor: "text-accent",
      bgColor: "bg-accent",
      borderColor: "border-accent",
    },
    "in-progress": {
      icon: Milestone,
      textColor: "text-primary",
      bgColor: "bg-primary",
      borderColor: "border-primary",
    },
    "not-started": {
      icon: Circle,
      textColor: "text-muted-foreground",
      bgColor: "bg-border",
      borderColor: "border-border",
    },
  };
  
  const renderLoading = () => (
    <div className="relative pl-6">
       <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
       {Array.from({ length: 4 }).map((_, index) => (
         <div key={index} className="relative mb-8 pl-8">
            <div className="absolute -left-0.5 top-1 h-6 w-6 rounded-full bg-background border-2 flex items-center justify-center -translate-x-1/2 border-border">
                <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
       ))}
    </div>
  );

  const renderContent = () => {
    if (loading) return renderLoading();

    if (error) {
      return (
        <div className="text-center text-destructive-foreground bg-destructive/10 p-4 rounded-md">
          <p>{error}</p>
        </div>
      );
    }

    if (!roadmap || !roadmap.steps || roadmap.steps.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
          <p>No steps found for this roadmap.</p>
        </div>
      );
    }

    return (
      <div className="relative pl-6">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
        {roadmap.steps.map((item, index) => {
          const config = statusConfig[item.status] || statusConfig['not-started'];
          const Icon = config.icon;

          return (
            <div key={item.orderIndex} className="relative mb-8 pl-8">
              <div className={cn(
                  "absolute -left-0.5 top-1 h-6 w-6 rounded-full bg-background border-2 flex items-center justify-center -translate-x-1/2",
                  config.borderColor
              )}>
                  <Icon className={cn("w-4 h-4", config.textColor)} />
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className={cn("font-bold text-base", config.textColor)}>{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Header title={roadmap?.title || "Loading..."} subtitle={roadmap?.description || "Your learning journey"} />
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
