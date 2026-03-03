import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'structureSection',
  title: 'Seção Estrutura Física',
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
      name: 'description',
      title: 'Descrição geral',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Ambientes / Estrutura',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Ambiente',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Nome do ambiente',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
  ],
})

