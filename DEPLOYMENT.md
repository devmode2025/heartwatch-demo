# HeartWatch MCS Dashboard - Deployment Guide

## 🚀 Deployment to GitHub Pages

### ⚡ Automated Deployment (Recommended)

**GitHub Actions automatically deploys on every push to main!**

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that runs quality checks and automated deployment:

**Quality Gates (must pass before deployment):**
1. ✅ **ESLint** - Enforces code quality standards
2. ✅ **Prettier** - Enforces consistent code formatting
3. ✅ **Build** - Verifies production build succeeds

**Then automatically:**
1. Builds the application
2. Copies the CNAME file  
3. Deploys to GitHub Pages

**To deploy - just push your changes:**
```bash
git add .
git commit -m "your changes"
git push origin main
```

**Monitor deployment:**
- **Actions page:** https://github.com/devmode2025/heartwatch-demo/actions
- **Deployment time:** ~2-3 minutes
- **Success:** Green checkmark ✅
- **Failure:** Red X ❌ (click for details)

---

### 🔧 Manual Deployment (Alternative Method)

If you need to deploy manually without committing:

**Prerequisites:**
- GitHub repository: `devmode2025/heartwatch-demo`
- Custom domain: `demo.heartwatch.dev`
- DNS CNAME configured: `demo.heartwatch.dev` → `devmode2025.github.io`

**Build for Production:**
```bash
# Build the application
npx nx build --configuration=production

# Copy CNAME file to dist folder
cp CNAME dist/heartwatch-demo/browser/
```

**Deploy to GitHub Pages:**
```bash
# Deploy to gh-pages branch
npx gh-pages -d dist/heartwatch-demo/browser -b gh-pages
```

---

## ⚙️ GitHub Pages Configuration

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

## 🌐 Live URLs

- **Custom Domain:** https://demo.heartwatch.dev
- **GitHub Pages:** https://devmode2025.github.io/heartwatch-demo/

---

## 📊 Build Output

Production build location: `dist/heartwatch-demo/browser/`

Files included:
- `index.html` - Main entry point
- `main-*.js` - Application bundle (~293 KB)
- `polyfills-*.js` - Browser polyfills (~34 KB)
- `styles-*.css` - Compiled styles
- `CNAME` - Custom domain configuration

---

## 🔍 Troubleshooting

**Issue: Site not loading / 404 error**
- Check GitHub Pages settings are configured correctly
- Verify gh-pages branch exists
- Check CNAME file is in the root of gh-pages branch
- Wait 1-2 minutes for GitHub to deploy

**Issue: Custom domain not working**
- Verify DNS CNAME record: `dig demo.heartwatch.dev CNAME +short`
- Should return: `devmode2025.github.io`
- DNS propagation can take up to 24 hours

**Issue: Build fails in GitHub Actions**
- Check Actions tab for error logs
- Verify all dependencies are in package.json
- Ensure Node.js version matches (20)

**Issue: Blank page / routing issues**
- Check browser console for errors
- Verify base href configuration
- Check all routes are properly configured

---

## 📝 Notes

- Production builds use AOT compilation and minification
- Source maps are disabled in production for security
- NgRx DevTools are disabled in production mode
- Mock data service generates demo alerts for presentation
- GitHub Actions workflow runs on every push to main branch
- Manual deployment still available if needed
