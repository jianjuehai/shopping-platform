import React, { useState } from 'react'
import { Radio, InputNumber, Button, Typography, Divider } from '@arco-design/web-react'

const { Text } = Typography

export default function SpecSelector({ product, onAdd }) {
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState(product.skuList?.[0])

  const handleChangeSku = (skuId) => {
    const target = product.skuList.find(s => s.skuId === skuId)
    setSelected(target)
  }

  const handleAdd = () => {
    if (!selected) return
    onAdd({
      skuId: selected.skuId,
      title: product.title,
      price: product.price,
      qty
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginTop: 30,
        padding: 16,
        borderRadius: 8,
        border: '1px solid #eee',
        background: '#fafafa'
      }}
    >
      {/* 规格区域 */}
      <div>
        <div
          style={{
            marginBottom: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
           <Text style={{ fontWeight: 600 }}>规格</Text>
          {selected && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              库存：{selected.stock} 件
            </Text>
          )}
        </div>

        <Radio.Group
          value={selected?.skuId}
          onChange={handleChangeSku}
          type="button"          // 如果不想要按钮样式，可以删掉这一行
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          {product.skuList.map(s => (
            <Radio key={s.skuId} value={s.skuId}>
              {s.name}（{s.stock}件）
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      {/* 数量区域 */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ fontWeight: 600 }}>数量</Text>
        <InputNumber
          size="large"
          min={1}
          value={qty}
          onChange={setQty}
          style={{ width: 60 }}
        />
      </div>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button
          type="primary"
          size="large"
          long
          onClick={handleAdd}
          disabled={!selected || qty <= 0}
        >
          加入购物车
        </Button>
      </div>
    </div>
  )
}