import { useState, useEffect, useMemo, useCallback } from 'react'
import { useStore } from '../../store/useStore'

// 计算响应式抽屉宽度
const calcDrawerWidth = () => {
  if (typeof window === 'undefined') return 420
  const vw = window.innerWidth
  if (vw <= 480) return Math.max(vw - 32, 280)
  if (vw <= 640) return Math.min(360, vw - 48)
  return 420
}

export const useCartDrawer = () => {
  const cart = useStore(s => s.cart)
  const remove = useStore(s => s.removeFromCart)
  const addToCart = useStore(s => s.addToCart)
  const updateQty = useStore(s => s.updateQty)
  const products = useStore(s => s.products)
  
  const [open, setOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(calcDrawerWidth)

  // 计算总价
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [cart])

  // 切换抽屉
  const toggleDrawer = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  // 关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  // 快速加入购物车
  const handleQuickAdd = useCallback((e) => {
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
  }, [products, addToCart])

  // 增加数量
  const handleIncrease = useCallback((item) => {
    updateQty?.(item.skuId, item.qty + 1)
  }, [updateQty])

  // 减少数量
  const handleDecrease = useCallback((item) => {
    if (item.qty > 1) {
      updateQty?.(item.skuId, item.qty - 1)
    }
  }, [updateQty])

  // 删除商品
  const handleRemove = useCallback((skuId) => {
    remove(skuId)
  }, [remove])

  // 监听窗口大小变化
  useEffect(() => {
    const onResize = () => setDrawerWidth(calcDrawerWidth())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // 监听购物车事件
  useEffect(() => {
    window.addEventListener('toggleCart', toggleDrawer)
    window.addEventListener('quickAdd', handleQuickAdd)
    
    return () => {
      window.removeEventListener('toggleCart', toggleDrawer)
      window.removeEventListener('quickAdd', handleQuickAdd)
    }
  }, [toggleDrawer, handleQuickAdd])

  return {
    cart,
    open,
    drawerWidth,
    total,
    closeDrawer,
    handleIncrease,
    handleDecrease,
    handleRemove
  }
}