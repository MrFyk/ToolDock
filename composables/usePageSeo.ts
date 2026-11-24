import type { Locale } from '../data/catalog'
export function usePageSeo(locale: Locale, path: string, title: string, description: string, schema?: Record<string, unknown>) {
  const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const current = `/${locale}${path}`
  const canonical = site ? `${site}${current}` : undefined
  useSeoMeta({
    title: `${title} | ToolDock`,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: 'ToolDock',
    ogLocale: locale === 'zh' ? 'zh_CN' : 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    ...(canonical ? { ogUrl: canonical, ogImage: `${site}/og-image.png`, twitterImage: `${site}/og-image.png` } : {})
  })
  useHead({ link: site ? [
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', hreflang: 'zh-CN', href: `${site}/zh${path}` },
    { rel: 'alternate', hreflang: 'en', href: `${site}/en${path}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${site}/zh${path}` }
  ] : [], script: schema ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema).replace(/</g, '\\u003c') }] : [] })
}
export function breadcrumb(locale: Locale, items: { name: string; path: string }[]) {
  const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: site ? `${site}/${locale}${item.path}` : `/${locale}${item.path}` })) }
}
