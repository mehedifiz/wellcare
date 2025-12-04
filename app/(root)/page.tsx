import AboutSection from "@/components/home/AboutSection";
import ContactForm from "@/components/home/Contract";
import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/Homeservices";
import HowToBook from "@/components/home/Howto";

export default function Home() {
  return (
    <div className=" ">
      <main className="">
        <Hero />

        <HomeServices />

        <HowToBook />

        <AboutSection />
        <ContactForm />
      </main>
    </div>
  );
}
