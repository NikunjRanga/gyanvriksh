/**
 * Problem Statement Section Component
 * Two-column layout with text content and image placeholder
 */

import { motion } from 'framer-motion';
import { Section } from '../templates';
import { Container } from '../ui';
import { PROBLEM_STATEMENT } from '../../constants';
import { scrollReveal } from '../../constants/animations';

const ProblemStatement = () => {
  return (
    <Section id="about" background="white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {PROBLEM_STATEMENT.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {PROBLEM_STATEMENT.description}
          </p>
        </motion.div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-secondary-light via-secondary to-primary-dark flex items-center justify-center">
              <div className="text-center text-white p-8">
                <svg
                  className="w-32 h-32 mx-auto mb-4 opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <p className="text-lg font-medium">Family Tree Image</p>
                <p className="text-sm opacity-75 mt-2">Placeholder for serene landscape with family under tree</p>
              </div>
            </div>
          </motion.div>
        </div>
    </Section>
  );
};

export default ProblemStatement;

