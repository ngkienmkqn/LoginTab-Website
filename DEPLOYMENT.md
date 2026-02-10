# LoginTab Releases Setup Guide

## 📦 Quick Deploy Workflow

### Marketing Website (HTML/CSS/JS) → Vercel
```bash
cd "c:\Users\TheHuman\Desktop\web\LoginTab Website"
vercel --prod
```

### Binary Files (1GB+ each) → GitHub Releases (Public Repo)

---

## 🚀 Step-by-Step Setup

### 1️⃣ Create Public Releases Repository

Go to: https://github.com/new

```
Repository name: LoginTab-Releases
Description: Official releases for LoginTab anti-detect browser
Visibility: ⚫ PUBLIC  ← This is safe! Only releases, no source code
✅ Add README
```

Click **Create repository**

---

### 2️⃣ (Optional) Initialize Locally

```bash
mkdir LoginTab-Releases
cd LoginTab-Releases

# Create a simple README
echo "# LoginTab Downloads" > README.md
echo "" >> README.md
echo "Download the latest version from [Releases](https://github.com/YOUR-USERNAME/LoginTab-Releases/releases)" >> README.md

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/LoginTab-Releases.git
git push -u origin main
```

---

### 3️⃣ Create Your First Release

1. Go to: `https://github.com/YOUR-USERNAME/LoginTab-Releases/releases`
2. Click **"Draft a new release"**

Fill in:
```
Tag version:     v4.0.12
Release title:   LoginTab v4.0.12
Description:     Latest stable release with CDP timezone engine
```

3. **Upload files** (drag & drop):
   - `LoginTab-Setup-4.0.12-Windows-x64.exe` (~1GB)
   - `LoginTab-4.0.12-Universal.dmg` (~1GB)

4. Click **Publish release**

---

### 4️⃣ Get Download URLs

After publishing, your files will be available at:

**Windows:**
```
https://github.com/YOUR-USERNAME/LoginTab-Releases/releases/download/v4.0.12/LoginTab-Setup-4.0.12-Windows-x64.exe
```

**macOS:**
```
https://github.com/YOUR-USERNAME/LoginTab-Releases/releases/download/v4.0.12/LoginTab-4.0.12-Universal.dmg
```

---

### 5️⃣ Update Website Download Links

Open `download.html`, find line **541**, and update:

```javascript
const GITHUB_RELEASES_REPO = 'YOUR-USERNAME/LoginTab-Releases'; // ← Change this!
```

Example:
```javascript
const GITHUB_RELEASES_REPO = 'ngkienmkqn/LoginTab-Releases';
```

---

### 6️⃣ Deploy to Vercel

```bash
cd "c:\Users\TheHuman\Desktop\web\LoginTab Website"
vercel --prod
```

✅ **Done!** Your download links will work automatically.

---

## 🔄 Updating for New Versions

When you release v4.0.13:

1. Create new release on GitHub
2. Upload new `.exe` and `.dmg` files
3. Update `download.html`:
   ```javascript
   const VERSION = 'v4.0.13'; // ← Change version
   ```
4. Redeploy: `vercel --prod`

---

## 📊 Benefits of This Approach

✅ **FREE unlimited bandwidth** (GitHub CDN)  
✅ **Source code stays PRIVATE** (only releases are public)  
✅ **Download statistics** (GitHub tracks download counts)  
✅ **Version history** (easy rollback to previous versions)  
✅ **No setup complexity** (no S3, R2, or custom domains needed)  
✅ **Automatic checksums** (GitHub generates SHA256 for each file)

---

## 🔒 Security Note

**Your marketing website repo can also be private** — Vercel works with private repos!

Only the **LoginTab-Releases** repo needs to be public.

**What's public:**
- ✅ Binary installers (.exe, .dmg)
- ✅ Release notes

**What stays private:**
- 🔒 Source code (main LoginTab repo)
- 🔒 Marketing website source (if you want)
- 🔒 Internal documentation

---

## 🎯 Final Structure

```
GitHub Repos:
├── ngkienmkqn/LoginTab (PRIVATE)           ← Source code
├── ngkienmkqn/LoginTab-Website (PRIVATE)   ← Marketing site HTML/CSS/JS
└── ngkienmkqn/LoginTab-Releases (PUBLIC)   ← Only .exe and .dmg files

Deployed Services:
├── Vercel: https://logintab.vercel.app     ← Marketing website
└── GitHub Releases: downloads              ← Binary files (1GB+)
```

---

## 🆘 Troubleshooting

**Q: Can users download without authentication?**  
✅ Yes! Public releases don't require GitHub login.

**Q: Is there a file size limit?**  
✅ No! GitHub Releases supports files up to 2GB each.

**Q: What about bandwidth costs?**  
✅ Completely free. GitHub provides unlimited bandwidth via their CDN.

**Q: Can I delete old releases?**  
✅ Yes, you can delete releases to save space (though quotas are generous).

---

**Ready to deploy!** 🚀
