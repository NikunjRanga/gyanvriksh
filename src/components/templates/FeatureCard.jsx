/**
 * Feature Card Template Component
 * Reusable feature card with icon, title, and description
 */

import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconMapper';
import { scrollReveal, hoverScale } from '../../constants/animations';

const FeatureCard = ({
  iconName,
  title,
  description,
  className = '',
  delay = 0,
}) => {
  const Icon = getIcon(iconName);

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in iconMapper`);
    return null;
  }

  const animationProps = {
    ...scrollReveal,
    transition: { ...scrollReveal.transition, delay },
  };

  return (
    <motion.div
      {...animationProps}
      {...hoverScale}
      className={`bg-neutral-light p-6 rounded-xl hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;

