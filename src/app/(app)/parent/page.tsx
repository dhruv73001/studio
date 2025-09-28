import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parentData, curriculumRoadmap } from "@/lib/data";
import { User, CheckCircle, List, Send, Calendar, BarChartHorizontal, Milestone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";

export default function ParentDashboard() {
  const statusColors = {
    completed: "bg-accent text-accent-foreground",
    "in-progress": "bg-blue-500/20 text-blue-700",
    upcoming: "bg-secondary text-secondary-foreground",
  };
  
  const leaveStatusColors: { [key: string]: string } = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    declined: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Parent Dashboard" subtitle={`Welcome, ${parentData.name}!`} />
      <div className="flex-1 space-y-4 p-4">
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardDescription>Viewing progress for</CardDescription>
                    <CardTitle>{parentData.childName}</CardTitle>
                </div>
                <User className="w-8 h-8 text-primary" />
            </CardHeader>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Attendance</CardTitle>
                <CheckCircle className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-accent">{parentData.attendance}%</div>
                <p className="text-xs text-muted-foreground">Overall attendance rate</p>
                <div className="w-full bg-secondary rounded-full h-2.5 mt-2">
                  <div className="bg-accent h-2.5 rounded-full" style={{ width: `${parentData.attendance}%` }}></div>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">Tasks & Assessments</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parentData.tasks.map((task, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell><Badge variant="outline">{task.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Academic Progress</CardTitle>
            <Link href="/roadmap" className="text-sm text-primary flex items-center">
              View Roadmap <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
             <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
                {curriculumRoadmap.slice(0,3).map((item, index) => (
                    <div key={index} className="relative mb-6">
                        <div className={cn(
                            "absolute -left-0.5 top-1 h-3 w-3 rounded-full -translate-x-1/2 ml-0.5",
                             item.status === 'completed' ? 'bg-accent' : 'bg-secondary'
                        )}></div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <Badge variant={item.status === 'completed' ? 'default' : 'secondary'} className={cn(item.status === 'in-progress' && 'bg-blue-200 text-blue-800')}>{item.status}</Badge>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">Leave Status</CardTitle>
            </CardHeader>
            <CardContent>
                {parentData.leaveRequests.map((req, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-secondary rounded-md mb-2">
                        <div>
                            <p className="font-semibold text-sm">{req.date}</p>
                            <p className="text-xs text-muted-foreground">{req.reason}</p>
                        </div>
                        <Badge className={cn(leaveStatusColors[req.status])}>{req.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Button variant="outline" className="w-full"><Send className="mr-2 h-4 w-4" /> Message Teacher</Button>

      </div>
    </div>
  );
}
