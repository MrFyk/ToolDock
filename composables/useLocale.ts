import type { Locale } from '../data/catalog'

// 页面内 locale 是路由参数快照：页面组件随路由切换会重挂载，无需响应式
// 非法值由 middleware/locale.global.ts 统一拦截为 404，这里兜底 zh
export function useLocale(): Locale {
  const raw = useRoute().params.locale as string | undefined
  return raw === 'en' ? 'en' : 'zh'
}
