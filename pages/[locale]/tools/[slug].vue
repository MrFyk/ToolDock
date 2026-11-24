<script setup lang="ts">
import {tools,categories,categoryIntro} from '../../../data/catalog'
import {defineAsyncComponent} from 'vue'
import {IconSearch,IconCode,IconArrowRight} from '@arco-design/web-vue/es/icon'
const route=useRoute();const locale=useLocale()
const cat=route.params.slug as 'search'|'developer'
const isCategory=cat==='search'||cat==='developer'
const tool=isCategory?undefined:tools.find(x=>x.slug===route.params.slug)
if(!isCategory&&!tool)throw createError({statusCode:404,statusMessage:'Tool not found'})
const catTools=isCategory?tools.filter(x=>x.category===cat):[]
const site=useRuntimeConfig().public.siteUrl.replace(/\/$/,'')
if(isCategory){
  usePageSeo(locale,`/tools/${cat}`,categories[cat][locale],categoryIntro[cat][locale],{ '@context':'https://schema.org','@type':'ItemList',itemListElement:catTools.map((x,i)=>({'@type':'ListItem',position:i+1,name:x.title[locale],url:site?`${site}/${locale}/tools/${x.slug}`:undefined})), })
}else{
  usePageSeo(locale,`/tools/${tool!.slug}`,tool!.title[locale],tool!.summary[locale],{ '@context':'https://schema.org','@graph':[
    { '@type':'SoftwareApplication',name:tool!.title[locale],description:tool!.summary[locale],applicationCategory:'UtilitiesApplication',operatingSystem:'Web',dateModified:tool!.updated,url:site?`${site}/${locale}/tools/${tool!.slug}`:undefined,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'} },
    { '@type':'HowTo',name:tool!.title[locale],step:tool!.steps[locale].map((step,i)=>({'@type':'HowToStep',position:i+1,text:step})) },
    { '@type':'FAQPage',mainEntity:tool!.faq.map(faq=>({'@type':'Question',name:faq.question[locale],acceptedAnswer:{'@type':'Answer',text:faq.answer[locale]}})) },
    breadcrumb(locale,[{name:locale==='zh'?'首页':'Home',path:''},{name:categories[tool!.category][locale],path:`/tools/${tool!.category}`},{name:tool!.title[locale],path:`/tools/${tool!.slug}`}])
  ] })
}
const components:Record<string,()=>Promise<any>>={ 'serp-preview':()=>import('../../../components/tools/SerpPreview.vue'),'robots-helper':()=>import('../../../components/tools/RobotsHelper.vue'),'url-encoder':()=>import('../../../components/tools/UrlEncoder.vue'),'json-formatter':()=>import('../../../components/tools/JsonFormatter.vue'),'base64':()=>import('../../../components/tools/Base64Converter.vue'),'timestamp':()=>import('../../../components/tools/TimestampConverter.vue') }
const ToolComponent=tool?defineAsyncComponent(components[tool.slug]!):null
const CatIcon=cat==='search'?IconSearch:IconCode
</script>
<template>
  <div v-if="isCategory" class="page-container">
    <div class="page-heading"><h1>{{categories[cat][locale]}}</h1><p>{{categoryIntro[cat][locale]}}</p></div>
    <div class="grid-cards" style="margin-top:32px">
      <NuxtLink v-for="item in catTools" :key="item.slug" class="card" :to="`/${locale}/tools/${item.slug}`">
        <span class="card-icon"><component :is="CatIcon" /></span>
        <strong>{{item.title[locale]}}</strong>
        <p>{{item.summary[locale]}}</p>
      </NuxtLink>
    </div>
  </div>
  <div v-else class="page-container"><a-breadcrumb class="breadcrumbs"><a-breadcrumb-item :key="`/${locale}`"><NuxtLink :to="`/${locale}`">{{locale==='zh'?'首页':'Home'}}</NuxtLink></a-breadcrumb-item><a-breadcrumb-item><NuxtLink :to="`/${locale}/tools/${tool!.category}`">{{categories[tool!.category][locale]}}</NuxtLink></a-breadcrumb-item><a-breadcrumb-item>{{tool!.title[locale]}}</a-breadcrumb-item></a-breadcrumb><div class="detail-heading"><h1>{{tool!.title[locale]}}</h1><p>{{tool!.summary[locale]}}</p><span class="updated">{{tool!.updated}}</span></div><div class="workspace"><ClientOnly><ToolComponent :locale="locale" /><template #fallback><a-skeleton :animation="true"><a-space direction="vertical" :size="16" fill style="width:100%;padding:16px"><a-skeleton-line :rows="1" :widths="['30%']" /><a-skeleton-line :rows="1" :widths="['100%']" /><a-skeleton-line :rows="1" :widths="['100%']" /></a-space></a-skeleton></template></ClientOnly></div><div class="editorial"><section><h2>{{locale==='zh'?'如何使用':'How to use'}}</h2><ol><li v-for="step in tool!.steps[locale]" :key="step">{{step}}</li></ol></section><section><h2>{{locale==='zh'?'示例与注意事项':'Example & limitations'}}</h2><p>{{tool!.example[locale]}}</p><p>{{tool!.limit[locale]}}</p></section><section><h2>{{locale==='zh'?'常见问题':'Frequently asked questions'}}</h2><div v-for="faq in tool!.faq" :key="faq.question[locale]" class="faq"><h3>{{faq.question[locale]}}</h3><p>{{faq.answer[locale]}}</p></div></section></div><div class="related"><NuxtLink v-for="item in tools.filter(x=>x.slug!==tool!.slug&&x.category===tool!.category).slice(0,2)" :key="item.slug" :to="`/${locale}/tools/${item.slug}`">{{item.title[locale]}} <icon-arrow-right /></NuxtLink></div></div>
</template>
