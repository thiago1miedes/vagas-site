import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { RelatedJobs } from '@/components/jobs/RelatedJobs';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { buttonClasses } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from '@/components/ui/icons';
import { getCategoryName } from '@/data/categories';
import { formatFullDate, formatPublishedAt } from '@/lib/formatDate';
import { getAllJobs, getJobBySlug, getRelatedJobs } from '@/lib/jobs';
import { site } from '@/lib/site';
import type { Job } from '@/types/job';

/**
 * As datas relativas ("Publicada hoje") são calculadas na geração da página.
 * Revalidar uma vez por dia mantém esse texto correto sem novo deploy.
 */
export const revalidate = 86400;

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const job = getJobBySlug((await params).slug);
  if (!job) return { title: 'Vaga não encontrada' };

  const description = `Vaga de ${job.title} na ${job.company}. ${job.workModel} · ${job.employmentType} · ${job.seniority} · ${job.location}.`;

  return {
    title: `${job.title} na ${job.company}`,
    description,
    alternates: { canonical: `/vagas/${job.slug}` },
    openGraph: {
      type: 'article',
      title: `${job.title} na ${job.company} | ${site.name}`,
      description,
      url: `/vagas/${job.slug}`,
      publishedTime: job.publishedAt,
    },
  };
}

/** Bloco de lista usado em Responsabilidades, Requisitos e Diferenciais. */
function JobSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <ul className="job-list mt-4">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/** Linha "rótulo / valor" da sidebar. */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-3 first:border-t-0 first:pt-0">
      <dt className="text-xs uppercase tracking-eyebrow text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value}</dd>
    </div>
  );
}

function ApplyButton({ job, className }: { job: Job; className?: string }) {
  return (
    <a
      href={job.applicationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses('primary', className)}
    >
      Candidatar-se para a vaga
      <ArrowRight />
    </a>
  );
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = getJobBySlug((await params).slug);
  if (!job) notFound();

  const related = getRelatedJobs(job, 4);
  const meta = [job.workModel, job.employmentType, job.seniority].join(' · ');

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <Link
          href="/vagas"
          className="group inline-flex items-center gap-2 text-sm text-slate transition-colors duration-150 hover:text-navy"
        >
          <ArrowLeft className="transition-transform duration-150 group-hover:-translate-x-1" />
          Voltar para vagas
        </Link>

        <article className="mt-8">
          <header className="border-b border-line pb-10">
            <Link href={`/categorias/${job.category}`}>
              <Badge className="transition-colors duration-150 hover:border-navy">
                {getCategoryName(job.category)}
              </Badge>
            </Link>

            <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-2 text-lg text-slate">{job.company}</p>

            <p className="mt-5 text-sm text-muted">{meta}</p>
            <p className="mt-1 text-sm text-muted">
              Publicada em{' '}
              <time dateTime={job.publishedAt}>{formatFullDate(job.publishedAt)}</time>
            </p>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div className="max-w-prose pt-10">
              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                  Sobre a vaga
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate">
                  {job.description}
                </p>
              </section>

              <JobSection title="Responsabilidades" items={job.responsibilities} />
              <JobSection title="Requisitos" items={job.requirements} />
              <JobSection title="Diferenciais" items={job.differentials} />

              {/* No mobile o botão fica ao final da leitura; no desktop, na sidebar. */}
              <div className="mt-12 lg:hidden">
                <ApplyButton job={job} className="w-full" />
              </div>
            </div>

            <aside className="pt-10 lg:pt-10">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-card border border-line p-6">
                  <h2 className="text-sm font-semibold text-ink">
                    Informações da vaga
                  </h2>
                  <dl className="mt-4">
                    <InfoRow label="Empresa" value={job.company} />
                    <InfoRow label="Modelo" value={job.workModel} />
                    <InfoRow label="Contrato" value={job.employmentType} />
                    <InfoRow label="Nível" value={job.seniority} />
                    <InfoRow label="Localização" value={job.location} />
                    {job.salary ? <InfoRow label="Salário" value={job.salary} /> : null}
                    <InfoRow
                      label="Publicação"
                      value={formatPublishedAt(job.publishedAt)}
                    />
                  </dl>
                </div>

                <div className="mt-4 hidden lg:block">
                  <ApplyButton job={job} className="w-full" />
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    A candidatura acontece no site da empresa, em uma nova aba.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </article>

        <RelatedJobs jobs={related} />
      </div>
    </Container>
  );
}
