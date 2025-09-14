import { Header } from "@/components/common/Header";
import { AIChatInterface } from "@/components/common/AIChatInterface";

export default function AIPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Student GPT" subtitle="Your AI-powered study partner" />
      <AIChatInterface />
    </div>
  );
}
