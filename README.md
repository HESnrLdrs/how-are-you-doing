# How Are You Doing? - Slider Version

## Overview
Quick check-in tool using sliders instead of multiple-choice questions. People position sliders where they feel they are right now across three dimensions: Coping, Practical, and Self.

## What's Different
- **Sliders not questions**: 15 sliders (0-100 scale) instead of 75 multiple choice options
- **Faster**: Takes about 5 minutes instead of 10-15
- **More control**: People place themselves where they feel, not forced into boxes
- **Visual results**: Fuel gauge displays showing E to F
- **No numbers in results**: Just visual gauges and descriptive text

## Files
- `index.html` - Main page structure
- `styles-slider.css` - All styling including fuel gauges
- `questions-slider.js` - 15 questions with slider labels
- `app-slider.js` - App logic and results calculation

## Scoring
- Each slider: 0-100
- Average per dimension (5 questions each)
- Zones: 0-34 Struggling, 35-69 Managing, 70-100 Thriving
- Needle position on gauge reflects the score

## To Deploy
1. Upload all 4 files to your GitHub repository
2. Site updates automatically at: https://hesnrldrs.github.io/how-are-you-doing/

## Privacy
Everything runs in the browser - no data collected or stored anywhere.

## Next Steps
Test with Claire and others, then decide:
- Keep slider version OR
- Build detailed question version OR  
- Offer both versions

## Notes
- Questions are randomized each time
- Results focus on lowest scoring dimension
- Fuel gauges animate when results display
- Works on mobile and desktop
