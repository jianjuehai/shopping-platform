import { memo } from 'react'
import { Button } from '@arco-design/web-react'
import { IconPlus } from '@arco-design/web-react/icon'
import { useButtonResize } from './useButtonResize'

const AddToCartButton = memo(({ onClick }) => {
  const [btnRef, showText] = useButtonResize(96)

  return (
    <Button
      ref={btnRef}
      type="primary"
      size="small"
      icon={<IconPlus />}
      onClick={onClick}
      style={{
        backgroundColor: '#ff6b6b',
        borderColor: '#ff6b6b',
        padding: '4px 8px',
        width: 'clamp(64px, 18vw, 120px)',
        minWidth: 64,
        maxWidth: 120,
        flexShrink: 0,
        zIndex: 2,
      }}
    >
      {showText ? '加入购物车' : null}
    </Button>
  )
})

AddToCartButton.displayName = 'AddToCartButton'

export default AddToCartButton