import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
  bookingStats: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
}

export function UserCard({ name, email,  bookingStats }: UserCardProps) {
   

  return (
    <Card className="group border-border bg-card transition-all hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
         
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-lg font-semibold">
                {bookingStats.completed}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Done
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-warning">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-lg font-semibold">
                {bookingStats.pending}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Pending
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-destructive">
              <XCircle className="h-3.5 w-3.5" />
              <span className="text-lg font-semibold">
                {bookingStats.cancelled}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Cancelled
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
