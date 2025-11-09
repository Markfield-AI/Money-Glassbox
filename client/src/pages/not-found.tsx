import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold font-serif text-primary mb-4" data-testid="text-404">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4" data-testid="text-not-found-title">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8" data-testid="text-not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="gap-2" data-testid="button-go-home">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
