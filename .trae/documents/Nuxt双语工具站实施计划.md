# Context

依据《AI时代工具站赚钱模式研究笔记》建设一个低成本、可被搜索引擎和 AI 检索引用的双语工具站。当前目录仅有研究笔记，无已有应用。用户明确指定 Nuxt 静态预渲染与按页加载 Vue 工具组件；AI 首版仅做导航，不调用模型；同时服务中文和英文用户。

# 实施方案

1. 在当前工作目录创建 Nuxt 工程（不改研究笔记），配置 `ssr: true`、Nitro `preset: 'static'`，以 `nuxt generate` 输出可部署到 Cloudflare Pages 的 HTML。用环境变量 `NUXT_PUBLIC_SITE_URL` 配置上线后的真实域名，本地构建可用示例域名检查链接，绝不把示例域名作为正式上线地址。
2. 建立数据驱动的信息架构：`data/tools.ts` 定义工具的中英名称、分类、状态、路由、摘要、步骤、常见问题与关联工具；`data/ai-directory.ts` 收录有真实官网链接、用途和适用场景的 AI 产品；不制造虚假评分或联盟推广关系。路由为 `/zh/...` 与 `/en/...`，根路径跳转至中文首页。分类涵盖搜索引擎（如 SERP 摘要预览、robots.txt 规则辅助、URL 编码）、AI 导航、程序员工具（如 JSON 格式化、Base64、时间戳）。首版优先交付少量完整可用工具，而非大量空页。
3. 页面包括首页、分类列表、独立工具详情、AI 导航详情以及 About、Privacy、Contact；每个已发布页面均预渲染，具备独特正文（适用场景、操作步骤、输入输出实例、边界说明、FAQ、关联链接）。工具交互置于按路由加载的 Vue 组件，重计算和仅浏览器可用逻辑仅在客户端加载；说明、标题与 FAQ 保持服务端可见，避免空壳 SEO 页面。
4. 统一 SEO/GEO 元数据：在布局和页面使用 `useSeoMeta`、`useHead`、绝对 canonical、双向 `hreflang`（zh-CN/en/x-default）、Open Graph；生成 `sitemap.xml` 和 `robots.txt`，确保不收录草稿或下架页。为网站、分类面包屑、工具或 AI 产品详情加入符合页面实际内容的 JSON-LD（WebSite、BreadcrumbList、SoftwareApplication/ItemList 等），不伪造评价。GEO 注重直接回答、可核验的步骤和示例、清晰来源与更新日期、可见文本和可解析结构；不声称能保证 AI 引用。隐私页准确描述客户端处理范围。
5. 视觉方向：克制的编辑式工具索引，首页以搜索入口与清晰分类为核心，紧凑列表优先于卡片墙；工具详情以工作区优先。提供响应式导航、键盘可用交互和中英切换。无需外部图像时不放占位图。
6. 构建验证：安装依赖、运行构建；检查生成目录包含所有双语 HTML、唯一标题和描述、canonical/hreflang、sitemap 与 robots；手动验证工具输入输出、导航链接、语言切换及移动端布局。提供 Cloudflare Pages 构建命令 `npm run generate`、输出目录 `.output/public`，正式部署、域名配置与站长平台提交留待用户提供账号和域名。

# 关键文件

- `nuxt.config.ts`：静态生成、站点 URL、站点地图与路由配置。
- `data/tools.ts`、`data/ai-directory.ts`：可运营的发布数据与双语内容。
- `pages/index.vue`、`pages/[locale]/index.vue`、`pages/[locale]/tools/[slug].vue`、`pages/[locale]/ai/[slug].vue`：主页与预渲染详情。
- `components/tools/*.vue`：按工具页加载的实际客户端功能。
- `pages/[locale]/about.vue`、`pages/[locale]/privacy.vue`、`pages/[locale]/contact.vue`：信任页面。
- `AI时代工具站赚钱模式研究笔记.md`：需求依据，不修改。
