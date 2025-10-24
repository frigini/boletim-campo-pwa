import { BoletimCampo } from '../types';

export const generateBoletimHTMLToPDF = (boletim: BoletimCampo) => {
  // Gerar número automático
  const now = new Date();
  const numeroAuto = `${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Boletim de Medição de Campo</title>
      <style>
        @page {
          size: A4;
          margin: 10mm;
        }
        
        body {
          font-family: Arial, sans-serif;
          font-size: 9px;
          margin: 0;
          padding: 0;
          line-height: 1.2;
        }
        
        .header {
          background-color: #293955;
          color: white;
          padding: 8px;
          display: flex;
          align-items: center;
          height: 45px;
          margin-bottom: 2px;
        }
        
        .logo-area {
          background-color: white;
          color: black;
          padding: 8px;
          width: 90px;
          height: 39px;
          margin-right: 10px;
          border: 1px solid #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .logo {
          font-weight: bold;
          font-size: 8px;
        }
        
        .logo-sub {
          font-size: 6px;
          margin-top: 2px;
        }
        
        .info-area {
          flex: 1;
          padding: 0 10px;
        }
        
        .info-title {
          font-weight: bold;
          font-size: 8px;
          margin-bottom: 2px;
        }
        
        .info-line {
          font-size: 7px;
          margin-bottom: 1px;
        }
        
        .number-area {
          background-color: white;
          color: black;
          padding: 8px;
          width: 82px;
          height: 39px;
          border: 1px solid #000;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .number-title {
          font-weight: bold;
          font-size: 7px;
          margin-bottom: 5px;
        }
        
        .number-label {
          font-weight: bold;
          font-size: 9px;
          margin-bottom: 3px;
        }
        
        .number-value {
          font-size: 8px;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin: 5px 0;
        }
        
        .data-table td {
          border: 1px solid #000;
          padding: 3px;
          height: 18px;
          vertical-align: middle;
        }
        
        .data-table .label {
          font-weight: bold;
          width: 80px;
        }
        
        .data-table .value {
          border-bottom: 1px solid #000;
          padding-left: 5px;
        }
        
        .checkbox-area {
          margin: 8px 0;
          display: flex;
          gap: 50px;
        }
        
        .checkbox {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        
        .checkbox input {
          width: 12px;
          height: 12px;
        }
        
        .description-area {
          margin: 8px 0;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        
        .description-label {
          font-weight: bold;
          width: 60px;
          line-height: 1.4;
        }
        
        .description-box {
          flex: 1;
          border: 1px solid #000;
          height: 30px;
          padding: 3px;
        }
        
        .section-header {
          background-color: #293955;
          color: white;
          padding: 5px;
          text-align: center;
          font-weight: bold;
          font-size: 10px;
          margin: 5px 0 0 0;
        }
        
        .apropriacao-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .apropriacao-table th,
        .apropriacao-table td {
          border: 1px solid #000;
          padding: 3px;
          text-align: center;
          font-size: 8px;
        }
        
        .apropriacao-table th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        
        .apropriacao-main-header {
          font-weight: bold;
          font-size: 9px;
          padding: 8px;
        }
        
        .tipos-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid #000;
        }
        
        .tipos-header {
          background-color: white;
          border: 1px solid #000;
          padding: 8px;
          text-align: center;
          font-weight: bold;
        }
        
        .tipos-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5px;
          padding: 10px;
          border-top: 1px solid #000;
          grid-column: 1 / -1;
        }
        
        .dimensoes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        
        .dimensoes-item {
          border: 1px solid #000;
          padding: 5px;
          text-align: center;
        }
        
        .dimensoes-label {
          font-weight: bold;
          font-size: 7px;
          margin-bottom: 3px;
        }
        
        .dimensoes-line {
          border-bottom: 1px solid #000;
          height: 12px;
        }
        
        .horas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        
        .horas-item {
          border: 1px solid #000;
          padding: 5px;
          text-align: center;
        }
        
        .solicitante-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        
        .solicitante-item {
          border: 1px solid #000;
          padding: 8px;
        }
        
        .observacoes-area {
          border: 1px solid #000;
          height: 60px;
          position: relative;
        }
        
        .observacoes-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        
        .observacoes-line {
          border-bottom: 1px solid #000;
          height: 12px;
        }
        
        .assinaturas {
          background-color: #ddd;
          border: 1px solid #000;
          height: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 10px;
        }
        
        .assinatura-item {
          border-right: 1px solid #000;
          display: flex;
          align-items: end;
          justify-content: center;
          padding: 5px;
          font-weight: bold;
          font-size: 9px;
        }
        
        .assinatura-item:last-child {
          border-right: none;
        }
        
        .footer {
          position: fixed;
          bottom: 10mm;
          left: 10mm;
          right: 10mm;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
        }
      </style>
    </head>
    <body>
      <!-- Cabeçalho -->
      <div class="header">
        <div class="logo-area">
          <div class="logo">ENGEVAL</div>
          <div class="logo-sub">SERVIÇOS E ENGENHARIA LTDA</div>
        </div>
        
        <div class="info-area">
          <div class="info-title">BOLETIM DE MEDIÇÃO DE CAMPO - Versão 00 - 15/03/2022</div>
          <div class="info-title">ENGEVAL SERVIÇOS E ENGENHARIA LTDA</div>
          <div class="info-line">CNPJ: 43.659.884/0001-01</div>
          <div class="info-line">END.: AV PAPAGAIOS, 50A VISTA Nº 050A</div>
          <div class="info-line">LINHARES / ES - CEP: 29.905-555</div>
          <div class="info-line">TEL: 27 99951-5881 - ENGEVAL.ENG@GMAIL.COM</div>
        </div>
        
        <div class="number-area">
          <div class="number-title">BOLETIM DE MEDIÇÃO</div>
          <div class="number-label">Nº</div>
          <div class="number-value">${boletim.numero || numeroAuto}</div>
        </div>
      </div>
      
      <!-- Dados principais -->
      <table class="data-table">
        <tr>
          <td class="label">CLIENTE:</td>
          <td class="value">${boletim.cliente || 'PETROBRAS S.A.'}</td>
          <td class="label">EQUIPAMENTO:</td>
          <td class="value">${boletim.equipamento || 'Plataforma P-70'}</td>
        </tr>
        <tr>
          <td class="label">SOLICITANTE:</td>
          <td class="value">${boletim.solicitante || 'João Silva Santos'}</td>
          <td class="label">OM:</td>
          <td class="value">${boletim.om || 'OM-001'}</td>
        </tr>
        <tr>
          <td class="label">GERÊNCIA:</td>
          <td class="value" colspan="3">${boletim.gerencia || 'Gerência de Produção'}</td>
        </tr>
      </table>
      
      <!-- Checkboxes de status -->
      <div class="checkbox-area">
        <div class="checkbox">
          <input type="checkbox" ${boletim.andaimeMontado ? 'checked' : ''}>
          <span>ANDAIME AINDA MONTADO</span>
        </div>
        <div class="checkbox">
          <input type="checkbox" ${boletim.andaimeDesmontado ? 'checked' : ''}>
          <span>ANDAIME DESMONTADO</span>
        </div>
      </div>
      
      <!-- Descrição dos serviços -->
      <div class="description-area">
        <div class="description-label">DESCRIÇÃO DOS<br>SERVIÇOS :</div>
        <div class="description-box">${boletim.observacoes || ''}</div>
      </div>
      
      <!-- Apropriação de Andaimes -->
      <div class="section-header">APROPRIAÇÃO DE ANDAIMES</div>
      
      <table class="apropriacao-table">
        <tr>
          <th colspan="3" class="apropriacao-main-header">MONTAGEM</th>
          <th colspan="3" class="apropriacao-main-header">DESMONTAGEM</th>
        </tr>
        <tr>
          <th>DATA</th>
          <th>HORA INICIAL</th>
          <th>HORA FINAL</th>
          <th>DATA</th>
          <th>HORA INICIAL</th>
          <th>HORA FINAL</th>
        </tr>
        <tr>
          <td>${formatDate(boletim.montagemData) || '___/___/___'}</td>
          <td>${boletim.montagemHoraInicial || '___:___'}</td>
          <td>${boletim.montagemHoraFinal || '___:___'}</td>
          <td>${formatDate(boletim.desmontagemData) || '___/___/___'}</td>
          <td>${boletim.desmontagemHoraInicial || '___:___'}</td>
          <td>${boletim.desmontagemHoraFinal || '___:___'}</td>
        </tr>
        <tr>
          <td>SOLICITANTE</td>
          <td>MATRÍCULA</td>
          <td></td>
          <td>SOLICITANTE</td>
          <td>MATRÍCULA</td>
          <td></td>
        </tr>
      </table>
      
      <!-- Tipo de Andaime -->
      <div class="section-header">TIPO DE ANDAIME</div>
      
      <div class="tipos-grid">
        <div class="tipos-header">
          <input type="checkbox" ${boletim.andaimeConvencional ? 'checked' : ''}> ANDAIME CONVENCIONAL
        </div>
        <div class="tipos-header">
          <input type="checkbox" ${boletim.andaimeEspecial ? 'checked' : ''}> ANDAIME ESPECIAL
        </div>
        
        <div class="tipos-content">
          <div class="checkbox">
            <input type="checkbox" ${boletim.escoramento ? 'checked' : ''}> ESCORAMENTO
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.torreAcima5m ? 'checked' : ''}> TORRE ACIMA 5 M
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.passarela ? 'checked' : ''}> PASSARELA
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.balancim ? 'checked' : ''}> BALANCIM
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.escada ? 'checked' : ''}> ESCADA
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.torreAbaixo5m ? 'checked' : ''}> TORRE ABAIXO 5 M
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.linhaDeVida ? 'checked' : ''}> LINHA DE VIDA
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.pauDeCarga ? 'checked' : ''}> PAU DE CARGA
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.espacoConfinado ? 'checked' : ''}> ESPAÇO CONFINADO
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.guardaCorpo ? 'checked' : ''}> GUARDA CORPO
          </div>
          <div class="checkbox">
            <input type="checkbox"> 
          </div>
          <div class="checkbox">
            <input type="checkbox" ${boletim.barraca ? 'checked' : ''}> BARRACA
          </div>
        </div>
      </div>
      
      <!-- Dimensões do Andaime -->
      <div class="section-header">DIMENSÕES DO ANDAIME</div>
      <div class="dimensoes-grid">
        <div class="dimensoes-item">
          <div class="dimensoes-label">COMPRIMENTO:</div>
          <div class="dimensoes-line"></div>
        </div>
        <div class="dimensoes-item">
          <div class="dimensoes-label">LARGURA:</div>
          <div class="dimensoes-line"></div>
        </div>
        <div class="dimensoes-item">
          <div class="dimensoes-label">ALTURA:</div>
          <div class="dimensoes-line"></div>
        </div>
        <div class="dimensoes-item">
          <div class="dimensoes-label">QUANTIDADE:</div>
          <div class="dimensoes-line"></div>
        </div>
      </div>
      
      <!-- Horas à Disposição -->
      <div class="section-header">HORAS À DISPOSIÇÃO (EQUIPE/HORA)</div>
      <div class="horas-grid">
        <div class="horas-item">
          <div class="dimensoes-label">DATA:</div>
          <div class="dimensoes-line"></div>
        </div>
        <div class="horas-item">
          <div class="dimensoes-label">HORA INICIAL:</div>
          <div class="dimensoes-line"></div>
        </div>
        <div class="horas-item">
          <div class="dimensoes-label">HORA FINAL:</div>
          <div class="dimensoes-line"></div>
        </div>
      </div>
      
      <!-- Solicitante e Equipe -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
        <div class="section-header">SOLICITANTE DO SERVIÇO</div>
        <div class="section-header">EQUIPE DISPONÍVEL</div>
      </div>
      
      <div class="solicitante-grid">
        <div class="solicitante-item">
          <div style="margin-bottom: 8px;"><strong>SOLICITANTE</strong> ________________</div>
          <div><strong>MATRÍCULA</strong> ________________</div>
        </div>
        <div class="solicitante-item">
          <div class="checkbox" style="margin-bottom: 5px;">
            <input type="checkbox"> LÍDER DE MONTAGEM (S)
          </div>
          <div class="checkbox">
            <input type="checkbox"> MONTADOR (S)
          </div>
        </div>
      </div>
      
      <!-- Observações -->
      <div class="section-header">OBSERVAÇÕES</div>
      <div class="observacoes-area">
        <div class="observacoes-lines">
          <div class="observacoes-line"></div>
          <div class="observacoes-line"></div>
          <div class="observacoes-line"></div>
          <div class="observacoes-line"></div>
          <div class="observacoes-line"></div>
        </div>
      </div>
      
      <!-- Assinaturas -->
      <div class="assinaturas">
        <div class="assinatura-item">RESPONSÁVEL ENGEVAL</div>
        <div class="assinatura-item">RESPONSÁVEL CONTRATANTE</div>
      </div>
      
      <!-- Rodapé -->
      <div class="footer">
        <span>BMC - ANDAIME V0 - ENGEVAL</span>
        <span>Página 1</span>
      </div>
    </body>
    </html>
  `;

  // Criar nova janela para imprimir
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Aguardar carregamento e imprimir
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  }
  
  return true;
};

export default generateBoletimHTMLToPDF;
