import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import EaasFlow from "@/components/eaas-flow"
import PartnersGrid from "@/components/partners-grid"
import SecuritySection from "@/components/security-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background">
      <Navigation />
      <Hero />
      <EaasFlow />
      <PartnersGrid />
      <SecuritySection />
      <Footer />
    </main>
  )
}
