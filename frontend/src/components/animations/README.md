# Animation Components

This directory contains a comprehensive set of scroll-triggered and interactive animation components built with Framer Motion.

## Components

### ScrollReveal
Reveals elements as they come into view with customizable direction and timing.
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <h1>Animated Title</h1>
</ScrollReveal>
```

### StaggeredReveal
Animates multiple child elements with staggered timing.
```tsx
<StaggeredReveal staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggeredReveal>
```

### TypewriterText
Creates a typewriter effect for text.
```tsx
<TypewriterText 
  text="Hello World" 
  speed={50} 
  cursor={true} 
/>
```

### ParallaxSection
Adds parallax scrolling effects to sections.
```tsx
<ParallaxSection speed={0.5}>
  <div>Parallax content</div>
</ParallaxSection>
```

### SlideInSection
Slides elements in from left or right.
```tsx
<SlideInSection direction="left" distance="100%">
  <div>Sliding content</div>
</SlideInSection>
```

### CounterAnimation
Animates numbers counting up when in view.
```tsx
<CounterAnimation 
  from={0} 
  to={100} 
  suffix="+" 
  duration={2} 
/>
```

### ScrollProgress
Shows scroll progress at the top of the page.
```tsx
<ScrollProgress color="#ffffff" height={2} />
```

### SmoothScroll
Wraps the app with smooth scrolling behavior.
```tsx
<SmoothScroll>
  <App />
</SmoothScroll>
```

### FloatingElements
Adds ambient floating particles.
```tsx
<FloatingElements count={20} />
```

### MagneticHover
Creates magnetic hover effects for interactive elements.
```tsx
<MagneticHover strength={0.3}>
  <button>Magnetic Button</button>
</MagneticHover>
```

## Hooks

### useScrollAnimation
Provides scroll-based animation values.
```tsx
const { scrollYProgress, opacity, scale } = useScrollAnimation();
```

### useParallax
Simple parallax hook for background elements.
```tsx
const y = useParallax(0.5);
```

## Performance

All animations are optimized for performance with:
- Hardware acceleration enabled
- Proper `will-change` properties
- Efficient scroll listeners
- Intersection Observer for visibility detection

## Usage

Import animations from the index file:
```tsx
import { ScrollReveal, TypewriterText, CounterAnimation } from '@/components/animations';
```