import { User, BoletimCampo } from '../types';

class LocalDatabaseService {
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      // Verificar se já existem dados, senão criar dados de exemplo
      const users = this.getUsers();

      if (users.length === 0) {
        await this.insertSampleData();
      }

      this.initialized = true;
    } catch (error) {
      console.error('Erro ao inicializar banco de dados:', error);
      throw error;
    }
  }

  private async insertSampleData(): Promise<void> {
    // Usuário de exemplo
    const sampleUser = {
      id: 'sample-user-123',
      email: 'admin@engeval.com',
      password: 'admin123',
      name: 'Administrador ENGEVAL',
      createdAt: new Date().toISOString()
    };

    const users = [sampleUser];
    localStorage.setItem('db_users', JSON.stringify(users));

    // Boletim de exemplo
    const sampleBoletim: BoletimCampo = {
      id: 'sample-boletim-123',
      userId: sampleUser.id,
      numero: '001/2024',
      data: '2024-10-23',
      cliente: 'PETROBRAS S.A.',
      solicitante: 'João Silva Santos',
      equipamento: 'Plataforma P-70',
      om: 'OM-001',
      gerencia: 'Gerência de Produção',
      andaimeConvencional: true,
      andaimeEspecial: false,
      andaimeMontado: true,
      andaimeDesmontado: false,
      montagemData: '2024-10-23',
      montagemHoraInicial: '08:00',
      montagemHoraFinal: '12:00',
      desmontagemData: '2024-10-25',
      desmontagemHoraInicial: '14:00',
      desmontagemHoraFinal: '17:00',
      escoramento: true,
      escada: false,
      espacoConfinado: false,
      torreAcima5m: true,
      torreAbaixo5m: false,
      guardaCorpo: true,
      passarela: false,
      linhaDeVida: false,
      balancim: false,
      pauDeCarga: false,
      barraca: false,
      comprimento: '15.5',
      largura: '8.2',
      altura: '12.0',
      quantidade: '2',
      disposicaoData: '2024-10-23',
      disposicaoHoraInicial: '08:00',
      disposicaoHoraFinal: '17:00',
      solicitanteServico: 'Maria Santos Costa',
      matriculaSolicitante: 'MAT-12345',
      liderMontagem: true,
      montador: true,
      observacoes: 'Andaime instalado conforme procedimento de segurança. Todas as verificações foram realizadas e aprovadas pela equipe técnica. Estrutura testada e liberada para uso.',
      responsavelEngeval: 'Carlos Eduardo Mendes',
      responsavelContratante: 'Ana Paula Oliveira',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const boletins = [sampleBoletim];
    localStorage.setItem('db_boletins', JSON.stringify(boletins));
  }

  private getUsers(): any[] {
    const users = localStorage.getItem('db_users');
    return users ? JSON.parse(users) : [];
  }

  private getBoletins(): BoletimCampo[] {
    const boletins = localStorage.getItem('db_boletins');
    return boletins ? JSON.parse(boletins).map((b: any) => ({
      ...b,
      createdAt: new Date(b.createdAt),
      updatedAt: new Date(b.updatedAt)
    })) : [];
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem('db_users', JSON.stringify(users));
  }

  private saveBoletins(boletins: BoletimCampo[]): void {
    localStorage.setItem('db_boletins', JSON.stringify(boletins));
  }

  // Métodos para usuários
  async createUser(user: Omit<User, 'createdAt'> & { password: string }): Promise<boolean> {
    try {
      const users = this.getUsers();
      
      // Verificar se usuário já existe
      if (users.find(u => u.email === user.email)) {
        return false;
      }

      const newUser = {
        ...user,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      this.saveUsers(users);
      return true;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return false;
    }
  }

  async getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      createdAt: new Date(user.createdAt)
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user || user.password !== password) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    };
  }

  // Métodos para boletins
  async createBoletim(boletim: BoletimCampo): Promise<boolean> {
    try {
      const boletins = this.getBoletins();
      boletins.push(boletim);
      this.saveBoletins(boletins);
      return true;
    } catch (error) {
      console.error('Erro ao criar boletim:', error);
      return false;
    }
  }

  async getBoletinsByUserId(userId: string): Promise<BoletimCampo[]> {
    const boletins = this.getBoletins();
    return boletins.filter(b => b.userId === userId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateBoletim(boletim: BoletimCampo): Promise<boolean> {
    try {
      const boletins = this.getBoletins();
      const index = boletins.findIndex(b => b.id === boletim.id);
      
      if (index === -1) return false;

      boletins[index] = {
        ...boletim,
        updatedAt: new Date()
      };
      
      this.saveBoletins(boletins);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar boletim:', error);
      return false;
    }
  }

  async deleteBoletim(id: string): Promise<boolean> {
    try {
      const boletins = this.getBoletins();
      const filteredBoletins = boletins.filter(b => b.id !== id);
      this.saveBoletins(filteredBoletins);
      return true;
    } catch (error) {
      console.error('Erro ao deletar boletim:', error);
      return false;
    }
  }
}

export const localDatabaseService = new LocalDatabaseService();
export default localDatabaseService;
