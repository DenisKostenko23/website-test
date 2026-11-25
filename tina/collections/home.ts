import type { Collection, TinaField } from 'tinacms';

// Small helpers so every section reads the same in the editor.
const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, description,
});
const area = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, description, ui: { component: 'textarea' },
});
const header = (extra: TinaField[] = []): TinaField[] => [
  str('eyebrow', 'Small label above the heading'),
  str('heading', 'Heading'),
  ...extra,
];
const list = (
  name: string,
  label: string,
  itemLabel: string,
  fields: TinaField[],
  titleField = 'title',
): TinaField => ({
  type: 'object',
  name,
  label,
  list: true,
  ui: { itemProps: (i: Record<string, string>) => ({ label: i?.[titleField] || itemLabel }) },
  fields,
});
const section = (name: string, label: string, fields: TinaField[]): TinaField => ({
  type: 'object', name, label, fields,
});

export const HomeCollection: Collection = {
  name: 'home',
  label: 'Homepage',
  path: 'content/home',
  format: 'json',
  ui: {
    router: () => '/',
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      type: 'string',
      name: 'seoTitle',
      label: 'Browser tab title (SEO)',
      isTitle: true,
      required: true,
      description: 'Shown in Google results and the browser tab, not on the page.',
    },
    area('seoDescription', 'Google description (SEO)'),

    section('hero', '1. Top of the page', [
      str('badge', 'Small badge'),
      str('title', 'Main heading (dark part)'),
      str('titleMuted', 'Main heading (grey part)'),
      area('text', 'Text under the heading'),
      str('buttonLabel', 'Second button text'),
      str('note', 'Small note under the buttons'),
      { type: 'image', name: 'image', label: 'Photo of the attorneys' },
      str('imageCaption', 'Photo caption: title'),
      str('imageSubcaption', 'Photo caption: subtitle'),
    ]),

    list('trust', '2. Trust strip (4 boxes)', 'Box', [
      str('title', 'Title'),
      str('text', 'Text'),
      { type: 'boolean', name: 'stars', label: 'Show 5 stars' },
    ]),

    section('situations', '3. Start where you are', [
      ...header([area('intro', 'Text on the right')]),
      list('items', 'Situations', 'Situation', [
        str('title', 'Title'),
        area('text', 'Text'),
        str('url', 'Link'),
      ]),
    ]),

    section('results', "4. The firm's work (results)", [
      ...header([area('intro', 'Text on the right')]),
      list('items', 'Case results', 'Result', [
        str('outcome', 'Outcome (big text)', 'For example: Charges dismissed'),
        str('title', 'Case'),
        area('text', 'Description'),
        str('url', 'Link to the case'),
      ]),
      area('disclaimer', 'Disclaimer under the cards'),
      str('buttonLabel', 'Button text'),
      str('buttonUrl', 'Button link'),
    ]),

    section('practice', '5. Practice areas', [
      ...header(),
      list('items', 'Practice areas', 'Practice area', [
        str('title', 'Title'),
        area('text', 'Text'),
        str('url', 'Link'),
      ]),
      { type: 'image', name: 'image', label: 'Attorney photo' },
      str('imageCaption', 'Photo caption'),
      str('imageLink', 'Photo link text'),
      str('imageUrl', 'Photo link'),
    ]),

    section('team', '6. Defense team', [
      ...header(),
      str('primaryLabel', 'Dark button text'),
      str('primaryUrl', 'Dark button link'),
      str('secondaryLabel', 'Outline button text'),
      str('secondaryUrl', 'Outline button link'),
      list('items', 'Reasons', 'Reason', [str('title', 'Title'), area('text', 'Text')]),
    ]),

    section('reviews', '7. Client reviews', [
      ...header(),
      list('items', 'Reviews', 'Review', [area('quote', 'Quote'), str('name', 'Client name')], 'name'),
      area('disclaimer', 'Note under the reviews'),
      str('linkLabel', 'Link text'),
      str('linkUrl', 'Link'),
    ]),

    section('steps', '8. What happens next', [
      ...header(),
      list('items', 'Steps', 'Step', [str('title', 'Title'), area('text', 'Text')]),
    ]),

    section('contact', '9. Contact form', [
      ...header([area('intro', 'Text')]),
      str('phoneNote', 'Note under the phone number'),
      str('submitLabel', 'Form button text'),
      area('disclaimer', 'Note under the form button'),
    ]),

    section('faq', '10. Common questions', [
      ...header(),
      list('items', 'Questions', 'Question', [str('question', 'Question'), area('answer', 'Answer')], 'question'),
    ]),

    section('cta', '11. Final call to action', [
      str('eyebrow', 'Small label above the heading'),
      str('titleMuted', 'Heading (grey part)'),
      str('title', 'Heading (white part)'),
      area('text', 'Text'),
    ]),
  ],
};
