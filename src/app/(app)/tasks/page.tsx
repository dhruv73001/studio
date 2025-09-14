import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export default function TasksPage() {
  return (
    <div>
      <Header title="Tasks" subtitle="Manage your assignments and assessments" />
      <div className="p-4">
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground p-8 space-y-4">
                <ListChecks className="w-16 h-16" />
                <p>Your tasks will appear here, tailored to your role.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
