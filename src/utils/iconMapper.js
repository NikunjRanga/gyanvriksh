/**
 * Icon Mapper Utility
 * Maps icon names to Lucide React icons for dynamic rendering
 */

import {
  Mic,
  TreePine,
  BookOpen,
  Radio,
  Network,
  Lightbulb,
  GitBranch,
  Bot,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';

const iconMap = {
  Mic,
  TreePine,
  BookOpen,
  Radio,
  Network,
  Lightbulb,
  GitBranch,
  Bot,
  GraduationCap,
  Menu,
  X,
};

/**
 * Get icon component by name
 * @param {string} iconName - Name of the icon
 * @returns {React.Component} Icon component
 */
export const getIcon = (iconName) => {
  return iconMap[iconName] || null;
};

export default iconMap;



