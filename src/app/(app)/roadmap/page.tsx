import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Milestone } from "lucide-react";
import { curriculumRoadmap } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
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

  return (
    <div>
      <Header title="Curriculum Roadmap" subtitle="Track your learning journey" />
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

              {curriculumRoadmap.map((item, index) => {
                const config = statusConfig[item.status];
                const Icon = config.icon;

                return (
                  <div key={item.orderIndex} className="relative mb-8">
                    <div className="absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2">
                       <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                         <Icon className={cn("w-6 h-6", config.textColor)} />
                       </div>
                    </div>
                    <div className="pl-8">
                      <p className={cn("font-bold text-lg", config.textColor)}>{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
