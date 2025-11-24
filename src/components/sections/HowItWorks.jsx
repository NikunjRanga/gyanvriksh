/**
 * How It Works Section Component
 * Displays the three-step process using IconBox templates
 */

import { Section, SectionTitle, IconBox } from '../templates';
import { HOW_IT_WORKS } from '../../constants';

const HowItWorks = () => {
  return (
    <Section background="neutral">
      <SectionTitle title={HOW_IT_WORKS.title} />
      <div className="grid md:grid-cols-3 gap-8">
        {HOW_IT_WORKS.steps.map((step, index) => (
          <IconBox
            key={step.title}
            iconName={step.icon}
            title={step.title}
            description={step.description}
            variant="circle"
            delay={index * 0.2}
          />
        ))}
      </div>
    </Section>
  );
};

export default HowItWorks;

