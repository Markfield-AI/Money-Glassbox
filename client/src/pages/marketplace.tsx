import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CharityCard } from "@/components/charity/charity-card";
import { WetfCard } from "@/components/wetf/wetf-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Charity, Wetf } from "@shared/schema";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSDG, setSelectedSDG] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const sdgCategories = [
    { id: "all", name: "All SDGs" },
    { id: "1", name: "No Poverty" },
    { id: "3", name: "Good Health" },
    { id: "4", name: "Quality Education" },
    { id: "6", name: "Clean Water" },
    { id: "13", name: "Climate Action" },
  ];

  const charitiesQueryString = new URLSearchParams({
    ...(searchQuery && { q: searchQuery }),
    ...(selectedSDG !== "all" && { sdg: selectedSDG }),
    ...(sortBy && { sort: sortBy }),
  }).toString();

  const wetfsQueryString = new URLSearchParams({
    ...(searchQuery && { q: searchQuery }),
    ...(selectedSDG !== "all" && { sdg: selectedSDG }),
    ...(sortBy && { sort: sortBy }),
  }).toString();

  const { data: charities, isLoading: charitiesLoading } = useQuery<Charity[]>({
    queryKey: [`/api/charities${charitiesQueryString ? `?${charitiesQueryString}` : ""}`],
  });

  const { data: wetfs, isLoading: wetfsLoading } = useQuery<Wetf[]>({
    queryKey: [`/api/wetfs${wetfsQueryString ? `?${wetfsQueryString}` : ""}`],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold font-serif mb-2" data-testid="text-marketplace-title">
            Charity Marketplace
          </h1>
          <p className="text-muted-foreground" data-testid="text-marketplace-subtitle">
            Discover high-impact charities and WETFs aligned to your values
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search charities and WETFs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
          <Select value={selectedSDG} onValueChange={setSelectedSDG}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-sdg">
              <SelectValue placeholder="SDG Category" />
            </SelectTrigger>
            <SelectContent>
              {sdgCategories.map((sdg) => (
                <SelectItem key={sdg.id} value={sdg.id} data-testid={`option-sdg-${sdg.id}`}>
                  {sdg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating" data-testid="option-sort-rating">Highest Rated</SelectItem>
              <SelectItem value="impact" data-testid="option-sort-impact">Impact Score</SelectItem>
              <SelectItem value="beneficiaries" data-testid="option-sort-beneficiaries">Most Beneficiaries</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="charities" className="w-full">
          <TabsList className="mb-8" data-testid="tabs-marketplace">
            <TabsTrigger value="charities" data-testid="tab-charities">
              Charities
            </TabsTrigger>
            <TabsTrigger value="wetfs" data-testid="tab-wetfs">
              WETFs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charities">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                {charitiesLoading ? "Loading..." : `Showing ${charities?.length || 0} charities`}
              </p>
            </div>
            {charitiesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : charities && charities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {charities.map((charity) => (
                  <CharityCard key={charity.id} charity={charity} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground" data-testid="text-no-charities">
                  No charities found. Try adjusting your search.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wetfs">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground" data-testid="text-wetfs-count">
                {wetfsLoading ? "Loading..." : `Showing ${wetfs?.length || 0} WETFs`}
              </p>
            </div>
            {wetfsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                  </div>
                ))}
              </div>
            ) : wetfs && wetfs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wetfs.map((wetf) => (
                  <WetfCard key={wetf.id} wetf={wetf} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground" data-testid="text-no-wetfs">
                  No WETFs found. Try adjusting your search.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
