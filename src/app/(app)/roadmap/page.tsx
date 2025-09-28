
'use client';

import { useEffect, useState } from "react";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Milestone } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

type RoadmapStep = {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  orderIndex: number;
};

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        const roadmapCollection = collection(db, "roadmaps");
        const q = query(roadmapCollection, orderBy("orderIndex"));
        const roadmapSnapshot = await getDocs(q);
        
        if (roadmapSnapshot.empty) {
          setError("No roadmaps have been assigned yet. Ask your teacher to assign one to you!");
          setRoadmap([]);
        } else {
          const roadmapData = roadmapSnapshot.docs.map(doc => doc.data() as RoadmapStep);
          setRoadmap(roadmapData);
        }

      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setError("Failed to load the roadmap. Please check your connection and Firestore security rules.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);


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

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading Roadmap...</div>;
    }
    if (error) {
      return (
        <div className="text-center text-destructive-foreground bg-destructive/10 p-4 rounded-md">
          <p>{error}</p>
        </div>
      );
    }
    if (roadmap.length === 0) {
      return (
         <div className="text-center text-muted-foreground py-8">
          <p>No roadmap has been assigned yet.</p>
          <p className="text-sm mt-2">Ask your teacher to assign one to you!</p>
        </div>
      );
    }
    return (
      <div className="relative pl-6">
        {/* Vertical connecting line */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>

        {roadmap.map((item, index) => {
          const config = statusConfig[item.status];
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
      <Header title="Curriculum Roadmap" subtitle="Track your learning journey" />
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
