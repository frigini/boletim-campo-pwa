import jsPDF from 'jspdf';
import { BoletimCampo } from '../types';

export const generateBoletimPDF = (boletim: BoletimCampo) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    let yPosition = margin;

    // Função auxiliar para adicionar texto
    const addText = (text: string, x: number, y: number, fontSize = 10, style: 'normal' | 'bold' = 'normal') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', style);
      pdf.text(text, x, y);
    };

    // Função auxiliar para adicionar retângulo
    const addRect = (x: number, y: number, width: number, height: number, fill = false) => {
      if (fill) {
        pdf.setFillColor(240, 240, 240);
        pdf.rect(x, y, width, height, 'F');
      } else {
        pdf.rect(x, y, width, height);
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

    // Cabeçalho da empresa
    addRect(margin, yPosition, pageWidth - 2 * margin, 25, true);
    
    // Título centralizado
    const centerX = pageWidth / 2;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    const titleWidth = pdf.getTextWidth('BOLETIM DE MEDIÇÃO DE CAMPO');
    pdf.text('BOLETIM DE MEDIÇÃO DE CAMPO', centerX - titleWidth/2, yPosition + 8);
    
    pdf.setFontSize(10);
    const companyWidth = pdf.getTextWidth('ENGEVAL SERVIÇOS E ENGENHARIA LTDA');
    pdf.text('ENGEVAL SERVIÇOS E ENGENHARIA LTDA', centerX - companyWidth/2, yPosition + 15);
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const cnpjWidth = pdf.getTextWidth('CNPJ: 43.659.884/0001-01');
    pdf.text('CNPJ: 43.659.884/0001-01', centerX - cnpjWidth/2, yPosition + 20);

    yPosition += 35;

    // Número do boletim
    addText(`Nº: ${boletim.numero || 'N/A'}`, pageWidth - 60, yPosition, 10, 'bold');
    yPosition += 15;

    // Informações básicas
    addText('INFORMAÇÕES GERAIS', margin, yPosition, 12, 'bold');
    yPosition += 10;

    const lineSpacing = 12;

    // Cliente
    addText(`Cliente: ${boletim.cliente || 'N/A'}`, margin, yPosition, 10);
    yPosition += lineSpacing;

    // Solicitante
    addText(`Solicitante: ${boletim.solicitante || 'N/A'}`, margin, yPosition, 10);
    yPosition += lineSpacing;

    // Equipamento
    addText(`Equipamento: ${boletim.equipamento || 'N/A'}`, margin, yPosition, 10);
    yPosition += lineSpacing;

    // Data
    addText(`Data: ${formatDate(boletim.data)}`, margin, yPosition, 10);
    yPosition += lineSpacing * 2;

    // Apropriação de Andaimes
    addText('APROPRIAÇÃO DE ANDAIMES', margin, yPosition, 12, 'bold');
    yPosition += 15;

    // Montagem
    if (boletim.montagemData) {
      addText('Montagem:', margin, yPosition, 10, 'bold');
      yPosition += 8;
      addText(`Data: ${formatDate(boletim.montagemData)}`, margin + 10, yPosition, 9);
      addText(`Hora: ${boletim.montagemHoraInicial || ''} às ${boletim.montagemHoraFinal || ''}`, margin + 80, yPosition, 9);
      yPosition += 12;
    }

    // Desmontagem
    if (boletim.desmontagemData) {
      addText('Desmontagem:', margin, yPosition, 10, 'bold');
      yPosition += 8;
      addText(`Data: ${formatDate(boletim.desmontagemData)}`, margin + 10, yPosition, 9);
      addText(`Hora: ${boletim.desmontagemHoraInicial || ''} às ${boletim.desmontagemHoraFinal || ''}`, margin + 80, yPosition, 9);
      yPosition += 15;
    }

    // Tipos de andaime
    addText('TIPOS DE ANDAIME', margin, yPosition, 12, 'bold');
    yPosition += 10;

    const tipos = [];
    if (boletim.andaimeConvencional) tipos.push('Convencional');
    if (boletim.andaimeEspecial) tipos.push('Especial');
    if (boletim.escoramento) tipos.push('Escoramento');
    if (boletim.escada) tipos.push('Escada');
    if (boletim.torreAcima5m) tipos.push('Torre Acima 5M');
    if (boletim.guardaCorpo) tipos.push('Guarda Corpo');

    if (tipos.length > 0) {
      addText(tipos.join(', '), margin, yPosition, 10);
      yPosition += 15;
    }

    // Dimensões
    if (boletim.comprimento || boletim.largura || boletim.altura) {
      addText('DIMENSÕES', margin, yPosition, 12, 'bold');
      yPosition += 10;
      
      const dimensoes = [];
      if (boletim.comprimento) dimensoes.push(`Comprimento: ${boletim.comprimento}m`);
      if (boletim.largura) dimensoes.push(`Largura: ${boletim.largura}m`);
      if (boletim.altura) dimensoes.push(`Altura: ${boletim.altura}m`);
      if (boletim.quantidade) dimensoes.push(`Quantidade: ${boletim.quantidade}`);
      
      addText(dimensoes.join(' | '), margin, yPosition, 10);
      yPosition += 15;
    }

    // Observações
    if (boletim.observacoes) {
      addText('OBSERVAÇÕES', margin, yPosition, 12, 'bold');
      yPosition += 10;
      
      // Quebrar texto longo
      const maxWidth = pageWidth - 2 * margin;
      const lines = pdf.splitTextToSize(boletim.observacoes, maxWidth);
      
      for (let i = 0; i < lines.length; i++) {
        if (yPosition > 250) { // Nova página se necessário
          pdf.addPage();
          yPosition = margin;
        }
        addText(lines[i], margin, yPosition, 9);
        yPosition += 6;
      }
      yPosition += 10;
    }

    // Responsáveis
    if (boletim.responsavelEngeval || boletim.responsavelContratante) {
      yPosition += 20;
      addText('RESPONSÁVEIS', margin, yPosition, 12, 'bold');
      yPosition += 15;
      
      if (boletim.responsavelEngeval) {
        addText(`Responsável ENGEVAL: ${boletim.responsavelEngeval}`, margin, yPosition, 10);
        yPosition += 12;
      }
      
      if (boletim.responsavelContratante) {
        addText(`Responsável Contratante: ${boletim.responsavelContratante}`, margin, yPosition, 10);
        yPosition += 12;
      }
    }

    // Rodapé
    const footerY = pdf.internal.pageSize.getHeight() - 20;
    addText('BMC - ANDAIME V0 - ENGEVAL', margin, footerY, 8);
    addText('Página 1', pageWidth - 30, footerY, 8);

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
