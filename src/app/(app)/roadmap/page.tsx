
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
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-border"></div>

              {curriculumRoadmap.map((item, index) => {
                const config = statusConfig[item.status];
                const Icon = config.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={item.orderIndex} className="relative flex justify-center mb-12">
                     <div className={cn("absolute top-1/2 w-1/2 border-t", config.borderColor)}></div>
                    <div className={cn(
                      "w-1/2",
                      isEven ? "text-right pr-8" : "text-left pl-8 order-2"
                    )}>
                      <p className={cn("font-bold text-lg", config.textColor)}>{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>

                    <div className={cn("absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10", isEven ? "-right-1/2" : "-left-1/2")}>
                       <div className="w-10 h-10 rounded-full bg-background border-2 flex items-center justify-center" style={{ borderColor: config.borderColor.split('border-')[1] }}>
                         <Icon className={cn("w-6 h-6", config.textColor)} />
                       </div>
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
