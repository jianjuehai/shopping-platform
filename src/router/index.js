import React from 'react'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'

// 路由配置数组
export const routes = [
  {
    path: '/',
    element: <ProductList />,
    name: '商品列表'
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
    name: '商品详情'
  }
]