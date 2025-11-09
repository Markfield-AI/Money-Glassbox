import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { Sparkles, CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -top-2 -right-2 animate-in zoom-in duration-700 delay-200">
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-success-title">
            {copy.successH1}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto" data-testid="text-success-subtitle">
            {copy.successP}
          </p>
        </div>

        <div className="pt-8 animate-in fade-in duration-500 delay-500">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6" data-testid="button-view-impact">
              View my impact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
