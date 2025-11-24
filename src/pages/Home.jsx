/**
 * Home Page
 * Landing page with all main sections
 */

import { Header, Footer } from '../components/layout';
import Hero from '../components/sections/Hero';
import ProblemStatement from '../components/sections/ProblemStatement';
import HowItWorks from '../components/sections/HowItWorks';
import Features from '../components/sections/Features';
import JoinWaitlist from '../components/sections/JoinWaitlist';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProblemStatement />
        <HowItWorks />
        <Features />
        <JoinWaitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

