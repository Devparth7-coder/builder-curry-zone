import { Card, CardContent } from "./card";

export interface Scheme { id: number; name: string; description: string; eligibility: string; link: string }

export default function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardContent className="space-y-2 p-5">
        <h3 className="text-lg font-semibold">{scheme.name}</h3>
        <p className="text-sm text-muted-foreground">{scheme.description}</p>
        <p className="text-sm">Eligibility: <span className="text-muted-foreground">{scheme.eligibility}</span></p>
        <a href={scheme.link} className="text-sm font-medium text-primary hover:underline">Apply now</a>
      </CardContent>
    </Card>
  );
}
