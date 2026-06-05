import NewHero from "@/components/NewHero";
import NewFeatures from "@/components/NewFeatures";
import WhoKeepsThisAlive from "@/components/WhoKeepsThisAlive";
import NewSocialProof from "@/components/NewSocialProof";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NewHero />
      <NewFeatures />
      <WhoKeepsThisAlive />
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