
'use client'

import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teacherData, curriculumRoadmap } from "@/lib/data";
import { BarChart2, CalendarClock, Camera, UserCheck, PlusCircle, Send, Check, X, ArrowRight, BarChart, AlertTriangle, Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bar, XAxis, YAxis, ResponsiveContainer, BarChart as RechartsBarChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export default function TeacherDashboard() {
  const statusColors = {
    completed: "bg-accent text-accent-foreground",
    "in-progress": "bg-blue-500/20 text-blue-700",
    upcoming: "bg-secondary text-secondary-foreground",
  };
  
  const chartConfig = {
    value: { label: "Value", color: "hsl(var(--primary))" },
    goal: { label: "Goal", color: "hsl(var(--secondary))" },
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Teacher Dashboard" subtitle={`Welcome, ${teacherData.name}!`} />
      <div className="flex-1 space-y-4 p-4">

        <div className="grid grid-cols-3 gap-4 text-center">
            <Card>
                <CardContent className="p-3">
                    <p className="text-2xl font-bold">{teacherData.attendance}%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-3">
                    <p className="text-2xl font-bold">{teacherData.assignmentsDue}</p>
                    <p className="text-xs text-muted-foreground">Tasks Due</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-3">
                    <p className="text-2xl font-bold">{teacherData.upcomingEvents}</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center justify-between">
              Student Insights: {teacherData.smartInsights.studentName}
              <Lightbulb className="h-5 w-5 text-yellow-500" />
            </CardTitle>
            <CardDescription>{teacherData.smartInsights.week}</CardDescription>
          </CardHeader>
          <CardContent>
            {teacherData.smartInsights.riskAlert && (
              <div className="flex items-center gap-2 text-sm text-destructive border border-destructive/20 bg-destructive/5 p-2 rounded-md mb-4">
                <AlertTriangle className="h-4 w-4" />
                <p>Early warning for potential performance dip.</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-4 italic">
              "{teacherData.smartInsights.aiSummary}"
            </p>
            <div className="h-[120px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <RechartsBarChart
                    accessibilityLayer
                    data={teacherData.smartInsights.data}
                    layout="vertical"
                    margin={{ left: 10, right: 10 }}
                >
                    <XAxis type="number" dataKey="value" hide />
                    <YAxis
                      type="category"
                      dataKey="metric"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      width={80}
                      className="text-xs"
                    />
                    <RechartsBarChart.background>
                      <rect className="fill-secondary" rx={4} ry={4} />
                    </RechartsBarChart.background>
                    <Bar dataKey="value" className="fill-primary" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">Attendance System</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full"><Camera className="mr-2 h-4 w-4" /> Mark Attendance</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Facial Recognition Scan</DialogTitle>
                      <DialogDescription>Simulating camera for attendance marking.</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center h-48 bg-secondary rounded-md my-4">
                      <Camera className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <DialogFooter>
                      <Button variant="secondary">Skip</Button>
                      <Button>Scan</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full"><UserCheck className="mr-2 h-4 w-4" /> View Records</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="text-base font-medium">Task Management</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Create Task</Button>
                <Button variant="outline"><CalendarClock className="mr-2 h-4 w-4" /> Schedule</Button>
                <Button variant="outline" className="col-span-2"><Send className="mr-2 h-4 w-4" /> Send Message</Button>
            </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Curriculum Roadmap</CardTitle>
            <Link href="/roadmap" className="text-sm text-primary flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              {curriculumRoadmap.slice(0, 5).map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className={cn("w-full h-2 rounded-full", statusColors[item.status as keyof typeof statusColors])}></div>
                  <p className="text-xs mt-1">{item.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Leave Requests ({teacherData.leaveRequests.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {teacherData.leaveRequests.map((req, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                  <div>
                      <p className="font-semibold text-sm">{req.student}</p>
                      <p className="text-xs text-muted-foreground">{req.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-red-100 text-red-600 hover:bg-red-200"><X className="h-4 w-4"/></Button>
                    <Button size="icon" className="h-8 w-8 bg-green-100 text-green-600 hover:bg-green-200"><Check className="h-4 w-4"/></Button>
                  </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
