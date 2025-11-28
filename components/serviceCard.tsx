import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ServiceCardProps {
  name: string;
  type: string;
  color: string;
}

export default function ServiceCard({ name, type, color }: ServiceCardProps) {
  return (
    <Card className={`${color} shadow-lg rounded-xl`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm opacity-80">
          Professional {type.toLowerCase()} for your vehicle.
        </p>
      </CardContent>
    </Card>
  );
}
