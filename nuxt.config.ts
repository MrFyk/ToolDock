import { pagePaths } from './data/routes'

const routes = ['/', ...(['zh', 'en'] as const).flatMap(locale => pagePaths.map(path => `/${locale}${path}`).concat(`/${locale}`))]
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  ssr: true,
  css: ['@arco-design/web-vue/dist/arco.css', '~/assets/main.css'],
  build: { transpile: ['@arco-design/web-vue'] },
  vite: { optimizeDeps: { include: ['dayjs', 'dayjs/plugin/advancedFormat', 'dayjs/plugin/customParseFormat', 'dayjs/plugin/isBetween', 'dayjs/plugin/quarterOfYear', 'dayjs/plugin/timezone', 'dayjs/plugin/utc', 'dayjs/plugin/weekOfYear', 'dayjs/plugin/weekYear', 'dayjs/locale/zh-cn'] } },
  runtimeConfig: { public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '' } },
  nitro: { preset: 'static', prerender: { routes: [...routes, '/sitemap.xml', '/robots.txt'], crawlLinks: true } }
})
