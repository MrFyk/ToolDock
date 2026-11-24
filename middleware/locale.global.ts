// 全站统一的双语路由校验：/zh 与 /en 之外的 locale 段一律 404
// （替代此前在每个页面里重复的 if(!['zh','en'].includes(locale)) throw）
export default defineNuxtRouteMiddleware((to) => {
  const locale = to.params.locale
  if (locale !== undefined && locale !== 'zh' && locale !== 'en') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
})
