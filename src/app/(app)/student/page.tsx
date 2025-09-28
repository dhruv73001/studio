
import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { studentData } from "@/lib/data";
import { CheckCircle2, XCircle, ListTodo, Users, BarChart2, Calendar, Star, LogOut, ArrowRight, BookOpen, PlusCircle } from "lucide-react";
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

export default function StudentDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Student Dashboard" subtitle={`Welcome, ${studentData.name}!`} />
      <div className="flex-1 space-y-4 p-4">
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              Today's Timetable
              <Link href="/calendar" aria-label="Open full calendar">
                <BookOpen className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {studentData.timetable.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <span className="w-20 font-semibold text-primary">{item.time}</span>
                  <span className="flex-1">{item.subject}</span>
                  {item.teacher && <span className="text-xs text-muted-foreground">{item.teacher}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-700">{studentData.attendance}%</div>
                    <p className="text-xs text-green-500">Great standing!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">#{studentData.leaderboardRank}</div>
                    <Link href="/leaderboard" className="text-xs text-primary hover:underline flex items-center">
                        View Full Board <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center justify-between">
              Assigned Tasks <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              {studentData.tasks.solo.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                      <div>
                          <p className="font-semibold text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Solo Task: {task.status}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                  </div>
              ))}
              {studentData.tasks.group.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                      <div>
                          <p className="font-semibold text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Group Task: {task.status}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                  </div>
              ))}
              {studentData.tasks.assessment.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md bg-blue-50 border border-blue-200">
                      <div>
                          <p className="font-semibold text-sm text-blue-800">{task.title}</p>
                          <p className="text-xs text-blue-600">Assessment: {task.status}</p>
                      </div>
                      <Button size="sm">Take Assessment</Button>
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
