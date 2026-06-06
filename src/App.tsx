import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AppRoutes } from './routes/index';
import { AuthProvider } from './contexts/AuthContext';

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  turmas: 'Turmas',
  relatorios: 'Relatórios',
  iot: 'IoT',
  configuracoes: 'Configurações',
};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const moduleKey = pathname.split('/')[1] || 'dashboard';
    const moduleTitle = PAGE_TITLES[moduleKey] || 'Dashboard';

    document.title = `SenacPass | ${moduleTitle}`;
  }, [pathname]);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
