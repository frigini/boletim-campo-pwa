# Boletim de Campo PWA

Uma aplicação Progressive Web App (PWA) desenvolvida em TypeScript para gestão de boletins de medição de campo da ENGEVAL.

## 🚀 Funcionalidades

- **Autenticação completa**: Login, registro e recuperação de senha
- **Formulário de boletim**: Cadastro completo baseado no modelo ENGEVAL
- **Geração de PDF**: Exportação no formato idêntico ao documento original
- **Controle de boletins**: Listagem, edição e exclusão de boletins
- **PWA**: Funciona offline e pode ser instalada como app nativo
- **Responsivo**: Interface adaptada para desktop e mobile

## 📋 Campos do Boletim

O formulário inclui todos os campos do boletim original:

### Informações Gerais
- Número do boletim
- Data
- Cliente
- Solicitante
- Equipamento
- OM
- Gerência

### Tipo de Andaime
- Andaime Convencional/Especial
- Andaime Montado/Desmontado

### Aprovação de Andaimes
- Montagem (data, hora inicial/final)
- Desmontagem (data, hora inicial/final)

### Tipos Específicos
- Escoramento
- Escada
- Espaço Confinado
- Torre Acima/Abaixo 5M
- Guarda Corpo
- Passarela
- Linha de Vida
- Balancim
- Pau de Carga
- Barraca

### Dimensões
- Comprimento, Largura, Altura
- Quantidade

### Outros
- Horas de disposição
- Solicitante do serviço
- Equipe disponível
- Observações
- Responsáveis

## 🛠️ Tecnologias

- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **React Hook Form** - Gerenciamento de formulários
- **jsPDF** - Geração de PDFs
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas
- **Vite PWA Plugin** - Funcionalidades PWA

## 🚀 Como executar

1. **Instalar dependências**:
```bash
npm install
```

2. **Executar em desenvolvimento**:
```bash
npm run dev
```

3. **Build para produção**:
```bash
npm run build
```

4. **Preview da build**:
```bash
npm run preview
```

## 🎯 **Dados de Exemplo**

A aplicação vem com um usuário e boletim de exemplo para teste:

**Usuário de Teste:**
- Email: `admin@engeval.com`
- Senha: `admin123`

**Boletim de Exemplo:**
- Número: 001/2024
- Cliente: PETROBRAS S.A.
- Dados completos preenchidos para teste de PDF

## 📱 PWA

A aplicação é uma PWA completa com:
- Service Worker para cache offline
- Manifest para instalação
- Ícones otimizados
- Funciona offline após primeira visita

## 💾 Armazenamento

Os dados são armazenados localmente no navegador usando um sistema de banco de dados estruturado:
- **Usuários cadastrados** com validação
- **Boletins organizados** por usuário
- **Sessão persistente** do usuário
- **Dados de exemplo** incluídos para teste
- **Estrutura relacional** simulada no localStorage

## 🔐 Autenticação

Sistema de autenticação simulado com:
- Registro de novos usuários
- Login com email/senha
- Recuperação de senha
- Sessão persistente

## 📄 Geração de PDF

O PDF gerado mantém:
- Layout idêntico ao documento original
- Todos os campos preenchidos
- Formatação profissional
- Cabeçalho da empresa ENGEVAL

## 🎨 Interface

- Design moderno e limpo
- Cores da identidade ENGEVAL
- Interface intuitiva
- Responsiva para todos os dispositivos
- Feedback visual para ações do usuário

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Login.tsx       # Tela de login/registro
│   ├── ForgotPassword.tsx # Recuperação de senha
│   ├── BoletimForm.tsx # Formulário do boletim
│   └── BoletimList.tsx # Lista de boletins
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── types/              # Tipos TypeScript
│   └── index.ts        # Definições de tipos
├── utils/              # Utilitários
│   └── pdfGenerator.ts # Gerador de PDF
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🔧 Configuração

A aplicação está configurada com:
- TypeScript strict mode
- ESLint para qualidade de código
- Tailwind CSS para estilização
- Vite para build otimizada
- PWA plugin para funcionalidades offline

## 📝 Uso

1. **Primeiro acesso**: 
   - Use o usuário de exemplo: `admin@engeval.com` / `admin123`
   - Ou registre uma nova conta
2. **Login**: Entre com suas credenciais
3. **Visualizar exemplo**: Veja o boletim de exemplo já criado
4. **Testar PDF**: Clique no ícone de download para gerar PDF
5. **Criar boletim**: Use o botão "Novo Boletim"
6. **Preencher dados**: Complete todos os campos necessários
7. **Salvar**: O boletim é salvo automaticamente
8. **Editar**: Clique no ícone de edição na lista

## 🌐 Deploy

Para deploy em produção:

1. Build da aplicação:
```bash
npm run build
```

2. Os arquivos estarão na pasta `dist/`
3. Faça upload para seu servidor web
4. Configure HTTPS para PWA funcionar

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.

---

**ENGEVAL SERVIÇOS E ENGENHARIA LTDA**  
CNPJ: 43.659.884/0001-01  
Linhares/ES
