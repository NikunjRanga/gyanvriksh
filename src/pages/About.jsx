/**
 * About Page
 * Information about GyaanVriksh and its mission
 */

import { Header, Footer } from '../components/layout';
import { Section, SectionTitle } from '../components/templates';
import { Container } from '../components/ui';
import { BRAND } from '../constants';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Section background="gradient" padding="py-32">
          <div className="text-center max-w-4xl mx-auto">
            <SectionTitle title="About GyaanVriksh" size="large" />
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {BRAND.tagline}
            </p>
          </div>
        </Section>

        <Section background="white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                GyaanVriksh is dedicated to preserving the invaluable wisdom, stories, and knowledge
                of our elders. We believe that every family holds a treasure trove of experiences,
                traditions, and life lessons that should be preserved for future generations.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                The Problem
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                In India and around the world, countless stories of wisdom are being lost as time
                passes. Traditional knowledge, cultural practices, and personal experiences fade away
                with each generation. GyaanVriksh provides a platform to capture, preserve, and
                share these precious narratives.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Solution
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through advanced AI technology and intuitive design, GyaanVriksh helps families
                record, organize, and interact with their generational knowledge. We transform
                stories into structured learning experiences, creating a living digital tree of
                family wisdom.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default About;



