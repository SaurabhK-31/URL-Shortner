# Snip — URL Shortener

A clean, minimal URL shortener built with Node.js, Express, and MongoDB.

## Project Structure

```
url-shortener/
├── index.js                  # Entry point
├── connect.js                # MongoDB connection
├── package.json
├── .env.example              # Environment variable template
├── models/
│   └── url_db.js             # Mongoose schema
├── controllers/
│   └── url.js                # Route handlers
├── routes/
│   └── url_routes.js         # Express routes
└── public/
    └── index.html            # Frontend
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

### 3. Run locally
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Visit `http://localhost:8001`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/url` | Create a short URL |
| GET | `/url/analytics/:short_id` | Get click analytics |
| GET | `/:short_id` | Redirect to original URL |

**POST /url**
```json
// Request
{ "url": "https://example.com/very/long/url" }

// Response
{ "id": "abc123" }
```

---

## Deployment

### Option 1 — Render (Free)
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node index.js`
6. Add environment variable: `MONGO_URI` (use MongoDB Atlas)

### Option 2 — Railway
1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project
3. Deploy from GitHub repo
4. Add `MONGO_URI` environment variable

### Option 3 — VPS (Ubuntu)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone and install
git clone <your-repo>
cd url-shortener
npm install

# Install PM2 for process management
sudo npm install -g pm2
pm2 start index.js --name snip
pm2 save
pm2 startup

# Set up Nginx reverse proxy
sudo apt install nginx
# Point Nginx to localhost:8001
```

### MongoDB Atlas (Cloud DB for deployment)
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Set it as `MONGO_URI` in your environment variables
