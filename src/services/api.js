import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('prime_tech_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('prime_tech_token');
        localStorage.removeItem('prime_tech_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  getUsers: () => api.get('/auth/users'),
  registerUser: (userData) => api.post('/auth/register', userData),
};

export const servicesService = {
  getAll: () => api.get('/services'),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

export const projectsService = {
  getAll: (params) => api.get('/projects', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const blogService = {
  getAll: () => api.get('/blogs'),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  addComment: (slug, comment) => api.post(`/blogs/${slug}/comments`, comment),
};

export const teamService = {
  getAll: () => api.get('/team'),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`),
};

export const testimonialService = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const leadService = {
  submitLead: (data) => api.post('/leads', data),
  getAll: () => api.get('/leads'),
  updateStatus: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
};

export const settingsService = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export const analyticsService = {
  get: () => api.get('/analytics'),
};

export const uploadService = {
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export default api;

