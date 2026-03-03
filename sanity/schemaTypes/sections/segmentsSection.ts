import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'segmentsSection',
  title: 'Seção Segmentos / Etapas',
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
      name: 'segments',
      title: 'Segmentos / Etapas de ensino',
      type: 'array',
      of: [
        defineField({
          name: 'segment',
          title: 'Segmento',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome do segmento',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'ageRange',
              title: 'Faixa etária',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'highlights',
              title: 'Destaques do segmento',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'icon',
              title: 'Ícone / Imagem',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
  ],
})

