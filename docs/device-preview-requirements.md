# Device Preview System - Technical Requirements

## Problem Statement

Current implementation only visually scales the iframe inside a device mockup. This causes:

- Desktop preview shows mobile version of website
- Mobile preview is zoomed incorrectly
- Tablet layout is cropped
- Iframe does not render with real viewport
- Device buttons only change visual size, not rendering behavior

## Correct Behavior

REAL responsive device preview system where iframe renders with actual viewport dimensions.

## Requirements

### 1. Realistic Device Frames
- Desktop → monitor frame
- Laptop → laptop frame
- Tablet → tablet frame
- Mobile → phone frame

### 2. Live Website Rendering
Inside each frame, the actual website must load live using an iframe.

### 3. Real Viewport Size (MOST IMPORTANT)
The iframe must render using the REAL viewport size:
- Desktop → 1440x900
- Laptop → 1280x800
- Tablet → 768x1024
- Mobile → 390x844

### 4. Visual Scaling Only
- Calculate scale ratio based on available container space
- Apply transform: scale() to fit in UI
- Preserve original iframe dimensions internally
- DO NOT use CSS zoom hacks to fake responsiveness

### 5. Device Switching
- Smooth animations
- Correct resizing
- Preserve aspect ratio
- Keep iframe centered

### 6. Interactivity
- Website must remain fully interactive
- Scrollable, clickable, usable like real browser
- Scrolling happens INSIDE device frame only

### 7. Prevent Issues
- No clipping/cropping
- No stretching
- Realistic device proportions
- Responsive and centered container

### 8. Architecture
- Reusable device config object
- Dynamic viewport sizing
- Proper scaling calculations
- No duplicated code

## Recommended Stack
- React
- Next.js
- Tailwind
- Framer Motion (optional for transitions)

## Implementation Pattern

```typescript
// 1. Define device configurations
const deviceConfig = {
  desktop: { width: 1920, height: 1080, ... },
  laptop: { width: 1440, height: 900, ... },
  tablet: { width: 768, height: 1024, ... },
  mobile: { width: 390, height: 844, ... },
}

// 2. Render iframe at real viewport size
<iframe src={url} width={config.width} height={config.height} />

// 3. Scale to fit container
<div style={{ transform: `scale(${scaleRatio})` }}>
  {iframe}
</div>

// 4. Calculate scale ratio
const scaleRatio = availableWidth / config.width
```

## Anti-Patterns (DO NOT DO)

❌ A desktop website scaled down until it visually fits inside the device
❌ Fake responsiveness using CSS zoom only
❌ Resize iframe with arbitrary percentages
❌ Visually shrink desktop mode until it resembles mobile