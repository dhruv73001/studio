import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type HeaderProps = {
    title: string;
    subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold font-headline">{title}</h1>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search students, tasks..." className="pl-10 bg-white" />
            </div>
        </header>
    )
}
