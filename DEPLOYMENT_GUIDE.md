# GearGuard Deployment Guide

Complete guide to deploy GearGuard with Supabase, Render (Backend), and Netlify (Frontend).

## Prerequisites

- ✅ Supabase account with database configured
- ✅ GitHub account
- ✅ Render account (free tier)
- ✅ Netlify account (free tier)
- ✅ Google Gemini API key

## Part 1: Push Code to GitHub

### 1. Create a new GitHub repository
1. Go to https://github.com/new
2. Name: `gearguard-system` (or your preferred name)
3. Make it **Private** (recommended for security)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 2. Push your code to GitHub

Open terminal in your project root and run:

```bash
cd UIC_GearGuards
git init
git add .
git commit -m "Initial commit - GearGuard System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gearguard-system.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Part 2: Deploy Backend to Render

### 1. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your `gearguard-system` repository
3. Configure:
   - **Name**: `gearguard-backend`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn config.wsgi:application`
   - **Plan**: Free

### 3. Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add these:

```
DJANGO_SECRET_KEY=your-super-secret-key-here-change-this-to-random-string
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=gearguard-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
CSRF_TRUSTED_ORIGINS=https://your-frontend-url.vercel.app
SUPABASE_DB_URL=postgresql://postgres:JisiGabril24!@db.ddfwaharcdldifgszhkw.supabase.co:5432/postgres
GOOGLE_GEMINI_API_KEY=AIzaSyBBJSqgRLDScPjrzvIm5_yq-WeS4GH1IBo
```

**Important Notes:**
- Replace `DJANGO_SECRET_KEY` with a random 50+ character string
- Replace `your-frontend-url` with your actual Vercel URL (we'll get this in Part 3)
- The `SUPABASE_DB_URL` is already filled with your credentials
- The `GOOGLE_GEMINI_API_KEY` is already filled

### 4. Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Your backend will be live at: `https://gearguard-backend.onrender.com`

### 5. Run Initial Setup (One-time)

After deployment, go to Render dashboard → Shell and run:

```bash
python manage.py migrate
python manage.py add_sample_users
python manage.py setup_categories
python manage.py add_sample_inventory
```

**Note**: Migrations must be run from the Shell after deployment because database connections aren't available during the build phase.

## Part 3: Deploy Frontend to Netlify

### 1. Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub
3. Authorize Netlify to access your repositories

### 2. Import Project
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your `gearguard-system` repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### 3. Add Environment Variable

Before deploying, click "Show advanced" → "New variable" and add:

```
VITE_API_BASE_URL=https://gearguard-backend-g4b1.onrender.com
```

Replace with your actual Render backend URL.

### 4. Deploy
1. Click "Deploy site"
2. Wait 2-3 minutes
3. Your frontend will be live at: `https://random-name-12345.netlify.app`
4. You can customize the site name in Site settings → Change site name

### 5. Update Backend CORS Settings

Now that you have your Netlify URL, go back to Render:
1. Go to your backend service
2. Click "Environment"
3. Update these variables:
   ```
   CORS_ALLOWED_ORIGINS=https://your-actual-site.netlify.app
   CSRF_TRUSTED_ORIGINS=https://your-actual-site.netlify.app
   DJANGO_ALLOWED_HOSTS=gearguard-backend-g4b1.onrender.com
   ```
4. Click "Save Changes"
5. Service will auto-redeploy

## Part 4: Test Your Deployment

### 1. Access Your Application
Visit your Netlify URL: `https://your-site.netlify.app`

### 2. Test Login
Try logging in with sample accounts:
- **Admin**: admin1 / AdminPass123!
- **Staff**: handler1 / HandlerPass123!
- **Student**: student1 / StudentPass123!
- **Personnel**: personnel1 / PersonnelPass123!

### 3. Test Features
- ✅ Browse items
- ✅ Request borrows
- ✅ View notifications
- ✅ Admin approvals
- ✅ Inventory management
- ✅ AI-powered reports (with Gemini API)

## Troubleshooting

### Backend Issues

**Problem**: 500 errors
- Check Render logs: Dashboard → Logs
- Verify environment variables are set correctly
- Check Supabase connection

**Problem**: CORS errors
- Verify `CORS_ALLOWED_ORIGINS` includes your Vercel URL
- Verify `CSRF_TRUSTED_ORIGINS` includes your Vercel URL
- Make sure to include `https://` in URLs

### Frontend Issues

**Problem**: Can't connect to backend
- Verify `VITE_API_BASE_URL` is set correctly in Netlify
- Check if backend is running on Render
- Open browser console for error details

**Problem**: Build fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check Netlify build logs

### Database Issues

**Problem**: No data showing
- Run setup commands in Render shell
- Check Supabase dashboard for tables
- Verify `SUPABASE_DB_URL` is correct

## Security Recommendations

### Production Checklist

- [ ] Change `DJANGO_SECRET_KEY` to a random 50+ character string
- [ ] Set `DJANGO_DEBUG=False` in production
- [ ] Use environment variables for all secrets
- [ ] Enable Supabase Row Level Security (RLS)
- [ ] Set up custom domain with SSL
- [ ] Enable Render auto-deploy on push
- [ ] Set up monitoring and alerts
- [ ] Regular database backups (Supabase does this automatically)

### Environment Variables Security

**Never commit these to Git:**
- Database passwords
- API keys
- Secret keys
- Any credentials

All sensitive data should be in:
- Render: Environment Variables
- Vercel: Environment Variables
- Local: `.env` file (gitignored)

## Monitoring & Maintenance

### Render (Backend)
- Free tier: Spins down after 15 min of inactivity
- First request after sleep: ~30 seconds to wake up
- Upgrade to paid tier for always-on service

### Netlify (Frontend)
- Always on, no cold starts
- Automatic HTTPS
- Global CDN for fast loading

### Supabase (Database)
- Free tier: 500MB database
- Automatic backups
- Monitor usage in dashboard

## Updating Your Deployment

### Backend Updates
1. Make changes locally
2. Commit and push to GitHub
3. Render auto-deploys (if enabled)
4. Or manually deploy from Render dashboard

### Frontend Updates
1. Make changes locally
2. Commit and push to GitHub
3. Netlify auto-deploys
4. Changes live in ~2 minutes

## Cost Breakdown

### Free Tier (Current Setup)
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Render**: Free (750 hours/month, sleeps after 15 min)
- **Netlify**: Free (100GB bandwidth, unlimited sites)
- **Google Gemini API**: Free tier (60 requests/minute)

**Total Cost**: $0/month 🎉

### Paid Tier (For Production)
- **Supabase Pro**: $25/month (8GB database, 50GB bandwidth)
- **Render Starter**: $7/month (always-on, 512MB RAM)
- **Netlify Pro**: $19/month (400GB bandwidth, analytics)

**Total Cost**: ~$51/month for production-ready setup

## Support

If you encounter issues:
1. Check the logs (Render/Vercel dashboards)
2. Verify environment variables
3. Test locally first
4. Check Supabase connection

## Your Deployed URLs

After deployment, update these:

- **Frontend**: https://_____.netlify.app
- **Backend**: https://gearguard-backend-g4b1.onrender.com
- **Database**: Supabase (already configured)

---

**Congratulations! Your GearGuard system is now deployed! 🎉**
