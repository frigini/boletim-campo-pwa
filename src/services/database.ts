import initSqlJs, { Database } from 'sql.js';
import { User, BoletimCampo } from '../types';

class DatabaseService {
  private db: Database | null = null;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`
      });

      // Tentar carregar banco existente do localStorage
      const savedDb = localStorage.getItem('sqlite-db');
      if (savedDb) {
        const uint8Array = new Uint8Array(JSON.parse(savedDb));
        this.db = new SQL.Database(uint8Array);
      } else {
        this.db = new SQL.Database();
        await this.createTables();
        await this.insertSampleData();
      }

      this.initialized = true;
    } catch (error) {
      console.error('Erro ao inicializar banco de dados:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Tabela de usuários
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de boletins
    this.db.run(`
      CREATE TABLE IF NOT EXISTS boletins (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        numero TEXT,
        data TEXT,
        cliente TEXT,
        solicitante TEXT,
        equipamento TEXT,
        om TEXT,
        gerencia TEXT,
        andaime_convencional BOOLEAN DEFAULT 0,
        andaime_especial BOOLEAN DEFAULT 0,
        andaime_montado BOOLEAN DEFAULT 0,
        andaime_desmontado BOOLEAN DEFAULT 0,
        montagem_data TEXT,
        montagem_hora_inicial TEXT,
        montagem_hora_final TEXT,
        desmontagem_data TEXT,
        desmontagem_hora_inicial TEXT,
        desmontagem_hora_final TEXT,
        escoramento BOOLEAN DEFAULT 0,
        escada BOOLEAN DEFAULT 0,
        espaco_confinado BOOLEAN DEFAULT 0,
        torre_acima_5m BOOLEAN DEFAULT 0,
        torre_abaixo_5m BOOLEAN DEFAULT 0,
        guarda_corpo BOOLEAN DEFAULT 0,
        passarela BOOLEAN DEFAULT 0,
        linha_de_vida BOOLEAN DEFAULT 0,
        balancim BOOLEAN DEFAULT 0,
        pau_de_carga BOOLEAN DEFAULT 0,
        barraca BOOLEAN DEFAULT 0,
        comprimento TEXT,
        largura TEXT,
        altura TEXT,
        quantidade TEXT,
        disposicao_data TEXT,
        disposicao_hora_inicial TEXT,
        disposicao_hora_final TEXT,
        solicitante_servico TEXT,
        matricula_solicitante TEXT,
        lider_montagem BOOLEAN DEFAULT 0,
        montador BOOLEAN DEFAULT 0,
        observacoes TEXT,
        responsavel_engeval TEXT,
        responsavel_contratante TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    this.saveDatabase();
  }

  private async insertSampleData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Usuário de exemplo
    const sampleUserId = 'sample-user-123';
    this.db.run(`
      INSERT INTO users (id, email, password, name) 
      VALUES (?, ?, ?, ?)
    `, [sampleUserId, 'admin@engeval.com', 'admin123', 'Administrador ENGEVAL']);

    // Boletim de exemplo
    const sampleBoletimId = 'sample-boletim-123';
    this.db.run(`
      INSERT INTO boletins (
        id, user_id, numero, data, cliente, solicitante, equipamento, om, gerencia,
        andaime_convencional, andaime_montado, montagem_data, montagem_hora_inicial, montagem_hora_final,
        desmontagem_data, desmontagem_hora_inicial, desmontagem_hora_final,
        escoramento, torre_acima_5m, guarda_corpo, comprimento, largura, altura, quantidade,
        disposicao_data, disposicao_hora_inicial, disposicao_hora_final,
        solicitante_servico, matricula_solicitante, lider_montagem, montador,
        observacoes, responsavel_engeval, responsavel_contratante
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      sampleBoletimId, sampleUserId, '001/2024', '2024-10-23', 
      'PETROBRAS S.A.', 'João Silva Santos', 'Plataforma P-70', 'OM-001', 'Gerência de Produção',
      1, 1, '2024-10-23', '08:00', '12:00',
      '2024-10-25', '14:00', '17:00',
      1, 1, 1, '15.5', '8.2', '12.0', '2',
      '2024-10-23', '08:00', '17:00',
      'Maria Santos Costa', 'MAT-12345', 1, 1,
      'Andaime instalado conforme procedimento de segurança. Todas as verificações foram realizadas e aprovadas pela equipe técnica.',
      'Carlos Eduardo Mendes', 'Ana Paula Oliveira'
    ]);

    this.saveDatabase();
  }

  private saveDatabase(): void {
    if (!this.db) return;
    
    const data = this.db.export();
    const buffer = Array.from(data);
    localStorage.setItem('sqlite-db', JSON.stringify(buffer));
  }

  // Métodos para usuários
  async createUser(user: Omit<User, 'createdAt'> & { password: string }): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      this.db.run(`
        INSERT INTO users (id, email, password, name) 
        VALUES (?, ?, ?, ?)
      `, [user.id, user.email, user.password, user.name]);
      
      this.saveDatabase();
      return true;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return false;
    }
  }

  async getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
    if (!this.db) throw new Error('Database not initialized');

    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    const result = stmt.getAsObject([email]);
    stmt.free();

    if (!result.id) return null;

    return {
      id: result.id as string,
      email: result.email as string,
      password: result.password as string,
      name: result.name as string,
      createdAt: new Date(result.created_at as string)
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
    if (!this.db) throw new Error('Database not initialized');

    try {
      this.db.run(`
        INSERT INTO boletins (
          id, user_id, numero, data, cliente, solicitante, equipamento, om, gerencia,
          andaime_convencional, andaime_especial, andaime_montado, andaime_desmontado,
          montagem_data, montagem_hora_inicial, montagem_hora_final,
          desmontagem_data, desmontagem_hora_inicial, desmontagem_hora_final,
          escoramento, escada, espaco_confinado, torre_acima_5m, torre_abaixo_5m,
          guarda_corpo, passarela, linha_de_vida, balancim, pau_de_carga, barraca,
          comprimento, largura, altura, quantidade,
          disposicao_data, disposicao_hora_inicial, disposicao_hora_final,
          solicitante_servico, matricula_solicitante, lider_montagem, montador,
          observacoes, responsavel_engeval, responsavel_contratante
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        boletim.id, boletim.userId, boletim.numero, boletim.data,
        boletim.cliente, boletim.solicitante, boletim.equipamento, boletim.om, boletim.gerencia,
        boletim.andaimeConvencional ? 1 : 0, boletim.andaimeEspecial ? 1 : 0,
        boletim.andaimeMontado ? 1 : 0, boletim.andaimeDesmontado ? 1 : 0,
        boletim.montagemData, boletim.montagemHoraInicial, boletim.montagemHoraFinal,
        boletim.desmontagemData, boletim.desmontagemHoraInicial, boletim.desmontagemHoraFinal,
        boletim.escoramento ? 1 : 0, boletim.escada ? 1 : 0, boletim.espacoConfinado ? 1 : 0,
        boletim.torreAcima5m ? 1 : 0, boletim.torreAbaixo5m ? 1 : 0, boletim.guardaCorpo ? 1 : 0,
        boletim.passarela ? 1 : 0, boletim.linhaDeVida ? 1 : 0, boletim.balancim ? 1 : 0,
        boletim.pauDeCarga ? 1 : 0, boletim.barraca ? 1 : 0,
        boletim.comprimento, boletim.largura, boletim.altura, boletim.quantidade,
        boletim.disposicaoData, boletim.disposicaoHoraInicial, boletim.disposicaoHoraFinal,
        boletim.solicitanteServico, boletim.matriculaSolicitante,
        boletim.liderMontagem ? 1 : 0, boletim.montador ? 1 : 0,
        boletim.observacoes, boletim.responsavelEngeval, boletim.responsavelContratante
      ]);

      this.saveDatabase();
      return true;
    } catch (error) {
      console.error('Erro ao criar boletim:', error);
      return false;
    }
  }

  async getBoletinsByUserId(userId: string): Promise<BoletimCampo[]> {
    if (!this.db) throw new Error('Database not initialized');

    const stmt = this.db.prepare('SELECT * FROM boletins WHERE user_id = ? ORDER BY created_at DESC');
    const results = stmt.getAsObject([userId]);
    stmt.free();

    const boletins: BoletimCampo[] = [];
    
    // Se há apenas um resultado, getAsObject retorna um objeto, não array
    if (results && typeof results === 'object' && results.id) {
      boletins.push(this.mapRowToBoletim(results));
    }

    // Para múltiplos resultados, precisamos usar um loop diferente
    const allStmt = this.db.prepare('SELECT * FROM boletins WHERE user_id = ? ORDER BY created_at DESC');
    while (allStmt.step()) {
      const row = allStmt.getAsObject();
      boletins.push(this.mapRowToBoletim(row));
    }
    allStmt.free();

    return boletins;
  }

  async updateBoletim(boletim: BoletimCampo): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      this.db.run(`
        UPDATE boletins SET
          numero = ?, data = ?, cliente = ?, solicitante = ?, equipamento = ?, om = ?, gerencia = ?,
          andaime_convencional = ?, andaime_especial = ?, andaime_montado = ?, andaime_desmontado = ?,
          montagem_data = ?, montagem_hora_inicial = ?, montagem_hora_final = ?,
          desmontagem_data = ?, desmontagem_hora_inicial = ?, desmontagem_hora_final = ?,
          escoramento = ?, escada = ?, espaco_confinado = ?, torre_acima_5m = ?, torre_abaixo_5m = ?,
          guarda_corpo = ?, passarela = ?, linha_de_vida = ?, balancim = ?, pau_de_carga = ?, barraca = ?,
          comprimento = ?, largura = ?, altura = ?, quantidade = ?,
          disposicao_data = ?, disposicao_hora_inicial = ?, disposicao_hora_final = ?,
          solicitante_servico = ?, matricula_solicitante = ?, lider_montagem = ?, montador = ?,
          observacoes = ?, responsavel_engeval = ?, responsavel_contratante = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        boletim.numero, boletim.data, boletim.cliente, boletim.solicitante, boletim.equipamento, boletim.om, boletim.gerencia,
        boletim.andaimeConvencional ? 1 : 0, boletim.andaimeEspecial ? 1 : 0,
        boletim.andaimeMontado ? 1 : 0, boletim.andaimeDesmontado ? 1 : 0,
        boletim.montagemData, boletim.montagemHoraInicial, boletim.montagemHoraFinal,
        boletim.desmontagemData, boletim.desmontagemHoraInicial, boletim.desmontagemHoraFinal,
        boletim.escoramento ? 1 : 0, boletim.escada ? 1 : 0, boletim.espacoConfinado ? 1 : 0,
        boletim.torreAcima5m ? 1 : 0, boletim.torreAbaixo5m ? 1 : 0, boletim.guardaCorpo ? 1 : 0,
        boletim.passarela ? 1 : 0, boletim.linhaDeVida ? 1 : 0, boletim.balancim ? 1 : 0,
        boletim.pauDeCarga ? 1 : 0, boletim.barraca ? 1 : 0,
        boletim.comprimento, boletim.largura, boletim.altura, boletim.quantidade,
        boletim.disposicaoData, boletim.disposicaoHoraInicial, boletim.disposicaoHoraFinal,
        boletim.solicitanteServico, boletim.matriculaSolicitante,
        boletim.liderMontagem ? 1 : 0, boletim.montador ? 1 : 0,
        boletim.observacoes, boletim.responsavelEngeval, boletim.responsavelContratante,
        boletim.id
      ]);

      this.saveDatabase();
      return true;
    } catch (error) {
      console.error('Erro ao atualizar boletim:', error);
      return false;
    }
  }

  async deleteBoletim(id: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      this.db.run('DELETE FROM boletins WHERE id = ?', [id]);
      this.saveDatabase();
      return true;
    } catch (error) {
      console.error('Erro ao deletar boletim:', error);
      return false;
    }
  }

  private mapRowToBoletim(row: any): BoletimCampo {
    return {
      id: row.id,
      userId: row.user_id,
      numero: row.numero || '',
      data: row.data || '',
      cliente: row.cliente || '',
      solicitante: row.solicitante || '',
      equipamento: row.equipamento || '',
      om: row.om || '',
      gerencia: row.gerencia || '',
      andaimeConvencional: Boolean(row.andaime_convencional),
      andaimeEspecial: Boolean(row.andaime_especial),
      andaimeMontado: Boolean(row.andaime_montado),
      andaimeDesmontado: Boolean(row.andaime_desmontado),
      montagemData: row.montagem_data || '',
      montagemHoraInicial: row.montagem_hora_inicial || '',
      montagemHoraFinal: row.montagem_hora_final || '',
      desmontagemData: row.desmontagem_data || '',
      desmontagemHoraInicial: row.desmontagem_hora_inicial || '',
      desmontagemHoraFinal: row.desmontagem_hora_final || '',
      escoramento: Boolean(row.escoramento),
      escada: Boolean(row.escada),
      espacoConfinado: Boolean(row.espaco_confinado),
      torreAcima5m: Boolean(row.torre_acima_5m),
      torreAbaixo5m: Boolean(row.torre_abaixo_5m),
      guardaCorpo: Boolean(row.guarda_corpo),
      passarela: Boolean(row.passarela),
      linhaDeVida: Boolean(row.linha_de_vida),
      balancim: Boolean(row.balancim),
      pauDeCarga: Boolean(row.pau_de_carga),
      barraca: Boolean(row.barraca),
      comprimento: row.comprimento || '',
      largura: row.largura || '',
      altura: row.altura || '',
      quantidade: row.quantidade || '',
      disposicaoData: row.disposicao_data || '',
      disposicaoHoraInicial: row.disposicao_hora_inicial || '',
      disposicaoHoraFinal: row.disposicao_hora_final || '',
      solicitanteServico: row.solicitante_servico || '',
      matriculaSolicitante: row.matricula_solicitante || '',
      liderMontagem: Boolean(row.lider_montagem),
      montador: Boolean(row.montador),
      observacoes: row.observacoes || '',
      responsavelEngeval: row.responsavel_engeval || '',
      responsavelContratante: row.responsavel_contratante || '',
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}

export const databaseService = new DatabaseService();
export default databaseService;
