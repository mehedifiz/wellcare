import { Heart, Brain, Baby, Stethoscope, Eye, Bone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Stethoscope,
    title: "General Checkup",
    description:
      "Comprehensive health assessments to monitor and maintain your overall wellbeing.",
  },
  {
    icon: Heart,
    title: "Cardiology",
    description:
      "Expert heart care with advanced diagnostics and treatment options.",
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Specialized care for brain and nervous system disorders.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Dedicated healthcare for infants, children, and adolescents.",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Complete eye care from routine exams to surgical treatments.",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Treatment for bones, joints, and musculoskeletal conditions.",
  },
];

export default function HomeServices() {
  return (
    <section id="services" className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-medium text-emerald-600">
            Our Services
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We offer a wide range of medical services to meet all your
            healthcare needs with experienced professionals and modern
            facilities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group cursor-pointer border-border/50 bg-background transition-all hover:border-emerald-600/50 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
