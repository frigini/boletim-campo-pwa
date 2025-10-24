import { BoletimCampo } from '../types';

const hoje = new Date();
const dataFormatada = hoje.toISOString().split('T')[0];

const boletimExemploCompleto: BoletimCampo = {
  // Identificação
  id: 'exemplo-' + Date.now(),
  numero: '2023-001',
  data: dataFormatada,
  
  // Cabeçalho
  cliente: 'Exemplo de Cliente Ltda',
  solicitante: 'João da Silva',
  equipamento: 'Andaime Multidirecional',
  om: 'OM-12345',
  gerencia: 'Gerência de Operações',
  
  // Status do Andaime
  andaimeMontado: true,
  andaimeDesmontado: true,
  
  // Descrição dos Serviços - Texto longo para teste
  descricaoServicos: 'SERVIÇO DE MONTAGEM E DESMONTAGEM DE ANDAIMES FACHADEIROS E METÁLICOS. '
    + 'Execução de montagem de andaime tubular metálico em estrutura metálica, com altura máxima de 12,00m, '
    + 'com plataformas de trabalho em prancha de madeira, escada de acesso, guarda-corpo e rodapé de segurança. '
    + 'Instalação de tela de proteção contra queda de materiais e sinalização de segurança. O serviço inclui também '
    + 'a desmontagem após o término dos trabalhos e limpeza do local. Serão utilizados equipamentos de proteção '
    + 'individual (EPI) e coletiva (EPC) conforme normas de segurança do trabalho.',
  
  // Apropriação de Andaimes - Montagem
  montagemData: dataFormatada,
  montagemHoraInicial: '08:00',
  montagemHoraFinal: '12:00',
  montagemSolicitante: 'Carlos Eduardo',
  montagemMatricula: 'MAT-789',
  
  // Apropriação de Andaimes - Desmontagem
  desmontagemData: dataFormatada,
  desmontagemHoraInicial: '16:00',
  desmontagemHoraFinal: '17:30',
  desmontagemSolicitante: 'Ana Paula',
  desmontagemMatricula: 'MAT-456',
  
  // Tipo de Andaime
  andaimeConvencional: true,
  andaimeEspecial: true,
  
  // Tipos específicos de andaime
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
  comprimento: '10,00',
  largura: '5,00',
  altura: '8,50',
  quantidade: '2',
  
  // Horas à Disposição (Equipe/Hora)
  disposicaoData: dataFormatada,
  disposicaoHoraInicial: '08:00',
  disposicaoHoraFinal: '18:00',
  
  // Solicitante do Serviço
  solicitanteServico: 'Engenheiro de Segurança do Trabalho Responsável',
  matriculaSolicitante: 'ENG-123',
  
  // Equipe Disponível
  liderMontagem: true,
  montador: true,
  
  // Observações - Texto longo para teste
  observacoes: 'OBSERVAÇÕES IMPORTANTES: 1) É obrigatório o uso de EPI completo por todos os envolvidos. 2) Área classificada como de risco elevado. 3) Realizar inspeção diária antes do início dos trabalhos. 4) Verificar condições climáticas. 5) Sinalizar área de trabalho. 6) Manter distância segura de redes elétricas. 7) Proibido fumar no local. 8) Em caso de emergência, acionar a brigada de incêndio. 9) Respeitar os limites de carga do andaime. 10) Manter o local limpo e organizado.',
  
  // Responsáveis (Assinaturas)
  responsavelEngeval: 'Eng. Responsável - CREA 123456/SP',
  responsavelContratante: 'Responsável Técnico - CREA 654321/SP',
  
  // Metadados
  userId: 'user-' + Date.now(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default boletimExemploCompleto;
