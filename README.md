# ⚡ API RESTful para Monitoramento de Usinas Fotovoltaicas

Neste projeto, a API permite gerenciar usinas e inversores fotovoltaicos, registrar medições de potência e temperatura, e realizar cálculos de geração de energia, como potência máxima diária e geração por período. Segue padrão RESTful para facilitar a integração com sistemas de monitoramento.

---

## 📌 1. Sobre o Projeto

A API permite:

- Cadastrar usinas e inversores
- Registrar e recuperar checagens (medições de potência e temperatura)
- Consultar dados de geração
- Calcular potência máxima por dia
- Calcular geração total por período

---

## 🚀 2. Tecnologias Utilizadas

- **Next.js** – Framework para criação de rotas e APIs com Node.js.
- **TypeScript** – Superset do JavaScript com tipagem estática.
- **Prisma ORM** – ORM para modelagem e comunicação com o banco de dados PostgreSQL.
- **Zod** – Validação e parsing de dados de entrada da API.
- **PostgreSQL** – Banco de dados relacional, hospedado na Railway.
- **Railway** – Plataforma para hospedagem e gerenciamento do banco.
- **Postman** – Ferramenta usada para testar e documentar a API.

---

## 🛠️ 3. Instalação

### 1. Clone o repositório em alguma pasta da sua máquina:

```bash
git clone https://github.com/joaop-Cardoso/monitoramento-usinas.git
```

### 2. Acesse a pasta do projeto:

```bash
cd monitoramento-usinas
```

### 3. (Opcional) Recomendado abrir o projeto no VS Code:

```bash
code .
```

### 4. Instale as dependências (pelo terminal do VS Code ou CMD):

💡 Para abrir o terminal no VS Code, pressione Ctrl + ' (Control + crase) recomendo seguir por esse caminho.

```bash
npm install
```

### 5. Configure o banco de dados:

Crie um arquivo .env na raiz do projeto com a variável DATABASE_URL apontando para o banco. Para fins de demonstração, deixei abaixo a URL de conexão do banco que hospedei na Railway:

```bash
DATABASE_URL="postgresql://postgres:ZYIeUnEYWzsFRZkFdnSKMQzmUcTLAubM@shortline.proxy.rlwy.net:23196/railway"
```
⚠️ Importante:
Embora essa URL esteja pública aqui apenas para testes e demonstração do projeto, estou ciente que em aplicações reais isso não deve ser feito. 
---

## ▶️ 4. Utilização

### Para iniciar o servidor localmente:

```bash
npm run dev
```

### Para visualizar o banco de dados com o Prisma Studio:

```bash
npx prisma studio
```

---

## 📄 5. Documentação da API

A documentação completa da API está disponível no Postman:

👉 **[Acesse a documentação](https://documenter.getpostman.com/view/33533975/2sB2qUo5Vn)**

Recomendo utilizar o Postman para testar os endpoints enquanto o servidor estiver rodando.
Você pode importar a coleção diretamente no seu Postman clicando no botão no canto superior direito da página da documentação.

---

## 🧱 6. Estrutura do Projeto

Projeto organizado com foco em clareza, separação de responsabilidades e agilidade no desenvolvimento.

### 🗂️ Organização em Camadas

```
/api        → Rotas e requisições HTTP
/service    → Lógica de negócio, funções e algoritmos
/utils      → Funções utilitárias (tratamento de erros genéricos e cálculos)
/dtos       → Schemas de validação com Zod
/lib        → Instância do banco (Singleton)
/generated  → Arquivos gerados pelo Prisma
/prisma     → Migrations e definição das tabelas
```
---
`
## 📬 Considerações Finais

Este projeto foi desenvolvido em poucos dias com foco em organização, clareza e uso de tecnologias modernas. Caso tenha interesse em discutir qualquer parte da implementação, estou à disposição.

---

## 📞 Contato

- Linkedin: [Joãozim(eu)](https://www.linkedin.com/in/joaop-cardoso/)
