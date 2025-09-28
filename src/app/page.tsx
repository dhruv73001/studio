import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <GraduationCap className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-primary">ClassVerse</h1>
        <p className="text-muted-foreground">Your smart educational partner.</p>
      </div>
      <div className="mt-12 flex w-full max-w-xs flex-col space-y-4">
        <Button asChild size="lg" className="py-6 text-lg rounded-full">
          <Link href="/student">I am a Student</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="py-6 text-lg rounded-full">
          <Link href="/teacher">I am a Teacher</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="py-6 text-lg rounded-full">
          <Link href="/parent">I am a Parent</Link>
        </Button>
      </div>
    </main>
  );
}
