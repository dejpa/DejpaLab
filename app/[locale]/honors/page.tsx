import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

const sourceUrl = 'https://www.dejpa.com/fa/visions/resilience/honors-opportunities';
const documentsBase = 'https://www.dejpa.com/Portals/0/featured-certificates/';
const laboratoryHonors = [
  { key: 'iso17025', image: 'iso17025', document: '19-iso17025-2025.jpg' },
  { key: 'partnerLab', image: 'lab-grade-1', document: '24-lab-grade-1.jpg' },
];
const companyHonors = [
  { key: 'knowledgeBased', image: 'knowledge-based', document: '26-knowledge-based.jpg' },
  { key: 'nationalStandard', image: 'national-standard-1405', document: 'national-standard-award-1405/national-standard-award-1405-cover.jpg' },
  { key: 'technicalGrade', image: 'technical-a-plus', document: '30-technical-a-plus.jpg' },
];
const otherHonors = ['standardUnits', 'technologyUnit', 'iso9001', 'iso45001', 'iso14001', 'iso10002', 'iso10004', 'iso26000'];

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'honors' });
  return { title: `${t('title')} | DejpaLab`, description: t('subtitle') };
}

export default async function HonorsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('honors');

  const renderHonor = (honor: typeof laboratoryHonors[number]) => (
    <article key={honor.key} className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md">
      <a href={`${documentsBase}${honor.document}`} target="_blank" rel="noopener noreferrer" className="group block border-b border-gray-100 bg-gray-50 p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600" aria-label={`${t('viewDocument')}: ${t(`items.${honor.key}.title`)}`}>
        <div className="relative h-72">
          <Image src={`/img/honors/${honor.image}.jpg`} alt={t(`items.${honor.key}.title`)} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
        </div>
      </a>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="mb-3 text-xl font-bold leading-relaxed text-gray-900">{t(`items.${honor.key}.title`)}</h3>
        <p className="mb-6 leading-8 text-gray-600">{t(`items.${honor.key}.description`)}</p>
        <a href={`${documentsBase}${honor.document}`} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 font-medium text-primary-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
          {t('viewDocument')}<ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </article>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <section className="relative isolate overflow-hidden bg-primary-900 px-4 py-20 text-center text-white md:py-28">
        <Image src="/img/honors/dejpalab-standard-trophy-cover-v3.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-primary-900/45" aria-hidden="true" />
        <div className="relative z-10">
          <Award className="mx-auto mb-6 h-14 w-14" aria-hidden="true" />
          <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">{t('title')}</h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-white/90">{t('subtitle')}</p>
        </div>
      </section>
      <div className="container mx-auto space-y-16 px-4 py-16 md:py-20">
        <section aria-labelledby="company-honors">
          <h2 id="company-honors" className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{t('companyTitle')}</h2>
          <p className="mb-8 leading-8 text-gray-600">{t('companyNote')}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{companyHonors.map(renderHonor)}</div>
        </section>
        <section aria-labelledby="laboratory-honors">
          <h2 id="laboratory-honors" className="mb-8 flex items-center gap-3 text-2xl font-bold text-gray-900 md:text-3xl"><ShieldCheck className="h-8 w-8 shrink-0 text-primary-600" aria-hidden="true" />{t('labTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2">{laboratoryHonors.map(renderHonor)}</div>
        </section>
        <section aria-labelledby="other-honors">
          <h2 id="other-honors" className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">{t('otherTitle')}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {otherHonors.map(key => (
              <li key={key} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-900">{t(`items.${key}.title`)}</h3>
                <p className="leading-8 text-gray-600">{t(`items.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </section>
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 text-center">
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium leading-8 text-primary-800 underline underline-offset-4">{t('sourceLabel')}<ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  );
}
