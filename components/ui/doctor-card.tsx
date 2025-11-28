import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface DoctorCardProps {
  name: string;
  specialization: string;
  image: string;
}

export default function DoctorCard({
  name,
  specialization,
  image,
}: DoctorCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden border-border/50 bg-background transition-all duration-300 hover:border-emerald-600/50 hover:shadow-lg">
      <CardContent className="p-0">
        {/* Doctor Image */}
        <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Doctor Info */}
        <div className="p-4 text-center">
          <h3 className="mb-1 text-base font-semibold text-foreground sm:text-lg">
            {name}
          </h3>
          <p className="text-sm text-emerald-600">{specialization}</p>
        </div>
      </CardContent>
    </Card>
  );
}
