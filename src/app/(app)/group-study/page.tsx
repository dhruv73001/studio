
'use client';

import { useState } from 'react';
import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, PlusCircle, Video, Mic, ScreenShare, Hand, MessageSquare } from "lucide-react";
import { groupStudyData } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GroupStudyPage() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const room = activeRoom ? groupStudyData.find(r => r.id === activeRoom) : null;

  if (activeRoom && room) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header title={room.title} subtitle={room.subject} />
        <div className="flex-1 flex flex-col p-4 space-y-4">
          <Card className="flex-1">
            <CardContent className="p-2 h-full flex items-center justify-center bg-secondary rounded-lg">
              <div className="text-center text-muted-foreground">
                <Video className="w-16 h-16 mx-auto" />
                <p className="mt-2">Video call simulation</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-2">
            {room.participants.map(p => (
              <div key={p.name} className="bg-secondary p-2 rounded-lg flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={p.avatar} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{p.name}</p>
              </div>
            ))}
          </div>

        </div>
        <div className="bg-background border-t p-2 flex flex-col gap-2">
           <div className="flex justify-around">
            <Button variant="outline" size="icon"><Mic className="h-5 w-5" /></Button>
            <Button variant="outline" size="icon"><Video className="h-5 w-5" /></Button>
            <Button variant="outline" size="icon"><ScreenShare className="h-5 w-5" /></Button>
            <Button variant="outline" size="icon"><Hand className="h-5 w-5" /></Button>
            <Button variant="outline" size="icon"><MessageSquare className="h-5 w-5" /></Button>
          </div>
          <Button variant="destructive" onClick={() => setActiveRoom(null)}>Leave Room</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Group Study" subtitle="Join a study room or create your own" />
      <div className="p-4 space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full"><PlusCircle className="mr-2" /> Create New Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Study Room</DialogTitle>
                <DialogDescription>Fill out the details for your new study session.</DialogDescription>
            </DialogHeader>
            {/* Form would go here */}
             <DialogFooter>
                <Button>Create Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Available Rooms</h2>
          {groupStudyData.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>{room.title}</CardTitle>
                <CardDescription>{room.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {room.participants.map(p => (
                      <Avatar key={p.name} className="border-2 border-background">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button onClick={() => setActiveRoom(room.id)}>Join Room</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
