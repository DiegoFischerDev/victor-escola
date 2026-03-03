import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "../lib/sanityClient";
import { homePageQuery } from "../lib/queries";

export const revalidate = 0;

type Highlight = { label?: string | null };

type HomePageData = {
  title?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    highlights?: Highlight[];
    heroImage?: {
      url?: string;
    };
  };
  about?: {
    title?: string;
    subtitle?: string;
    mission?: string;
    vision?: string;
    values?: string[];
    highlightStats?: { label?: string; value?: string }[];
  };
  segments?: {
    title?: string;
    subtitle?: string;
    segments?: {
      name?: string;
      ageRange?: string;
      description?: string;
      highlights?: string[];
    }[];
  };
  differentiators?: {
    title?: string;
    subtitle?: string;
    items?: { title?: string; description?: string }[];
  };
  testimonials?: {
    title?: string;
    subtitle?: string;
    testimonials?: { name?: string; role?: string; content?: string }[];
  };
  structure?: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: { title?: string; description?: string }[];
  };
  contact?: {
    title?: string;
    subtitle?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    mapsUrl?: string;
    openingHours?: string;
    formIntro?: string;
  };
};

async function getHomePageData(): Promise<HomePageData | null> {
  const data = await sanityClient.fetch<HomePageData | null>(homePageQuery);
  return data;
}

export default async function Home() {
  const data = await getHomePageData();

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">
          Configure a página inicial no Sanity para começar.
        </p>
      </main>
    );
  }

  const { hero, about, segments, differentiators, testimonials, structure, contact } =
    data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Hero */}
        {hero && (
          <section className="grid gap-10 md:grid-cols-[3fr,2fr] items-center">
            <div className="space-y-6">
              {hero.eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  {hero.eyebrow}
                </p>
              )}
              {hero.title && (
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900">
                  {hero.title}
                </h1>
              )}
              {hero.subtitle && (
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
                  {hero.subtitle}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {hero.primaryCtaLabel && hero.primaryCtaHref && (
                  <Link
                    href={hero.primaryCtaHref}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                  >
                    {hero.primaryCtaLabel}
                  </Link>
                )}
                {hero.secondaryCtaLabel && hero.secondaryCtaHref && (
                  <Link
                    href={hero.secondaryCtaHref}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 bg-white/80 backdrop-blur-sm transition hover:border-slate-400"
                  >
                    {hero.secondaryCtaLabel}
                  </Link>
                )}
              </div>
              {hero.highlights && hero.highlights.length > 0 && (
                <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  {hero.highlights
                    .filter((h) => h?.label)
                    .map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 rounded-xl bg-white/70 px-3 py-2 shadow-sm"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{h?.label}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="hidden h-full md:block">
              {hero.heroImage?.url ? (
                <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={hero.heroImage.url}
                    alt={hero.title ?? "Imagem da escola"}
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative h-72 w-full rounded-3xl bg-gradient-to-br from-blue-600 via-sky-400 to-emerald-400 shadow-xl" />
              )}
            </div>
          </section>
        )}

        {/* Sobre */}
        {about && (
          <section className="grid gap-10 md:grid-cols-2 items-start">
            <div className="space-y-4">
              {about.title && (
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {about.title}
                </h2>
              )}
              {about.subtitle && (
                <p className="text-base text-slate-600">{about.subtitle}</p>
              )}
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {about.mission && (
                  <p>
                    <span className="font-semibold">Missão: </span>
                    {about.mission}
                  </p>
                )}
                {about.vision && (
                  <p>
                    <span className="font-semibold">Visão: </span>
                    {about.vision}
                  </p>
                )}
                {about.values && about.values.length > 0 && (
                  <p>
                    <span className="font-semibold">Valores: </span>
                    {about.values.join(" · ")}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6">
              {about.highlightStats && about.highlightStats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-3">
                  {about.highlightStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-xl font-semibold text-blue-600">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Segmentos */}
        {segments && (
          <section className="space-y-6">
            {segments.title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                {segments.title}
              </h2>
            )}
            {segments.subtitle && (
              <p className="max-w-2xl text-sm sm:text-base text-slate-600">
                {segments.subtitle}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {segments.segments?.map((segment, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                      {segment.ageRange}
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {segment.name}
                    </h3>
                  </div>
                  {segment.description && (
                    <p className="text-xs sm:text-sm text-slate-600">
                      {segment.description}
                    </p>
                  )}
                  {segment.highlights && segment.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-slate-700">
                      {segment.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Diferenciais */}
        {differentiators && (
          <section className="space-y-6">
            {differentiators.title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                {differentiators.title}
              </h2>
            )}
            {differentiators.subtitle && (
              <p className="max-w-2xl text-sm sm:text-base text-slate-600">
                {differentiators.subtitle}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              {differentiators.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Depoimentos */}
        {testimonials && (
          <section className="space-y-6">
            {testimonials.title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                {testimonials.title}
              </h2>
            )}
            {testimonials.subtitle && (
              <p className="max-w-2xl text-sm sm:text-base text-slate-600">
                {testimonials.subtitle}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.testimonials?.map((t, idx) => (
                <figure
                  key={idx}
                  className="flex h-full flex-col justify-between rounded-2xl bg-white p-5 shadow-sm"
                >
                  {t.content && (
                    <blockquote className="text-sm text-slate-700">
                      “{t.content}”
                    </blockquote>
                  )}
                  <figcaption className="mt-4 text-xs text-slate-600">
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    {t.role && <p>{t.role}</p>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Estrutura */}
        {structure && (
          <section className="space-y-6">
            {structure.title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                {structure.title}
              </h2>
            )}
            {structure.subtitle && (
              <p className="max-w-2xl text-sm sm:text-base text-slate-600">
                {structure.subtitle}
              </p>
            )}
            {structure.description && (
              <p className="text-sm text-slate-600 max-w-2xl">
                {structure.description}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              {structure.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-xs text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contato */}
        {contact && (
          <section className="grid gap-10 border-t border-slate-200 pt-10 md:grid-cols-[2fr,3fr]">
            <div className="space-y-4">
              {contact.title && (
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {contact.title}
                </h2>
              )}
              {contact.subtitle && (
                <p className="text-sm sm:text-base text-slate-600">
                  {contact.subtitle}
                </p>
              )}
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {contact.phone && (
                  <p>
                    <span className="font-semibold">Telefone: </span>
                    {contact.phone}
                  </p>
                )}
                {contact.whatsapp && (
                  <p>
                    <span className="font-semibold">WhatsApp: </span>
                    {contact.whatsapp}
                  </p>
                )}
                {contact.email && (
                  <p>
                    <span className="font-semibold">E-mail: </span>
                    {contact.email}
                  </p>
                )}
                {contact.address && (
                  <p>
                    <span className="font-semibold">Endereço: </span>
                    {contact.address}
                  </p>
                )}
                {contact.openingHours && (
                  <p>
                    <span className="font-semibold">Atendimento: </span>
                    {contact.openingHours}
                  </p>
                )}
              </div>
              {contact.mapsUrl && (
                <Link
                  href={contact.mapsUrl}
                  target="_blank"
                  className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Ver no mapa
                </Link>
              )}
            </div>
            <div className="space-y-4">
              {contact.formIntro && (
                <p className="text-sm text-slate-600">{contact.formIntro}</p>
              )}
              <form className="grid gap-3 rounded-2xl bg-white p-5 shadow-sm">
                <div className="grid gap-1">
                  <label className="text-xs font-medium text-slate-700">
                    Nome completo
                  </label>
                  <input
                    className="h-9 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    type="text"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs font-medium text-slate-700">
                    E-mail
                  </label>
                  <input
                    className="h-9 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs font-medium text-slate-700">
                    Telefone
                  </label>
                  <input
                    className="h-9 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    type="tel"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs font-medium text-slate-700">
                    Mensagem
                  </label>
                  <textarea
                    className="min-h-[80px] rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Conte-nos um pouco sobre o que você precisa..."
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  Enviar mensagem
                </button>
                <p className="text-[11px] text-slate-500">
                  Este formulário é ilustrativo. Depois podemos integrar com
                  e-mail, WhatsApp ou outro sistema de CRM.
                </p>
              </form>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

