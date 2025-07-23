import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Benefits from "@/components/Benefits";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CTA />
      <Services />
      <Process />
      <Benefits />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
