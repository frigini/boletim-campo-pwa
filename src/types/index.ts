export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface BoletimCampo {
  id: string;
  numero: string;
  data: string;
  
  // Cabeçalho
  cliente: string;
  solicitante: string;
  equipamento: string;
  om: string;
  gerencia: string;
  
  // Status do Andaime
  andaimeMontado: boolean;
  andaimeDesmontado: boolean;
  
  // Descrição dos Serviços
  descricaoServicos: string;
  
  // Apropriação de Andaimes - Montagem
  montagemData: string;
  montagemHoraInicial: string;
  montagemHoraFinal: string;
  montagemSolicitante: string;
  montagemMatricula: string;
  
  // Apropriação de Andaimes - Desmontagem
  desmontagemData: string;
  desmontagemHoraInicial: string;
  desmontagemHoraFinal: string;
  desmontagemSolicitante: string;
  desmontagemMatricula: string;
  
  // Tipo de Andaime
  andaimeConvencional: boolean;
  andaimeEspecial: boolean;
  
  // Tipos específicos de andaime
  escoramento: boolean;
  torreAcima5m: boolean;
  passarela: boolean;
  balancim: boolean;
  escada: boolean;
  torreAbaixo5m: boolean;
  linhaDeVida: boolean;
  pauDeCarga: boolean;
  espacoConfinado: boolean;
  guardaCorpo: boolean;
  rodizio: boolean;
  barraca: boolean;
  
  // Dimensões do Andaime
  comprimento: string;
  largura: string;
  altura: string;
  quantidade: string;
  
  // Horas à Disposição (Equipe/Hora)
  disposicaoData: string;
  disposicaoHoraInicial: string;
  disposicaoHoraFinal: string;
  
  // Solicitante do Serviço
  solicitanteServico: string;
  matriculaSolicitante: string;
  
  // Equipe Disponível
  liderMontagem: boolean;
  montador: boolean;
  
  // Observações
  observacoes: string;
  
  // Responsáveis (Assinaturas)
  responsavelEngeval: string;
  responsavelContratante: string;
  
  // Metadados
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  isLoading: boolean;
}
