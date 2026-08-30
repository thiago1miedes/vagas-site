import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/layout/Logo';
import { areas } from '@/data/areas';
import { site } from '@/lib/site';

const generalLinks = [
  { href: '/vagas', label: 'Todas as vagas' },
  { href: '/categorias', label: 'Categorias' },
  { href: '/sobre', label: 'Sobre' },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {site.shortDescription}
            </p>
          </div>

          <nav aria-labelledby="rodape-areas">
            <h2 id="rodape-areas" className="text-sm font-medium text-ink">
              Áreas
            </h2>
            <ul className="mt-3 space-y-2">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="text-sm text-slate transition-colors duration-150 hover:text-navy"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="rodape-navegacao">
            <h2 id="rodape-navegacao" className="text-sm font-medium text-ink">
              Navegação
            </h2>
            <ul className="mt-3 space-y-2">
              {generalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate transition-colors duration-150 hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-line py-6">
          <p className="text-xs text-muted">
            {site.name} — projeto interno de organização de vagas.
          </p>
        </div>
      </Container>
    </footer>
  );
}
