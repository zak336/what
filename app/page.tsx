import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import Features from "@/components/Features";
import WaitlistForm from "@/components/WaitlistForm";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhySection />
      <Features />
      <SocialProof />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
