import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { copy } from "@/lib/copy";
import { WETFS } from "@/lib/seed";
import { fakeInvest } from "@/lib/state";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function FundDetail() {
  const [, params] = useRoute("/fund/:slug");
  const [, setLocation] = useLocation();
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const wetf = WETFS.find(w => w.slug === params?.slug);

  if (!wetf) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="p-6">
          <p>Fund not found</p>
        </Card>
      </div>
    );
  }

  const presetAmounts = [25, 50, 100];

  const handleInvest = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      fakeInvest(wetf.slug, amount);
      setLocation("/success");
    }
  };

  const totalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{wetf.icon}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-fund-title">
              {wetf.title}
            </h1>
            <p className="text-muted-foreground mt-1">{wetf.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {wetf.sdgs.map((sdg) => (
            <Badge key={sdg} variant="secondary">
              {sdg}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mission" data-testid="tab-mission">Mission</TabsTrigger>
            <TabsTrigger value="impact" data-testid="tab-impact">Impact</TabsTrigger>
            <TabsTrigger value="vetting" data-testid="tab-vetting">Our Vetting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mission" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {wetf.mission}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="impact" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {wetf.impact}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vetting" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <div className="font-medium">Financial Health</div>
                      <div className="text-sm text-muted-foreground">75%+ program spend</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <div className="font-medium">Accountability</div>
                      <div className="text-sm text-muted-foreground">Independent board & public financials</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <div className="font-medium">Impact Tracking</div>
                      <div className="text-sm text-muted-foreground">Outcomes measured and reported</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              {copy.investPrompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  data-testid={`button-amount-${amount}`}
                >
                  £{amount}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="pl-7"
                  data-testid="input-custom-amount"
                />
              </div>
            </div>

            {totalAmount > 0 && (
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="text-sm text-muted-foreground">Total investment</div>
                <div className="text-2xl font-bold">£{totalAmount.toFixed(2)}</div>
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleInvest}
              disabled={totalAmount <= 0}
              data-testid="button-invest"
            >
              {copy.investCTA}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
