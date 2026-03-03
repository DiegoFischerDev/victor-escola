import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Seção Hero (Topo)',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Título interno',
      type: 'string',
      description: 'Apenas para identificação dentro do CMS (não aparece no site).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Chamada pequena acima do título',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Texto do botão principal',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Link do botão principal',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Texto do botão secundário',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Link do botão secundário',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem principal',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroVideo',
      title: 'Vídeo da seção (7–10s, sem áudio)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description:
        'Suba aqui um vídeo curto em loop para o fundo da hero. Se vazio, será usada apenas a imagem.',
    }),
    defineField({
      name: 'highlights',
      title: 'Destaques rápidos (3–4 itens)',
      type: 'array',
      of: [
        defineField({
          name: 'highlight',
          title: 'Destaque',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Texto',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})

