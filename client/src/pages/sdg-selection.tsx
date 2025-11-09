import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { SDGS } from "@/lib/seed";
import { buildImpactProfile, loadState } from "@/lib/state";
import { ImpactRadarChart } from "@/components/charts/radar-chart";
import { Check } from "lucide-react";

export default function SDGSelection() {
  const [, setLocation] = useLocation();
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([]);
  const [showRadar, setShowRadar] = useState(false);

  useEffect(() => {
    const state = loadState();
    if (state.selectedSDGs.length > 0) {
      setSelectedSDGs(state.selectedSDGs);
    }
  }, []);

  const toggleSDG = (sdgName: string) => {
    setSelectedSDGs(prev => 
      prev.includes(sdgName)
        ? prev.filter(s => s !== sdgName)
        : [...prev, sdgName]
    );
  };

  const handleBuildProfile = () => {
    buildImpactProfile(selectedSDGs);
    setShowRadar(true);
  };

  const handleContinue = () => {
    setLocation("/discover");
  };

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-sdg-title">
            {copy.sdgTitle}
          </h1>
          <p className="text-muted-foreground" data-testid="text-sdg-subtitle">
            {copy.sdgSub}
          </p>
        </div>

        {selectedSDGs.length > 0 && (
          <div className="text-sm font-medium" data-testid="text-selected-count">
            You've selected {selectedSDGs.length} area{selectedSDGs.length !== 1 ? 's' : ''}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SDGS.map((sdg) => {
            const isSelected = selectedSDGs.includes(sdg.name);
            return (
              <Card
                key={sdg.id}
                className={`p-4 cursor-pointer hover-elevate transition-all ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleSDG(sdg.name)}
                data-testid={`card-sdg-${sdg.id}`}
              >
                <div className="space-y-2">
                  <div className="text-4xl">{sdg.icon}</div>
                  <div className="text-sm font-medium leading-tight min-h-[2.5rem]">{sdg.name}</div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <Check className="w-4 h-4" />
                      <span>Selected</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {!showRadar && selectedSDGs.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={handleBuildProfile}
              data-testid="button-build-profile"
            >
              Build my Impact Profile
            </Button>
          </div>
        )}

        {showRadar && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">Your Impact Profile</h2>
              <ImpactRadarChart 
                data={buildImpactProfile(selectedSDGs).impactProfile}
                labels={SDGS.map(sdg => sdg.name)}
              />
            </Card>
            
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleContinue}
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
