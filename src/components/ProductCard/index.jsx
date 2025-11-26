import { useCallback } from 'react'
import { Card } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'

const ProductCard = ({ item }) => {
  const navigate = useNavigate()

  const handleCardClick = useCallback(() => {
    navigate(`/product/${item.id}`)
  }, [navigate, item.id])

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation() // 防止触发卡片点击
    window.dispatchEvent(new CustomEvent('quickAdd', { detail: { id: item.id } }))
  }, [item.id])

  return (
    <Card
      className="product-card"
      hoverable
      style={{ width: '100%' }}
      bodyStyle={{ padding: 12 }}
      onClick={handleCardClick}
      cover={
        <div
          style={{ height: 180, overflow: 'hidden', cursor: 'pointer' }}
          onClick={handleCardClick}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      }
    >
      {/* 标题（单行省略） */}
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

      {/* 价格与加入购物车按钮 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ color: '#f56', fontWeight: 700, fontSize: 16, flex: '0 1 auto' }}>
          ¥{item.price}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <AddToCartButton onClick={handleAddToCart} />
        </div>
      </div>
    </Card>
  )
}

export default ProductCard