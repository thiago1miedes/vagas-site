import type { Area } from '@/types/area';

/**
 * Áreas do site — o nível acima das categorias.
 *
 * A ordem desta lista é a ordem de exibição no site: Design vem primeiro por
 * ser o foco principal do projeto. Para criar uma área nova, adicione um objeto
 * aqui e aponte as categorias para o `slug` dela em `src/data/categories.ts`.
 */
export const areas: Area[] = [
  {
    slug: 'design',
    name: 'Design',
    shortName: 'Design',
    tagline: 'Interfaces, marcas e comunicação visual',
    description:
      'Vagas para profissionais de design, criatividade e produtos digitais — de identidade visual e social media a UX/UI, produto e motion.',
  },
  {
    slug: 'biologia-farmacia',
    name: 'Biologia & Farmácia',
    shortName: 'Bio & Farmácia',
    tagline: 'Farmácia, análises clínicas e laboratório',
    description:
      'Oportunidades para farmacêuticos, biólogos e biomédicos: farmácia hospitalar e varejista, análises clínicas, laboratório e meio ambiente.',
  },
  {
    slug: 'arquitetura-urbanismo',
    name: 'Arquitetura & Urbanismo',
    shortName: 'Arquitetura',
    tagline: 'Projeto, obra e desenho técnico',
    description:
      'Vagas para arquitetos e urbanistas: projeto arquitetônico, gestão e execução de obras, interiores, urbanismo e desenho técnico.',
  },
  {
    slug: 'programacao',
    name: 'Programação',
    shortName: 'Dev',
    tagline: 'Desenvolvimento, qualidade e infraestrutura',
    description:
      'Vagas de desenvolvimento de software: front-end, back-end, full stack, mobile, QA e testes, DevOps e liderança técnica.',
  },
];

const bySlug = new Map(areas.map((area) => [area.slug, area]));

export function getAreaBySlug(slug: string): Area | undefined {
  return bySlug.get(slug);
}

/** Nome legível da área; devolve o próprio slug se ela não existir. */
export function getAreaName(slug: string): string {
  return bySlug.get(slug)?.name ?? slug;
}
