import { Sidebar } from "@/components/Sidebar";
import { Chatbot } from "@/components/Chatbot";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 pl-64 transition-all duration-300">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Chatbot />
        </div>
    );
}
