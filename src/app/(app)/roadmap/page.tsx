
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
            <div className="relative pl-6">
              {/* Vertical connecting line */}
              <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>

              {curriculumRoadmap.map((item, index) => {
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
