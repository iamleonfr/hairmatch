
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import BarberShowcase from '@/components/home/BarberShowcase';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import PricingPlans from '@/components/home/PricingPlans';
import PremiumSection from '@/components/home/PremiumSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <PricingPlans />
        <PremiumSection />
        <BarberShowcase />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
