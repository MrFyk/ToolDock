<script setup lang="ts">
import { searchEngines, aiTools, devTools, type Engine } from '../../data/catalog'
import { IconSearch, IconInfoCircle, IconSafe, IconEmail } from '@arco-design/web-vue/es/icon'
const route = useRoute(); const locale = useLocale()
const query = ref('')
const email = '1766935706@qq.com'
const match = (list: Engine[]) => list.filter(x => `${x.name} ${x.summary[locale]}`.toLowerCase().includes(query.value.toLowerCase()))
// 三个板块共享同一套卡片模板，仅数据源与文案不同
const sections = computed(() => [
  { id: 'engines', dir: 'engines', title: locale === 'zh' ? '搜索引擎' : 'Search engines', empty: locale === 'zh' ? '没有找到匹配的搜索引擎。' : 'No matching search engines found.', items: match(searchEngines) },
  { id: 'ai-tools', dir: 'ai', title: locale === 'zh' ? 'AI 工具' : 'AI tools', empty: locale === 'zh' ? '没有找到匹配的 AI 工具。' : 'No matching AI tools found.', items: match(aiTools) },
  { id: 'dev-tools', dir: 'dev', title: locale === 'zh' ? '开发工具' : 'Dev tools', empty: locale === 'zh' ? '没有找到匹配的开发工具。' : 'No matching dev tools found.', items: match(devTools) }
])
usePageSeo(locale, '', locale === 'zh' ? '搜索引擎、AI 与编程工具导航' : 'Search engine, AI & dev tool directory', locale === 'zh' ? '按访问量热度罗列全球主流搜索引擎、AI 工具与编程工具：Google、ChatGPT、GitHub 等，一键直达官网。' : 'The world\u2019s major search engines, AI tools and dev tools ranked by popularity: Google, ChatGPT, GitHub and more, one click away.')
// 每个引擎使用自己的官方站点图标（本地 favicon），加载失败时回退到通用搜索图标
const failed = ref(new Set<string>())
const onIconError = (slug: string) => { const s = new Set(failed.value); s.add(slug); failed.value = s }
// Scrollspy 与平滑滚动定位统一收敛到 useSectionNav（与侧边栏 app.vue 共享 activeSection）
const { activeSection, scrollToId, bindSpy, unbindSpy } = useSectionNav(['engines', 'ai-tools', 'dev-tools', 'about'])
onMounted(bindSpy)
onBeforeUnmount(unbindSpy)
watch(() => route.hash, (h) => { if (h) nextTick(() => scrollToId(h.slice(1))) })
</script>
<template>
  <div class="hero" id="home"><div class="hero-inner"><h1>{{ locale === 'zh' ? '把复杂的事，变得简单。' : 'Make complex things simple.' }}</h1><p class="hero-copy">{{ locale === 'zh' ? '无需注册，开箱即用。' : 'Made for search, creation and development. No sign-up, just get things done.' }}</p><a-input-search class="hero-search" v-model="query" size="large" allow-clear :placeholder="locale === 'zh' ? '搜索工具，例如 Google、ChatGPT…' : 'Search: Google, ChatGPT…'" :aria-label="locale === 'zh' ? '搜索工具' : 'Search tools'" /></div></div>
  <section v-for="s in sections" :key="s.id" class="section" :id="s.id"><div class="section-heading"><h2>{{ s.title }}</h2></div><div class="grid-cards"><a v-for="item in s.items" :key="item.slug" class="card" :href="item.url" target="_blank" rel="noopener noreferrer"><span class="card-head"><span class="card-icon"><img v-if="!failed.has(item.slug)" class="engine-icon" :src="`/icons/${s.dir}/${item.slug}.png`" alt="" loading="lazy" @error="onIconError(item.slug)" /><IconSearch v-else /></span><strong>{{ item.name }}</strong></span><p>{{ item.summary[locale] }}</p></a></div><p v-if="s.items.length === 0" class="empty">{{ s.empty }}</p></section>
  <section class="section" id="about">
    <div class="section-heading"><h2>{{ locale === 'zh' ? '关于' : 'About' }}</h2></div>
    <div class="grid-cards">
      <div class="card about-item" tabindex="0" role="button" aria-haspopup="dialog">
        <span class="card-head"><span class="card-icon"><IconInfoCircle /></span><strong>{{locale==='zh'?'关于本站':'About the site'}}</strong></span>
        <p>{{locale==='zh'?'站点介绍与工具说明。':'Site introduction.'}}</p>
        <div class="about-pop"><div class="pop-box" role="dialog" :aria-label="locale==='zh'?'关于本站详情':'About the site details'">
          <h3>{{locale==='zh'?'工具坞是什么':'What is ToolDock'}}</h3>
          <p>{{locale==='zh'?'工具坞是一个免费的在线工具导航站，收录精选的网页小工具与 AI 产品信息。像码头的船坞把船只整齐停靠，我们把你可能用到的工具集中停泊在一处，需要时即取即用。':'ToolDock is a free online toolbox that curates practical web utilities and AI products. Like a harbor dock berths ships, we moor the tools you need in one place — ready whenever you are.'}}</p>
          <h3>{{locale==='zh'?'三个承诺':'Three promises'}}</h3>
          <p>{{locale==='zh'?'① 本地处理：JSON 格式化、Base64、URL 编码等工具全部在你的浏览器中运行，输入内容不会上传服务器；② 免费无门槛：无需注册登录，打开即用；③ 官方直达：AI 导航只收录官方网站链接，不跳转、不中转、不夹带推广。':'① Local first: tools like the JSON formatter, Base64 and URL encoder run entirely in your browser — nothing is uploaded; ② Free and frictionless: no sign-up, open and use; ③ Official links only: the AI directory lists official sites directly, with no redirects or affiliate hops.'}}</p>
          <h3>{{locale==='zh'?'内容如何维护':'How content is maintained'}}</h3>
          <p>{{locale==='zh'?'工具说明由人工整理与校对，并定期复核可用性。如发现错误、失效链接，或有新工具推荐，欢迎通过「联系我们」卡片反馈，我们会认真处理每一条来信。':'Descriptions are hand-reviewed and periodically re-checked. Found an error, a dead link, or want to recommend a tool? Reach out via the contact card — every message gets read.'}}</p>
        </div></div>
      </div>
      <div class="card about-item" tabindex="0" role="button" aria-haspopup="dialog">
        <span class="card-head"><span class="card-icon"><IconSafe /></span><strong>{{locale==='zh'?'隐私政策':'Privacy policy'}}</strong></span>
        <p>{{locale==='zh'?'数据如何处理。':'How data is handled.'}}</p>
        <div class="about-pop"><div class="pop-box" role="dialog" :aria-label="locale==='zh'?'隐私政策详情':'Privacy policy details'">
          <p>{{locale==='zh'?'我们信奉一条原则：能不收集的数据，一律不收集。以下是本站处理数据的完整说明。':'We follow one principle: if data doesn’t need to be collected, we don’t collect it. Here is exactly how this site handles data.'}}</p>
          <h3>{{locale==='zh'?'工具内的输入':'What you type into tools'}}</h3>
          <p>{{locale==='zh'?'JSON 格式化、Base64、URL 编码、时间戳转换等工具完全在你的浏览器内运行（前端 JavaScript 处理），输入与输出不会发送到我们的服务器，也不会存储或分享给任何第三方。关闭页面后数据即消失。':'The JSON formatter, Base64, URL encoder, timestamp converter and similar tools run entirely in your browser (client-side JavaScript). Your input and output are never sent to our servers, stored, or shared with third parties. Data is gone when you close the page.'}}</p>
          <h3>{{locale==='zh'?'浏览数据':'Browsing data'}}</h3>
          <p>{{locale==='zh'?'本站不设置账号系统，不使用追踪 Cookie，不做用户画像与行为分析。你的访问如同路过一座安静的码头。':'There are no accounts, no tracking cookies, and no behavioral analytics. Visiting ToolDock is like strolling past a quiet dock.'}}</p>
          <h3>{{locale==='zh'?'AI 导航与外链':'AI directory & external links'}}</h3>
          <p>{{locale==='zh'?'AI 导航页仅提供第三方产品的官方网站链接。点击离开本站后，适用对方网站的隐私政策，请留意查看。':'The AI directory only links to third-party official websites. Once you leave this site, their own privacy policies apply.'}}</p>
          <h3>{{locale==='zh'?'政策变更':'Changes'}}</h3>
          <p>{{locale==='zh'?'政策如有重大变更，会在本板块公布并更新日期。':'Material changes will be published in this section with an updated date.'}}</p>
        </div></div>
      </div>
      <div class="card about-item" tabindex="0" role="button" aria-haspopup="dialog">
        <span class="card-head"><span class="card-icon"><IconEmail /></span><strong>{{locale==='zh'?'联系我们':'Contact us'}}</strong></span>
        <p>{{locale==='zh'?'邮件与微信联系方式。':'Email and WeChat.'}}</p>
        <div class="about-pop"><div class="pop-box contact-pop" role="dialog" :aria-label="locale==='zh'?'联系方式':'Contact details'">
          <h3>{{locale==='zh'?'和我们聊聊':'Get in touch'}}</h3>
          <p class="cp-lead">{{locale==='zh'?'发现工具错误、链接失效，或想推荐新工具？欢迎来信——每一条反馈我们都会认真阅读。':'Found a bug, a dead link, or want to recommend a new tool? Write to us — every message gets read.'}}</p>
          <a class="cp-mail" :href="`mailto:${email}`">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12h36v24H6z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M7 13l17 13 17-13" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="cp-mail-text">
              <span class="cp-label">{{locale==='zh'?'邮箱':'Email'}}</span>
              <span class="cp-addr">{{ email }}</span>
            </span>
            <span class="cp-mail-arrow">→</span>
          </a>
          <div class="cp-qr">
            <img src="/wechat-qr.png" :alt="locale==='zh'?'微信二维码':'WeChat QR code'" />
            <span>{{locale==='zh'?'微信扫码添加':'Scan to chat on WeChat'}}</span>
            <small>{{locale==='zh'?'通常在 5 个工作日内回复。':'We usually reply within five business days.'}}</small>
          </div>
        </div></div>
      </div>
    </div>
  </section>
</template>
