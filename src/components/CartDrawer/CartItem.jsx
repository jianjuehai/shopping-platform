import React, { memo } from 'react'
import { Button, Divider } from '@arco-design/web-react'
import { IconDelete, IconMinus, IconPlus } from '@arco-design/web-react/icon'

const CartItem = memo(({ item, onIncrease, onDecrease, onRemove, showDivider }) => {
  return (
    <div className="cart-item">
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
        <div style={{ 
          flex: 1, 
          minWidth: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}>
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
              onClick={() => onDecrease(item)}
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
              onClick={() => onIncrease(item)}
            />
          </div>
        </div>

        {/* 删除按钮和小计 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end' 
        }}>
          <Button 
            type='text' 
            size='small'
            icon={<IconDelete />}
            status='danger'
            onClick={() => onRemove(item.skuId)}
          />
          <div style={{ fontSize: 14, color: '#999' }}>
            小计: <span style={{ color: '#333', fontWeight: 600 }}>
              ¥{(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      {showDivider && <Divider style={{ margin: 0 }} />}
    </div>
  )
})

CartItem.displayName = 'CartItem'

export default CartItem