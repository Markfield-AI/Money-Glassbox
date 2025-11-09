import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { WETFS } from "@/lib/seed";
import { TrendingUp, Users } from "lucide-react";

export default function Discover() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-discover-title">
            {copy.discoverTitle}
          </h1>
        </div>

        <div className="grid gap-6">
          {WETFS.map((wetf) => (
            <Card key={wetf.slug} className="hover-elevate transition-all" data-testid={`card-wetf-${wetf.slug}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{wetf.icon}</div>
                    <div>
                      <CardTitle className="text-xl" data-testid={`text-wetf-title-${wetf.slug}`}>
                        {wetf.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {wetf.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {wetf.sdgs.map((sdg) => (
                    <Badge key={sdg} variant="secondary">
                      {sdg}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Raised</div>
                    <div className="font-semibold flex items-center gap-1">
                      {wetf.raisedDisplay}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Lives Impacted</div>
                    <div className="font-semibold flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {wetf.livesImpactedDisplay}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Growth</div>
                    <div className="font-semibold flex items-center gap-1 text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      {wetf.growthDisplay}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/fund/${wetf.slug}`}>
                    <Button className="w-full" data-testid={`button-view-fund-${wetf.slug}`}>
                      View fund
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
