import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  senha?: string;
  password?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token and user exist in localStorage
    const storagedUser = localStorage.getItem('@SenacPass:user');
    const storagedToken = localStorage.getItem('token');

    if (storagedToken && storagedUser) {
      // Re-configure the api interceptor to ensure it has the token, though it's set in api.ts as well
      // eslint-disable-next-line react-hooks/set-state-in-effect
      try { setUser(JSON.parse(storagedUser)); } catch { localStorage.removeItem('@SenacPass:user'); localStorage.removeItem('token'); }
    }

    setLoading(false);
  }, []);

async function login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/professores/login', {
        email: credentials.email,
        senha: credentials.password || credentials.senha,
      });

      // Pega o token da resposta (ajuste se ele vier dentro de um objeto, ex: response.data.token)
      const token = response.data?.token || response.data;
      
      if (!token || typeof token !== 'string') {
        throw new Error("Token não recebido da API");
      }

      // 🔥 MÁGICA AQUI: Decodificando o JWT nativamente para pegar o ID e o Email
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);

      // Agora criamos o usuário com os dados extraídos de dentro do Token!
      const loggedUser = {
        id: decodedToken.id, // O uuid correto: f8ba4437-264d...
        email: decodedToken.email || credentials.email,
        name: decodedToken.name || 'Professor', // O nome não vem no token, usamos um fallback seguro
      };

      localStorage.setItem('token', token);
      localStorage.setItem('@SenacPass:user', JSON.stringify(loggedUser));

      setUser(loggedUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('@SenacPass:user');
    setUser(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use the AuthContext.
 * Note: To maintain Fast Refresh compatibility, hooks should ideally 
 * be in their own files if the provider file exports components.
 * However, keeping it here as a single component-related export.
 */
export const useAuth = () => useContext(AuthContext);
