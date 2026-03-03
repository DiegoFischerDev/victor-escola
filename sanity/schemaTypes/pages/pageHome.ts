import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageHome',
  title: 'Página Inicial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título interno da página',
      type: 'string',
      initialValue: 'Home',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Seção Hero (Topo)',
      type: 'reference',
      to: [{type: 'heroSection'}],
    }),
    defineField({
      name: 'about',
      title: 'Seção Sobre',
      type: 'reference',
      to: [{type: 'aboutSection'}],
    }),
    defineField({
      name: 'segments',
      title: 'Seção Segmentos / Etapas',
      type: 'reference',
      to: [{type: 'segmentsSection'}],
    }),
    defineField({
      name: 'differentiators',
      title: 'Seção Diferenciais',
      type: 'reference',
      to: [{type: 'differentiatorsSection'}],
    }),
    defineField({
      name: 'testimonials',
      title: 'Seção Depoimentos',
      type: 'reference',
      to: [{type: 'testimonialsSection'}],
    }),
    defineField({
      name: 'structure',
      title: 'Seção Estrutura Física',
      type: 'reference',
      to: [{type: 'structureSection'}],
    }),
    defineField({
      name: 'contact',
      title: 'Seção Contato',
      type: 'reference',
      to: [{type: 'contactSection'}],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Título para SEO e redes sociais.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Descrição para SEO e redes sociais.',
    }),
  ],
})

