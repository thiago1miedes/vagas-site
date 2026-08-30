import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { buttonClasses } from '@/components/ui/Button';
import { areas } from '@/data/areas';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sobre o projeto',
  description:
    'Um espaço criado para centralizar e organizar oportunidades de trabalho em design, arquitetura, biologia e farmácia, e programação.',
};

export default function AboutPage() {
  return (
    <Container>
      <div className="max-w-prose py-14 sm:py-20">
        <p className="eyebrow">Sobre</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Sobre o projeto
        </h1>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-slate">
          <p>
            Este é um espaço criado para centralizar e organizar oportunidades de
            trabalho encontradas no dia a dia, em diferentes plataformas.
          </p>
          <p>
            A proposta é reunir essas vagas em uma interface simples e
            organizada, com foco na leitura e na consulta. O conteúdo é dividido
            em áreas, cada uma com suas próprias categorias:
          </p>
        </div>

        <ul className="job-list mt-6">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="font-medium text-navy transition-colors duration-150 hover:text-indigo"
              >
                {area.name}
              </Link>
              {' — '}
              {area.tagline}.
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-slate">
          <p>
            As vagas são selecionadas e publicadas manualmente, e o design segue
            sendo a área principal do projeto. A candidatura sempre acontece no
            site ou no formulário da própria empresa — o {site.name} apenas
            organiza e dá acesso às oportunidades.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/vagas" className={buttonClasses('secondary')}>
            Ver as vagas
          </Link>
        </div>
      </div>
    </Container>
  );
}
