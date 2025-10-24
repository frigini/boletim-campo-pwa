# 📋 Sistema de Boletim de Campo ENGEVAL

Um aplicativo digital para criar e gerenciar boletins de medição de campo da ENGEVAL. Pode ser usado no computador, tablet ou celular, mesmo sem internet após a primeira vez.

## ✨ O que o sistema faz?

- **Criar boletins digitais**: Substitui o preenchimento manual em papel
- **Gerar PDFs profissionais**: Cria documentos idênticos ao modelo ENGEVAL
- **Salvar boletins**: Mantém histórico de todos os boletins criados
- **Funcionar offline**: Trabalha mesmo sem internet (após primeira instalação)
- **Acessar de qualquer lugar**: Computador, tablet ou celular

## 🎯 Para quem é este sistema?

- Técnicos de campo que preenchem boletins
- Supervisores que precisam revisar documentos
- Qualquer pessoa da ENGEVAL que trabalha com boletins de medição

## 🚀 Como começar a usar?

## 🚀 Como começar a usar?

### 🌐 Acessando a aplicação

#### Opção 1: Testar localmente (no seu computador)
1. **Baixe o projeto** para o seu computador
2. **Abra o terminal/prompt** na pasta do projeto
3. **Digite o comando**: `npm install` (instala as dependências)
4. **Digite o comando**: `npm run dev` (inicia a aplicação)
5. **Abra o navegador** e vá para: `http://localhost:3000`

#### Opção 2: Acesso online (quando disponível)
- Acesse o link fornecido pela equipe de TI da ENGEVAL
- Não precisa instalar nada, funciona direto no navegador

### 🧪 Como testar todas as funcionalidades

#### 1️⃣ **Teste de Login**
- **Use os dados de exemplo**:
  - Email: `admin@engeval.com`
  - Senha: `admin123`
- **Ou crie uma conta nova**:
  - Clique em "Cadastre-se"
  - Preencha seus dados
  - Faça login com sua nova conta

#### 2️⃣ **Teste de Visualização**
- **Ver boletins existentes**: Ao fazer login, você verá a lista com um boletim de exemplo
- **Buscar boletims**: Use a barra de pesquisa para encontrar boletins por número, cliente, etc.
- **Detalhes do boletim**: Clique no ícone de edição para ver todos os campos preenchidos

#### 3️⃣ **Teste de Criação**
- **Novo boletim**: Clique em "Novo Boletim"
- **Preencher dados**: Complete pelo menos os campos obrigatórios:
  - Número do boletim
  - Data
  - Cliente
  - Solicitante
  - Equipamento
- **Salvar**: Clique em "Salvar" - o boletim aparecerá na lista

#### 4️⃣ **Teste de Edição**
- **Editar boletim**: Na lista, clique no ícone de lápis (editar)
- **Modificar dados**: Altere qualquer informação
- **Salvar mudanças**: Clique em "Salvar" para confirmar

#### 5️⃣ **Teste de PDF (Importante!)**
- **Gerar PDF do exemplo**: Na lista, clique no ícone de download no boletim de exemplo
- **Verificar download**: Um arquivo PDF deve ser baixado automaticamente
- **Abrir e conferir**: Abra o PDF e verifique se:
  - Todos os dados aparecem corretamente
  - O layout está igual ao formulário em papel
  - As informações estão nas posições certas

#### 6️⃣ **Teste em diferentes dispositivos**
- **No computador**: Teste todas as funcionalidades
- **No tablet**: Acesse pelo navegador, teste criar e editar boletins
- **No celular**: Verifique se consegue preencher formulários
- **Gire a tela**: Teste tanto na posição vertical quanto horizontal

#### 7️⃣ **Teste offline (PWA)**
- **Primeira visita**: Acesse com internet normal
- **Instalar como app** (opcional):
  - No Chrome: clique no ícone de instalação na barra de endereço
  - No celular: "Adicionar à tela inicial"
- **Teste sem internet**: Desconecte a internet e veja se ainda consegue:
  - Visualizar boletins salvos
  - Criar novos boletins
  - Editar boletins existentes
- **Reconectar**: Quando voltar a internet, tudo deve sincronizar

### ✅ **Checklist de testes completos**

**Funcionalidades básicas:**
- [ ] Login com dados de exemplo
- [ ] Criar conta nova
- [ ] Ver lista de boletins
- [ ] Criar novo boletim
- [ ] Editar boletim existente
- [ ] Gerar PDF
- [ ] Fazer logout

**Testes de PDF:**
- [ ] PDF do boletim de exemplo baixa
- [ ] PDF abre corretamente
- [ ] Dados aparecem nas posições certas
- [ ] Layout igual ao formulário papel

**Testes em dispositivos:**
- [ ] Funciona no computador (Windows/Mac)
- [ ] Funciona no tablet
- [ ] Funciona no celular
- [ ] Interface se adapta ao tamanho da tela

**Testes offline:**
- [ ] Instala como aplicativo
- [ ] Funciona sem internet
- [ ] Dados são salvos localmente
- [ ] Sincroniza quando volta internet

### 🆘 **O que fazer se algo não funcionar**

**PDF não baixa:**
1. Verifique se o navegador permite downloads
2. Tente com outro navegador (Chrome, Firefox, Edge)
3. Verifique se preencheu todos os campos obrigatórios

**Não consegue fazer login:**
1. Confirme email: `admin@engeval.com`
2. Confirme senha: `admin123`
3. Verifique se não tem espaços extras
4. Tente criar uma conta nova

**Interface estranha no celular:**
1. Atualize o navegador
2. Limpe o cache do navegador
3. Tente girar a tela
4. Use o Chrome ou Safari

**Perdeu dados:**
1. Dados ficam salvos no navegador
2. Se limpou histórico, dados podem ter sido perdidos
3. Por isso é importante gerar PDFs importantes
4. Em produção, dados ficarão em servidor

### 📞 **Reportar problemas**

Se encontrar algum problema durante os testes:
1. **Anote o que estava fazendo** quando deu erro
2. **Tire uma foto da tela** se possível
3. **Anote qual dispositivo** estava usando (computador, celular, tablet)
4. **Qual navegador** (Chrome, Firefox, Safari, Edge)
5. **Entre em contato** com a equipe de TI da ENGEVAL

### 🎯 **Dados de exemplo para testes**

**Usuário de teste:**
- **Email**: admin@engeval.com  
- **Senha**: admin123

**Boletim de exemplo:**
- Já vem criado um boletim completo
- Use para testar a geração de PDF
- Todos os campos preenchidos para referência

### 🔧 **Criando sua conta**
- Clique em "Cadastre-se"
- Digite seu email, nome e senha
- Pronto! Sua conta está criada

### 📝 **Usando o sistema no dia a dia**
1. **Ver boletins existentes**: Na tela inicial, você vê todos os boletins
2. **Criar novo boletim**: Clique em "Novo Boletim"
3. **Preencher dados**: Complete as informações como fazia no papel
4. **Salvar**: O boletim fica guardado automaticamente
5. **Gerar PDF**: Clique no ícone de download para criar o documento

## � Que informações posso preencher?

O sistema inclui todos os campos do boletim em papel:

### 📄 Informações básicas
- Número do boletim
- Data do serviço
- Nome do cliente
- Pessoa que solicitou
- Equipamento trabalhado
- OM e Gerência

### 🏗️ Tipo de trabalho
- Se é andaime convencional ou especial
- Se foi montado ou desmontado
- Datas e horários de montagem/desmontagem

### 🔧 Tipos de estrutura
- Escoramento, escadas, torres
- Guarda-corpo, passarelas
- Linha de vida, balancins
- E outros tipos conforme necessário

### 📏 Medidas e detalhes
- Comprimento, largura, altura
- Quantidade de estruturas
- Horas trabalhadas
- Nome do solicitante e matrícula
- Equipe que trabalhou
- Observações importantes
- Assinaturas dos responsáveis

## � Dicas de uso

### ✅ Boas práticas
- **Preencha todos os campos**: Quanto mais completo, melhor o documento
- **Use observações**: Anote detalhes importantes do trabalho
- **Confira antes de gerar PDF**: Revise os dados antes de finalizar
- **Salve regularmente**: O sistema salva automaticamente, mas é bom confirmar

### 📱 No celular/tablet
- **Gire a tela**: Alguns campos ficam mais fáceis de preencher na horizontal
- **Use zoom**: Aumente a tela se precisar ver melhor
- **Toque nos campos**: Toque diretamente onde quer digitar

### 💾 Salvando e organizando
- **Cada boletim tem um número**: Para facilitar a busca depois
- **Use datas corretas**: Ajuda a encontrar boletins antigos
- **Observações claras**: Escreva de forma que outros entendam

## 🔧 Problemas comuns e soluções

### ❌ "Não consigo fazer login"
- Verifique se digitou email e senha corretos
- Teste com os dados de exemplo: admin@engeval.com / admin123
- Se esqueceu a senha, clique em "Esqueceu sua senha?"

### ❌ "O PDF não está gerando"
- Verifique se preencheu os campos obrigatórios
- Tente atualizar a página e tentar novamente
- Verifique se seu navegador permite downloads

### ❌ "Perdi meus dados"
- Os dados ficam salvos no seu navegador
- Se limpou o histórico/cookies, os dados podem ter sido perdidos
- Por isso é importante gerar PDFs dos boletins importantes

### ❌ "Não funciona no meu celular"
- Use um navegador atualizado (Chrome, Safari, Firefox)
- Verifique se tem espaço no celular
- Tente acessar pelo WiFi primeiro

## 📱 Instalando como aplicativo

### No computador (Chrome)
1. Abra o sistema no Chrome
2. Clique no ícone de "instalar" que aparece na barra de endereço
3. Confirme a instalação
4. Agora você tem um ícone na área de trabalho!

### No celular/tablet
1. Abra no navegador
2. No menu do navegador, procure "Adicionar à tela inicial"
3. Confirme
4. Agora tem um ícone como qualquer app!

## 🆘 Precisa de ajuda?

### 📞 Contato
- Entre em contato com o suporte técnico da ENGEVAL
- Ou pergunte para quem já usa o sistema na sua equipe

### 📚 Lembre-se
- Este sistema substitui o boletim em papel
- Os PDFs gerados têm a mesma validade
- Todos os campos são iguais ao formulário tradicional
- É mais rápido e organizado que o papel

---

## 🏢 Sobre a ENGEVAL

**ENGEVAL SERVIÇOS E ENGENHARIA LTDA**  
CNPJ: 43.659.884/0001-01  
Linhares/ES

*Sistema desenvolvido para facilitar o trabalho da nossa equipe de campo.*
