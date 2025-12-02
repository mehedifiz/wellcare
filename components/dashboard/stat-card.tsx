import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
    destructive: "bg-destructive/10 border-destructive/20",
  };

  const iconVariantStyles = {
    default: "bg-secondary text-foreground",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    destructive: "bg-destructive/20 text-destructive",
  };

  const valueVariantStyles = {
    default: "text-foreground",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
  };

  return (
    <Card
      className={cn(
        "border transition-all hover:border-primary/30",
        variantStyles[variant]
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p
              className={cn(
                "text-3xl font-semibold tracking-tight",
                valueVariantStyles[variant]
              )}
            >
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from
                last month
              </p>
            )}
          </div>
          <div className={cn("rounded-lg p-2.5", iconVariantStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
