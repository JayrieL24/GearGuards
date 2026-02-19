# ⚡ Quick Deploy Guide - 20 Minutes

## 🎯 Goal
Deploy GearGuard to production with Supabase + Render + Vercel

## 📦 What You Need
- GitHub account
- Render account (free)
- Vercel account (free)
- Your Supabase credentials (already configured)

---

## Step 1: GitHub (5 min)

```bash
cd UIC_GearGuards
git init
git add .
git commit -m "Deploy GearGuard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gearguard.git
git push -u origin main
```

---

## Step 2: Render Backend (10 min)

1. **Go to**: https://render.com → Sign up with GitHub
2. **New Web Service** → Connect your repo
3. **Settings**:
   - Root Directory: `backend`
   - Build: `./build.sh`
   - Start: `gunicorn config.wsgi:application`
4. **Environment Variables**:
   ```
   DJANGO_SECRET_KEY=<random-50-chars>
   DJANGO_DEBUG=False
   DJANGO_ALLOWED_HOSTS=gearguard-backend.onrender.com
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
   CSRF_TRUSTED_ORIGINS=https://your-app.vercel.app
   SUPABASE_DB_URL=postgresql://postgres:JisiGabril24!@db.ddfwaharcdldifgszhkw.supabase.co:5432/postgres
   GOOGLE_GEMINI_API_KEY=AIzaSyBBJSqgRLDScPjrzvIm5_yq-WeS4GH1IBo
   ```
5. **Deploy** → Wait 5-10 min
6. **Shell** → Run:
   ```bash
   python manage.py add_sample_users
   python manage.py setup_categories
   python manage.py add_sample_inventory
   ```

---

## Step 3: Vercel Frontend (5 min)

1. **Go to**: https://vercel.com → Sign up with GitHub
2. **Import Project** → Select your repo
3. **Settings**:
   - Root Directory: `frontend`
   - Framework: Vite
4. **Environment Variable**:
   ```
   VITE_API_BASE_URL=https://gearguard-backend.onrender.com
   ```
5. **Deploy** → Wait 2-3 min

---

## Step 4: Update CORS (2 min)

1. Go back to **Render** → Your service → Environment
2. Update with your Vercel URL:
   ```
   CORS_ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app
   CSRF_TRUSTED_ORIGINS=https://your-actual-vercel-url.vercel.app
   ```
3. **Save** → Auto-redeploys

---

## ✅ Test

Visit your Vercel URL and login:
- **Admin**: admin1 / AdminPass123!
- **Student**: student1 / StudentPass123!

---

## 🎉 Done!

Your GearGuard is live with:
- ✅ Supabase Database
- ✅ Django Backend (Render)
- ✅ React Frontend (Vercel)
- ✅ Google Gemini AI
- ✅ $0/month (free tier)

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed instructions.
