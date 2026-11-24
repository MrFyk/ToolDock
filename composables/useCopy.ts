// 统一「复制到剪贴板」：成功后 1.5s copied 状态反馈（按钮可显示"已复制"）
// 旧浏览器/非安全上下文回退 execCommand
export function useCopy() {
  const copied = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const copy = async (text: string) => {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        ok = true
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = document.execCommand('copy')
        ta.remove()
      }
    } catch { ok = false }
    if (ok) {
      copied.value = true
      clearTimeout(timer)
      timer = setTimeout(() => { copied.value = false }, 1500)
    }
    return ok
  }

  return { copied, copy }
}
