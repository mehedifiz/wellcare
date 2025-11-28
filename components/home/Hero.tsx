"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const slides = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=1200&auto=format&fit=crop&q=80",
    title: "Advanced Medical Services",
    description: "Access cutting-edge technology for your health needs.",
    buttonText: "Explore Services",
    buttonHref: "#Speciality",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80",
    title: "Book Appointments Easily",
    description: "Browse our list of trusted doctors and schedule with ease.",
    buttonText: "Book Now",
    buttonHref: "#speciality",
    buttonClass: "bg-sky-600 hover:bg-sky-700",
  },
  {
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&auto=format&fit=crop&q=80",
    title: "Exceptional Healthcare",
    description: "Delivering trusted care with a compassionate approach.",
    buttonText: "Learn More",
    buttonHref: "#speciality",
    buttonClass: "bg-teal-600 hover:bg-teal-700",
  },
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[80vh] w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center text-white">
                  <h1 className="mb-2 text-2xl font-bold text-balance md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mb-6 max-w-xl text-sm text-white/90 md:text-base lg:text-lg">
                    {slide.description}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className={`rounded-full text-white ${slide.buttonClass}`}
                  >
                    <a href={slide.buttonHref}>{slide.buttonText}</a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
