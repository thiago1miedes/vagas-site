import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { buttonClasses } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container>
      <div className="max-w-prose py-24 sm:py-32">
        <p className="eyebrow">Erro 404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A vaga pode ter expirado ou o endereço está incorreto.
        </p>
        <div className="mt-8">
          <Link href="/vagas" className={buttonClasses('primary')}>
            Ver todas as vagas
          </Link>
        </div>
      </div>
    </Container>
  );
}
