// 侧边栏 ↔ 内容联动：平滑滚动定位 + scrollspy（section 越过视口 40% 线时激活）
// app.vue 与首页共用 activeSection 状态（useState 跨组件同步）
export function useSectionNav(ids: string[] = []) {
  const activeSection = useState('activeSection', () => 'home')

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' })
  }

  // rAF 节流，避免滚动时逐帧全量计算
  let ticking = false
  const onScroll = () => {
    if (ticking || typeof window === 'undefined') return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      let cur = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = id
      }
      activeSection.value = cur
    })
  }

  const route = useRoute()
  const bindSpy = () => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    if (route.hash) nextTick(() => scrollToId(route.hash.slice(1)))
  }
  const unbindSpy = () => window.removeEventListener('scroll', onScroll)

  return { activeSection, scrollToId, bindSpy, unbindSpy }
}
