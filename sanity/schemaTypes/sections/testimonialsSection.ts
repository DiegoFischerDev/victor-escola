import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Seção Depoimentos',
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
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          title: 'Depoimento',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Relação com a escola (ex: Pai de aluno, Aluna, Ex-aluno)',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Texto do depoimento',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'avatar',
              title: 'Foto',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
  ],
})

