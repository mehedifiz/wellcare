"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-base-200 py-20">
      <div className="container mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Fast & Reliable <span className="text-primary">Car Service</span> At
            Your Doorstep
          </h1>
          <p className="mt-4 text-lg opacity-80">
            Book professional car servicing, repairs, and maintenance in just a
            few clicks. Easy scheduling, expert mechanics, and transparent
            pricing.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="btn btn-primary px-8">Book Now</button>
            <button className="btn btn-outline px-8">Learn More</button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.webp?s=1024x1024&w=is&k=20&c=f0IVSrcKAnOJVqeCaLM42WlcujZMl-HoraS9HNZgLvU="
            alt="Car Service"
            className="w-full max-w-md drop-shadow-xl rounded-xl"
            width={400}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}
