export default [
  {
    id: 1,
    name: 'Categories',
    type: 'categories',
  },
  {
    id: 2,
    name: 'Price',
    type: 'price',
    options: {
      min: 10,
      max: 100,
      from: 15,
      to: 90,
    },
  },
  {
    id: 3,
    name: 'Brand',
    type: 'checkbox',
    options: {
      items: [
        {
          id: 1,
          label: 'Wakita',
          count: 7,
          checked: false,
          disabled: false,
        },
        {
          id: 2,
          label: 'Zosch',
          count: 42,
          checked: true,
          disabled: false,
        },
        {
          id: 3,
          label: 'WeVALT',
          count: 0,
          checked: true,
          disabled: true,
        },
      ],
    },
  },
  {
    id: 5,
    name: 'Color',
    type: 'color',
  },
];
