import { Select, InputNumber, Button } from '@arco-design/web-react'
import { useStore } from '../store/useStore'

const { Option } = Select

export default function FilterPanel(){
  const filters = useStore(s => s.filters)
  const setFilters = useStore(s => s.setFilters)

  // 统一控件高度
  const controlHeight = 36
  const controlStyle = {
    height: controlHeight,
    lineHeight: `${controlHeight}px`,
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <>
      {/* 局部样式：默认一行（nowrap），小屏时换行并把第二行元素占满一行 */}
      <style>{`
        .filter-panel {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          align-items: center;
          padding-bottom: 6px;
          flex-wrap: nowrap; /* 默认桌面一行 */
        }
        .filter-panel .first-row {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
        }
        .filter-panel .price-group {
          display:flex;
          gap:8px;
          align-items:center;
        }

        /* 桌面：保证第二行内部元素（排序 + 重置）始终在同一行 */
        .filter-panel .second-row {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
        }

        /* 移动端：两行显示，第二行占满一行并左对齐 */
        @media (max-width: 600px) {
          .filter-panel {
            flex-wrap: wrap;
          }
          .filter-panel .second-row {
            flex-basis: 100%;
            margin-top: 6px;
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="filter-panel">
        {/* 第一行：分类 + 价格 */}
        <div className="first-row">
          <Select
            placeholder='全部分类'
            value={filters.category}
            onChange={(v)=>setFilters({ category: v })}
            style={{ ...controlStyle, width: 'min(100px, 26vw)', flexShrink: 0 }}
          >
            <Option value={'全部'}>全部</Option>
            <Option value={'手机'}>手机</Option>
            <Option value={'电脑'}>电脑</Option>
            <Option value={'家电'}>家电</Option>
          </Select>

          <div className="price-group">
            <span style={{ fontSize: 14 }}>价格</span>

            <InputNumber
              hideControl={true}
              min={0}
              max={100000}
              value={filters.priceRange?.[0]}
              onChange={(v)=>setFilters({ priceRange: [v, filters.priceRange[1]] })}
              style={{ ...controlStyle, width: '100px', padding: '0 8px', textAlign: 'center' }}
            />
            <span>-</span>
            <InputNumber
              hideControl={true}
              min={0}
              max={100000}
              value={filters.priceRange?.[1]}
              onChange={(v)=>setFilters({ priceRange: [filters.priceRange[0], v] })}
              style={{ ...controlStyle, width: '100px', padding: '0 8px', textAlign: 'center' }}
            />
          </div>
        </div>

        {/* 第二行：排序 + 重置（桌面同一行，移动端换行） */}
        <div className="second-row">
          <Select
            value={filters.sort ?? 'default'}
            onChange={(v)=>setFilters({ sort: v === 'default' ? null : v })}
            style={{ ...controlStyle, width: 'min(140px, 44vw)', padding: '0 8px',flexShrink: 0 }}
          >
            <Option value="default">默认</Option>
            <Option value={'price_asc'}>价格 从低到高</Option>
            <Option value={'price_desc'}>价格 从高到低</Option>
            <Option value={'sales_desc'}>销量 从高到低</Option>
          </Select>

          <Button
            size="middle"
            onClick={()=>setFilters({ category:'全部', priceRange:[0,10000], sort: null })}
            style={{ ...controlStyle}}
          >
            重置
          </Button>
        </div>
      </div>
    </>
  )
}