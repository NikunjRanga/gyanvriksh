/**
 * Features Section Component
 * Displays all features in a grid layout using FeatureCard templates
 */

import { Section, SectionTitle, FeatureCard } from '../templates';
import { FEATURES } from '../../constants';

const Features = () => {
  return (
    <Section id="features" background="white">
      <SectionTitle title={FEATURES.title} />
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
  );
};

export default Features;

