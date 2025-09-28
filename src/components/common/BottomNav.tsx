
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Users, GraduationCap, User, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

export function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/student', icon: Home, label: 'Home' },
    { href: '/roadmaps', icon: BookOpen, label: 'Roadmaps' },
    { href: '/ai-roadmap', icon: Wand2, label: 'AI Plan' },
    { href: '/ai', icon: GraduationCap, label: 'GPT' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <nav className="max-w-md w-11/12 mx-auto">
        <div className="flex h-16 items-center justify-around bg-background/80 backdrop-blur-sm rounded-full border shadow-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-center gap-x-2 p-3 rounded-full text-muted-foreground transition-all duration-300 ease-in-out hover:text-primary',
                  isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" />
                <span className={cn(
                  "text-sm font-medium transition-all duration-300 ease-in-out",
                  isActive ? 'max-w-xs' : 'max-w-0 overflow-hidden'
                )}>
                  {isActive && item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
