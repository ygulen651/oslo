import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      rows: 3,
      description: 'Blog yazısının kısa özeti',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Öne Çıkan Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Lezzet Hikayeleri', value: 'lezzet-hikayeleri' },
          { title: 'Ürün Tanıtımları', value: 'urun-tanitimlari' },
          { title: 'Şirket Haberleri', value: 'sirket-haberleri' },
          { title: 'Etkinlikler', value: 'etkinlikler' },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'string',
      initialValue: 'OSLO Ekibi',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan',
      type: 'boolean',
      description: 'Ana sayfada öne çıkan yazı olarak gösterilsin mi?',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu yazı gösterilsin mi?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, publishedAt } = selection
      return {
        title: title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No publish date',
      }
    },
  },
})
