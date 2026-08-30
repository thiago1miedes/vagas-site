import Link from 'next/link';

import { ArrowRight } from '@/components/ui/icons';

/**
 * Cabeçalho editorial das seções da home: rótulo, título, apoio e um link
 * opcional "ver todas" alinhado à direita.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2
          id={id}
          className="mt-2 text-2xl font-semibold tracking-tight text-ink"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>

      {href && linkLabel ? (
        <Link
          href={href}
          className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-navy transition-colors duration-150 hover:text-indigo"
        >
          {linkLabel}
          <ArrowRight className="transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
