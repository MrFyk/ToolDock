import { pagePaths } from '../../data/routes'
import { tools } from '../../data/catalog'
import { aiDirectory } from '../../data/ai-directory'

export default defineEventHandler((event) => {
  const site = (useRuntimeConfig().public.siteUrl || '').replace(/\/$/, '')
  if (!site) throw new Error('NUXT_PUBLIC_SITE_URL 未设置：sitemap 的 <loc> 必须是绝对 URL')
  const today = new Date().toISOString().slice(0, 10)
  // 页面清单与 nuxt.config 预渲染共用 data/routes.ts；工具与 AI 条目的 lastmod 取数据里的 updated
  const updatedByPath = new Map<string, string>([
    ...tools.map(x => [`/tools/${x.slug}`, x.updated] as const),
    ...aiDirectory.map(x => [`/ai/${x.slug}`, x.updated] as const)
  ])
  const pages = [{ path: '', lastmod: today }, ...pagePaths.map(path => ({ path, lastmod: updatedByPath.get(path) ?? today }))]
  const urls = pages.flatMap(({ path: p, lastmod }) => (['zh', 'en'] as const).map(locale => {
    const loc = `${site}/${locale}${p}`
    return `  <url><loc>${loc}</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${site}/zh${p}"/><xhtml:link rel="alternate" hreflang="en" href="${site}/en${p}"/><xhtml:link rel="alternate" hreflang="x-default" href="${site}/zh${p}"/><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq></url>`
  }))
  setHeader(event, 'content-type', 'application/xml')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>`
})
