import Mock from 'mockjs'

const categories = ['手机', '电脑', '家电', '服饰', '美妆']

export function generateProducts(count = 80) {
  return Mock.mock({
    [`list|${count}`]: [{
      'id|+1': 1,
      'title': '@ctitle(6, 18)',
      'price|100-5000': 1,
      'oldPrice|500-6000': 1,
      'sales|0-5000': 1,
      'rating|1-5': 1,
      'image': function() {
        // 用随机种子保证每个商品图片不同
        return `https://picsum.photos/seed/${this.id}/320/240`
      },
      'category|1': categories,
      'skuList': [{
        'skuId|+1': 1000,
        'name': '默认',
        'stock|0-100': 1,
        'attrs': {
          'color|1': ['黑', '白', '银'],
          'storage|1': ['64GB', '128GB', '256GB']
        }
      }]
    }]
  }).list
}