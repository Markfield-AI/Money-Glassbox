import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight" data-testid="text-tagline">
            {copy.tagline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto" data-testid="text-value-prop">
            {copy.valueProp}
          </p>
        </div>
        
        <div className="pt-8">
          <Link href="/sdg">
            <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-started">
              Get started
            </Button>
          </Link>
        </div>
        
        <div className="pt-12 text-sm text-muted-foreground">
          Demo mode • No real transactions
        </div>
      </div>
    </div>
  );
}
