import React, { memo } from 'react'
import { Button } from '@arco-design/web-react'

const CartFooter = memo(({ total, itemCount }) => {
  return (
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
        disabled={itemCount === 0}
        style={{
          backgroundColor: itemCount > 0 ? '#ff6b6b' : undefined,
          borderColor: itemCount > 0 ? '#ff6b6b' : undefined,
          minWidth: 120
        }}
      >
        去结算 ({itemCount})
      </Button>
    </div>
  )
})

CartFooter.displayName = 'CartFooter'

export default CartFooter