// 按需注册实际用到的 Arco 组件，避免全量引入导致打包膨胀
// 模板里以 <icon-arrow-right /> / <icon-common /> 使用的全局图标在此手动注册
import { Button, Drawer, Input, Menu, Breadcrumb, Skeleton, Space } from '@arco-design/web-vue/es'
import { IconArrowRight, IconCommon } from '@arco-design/web-vue/es/icon'

export default defineNuxtPlugin((nuxtApp) => {
  for (const component of [Button, Drawer, Input, Menu, Breadcrumb, Skeleton, Space]) {
    nuxtApp.vueApp.use(component)
  }
  nuxtApp.vueApp.component('IconArrowRight', IconArrowRight)
  nuxtApp.vueApp.component('IconCommon', IconCommon)
})
