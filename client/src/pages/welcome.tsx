import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { CheckCircle2, Eye, TrendingUp, Shield, Users, Sparkles } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-1" data-testid="badge-demo">
            Demo Mode • Experience the Future of Impact Investing
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto" data-testid="text-tagline">
            {copy.tagline}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-value-prop">
            {copy.valueProp}
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sdg">
              <Button size="lg" className="text-lg px-8 py-6 min-w-[200px]" data-testid="button-get-started">
                Start investing
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 min-w-[200px]" asChild>
              <a href="#how-it-works" data-testid="link-learn-more">
                Learn how it works
              </a>
            </Button>
          </div>
        </section>

        {/* Problem Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">The problem with impact investing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional charities and impact funds ask for your trust—but give you little visibility into where your money goes or what it achieves.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-destructive/20">
              <CardContent className="pt-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg">Hidden impact</h3>
                <p className="text-sm text-muted-foreground">
                  You donate, but never know exactly how many lives you changed or what outcomes your money created.
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardContent className="pt-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg">Opaque vetting</h3>
                <p className="text-sm text-muted-foreground">
                  Which organizations are trustworthy? What criteria ensure your money is used effectively?
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardContent className="pt-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg">No tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Your impact over time is a mystery. There's no portfolio, no growth to monitor, no compounding change.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Solution Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">Introducing Glass Box</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Total transparency, measurable impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make every pound traceable. Every outcome visible. Every fund vetted. This is what impact investing should be.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Glass Box Vetting</h3>
                <p className="text-sm text-muted-foreground">
                  Every fund passes rigorous criteria: 75%+ program spend, independent governance, and verified impact tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Live impact metrics</h3>
                <p className="text-sm text-muted-foreground">
                  Track meals provided, classrooms built, wells funded—all translated from your investments in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Your impact dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  A beautiful portfolio view showing your total impact, SDG alignment, and the real-world changes you've created.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="bg-accent/5 rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">Join the transparent investing movement</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-2" data-testid="stat-raised">
                <div className="text-4xl md:text-5xl font-bold text-primary">£9.8M</div>
                <div className="text-sm text-muted-foreground">Total raised across funds</div>
              </div>
              <div className="space-y-2" data-testid="stat-lives">
                <div className="text-4xl md:text-5xl font-bold text-primary">525K+</div>
                <div className="text-sm text-muted-foreground">Lives impacted</div>
              </div>
              <div className="space-y-2" data-testid="stat-funds">
                <div className="text-4xl md:text-5xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Vetted impact funds</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transparent impact investing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            <div className="relative">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Choose your impact focus</h3>
                      <p className="text-sm text-muted-foreground">
                        Select UN Sustainable Development Goals that matter to you—from clean water to quality education to climate action.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Browse vetted funds</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore Glass Box verified impact funds. See their mission, track record, and transparent vetting criteria.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Track real impact</h3>
                      <p className="text-sm text-muted-foreground">
                        Watch your investment dashboard grow. See meals provided, classrooms built, lives changed—all in real-time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Example */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">Your £50 could provide...</h2>
              <p className="text-muted-foreground">Real impact, clearly measured</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 space-y-2 text-center">
                  <div className="text-3xl font-bold text-primary" data-testid="text-example-meals">200</div>
                  <div className="text-sm font-medium">Nutritious meals</div>
                  <div className="text-xs text-muted-foreground">for families in need</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 space-y-2 text-center">
                  <div className="text-3xl font-bold text-primary">20</div>
                  <div className="text-sm font-medium">Days of clean water</div>
                  <div className="text-xs text-muted-foreground">for a community</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 space-y-2 text-center">
                  <div className="text-3xl font-bold text-primary">5</div>
                  <div className="text-sm font-medium">School supplies</div>
                  <div className="text-xs text-muted-foreground">for students</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-6 py-12">
          <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto">
            Ready to see your impact, clearly?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your transparent investing journey today. No hidden fees. No mystery. Just measurable change.
          </p>
          <div className="pt-4">
            <Link href="/sdg">
              <Button size="lg" className="text-lg px-10 py-6" data-testid="button-cta-bottom">
                <Users className="w-5 h-5 mr-2" />
                Begin your impact journey
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Demo mode • Explore the platform with no real transactions
          </p>
        </section>
      </div>
    </div>
  );
}
