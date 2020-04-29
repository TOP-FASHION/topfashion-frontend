export default [
  {
    type: 'link',
    label: 'New',
    url: '/category/new',
  },

  {
    type: 'link',
    label: 'Woman',
    url: '/category/woman',
    children: [
      { type: 'link', label: 'Dresses', url: '/category/dresses' },
      { type: 'link', label: 'Jumpers', url: '/category/jumpers' },
      { type: 'link', label: 'Blouses', url: '/category/blouses' },
      { type: 'link', label: 'Pants', url: '/category/pants' },
      { type: 'link', label: 'Skirts', url: '/category/skirts' },
      { type: 'link', label: 'Overllas', url: '/category/overllas' },
    ],
  },

  {
    type: 'link',
    label: 'Man',
    url: '/category/man',
    children: [
      { type: 'link', label: 'Dresses', url: '/category/dresses' },
      { type: 'link', label: 'Jumpers', url: '/category/jumpers' },
      { type: 'link', label: 'Blouses', url: '/category/blouses' },
      { type: 'link', label: 'Pants', url: '/category/pants' },
      { type: 'link', label: 'Skirts', url: '/category/skirts' },
      { type: 'link', label: 'Overllas', url: '/category/overllas' },
    ],
  },

  {
    type: 'link',
    label: 'Accessories',
    url: '/category/accessories',
  },

  {
    type: 'link',
    label: 'Perfume',
    url: '/category/perfume',
  },

  {
    type: 'link',
    label: 'Sale',
    url: '/category/sale',
  },

  {
    type: 'button',
    label: 'Language',
    children: [
      {
        type: 'button',
        label: 'English',
        data: { type: 'language', locale: 'en' },
      },
      {
        type: 'button',
        label: 'Russian',
        data: { type: 'language', locale: 'ru' },
      },
    ],
  },
];
