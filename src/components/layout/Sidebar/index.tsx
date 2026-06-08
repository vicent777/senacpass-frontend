import { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Top,
  Logo,
  Search,
  SearchWrap,
  SearchResults,
  SearchResult,
  Nav,
  MenuItem,
  Bottom,
} from './styles';

import {
  LayoutDashboard,
  Users,
  FileText,
  Cpu,
  Settings,
  Search as SearchIcon,
} from 'lucide-react';

const MENU_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, terms: 'aulas presença alunos frequência início' },
  { to: '/turmas', label: 'Turmas', icon: Users, terms: 'classes professores unidades curriculares' },
  { to: '/relatorios', label: 'Relatórios', icon: FileText, terms: 'pdf impressão frequência auditoria logs alunos' },
  { to: '/iot', label: 'IoT', icon: Cpu, terms: 'rfid dispositivos leitores salas hardware ip eventos' },
  { to: '/configuracoes', label: 'Configurações', icon: Settings, terms: 'perfil preferências notificações conta' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');

    if (!normalized) {
      return [];
    }

    return MENU_ITEMS.filter((item) =>
      `${item.label} ${item.terms}`.toLocaleLowerCase('pt-BR').includes(normalized),
    );
  }, [query]);

  function openResult(path: string) {
    setQuery('');
    navigate(path);
  }

  return (
    <Container>
      <Top>
        <Logo>SenacPass</Logo>

        <SearchWrap>
          <Search>
            <SearchIcon size={16} />
            <input
              value={query}
              placeholder="Buscar no sistema..."
              aria-label="Buscar página ou recurso"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && results[0]) {
                  openResult(results[0].to);
                }
                if (event.key === 'Escape') {
                  setQuery('');
                }
              }}
            />
          </Search>

          {query.trim() ? (
            <SearchResults>
              {results.length > 0 ? (
                results.map(({ to, label, icon: Icon }) => (
                  <SearchResult type="button" key={to} onClick={() => openResult(to)}>
                    <Icon size={15} />
                    <span>{label}</span>
                  </SearchResult>
                ))
              ) : (
                <small>Nenhum recurso encontrado.</small>
              )}
            </SearchResults>
          ) : null}
        </SearchWrap>

        <Nav>
          {MENU_ITEMS.slice(0, 4).map(({ to, label, icon: Icon }) => (
            <MenuItem as={NavLink} key={to} to={to} end>
              <Icon size={18} />
              <span>{label}</span>
            </MenuItem>
          ))}
        </Nav>
      </Top>

      <Bottom>
        <MenuItem as={NavLink} to="/configuracoes" end>
          <Settings size={18} />
          <span>Configurações</span>
        </MenuItem>
      </Bottom>
    </Container>
  );
}
