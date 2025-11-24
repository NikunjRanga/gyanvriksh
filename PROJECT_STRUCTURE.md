# GyaanVriksh - Project Structure

## 📁 Directory Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── sections/       # Page sections (Hero, Features, etc.)
│   ├── templates/      # Reusable template components
│   └── ui/             # Base UI components (Button, Container)
├── constants/          # Configuration and static data
│   ├── animations.js   # Framer Motion animation variants
│   ├── content.js      # All static content/text
│   └── navigation.js   # Navigation items and links
├── utils/              # Utility functions
│   └── iconMapper.js   # Icon name to component mapper
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Component Architecture

### Template Components (`components/templates/`)
Reusable components that follow consistent patterns:

- **Section**: Wrapper for page sections with consistent spacing
- **SectionTitle**: Standardized section headings
- **IconBox**: Icon + title + description layout
- **FeatureCard**: Feature display card with icon

### UI Components (`components/ui/`)
Base building blocks:

- **Button**: Styled button with variants (primary, secondary, outline, ghost)
- **Container**: Responsive container with max-width

### Layout Components (`components/layout/`)
Page structure:

- **Header**: Navigation header with mobile menu
- **Footer**: Site footer with links and copyright

### Section Components (`components/sections/`)
Page content sections:

- **Hero**: Main hero section
- **ProblemStatement**: Problem introduction section
- **HowItWorks**: Three-step process section
- **Features**: Features grid section
- **JoinWaitlist**: CTA section

## 📦 Constants & Configuration

### `constants/content.js`
All static text content:
- `HERO_CONTENT`
- `PROBLEM_STATEMENT`
- `HOW_IT_WORKS`
- `FEATURES`
- `JOIN_WAITLIST`
- `BRAND`

### `constants/navigation.js`
Navigation configuration:
- `NAV_ITEMS`
- `FOOTER_LINKS`

### `constants/animations.js`
Reusable animation variants:
- `fadeInUp`, `fadeInDown`, `fadeIn`
- `scaleIn`
- `hoverScale`
- `scrollReveal`
- `staggerContainer`

## 🔧 Utilities

### `utils/iconMapper.js`
Maps icon names (strings) to Lucide React icon components for dynamic rendering.

## 🎯 Design Principles

1. **Template-Based**: Use template components for consistency
2. **Constants-Driven**: All content in constants files
3. **Clean Imports**: Barrel exports via index.js files
4. **Reusable Animations**: Centralized animation variants
5. **Type Safety**: Consistent prop patterns

## 📝 Usage Examples

### Creating a New Section

```jsx
import { Section, SectionTitle } from '../templates';
import { YOUR_CONTENT } from '../../constants';

const NewSection = () => {
  return (
    <Section id="new-section" background="white">
      <SectionTitle title={YOUR_CONTENT.title} />
      {/* Your content here */}
    </Section>
  );
};
```

### Using Template Components

```jsx
import { IconBox, FeatureCard } from '../templates';

// IconBox for step-by-step processes
<IconBox
  iconName="Mic"
  title="Record Stories"
  description="Capture audio and video stories"
  variant="circle"
/>

// FeatureCard for feature grids
<FeatureCard
  iconName="Radio"
  title="Voice Journal"
  description="Capture authentic emotions"
/>
```

### Adding New Content

1. Add content to `constants/content.js`
2. Import in your component
3. Use in JSX

### Adding New Icons

1. Import icon in `utils/iconMapper.js`
2. Add to `iconMap` object
3. Use icon name string in components

## 🚀 Best Practices

1. **Always use templates** for repeated patterns
2. **Keep content in constants** - never hardcode text
3. **Use barrel exports** for clean imports
4. **Follow naming conventions** - PascalCase for components
5. **Add JSDoc comments** to all components
6. **Consistent spacing** - use Section component padding
7. **Animation consistency** - use animation constants

