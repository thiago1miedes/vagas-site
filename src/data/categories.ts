import type { Category } from '@/types/category';

/**
 * Categorias do site, agrupadas por área.
 *
 * Para criar uma nova categoria, adicione um objeto nesta lista. O `slug` vira
 * a URL (/categorias/[slug]) e é o valor usado no campo `category` das vagas;
 * o `area` precisa existir em `src/data/areas.ts`.
 */
export const categories: Category[] = [
  // ===== Design =====
  {
    slug: 'ux-ui-design',
    name: 'UX/UI Design',
    area: 'design',
    description:
      'Oportunidades para profissionais que trabalham com experiência do usuário, interfaces e produtos digitais.',
  },
  {
    slug: 'product-design',
    name: 'Product Design',
    area: 'design',
    description:
      'Vagas para quem atua na ponta do produto, da descoberta à entrega, próximo de negócio e engenharia.',
  },
  {
    slug: 'design-grafico',
    name: 'Design Gráfico',
    area: 'design',
    description:
      'Posições voltadas a peças gráficas, materiais impressos, editorial e comunicação visual.',
  },
  {
    slug: 'web-design',
    name: 'Web Design',
    area: 'design',
    description:
      'Vagas focadas em sites, landing pages e interfaces web, com atenção a layout e implementação.',
  },
  {
    slug: 'branding',
    name: 'Branding',
    area: 'design',
    description:
      'Oportunidades em identidade visual, sistemas de marca e posicionamento.',
  },
  {
    slug: 'motion-design',
    name: 'Motion Design',
    area: 'design',
    description:
      'Vagas para quem trabalha com animação, vídeo e peças em movimento.',
  },
  {
    slug: 'design-3d',
    name: 'Design 3D',
    area: 'design',
    description:
      'Posições em modelagem, render e direção de arte tridimensional.',
  },
  {
    slug: 'direcao-de-arte',
    name: 'Direção de Arte',
    area: 'design',
    description:
      'Vagas para conduzir conceito, linguagem visual e execução de campanhas e produtos.',
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    area: 'design',
    description:
      'Oportunidades em conteúdo e design para redes sociais e comunidades.',
  },
  {
    slug: 'ilustracao',
    name: 'Ilustração',
    area: 'design',
    description:
      'Vagas para ilustradores em produtos digitais, editorial e campanhas.',
  },

  // ===== Biologia & Farmácia =====
  {
    slug: 'farmacia',
    name: 'Farmácia',
    area: 'biologia-farmacia',
    description:
      'Vagas para farmacêuticos e equipe de farmácia, em drogarias, redes varejistas e farmácia hospitalar.',
  },
  {
    slug: 'analises-clinicas',
    name: 'Análises Clínicas',
    area: 'biologia-farmacia',
    description:
      'Oportunidades em laboratório clínico: coleta, rotina analítica, hematologia, bioquímica e supervisão técnica.',
  },
  {
    slug: 'biomedicina',
    name: 'Biomedicina',
    area: 'biologia-farmacia',
    description:
      'Posições que exigem formação em Biomedicina, da atuação laboratorial à área estética e diagnóstica.',
  },
  {
    slug: 'meio-ambiente',
    name: 'Meio Ambiente',
    area: 'biologia-farmacia',
    description:
      'Vagas em monitoramento ambiental, qualidade da água e gestão ambiental, abertas a profissionais de Biologia.',
  },

  // ===== Arquitetura & Urbanismo =====
  {
    slug: 'projeto-arquitetonico',
    name: 'Projeto Arquitetônico',
    area: 'arquitetura-urbanismo',
    description:
      'Vagas e projetos de arquitetura residencial, comercial e corporativa, do estudo preliminar ao executivo.',
  },
  {
    slug: 'obras',
    name: 'Obras e Execução',
    area: 'arquitetura-urbanismo',
    description:
      'Oportunidades em gestão, acompanhamento e execução de obras, incluindo cronograma, orçamento e pós-entrega.',
  },
  {
    slug: 'interiores',
    name: 'Design de Interiores',
    area: 'arquitetura-urbanismo',
    description:
      'Posições voltadas a ambientes internos, mobiliário sob medida e projetos de decoração.',
  },
  {
    slug: 'urbanismo',
    name: 'Urbanismo e Paisagismo',
    area: 'arquitetura-urbanismo',
    description:
      'Vagas em planejamento urbano, espaços públicos e projetos de paisagismo.',
  },
  {
    slug: 'desenho-tecnico',
    name: 'Desenho Técnico e 3D',
    area: 'arquitetura-urbanismo',
    description:
      'Trabalhos de plantas, cortes, detalhamento, modelagem 3D e renderização em AutoCAD, SketchUp e afins.',
  },

  // ===== Programação =====
  {
    slug: 'frontend',
    name: 'Front-end',
    area: 'programacao',
    description:
      'Vagas focadas na interface do produto: JavaScript, frameworks modernos e integração com APIs.',
  },
  {
    slug: 'backend',
    name: 'Back-end',
    area: 'programacao',
    description:
      'Oportunidades em servidor, APIs e banco de dados, com linguagens como Node.js, Python, Java e .NET.',
  },
  {
    slug: 'fullstack',
    name: 'Full Stack',
    area: 'programacao',
    description:
      'Posições que cobrem front-end e back-end, com atuação de ponta a ponta no produto.',
  },
  {
    slug: 'mobile',
    name: 'Mobile',
    area: 'programacao',
    description:
      'Vagas de desenvolvimento para aplicativos iOS e Android, incluindo Flutter e React Native.',
  },
  {
    slug: 'qa-testes',
    name: 'QA e Testes',
    area: 'programacao',
    description:
      'Oportunidades em qualidade de software: automação de testes, Playwright, Cypress e estratégia de QA.',
  },
  {
    slug: 'devops-sre',
    name: 'DevOps e SRE',
    area: 'programacao',
    description:
      'Vagas em infraestrutura, deploy, observabilidade e confiabilidade de sistemas.',
  },
  {
    slug: 'lideranca-tecnica',
    name: 'Liderança Técnica',
    area: 'programacao',
    description:
      'Posições de coordenação e liderança de times de tecnologia, com foco em pessoas e processo.',
  },
];

const bySlug = new Map(categories.map((category) => [category.slug, category]));

export function getCategoryBySlug(slug: string): Category | undefined {
  return bySlug.get(slug);
}

/** Nome legível da categoria; devolve o próprio slug se ela não existir. */
export function getCategoryName(slug: string): string {
  return bySlug.get(slug)?.name ?? slug;
}

/** Área a que a categoria pertence, ou `''` se a categoria não existir. */
export function getCategoryArea(slug: string): string {
  return bySlug.get(slug)?.area ?? '';
}

/** Categorias de uma área, na ordem em que foram declaradas. */
export function getCategoriesByArea(areaSlug: string): Category[] {
  return categories.filter((category) => category.area === areaSlug);
}
