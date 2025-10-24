import jsPDF from 'jspdf';
import { BoletimCampo } from '../types';

export const generateBoletimPDF = (boletim: BoletimCampo) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    let yPosition = margin;

    // Função auxiliar para adicionar texto
    const addText = (text: string, x: number, y: number, fontSize = 9, style: 'normal' | 'bold' = 'normal') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', style);
      pdf.text(text, x, y);
    };

    // Função auxiliar para adicionar retângulo
    const addRect = (x: number, y: number, width: number, height: number, fill = false, stroke = true) => {
      if (fill) {
        pdf.setFillColor(220, 220, 220);
        pdf.rect(x, y, width, height, 'F');
      }
      if (stroke) {
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(x, y, width, height);
      }
    };

    // Função para adicionar checkbox
    const addCheckbox = (x: number, y: number, checked: boolean, size = 3) => {
      pdf.rect(x, y, size, size);
      if (checked) {
        addText('X', x + 0.5, y + 2.2, 8, 'bold');
      }
    };

    // Função para formatar data
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
      } catch {
        return dateString;
      }
    };

    // Cabeçalho azul escuro (como no original)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 45, 'F');
    
    // Logo ENGEVAL (área branca à esquerda)
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin + 3, yPosition + 3, 90, 39, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.rect(margin + 3, yPosition + 3, 90, 39);
    
    // Tentar usar logo real
    try {
      pdf.addImage('/engeval-logo.png', 'PNG', margin + 8, yPosition + 8, 35, 20);
    } catch (error) {
      // Fallback: logo simplificado
      const logoX = margin + 10;
      const logoY = yPosition + 10;
      
      pdf.setFillColor(0, 188, 212);
      pdf.rect(logoX, logoY, 20, 3, 'F');
      pdf.rect(logoX, logoY + 4, 18, 3, 'F');
      pdf.rect(logoX, logoY + 8, 16, 3, 'F');
      pdf.rect(logoX, logoY + 12, 14, 3, 'F');
      
      pdf.setFillColor(55, 71, 79);
      pdf.rect(logoX + 25, logoY, 5, 18, 'F');
    }
    
    pdf.setTextColor(0, 0, 0);
    addText('ENGEVAL', margin + 10, yPosition + 32, 8, 'bold');
    addText('SERVIÇOS E ENGENHARIA LTDA', margin + 8, yPosition + 38, 6);
    
    // Informações centrais (texto branco)
    pdf.setTextColor(255, 255, 255);
    const centerX = margin + 120;
    addText('BOLETIM DE MEDIÇÃO DE CAMPO - Versão 00 - 15/03/2022', centerX, yPosition + 8, 8, 'bold');
    addText('ENGEVAL SERVIÇOS E ENGENHARIA LTDA', centerX, yPosition + 16, 8, 'bold');
    addText('CNPJ: 43.659.884/0001-01', centerX, yPosition + 24, 7);
    addText('END.: AV PAPAGAIOS, 50A VISTA Nº 050A', centerX, yPosition + 30, 7);
    addText('LINHARES / ES - CEP: 29.905-555', centerX, yPosition + 36, 7);
    addText('TEL: 27 99951-5881 - ENGEVAL.ENG@GMAIL.COM', centerX, yPosition + 42, 7);
    
    // Área do número (canto direito branco)
    pdf.setFillColor(255, 255, 255);
    pdf.rect(pageWidth - margin - 85, yPosition + 3, 82, 39, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(pageWidth - margin - 85, yPosition + 3, 82, 39);
    
    pdf.setTextColor(0, 0, 0);
    addText('BOLETIM DE MEDIÇÃO', pageWidth - margin - 80, yPosition + 12, 7, 'bold');
    addText('Nº', pageWidth - margin - 45, yPosition + 25, 9, 'bold');
    
    const now = new Date();
    const numeroAuto = `${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
    addText(boletim.numero || numeroAuto, pageWidth - margin - 50, yPosition + 35, 8);

    yPosition += 50;
    pdf.setTextColor(0, 0, 0);

    // Tabela de dados com medidas exatas
    const tableWidth = pageWidth - 2 * margin;
    const rowHeight = 18;
    
    // Primeira linha: Cliente e Equipamento
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.rect(margin, yPosition, tableWidth, rowHeight, 'D');
    pdf.line(margin + tableWidth/2, yPosition, margin + tableWidth/2, yPosition + rowHeight);
    
    addText('CLIENTE:', margin + 3, yPosition + 12, 8, 'bold');
    pdf.line(margin + 28, yPosition + 14, margin + tableWidth/2 - 3, yPosition + 14);
    addText(boletim.cliente || 'PETROBRAS S.A.', margin + 30, yPosition + 12, 8);
    
    addText('EQUIPAMENTO:', margin + tableWidth/2 + 3, yPosition + 12, 8, 'bold');
    pdf.line(margin + tableWidth/2 + 45, yPosition + 14, pageWidth - margin - 3, yPosition + 14);
    addText(boletim.equipamento || 'Plataforma P-70', margin + tableWidth/2 + 47, yPosition + 12, 8);
    
    yPosition += rowHeight;
    
    // Segunda linha: Solicitante e OM
    pdf.rect(margin, yPosition, tableWidth, rowHeight, 'D');
    pdf.line(margin + tableWidth/2, yPosition, margin + tableWidth/2, yPosition + rowHeight);
    
    addText('SOLICITANTE:', margin + 3, yPosition + 12, 8, 'bold');
    pdf.line(margin + 38, yPosition + 14, margin + tableWidth/2 - 3, yPosition + 14);
    addText(boletim.solicitante || 'João Silva Santos', margin + 40, yPosition + 12, 8);
    
    addText('OM:', margin + tableWidth/2 + 3, yPosition + 12, 8, 'bold');
    pdf.line(margin + tableWidth/2 + 18, yPosition + 14, pageWidth - margin - 3, yPosition + 14);
    addText(boletim.om || 'OM-001', margin + tableWidth/2 + 20, yPosition + 12, 8);
    
    yPosition += rowHeight;
    
    // Terceira linha: Gerência
    pdf.rect(margin, yPosition, tableWidth, rowHeight, 'D');
    
    addText('GERÊNCIA:', margin + 3, yPosition + 12, 8, 'bold');
    pdf.line(margin + 32, yPosition + 14, pageWidth - margin - 3, yPosition + 14);
    addText(boletim.gerencia || 'Gerência de Produção', margin + 34, yPosition + 12, 8);
    
    yPosition += rowHeight + 8;
    
    // Checkboxes de status do andaime
    addCheckbox(margin + 25, yPosition, boletim.andaimeMontado || true);
    addText('ANDAIME AINDA MONTADO', margin + 35, yPosition + 4, 8);
    
    addCheckbox(margin + 200, yPosition, boletim.andaimeDesmontado || false);
    addText('ANDAIME DESMONTADO', margin + 210, yPosition + 4, 8);
    
    yPosition += 18;
    
    // Descrição dos Serviços
    addText('DESCRIÇÃO DOS', margin + 3, yPosition + 8, 8, 'bold');
    addText('SERVIÇOS :', margin + 3, yPosition + 16, 8, 'bold');
    
    pdf.rect(margin + 60, yPosition, tableWidth - 60, 30, 'D');
    if (boletim.descricaoServicos) {
      addText(boletim.descricaoServicos, margin + 63, yPosition + 12, 8);
    }
    
    yPosition += 35;
    
    // APROPRIAÇÃO DE ANDAIMES (cabeçalho azul)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, tableWidth, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    addText('APROPRIAÇÃO DE ANDAIMES', margin + 180, yPosition + 10, 10, 'bold');
    pdf.setTextColor(0, 0, 0);
    
    yPosition += 15;
    
    // Tabela de Apropriação - Cabeçalhos
    const col1 = tableWidth * 0.15; // DATA
    const col2 = tableWidth * 0.2;  // HORA INICIAL
    const col3 = tableWidth * 0.2;  // HORA FINAL
    const col4 = tableWidth * 0.15; // DATA
    const col5 = tableWidth * 0.15; // HORA INICIAL
    const col6 = tableWidth * 0.15; // HORA FINAL
    
    // Cabeçalhos principais sem fundo cinza
    addRect(margin, yPosition, col1 + col2 + col3, 15, false);
    addRect(margin + col1 + col2 + col3, yPosition, col4 + col5 + col6, 15, false);
    
    addText('MONTAGEM', margin + (col1 + col2 + col3)/2 - 20, yPosition + 10, 9, 'bold');
    addText('DESMONTAGEM', margin + col1 + col2 + col3 + (col4 + col5 + col6)/2 - 25, yPosition + 10, 9, 'bold');
    
    yPosition += 15;
    
    // Sub-cabeçalhos
    addRect(margin, yPosition, col1, 12);
    addText('DATA', margin + col1/2 - 8, yPosition + 8, 8, 'bold');
    
    addRect(margin + col1, yPosition, col2, 12);
    addText('HORA INICIAL', margin + col1 + col2/2 - 18, yPosition + 8, 8, 'bold');
    
    addRect(margin + col1 + col2, yPosition, col3, 12);
    addText('HORA FINAL', margin + col1 + col2 + col3/2 - 16, yPosition + 8, 8, 'bold');
    
    addRect(margin + col1 + col2 + col3, yPosition, col4, 12);
    addText('DATA', margin + col1 + col2 + col3 + col4/2 - 8, yPosition + 8, 8, 'bold');
    
    addRect(margin + col1 + col2 + col3 + col4, yPosition, col5, 12);
    addText('HORA INICIAL', margin + col1 + col2 + col3 + col4 + col5/2 - 18, yPosition + 8, 8, 'bold');
    
    addRect(margin + col1 + col2 + col3 + col4 + col5, yPosition, col6, 12);
    addText('HORA FINAL', margin + col1 + col2 + col3 + col4 + col5 + col6/2 - 16, yPosition + 8, 8, 'bold');
    
    yPosition += 12;
    
    // Dados da tabela com linhas de preenchimento
    addRect(margin, yPosition, col1, 18);
    const dataText = formatDate(boletim.montagemData) || '';
    addText(dataText, margin + 5, yPosition + 12, 8);
    if (!dataText) {
      addText('___/___/___', margin + 5, yPosition + 12, 8);
    }
    
    addRect(margin + col1, yPosition, col2, 18);
    const horaIni = boletim.montagemHoraInicial || '';
    addText(horaIni, margin + col1 + 15, yPosition + 12, 8);
    if (!horaIni) {
      addText('___:___', margin + col1 + 15, yPosition + 12, 8);
    }
    
    addRect(margin + col1 + col2, yPosition, col3, 18);
    const horaFim = boletim.montagemHoraFinal || '';
    addText(horaFim, margin + col1 + col2 + 15, yPosition + 12, 8);
    if (!horaFim) {
      addText('___:___', margin + col1 + col2 + 15, yPosition + 12, 8);
    }
    
    addRect(margin + col1 + col2 + col3, yPosition, col4, 18);
    const dataDesMont = formatDate(boletim.desmontagemData) || '';
    addText(dataDesMont, margin + col1 + col2 + col3 + 5, yPosition + 12, 8);
    if (!dataDesMont) {
      addText('___/___/___', margin + col1 + col2 + col3 + 5, yPosition + 12, 8);
    }
    
    addRect(margin + col1 + col2 + col3 + col4, yPosition, col5, 18);
    const horaIniDes = boletim.desmontagemHoraInicial || '';
    addText(horaIniDes, margin + col1 + col2 + col3 + col4 + 10, yPosition + 12, 8);
    if (!horaIniDes) {
      addText('___:___', margin + col1 + col2 + col3 + col4 + 10, yPosition + 12, 8);
    }
    
    addRect(margin + col1 + col2 + col3 + col4 + col5, yPosition, col6, 18);
    const horaFimDes = boletim.desmontagemHoraFinal || '';
    addText(horaFimDes, margin + col1 + col2 + col3 + col4 + col5 + 10, yPosition + 12, 8);
    if (!horaFimDes) {
      addText('___:___', margin + col1 + col2 + col3 + col4 + col5 + 10, yPosition + 12, 8);
    }
    
    // Linha de assinatura na tabela de apropriação
    yPosition += 5;
    
    // Primeira linha de assinatura (Solicitante e Matrícula)
    addRect(margin, yPosition, col1 + col2 + col3, 15);
    pdf.line(margin + (col1 + col2 + col3)/2, yPosition, margin + (col1 + col2 + col3)/2, yPosition + 15);
    
    addText('SOLICITANTE', margin + 5, yPosition + 10, 8, 'bold');
    addText('MATRÍCULA', margin + (col1 + col2 + col3)/2 + 5, yPosition + 10, 8, 'bold');
    
    // Linha de preenchimento para solicitante
    pdf.line(margin + 35, yPosition + 12, margin + (col1 + col2 + col3)/2 - 5, yPosition + 12);
    pdf.line(margin + (col1 + col2 + col3)/2 + 30, yPosition + 12, margin + col1 + col2 + col3 - 5, yPosition + 12);
    
    addRect(margin + col1 + col2 + col3, yPosition, col4 + col5 + col6, 15);
    pdf.line(margin + col1 + col2 + col3 + (col4 + col5 + col6)/2, yPosition, margin + col1 + col2 + col3 + (col4 + col5 + col6)/2, yPosition + 15);
    
    addText('SOLICITANTE', margin + col1 + col2 + col3 + 5, yPosition + 10, 8, 'bold');
    addText('MATRÍCULA', margin + col1 + col2 + col3 + (col4 + col5 + col6)/2 + 5, yPosition + 10, 8, 'bold');
    
    // Linha de preenchimento para solicitante desmontagem
    pdf.line(margin + col1 + col2 + col3 + 35, yPosition + 12, margin + col1 + col2 + col3 + (col4 + col5 + col6)/2 - 5, yPosition + 12);
    pdf.line(margin + col1 + col2 + col3 + (col4 + col5 + col6)/2 + 30, yPosition + 12, margin + tableWidth - 5, yPosition + 12);
    
    yPosition += 20;

    // Seção Tipo de Andaime (fundo azul escuro)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, tableWidth, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    addText('TIPO DE ANDAIME', margin + 80, yPosition + 8, 10, 'bold');
    pdf.setTextColor(0, 0, 0);
    yPosition += 12;
    
    // Layout correto TIPO DE ANDAIME - linha superior com categorias
    const colWidth = tableWidth / 4;
    
    // Linha superior: ANDAIME CONVENCIONAL e ANDAIME ESPECIAL
    addRect(margin, yPosition, colWidth * 2, 12);
    addRect(margin + colWidth * 2, yPosition, colWidth * 2, 12);
    
    addCheckbox(margin + 5, yPosition + 3, boletim.andaimeConvencional);
    addText('ANDAIME CONVENCIONAL', margin + 15, yPosition + 8, 8, 'bold');
    
    addCheckbox(margin + colWidth * 2 + 5, yPosition + 3, boletim.andaimeEspecial);
    addText('ANDAIME ESPECIAL', margin + colWidth * 2 + 15, yPosition + 8, 8, 'bold');
    
    yPosition += 12;
    
    // Linha horizontal separadora
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 5;
    
    // Grid de checkboxes (4 colunas como no original)
    const checkboxes = [
      { text: 'ESCORAMENTO', checked: boletim.escoramento },
      { text: 'TORRE ACIMA 5 M', checked: boletim.torreAcima5m },
      { text: 'PASSARELA', checked: boletim.passarela },
      { text: 'BALANCIM', checked: boletim.balancim },
      { text: 'ESCADA', checked: boletim.escada },
      { text: 'TORRE ABAIXO 5 M', checked: boletim.torreAbaixo5m },
      { text: 'LINHA DE VIDA', checked: boletim.linhaDeVida },
      { text: 'PAU DE CARGA', checked: boletim.pauDeCarga },
      { text: 'ESPAÇO CONFINADO', checked: boletim.espacoConfinado },
      { text: 'GUARDA CORPO', checked: boletim.guardaCorpo },
      { text: '', checked: false },
      { text: 'BARRACA', checked: boletim.barraca }
    ];
    
    for (let i = 0; i < checkboxes.length; i += 4) {
      for (let j = 0; j < 4 && i + j < checkboxes.length; j++) {
        const item = checkboxes[i + j];
        const x = margin + 5 + j * colWidth;
        if (item.text) {
          addCheckbox(x, yPosition + 2, item.checked);
          addText(item.text, x + 10, yPosition + 5, 7);
        }
      }
      yPosition += 12;
    }
    
    // Fim da seção TIPO DE ANDAIME
    yPosition += 15;
    
    // DIMENSÕES DO ANDAIME (fundo azul escuro)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, tableWidth, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    addText('DIMENSÕES DO ANDAIME', margin + 75, yPosition + 8, 10, 'bold');
    pdf.setTextColor(0, 0, 0);
    yPosition += 12;
    
    // Campos de dimensões em linha
    const dimWidth = tableWidth / 4;
    addRect(margin, yPosition, dimWidth, 15);
    addText('COMPRIMENTO:', margin + 2, yPosition + 5, 7, 'bold');
    addText('___________', margin + 2, yPosition + 11, 8);
    
    addRect(margin + dimWidth, yPosition, dimWidth, 15);
    addText('LARGURA:', margin + dimWidth + 2, yPosition + 5, 7, 'bold');
    addText('___________', margin + dimWidth + 2, yPosition + 11, 8);
    
    addRect(margin + 2 * dimWidth, yPosition, dimWidth, 15);
    addText('ALTURA:', margin + 2 * dimWidth + 2, yPosition + 5, 7, 'bold');
    addText('___________', margin + 2 * dimWidth + 2, yPosition + 11, 8);
    
    addRect(margin + 3 * dimWidth, yPosition, dimWidth, 15);
    addText('QUANTIDADE:', margin + 3 * dimWidth + 2, yPosition + 5, 7, 'bold');
    addText('___________', margin + 3 * dimWidth + 2, yPosition + 11, 8);
    
    yPosition += 20;
    
    // HORAS À DISPOSIÇÃO (EQUIPE/HORA) (fundo azul escuro)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, tableWidth, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    addText('HORAS À DISPOSIÇÃO (EQUIPE/HORA)', margin + 60, yPosition + 8, 10, 'bold');
    pdf.setTextColor(0, 0, 0);
    yPosition += 12;
    
    // Campos de horas em linha
    const horasWidth = tableWidth / 3;
    addRect(margin, yPosition, horasWidth, 15);
    addText('DATA:', margin + 2, yPosition + 10, 8, 'bold');
    addText('___________', margin + 25, yPosition + 10, 8);
    
    addRect(margin + horasWidth, yPosition, horasWidth, 15);
    addText('HORA INICIAL:', margin + horasWidth + 2, yPosition + 10, 8, 'bold');
    addText('___:___', margin + horasWidth + 45, yPosition + 10, 8);
    
    addRect(margin + 2 * horasWidth, yPosition, horasWidth, 15);
    addText('HORA FINAL:', margin + 2 * horasWidth + 2, yPosition + 10, 8, 'bold');
    addText('___:___', margin + 2 * horasWidth + 40, yPosition + 10, 8);
    
    yPosition += 20;
    
    // SOLICITANTE DO SERVIÇO e EQUIPE DISPONÍVEL (fundo azul escuro)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, tableWidth/2, 12, 'F');
    pdf.rect(margin + tableWidth/2, yPosition, tableWidth/2, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    addText('SOLICITANTE DO SERVIÇO', margin + 30, yPosition + 8, 9, 'bold');
    addText('EQUIPE DISPONÍVEL', margin + tableWidth/2 + 30, yPosition + 8, 9, 'bold');
    pdf.setTextColor(0, 0, 0);
    yPosition += 12;
    
    // Campos de solicitante e equipe
    const solWidth = tableWidth / 2;
    addRect(margin, yPosition, solWidth, 25);
    addText('SOLICITANTE', margin + 5, yPosition + 8, 8, 'bold');
    addText('MATRÍCULA', margin + 5, yPosition + 18, 8, 'bold');
    pdf.line(margin + 50, yPosition + 10, margin + solWidth - 5, yPosition + 10);
    pdf.line(margin + 40, yPosition + 20, margin + solWidth - 5, yPosition + 20);
    
    addRect(margin + solWidth, yPosition, solWidth, 25);
    addCheckbox(margin + solWidth + 10, yPosition + 5, false);
    addText('LÍDER DE MONTAGEM (S)', margin + solWidth + 20, yPosition + 8, 8);
    addCheckbox(margin + solWidth + 10, yPosition + 15, false);
    addText('MONTADOR (S)', margin + solWidth + 20, yPosition + 18, 8);
    
    yPosition += 30;
    
    // OBSERVAÇÕES (fundo azul escuro)
    pdf.setFillColor(41, 57, 85);
    pdf.rect(margin, yPosition, tableWidth, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    addText('OBSERVAÇÕES', margin + 80, yPosition + 8, 10, 'bold');
    pdf.setTextColor(0, 0, 0);
    yPosition += 12;
    
    // Área de observações com linhas
    const obsHeight = 60;
    addRect(margin, yPosition, tableWidth, obsHeight);
    for (let i = 1; i < 5; i++) {
      pdf.line(margin, yPosition + (obsHeight/5) * i, margin + tableWidth, yPosition + (obsHeight/5) * i);
    }
    
    yPosition += obsHeight + 10;
    
    // Área de assinaturas com fundo cinza
    pdf.setFillColor(220, 220, 220);
    pdf.rect(margin, yPosition, tableWidth, 40, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(margin, yPosition, tableWidth, 40);
    
    // Divisão vertical no meio
    pdf.line(margin + tableWidth/2, yPosition, margin + tableWidth/2, yPosition + 40);
    
    pdf.setTextColor(0, 0, 0);
    addText('RESPONSÁVEL ENGEVAL', margin + tableWidth/4 - 30, yPosition + 35, 9, 'bold');
    addText('RESPONSÁVEL CONTRATANTE', margin + 3*tableWidth/4 - 35, yPosition + 35, 9, 'bold');
    
    yPosition += 45;
    
    // Rodapé final
    yPosition = pageHeight - 15;
    addText('BMC - ANDAIME V0 - ENGEVAL', margin, yPosition, 8);
    addText('Página 1', pageWidth - 30, yPosition, 8);

    // Salvar PDF
    const fileName = `Boletim_${boletim.numero || 'SN'}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar PDF. Verifique os dados do boletim.');
  }
};

export default generateBoletimPDF;
