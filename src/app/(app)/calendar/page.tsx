import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function CalendarPage() {
  return (
    <div>
      <Header title="Calendar" subtitle="View upcoming events and schedules" />
       <div className="p-4">
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground p-8 space-y-4">
                <Calendar className="w-16 h-16" />
                <p>The event calendar will be available here.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
