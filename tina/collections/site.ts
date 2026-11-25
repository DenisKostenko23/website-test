import type { Collection } from 'tinacms';

const link = (label: string) => ({
  type: 'object' as const,
  name: 'links',
  label,
  list: true,
  ui: { itemProps: (i: { label?: string }) => ({ label: i?.label ?? 'Link' }) },
  fields: [
    { type: 'string' as const, name: 'label', label: 'Text' },
    { type: 'string' as const, name: 'url', label: 'Link (e.g. /contact)' },
  ],
});

export const SiteCollection: Collection = {
  name: 'site',
  label: 'Contacts & footer',
  path: 'content/site',
  format: 'json',
  ui: {
    global: true,
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      type: 'string',
      name: 'phone',
      label: 'Phone number',
      description: 'Shown in the header, buttons and footer. Example: 646 663 4430',
      required: true,
    },
    {
      type: 'object',
      name: 'footer',
      label: 'Footer',
      fields: [
        { type: 'string', name: 'tagline', label: 'Short description' },
        { type: 'string', name: 'availability', label: 'Availability line' },
        { ...link('Defense links'), name: 'defenseLinks' },
        { ...link('Explore links'), name: 'exploreLinks' },
        {
          type: 'object',
          name: 'offices',
          label: 'Offices',
          list: true,
          ui: { itemProps: (i: { name?: string }) => ({ label: i?.name ?? 'Office' }) },
          fields: [
            { type: 'string', name: 'name', label: 'Office name' },
            { type: 'string', name: 'street', label: 'Street' },
            { type: 'string', name: 'city', label: 'City, state, ZIP' },
            { type: 'string', name: 'mapUrl', label: 'Google Maps link' },
          ],
        },
        { type: 'string', name: 'legal', label: 'Legal notice', ui: { component: 'textarea' } },
      ],
    },
  ],
};
