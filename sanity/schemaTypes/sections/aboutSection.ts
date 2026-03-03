import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'Seção Sobre a Escola',
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
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Texto principal',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'mission',
      title: 'Missão',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Visão',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'highlightStats',
      title: 'Números de destaque',
      type: 'array',
      of: [
        defineField({
          name: 'stat',
          title: 'Número de destaque',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Rótulo',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Imagem da seção',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})

