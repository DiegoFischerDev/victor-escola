import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "../lib/sanityClient";
import { homePageQuery } from "../lib/queries";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/section-header";

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
    image?: { url?: string };
  };
  segments?: {
    title?: string;
    subtitle?: string;
    segments?: {
      name?: string;
      ageRange?: string;
      description?: string;
      highlights?: string[];
      icon?: { url?: string };
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
    testimonials?: {
      name?: string;
      role?: string;
      content?: string;
      avatar?: { url?: string };
    }[];
  };
  structure?: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: { title?: string; description?: string; image?: { url?: string } }[];
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
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900">
      {/* Header fixo com paleta verde/bege inspirada no site modelo */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#8dc044] text-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:max-w-7xl lg:px-12">
          {/* Marca */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
              VH
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide">
                Colégio Horizonte
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                Educação Infantil · Fundamental · Médio
              </p>
            </div>
          </div>

          {/* Navegação principal */}
          <nav className="hidden items-center gap-4 text-[12px] font-medium uppercase tracking-[0.12em] sm:flex">
            <Link
              href="#hero"
              className="rounded-full bg-[#cbbba0] px-4 py-1.5 text-xs font-semibold text-[#3b3b3b]"
            >
              Início
            </Link>
            <Link href="#about" className="px-3 py-1.5 hover:text-[#3b3b3b]">
              Colégio
            </Link>
            <Link
              href="#segments"
              className="px-3 py-1.5 hover:text-[#3b3b3b]"
            >
              Ensino
            </Link>
            <Link
              href="#differentials"
              className="px-3 py-1.5 hover:text-[#3b3b3b]"
            >
              Projetos
            </Link>
            <Link
              href="#contact"
              className="px-3 py-1.5 hover:text-[#3b3b3b]"
            >
              Contactos
            </Link>
          </nav>

          {/* CTA à direita */}
          <div className="hidden sm:flex">
            <Button
              asChild
              className="rounded-full border-0 bg-[#cbbba0] px-4 py-1.5 text-xs font-semibold text-[#3b3b3b] hover:bg-[#afa085]"
            >
              <Link href="#contact">Agende uma visita</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-16 pt-8 sm:px-8 lg:max-w-7xl lg:px-12">
        {/* Hero tipo “page title” com imagem de fundo clara e textos escuros */}
        {hero && (
          <section
            id="hero"
            className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/40 text-slate-900"
          >
            {hero.heroImage?.url && (
              <div className="pointer-events-none absolute inset-0 -z-10">
                <Image
                  src={hero.heroImage.url}
                  alt={hero.title ?? "Imagem da escola"}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            )}

            <div className="relative px-6 py-16 sm:px-10 md:px-16">
              <div className="max-w-3xl">
                {hero.eyebrow && (
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#cbbba0]">
                    {hero.eyebrow}
                  </p>
                )}
                {hero.title && (
                  <h1 className="text-3xl font-normal tracking-[0.05em] text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.2]">
                    {hero.title}
                  </h1>
                )}
                {hero.subtitle && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-base">
                    {hero.subtitle}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {hero.primaryCtaLabel && hero.primaryCtaHref && (
                    <Button
                      asChild
                      className="rounded-none bg-[#cbbba0] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3b3b3b] hover:bg-[#afa085]"
                    >
                      <Link href={hero.primaryCtaHref}>
                        {hero.primaryCtaLabel}
                      </Link>
                    </Button>
                  )}
                  {hero.secondaryCtaLabel && hero.secondaryCtaHref && (
                    <Button
                      asChild
                      variant="secondary"
                      className="rounded-none border border-slate-800/60 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 hover:bg-black/5"
                    >
                      <Link href={hero.secondaryCtaHref}>
                        {hero.secondaryCtaLabel}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sobre */}
        {about && (
          <section
            id="about"
            className="grid gap-10 rounded-3xl bg-slate-50 px-6 py-8 shadow-sm ring-1 ring-slate-100 md:grid-cols-[1.4fr,1.6fr] sm:px-8 lg:px-10"
          >
            <div className="space-y-4">
              <SectionHeader title={about.title} subtitle={about.subtitle} />
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
              {/* Imagem da seção sobre */}
              {about.image?.url && (
                <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:h-64">
                  <Image
                    src={about.image.url}
                    alt={about.title ?? "Sobre a escola"}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              )}
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

        {/* Segmentos – grade de ciclos inspirada na seção “Ensino” */}
        {segments && (
          <section id="segments" className="rounded-3xl bg-white/90 px-4 py-10 shadow-sm ring-1 ring-black/5 sm:px-6">
            <div className="mx-auto max-w-5xl">
              <SectionHeader
                title={segments.title}
                subtitle={segments.subtitle}
              />

              <div className="mt-10 flex flex-wrap justify-center gap-8">
                {/* colunas centrais com segmentos */}
                {segments.segments?.map((segment, idx) => (
                  <div
                    key={idx}
                    className="flex w-full max-w-xs flex-col items-center text-center sm:w-1/2 lg:w-1/5"
                  >
                    {segment.icon?.url && (
                      <div className="mb-4 h-16 w-16">
                        <Image
                          src={segment.icon.url}
                          alt={segment.name ?? "Segmento"}
                          width={64}
                          height={64}
                          className="mx-auto h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8dc044]">
                      {segment.name}
                    </h3>
                    {segment.description && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        {segment.description}
                      </p>
                    )}
                    {segment.highlights && segment.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-600">
                        {segment.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Diferenciais */}
        {differentiators && (
          <section
            id="differentials"
            className="space-y-6 rounded-3xl bg-slate-900 px-6 py-8 text-slate-50 shadow-sm sm:px-8 lg:px-10"
          >
            {differentiators.title && (
              <h2 className="text-2xl sm:text-3xl font-semibold">
                {differentiators.title}
              </h2>
            )}
            {differentiators.subtitle && (
              <p className="max-w-2xl text-sm sm:text-base text-slate-200/80">
                {differentiators.subtitle}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              {differentiators.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-700/80 bg-slate-900/40 p-5 shadow-sm backdrop-blur-sm"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-slate-50">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-200/80">
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
                  className="flex h-full flex-col justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
                >
                  <div className="flex items-start gap-3">
                    {t.avatar?.url && (
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
                        <Image
                          src={t.avatar.url}
                          alt={t.name ?? "Pessoa"}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      {t.role && (
                        <p className="text-[11px] text-slate-500">{t.role}</p>
                      )}
                    </div>
                  </div>
                  {t.content && (
                    <blockquote className="mt-3 text-sm text-slate-700">
                      “{t.content}”
                    </blockquote>
                  )}
                  <figcaption className="mt-3 text-[11px] text-slate-400">
                    Família do Colégio Horizonte
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Estrutura */}
        {structure && (
          <section id="structure" className="space-y-6">
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
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
                >
                  {item.image?.url && (
                    <div className="relative h-32 w-full">
                      <Image
                        src={item.image.url}
                        alt={item.title ?? "Ambiente escolar"}
                        fill
                        sizes="(min-width: 1024px) 260px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-1 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-xs text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>
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

