/**
 * Content loaders. Each one reads a JSON file through the generated Tina
 * client; `requestWithMetadata` adds the data the visual editor needs so
 * clicking text on the page opens the matching field.
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getHome = () =>
  requestWithMetadata(client.queries.home({ relativePath: 'home.json' }), { priority: 'primary' });

export const getSite = () =>
  requestWithMetadata(client.queries.site({ relativePath: 'site.json' }));

export type Home = Awaited<ReturnType<typeof getHome>>['data']['home'];
export type Site = Awaited<ReturnType<typeof getSite>>['data']['site'];

/** "646 663 4430" -> "tel:6466634430" */
export const tel = (phone?: string | null) => `tel:${(phone ?? '').replace(/[^\d+]/g, '')}`;

/** Drops the nulls Tina allows in lists. */
export const items = <T,>(list?: (T | null)[] | null) => (list ?? []).filter((x): x is T => x != null);

/** "1" -> "01" */
export const pad = (i: number) => String(i + 1).padStart(2, '0');
