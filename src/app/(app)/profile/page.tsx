import { Header } from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <Header title="Profile" subtitle="Manage your account settings" />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="pt-6 flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://picsum.photos/seed/user/200" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-bold">User Name</p>
              <p className="text-sm text-muted-foreground">user.role@classverse.edu</p>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="text-base font-medium">Account</CardTitle></CardHeader>
            <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
            </CardContent>
        </Card>
        
        <Button asChild variant="destructive" className="w-full">
            <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Link>
        </Button>
      </div>
    </div>
  );
}
