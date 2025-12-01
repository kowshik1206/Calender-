# 🚀 Deployment Guide

## Storybook Deployment Options

### Option 1: Chromatic (Recommended)

Chromatic provides free hosting for Storybook with visual regression testing.

```bash
# Install Chromatic
npm install --save-dev chromatic

# Deploy to Chromatic
npx chromatic --project-token=<your-project-token>
```

Get your project token from https://www.chromatic.com/

### Option 2: Netlify

1. Build Storybook:
```bash
npm run build-storybook
```

2. Drag and drop the `storybook-static` folder to https://app.netlify.com/drop

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --dir=storybook-static --prod
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Add this `vercel.json` to the root:
```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static"
}
```

### Option 4: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"deploy-storybook": "gh-pages -d storybook-static"
```

3. Build and deploy:
```bash
npm run build-storybook
npm run deploy-storybook
```

### Option 5: Static Hosting (AWS S3, Firebase, etc.)

Build Storybook and upload the `storybook-static` folder to any static hosting service.

```bash
npm run build-storybook
```

## Main App Deployment

### Netlify/Vercel

Both services auto-detect Vite projects. Just connect your GitHub repo.

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`

## Environment Variables

No environment variables required for this project.

## Performance Checklist

Before deploying, ensure:
- [x] Build succeeds without errors
- [x] Bundle size is <200KB gzipped
- [x] All stories render correctly
- [x] Accessibility tests pass
- [x] Mobile responsive on all viewports

## Post-Deployment

1. Update README with live links
2. Test all features in production
3. Run Lighthouse audit
4. Submit assignment with deployed URL
