
import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { studentData } from "@/lib/data";
import { CheckCircle2, XCircle, ListTodo, Users, BarChart2, Calendar, Star, LogOut, ArrowRight, BookOpen, PlusCircle, Milestone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Dashboard" subtitle={`Welcome back, ${studentData.name}!`} />
      <div className="flex-1 space-y-4 p-4">
        
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Today's Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentData.timetable.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-primary-foreground/10 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{item.time}</span>
                    <div>
                        <p>{item.subject}</p>
                        {item.teacher && <p className="text-xs opacity-80">{item.teacher}</p>}
                    </div>
                  </div>
                   <Link href="/calendar" aria-label="Open full calendar">
                    <BookOpen className="h-5 w-5 hover:scale-110 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-accent">{studentData.attendance}%</div>
                    <p className="text-xs text-muted-foreground">Great standing!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rank</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">#{studentData.leaderboardRank}</div>
                     <Link href="/leaderboard" className="text-xs text-primary hover:underline flex items-center">
                        View Board <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Learning Roadmap</CardTitle>
            <Milestone className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Follow your personalized learning path and track your progress.
            </p>
            <Button asChild className="w-full">
              <Link href="/roadmaps">
                View Your Path <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center justify-between">
              Assigned Tasks <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
              {studentData.tasks.solo.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <div>
                          <p className="font-semibold text-sm">{task.title}</p>
                          <Badge variant="outline" className="mt-1">{task.status}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                  </div>
              ))}
              {studentData.tasks.assessment.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div>
                          <p className="font-semibold text-sm text-primary">{task.title}</p>
                           <Badge className="mt-1">Assessment</Badge>
                      </div>
                      <Button size="sm">Start</Button>
                  </div>
              ))}
          </CardContent>
        </Card>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Request Leave</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request Leave of Absence</DialogTitle>
              <DialogDescription>
                Fill in the details below. Your request will be sent to your teacher for approval.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dates" className="text-right">Dates</Label>
                <Input id="dates" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason-type" className="text-right">Type</Label>
                <Select>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="family">Family Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">Reason</Label>
                <Input id="reason" placeholder="e.g., Doctor's appointment" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
