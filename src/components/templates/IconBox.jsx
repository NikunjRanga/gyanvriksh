/**
 * Icon Box Template Component
 * Reusable icon container with consistent styling
 */

import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconMapper';
import { hoverScale, scrollReveal } from '../../constants/animations';

const IconBox = ({
  iconName,
  title,
  description,
  variant = 'circle',
  iconColor = 'primary',
  iconBg = 'bg-green-100',
  className = '',
  delay = 0,
}) => {
  const Icon = getIcon(iconName);

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in iconMapper`);
    return null;
  }

  const variantClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const iconColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
  };

  const animationProps = {
    ...scrollReveal,
    transition: { ...scrollReveal.transition, delay },
  };

  return (
    <motion.div
      {...animationProps}
      className={`text-center ${className}`}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`${iconBg} ${variantClasses[variant]} w-20 h-20 flex items-center justify-center mx-auto mb-6`}
      >
        <Icon className={`w-10 h-10 ${iconColorClasses[iconColor]}`} />
      </motion.div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default IconBox;

