/**
 * Hero Section Component
 * Main hero section with title, subtitle, and CTA buttons
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Button } from '../ui';
import { HERO_CONTENT } from '../../constants';
import { fadeInUp } from '../../constants/animations';

const Hero = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-neutral-light to-white">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight text-balance"
          >
            {HERO_CONTENT.title}
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                {HERO_CONTENT.ctaPrimary}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                {HERO_CONTENT.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

