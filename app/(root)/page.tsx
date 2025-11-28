import AboutSection from "@/components/home/AboutSection";
import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/Homeservices";
import HowToBook from "@/components/home/Howto";

export default function Home() {
  return (
    <div className=" ">
      <main className="">
        <Hero/>

        <HomeServices/>

        <HowToBook/>

        <AboutSection/>


        


      </main>
    </div>
  );
}
