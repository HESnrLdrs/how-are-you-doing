# How Are You Doing? Assessment

A self-assessment tool for people navigating major life disruptions.

## Quick Start - Deploy to GitHub Pages

### Method 1: Upload via GitHub Web Interface (Easiest)

1. Go to https://github.com/HESnrLdrs/how-are-you-doing

2. Click "Add file" → "Upload files"

3. Drag and drop these files:
   - index.html
   - styles.css
   - app.js
   - questions.js

4. Scroll down and click "Commit changes"

5. Go to repository Settings → Pages (left sidebar)

6. Under "Source", select "main" branch

7. Click "Save"

8. Wait 1-2 minutes, then your app will be live at:
   **https://hesnrldrs.github.io/how-are-you-doing/**

### Method 2: Using Git Command Line

If you prefer using Git commands:

```bash
cd /path/to/your/folder
git init
git add .
git commit -m "Initial commit - How Are You Doing app"
git branch -M main
git remote add origin https://github.com/HESnrLdrs/how-are-you-doing.git
git push -u origin main
```

Then enable GitHub Pages as described in Method 1, steps 5-8.

## What This App Does

Assesses three key dimensions when someone faces a major life disruption:

- **Coping**: Emotional and psychological wellbeing
- **Practical**: Daily tasks and logistics
- **Self**: Identity and sense of purpose

The assessment takes 10-15 minutes and provides personalized results with specific suggestions.

## Files Included

- `index.html` - Main page structure
- `styles.css` - Styling and layout
- `app.js` - Application logic
- `questions.js` - Assessment questions and interpretations
- `README.md` - This file

## Privacy

All responses stay on the user's device. No data is collected, stored, or transmitted.

## Testing

After deployment, test:
1. Welcome screen displays correctly
2. All 15 questions flow smoothly
3. Results calculate properly
4. Download function works
5. Mobile responsiveness

## Customization

To update questions or interpretations, edit `questions.js`.
To change styling, edit `styles.css`.

## Support

Paul Thomas Coaching Ltd
www.paulthomascoaching.com
