
'use client';

import { useState } from 'react';
import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { calendarData, type CalendarEvent } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, isSameDay } from 'date-fns';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date
    ? calendarData.events.filter(event => isSameDay(new Date(event.startDate), date))
    : [];
  
  const eventTypeColors: { [key: string]: string } = {
    Quiz: 'bg-red-100 text-red-800 border-red-200',
    Assignment: 'bg-blue-100 text-blue-800 border-blue-200',
    Event: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Holiday: 'bg-green-100 text-green-800 border-green-200',
    Class: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };

  const DayWithEventIndicator = (day: Date) => {
    const hasEvent = calendarData.events.some(event => isSameDay(new Date(event.startDate), day));
    return (
      <div className="relative">
        {format(day, 'd')}
        {hasEvent && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></div>}
      </div>
    );
  };

  return (
    <div>
      <Header title="Calendar" subtitle="View upcoming events and schedules" />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-0">
             <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
              components={{
                DayContent: ({ date }) => DayWithEventIndicator(date),
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Events for {date ? format(date, 'MMMM do, yyyy') : 'selected date'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                  <div className="flex flex-col items-center justify-center w-12">
                     <span className="text-sm text-muted-foreground">{event.time.split(' ')[1]}</span>
                     <span className="font-bold text-lg">{event.time.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                   <Badge className={cn(eventTypeColors[event.type] || 'bg-gray-100 text-gray-800')}>{event.type}</Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No events scheduled for this day.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
