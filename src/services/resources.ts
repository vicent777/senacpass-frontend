import api from './api';

export interface Professor {
  id_professor: string;
  nome: string;
  email: string;
}

export interface Aluno {
  id_aluno: string;
  matricula_institucional: string;
  rfid_uid: string;
  nome: string;
  email: string;
}

export interface UnidadeCurricular {
  id_unidade_curricular: string;
  nome: string;
  carga_horaria: number;
}

export interface Turma {
  id_turma: string;
  codigo_turma: string;
  unidade_curricular: UnidadeCurricular;
  professor: Professor;
}

export interface Dispositivo {
  id_dispositivo: string;
  id_hardware: string;
  localizacao: string;
  ip: string;
  status: string;
  ultima_conexao: string;
}

export interface Aula {
  id_aula: string;
  turma: {
    id_turma: string;
    codigo_turma: string;
  };
  dispositivo: Dispositivo | null;
  data_aula: string;
  status: string;
  horario_inicio_previsto: string;
  horario_fim_previsto: string;
}

export interface InscricaoTurma {
  id_inscricao: string;
  aluno: Aluno;
  turma: {
    id_turma: string;
    codigo_turma: string;
  };
  data_inscricao: string;
  status: string;
}

export interface Presenca {
  id_presenca: string;
  aluno: Aluno;
  aula: {
    id_aula: string;
    status: string;
  };
  horario_checkin: string;
  horario_checkout: string | null;
  tempo_permanencia_minutos: number;
  status: string;
  justificativa_manual: string | null;
}

export interface LogAcesso {
  id_log: string;
  rfid_uid: string;
  dispositivo: Dispositivo;
  data_hora: string;
  tipo_evento: string;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

async function request<T>(method: 'get' | 'post' | 'put' | 'patch' | 'delete', url: string, data?: unknown) {
  const response = await api.request<T>({ method, url, data });
  return response.data;
}

export const publicApi = {
  loginProfessor: (data: { email: string; senha: string }) =>
    request<{ token: string }>('post', '/professores/login', data),

  listProfessores: () => request<Professor[]>('get', '/professores'),
  getProfessorById: (id: string | number) => request<Professor>('get', `/professores/${id}`),
  createProfessor: (data: Partial<Professor> & { senha?: string }) =>
    request<Professor>('post', '/professores', data),
  updateProfessor: (id: string | number, data: Partial<Professor> & { senha?: string }) =>
    request<Professor>('put', `/professores/${id}`, data),
  deleteProfessor: (id: string | number) => request<void>('delete', `/professores/${id}`),

  listPresencas: () => request<Presenca[]>('get', '/presencas'),
  getPresencaById: (id: string | number) => request<Presenca>('get', `/presencas/${id}`),
  createPresenca: (data: unknown) => request<Presenca>('post', '/presencas', data),

  listAcessoLogs: () => request<LogAcesso[]>('get', '/log-acessos'),
  createAcessoLog: (data: unknown) => request<LogAcesso>('post', '/log-acessos', data),
};

export const protectedApi = {
  listAlunos: () => request<Aluno[]>('get', '/alunos'),
  getAlunoById: (id: string | number) => request<Aluno>('get', `/alunos/${id}`),
  createAluno: (data: Partial<Aluno>) => request<Aluno>('post', '/alunos', data),
  updateAluno: (id: string | number, data: Partial<Aluno>) => request<Aluno>('put', `/alunos/${id}`, data),
  deleteAluno: (id: string | number) => request<void>('delete', `/alunos/${id}`),

  listTurmas: () => request<Turma[]>('get', '/turmas'),
  getTurmaById: (id: string | number) => request<Turma>('get', `/turmas/${id}`),
  listTurmasByProfessor: (idProfessor: string | number) =>
    request<Turma[]>('get', `/turmas/professor/${idProfessor}`),
  listAulasAtivasByProfessor: (idProfessor: string | number) =>
    request<Aula[]>('get', `/professores/${idProfessor}/aulas-ativas`),
  createTurma: (data: {
    codigo_turma: string;
    id_unidade_curricular: string;
    id_professor: string;
  }) => request<Turma>('post', '/turmas', data),
  updateTurma: (id: string | number, data: Partial<Turma>) => request<Turma>('put', `/turmas/${id}`, data),
  deleteTurma: (id: string | number) => request<void>('delete', `/turmas/${id}`),

  listAulas: () => request<Aula[]>('get', '/aulas'),
  getAulaById: (id: string | number) => request<Aula>('get', `/aulas/${id}`),
  listAulasByTurma: (idTurma: string | number) => request<Aula[]>('get', `/aulas/turma/${idTurma}`),
  getAulaAtiva: () => request<Aula>('get', '/aulas/status/ativa'),
  createAula: (data: unknown) => request<Aula>('post', '/aulas', data),
  updateAula: (id: string | number, data: unknown) => request<Aula>('put', `/aulas/${id}`, data),
  patchAulaStatus: (id: string | number, data: unknown) => request<Aula>('patch', `/aulas/${id}/status`, data),
  deleteAula: (id: string | number) => request<void>('delete', `/aulas/${id}`),

  listUnidadesCurriculares: () => request<UnidadeCurricular[]>('get', '/unidades-curriculares'),
  getUnidadeCurricularById: (id: string | number) =>
    request<UnidadeCurricular>('get', `/unidades-curriculares/${id}`),
  createUnidadeCurricular: (data: Partial<UnidadeCurricular>) =>
    request<UnidadeCurricular>('post', '/unidades-curriculares', data),
  updateUnidadeCurricular: (id: string | number, data: Partial<UnidadeCurricular>) =>
    request<UnidadeCurricular>('put', `/unidades-curriculares/${id}`, data),
  deleteUnidadeCurricular: (id: string | number) =>
    request<void>('delete', `/unidades-curriculares/${id}`),

  listInscricoesTurmas: () => request<InscricaoTurma[]>('get', '/inscricoes-turmas'),
  getInscricaoTurmaById: (id: string | number) =>
    request<InscricaoTurma>('get', `/inscricoes-turmas/${id}`),
  listInscricoesByAluno: (idAluno: string | number) =>
    request<InscricaoTurma[]>('get', `/inscricoes-turmas/aluno/${idAluno}`),
  listInscricoesByTurma: (idTurma: string | number) =>
    request<InscricaoTurma[]>('get', `/inscricoes-turmas/turma/${idTurma}`),
  createInscricaoTurma: (data: { id_aluno: string; id_turma: string }) =>
    request<InscricaoTurma>('post', '/inscricoes-turmas', data),
  patchInscricaoTurmaStatus: (id: string | number, data: unknown) =>
    request<InscricaoTurma>('patch', `/inscricoes-turmas/${id}/status`, data),
  deleteInscricaoTurma: (id: string | number) => request<void>('delete', `/inscricoes-turmas/${id}`),

  listDispositivos: () => request<Dispositivo[]>('get', '/dispositivos'),
  getDispositivoById: (id: string | number) => request<Dispositivo>('get', `/dispositivos/${id}`),
  createDispositivo: (data: Partial<Dispositivo>) => request<Dispositivo>('post', '/dispositivos', data),
  updateDispositivo: (id: string | number, data: Partial<Dispositivo>) =>
    request<Dispositivo>('put', `/dispositivos/${id}`, data),
  deleteDispositivo: (id: string | number) => request<void>('delete', `/dispositivos/${id}`),
};
