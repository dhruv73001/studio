
'use client';

import { useState } from 'react';
import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { leaderboardData } from "@/lib/data";
import { Crown, Medal, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [subjectFilter, setSubjectFilter] = useState('overall');
  
  const rankColors: { [key: number]: string } = {
    1: "border-yellow-400 bg-yellow-50",
    2: "border-gray-400 bg-gray-50",
    3: "border-amber-600 bg-amber-50",
  };

  const rankIcons: { [key: number]: React.ReactNode } = {
    1: <Crown className="h-6 w-6 text-yellow-500" />,
    2: <Medal className="h-6 w-6 text-gray-500" />,
    3: <Star className="h-6 w-6 text-amber-600" />,
  };

  return (
    <div>
      <Header title="Leaderboard" subtitle="See who's at the top of the class" />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="pt-6 flex gap-2">
             <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
              </SelectContent>
            </Select>
             <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {leaderboardData.map((student) => (
            <Card key={student.rank} className={`border-2 ${rankColors[student.rank] || 'border-transparent'}`}>
              <CardContent className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="font-bold text-lg w-6 text-center">{student.rank}</div>
                    <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{student.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {student.badges.map((badge, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{badge}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="font-bold text-primary text-lg">{student.points} pts</div>
                    {rankIcons[student.rank]}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
