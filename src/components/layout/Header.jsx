/**
 * Header Component
 * Main navigation header with logo, menu, and CTA button
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Container } from '../ui';
import { NAV_ITEMS, BRAND } from '../../constants';
import { getIcon } from '../../utils';
import { fadeInDown, scaleIn, hoverScale } from '../../constants/animations';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const MenuIcon = getIcon('Menu');
  const XIcon = getIcon('X');

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      {...fadeInDown}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral shadow-sm"
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              {...hoverScale}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                {BRAND.name}
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item, index) => (
              <Link key={item.label} to={item.path}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  {...hoverScale}
                  className={`transition-colors font-medium ${
                    isActive(item.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            {...scaleIn}
            transition={{ ...scaleIn.transition, delay: 0.3 }}
            className="hidden md:block"
          >
            <Button variant="secondary" size="md">
              Join Waitlist
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen && XIcon ? (
              <XIcon size={24} />
            ) : MenuIcon ? (
              <MenuIcon size={24} />
            ) : null}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-neutral mt-4 pt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-colors font-medium py-2 ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="secondary" size="md" className="w-full">
                  Join Waitlist
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};

export default Header;

