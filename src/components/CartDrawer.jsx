// ...existing code...
import React, { useEffect, useState, useMemo } from 'react'
import { Drawer, Button, Empty, Divider } from '@arco-design/web-react'
import { IconArchive, IconDelete, IconMinus, IconPlus } from '@arco-design/web-react/icon'
import { useStore } from '../store/useStore'


export default function CartDrawer(){
  const cart = useStore(s => s.cart)
  const remove = useStore(s => s.removeFromCart)
  const addToCart = useStore(s => s.addToCart)
  const updateQty = useStore(s => s.updateQty)
  const products = useStore(s => s.products)
  const [open, setOpen] = useState(false)

   // 响应式抽屉宽度：在窄屏尽量占满屏幕（保留左右间距）
   const calcWidth = () => {
     if (typeof window === 'undefined') return 420
     const vw = window.innerWidth
     // 小于 480 时尽量填满屏幕，留 16px 间距；否则固定 420
     if (vw <= 480) return Math.max(vw - 32, 280)
     if (vw <= 640) return Math.min(360, vw - 48)
     return 420
   }
   const [drawerWidth, setDrawerWidth] = useState(calcWidth)
   useEffect(() => {
     const onResize = () => setDrawerWidth(calcWidth())
     window.addEventListener('resize', onResize)
     return () => window.removeEventListener('resize', onResize)
   }, [])

  // 计算总价
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [cart])

  useEffect(()=>{
    const handler = ()=> setOpen(o=>!o)
    
    const handleQuickAdd = (e) => {
      const { id } = e.detail
      const product = products.find(p => p.id === id)
      if (!product) return

      const sku = product.skuList?.[0]
      if (!sku) return

      addToCart({
        skuId: sku.skuId,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.image
      })

      setOpen(true)
    }

    window.addEventListener('toggleCart', handler)
    window.addEventListener('quickAdd', handleQuickAdd)
    
    return ()=> {
      window.removeEventListener('toggleCart', handler)
      window.removeEventListener('quickAdd', handleQuickAdd)
    }
  }, [products, addToCart])

  // 增加数量
  const handleIncrease = (item) => {
    if (updateQty) {
      updateQty(item.skuId, item.qty + 1)
    }
  }

  // 减少数量
  const handleDecrease = (item) => {
    if (item.qty > 1 && updateQty) {
      updateQty(item.skuId, item.qty - 1)
    }
  }

  return (
    <>
       {/* 局部样式：确保图片、卡片在窄屏不超出 */}
       <style>{`
         .cart-drawer .cart-item {
           box-sizing: border-box;
         }
         .cart-drawer .cart-item-img {
           width: 72px;
           height: 72px;
           object-fit: cover;
           border-radius: 6px;
           flex-shrink: 0;
         }
         @media (max-width: 480px) {
           .cart-drawer .cart-item-img {
             width: 64px;
             height: 64px;
           }
           .cart-drawer .cart-item { padding: 10px; gap: 8px; }
           .cart-drawer .cart-total { padding: 8px 0; }
         }
       `}</style>

      <Drawer 
        className="cart-drawer"
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconArchive style={{ fontSize: 20 }} />
            <span>购物车</span>
            <span style={{ 
              fontSize: 14, 
              color: '#999', 
              fontWeight: 'normal' 
            }}>
              ({cart.length} 件商品)
            </span>
          </div>
        }
       visible={open}
        onCancel={() => setOpen(false)}
       // 使用计算宽度（number），在非常窄屏会比固定 420 小，避免溢出
       width={drawerWidth}
       // 保证 Drawer 内容不超出
       style={{ boxSizing: 'border-box' }}
        footer={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px 0'
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#999' }}>合计</div>
              <div style={{ fontSize: 24, color: '#f56', fontWeight: 600 }}>
                ¥{total.toFixed(2)}
              </div>
            </div>
            <Button 
              type='primary' 
              size='large'
              disabled={cart.length === 0}
              style={{
                backgroundColor: cart.length > 0 ? '#ff6b6b' : undefined,
                borderColor: cart.length > 0 ? '#ff6b6b' : undefined,
                minWidth: 120
              }}
            >
              去结算 ({cart.length})
            </Button>
          </div>
        }
      >
        {cart.length === 0 ? (
          <Empty 
            description='购物车是空的'
            style={{ marginTop: 80 }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cart.map((item, index) => (
              <div key={item.skuId} className="cart-item">
                <div 
                  style={{ 
                    display: 'flex',
                    gap: 12,
                    padding: 12,
                    background: '#fafafa',
                    borderRadius: 8,
                    alignItems: 'center'
                  }}
                >
                  {/* 商品图片 */}
                  <img
                     className="cart-item-img"
                     src={item.image || 'https://via.placeholder.com/160x160?text=No+Image'}
                     alt={item.title}
                  />

                  {/* 商品信息 */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div 
                        style={{ 
                          fontWeight: 600,
                          marginBottom: 4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: 16, color: '#f56' }}>
                        ¥{item.price}
                      </div>
                    </div>
                    
                    {/* 数量调整 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Button
                        size='small'
                        icon={<IconMinus />}
                        onClick={() => handleDecrease(item)}
                        disabled={item.qty <= 1}
                      />
                      <span style={{ 
                        minWidth: 32, 
                        textAlign: 'center',
                        fontWeight: 600 
                      }}>
                        {item.qty}
                      </span>
                      <Button
                        size='small'
                        icon={<IconPlus />}
                        onClick={() => handleIncrease(item)}
                      />
                    </div>
                  </div>

                  {/* 删除按钮和小计 */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Button 
                      type='text' 
                      size='small'
                      icon={<IconDelete />}
                      status='danger'
                      onClick={()=>remove(item.skuId)}
                    />
                    <div style={{ fontSize: 14, color: '#999' }}>
                      小计: <span style={{ color: '#333', fontWeight: 600 }}>¥{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {index < cart.length - 1 && <Divider style={{ margin: 0 }} />}
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  )
}
// ...existing code...