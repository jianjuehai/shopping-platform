import React from 'react'
import { Drawer, Empty } from '@arco-design/web-react'
import { IconArchive } from '@arco-design/web-react/icon'
import { useCartDrawer } from './useCartDrawer'
import CartItem from './CartItem'
import CartFooter from './CartFooter'
import { styles } from './styles'

export default function CartDrawer() {
  const {
    cart,
    open,
    drawerWidth,
    total,
    closeDrawer,
    handleIncrease,
    handleDecrease,
    handleRemove
  } = useCartDrawer()

  return (
    <>
      <style>{styles}</style>

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
        onCancel={closeDrawer}
        width={drawerWidth}
        style={{ boxSizing: 'border-box' }}
        footer={<CartFooter total={total} itemCount={cart.length} />}
      >
        {cart.length === 0 ? (
          <Empty 
            description='购物车是空的'
            style={{ marginTop: 80 }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cart.map((item, index) => (
              <CartItem
                key={item.skuId}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
                showDivider={index < cart.length - 1}
              />
            ))}
          </div>
        )}
      </Drawer>
    </>
  )
}