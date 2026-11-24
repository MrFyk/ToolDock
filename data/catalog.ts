export type Locale = 'zh' | 'en'
export type Text = Record<Locale, string>
export const t = (zh: string, en: string): Text => ({ zh, en })
export type Entry = { slug: string; category: 'search' | 'developer'; title: Text; summary: Text; steps: Record<Locale, string[]>; example: Text; limit: Text; faq: { question: Text; answer: Text }[]; updated: string }
export const tools: Entry[] = [
  { slug: 'serp-preview', category: 'search', title: t('搜索结果摘要预览', 'SERP snippet preview'), summary: t('输入标题、描述和网址，预览搜索结果可能的展示方式。预览仅供编辑参考，搜索引擎可能改写摘要。', 'Preview how a title, description and URL might appear in search results. Search engines may rewrite snippets.'), steps: { zh: ['填写页面标题和描述。', '输入希望展示的网址。', '对照预览检查长度和清晰度。'], en: ['Enter your page title and description.', 'Add the URL you want to show.', 'Review the preview for clarity and length.'] }, example: t('示例：标题“免费 JSON 格式化工具”，描述说明功能和隐私特点。', 'Example: “Free JSON formatter” with a description explaining features and privacy.'), limit: t('像素宽度因设备与字体而异；本站不预测实际排名或展示文案。', 'Pixel width varies by device and font; this tool does not predict rankings or the final snippet.'), faq: [{ question: t('预览结果一定会在 Google 显示吗？', 'Will Google display this exact snippet?'), answer: t('不会。搜索引擎可根据查询改写标题和描述。', 'No. Search engines may rewrite titles and descriptions for each query.') }], updated: '2026-11-24' },
  { slug: 'robots-helper', category: 'search', title: t('robots.txt 规则生成器', 'robots.txt rule builder'), summary: t('组合 User-agent、Disallow 和 Allow 指令，生成可复制的 robots.txt 基础规则。', 'Build basic robots.txt directives using User-agent, Disallow and Allow.'), steps: { zh: ['填写爬虫名称，通常为 *。', '按行输入允许和禁止抓取的路径。', '复制结果并放在站点根目录的 robots.txt。'], en: ['Enter a crawler name, usually *.', 'Enter allowed and disallowed paths on separate lines.', 'Copy the output to robots.txt at your site root.'] }, example: t('例如禁止 /private/，允许 /private/public/。', 'For example, disallow /private/ while allowing /private/public/.'), limit: t('robots.txt 不是访问控制；禁止抓取不保证页面不被索引。请勿在规则中暴露敏感路径。', 'robots.txt is not access control; blocking crawling does not guarantee deindexing. Do not expose sensitive paths.'), faq: [{ question: t('能用 robots.txt 隐藏私密页面吗？', 'Can robots.txt hide private pages?'), answer: t('不能。私密内容需要身份验证等真正的访问控制。', 'No. Private content requires actual access control, such as authentication.') }], updated: '2026-11-24' },
  { slug: 'url-encoder', category: 'search', title: t('URL 编码与解码', 'URL encoder & decoder'), summary: t('编码或解码 URL 参数文本，全部在浏览器本地完成。', 'Encode or decode URL parameter text locally in your browser.'), steps: { zh: ['输入待处理文本。', '选择编码或解码。', '复制转换结果。'], en: ['Enter your text.', 'Choose encode or decode.', 'Copy the converted result.'] }, example: t('“搜索 工具”编码为“%E6%90%9C%E7%B4%A2%20%E5%B7%A5%E5%85%B7”。', '“hello world” becomes “hello%20world”.'), limit: t('使用 encodeURIComponent，适合参数值而不是整条 URL；无效百分号编码无法解码。', 'Uses encodeURIComponent for parameter values, not entire URLs; invalid percent escapes cannot be decoded.'), faq: [{ question: t('加号会被转为空格吗？', 'Does a plus sign become a space?'), answer: t('不会。此工具使用 decodeURIComponent；表单编码的加号需单独处理。', 'No. This tool uses decodeURIComponent; form-encoded plus signs need separate handling.') }], updated: '2026-11-24' },
  { slug: 'json-formatter', category: 'developer', title: t('JSON 格式化与校验', 'JSON formatter & validator'), summary: t('粘贴 JSON，即时检查语法并格式化或压缩，内容不会上传。', 'Paste JSON to validate, format or minify it without uploading your content.'), steps: { zh: ['粘贴 JSON 文本。', '选择格式化或压缩。', '修正错误提示或复制输出。'], en: ['Paste JSON text.', 'Choose format or minify.', 'Fix any reported errors or copy the output.'] }, example: t('输入 {"ok":true}，格式化后得到带缩进的 JSON。', 'Input {"ok":true} to get indented JSON.'), limit: t('仅验证 JSON 标准语法，不验证业务 schema；大文件可能导致浏览器变慢。', 'Validates JSON syntax only, not a business schema; very large inputs may slow your browser.'), faq: [{ question: t('支持注释和尾随逗号吗？', 'Are comments and trailing commas supported?'), answer: t('不支持。标准 JSON 不允许注释或尾随逗号。', 'No. Standard JSON does not allow comments or trailing commas.') }], updated: '2026-11-24' },
  { slug: 'base64', category: 'developer', title: t('Base64 文本转换', 'Base64 text converter'), summary: t('在 UTF-8 文本与 Base64 字符串之间转换，不离开当前浏览器。', 'Convert between UTF-8 text and Base64 strings in your browser.'), steps: { zh: ['输入 UTF-8 文本或 Base64 内容。', '选择编码或解码。', '查看并复制结果。'], en: ['Enter UTF-8 text or Base64.', 'Select encode or decode.', 'Review and copy the result.'] }, example: t('“Hello”编码为“SGVsbG8=”。', '“Hello” encodes to “SGVsbG8=”.'), limit: t('Base64 不是加密，不适用于保护密码或隐私；仅处理文本。', 'Base64 is not encryption and cannot protect secrets; text only.'), faq: [{ question: t('中文可以编码吗？', 'Can I encode non-ASCII text?'), answer: t('可以，工具先按 UTF-8 编码再转换。', 'Yes. Text is converted to UTF-8 before encoding.') }], updated: '2026-11-24' },
  { slug: 'timestamp', category: 'developer', title: t('Unix 时间戳转换', 'Unix timestamp converter'), summary: t('在 Unix 秒/毫秒时间戳与本地日期时间之间转换。', 'Convert Unix seconds or milliseconds to local date and time.'), steps: { zh: ['输入秒或毫秒时间戳。', '查看本地时间和 UTC 时间。', '需要时复制 ISO 标准时间。'], en: ['Enter a timestamp in seconds or milliseconds.', 'Read the local and UTC times.', 'Copy the ISO time if needed.'] }, example: t('0 秒对应 1970-01-01T00:00:00.000Z。', '0 seconds is 1970-01-01T00:00:00.000Z.'), limit: t('本地时间取决于设备时区；输入按数字位数自动判断秒或毫秒。', 'Local time depends on your device time zone; units are inferred from digit count.'), faq: [{ question: t('为什么本地时间与 UTC 不同？', 'Why does local time differ from UTC?'), answer: t('本地时间使用设备时区，UTC 使用零时区。', 'Local time uses your device time zone; UTC has zero offset.') }], updated: '2026-11-24' }
]
export type Engine = { slug: string; name: string; url: string; summary: Text }
// 全球主要搜索引擎，按访问量/热度降序排列
export const searchEngines: Engine[] = [
  { slug: 'google', name: 'Google', url: 'https://www.google.com', summary: t('全球使用量第一的搜索引擎。', "The world's most-used search engine.") },
  { slug: 'bing', name: 'Bing', url: 'https://www.bing.com', summary: t('微软旗下搜索引擎，集成 AI 助手。', "Microsoft's search engine with an AI assistant.") },
  { slug: 'yandex', name: 'Yandex', url: 'https://yandex.com', summary: t('俄罗斯及俄语区主流搜索引擎。', "Russia's leading search engine.") },
  { slug: 'yahoo', name: 'Yahoo!', url: 'https://search.yahoo.com', summary: t('老牌门户网站与搜索服务。', 'Classic web portal and search service.') },
  { slug: 'baidu', name: '百度', url: 'https://www.baidu.com', summary: t('中国最大的中文搜索引擎。', "China's largest Chinese-language search engine.") },
  { slug: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com', summary: t('注重隐私，不追踪用户。', 'Privacy-first, no user tracking.') },
  { slug: 'naver', name: 'Naver', url: 'https://www.naver.com', summary: t('韩国国民搜索引擎。', "South Korea's homegrown search engine.") },
  { slug: 'sogou', name: '搜狗搜索', url: 'https://www.sogou.com', summary: t('中文搜索，知乎与微信内容入口。', 'Chinese search with Zhihu and WeChat content.') },
  { slug: 'brave', name: 'Brave Search', url: 'https://search.brave.com', summary: t('独立索引，隐私优先。', 'Independent index, privacy-first.') },
  { slug: 'ecosia', name: 'Ecosia', url: 'https://www.ecosia.org', summary: t('用广告收入植树造林。', 'Plants trees with ad revenue.') },
  { slug: 'startpage', name: 'Startpage', url: 'https://www.startpage.com', summary: t('代理 Google 结果，不记录隐私。', 'Google results with private proxying.') }
]
// 全球主流 AI 工具，按访问量/热度降序排列
export const aiTools: Engine[] = [
  { slug: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com', summary: t('最流行的 AI 对话助手。', 'The most popular AI chat assistant.') },
  { slug: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', summary: t('Google 旗下的 AI 助手。', 'Google\u2019s AI assistant.') },
  { slug: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com', summary: t('推理与代码能力出色的国产模型。', 'Chinese model with strong reasoning and coding.') },
  { slug: 'claude', name: 'Claude', url: 'https://claude.ai', summary: t('长文写作与代码对话助手。', 'Assistant for long-form writing and code.') },
  { slug: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', summary: t('微软全家桶内置 AI 助手。', 'AI assistant built into Microsoft apps.') },
  { slug: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai', summary: t('带来源引用的 AI 搜索问答。', 'AI search with cited sources.') },
  { slug: 'doubao', name: '豆包', url: 'https://www.doubao.com', summary: t('字节跳动旗下 AI 助手。', 'ByteDance\u2019s AI assistant.') },
  { slug: 'kimi', name: 'Kimi', url: 'https://kimi.com', summary: t('擅长长文本阅读的 AI 助手。', 'Assistant for long documents.') },
  { slug: 'character', name: 'Character.AI', url: 'https://character.ai', summary: t('AI 角色扮演聊天。', 'Roleplay chat with AI characters.') },
  { slug: 'grok', name: 'Grok', url: 'https://grok.com', summary: t('xAI 旗下的 AI 助手。', 'xAI\u2019s AI assistant.') },
  { slug: 'midjourney', name: 'Midjourney', url: 'https://www.midjourney.com', summary: t('高质量 AI 图像生成。', 'High-quality AI image generation.') },
  { slug: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co', summary: t('开源 AI 模型与数据集社区。', 'Open-source AI model hub.') }
]
// 全球主流编程/开发者工具，按访问量/热度降序排列
export const devTools: Engine[] = [
  { slug: 'github', name: 'GitHub', url: 'https://github.com', summary: t('全球最大代码托管与协作平台。', "The world's largest code hosting platform.") },
  { slug: 'stackoverflow', name: 'Stack Overflow', url: 'https://stackoverflow.com', summary: t('程序员问答社区。', 'Q&A community for programmers.') },
  { slug: 'mdn', name: 'MDN Web Docs', url: 'https://developer.mozilla.org', summary: t('Web 技术官方文档权威。', 'The authoritative web technology docs.') },
  { slug: 'vscode', name: 'VS Code', url: 'https://code.visualstudio.com', summary: t('最流行的免费代码编辑器。', 'The most popular free code editor.') },
  { slug: 'npm', name: 'npm', url: 'https://www.npmjs.com', summary: t('JavaScript 包管理仓库。', 'The JavaScript package registry.') },
  { slug: 'git', name: 'Git', url: 'https://git-scm.com', summary: t('分布式版本控制系统。', 'The distributed version control system.') },
  { slug: 'docker', name: 'Docker', url: 'https://www.docker.com', summary: t('容器化开发与部署平台。', 'Container platform for build and deploy.') },
  { slug: 'caniuse', name: 'Can I Use', url: 'https://caniuse.com', summary: t('浏览器兼容性速查表。', 'Browser support lookup tables.') },
  { slug: 'regex101', name: 'Regex101', url: 'https://regex101.com', summary: t('正则表达式在线调试。', 'Online regex tester and debugger.') },
  { slug: 'codepen', name: 'CodePen', url: 'https://codepen.io', summary: t('前端代码在线 playground。', 'Front-end playground for snippets.') },
  { slug: 'leetcode', name: 'LeetCode', url: 'https://leetcode.com', summary: t('算法刷题与面试准备。', 'Coding practice and interview prep.') },
  { slug: 'jetbrains', name: 'JetBrains', url: 'https://www.jetbrains.com', summary: t('专业 IDE 全家桶。', 'Professional IDE suite.') }
]
export const categories = { search: t('搜索引擎工具', 'Search engine tools'), developer: t('程序员工具', 'Developer tools') }
export const categoryIntro = {
  search: t('面向搜索引擎场景的小工具：检查搜索结果摘要、生成抓取规则、处理 URL 参数，全部在浏览器本地运行。', 'Small utilities for search-engine work: preview snippets, build crawl rules and handle URL parameters, all locally in your browser.'),
  developer: t('面向日常开发的小工具：格式化 JSON、转换 Base64、换算时间戳，数据不上传服务器。', 'Everyday development utilities: format JSON, convert Base64 and translate timestamps without uploading data.')
}
