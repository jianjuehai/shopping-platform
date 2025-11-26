import { useMemo } from 'react'
import { Grid } from '@arco-design/web-react'
import NavBar from '../components/NavBar'
import ProductCard from '../components/ProductCard'
import FilterPanel from '../components/FilterPanel'
import Pager from '../components/Pagination'
import { useStore } from '../store/useStore'

const { Row, Col } = Grid

export default function ProductList() {
  const { products, filters, page } = useStore((s) => ({
    products: s.products,
    filters: s.filters,
    page: s.page,
  }))

  const filtered = useMemo(() => {
    const {
      category,
      priceRange = [0, 999999],
      keyword = '',
      sort,
    } = filters || {}

    let list = products.slice()

    // 1. 分类筛选
    if (category && category !== '全部') {
      list = list.filter((p) => p.category === category)
    }

    // 2. 价格区间筛选
    const [minPrice, maxPrice] = priceRange
    list = list.filter(
      (p) => p.price >= (minPrice ?? 0) && p.price <= (maxPrice ?? 999999)
    )

    // 3. 关键字筛选
    if (keyword) {
      list = list.filter((p) => p.title.includes(keyword))
    }

    // 4. 排序
    if (sort === 'price_asc') {
      list.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
      list.sort((a, b) => b.price - a.price)
    } else if (sort === 'sales_desc') {
      list.sort((a, b) => b.sales - a.sales)
    }

    return list
  }, [products, filters])

  const start = (page.pageNo - 1) * page.pageSize
  const pageList = filtered.slice(start, start + page.pageSize)

  return (
    <div>
      <NavBar />
      <div
        className="content"
        style={{
          paddingTop: 16,
          boxSizing: 'border-box',   // 防止内边距影响总宽度
          maxWidth: '100%',          // 不超出父容器
          overflowX: 'hidden',       // 阻止横向滚动（临时防护）
        }}
      >
        <FilterPanel /> 
        {/* 把 Row 包一层，抵消 Grid 的负 margin，避免在小屏产生横向滚动 */}
        <div style={{ paddingLeft: 8, paddingRight: 8, boxSizing: 'border-box' }}>
          <Row gutter={16} style={{ marginTop: 8 }}>
            {pageList.map((item) => (
              <Col
                key={item.id}
                span={6}
                xs={12}    // 移动端每行展示两个
                sm={12}
                md={8}
                lg={6}
                style={{ marginBottom: 16 }}
              >
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </div> 
        <Pager total={filtered.length} />
      </div>
    </div>
  )
}
