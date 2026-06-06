import { useContext } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../modules/dashboard';
import { Turmas } from '../modules/turmas';
import { Relatorios } from '../modules/relatorios';
import { IoT } from '../modules/iot';
import { Configuracoes } from '../modules/configuracoes';
import { Login } from '../modules/login';

function ProtectedRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // If it's checking localStorage, we can show a loading state
  if (loading) {
    return <div>Carregando...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/iot" element={<IoT />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
      </Route>
    </Routes>
  );
}
