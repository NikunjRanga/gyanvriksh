/**
 * Join Waitlist Section Component
 * CTA section with gradient background
 */

import { motion } from 'framer-motion';
import { Section } from '../templates';
import { Button } from '../ui';
import { JOIN_WAITLIST } from '../../constants';
import { scrollReveal, hoverScale } from '../../constants/animations';

const JoinWaitlist = () => {
  return (
    <Section background="primary" className="text-white">
      <motion.div
        {...scrollReveal}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {JOIN_WAITLIST.title}
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
          {JOIN_WAITLIST.subtitle}
        </p>
        <motion.div {...hoverScale}>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-neutral-light shadow-lg"
          >
            {JOIN_WAITLIST.ctaText}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default JoinWaitlist;

