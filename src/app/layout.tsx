import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'ClassVerse',
  description: 'Your smart educational partner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-muted/40`}>
        <div className="relative mx-auto min-h-screen max-w-md border-x bg-background shadow-lg">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
