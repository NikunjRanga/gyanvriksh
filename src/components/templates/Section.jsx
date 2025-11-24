/**
 * Section Template Component
 * Reusable section wrapper with consistent spacing and animations
 */

import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { scrollReveal } from '../../constants/animations';

const Section = ({
  id,
  children,
  className = '',
  background = 'white',
  padding = 'py-20 md:py-32',
  containerClassName = '',
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    neutral: 'bg-neutral-light',
    gradient: 'bg-gradient-to-b from-neutral-light to-white',
    primary: 'bg-gradient-to-br from-primary to-primary-dark',
  };

  return (
    <section
      id={id}
      className={`${padding} ${backgroundClasses[background]} ${className}`}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};

export default Section;

