import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { BoletimCampo } from '../types';


export async function generateBoletimPDFFromTemplate(boletim: BoletimCampo): Promise<void> {
  try {
    console.log('🚀 Iniciando geração de PDF com dados:', JSON.stringify(boletim, null, 2));
    
    // Carregar template PDF
    const templateUrl = `${window.location.origin}/boletim-template.pdf`;
    console.log('📄 Tentando carregar template de:', templateUrl);
    
    const response = await fetch(templateUrl);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o template: ${response.status} ${response.statusText}`);
    }
    
    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    console.log('✅ Template carregado com sucesso');
    
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    
    // Carregar fontes
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Coordenadas precisas baseadas na imagem do PDF original
    
    // Número do boletim (canto superior direito) - AJUSTADO
    const now = new Date();
    const numeroAuto = `${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
    firstPage.drawText(boletim.numero || numeroAuto, {
      x: 475,
      y: height - 107,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    // Dados principais - baseado na imagem
    const baseY = height - 145;
    
    // Cliente
    firstPage.drawText(boletim.cliente || '', {
      x: 150,
      y: baseY,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    // Equipamento
    firstPage.drawText(boletim.equipamento || '', {
      x: 435,
      y: baseY,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    // Solicitante
    firstPage.drawText(boletim.solicitante || '', {
      x: 150,
      y: baseY - 20,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    // OM
    firstPage.drawText(boletim.om || '', {
      x: 435,
      y: baseY - 20,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    // Gerência
    firstPage.drawText(boletim.gerencia || '', {
      x: 175,
      y: baseY - 50,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    // Checkboxes de status
    const statusY = baseY - 74;
    
    if (boletim.andaimeMontado) {
      firstPage.drawText('X', {
        x: 132,
        y: statusY,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.andaimeDesmontado) {
      firstPage.drawText('X', {
        x: 310,
        y: statusY,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }
    
    // Descrição dos serviços - CORRIGIDA para aparecer
    if (boletim.descricaoServicos) {
      const maxCharsPerLine = 80; // Aumentado para caber mais texto
      
      let texto = boletim.descricaoServicos;
      if (texto.length > maxCharsPerLine * 3) {
        texto = texto.substring(0, maxCharsPerLine * 3 - 3) + '...';
      }
      
      const words = texto.split(' ');
      const wrappedLines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        if ((currentLine + ' ' + word).length <= maxCharsPerLine) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          if (currentLine) wrappedLines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) wrappedLines.push(currentLine);
      
      wrappedLines.slice(0, 3).forEach((line, index) => {
        firstPage.drawText(line, {
          x: 132,
          y: baseY - 100 - (index * 11),
          size: 8,
          font: font,
          color: rgb(0, 0, 0),
        });
      });
    }
    
    // Tabela de apropriação - posições ajustadas baseadas na imagem
    const tabelaY = baseY - 187;
    
    // Função para quebrar data em partes (DD/MM/AAAA)
    const quebrarData = (dataString: string) => {
      if (!dataString) return { dia: '', mes: '', ano: '' };
      try {
        const date = new Date(dataString);
        return {
          dia: String(date.getDate()).padStart(2, '0'),
          mes: String(date.getMonth() + 1).padStart(2, '0'),
          ano: String(date.getFullYear())
        };
      } catch {
        return { dia: '', mes: '', ano: '' };
      }
    };


    // Função para quebrar hora em partes (HH:MM)
    const quebrarHora = (horaString: string) => {
      if (!horaString) return { hora: '', minuto: '' };
      const [hora, minuto] = horaString.split(':');
      return { hora: hora || '', minuto: minuto || '' };
    };
    
    // Montagem - Data quebrada ALINHAMENTO CORRIGIDO
    if (boletim.montagemData) {
      const { dia, mes, ano } = quebrarData(boletim.montagemData);
      firstPage.drawText(dia, { x: 48, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(mes, { x: 72, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(ano, { x: 95, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
    }
    
    // Montagem - Hora Inicial quebrada ALINHAMENTO CORRIGIDO
    if (boletim.montagemHoraInicial) {
      const { hora, minuto } = quebrarHora(boletim.montagemHoraInicial);
      firstPage.drawText(hora, { x: 155, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(minuto, { x: 172, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
    }
    
    // Montagem - Hora Final quebrada ALINHAMENTO CORRIGIDO
    if (boletim.montagemHoraFinal) {
      const { hora, minuto } = quebrarHora(boletim.montagemHoraFinal);
      firstPage.drawText(hora, { x: 248, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(minuto, { x: 265, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
    }
    
    // Desmontagem - Data quebrada ALINHAMENTO CORRIGIDO
    if (boletim.desmontagemData) {
      const { dia, mes, ano } = quebrarData(boletim.desmontagemData);
      firstPage.drawText(dia, { x: 330, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(mes, { x: 353, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(ano, { x: 375, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
    }
    
    // Desmontagem - Hora Inicial quebrada ALINHAMENTO CORRIGIDO
    if (boletim.desmontagemHoraInicial) {
      const { hora, minuto } = quebrarHora(boletim.desmontagemHoraInicial);
      firstPage.drawText(hora, { x: 432, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(minuto, { x: 449, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
    }
    
    // Desmontagem - Hora Final quebrada ALINHAMENTO CORRIGIDO
    if (boletim.desmontagemHoraFinal) {
      const { hora, minuto } = quebrarHora(boletim.desmontagemHoraFinal);
      firstPage.drawText(hora, { x: 513, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
      firstPage.drawText(minuto, { x: 529, y: tabelaY, size: 8, font: font, color: rgb(0, 0, 0) });
    }
    
    // Solicitante e Matrícula - Montagem - AJUSTADOS
    if (boletim.montagemSolicitante) {
      firstPage.drawText(boletim.montagemSolicitante, {
        x: 75,
        y: tabelaY - 40,
        size: 7,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.montagemMatricula) {
      firstPage.drawText(boletim.montagemMatricula, {
        x: 210,
        y: tabelaY - 40,
        size: 7,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Solicitante e Matrícula - Desmontagem - AJUSTADOS
    if (boletim.desmontagemSolicitante) {
      firstPage.drawText(boletim.desmontagemSolicitante, {
        x: 350,
        y: tabelaY - 40,
        size: 7,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.desmontagemMatricula) {
      firstPage.drawText(boletim.desmontagemMatricula, {
        x: 485,
        y: tabelaY - 40,
        size: 7,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Tipos de andaime - posições precisas baseadas na imagem
    const tiposY = tabelaY - 100;
    
    // Checkboxes principais - ALINHAMENTO CORRIGIDO
    if (boletim.andaimeConvencional) {
      firstPage.drawText('X', {
        x: 115,
        y: tiposY + 14,
        size: 8,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.andaimeEspecial) {
      firstPage.drawText('X', {
        x: 328,
        y: tiposY + 14,
        size: 8,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }

    const tipoAndaimeX = 40;
    
    // Grid de tipos específicos (4 colunas) - AJUSTE FINO PRECISO
    const tiposEspecificos = [
      // Primeira linha
      { campo: 'escoramento', x: tipoAndaimeX, y: tiposY - 10 },
      { campo: 'torreAcima5m', x: tipoAndaimeX + 126, y: tiposY - 9 },
      { campo: 'passarela', x: tipoAndaimeX + 248, y: tiposY - 9 },
      { campo: 'balancim', x: tipoAndaimeX + 366, y: tiposY - 8 },
      // Segunda linha
      { campo: 'escada', x: tipoAndaimeX, y: tiposY - 22 },
      { campo: 'torreAbaixo5m', x: tipoAndaimeX + 126, y: tiposY - 22 },
      { campo: 'linhaDeVida', x: tipoAndaimeX + 248, y: tiposY - 22 },
      { campo: 'pauDeCarga', x: tipoAndaimeX + 366, y: tiposY - 22 },
      // Terceira linha
      { campo: 'espacoConfinado', x: tipoAndaimeX, y: tiposY - 34 },
      { campo: 'guardaCorpo', x: tipoAndaimeX + 126, y: tiposY - 34 },
      { campo: 'rodizio', x: tipoAndaimeX + 248, y: tiposY - 34 },
      { campo: 'barraca', x: tipoAndaimeX + 366, y: tiposY - 34 },
    ];
    
    tiposEspecificos.forEach(tipo => {
      if (boletim[tipo.campo as keyof BoletimCampo]) {
        firstPage.drawText('X', {
          x: tipo.x,
          y: tipo.y,
          size: 8,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
      }
    });
    
    // Dimensões do Andaime - AJUSTADO
    const dimensoesY = tiposY - 65;
    
    if (boletim.comprimento) {
      firstPage.drawText(boletim.comprimento, {
        x: 105,
        y: dimensoesY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.largura) {
      firstPage.drawText(boletim.largura, {
        x: 225,
        y: dimensoesY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.altura) {
      firstPage.drawText(boletim.altura, {
        x: 355,
        y: dimensoesY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.quantidade) {
      firstPage.drawText(boletim.quantidade, {
        x: 510,
        y: dimensoesY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Horas à Disposição - AJUSTADO (movido para cima, data mais à direita, hora final mais à esquerda)
    const horasY = dimensoesY - 35;
    
    if (boletim.disposicaoData) {
      // Converter a data para o formato DD/MM/YYYY
      const data = new Date(boletim.disposicaoData);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const dataFormatada = `${dia}/${mes}/${ano}`;
      
      firstPage.drawText(dataFormatada, {
        x: 130,
        y: horasY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.disposicaoHoraInicial) {
      firstPage.drawText(boletim.disposicaoHoraInicial, {
        x: 305,
        y: horasY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.disposicaoHoraFinal) {
      firstPage.drawText(boletim.disposicaoHoraFinal, {
        x: 500,
        y: horasY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Solicitante do Serviço - ALINHAMENTO CORRIGIDO
    const solicitanteY = horasY - 65;
    
    if (boletim.solicitanteServico) {
      firstPage.drawText(boletim.solicitanteServico, {
        x: 75,
        y: solicitanteY + 5,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.matriculaSolicitante) {
      firstPage.drawText(boletim.matriculaSolicitante, {
        x: 255,
        y: solicitanteY + 5,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Equipe Disponível - X MAIORES e melhor posicionados
    if (boletim.liderMontagem) {
      firstPage.drawText('X', {
        x: 377,
        y: solicitanteY + 17,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.montador) {
      firstPage.drawText('X', {
        x: 377,
        y: solicitanteY - 3,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }
    
    // Observações - com controle de largura
    const obsY = solicitanteY - 65;
    
    if (boletim.observacoes) {
      const maxCharsPerLineObs = 85; // Caracteres por linha para observações
      
      let texto = boletim.observacoes;
      if (texto.length > maxCharsPerLineObs * 4) {
        texto = texto.substring(0, maxCharsPerLineObs * 4 - 3) + '...';
      }
      
      const lines = texto.split('\n');
      const wrappedLines: string[] = [];
      
      lines.forEach(line => {
        if (line.length <= maxCharsPerLineObs) {
          wrappedLines.push(line);
        } else {
          // Quebrar linha longa em múltiplas linhas
          const words = line.split(' ');
          let currentLine = '';
          
          words.forEach(word => {
            if ((currentLine + word).length <= maxCharsPerLineObs) {
              currentLine += (currentLine ? ' ' : '') + word;
            } else {
              if (currentLine) wrappedLines.push(currentLine);
              currentLine = word;
            }
          });
          if (currentLine) wrappedLines.push(currentLine);
        }
      });
      
      wrappedLines.slice(0, 4).forEach((line, index) => {
        firstPage.drawText(line, {
          x: 35,
          y: obsY - (index * 14), // Espaçamento maior para ficar sobre as linhas
          size: 9, // Fonte um pouco maior
          font: font,
          color: rgb(0, 0, 0),
        });
      });
    }
    
    // Responsáveis (Assinaturas) - MOVIDAS PARA BAIXO E MAIS À ESQUERDA
    const respY = obsY - 105;
    
    if (boletim.responsavelEngeval) {
      firstPage.drawText(boletim.responsavelEngeval, {
        x: 100,
        y: respY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    if (boletim.responsavelContratante) {
      firstPage.drawText(boletim.responsavelContratante, {
        x: 335,
        y: respY,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Salvar PDF
    console.log('💾 Salvando PDF...');
    const pdfBytes = await pdfDoc.save();
    
    // Criar blob e URL para download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Criar e disparar o download
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Boletim_${boletim.numero || numeroAuto}_${new Date().toISOString().split('T')[0]}.pdf`;
    link.download = fileName;
    
    console.log('⬇️ Iniciando download do arquivo:', fileName);
    document.body.appendChild(link);
    link.click();
    
    // Limpar
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('✅ Download concluído');
    }, 100);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar PDF. Verifique os dados do boletim.');
  }
};


export default generateBoletimPDFFromTemplate;
