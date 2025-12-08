# Studio Satyan Website

## Project Description
A three-page interactive website for Studio Satyan, an innovative footwear designer. The site features a dynamic image collage landing page with an integrated drawing/doodle feature, allowing visitors to interact creatively with the portfolio.

## Technology Stack
- **Pure HTML/CSS/JavaScript** - No framework required (production site)
- **Custom Font**: TAY Birdie (loaded from `Fonts/TAYBirdie.otf`)
- **Fallback Font**: Inter (Google Fonts)

## File Structure
```
StudioSatyan/
├── index.html          # Home page - Interactive collage with drawing UI
├── about.html          # About page - Designer info and philosophy
├── contact.html        # Contact page - Contact form
├── styles.css          # Main stylesheet
├── CLAUDE.md           # This file - Project overview
├── Fonts/
│   └── TAYBirdie.otf   # Custom brand font
├── _Images/
│   ├── SVG/            # Logo and icon SVGs
│   │   ├── StudioSatyan-wordmark.svg
│   │   └── draw.svg
│   ├── Home-Collage/   # Hero images for collage animation (40+ images)
│   └── Satyan-About.png
├── StudioSatyanWebsite-V2/  # React/Vite version (Figma Make export)
│   └── src/
│       ├── components/     # React components with refined UI
│       │   ├── Home.tsx
│       │   ├── HamburgerMenu.tsx
│       │   ├── ColorSelectorModal.tsx
│       │   └── LineWeightModal.tsx
│       └── imports/        # SVG path definitions
└── _Archive/           # Archived versions
```

## Key Features

### 1. Hamburger Menu (All Pages)
- Fixed position: top-right corner (3rem / 48px from edges)
- 3-line hamburger icon, dark color (#090909)
- Dropdown with Home, About, Contact links
- Active state: teal background (`rgba(0, 158, 163, 0.3)`) with white text
- Large 36px uppercase font (TAY Birdie)
- Animated open/close with CSS transitions
- Click outside to close

### 2. Dynamic Image Collage System (Home Page)
The collage has been refined significantly in this project:
- **Organic Layout**: Images positioned with max 15% overlap algorithm
- **Size Variation**: 7 size templates from extra small to panoramic/portrait
- **Z-Index by Size**: Larger images further back, smaller in front
- **Continuous Drift**: Subtle floating animation that never stops
- **Rotation**: Entire collage rotates ±45° while covered by expanded image
- **Auto-Cycle**: 5-second intervals between expand/collapse states
- **Click Interaction**: Click any image to expand fullscreen
- **Logo Overlay**: White wordmark centered with 10% dark tint

### 3. Interactive Drawing Canvas (Home Page)
- **Pen Tool Button**: Fixed bottom-right (48px margins)
- **Expandable Toolbar**: When active, reveals additional controls
- **Color Picker**: HSV selector with three sliders (Hue, Saturation, Value)
- **Line Weight**: Adjustable 1-50px with visual squiggle preview
- **Eraser Tool**: Toggle between draw and erase modes
- **Save/Share**: Export drawings as PNG images
- **Canvas Layer**: Overlays collage at z-index 101
- **Animation Pause**: Drawing mode pauses collage animations

### 4. About Page
- Designer photo (16:9 aspect ratio)
- Sections: The Designer, Philosophy, Process
- Contact info with email
- Scroll-triggered fade-in animations

### 5. Contact Page
- Contact form (Name, Email, Subject, Message)
- Success message animation with checkmark
- Contact info grid (Email, Phone, Location)

## Design System

### Typography
- **Primary Font**: TAY Birdie
- **Fallbacks**: Inter, -apple-system, BlinkMacSystemFont, sans-serif

### Colors (CSS Variables)
```css
--color-bg: #E1DFD9;           /* Warm beige background */
--color-teal: rgba(0, 158, 163, 0.3);  /* Menu active state */
--color-neutral-900: #171717;   /* Dark text/elements */
--color-white: #ffffff;
--color-black: #000000;
--color-red-500: #ef4444;       /* Eraser active state */
```

### Fixed Positioning
- Pen button: `bottom: 3rem; right: 3rem` (48px from edges)
- Hamburger menu: `top: 3rem; right: 3rem` (48px from edges)
- Modals: Positioned above toolbar with 60px gap

### Z-Index Layers
- Collage images: 2-30 (based on size)
- Expanded image: 50
- Dimming overlay: 99
- Logo overlay: 100
- Drawing canvas: 101
- Drawing controls: 102
- Hamburger menu: 200
- Save modal: 200

## Image Animation Sequence
1. Page loads with hero image expanded
2. After 5 seconds, image collapses to collage position
3. All images shuffle to new random positions
4. Collage rotates to new angle (±45°)
5. Next random image expands
6. Cycle repeats indefinitely
7. Continuous drift animation runs throughout

## Collage Layout Algorithm
```javascript
// Size templates for variety
const sizeTemplates = [
    { minW: 9, maxW: 14, minH: 11, maxH: 17 },    // Extra Small
    { minW: 14, maxW: 20, minH: 15, maxH: 21 },   // Small
    { minW: 20, maxW: 29, minH: 21, maxH: 32 },   // Medium
    { minW: 29, maxW: 41, minH: 30, maxH: 44 },   // Large
    { minW: 38, maxW: 53, minH: 34, maxH: 49 },   // Extra Large
    { minW: 23, maxW: 41, minH: 11, maxH: 19 },   // Wide panoramic
    { minW: 11, maxW: 18, minH: 26, maxH: 41 },   // Tall portrait
];

// Max 15% overlap between images
const MAX_OVERLAP_PERCENT = 0.15;
```

## Related Projects

### StudioSatyanWebsite-V2 (Figma Make Export)
Reference for refined UI designs:
- Uses React + TypeScript + Vite
- Tailwind CSS v4 + Framer Motion
- Component-based architecture
- SVG paths exported as TypeScript modules
- **UI Reference**: ColorSelectorModal, LineWeightModal, HamburgerMenu

## Development Notes
- No build process required - open HTML files directly in browser
- Images loaded from `_Images/Home-Collage/` folder (40+ footwear images)
- Drawing canvas uses HTML5 Canvas API
- Animations use CSS transitions + requestAnimationFrame
- Touch support for mobile drawing

## Browser Compatibility
- Modern browsers with Canvas API support
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Touch events for mobile devices

---

**Last Updated**: December 2024
**Version**: 1.0
**Status**: Production Ready
