import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, TrendingUp } from "lucide-react";

interface ServiceCardProps {
  title: string;
  price: number;
  duration: string;
  totalBookings: number;
  rank: number;
}

export function ServiceCard({
  title,
  price,
  duration,
  totalBookings,
  rank,
}: ServiceCardProps) {
  return (
    <Card className="group border-border bg-card transition-all hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </p>
            <Badge variant="secondary" className="text-xs">
              #{rank} Top Service
            </Badge>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
            {rank}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 text-success" />
          <span className="text-foreground font-medium">${price}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-chart-2" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>
            <span className="text-foreground font-medium">{totalBookings}</span>{" "}
            bookings
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
