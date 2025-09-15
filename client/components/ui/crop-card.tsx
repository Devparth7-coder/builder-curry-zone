import { Card, CardContent } from "./card";

export interface Crop {
  id: number;
  name: string;
  season: string;
  yield: string;
  image: string;
}

export default function CropCard({ crop }: { crop: Crop }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <img
        src={crop.image}
        alt={crop.name}
        className="h-40 w-full object-cover"
      />
      <CardContent className="space-y-2 p-4">
        <h3 className="text-lg font-semibold">{crop.name}</h3>
        <p className="text-sm text-muted-foreground">Season: {crop.season}</p>
        <p className="text-sm text-muted-foreground">
          Expected yield: {crop.yield}
        </p>
        <button className="text-sm font-medium text-primary hover:underline">
          View details
        </button>
      </CardContent>
    </Card>
  );
}
