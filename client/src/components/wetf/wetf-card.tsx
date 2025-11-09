import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "wouter";
import type { Wetf } from "@shared/schema";

interface WetfCardProps {
  wetf: Wetf;
}

export function WetfCard({ wetf }: WetfCardProps) {
  const ytdReturn = Number(wetf.yearToDateReturn);
  const isPositive = ytdReturn >= 0;

  return (
    <Card className="p-6 hover-elevate transition-all" data-testid={`card-wetf-${wetf.id}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg font-serif" data-testid="text-wetf-name">{wetf.name}</h3>
            <Badge variant="outline" className="text-xs font-mono" data-testid="badge-wetf-code">
              {wetf.code}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1" data-testid="text-wetf-description">
            {wetf.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
          <p className="text-xl font-bold font-sans" data-testid="text-wetf-value">
            ${Number(wetf.currentValue).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">YTD Return</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-success" data-testid="icon-trending-up" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" data-testid="icon-trending-down" />
            )}
            <p
              className={`text-xl font-bold font-sans ${isPositive ? "text-success" : "text-destructive"}`}
              data-testid="text-wetf-return"
            >
              {isPositive ? "+" : ""}{ytdReturn.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Impact Score</p>
          <p className="text-sm font-semibold" data-testid="text-wetf-impact">
            {Number(wetf.impactScore).toFixed(1)}/10
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Social ROI</p>
          <p className="text-sm font-semibold text-success" data-testid="text-wetf-social-roi">
            {Number(wetf.socialRoi).toFixed(1)}x
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/wetf/${wetf.id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm" data-testid="button-view-wetf">
            View Details
          </Button>
        </Link>
        <Button className="flex-1" size="sm" data-testid="button-invest">
          Invest
        </Button>
      </div>
    </Card>
  );
}
