import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  MapPin,
  Globe,
  Users,
  Target,
  TrendingUp,
  Award,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import type { Charity } from "@shared/schema";

export default function CharityDetail() {
  const [, params] = useRoute("/charity/:id");
  const charityId = params?.id;

  const { data: charity, isLoading } = useQuery<Charity>({
    queryKey: ["/api/charities", charityId],
    enabled: !!charityId,
  });

  const sdgs = charity?.sdgIds.split(",").map(Number) || [];

  const recentProjects = charity ? [
    { 
      name: "Community Development Program", 
      completion: 85, 
      funded: charity.beneficiaries * 0.34, 
      goal: charity.beneficiaries * 0.40 
    },
    { 
      name: "Infrastructure Project", 
      completion: 100, 
      funded: charity.beneficiaries * 0.24, 
      goal: charity.beneficiaries * 0.24 
    },
    { 
      name: "Educational Initiative", 
      completion: 60, 
      funded: charity.beneficiaries * 0.19, 
      goal: charity.beneficiaries * 0.32 
    },
  ] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="h-80 w-full" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!charity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Charity Not Found</h2>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-80 overflow-hidden">
        <img
          src={charity.imageUrl}
          alt={charity.name}
          className="w-full h-full object-cover"
          data-testid="img-charity-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="mb-4 gap-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold font-serif mb-2" data-testid="text-charity-name">
                    {charity.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4" data-testid="text-charity-description">
                    {charity.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span data-testid="text-location">{charity.location}</span>
                    </div>
                    {charity.website && (
                      <a
                        href={charity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                        data-testid="link-website"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950 px-4 py-2 rounded-lg">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" data-testid="icon-rating" />
                  <span className="text-2xl font-bold" data-testid="text-rating">{charity.overallRating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {sdgs.map((sdgId) => (
                  <Badge key={sdgId} variant="secondary" data-testid={`badge-sdg-${sdgId}`}>
                    SDG {sdgId}
                  </Badge>
                ))}
              </div>

              <div className="prose prose-sm max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-2" data-testid="text-mission-title">Our Mission</h3>
                <p className="text-muted-foreground" data-testid="text-mission">{charity.mission}</p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold font-serif mb-6" data-testid="text-scorecard-title">
                Impact Scorecard
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Impact Score</span>
                    <span className="text-xl font-bold text-primary" data-testid="text-impact-score">
                      {charity.impactScore}
                    </span>
                  </div>
                  <Progress value={Number(charity.impactScore) * 10} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Transparency</span>
                    <span className="text-xl font-bold text-primary" data-testid="text-transparency-score">
                      {charity.transparencyScore}
                    </span>
                  </div>
                  <Progress value={Number(charity.transparencyScore) * 10} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Efficiency</span>
                    <span className="text-xl font-bold text-primary" data-testid="text-efficiency-score">
                      {charity.efficiencyScore}
                    </span>
                  </div>
                  <Progress value={Number(charity.efficiencyScore) * 10} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold font-serif mb-6" data-testid="text-impact-story-title">
                Impact Story
              </h3>
              {charity.impactImageUrl && (
                <img
                  src={charity.impactImageUrl}
                  alt="Impact story"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  data-testid="img-impact-story"
                />
              )}
              <p className="text-muted-foreground leading-relaxed" data-testid="text-impact-story">
                {charity.impactStory}
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold font-serif mb-6" data-testid="text-projects-title">
                Active Projects
              </h3>
              <div className="space-y-6">
                {charity.recentProjects.map((project, index) => (
                  <div key={index} data-testid={`project-${index}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold" data-testid="text-project-name">{project.name}</h4>
                      <span className="text-sm text-muted-foreground" data-testid="text-project-completion">
                        {project.completion}% Complete
                      </span>
                    </div>
                    <Progress value={project.completion} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${project.funded.toLocaleString()} of ${project.goal.toLocaleString()}
                      </span>
                      <Button size="sm" variant="outline" data-testid={`button-support-${index}`}>
                        Support
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-key-metrics">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-beneficiaries">
                      {charity.beneficiaries.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Beneficiaries Reached</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Target className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-projects">
                      {charity.projectsCompleted}
                    </p>
                    <p className="text-xs text-muted-foreground">Projects Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-years">
                      {charity.yearsActive}
                    </p>
                    <p className="text-xs text-muted-foreground">Years Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-admin-cost">
                      {charity.adminCostPercentage}%
                    </p>
                    <p className="text-xs text-muted-foreground">Admin Costs</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-2">
                <Button className="w-full" data-testid="button-invest-now">
                  Invest Now
                </Button>
                <Button variant="outline" className="w-full" data-testid="button-add-watchlist">
                  Add to Watchlist
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
