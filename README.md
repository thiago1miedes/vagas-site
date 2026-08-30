# Vagas Design

Site interno para centralizar e consultar vagas de emprego, organizadas por área.

Sem login, cadastro, painel administrativo ou banco de dados: as vagas ficam em arquivos JSON dentro do próprio projeto.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura: áreas → categorias → vagas

O conteúdo tem três níveis:

1. **Áreas** (`src/data/areas.ts`) — Design, Biologia & Farmácia e Programação. A ordem da lista é a ordem de exibição no site; Design vem primeiro por ser o foco do projeto.
2. **Categorias** (`src/data/categories.ts`) — cada categoria pertence a uma área pelo campo `area`.
3. **Vagas** (`src/data/jobs/*.json`) — cada vaga aponta para uma categoria pelo campo `category`. A área da vaga é deduzida da categoria, então não precisa ser repetida no JSON.

## Como adicionar uma vaga nova

1. Copie `src/data/jobs/_exemplo.json.txt` (ou qualquer vaga já publicada).
2. Cole em `src/data/jobs/`, renomeie para `<slug-da-vaga>.json` — o mesmo valor do campo `slug` do arquivo.
3. Preencha os campos:

| Campo | Descrição | Valores aceitos |
|---|---|---|
| `id` | Identificador único (ex.: `"074"`) | texto livre |
| `title` | Cargo | texto livre |
| `slug` | URL da vaga (`/vagas/<slug>`) — deve bater com o nome do arquivo | sem espaços/acentos |
| `company` | Nome da empresa | texto livre |
| `category` | Categoria (define também a área) | um dos slugs em `src/data/categories.ts` |
| `description` | Texto de apresentação da vaga | texto livre |
| `responsibilities` | Lista de responsabilidades | lista de textos |
| `requirements` | Lista de requisitos | lista de textos |
| `differentials` | Lista de diferenciais (opcional) | lista de textos, pode ser `[]` |
| `employmentType` | Tipo de contrato | `"CLT"`, `"PJ"`, `"Freelancer"`, `"Estágio"` |
| `workModel` | Modelo de trabalho | `"Remoto"`, `"Híbrido"`, `"Presencial"` |
| `seniority` | Nível | `"Estágio"`, `"Júnior"`, `"Pleno"`, `"Sênior"`, `"Especialista"` |
| `location` | Cidade/UF ou "Brasil" | texto livre |
| `salary` | Faixa salarial (opcional) | texto livre ou `null` |
| `applicationUrl` | Link externo de candidatura | URL completa (aceita `mailto:`) |
| `publishedAt` | Data de publicação | `"AAAA-MM-DD"` |
| `expiresAt` | Data de expiração (opcional) — passada essa data a vaga some do site | `"AAAA-MM-DD"` ou `null` |

4. Salve o arquivo. No próximo deploy a vaga aparece automaticamente na home, em `/vagas`, na página da área e na da categoria.

O build falha com uma mensagem clara se algum campo obrigatório estiver faltando, a categoria não existir, ou o slug do arquivo não bater com o campo `slug`.

### A home se atualiza sozinha

A seção **Vagas do dia** mostra todas as vagas com a data de publicação mais recente, ordenadas por área (Design primeiro). Basta subir vagas com uma data mais nova que elas passam a ocupar o bloco de destaque.

### Categorias disponíveis

- **Design**: `ux-ui-design`, `product-design`, `design-grafico`, `web-design`, `branding`, `motion-design`, `design-3d`, `direcao-de-arte`, `social-media`, `ilustracao`
- **Biologia & Farmácia**: `farmacia`, `analises-clinicas`, `biomedicina`, `meio-ambiente`
- **Programação**: `frontend`, `backend`, `fullstack`, `mobile`, `qa-testes`, `devops-sre`, `lideranca-tecnica`

Para criar uma categoria nova, adicione um objeto em `src/data/categories.ts` apontando para uma área existente. Para criar uma área nova, adicione um objeto em `src/data/areas.ts`.

## Deploy

O projeto está publicado na Vercel. Qualquer alteração nos arquivos de `src/data/` exige um novo deploy para aparecer no site publicado.
