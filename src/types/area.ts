export interface Area {
  /** usado na URL: /areas/[slug] */
  slug: string;
  /** nome completo, usado em títulos */
  name: string;
  /** versão curta, usada no menu do header */
  shortName: string;
  /** frase de uma linha, exibida abaixo do nome */
  tagline: string;
  /** parágrafo de apresentação da área */
  description: string;
}

/** Área acompanhada da quantidade de vagas abertas. */
export interface AreaWithCount extends Area {
  count: number;
}
