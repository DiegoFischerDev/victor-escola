import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsPost',
  title: 'Notícia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da notícia',
      type: 'string',
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
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo curto',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({title, media, date}) {
      return {
        title: title,
        subtitle: date ? new Date(date).toLocaleDateString('pt-BR') : '',
        media,
      }
    },
  },
})

