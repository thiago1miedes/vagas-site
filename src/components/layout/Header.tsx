'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { JobSearchForm } from '@/components/jobs/JobSearchForm';
import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/layout/Logo';
import { areas } from '@/data/areas';
import { cn } from '@/lib/utils';

/** As áreas abrem o menu; as páginas gerais vêm depois, separadas por um traço. */
const areaLinks = areas.map((area) => ({
  href: `/areas/${area.slug}`,
  label: area.shortName,
}));

const generalLinks = [
  { href: '/vagas', label: 'Vagas' },
  { href: '/categorias', label: 'Categorias' },
  { href: '/sobre', label: 'Sobre' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o menu ao navegar para outra página.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkClasses = (href: string) =>
    cn(
      'text-sm transition-colors duration-150 hover:text-navy',
      isActive(href) ? 'font-medium text-navy' : 'text-slate',
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {areaLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={linkClasses(item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li aria-hidden="true" className="h-4 w-px bg-line" />

              {generalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={linkClasses(item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden w-48 lg:block">
            <JobSearchForm id="busca-header" placeholder="Buscar" label="Buscar vagas" />
          </div>

          <button
            type="button"
            className="-mr-2 p-2 text-slate lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? 'Fechar menu' : 'Abrir menu'}
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div id="menu-mobile" className="border-t border-line bg-white lg:hidden">
          <Container className="py-5">
            <nav aria-label="Principal (mobile)">
              <p className="eyebrow">Áreas</p>
              <ul className="mt-2 space-y-1">
                {areaLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'block py-2 text-[15px] transition-colors duration-150',
                        isActive(item.href)
                          ? 'font-medium text-navy'
                          : 'text-slate hover:text-navy',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-4 space-y-1 border-t border-line pt-4">
                {generalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'block py-2 text-[15px] transition-colors duration-150',
                        isActive(item.href)
                          ? 'font-medium text-navy'
                          : 'text-slate hover:text-navy',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4">
              <JobSearchForm id="busca-mobile" placeholder="Buscar vagas" />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
