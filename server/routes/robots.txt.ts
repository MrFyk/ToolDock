// Static robots.txt: allow all crawlers and point to the sitemap (SEO / GEO)
export default defineEventHandler((event) => {
  const site = (useRuntimeConfig().public.siteUrl || '').replace(/\/$/, '')
  if (!site) throw new Error('NUXT_PUBLIC_SITE_URL 未设置：robots.txt 的 Sitemap 地址必须是绝对 URL')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`
})
