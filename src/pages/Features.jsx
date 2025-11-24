/**
 * Features Page
 * Detailed view of all GyaanVriksh features
 */

import { Header, Footer } from '../components/layout';
import { Section, SectionTitle, FeatureCard } from '../components/templates';
import { FEATURES } from '../constants';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Section background="gradient" padding="py-32">
          <div className="text-center max-w-4xl mx-auto">
            <SectionTitle title={FEATURES.title} size="large" />
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Discover how GyaanVriksh helps you preserve and interact with your family's wisdom
            </p>
          </div>
        </Section>

        <Section background="white">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.items.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                iconName={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;

