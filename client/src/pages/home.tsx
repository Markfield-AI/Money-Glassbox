import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  TrendingUp,
  Target,
  BarChart3,
  Shield,
  Globe,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Full Transparency",
      description: "Track every dollar with real-time impact data and verified outcomes.",
    },
    {
      icon: BarChart3,
      title: "Measurable Impact",
      description: "See your social ROI with data-driven metrics aligned to UN SDGs.",
    },
    {
      icon: Target,
      title: "High-Impact WETFs",
      description: "Diversified investment vehicles focused on maximum social impact.",
    },
  ];

  const stats = [
    { value: "$12.5M", label: "Total Invested" },
    { value: "150+", label: "Charities Funded" },
    { value: "2.3M", label: "Lives Impacted" },
    { value: "4.2x", label: "Avg Social ROI" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6" variant="secondary" data-testid="badge-hero">
              Transparent Social Investment Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight" data-testid="text-hero-title">
              Invest in Change.
              <br />
              <span className="text-primary">Track Real Impact.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              Connect with high-impact charities through transparent, measurable social investments using WETFs aligned to UN Sustainable Development Goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <Button size="lg" className="gap-2" data-testid="button-explore">
                  Explore Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" data-testid="button-view-dashboard">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <p className="text-3xl md:text-4xl font-bold font-sans text-primary mb-2" data-testid="text-stat-value">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4" data-testid="text-features-title">
              Why Glass Box?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-description">
              Combining the professionalism of financial platforms with the heart of social impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover-elevate transition-all" data-testid={`card-feature-${index}`}>
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" data-testid="icon-feature" />
                </div>
                <h3 className="text-xl font-semibold font-serif mb-3" data-testid="text-feature-title">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-description">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" data-testid="icon-globe" />
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4" data-testid="text-cta-title">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg opacity-90 mb-8" data-testid="text-cta-description">
              Join thousands of social investors creating measurable change through transparent philanthropy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                data-testid="button-get-started-cta"
              >
                Get Started Today
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/transparency">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  data-testid="button-view-impact"
                >
                  View Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
