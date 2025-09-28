
'use client';

import { useEffect, useState } from "react";
import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookOpen } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Roadmap = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export default function RoadmapsListPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);
      setError(null);
      try {
        const roadmapsCollection = collection(db, "roadmaps");
        const q = query(roadmapsCollection, orderBy("title"));
        const roadmapsSnapshot = await getDocs(q);
        
        if (roadmapsSnapshot.empty) {
          setError("No roadmaps have been assigned yet. Ask your teacher to create one!");
        } else {
          const roadmapsData = roadmapsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Roadmap));
          setRoadmaps(roadmapsData);
        }
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
        setError("Failed to load roadmaps. Please check your connection and Firestore security rules.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center text-destructive-foreground bg-destructive/10 p-4 rounded-md">
          <p>{error}</p>
        </div>
      );
    }
    return (
       <div className="space-y-4">
        {roadmaps.map((roadmap) => (
          <Link href={`/roadmaps/${roadmap.id}`} key={roadmap.id} className="block">
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{roadmap.title}</CardTitle>
                        <CardDescription>{roadmap.category}</CardDescription>
                    </div>
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{roadmap.description}</p>
                <div className="flex items-center justify-end text-sm font-medium text-primary">
                  View Path <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header title="Learning Roadmaps" subtitle="Explore your learning journey" />
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
}
