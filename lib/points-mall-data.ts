export const myPoints = 1280

export type Category = {
  name: string
  icon: string
}

// 分类导航（原型 10 个分类，横向分页滚动）
export const categories: Category[] = [
  { name: "数码家电", icon: "/categories/digital.png" },
  { name: "食品生鲜", icon: "/categories/food.png" },
  { name: "家居日用", icon: "/categories/home.png" },
  { name: "美妆个护", icon: "/categories/beauty.png" },
  { name: "服饰箱包", icon: "/categories/apparel.png" },
  { name: "母婴玩具", icon: "/categories/baby.png" },
  { name: "潮玩周边", icon: "/categories/trendy.png" },
  { name: "卡券权益", icon: "/categories/coupon.png" },
  { name: "汽车用品", icon: "/categories/auto.png" },
  { name: "图书文具", icon: "/categories/books.png" },
]

export type Banner = {
  id: number
  image: string
  alt: string
}

// Banner 轮播（原型 Banner 1/2/3，2s 自动播放）
export const banners: Banner[] = [
  { id: 1, image: "/products/banner-orange.png", alt: "迈极炫冰爽槟榔 橙子味" },
  { id: 2, image: "/products/banner-pineapple.png", alt: "迈极炫冰爽槟榔 凤梨味" },
  { id: 3, image: "/products/banner-coffee.png", alt: "迈极炫冰爽槟榔 咖啡味" },
]

export type Goods = {
  id: number
  name: string
  points: number
  orig: string
  ex: number
  image: string
}

// 推荐兑换（原型 goods 数组，点击跳 goods-detail.html?id=）
export const goods: Goods[] = [
  { id: 0, name: "迈极炫定制打火机", points: 500, orig: "¥39.90", ex: 128, image: "/products/lighter.png" },
  { id: 1, name: "便携收纳盒", points: 300, orig: "¥19.90", ex: 86, image: "/products/storage-box.png" },
  { id: 2, name: "品牌毛巾套装", points: 800, orig: "¥59.00", ex: 45, image: "/products/towel-set.png" },
  { id: 3, name: "迈极炫帆布袋", points: 450, orig: "¥29.90", ex: 72, image: "/products/canvas-bag.png" },
  { id: 4, name: "迷你蓝牙音箱", points: 1500, orig: "¥129.00", ex: 23, image: "/products/speaker.png" },
  { id: 5, name: "品牌钥匙扣", points: 200, orig: "¥9.90", ex: 210, image: "/products/keychain.png" },
]
