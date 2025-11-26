// ...existing code...
import React, { useRef, useState, useEffect } from 'react'
import { Card, Button } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'
import { IconPlus } from '@arco-design/web-react/icon'

export default function ProductCard({ item }) {
  const nav = useNavigate()

  const handleAdd = (e) => {
    e.stopPropagation() // 防止触发卡片点击跳转
    window.dispatchEvent(new CustomEvent('quickAdd', { detail: { id: item.id } }))
  }

   // 按钮自适应文字显示：宽度小于阈值时隐藏文字，仅显示图标
   const btnRef = useRef(null)
   const [showText, setShowText] = useState(true)
   useEffect(() => {
     const node = btnRef.current
     if (!node) return
     const THRESHOLD = 96 // 小于此宽度就隐藏文字，按需调整
 
     if (window.ResizeObserver) {
       const ro = new ResizeObserver((entries) => {
         for (const entry of entries) {
           const w = entry.contentRect.width
           setShowText(w >= THRESHOLD)
         }
       })
       ro.observe(node)
       return () => ro.disconnect()
     } else {
       // 退回方案：窗口尺寸改变时判断
       const onResize = () => {
         const w = node.getBoundingClientRect().width
         setShowText(w >= THRESHOLD)
       }
       window.addEventListener('resize', onResize)
       onResize()
       return () => window.removeEventListener('resize', onResize)
     }
   }, [])

  return (
    <Card
      className="product-card"
      hoverable
      style={{ width: '100%' }}
      bodyStyle={{ padding: 12 }}             // 保证卡片内容有内边距
      onClick={() => nav(`/product/${item.id}`)}
      cover={
        <div
          style={{ height: 180, overflow: 'hidden', cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); nav(`/product/${item.id}`) }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      }
    >
      {/* 标题（单行并省略） */}
      <div
        style={{
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {item.title}
      </div>

      {/* 价格 与 加入购物车 同一行，按钮占屏幕固定百分比且位置固定 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ color: '#f56', fontWeight: 700, fontSize: 16, flex: '0 1 auto' }}>¥{item.price}</div>

        {/* 占用视口百分比宽度，使用 clamp 控制最小/最大，保持右侧固定位置 */}
        <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            ref={btnRef}
            type="primary"
            size="small"
            icon={<IconPlus />}
            onClick={handleAdd}
            style={{
              backgroundColor: '#ff6b6b',
              borderColor: '#ff6b6b',
              padding: '4px 8px',
              // 按钮宽度按视口百分比，最小 64px，最大 120px
              width: 'clamp(64px, 18vw, 120px)',
              minWidth: 64,
              maxWidth: 120,
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            {showText ? '加入购物车' : null}
          </Button>
        </div>
      </div>
    </Card>
  )
}
// ...existing code...