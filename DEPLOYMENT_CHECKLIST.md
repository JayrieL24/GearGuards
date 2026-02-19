# 📋 GearGuard Deployment Checklist

Use this checklist to ensure smooth deployment. Check off each item as you complete it.

## Pre-Deployment Checklist

### Local Setup
- [x] Supabase database connected
- [x] All migrations applied
- [x] Sample data loaded
- [x] Google Gemini API key configured
- [x] Application tested locally
- [x] Production dependencies installed
- [x] Static files collected successfully

### Code Preparation
- [x] `.gitignore` file created
- [x] `requirements.txt` updated with production packages
- [x] `build.sh` script created
- [x] `render.yaml` configuration created
- [x] `vercel.json` configuration created
- [x] Django settings updated for production
- [x] WhiteNoise middleware added
- [x] Gunicorn configured

## Deployment Steps

### Step 1: GitHub Setup
- [ ] Create GitHub account (if needed)
- [ ] Create new repository named `gearguard-system`
- [ ] Set repository to Private
- [ ] Initialize git in project folder
- [ ] Add all files to git
- [ ] Commit with message "Initial commit - GearGuard System"
- [ ] Push to GitHub main branch
- [ ] Verify all files uploaded (check GitHub website)

### Step 2: Render Backend Deployment
- [ ] Create Render account at https://render.com
- [ ] Connect GitHub account to Render
- [ ] Create new Web Service
- [ ] Select `gearguard-system` repository
- [ ] Configure service:
  - [ ] Name: `gearguard-backend`
  - [ ] Region: Oregon (or closest)
  - [ ] Root Directory: `backend`
  - [ ] Runtime: Python 3
  - [ ] Build Command: `./build.sh`
  - [ ] Start Command: `gunicorn config.wsgi:application`
  - [ ] Plan: Free
- [ ] Add environment variables:
  - [ ] `DJANGO_SECRET_KEY` (generate random 50+ chars)
  - [ ] `DJANGO_DEBUG=False`
  - [ ] `DJANGO_ALLOWED_HOSTS` (will update after deploy)
  - [ ] `CORS_ALLOWED_ORIGINS` (will update after Vercel)
  - [ ] `CSRF_TRUSTED_ORIGINS` (will update after Vercel)
  - [ ] `SUPABASE_DB_URL` (copy from .env file)
  - [ ] `GOOGLE_GEMINI_API_KEY` (copy from .env file)
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy your Render URL (e.g., `https://gearguard-backend.onrender.com`)
- [ ] Test backend: Visit `https://your-backend.onrender.com/api/health/`
- [ ] Should see: `{"status":"ok","service":"django-backend"}`

### Step 3: Render Post-Deployment Setup
- [ ] Go to Render dashboard → Shell
- [ ] Run: `python manage.py add_sample_users`
- [ ] Run: `python manage.py setup_categories`
- [ ] Run: `python manage.py add_sample_inventory`
- [ ] Verify commands completed successfully

### Step 4: Vercel Frontend Deployment
- [ ] Create Vercel account at https://vercel.com
- [ ] Connect GitHub account to Vercel
- [ ] Click "Add New..." → "Project"
- [ ] Import `gearguard-system` repository
- [ ] Configure project:
  - [ ] Framework Preset: Vite
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add environment variable:
  - [ ] Key: `VITE_API_BASE_URL`
  - [ ] Value: Your Render backend URL (from Step 2)
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy your Vercel URL (e.g., `https://gearguard-system.vercel.app`)

### Step 5: Update Backend CORS Settings
- [ ] Go back to Render dashboard
- [ ] Click on your backend service
- [ ] Go to "Environment" tab
- [ ] Update these variables with your Vercel URL:
  - [ ] `CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app`
  - [ ] `CSRF_TRUSTED_ORIGINS=https://your-vercel-url.vercel.app`
  - [ ] `DJANGO_ALLOWED_HOSTS=gearguard-backend.onrender.com`
- [ ] Click "Save Changes"
- [ ] Wait for auto-redeploy (2-3 minutes)

## Testing Checklist

### Backend Tests
- [ ] Visit backend health endpoint: `/api/health/`
- [ ] Should return: `{"status":"ok","service":"django-backend"}`
- [ ] Check backend logs for errors (Render dashboard)
- [ ] Verify Supabase connection (no database errors)

### Frontend Tests
- [ ] Visit your Vercel URL
- [ ] Page loads without errors
- [ ] No console errors (F12 → Console)
- [ ] Login page displays correctly

### Authentication Tests
- [ ] Login as admin1 / AdminPass123!
- [ ] Should redirect to admin dashboard
- [ ] Logout works
- [ ] Login as student1 / StudentPass123!
- [ ] Should redirect to borrower dashboard
- [ ] Logout works

### Feature Tests
- [ ] Admin can view inventory
- [ ] Admin can view borrows
- [ ] Admin can approve registrations
- [ ] Student can browse items
- [ ] Student can request items
- [ ] Student can view notifications
- [ ] Staff can manage borrows
- [ ] Staff can view inventory (read-only)

### AI Features Test
- [ ] Admin can generate reports
- [ ] AI analytics work (Google Gemini)
- [ ] No API errors in console

## Post-Deployment

### Documentation
- [ ] Save your deployment URLs:
  - Frontend: ___________________________
  - Backend: ___________________________
- [ ] Share URLs with team/stakeholders
- [ ] Update README.md with live URLs

### Security
- [ ] Verify `DJANGO_DEBUG=False` in production
- [ ] Verify `DJANGO_SECRET_KEY` is random and secure
- [ ] Verify `.env` file is not committed to GitHub
- [ ] Verify all sensitive data is in environment variables
- [ ] Test that unapproved users cannot login

### Monitoring
- [ ] Bookmark Render dashboard
- [ ] Bookmark Vercel dashboard
- [ ] Bookmark Supabase dashboard
- [ ] Set up email notifications (Render settings)
- [ ] Check free tier limits:
  - Render: 750 hours/month
  - Vercel: 100GB bandwidth/month
  - Supabase: 500MB database

## Troubleshooting

If something doesn't work:

### Backend Issues
- [ ] Check Render logs for errors
- [ ] Verify all environment variables are set
- [ ] Test Supabase connection
- [ ] Verify build completed successfully
- [ ] Check Python version (should be 3.12)

### Frontend Issues
- [ ] Check Vercel deployment logs
- [ ] Verify `VITE_API_BASE_URL` is correct
- [ ] Check browser console for errors
- [ ] Verify build completed successfully
- [ ] Test backend URL directly

### CORS Issues
- [ ] Verify `CORS_ALLOWED_ORIGINS` includes Vercel URL
- [ ] Verify `CSRF_TRUSTED_ORIGINS` includes Vercel URL
- [ ] Make sure URLs include `https://`
- [ ] No trailing slashes in URLs
- [ ] Redeploy backend after CORS changes

### Database Issues
- [ ] Check Supabase dashboard
- [ ] Verify connection string is correct
- [ ] Check if tables exist
- [ ] Run migrations if needed
- [ ] Check Supabase logs

## Success Criteria

Your deployment is successful when:

- ✅ Frontend loads at Vercel URL
- ✅ Backend responds at Render URL
- ✅ Users can login successfully
- ✅ All features work as expected
- ✅ No console errors
- ✅ No backend errors in logs
- ✅ Database queries work
- ✅ AI features work (Gemini API)

## Maintenance

### Regular Tasks
- [ ] Monitor Render free tier hours (750/month)
- [ ] Monitor Supabase database size (500MB limit)
- [ ] Check for Django security updates
- [ ] Backup database regularly (Supabase auto-backups)
- [ ] Review logs for errors

### Updates
- [ ] Make changes locally
- [ ] Test locally
- [ ] Commit and push to GitHub
- [ ] Render auto-deploys backend
- [ ] Vercel auto-deploys frontend
- [ ] Test live deployment

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Django Docs**: https://docs.djangoproject.com
- **React Docs**: https://react.dev

---

## 🎉 Congratulations!

Once all items are checked, your GearGuard system is fully deployed and ready for production use!

**Deployment Date**: _______________
**Deployed By**: _______________
**Frontend URL**: _______________
**Backend URL**: _______________
