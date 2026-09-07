import 'dotenv/config';
import dns from 'node:dns';

// Atlas SRV lookups fail on some networks/DNS resolvers without this
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import milkRoutes from './routes/milkRoutes.js';

const app = express();

// #region agent log
fetch('http://127.0.0.1:7488/ingest/95e6d872-650e-47df-87b9-76e07a6186af',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2a945d'},body:JSON.stringify({sessionId:'2a945d',runId:'pre-fix',hypothesisId:'A',location:'backend/src/app.js:module',message:'Express app module loaded',data:{nodeEnv:process.env.NODE_ENV||'undefined',hasMongoUri:Boolean(process.env.MONGO_URI||process.env.MONGODB_URI)},timestamp:Date.now()})}).catch(()=>{});
// #endregion

/* =========================
   REVERSE PROXY (VERCEL)
========================= */
app.set('trust proxy', 1);

/* =========================
   SECURITY & CORS
========================= */
app.use(helmet());

const allowedOrigins = [
  'https://dairyfarm236.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps/curl) or if in allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 204,
};

// Pass corsOptions directly to app.use(cors()) - handles both preflight OPTIONS and standard CORS
app.use(cors(corsOptions));

/* =========================
   SAFE SERVERLESS MONGOOSE CONNECTION
========================= */
let isConnected = 0;

const connectDB = async () => {
  if (isConnected === 1) return;
  if (!process.env.MONGO_URI) {
    console.error('CRITICAL: MONGO_URI missing in Environment Variables');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failure:', error.message);
  }
};

// Connect DB middleware (bypass preflight OPTIONS)
app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  await connectDB();
  next();
});

/* =========================
   PARSERS & COOKIES
========================= */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

/* =========================
   GLOBAL RATE LIMIT
========================= */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

/* =========================
   API ROUTES
========================= */
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/milk', milkRoutes);

/* =========================
   HEALTH & STATUS
========================= */
const renderLandingPage = (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bismillah Dairy Farm API</title>
      <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #1e293b; padding: 2.5rem; border-radius: 12px; text-align: center; border: 1px solid #334155; max-width: 480px; }
        h1 { margin: 0 0 0.5rem 0; font-size: 1.75rem; color: #ffffff; }
        p { color: #94a3b8; font-size: 0.95rem; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✔ Bismillah Dairy Farm API</h1>
        <p>Serverless Instance Operational</p>
      </div>
    </body>
    </html>
  `);
};

app.get('/api', renderLandingPage);

app.get('/api/health', (req, res) => {
  // #region agent log
  fetch('http://127.0.0.1:7488/ingest/95e6d872-650e-47df-87b9-76e07a6186af',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2a945d'},body:JSON.stringify({sessionId:'2a945d',runId:'pre-fix',hypothesisId:'C',location:'backend/src/app.js:health',message:'Health route hit',data:{method:req.method,url:req.originalUrl,mongoState:mongoose.connection.readyState},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  res.json({ success: true, message: 'Bismillah Dairy Farm API is running' });
});

// Request logger for 404 diagnosis
app.use((req, res, next) => {
  // #region agent log
  fetch('http://127.0.0.1:7488/ingest/95e6d872-650e-47df-87b9-76e07a6186af',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2a945d'},body:JSON.stringify({sessionId:'2a945d',runId:'pre-fix',hypothesisId:'E',location:'backend/src/app.js:pre-404',message:'Unmatched route before catch-all',data:{method:req.method,url:req.originalUrl,path:req.path},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  next();
});

/* =========================
   EXPRESS 5 CATCH-ALL ROUTE
========================= */
app.use('/{*splat}', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

/* =========================
   LOCAL DEVELOPMENT SERVER
========================= */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;

