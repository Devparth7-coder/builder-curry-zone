import { Badge } from "./badge";
import { Card, CardContent } from "./card";

export interface Disease { id: number; name: string; crop: string; image: string; severity: "Low" | "Medium" | "High" }

export default function DiseaseCard({ disease }: { disease: Disease }) {
  const severityVariant = disease.severity === "High" ? "destructive" : disease.severity === "Medium" ? "secondary" : "default" as const;
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <img src={disease.image} alt={disease.name} className="h-40 w-full object-cover" />
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{disease.name}</h3>
          <Badge variant={severityVariant}>{disease.severity}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Crop: {disease.crop}</p>
        <button className="text-sm font-medium text-primary hover:underline">View treatment</button>
      </CardContent>
    </Card>
  );
}
