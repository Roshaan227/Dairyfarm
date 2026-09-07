import axios from 'axios';

// Prefer VITE_API_URL when frontend/backend are separate deploys; else same-origin /api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true
});

// #region agent log
fetch('http://127.0.0.1:7488/ingest/95e6d872-650e-47df-87b9-76e07a6186af',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2a945d'},body:JSON.stringify({sessionId:'2a945d',runId:'pre-fix',hypothesisId:'B',location:'frontend/src/services/api.js',message:'API client init',data:{baseURL:import.meta.env.VITE_API_URL||'/api',hasViteApiUrl:Boolean(import.meta.env.VITE_API_URL)},timestamp:Date.now()})}).catch(()=>{});
// #endregion

export default API;
