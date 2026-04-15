import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ndca_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
};

export const playerApi = {
  getAll: (params?: any) => api.get('/players', { params }),
  getById: (id: string) => api.get(`/players/${id}`),
  create: (data: any) => api.post('/players', data),
  update: (id: string, data: any) => api.put(`/players/${id}`, data),
  approve: (id: string) => api.post(`/players/${id}/approve`),
  delete: (id: string) => api.delete(`/players/${id}`),
};

export const clubApi = {
  getAll: () => api.get('/clubs'),
  getById: (id: string) => api.get(`/clubs/${id}`),
  create: (data: any) => api.post('/clubs', data),
};

export const matchApi = {
  getAll: () => api.get('/matches'),
  updateScore: (id: string, score: any) => api.post(`/matches/${id}/score`, score),
  recordBall: (id: string, data: any) => api.post(`/matches/${id}/ball`, data),
};

export const trialApi = {
  getAll: () => api.get('/trials'),
  create: (data: any) => api.post('/trials', data),
  registerPlayer: (trialId: string, playerId: string) => api.post(`/trials/${trialId}/register`, { playerId }),
  updateRegistration: (regId: string, data: any) => api.patch(`/trials/registration/${regId}`, data),
};

export const newsApi = {
  getAll: () => api.get('/news'),
  create: (data: any) => api.post('/news', data),
  delete: (id: string) => api.delete(`/news/${id}`),
};

export const galleryApi = {
  getAll: () => api.get('/gallery'),
  create: (data: any) => api.post('/gallery', data),
  delete: (id: string) => api.delete(`/gallery/${id}`),
};

export const leagueApi = {
  getAll: () => api.get('/leagues'),
  create: (data: any) => api.post('/leagues', data),
  getStandings: (id: string) => api.get(`/leagues/${id}/standings`),
};

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
};

export const billingApi = {
  getAll: () => api.get('/billing'),
  create: (data: any) => api.post('/billing', data),
  updateStatus: (id: string, status: string) => api.patch(`/billing/${id}/status`, { status }),
};

export const eventApi = {
  getAll: () => api.get('/events'),
  create: (data: any) => api.post('/events', data),
  delete: (id: string) => api.delete(`/events/${id}`),
};

export const sponsorApi = {
  getAll: () => api.get('/sponsors'),
  create: (data: any) => api.post('/sponsors', data),
  update: (id: string, data: any) => api.put(`/sponsors/${id}`, data),
  delete: (id: string) => api.delete(`/sponsors/${id}`),
};

export const videoApi = {
  getAll: () => api.get('/videos'),
  create: (data: any) => api.post('/videos', data),
  delete: (id: string) => api.delete(`/videos/${id}`),
};

export const settingsApi = {
  get: (key: string) => api.get(`/settings/${key}`),
  set: (key: string, data: any) => api.post(`/settings/${key}`, data),
};

export const reportApi = {
  getDownloadUrl: (type: string) => `${API_BASE_URL}/reports/export/${type}`,
};

export const broadcastApi = {
  send: (data: any) => api.post('/broadcast', data),
};

export default api;
