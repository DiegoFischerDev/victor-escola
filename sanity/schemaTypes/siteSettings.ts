import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da escola',
      type: 'string',
      initialValue: 'Colégio Horizonte',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline da escola',
      type: 'string',
      initialValue: 'Educação Infantil · Fundamental · Médio',
    }),
    defineField({
      name: 'logo',
      title: 'Logo principal (barra de navegação)',
      type: 'image',
      options: {hotspot: true},
      description: 'PNG ou SVG com fundo transparente é o ideal.',
    }),
  ],
})

