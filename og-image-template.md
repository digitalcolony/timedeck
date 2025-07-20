# TimeDeck Open Graph Image Template

## Image Specifications

### Primary OG Image (og-image.png)
- **Size**: 1200x630px
- **Format**: PNG or JPG
- **Location**: `timedeck/public/og-image.png`

### Twitter Image (twitter-image.png)
- **Size**: 1200x600px
- **Format**: PNG or JPG
- **Location**: `timedeck/public/twitter-image.png`

## Design Elements

### Background
- **Gradient**: Linear gradient from ocean blue (#1e40af) to sunset orange (#f97316)
- **Alternative**: Solid ocean blue (#1e40af) background

### Text Content
- **Main Title**: "⏰ TimeDeck" 
  - Font: Poppins Bold, 72px
  - Color: White
  - Position: Center, slightly above middle

- **Tagline**: "Your global time dashboard"
  - Font: Poppins Medium, 36px
  - Color: White with 80% opacity
  - Position: Below title

- **Subtitle**: "Track multiple cities and timezones"
  - Font: Poppins Regular, 24px
  - Color: White with 60% opacity
  - Position: Below tagline

### Visual Elements (Optional)
- **World map silhouette** in background (subtle, low opacity)
- **Clock icons** scattered around
- **City cards mockup** showing different times
- **Time zone indicators** (GMT, EST, PST, etc.)

## Quick Creation Options

### Option 1: Canva
1. Go to canva.com
2. Search "Open Graph" template
3. Customize with TimeDeck branding
4. Download as PNG

### Option 2: Figma
1. Create 1200x630 artboard
2. Add gradient background
3. Add text elements
4. Export as PNG

### Option 3: AI Generation Prompt
```
"Create a professional social media image for TimeDeck, a global time dashboard app. 
Include the text 'TimeDeck' with a clock emoji, tagline 'Your global time dashboard', 
ocean blue and sunset orange gradient background, modern clean design, 1200x630 pixels"
```

### Option 4: Simple CSS/HTML
Create a simple HTML page with the design and screenshot it at 1200x630.

## Testing Your Images

### Facebook Debugger
- URL: https://developers.facebook.com/tools/debug/
- Enter your site URL to preview OG image

### Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- Enter your site URL to preview Twitter card

### LinkedIn Post Inspector
- URL: https://www.linkedin.com/post-inspector/
- Enter your site URL to preview LinkedIn share

## File Checklist

- [ ] Create `timedeck/public/og-image.png` (1200x630)
- [ ] Create `timedeck/public/twitter-image.png` (1200x600)
- [ ] Test images with social media validators
- [ ] Update og:url with your actual domain
- [ ] Build and deploy to see images in action

## Pro Tips

- **Keep text large** - social media previews are small
- **High contrast** - ensure text is readable
- **Brand consistent** - use TimeDeck colors and fonts
- **Mobile preview** - test how it looks on mobile
- **File size** - keep under 1MB for fast loading