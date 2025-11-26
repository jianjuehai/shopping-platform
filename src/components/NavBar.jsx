import React from 'react'
import { Layout, Input, Badge, Button } from '@arco-design/web-react'
import { IconArchive, IconLeft } from '@arco-design/web-react/icon'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function NavBar(){
    const navigate = useNavigate()
    const location = useLocation()
    const cartCount = useStore(s => s.cart.reduce((sum, i) => sum + i.qty, 0))

    // 在商品详情页（路径以 /product/ 开头）显示 “回到首页”，其他页面显示 “电商平台”
    const isProductPage = location.pathname.startsWith('/product/')
    const titleText = isProductPage ? <IconLeft /> : '电商平台'

    return (
        <Layout.Header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 24px' }}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                 <h2
                   style={{
                     margin: 0,
                     cursor: 'pointer',
                     fontSize: '1rem',
                     fontWeight: 600,
                   }}
                   onClick={() => navigate('/')}
                 >
                   {titleText}
                 </h2>
                 {/* 商品详情页隐藏搜索框，其他页面显示 */}
                 {!isProductPage && (
                   <Input.Search
                     placeholder='搜索商品'
                     onSearch={(val) => navigate(`/?q=${encodeURIComponent(val)}`)}
                     style={{ width: 'min(300px, 40vw)' }}
                   />
                 )}               
            </div>
            <div>
                 <Badge count={cartCount} style={{ marginRight:8 }}>
                     <Button
                       type='primary'
                       size='small'
                       icon={<IconArchive />}
                       onClick={() => window.dispatchEvent(new CustomEvent('toggleCart'))}
                       style={{ padding: '4px 8px' }}
                     >
                       购物车
                     </Button>
                 </Badge>
            </div>
        </Layout.Header>
    )
}