/**
 * Footer Component
 * Site footer with logo, copyright, and navigation links
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui';
import { FOOTER_LINKS, BRAND } from '../../constants';
import { fadeIn } from '../../constants/animations';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold text-primary">{BRAND.name}</h2>
          </motion.div>

          {/* Copyright */}
          <motion.p
            {...fadeIn}
            className="text-gray-600 text-center text-sm md:text-base"
          >
            {BRAND.copyright} {BRAND.tagline}
          </motion.p>

          {/* Footer Links */}
          <motion.nav
            {...fadeIn}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-gray-600 hover:text-primary transition-colors text-sm md:text-base"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

