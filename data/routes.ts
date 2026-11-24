// 站内页面清单：nuxt.config 预渲染与 server/routes/sitemap.xml 共用，避免两处重复维护
import { tools } from './catalog'
import { aiDirectory } from './ai-directory'

export const pagePaths: string[] = ['/tools', '/tools/search', '/tools/developer', '/ai', ...tools.map(x => `/tools/${x.slug}`), ...aiDirectory.map(x => `/ai/${x.slug}`)]
