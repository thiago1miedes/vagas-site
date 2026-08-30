import Link from 'next/link';

import { AreaList } from '@/components/areas/AreaList';
import { CategoryTags } from '@/components/categories/CategoryTags';
import { JobCard } from '@/components/jobs/JobCard';
import { JobGrid } from '@/components/jobs/JobGrid';
import { JobSearchForm } from '@/components/jobs/JobSearchForm';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ArrowRight } from '@/components/ui/icons';
import { areas } from '@/data/areas';
import { getCategoriesByArea } from '@/data/categories';
import { formatFullDate } from '@/lib/formatDate';
import {
  countJobsByArea,
  countJobsByCategory,
  getAllJobs,
  getJobsByArea,
  getJobsOfTheDay,
  getLatestPublishedDate,
} from '@/lib/jobs';
import { pluralizeJobs } from '@/lib/utils';

/**
 * As datas relativas ("Publicada hoje") são calculadas na geração da página.
 * Revalidar uma vez por dia mantém esse texto correto sem novo deploy.
 */
export const revalidate = 86400;

export default function HomePage() {
  const totalJobs = getAllJobs().length;
  const jobsOfTheDay = getJobsOfTheDay();
  const latestDate = getLatestPublishedDate();

  // A primeira vaga do dia abre a página como matéria principal.
  const [leadJob, ...otherJobsOfTheDay] = jobsOfTheDay;
  const highlights = otherJobsOfTheDay.slice(0, 4);

  const areaCounts = countJobsByArea();
  const categoryCounts = countJobsByCategory();

  const areaBlocks = areas.map((area) => ({
    area,
    count: areaCounts[area.slug] ?? 0,
    jobs: getJobsByArea(area.slug).slice(0, 4),
    categories: getCategoriesByArea(area.slug).map((category) => ({
      ...category,
      count: categoryCounts[category.slug] ?? 0,
    })),
  }));

  const areasWithCount = areas.map((area) => ({
    ...area,
    count: areaCounts[area.slug] ?? 0,
  }));

  return (
    <>
      {/* Abertura */}
      <section className="border-b border-line">
        <Container>
          <div className="py-14 sm:py-20">
            <p className="eyebrow">Vagas selecionadas todos os dias</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Oportunidades em design, arquitetura, saúde e tecnologia.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Vagas encontradas em diferentes plataformas, reunidas e organizadas
              por área em um só lugar.
            </p>

            <div className="mt-10 max-w-xl">
              <JobSearchForm
                id="busca-home"
                size="lg"
                placeholder="Pesquisar por cargo, empresa ou palavra-chave"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Linha de edição, no espírito de uma capa de jornal */}
      {latestDate ? (
        <div className="border-b border-line bg-surface">
          <Container>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 py-3 text-sm">
              <span className="font-medium text-ink">
                Edição de {formatFullDate(latestDate)}
              </span>
              <span className="text-muted">
                {pluralizeJobs(jobsOfTheDay.length)}
                {jobsOfTheDay.length === 1 ? ' nova' : ' novas'}
              </span>
              <span className="text-muted">
                {pluralizeJobs(totalJobs)} no total
              </span>
            </div>
          </Container>
        </div>
      ) : null}

      <Container>
        {/* Vagas do dia */}
        <section aria-labelledby="vagas-do-dia" className="py-12 sm:py-14">
          <SectionHeading
            id="vagas-do-dia"
            eyebrow="Hoje"
            title="Vagas do dia"
            description="A leva mais recente, publicada de uma vez e organizada por área."
            href="/vagas"
            linkLabel="Ver todas as vagas"
          />

          <div className="mt-8">
            {leadJob ? (
              <>
                <JobCard job={leadJob} featured />
                {highlights.length > 0 ? (
                  <div className="mt-3">
                    <JobGrid jobs={highlights} />
                  </div>
                ) : null}
              </>
            ) : (
              <EmptyState
                title="Nenhuma vaga publicada ainda"
                description="Assim que a primeira vaga for adicionada, ela aparece aqui."
              />
            )}
          </div>
        </section>

        {/* Índice das áreas */}
        <section aria-labelledby="areas" className="border-t border-line py-12 sm:py-14">
          <SectionHeading
            id="areas"
            eyebrow="Índice"
            title="Áreas"
            description="Cada área tem suas próprias categorias e sua página com todas as vagas abertas."
          />
          <div className="mt-8">
            <AreaList areas={areasWithCount} />
          </div>
        </section>

        {/* Um bloco por área */}
        {areaBlocks.map(({ area, count, jobs, categories }, index) => (
          <section
            key={area.slug}
            aria-labelledby={`area-${area.slug}`}
            className="border-t border-line py-12 sm:py-14"
          >
            <SectionHeading
              id={`area-${area.slug}`}
              eyebrow={`Área ${String(index + 1).padStart(2, '0')}`}
              title={area.name}
              description={area.description}
              href={`/areas/${area.slug}`}
              linkLabel={`Ver as ${count} vagas`}
            />

            <div className="mt-6">
              <CategoryTags categories={categories} />
            </div>

            <div className="mt-8">
              {jobs.length > 0 ? (
                <JobGrid jobs={jobs} />
              ) : (
                <p className="text-sm text-muted">
                  Nenhuma vaga aberta nesta área por enquanto.
                </p>
              )}
            </div>

            {count > jobs.length ? (
              <div className="mt-8">
                <Link
                  href={`/areas/${area.slug}`}
                  className="group inline-flex items-center gap-2 text-sm text-navy transition-colors duration-150 hover:text-indigo"
                >
                  Ver as outras {count - jobs.length} vagas de {area.name}
                  <ArrowRight className="transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </div>
            ) : null}
          </section>
        ))}

        {/* Fecho */}
        <section className="border-t border-line py-12 sm:py-14">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Procurando algo específico?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                A página de vagas reúne todas as áreas, com busca e filtros por
                área, modelo de trabalho, contrato e nível.
              </p>
            </div>
            <Link href="/vagas" className={buttonClasses('primary')}>
              Ver todas as vagas
              <ArrowRight />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
