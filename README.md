## Victor – Site de escola com CMS Sanity

Projeto monorepo com:

- **web**: aplicação Next.js 16 (App Router, TypeScript, Tailwind 4)  
- **sanity**: Sanity Studio 5, usado como CRM/CMS para todos os textos do site  

A hospedagem atual é em uma **VPS Ubuntu (Hostinger)**, com Node 20 gerenciado via **nvm** e processos em produção gerenciados por **PM2**.

---

### Estrutura do projeto

- `web/`
  - `src/app/page.tsx`: página inicial da escola, consome os dados do Sanity.
  - `src/lib/sanityClient.ts`: client do `@sanity/client` apontando para o projeto `zd7drlu2`, dataset `production`.
  - `src/lib/queries.ts`: GROQ da página inicial (`homePageQuery`) que carrega:
    - documento `pageHome`
    - seções referenciadas: `heroSection`, `aboutSection`, `segmentsSection`, `differentiatorsSection`, `testimonialsSection`, `structureSection`, `contactSection`.
  - `next.config.ts`: configuração de imagens remotas (`cdn.sanity.io`) para mostrar a imagem principal da hero.

- `sanity/`
  - `sanity.config.ts`: configura o projeto (`projectId: zd7drlu2`, `dataset: production`) e carrega os schemas.
  - `schemaTypes/pages/pageHome.ts`: tipo de documento da **Página Inicial**, com referências para cada seção.
  - `schemaTypes/sections/*Section.ts`: schemas de:
    - `heroSection`: hero/topo da página (eyebrow, título, subtítulo, CTAs, imagem, destaques).
    - `aboutSection`: sobre a escola (texto, missão, visão, valores, números).
    - `segmentsSection`: segmentos/etapas de ensino.
    - `differentiatorsSection`: diferenciais.
    - `testimonialsSection`: depoimentos.
    - `structureSection`: estrutura física.
    - `contactSection`: dados de contato e texto do formulário.

---

### Fluxo de conteúdo

- A equipe edita conteúdo no **Sanity Studio**:
  - `Página Inicial` referencia documentos de cada seção.
  - Cada seção é um documento próprio, totalmente editável.
- A página `/` do Next busca sempre os dados frescos:
  - `export const revalidate = 0` em `web/src/app/page.tsx` → renderização **dinâmica** no servidor.
  - O client do Sanity está com `useCdn: false` para evitar cache velho em produção.

---

### Comandos principais – desenvolvimento local

Na raiz do projeto (`/Users/rafasilva/Desktop/Victor`):

- **Frontend (web):**

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

- **Sanity Studio (sanity):**

```bash
cd sanity
npm install
npm run dev   # http://localhost:3333
```

---

### Deploy manual para a VPS

**1. No Mac – enviar mudanças para o GitHub**

```bash
cd /Users/rafasilva/Desktop/Victor

git status
git add .
git commit -m "Descreva rapidamente a mudanca"
git push origin main
```

**2. Na VPS – atualizar código, buildar e reiniciar**

```bash
ssh deployvictor@72.60.45.216

cd ~/victor/victor-escola
git pull origin main

# Site (Next.js)
cd web
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build
pm2 restart victor-web

# Sanity Studio
cd ../sanity
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build
pm2 restart victor-sanity

pm2 save
```

---

### URLs em produção (atual)

- **Site**: `http://72.60.45.216:3000/`  
- **Sanity Studio**: `http://72.60.45.216:3333/`

---

### Pontos importantes para futuros desenvolvimentos

- Sempre que adicionar novos campos ou seções:
  - atualizar os **schemas** em `sanity/schemaTypes`,
  - refletir na query em `web/src/lib/queries.ts`,
  - tipar os dados em `web/src/app/page.tsx` (ou em componentes dedicados).
- Para novas páginas, seguir o mesmo padrão:
  - criar tipo de página no Sanity (`page*`),
  - referenciar seções existentes ou criar novas seções em `sections/`,
  - criar a rota em `web/src/app/...` consumindo via GROQ.

