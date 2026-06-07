import {
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronLeft,
  ChevronRight,
  Filter,
  PencilLine,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { EmptyState } from '../../../../components/ui/EmptyState';
import type { StudentListData } from '../../types';
import {
  Container,
  Header,
  Legend,
  LegendItem,
  Toolbar,
  SearchField,
  FilterButton,
  FilterMenu,
  FilterMenuOption,
  TableWrap,
  Table,
  Status,
  Footer,
  Pagination,
  PaginationButton,
  Count,
  HeaderTitle,
  HeaderLabel,
  SortButton,
  StudentRow,
} from './styles';

interface Props {
  data: StudentListData;
}

const ITEMS_PER_PAGE = 4;

type SortDirection = 'asc' | 'desc';

const STATUS_SORT_ORDER: Record<string, number> = {
  Presente: 0,
  Parcial: 1,
  Ausente: 2,
};

function parseTimeValue(value: string) {
  if (value === '--:--') {
    return Number.POSITIVE_INFINITY;
  }

  const [hours, minutes] = value.split(':').map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return Number.POSITIVE_INFINITY;
  }

  return hours * 60 + minutes;
}

function parseDurationValue(value: string) {
  if (!value || value === '--') {
    return Number.POSITIVE_INFINITY;
  }

  const hoursMatch = value.match(/(\d+)h/);
  const minutesMatch = value.match(/(\d+)m/);
  const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

  return hours * 60 + minutes;
}

function compareValues(
  left: number | string,
  right: number | string,
  direction: SortDirection,
) {
  if (typeof left === 'number' && typeof right === 'number') {
    return direction === 'asc' ? left - right : right - left;
  }

  return String(left).localeCompare(String(right), 'pt-BR', {
    numeric: true,
    sensitivity: 'base',
  }) * (direction === 'asc' ? 1 : -1);
}

export function StudentList({ data }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos os status');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('entry');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortKey, sortDirection]);

  const filteredItems = data.items.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'Todos os status' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((left, right) => {
    switch (sortKey) {
      case 'name':
        return compareValues(left.name, right.name, sortDirection);
      case 'registration':
        return compareValues(left.registration, right.registration, sortDirection);
      case 'entry':
        return compareValues(
          parseTimeValue(left.entry),
          parseTimeValue(right.entry),
          sortDirection,
        );
      case 'permanence':
        return compareValues(
          parseDurationValue(left.permanence),
          parseDurationValue(right.permanence),
          sortDirection,
        );
      case 'status':
        return compareValues(
          STATUS_SORT_ORDER[left.status] ?? Number.POSITIVE_INFINITY,
          STATUS_SORT_ORDER[right.status] ?? Number.POSITIVE_INFINITY,
          sortDirection,
        );
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const safeTotalPages = Math.max(1, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalCount = data.items.length;
  const shownCount = paginatedItems.length;
  const displayLabel = data.totalLabel
    .replace('{shown}', String(shownCount))
    .replace('{total}', String(totalCount));

  return (
    <Container>
      <Header>
        <div>
          <HeaderTitle>{data.title}</HeaderTitle>
          <Legend>
            {data.statusLegend.map((item) => (
              <LegendItem key={item.label} color={item.color}>
                {item.label}
              </LegendItem>
            ))}
          </Legend>
        </div>

        <Toolbar>
          <SearchField>
            <Search size={14} />
            <input
              placeholder={data.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchField>

          <div style={{ position: 'relative' }}>
            <FilterButton
              type="button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={14} />
              {statusFilter}
            </FilterButton>

            {showFilterMenu && (
              <FilterMenu>
                {(data.filterOptions || ['Todos os status']).map((option) => (
                  <FilterMenuOption
                    key={option}
                    isActive={statusFilter === option}
                    onClick={() => {
                      setStatusFilter(option);
                      setShowFilterMenu(false);
                    }}
                  >
                    {option}
                  </FilterMenuOption>
                ))}
              </FilterMenu>
            )}
          </div>
        </Toolbar>
      </Header>

      {data.items.length === 0 ? (
        <EmptyState
          title="Não há alunos cadastrados"
          description="Quando o banco receber registros, a lista em tempo real será exibida aqui."
        />
      ) : (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                {data.columns.map((column) => (
                  <th
                    key={column.key}
                    aria-sort={sortKey === column.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    {column.key === 'action' ? (
                      <HeaderLabel>{column.label}</HeaderLabel>
                    ) : (
                      <SortButton
                        type="button"
                        onClick={() => {
                          setSortKey(column.key);
                          setSortDirection((currentDirection) =>
                            sortKey === column.key && currentDirection === 'asc'
                              ? 'desc'
                              : 'asc',
                          );
                        }}
                      >
                        <span>{column.label}</span>
                        {sortKey === column.key ? (
                          sortDirection === 'asc' ? (
                            <ArrowUpAZ size={14} />
                          ) : (
                            <ArrowDownAZ size={14} />
                          )
                        ) : null}
                      </SortButton>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedItems.map((student) => (
                <StudentRow key={student.id} absent={student.status === 'Ausente'}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img
                        src={student.avatar}
                        alt={student.name}
                        style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                      />
                      <strong style={{ display: 'block', minWidth: 0 }}>{student.name}</strong>
                    </div>
                  </td>
                  <td>{student.registration}</td>
                  <td>{student.entry}</td>
                  <td>{student.permanence}</td>
                  <td>
                    <Status status={student.status}>{student.status}</Status>
                  </td>
                  <td>
                    <button type="button" aria-label={`Editar ${student.name}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1E6BD6', fontWeight: 600 }}>
                      <PencilLine size={14} />
                      Ajustar
                    </button>
                  </td>
                </StudentRow>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}

      <Footer>
        <Count>{displayLabel}</Count>

        <Pagination>
          <PaginationButton
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft size={14} />
            {data.previousLabel}
          </PaginationButton>

          <PaginationButton
            type="button"
            disabled={currentPage === safeTotalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {data.nextLabel}
            <ChevronRight size={14} />
          </PaginationButton>
        </Pagination>
      </Footer>
    </Container>
  );
}
