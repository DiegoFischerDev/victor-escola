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
    heroVideo?: {
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
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#8bc53f] text-white shadow-sm">
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
              className="rounded-full bg-[#e9a52e] px-4 py-1.5 text-xs font-semibold text-[#3b3b3b]"
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
              className="rounded-full border-0 bg-[#e9a52e] px-4 py-1.5 text-xs font-semibold text-[#3b3b3b] hover:bg-[#d18f1f]"
            >
              <Link href="#contact">Agende uma visita</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero full-bleed, com vídeo do Sanity se disponível */}
      {hero && (
        <section
          id="hero"
          className="relative w-full overflow-hidden bg-slate-900 text-white"
        >
          {/* Fundo de vídeo vindo do Sanity, com fallback para imagem */}
          {hero.heroVideo?.url ? (
            <div className="pointer-events-none absolute inset-0 z-0">
              <video
                className="h-full w-full object-cover"
                src={hero.heroVideo.url}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          ) : hero.heroImage?.url ? (
            <div className="pointer-events-none absolute inset-0 z-0">
              <Image
                src={hero.heroImage.url}
                alt={hero.title ?? "Imagem da escola"}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}

          {/* Overlay em gradiente para garantir contraste do texto */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/55 to-black/30" />

          <div className="relative z-10 mx-auto flex min-h-[360px] max-w-6xl flex-col justify-center px-4 py-16 sm:px-8 md:px-12 lg:min-h-[440px] lg:px-12 lg:py-20">
            <div className="max-w-3xl space-y-4">
              {hero.eyebrow && (
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#e9a52e]">
                  {hero.eyebrow}
                </p>
              )}
              {hero.title && (
                <h1 className="text-3xl font-semibold tracking-[0.04em] text-white sm:text-4xl lg:text-[46px] lg:leading-[1.15]">
                  {hero.title}
                </h1>
              )}
              {hero.subtitle && (
                <p className="mt-2 text-sm leading-relaxed text-slate-100/90 sm:text-base">
                  {hero.subtitle}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {hero.primaryCtaLabel && hero.primaryCtaHref && (
                  <Button
                    asChild
                    className="rounded-none bg-[#e9a52e] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3b3b3b] hover:bg-[#d18f1f]"
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
                    className="rounded-none border border-white/80 bg-white/15 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-white/25"
                  >
                    <Link href={hero.secondaryCtaHref}>
                      {hero.secondaryCtaLabel}
                    </Link>
                  </Button>
                )}
              </div>

              {hero.highlights && hero.highlights.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {hero.highlights
                    .filter((h) => h?.label)
                    .map((h, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-slate-100 ring-1 ring-white/10"
                      >
                        {h?.label}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-16 pt-8 sm:px-8 lg:max-w-7xl lg:px-12">

        {/* Sobre */}
        {about && (
          <section
            id="about"
            className="rounded-3xl bg-white/90 px-4 py-10 shadow-sm ring-1 ring-black/5 sm:px-6 lg:px-10"
          >
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr,1.7fr] md:items-center">
              {/* Coluna da imagem */}
              <div className="space-y-4">
                {about.image?.url && (
                  <div className="relative h-60 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:h-72 lg:h-80">
                    <Image
                      src={about.image.url}
                      alt={about.title ?? "Sobre a escola"}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute left-5 bottom-5 rounded-full bg-black/55 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-50">
                      Escola em movimento
                    </div>
                  </div>
                )}

                {about.highlightStats && about.highlightStats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {about.highlightStats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-[#f5f5f5] px-4 py-3 text-left"
                      >
                        <p className="text-xl font-semibold text-[#8bc53f]">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Coluna de texto */}
              <div className="space-y-5">
                <SectionHeader
                  title={about.title}
                  subtitle={about.subtitle}
                />

                <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                  {about.mission && (
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c75bb]">
                        Missão
                      </p>
                      <p className="mt-2">{about.mission}</p>
                    </div>
                  )}
                  {about.vision && (
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e9a52e]">
                        Visão
                      </p>
                      <p className="mt-2">{about.vision}</p>
                    </div>
                  )}
                </div>

                {about.values && about.values.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Valores que nos guiam
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {about.values.map((value, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Segmentos – cards de ciclos com design institucional */}
        {segments && (
          <section
            id="segments"
            className="rounded-3xl bg-white/90 px-4 py-10 shadow-sm ring-1 ring-black/5 sm:px-6"
          >
            <div className="mx-auto max-w-5xl space-y-8">
              <SectionHeader
                title={segments.title}
                subtitle={segments.subtitle}
              />

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {segments.segments?.map((segment, idx) => (
                  <Card
                    key={idx}
                    className="flex h-full flex-col gap-4 border-none bg-white px-5 py-5 shadow-sm ring-1 ring-slate-100"
                  >
                    <div className="flex items-start gap-4">
                      {segment.icon?.url && (
                        <div className="relative mt-1 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-[#f0f7e6] ring-1 ring-[#8bc53f]/30">
                          <Image
                            src={segment.icon.url}
                            alt={segment.name ?? "Segmento"}
                            fill
                            sizes="48px"
                            className="object-contain p-2"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        {segment.ageRange && (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {segment.ageRange}
                          </p>
                        )}
                        <h3 className="text-base font-semibold text-slate-900">
                          {segment.name}
                        </h3>
                      </div>
                    </div>

                    {segment.description && (
                      <p className="text-sm leading-relaxed text-slate-700">
                        {segment.description}
                      </p>
                    )}

                    {segment.highlights && segment.highlights.length > 0 && (
                      <ul className="mt-1 space-y-1 text-xs text-slate-600">
                        {segment.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#8bc53f]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Diferenciais */}
        {differentiators && (
          <section
            id="differentials"
            className="space-y-6 rounded-3xl bg-white/90 px-6 py-8 shadow-sm ring-1 ring-black/5 sm:px-8 lg:px-10"
          >
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
                <Card
                  key={idx}
                  className="border-none bg-white p-5 shadow-sm ring-1 ring-slate-100"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-700">
                      {item.description}
                    </p>
                  )}
                </Card>
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
          <section className="grid gap-10 border-t border-slate-200 pt-10 md:grid-cols-[1.4fr,1.6fr]">
            <div className="space-y-6">
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

              <div className="grid gap-4 md:grid-cols-2 md:items-start">
                {/* Bloco de informações */}
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="space-y-2">
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
                </div>

                {/* Bloco do mapa ao lado das informações */}
                {contact.mapsUrl && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Localização
                    </p>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5 shadow-sm transition hover:bg-slate-900/10">
                      <iframe
                        src={contact.mapsUrl}
                        title="Localização no mapa"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-44 w-full border-0 opacity-80 transition hover:opacity-100"
                        allowFullScreen
                      />
                    </div>
                    <Link
                      href={contact.mapsUrl}
                      target="_blank"
                      className="inline-flex text-xs font-medium text-[#1c75bb] hover:text-[#155a8c]"
                    >
                      Ver no Google Maps
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4 md:ml-auto md:max-w-md">
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

      {/* Footer com dados vindos do Sanity (contato) */}
      <footer className="mt-8 border-t border-black/5 bg-[#171717] text-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8 lg:max-w-7xl lg:flex-row lg:items-start lg:justify-between lg:px-12">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-[#8bc53f]">
              COLÉGIO HORIZONTE
            </h3>
            {contact?.address && (
              <p className="text-sm text-slate-300">
                {contact.address}
              </p>
            )}
            <div className="space-y-1 text-sm text-slate-300">
              {contact?.phone && <p>Tel.: {contact.phone}</p>}
              {contact?.email && <p>E-mail: {contact.email}</p>}
              {contact?.openingHours && (
                <p>Atendimento: {contact.openingHours}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Navegação
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <Link href="#about" className="hover:text-white">
                Sobre
              </Link>
              <Link href="#segments" className="hover:text-white">
                Ensino
              </Link>
              <Link href="#differentials" className="hover:text-white">
                Projetos
              </Link>
              <Link href="#structure" className="hover:text-white">
                Estrutura
              </Link>
              <Link href="#contact" className="hover:text-white">
                Contacto
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:px-8 lg:max-w-7xl lg:px-12">
            <p>
              © {new Date().getFullYear()} Colégio Horizonte. Todos os direitos
              reservados.
            </p>
            <p className="text-[11px] text-slate-500">
              Desenvolvido por{" "}
              <Link
                href="https://wa.me/351935315116"
                target="_blank"
                className="font-medium text-slate-300 hover:text-white"
              >
                Victor Candido
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

