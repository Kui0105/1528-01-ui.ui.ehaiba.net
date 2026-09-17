// 积分商城数据 —— 文本、跳转地址、data-page-node-id 均取自 HTML 原型，保持不变

export interface Category {
  name: string
  href: string
  icon: string
  nodeId: string
}

export interface Good {
  name: string
  points: number
  orig: string
  ex: number
  image: string
}

export interface Banner {
  image: string
  nodeId: string
  label: string
}

export const myPoints = 1280

export const banners: Banner[] = [
  { image: '/mall/banner-1.png', nodeId: 'QL7IM6LE9aTXEvOmRdUy4i', label: 'Banner 1' },
  { image: '/mall/banner-2.png', nodeId: 'tZNZw9quDFwHSHme8CrRnv', label: 'Banner 2' },
  { image: '/mall/banner-3.png', nodeId: 'y2yCzZ7b4EM3YvSDJyl9L9', label: 'Banner 3' },
]

export const categories: Category[] = [
  { name: '数码家电', href: "category.html?name=数码家电", icon: '/mall/cat-1.png', nodeId: 'U7Yxi23kExQqgSKenwyjs5' },
  { name: '食品生鲜', href: "category.html?name=食品生鲜", icon: '/mall/cat-2.png', nodeId: 'FkvbBHZ8tXqE2L24bAlE0M' },
  { name: '家居日用', href: "category.html?name=家居日用", icon: '/mall/cat-3.png', nodeId: 'VCRsP7Io1ktKfqgNfuNk8T' },
  { name: '美妆个护', href: "category.html?name=美妆个护", icon: '/mall/cat-4.png', nodeId: 'E7JRvYuMqFkhGaHq8U14X5' },
  { name: '服饰箱包', href: "category.html?name=服饰箱包", icon: '/mall/cat-5.png', nodeId: 'EobwfhhEOj0Q6ACqQB5S1f' },
  { name: '母婴玩具', href: "category.html?name=母婴玩具", icon: '/mall/cat-6.png', nodeId: 'K9RWEsyf5NgoBRBvEMvx9j' },
  { name: '潮玩周边', href: "category.html?name=潮玩周边", icon: '/mall/cat-7.png', nodeId: 'Z60lOu9SosVTCtuhg63Ql4' },
  { name: '卡券权益', href: "category.html?name=卡券权益", icon: '/mall/cat-8.png', nodeId: 'ZjuIMDtopFRb6FqE0dVV0c' },
  { name: '汽车用品', href: "category.html?name=汽车用品", icon: '/mall/cat-9.png', nodeId: '9PNFJ0Zv7f5aYPYA8n5dbY' },
  { name: '图书文具', href: "category.html?name=图书文具", icon: '/mall/cat-10.png', nodeId: 'rcuxXVwr9VoPDEMUOgCFys' },
]

export const goods: Good[] = [
  { name: '迈极炫定制打火机', points: 500, orig: '¥39.90', ex: 128, image: '/mall/product-1.png' },
  { name: '便携收纳盒', points: 300, orig: '¥19.90', ex: 86, image: '/mall/product-2.png' },
  { name: '品牌毛巾套装', points: 800, orig: '¥59.00', ex: 45, image: '/mall/product-3.png' },
  { name: '迈极炫帆布袋', points: 450, orig: '¥29.90', ex: 72, image: '/mall/product-4.png' },
  { name: '迷你蓝牙音箱', points: 1500, orig: '¥129.00', ex: 23, image: '/mall/product-5.png' },
  { name: '品牌钥匙扣', points: 200, orig: '¥9.90', ex: 210, image: '/mall/product-6.png' },
]
