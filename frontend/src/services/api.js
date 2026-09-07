import axios from 'axios';

// Same-origin /api on Vercel. Only override for local split-origin setups.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true
});

// #region agent log
if (typeof window !== 'undefined') {
  fetch('http://127.0.0.1:7488/ingest/95e6d872-650e-47df-87b9-76e07a6186af',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2a945d'},body:JSON.stringify({sessionId:'2a945d',runId:'post-fix',hypothesisId:'G',location:'frontend/src/services/api.js',message:'API client init',data:{baseURL:import.meta.env.VITE_API_URL||'/api',mode:import.meta.env.MODE},timestamp:Date.now()})}).catch(()=>{});
}
// #endregion

export default API;
