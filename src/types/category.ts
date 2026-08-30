export interface Category {
  /** usado na URL: /categorias/[slug] */
  slug: string;
  name: string;
  /** slug de uma área declarada em `src/data/areas.ts` */
  area: string;
  /** frase curta exibida na página da categoria */
  description: string;
}

/** Categoria acompanhada da quantidade de vagas abertas. */
export interface CategoryWithCount extends Category {
  count: number;
}
