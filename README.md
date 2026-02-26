# SkillNest - Learning Management System

A premium LMS built with React, Node.js, and MongoDB Atlas.

## 🚀 Getting Started

### Backend
1. Go to `backend/`
2. Install dependencies: `npm install`
3. Create `.env` based on `.env.example`
4. Run development: `npm run dev`

### Frontend
1. Go to `frontend/`
2. Install dependencies: `npm install`
3. Run development: `npm run dev`

## 📦 Deployment

### Backend (Render)
- **Environment**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**: Add `MONGO_URI`, `JWT_SECRET`, and `NODE_ENV`.

### Frontend (Vercel/Netlify)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: If you add any `VITE_` variables, define them here.

### Git Push
```bash
git add .
git commit -m "Initial commit - Ready for deployment"
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```
