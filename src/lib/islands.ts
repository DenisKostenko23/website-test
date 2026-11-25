/**
 * Editable regions. The visual editor re-renders one of these through
 * /tina-island/<name> each time a field changes.
 */
import type { IslandRegistry } from '@tinacms/astro/experimental';
import HomeBody from '../components/HomeBody.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { getHome, getSite } from './data';

export const islands: IslandRegistry = {
  home: {
    fetch: () => getHome(),
    component: HomeBody,
    wrapper: { tag: 'main' },
    propsFromData: (res: any) => ({ data: res.data?.home }),
  },
  header: {
    fetch: () => getSite(),
    component: Header,
    wrapper: { tag: 'div' },
    propsFromData: (res: any) => ({ site: res.data?.site }),
  },
  footer: {
    fetch: () => getSite(),
    component: Footer,
    wrapper: { tag: 'div' },
    propsFromData: (res: any) => ({ site: res.data?.site }),
  },
};
