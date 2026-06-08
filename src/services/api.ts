import axios from 'axios';

const configuredBaseURL = import.meta.env.VITE_API_URL?.trim();

if (!configuredBaseURL && import.meta.env.PROD) {
  throw new Error('VITE_API_URL não foi configurada para o build de produção.');
}

const baseURL = (configuredBaseURL || 'http://localhost:3333/api').replace(/\/+$/, '');

const api = axios.create({
  baseURL,
});

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('@SenacPass:user');
}

function getTokenExpiration(token: string) {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const decoded = JSON.parse(window.atob(normalized)) as { exp?: number };
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string) {
  const expiration = getTokenExpiration(token);
  return expiration !== null && expiration <= Date.now();
}

function redirectToLogin() {
  clearSession();

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    if (isTokenExpired(token)) {
      redirectToLogin();
      return Promise.reject(new Error('Sessão expirada.'));
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseText = JSON.stringify(error.response?.data || '').toLowerCase();
      const expiredForbidden =
        status === 403 &&
        (responseText.includes('token') ||
          responseText.includes('expir') ||
          responseText.includes('sessão'));

      if (status === 401 || expiredForbidden) {
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
