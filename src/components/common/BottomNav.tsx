'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Bot, Calendar, User, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();
  const role = pathname.split('/')[1] || 'student';
  
  const homePath = `/${role}`;

  const navItems = [
    { href: homePath, icon: Home, label: 'Home' },
    { href: '/tasks', icon: ClipboardList, label: 'Tasks' },
    { href: '/ai', icon: GraduationCap, label: 'GPT' },
    { href: '/calendar', icon: Calendar, label: 'Calendar' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm max-w-md mx-auto">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = (item.label === 'Home' && pathname === item.href) || (item.label !== 'Home' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 w-16 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
