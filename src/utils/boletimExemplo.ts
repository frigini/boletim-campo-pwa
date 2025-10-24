import { BoletimCampo } from '../types';

export const boletimExemplo: BoletimCampo = {
  id: 'exemplo-001',
  numero: '102024',
  data: '2024-10-24',
  
  // Cabeçalho
  cliente: 'PETROBRAS S.A.',
  solicitante: 'João Silva Santos',
  equipamento: 'Plataforma P-70',
  om: 'OM-001',
  gerencia: 'Gerência de Produção',
  
  // Status do Andaime
  andaimeMontado: true,
  andaimeDesmontado: true,
  
  // Descrição dos Serviços
  descricaoServicos: 'Andaime instalado conforme procedimento de segurança NR-18. Todas as verificações estruturais foram realizadas e aprovadas pela equipe técnica. Estrutura testada para carga máxima de trabalho. Equipamentos de proteção individual verificados e em conformidade com as normas vigentes.',
  
  // Apropriação de Andaimes - Montagem
  montagemData: '2024-10-22',
  montagemHoraInicial: '08:00',
  montagemHoraFinal: '12:00',
  montagemSolicitante: 'João Silva Santos',
  montagemMatricula: '12345',
  
  // Apropriação de Andaimes - Desmontagem
  desmontagemData: '2024-10-24',
  desmontagemHoraInicial: '14:00',
  desmontagemHoraFinal: '17:00',
  desmontagemSolicitante: 'Maria Oliveira',
  desmontagemMatricula: '67890',
  
  // Tipo de Andaime
  andaimeConvencional: true,
  andaimeEspecial: true,
  
  // Tipos específicos de andaime - TODOS marcados para teste
  escoramento: true,
  torreAcima5m: true,
  passarela: true,
  balancim: true,
  escada: true,
  torreAbaixo5m: true,
  linhaDeVida: true,
  pauDeCarga: true,
  espacoConfinado: true,
  guardaCorpo: true,
  rodizio: true,
  barraca: true,
  
  // Dimensões do Andaime
  comprimento: '10,5m',
  largura: '3,2m',
  altura: '15,8m',
  quantidade: '25 peças',
  
  // Horas à Disposição (Equipe/Hora)
  disposicaoData: '2024-10-23',
  disposicaoHoraInicial: '07:30',
  disposicaoHoraFinal: '16:30',
  
  // Solicitante do Serviço
  solicitanteServico: 'Carlos Eduardo Silva',
  matriculaSolicitante: '98765',
  
  // Equipe Disponível
  liderMontagem: true,
  montador: true,
  
  // Observações
  observacoes: 'Trabalho executado conforme normas de segurança NR-18 e NR-35. Equipamentos verificados e aprovados pela equipe técnica. Área isolada adequadamente durante toda a operação. Estrutura testada para carga máxima de trabalho conforme especificações técnicas.',
  
  // Responsáveis (Assinaturas)
  responsavelEngeval: 'Carlos Eduardo Mendes',
  responsavelContratante: 'Ana Paula Oliveira',
  
  // Metadados
  userId: 'user-001',
  createdAt: new Date('2024-10-24T10:00:00'),
  updatedAt: new Date('2024-10-24T10:00:00'),
};

export default boletimExemplo;
