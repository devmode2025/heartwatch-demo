# HeartWatch MCS Dashboard - Deployment Guide

## 🚀 Deployment to GitHub Pages

### Prerequisites
- GitHub repository: `devmode2025/heartwatch-demo`
- Custom domain: `demo.heartwatch.dev`
- DNS CNAME configured: `demo.heartwatch.dev` → `devmode2025.github.io`

### Build for Production

```bash
# Build the application
npx nx build --configuration=production

# Copy CNAME file to dist folder
Copy-Item -Path "CNAME" -Destination "dist\heartwatch-demo\" -Force
```

### Deploy to GitHub Pages

```bash
# Deploy to gh-pages branch
npx gh-pages -d dist/heartwatch-demo -b gh-pages
```

### GitHub Pages Configuration

1. Go to: https://github.com/devmode2025/heartwatch-demo/settings/pages
2. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
3. Click "Save"
4. Under "Custom domain":
   - Enter: `demo.heartwatch.dev`
   - Click "Save"
   - Enable "Enforce HTTPS" (after DNS propagates)

### Live URLs

- **Custom Domain:** https://demo.heartwatch.dev
- **GitHub Pages:** https://devmode2025.github.io/heartwatch-demo/

### Deployment Workflow

```bash
# 1. Make changes to code
# 2. Build for production
npm run build

# 3. Copy CNAME
Copy-Item CNAME dist/heartwatch-demo/

# 4. Deploy
npx gh-pages -d dist/heartwatch-demo -b gh-pages

# 5. Wait 1-2 minutes for GitHub to deploy
```

### Troubleshooting

**Issue:** Site not loading / 404 error
- Check GitHub Pages settings are configured correctly
- Verify gh-pages branch exists
- Check CNAME file is in the root of gh-pages branch

**Issue:** Custom domain not working
- Verify DNS CNAME record: `dig demo.heartwatch.dev CNAME +short`
- Should return: `devmode2025.github.io`
- DNS propagation can take up to 24 hours

**Issue:** Blank page / routing issues
- Angular needs base href for GitHub Pages
- Ensure build includes proper routing configuration

### DNS Configuration

**CNAME Record:**
```
demo.heartwatch.dev → devmode2025.github.io
```

Verify with:
```bash
dig demo.heartwatch.dev CNAME +short
# Should return: devmode2025.github.io
```

### Build Output

Production build location: `dist/heartwatch-demo/`

Files included:
- `index.html` - Main entry point
- `main-*.js` - Application bundle (~293 KB)
- `polyfills-*.js` - Browser polyfills (~34 KB)
- `styles-*.css` - Compiled styles
- `CNAME` - Custom domain configuration

### Performance

- **Total Bundle Size:** ~327 KB raw / ~89 KB gzipped
- **Load Time:** < 2 seconds on average connection
- **Lighthouse Score Target:** 90+ Performance

### CI/CD (Future Enhancement)

Consider setting up GitHub Actions to automate deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx nx build --configuration=production
      - run: cp CNAME dist/heartwatch-demo/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/heartwatch-demo
```

---

## 📝 Notes

- Production builds use AOT compilation and minification
- Source maps are disabled in production for security
- NgRx DevTools are disabled in production mode
- Mock data service generates demo alerts for presentation
