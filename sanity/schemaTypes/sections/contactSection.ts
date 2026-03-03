import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Seção Contato',
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
      name: 'phone',
      title: 'Telefone principal',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'URL do Google Maps',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Horário de atendimento',
      type: 'string',
    }),
    defineField({
      name: 'formIntro',
      title: 'Texto introdutório do formulário',
      type: 'text',
      rows: 3,
    }),
  ],
})

