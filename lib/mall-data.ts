// 积分商城静态数据（与原型 mall-home.html 保持一致，文本、跳转、功能属性不变）

export type Category = {
  name: string
  href: string
  icon: string
  nodeId: string
  iconNodeId: string
  nameNodeId: string
}

export const CATEGORIES: Category[] = [
  {
    name: '数码家电',
    href: 'category.html?name=数码家电',
    icon: '/mall/cat-digital.png',
    nodeId: 'U7Yxi23kExQqgSKenwyjs5',
    iconNodeId: '1CLBtNgPCBufmVNjc6lAei',
    nameNodeId: 'gyWEjiSXmkQaCYSXmQTwSt',
  },
  {
    name: '食品生鲜',
    href: 'category.html?name=食品生鲜',
    icon: '/mall/cat-food.png',
    nodeId: 'FkvbBHZ8tXqE2L24bAlE0M',
    iconNodeId: 'x2HW1IvZn1HY0o5UqHQIxK',
    nameNodeId: 'xYavNzcl2mEvRoQgFDbzlo',
  },
  {
    name: '家居日用',
    href: 'category.html?name=家居日用',
    icon: '/mall/cat-home.png',
    nodeId: 'VCRsP7Io1ktKfqgNfuNk8T',
    iconNodeId: 'drmmooC9UnmcwSlYGix6FC',
    nameNodeId: '49Ls11OnESQyCViCg7Ff8l',
  },
  {
    name: '美妆个护',
    href: 'category.html?name=美妆个护',
    icon: '/mall/cat-beauty.png',
    nodeId: 'E7JRvYuMqFkhGaHq8U14X5',
    iconNodeId: 'k6M6nym9gnUPoXDIz82Jz2',
    nameNodeId: 'GOPH67BojXIGnDN6DyPZF8',
  },
  {
    name: '服饰箱包',
    href: 'category.html?name=服饰箱包',
    icon: '/mall/cat-apparel.png',
    nodeId: 'EobwfhhEOj0Q6ACqQB5S1f',
    iconNodeId: 'ipe8cziu6H9L0w3vOXCujt',
    nameNodeId: 'x6WNiYBuCHJLWB7BWGxytD',
  },
  {
    name: '母婴玩具',
    href: 'category.html?name=母婴玩具',
    icon: '/mall/cat-baby.png',
    nodeId: 'K9RWEsyf5NgoBRBvEMvx9j',
    iconNodeId: 've5XQuxmBNFBJEUNVmuL1E',
    nameNodeId: '0LD2MOmPj2opFo8i9g6KAY',
  },
  {
    name: '潮玩周边',
    href: 'category.html?name=潮玩周边',
    icon: '/mall/cat-toy.png',
    nodeId: 'Z60lOu9SosVTCtuhg63Ql4',
    iconNodeId: 'AUnjo452zCZFDNRnpKOO3t',
    nameNodeId: 'fLZOk8PowLyNeoenlKDU4B',
  },
  {
    name: '卡券权益',
    href: 'category.html?name=卡券权益',
    icon: '/mall/cat-coupon.png',
    nodeId: 'ZjuIMDtopFRb6FqE0dVV0c',
    iconNodeId: 'ALt6omiiUkltCCEoAPFblF',
    nameNodeId: 'fMsZMVCdNTxYkixGFAk5GP',
  },
  {
    name: '汽车用品',
    href: 'category.html?name=汽车用品',
    icon: '/mall/cat-car.png',
    nodeId: '9PNFJ0Zv7f5aYPYA8n5dbY',
    iconNodeId: 'l3uB9UVppX4svXVVVBexE0',
    nameNodeId: '0MbVBcElf3pBKUYmPbJcZk',
  },
  {
    name: '图书文具',
    href: 'category.html?name=图书文具',
    icon: '/mall/cat-book.png',
    nodeId: 'rcuxXVwr9VoPDEMUOgCFys',
    iconNodeId: 'UTVBKlTwv54va3MtCf2MS3',
    nameNodeId: 'bLgBLRRl6hY8vghg8XZ9QG',
  },
]

export type Good = {
  name: string
  points: number
  orig: string
  ex: number
  img: string
}

// 与原型 goods 数组顺序一致，id 即索引
export const GOODS: Good[] = [
  { name: '迈极炫定制打火机', points: 500, orig: '¥39.90', ex: 128, img: '/mall/goods-lighter.png' },
  { name: '便携收纳盒', points: 300, orig: '¥19.90', ex: 86, img: '/mall/goods-box.png' },
  { name: '品牌毛巾套装', points: 800, orig: '¥59.00', ex: 45, img: '/mall/goods-towel.png' },
  { name: '迈极炫帆布袋', points: 450, orig: '¥29.90', ex: 72, img: '/mall/goods-bag.png' },
  { name: '迷你蓝牙音箱', points: 1500, orig: '¥129.00', ex: 23, img: '/mall/goods-speaker.png' },
  { name: '品牌钥匙扣', points: 200, orig: '¥9.90', ex: 210, img: '/mall/goods-keychain.png' },
]

export const BANNERS = [
  { src: '/mall/banner-1.png', alt: 'Banner 1', nodeId: 'QL7IM6LE9aTXEvOmRdUy4i' },
  { src: '/mall/banner-2.png', alt: 'Banner 2', nodeId: 'tZNZw9quDFwHSHme8CrRnv' },
  { src: '/mall/banner-3.png', alt: 'Banner 3', nodeId: 'y2yCzZ7b4EM3YvSDJyl9L9' },
]

export const MY_POINTS = 1280
