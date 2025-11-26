import { create } from 'zustand'
import { generateProducts } from '../api/mock'

const initialProducts = generateProducts(86)

const normalizeQty = (v) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return 1
  return Math.max(1, Math.trunc(n))
}

export const useStore = create((set, get) => ({
  products: initialProducts,
  filters: { category: '全部', priceRange: [0, 10000], sort: null, keyword: '' },
  cart: [],
  page: { pageNo: 1, pageSize: 12 },

  // 合并 filters 并重置页码
  setFilters: (payload) =>
    set((state) => ({
      filters: { ...state.filters, ...payload },
      page: { ...state.page, pageNo: 1 },
    })),

  // 支持部分更新 page（例如 { pageNo } 或 { pageSize }）
  setPage: (p) =>
    set((state) => ({
      page: { ...state.page, ...p },
    })),

  // 添加到购物车：合并同 skuId，保证 qty 为正整数
  addToCart: (item) =>
    set((state) => {
      const cart = [...state.cart]
      const qty = normalizeQty(item.qty ?? 1)
      const idx = cart.findIndex((i) => i.skuId === item.skuId)
      if (idx >= 0) {
        // 累加数量
        cart[idx] = { ...cart[idx], qty: cart[idx].qty + qty }
      } else {
        // 规范化入参字段，确保必要字段存在
        cart.push({
          skuId: item.skuId,
          title: item.title || item.name || '',
          price: Number(item.price) || 0,
          qty,
          image: item.image || '',
          ...item,
        })
      }
      return { cart }
    }),

  // 更新数量：qty <= 0 则移除该项；保证整数
  updateQty: (skuId, qty) =>
    set((state) => {
      const q = Number.isFinite(Number(qty)) ? Math.trunc(Number(qty)) : null
      if (q === null) return {}
      if (q <= 0) {
        return { cart: state.cart.filter((item) => item.skuId !== skuId) }
      }
      return {
        cart: state.cart.map((item) =>
          item.skuId === skuId ? { ...item, qty: q } : item
        ),
      }
    }),

  removeFromCart: (skuId) =>
    set((state) => ({ cart: state.cart.filter((i) => i.skuId !== skuId) })),

  clearCart: () => set({ cart: [] }),
}))
