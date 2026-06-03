import NewHero from "@/components/NewHero";
import YearbookSection from "@/components/YearbookSection";
import NewFeatures from "@/components/NewFeatures";
import NewSocialProof from "@/components/NewSocialProof";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NewHero />
      <YearbookSection />
      <NewFeatures />
      <NewSocialProof />
      <WaitlistForm />
      <Footer />
    </main>
  );
}

// todo: predefined budget - then openly contributing to the goal
//       personal server discord like (maintained by Common Rooms)
//        best for clubs societies etc.
// keezaboard integrate