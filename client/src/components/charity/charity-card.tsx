import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users } from "lucide-react";
import { Link } from "wouter";
import type { Charity } from "@shared/schema";

interface CharityCardProps {
  charity: Charity;
}

export function CharityCard({ charity }: CharityCardProps) {
  const sdgIds = charity.sdgIds.split(",").map(Number);
  const rating = Number(charity.overallRating);

  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-charity-${charity.id}`}>
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={charity.imageUrl}
          alt={charity.name}
          className="w-full h-full object-cover"
          data-testid="img-charity"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-lg font-serif line-clamp-1" data-testid="text-charity-name">
            {charity.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" data-testid="icon-star" />
            <span className="text-sm font-semibold" data-testid="text-charity-rating">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" data-testid="icon-location" />
          <span data-testid="text-charity-location">{charity.location}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4" data-testid="text-charity-description">
          {charity.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {sdgIds.slice(0, 3).map((sdgId) => (
            <Badge key={sdgId} variant="secondary" className="text-xs" data-testid={`badge-sdg-${sdgId}`}>
              SDG {sdgId}
            </Badge>
          ))}
          {sdgIds.length > 3 && (
            <Badge variant="outline" className="text-xs" data-testid="badge-sdg-more">
              +{sdgIds.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" data-testid="icon-beneficiaries" />
            <span className="font-medium" data-testid="text-beneficiaries">
              {charity.beneficiaries.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-xs">helped</span>
          </div>
          <Link href={`/charity/${charity.id}`}>
            <Button size="sm" data-testid="button-view-charity">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
