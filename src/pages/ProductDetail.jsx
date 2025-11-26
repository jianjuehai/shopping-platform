import React from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../store/useStore'
import NavBar from '../components/NavBar'
import SpecSelector from '../components/SpecSelector'

export default function ProductDetail(){
  const { id } = useParams()
  const product = useStore(s => s.products.find(p => String(p.id) === String(id)))
  const addToCart = useStore(s => s.addToCart)

  if (!product) return <div>找不到商品</div>

  const handleAdd = (payload) => {
    addToCart({ ...payload, title: product.title, price: product.price })
    window.dispatchEvent(new CustomEvent('toggleCart'))
  }

  return (
    <div>
      <NavBar />

      {/* 局部样式：响应式，防止移动端横向溢出 */}
      <style>{`
        .product-detail-container { box-sizing: border-box; max-width: 100%; padding: 12px; }
        .product-detail-content {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          align-items: flex-start;
          box-sizing: border-box;
          width: 100%;
        }
        .product-detail-left {
          flex: 0 0 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .product-detail-left img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          display: block;
        }
        .product-detail-right {
          flex: 1 1 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        /* 桌面优化：固定左侧展示宽度，右侧限制宽度并保留间距 */
        @media (min-width: 700px) {
          .product-detail-content { gap: 100px; }
          .product-detail-left {
            flex: 0 0 500px;
            max-width: 500px;
          }
          .product-detail-right {
            flex: 1 1 320px;
            max-width: 460px;
          }
        }
      `}</style>

      <div className="content product-detail-container">
        <div className="product-detail-content">
          <div className="product-detail-left">
            <img
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="product-detail-right">
            <h3 style={{ marginTop: 0 }}>{product.title}</h3>

            <div style={{ fontSize: 24, color: '#f56', margin: '8px 0' }}>
              ¥{product.price}
            </div>

            <div style={{ marginBottom: 8 }}>销量：{product.sales}</div>

            <SpecSelector product={product} onAdd={handleAdd} />
          </div>
        </div>

        {/* 其他内容（如详情描述等）可继续往下追加，仍在 .product-detail-container 内 */}
      </div>

    </div>
  )
}
