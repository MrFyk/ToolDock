<script setup lang="ts">
import { IconHome, IconPublic, IconRobot, IconCode, IconBook, IconLanguage, IconMenu, IconSun, IconMoon, IconToTop } from '@arco-design/web-vue/es/icon'
const route = useRoute()
const locale = computed(() => (route.params.locale as string) === 'en' ? 'en' : 'zh')
const alternate = computed(() => route.path === '/' ? '/en' : route.path.replace(/^\/(zh|en)/, locale.value === 'zh' ? '/en' : '/zh'))
const drawerOpen = ref(false)
watch(() => route.path, () => { drawerOpen.value = false })
// 挂载前应用持久化主题，避免深色用户刷新时白屏闪烁（FOUC）
useHead(() => ({
  htmlAttrs: { lang: locale.value === 'zh' ? 'zh-CN' : 'en' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  script: [{ key: 'theme-init', innerHTML: "(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');var f=function(){document.body.setAttribute('arco-theme','dark')};document.body?f():document.addEventListener('DOMContentLoaded',f)}}catch(e){}})()" }]
}))
// Sitewide structured data: Organization + WebSite (SEO / GEO)
const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
useHead(() => {
  const graph = [
    { '@type': 'Organization', name: 'ToolDock', ...(site ? { url: site } : {}) },
    { '@type': 'WebSite', name: 'ToolDock', inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en', ...(site ? { url: `${site}/${locale.value}` } : {}) }
  ]
  return { script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }] }
})
const navItems = computed(() => [
  { key: 'home', label: locale.value === 'zh' ? '首页' : 'Home', icon: IconHome },
  { key: 'engines', label: locale.value === 'zh' ? '搜索引擎' : 'Search engines', icon: IconPublic },
  { key: 'ai-tools', label: locale.value === 'zh' ? 'AI 工具' : 'AI tools', icon: IconRobot },
  { key: 'dev-tools', label: locale.value === 'zh' ? '开发工具' : 'Dev tools', icon: IconCode },
  { key: 'about', label: locale.value === 'zh' ? '关于' : 'About', icon: IconBook }
])
// Sidebar ↔ content linkage: on home, clicking scrolls to the section and scrollspy follows; on other pages, activeKey follows the route
// 滚动定位与 scrollspy 状态统一来自 useSectionNav（与首页共享）
const { activeSection, scrollToId } = useSectionNav()
const activeKey = computed(() => {
  const p = route.path
  const l = locale.value
  if (p === `/${l}`) return activeSection.value
  return ''
})
const go = (key: unknown) => {
  const k = String(key)
  drawerOpen.value = false
  if (route.path === `/${locale.value}`) {
    if (k === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    else scrollToId(k)
  } else {
    navigateTo(k === 'home' ? `/${locale.value}` : `/${locale.value}#${k}`)
  }
}
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
// Theme: light / dark, persisted in localStorage and applied to <html> class + Arco arco-theme attribute
const dark = useState('dark', () => false)
const applyTheme = () => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark.value)
  document.body.setAttribute('arco-theme', dark.value ? 'dark' : 'light')
}
onMounted(() => { dark.value = localStorage.getItem('theme') === 'dark'; applyTheme() })
const toggleTheme = () => { dark.value = !dark.value; localStorage.setItem('theme', dark.value ? 'dark' : 'light'); applyTheme() }
</script>
<template>
  <div class="layout">
    <aside class="sidebar">
      <NuxtLink :to="`/${locale}`" class="brand" aria-label="ToolDock home"><icon-common /> <span>TOOL<b>/DOCK</b></span></NuxtLink>
      <a-menu :selected-keys="[activeKey]" @menu-item-click="go">
        <a-menu-item v-for="item in navItems" :key="item.key">
          <template #icon><component :is="item.icon" /></template>
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </aside>
    <div class="content">
      <header class="topbar">
        <a-button type="text" aria-label="Menu" @click="drawerOpen = true"><icon-menu /></a-button>
        <NuxtLink :to="`/${locale}`" class="brand"><icon-common /> <span>TOOL<b>/DOCK</b></span></NuxtLink>
        <NuxtLink class="language" :to="alternate"><icon-language /> {{ locale === 'zh' ? 'EN' : '中文' }}</NuxtLink>
      </header>
      <a-drawer v-model:visible="drawerOpen" placement="left" :width="280" :header="false" :footer="false">
        <a-menu :selected-keys="[activeKey]" @menu-item-click="go">
          <a-menu-item v-for="item in navItems" :key="item.key">
            <template #icon><component :is="item.icon" /></template>
            {{ item.label }}
          </a-menu-item>
        </a-menu>
      </a-drawer>
      <main><NuxtPage /></main>
    </div>
    <div class="fab" role="navigation" :aria-label="locale === 'zh' ? '快捷入口' : 'Quick links'">
      <button type="button" :title="locale === 'zh' ? '切换到 English' : '切换到中文'" :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'" @click="navigateTo(alternate)"><icon-language /></button>
      <button type="button" :title="dark ? (locale === 'zh' ? '明亮模式' : 'Light mode') : (locale === 'zh' ? '黑暗模式' : 'Dark mode')" :aria-label="dark ? 'Light mode' : 'Dark mode'" @click="toggleTheme"><icon-moon v-if="!dark" /><icon-sun v-else /></button>
      <button type="button" :title="locale === 'zh' ? '回到顶部' : 'Back to top'" :aria-label="locale === 'zh' ? '回到顶部' : 'Back to top'" @click="toTop"><icon-to-top /></button>
    </div>
  </div>
</template>
