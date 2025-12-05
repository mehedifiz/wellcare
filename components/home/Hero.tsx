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
            src="https://www.carbarn.com.bd/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-v2.14801357.webp&w=480&q=50"
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
