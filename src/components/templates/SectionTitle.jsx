/**
 * Section Title Template Component
 * Consistent section heading with animations
 */

import { motion } from 'framer-motion';
import { scrollReveal } from '../../constants/animations';

const SectionTitle = ({
  title,
  className = '',
  align = 'center',
  size = 'large',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const sizeClasses = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-3xl md:text-5xl',
  };

  return (
    <motion.h2
      {...scrollReveal}
      className={`${sizeClasses[size]} font-bold text-gray-900 mb-8 md:mb-16 ${alignClasses[align]} ${className}`}
    >
      {title}
    </motion.h2>
  );
};

export default SectionTitle;



