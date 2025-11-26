import { useRef, useState, useEffect } from 'react'

/**
 * 自定义 Hook：监听按钮宽度，根据阈值决定是否显示文字
 * @param {number} threshold - 宽度阈值（px）
 * @returns {[React.RefObject, boolean]} - [按钮ref, 是否显示文字]
 */
export const useButtonResize = (threshold = 96) => {
  const btnRef = useRef(null)
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    const node = btnRef.current
    if (!node) return

    if (window.ResizeObserver) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width
          setShowText(w >= threshold)
        }
      })
      ro.observe(node)
      return () => ro.disconnect()
    } else {
      // 降级方案：监听窗口 resize
      const onResize = () => {
        const w = node.getBoundingClientRect().width
        setShowText(w >= threshold)
      }
      window.addEventListener('resize', onResize)
      onResize()
      return () => window.removeEventListener('resize', onResize)
    }
  }, [threshold])

  return [btnRef, showText]
}