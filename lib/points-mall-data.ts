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

// 商品详情参数（原型 goods-detail.html：规格 / 库存 / 图文详情占位）
export function getGoodsById(id: number): Goods | undefined {
  return goods.find((g) => g.id === id)
}

export const goodsDetailInfo = {
  stock: "库存充足",
  detailTitle: "商品详情",
  detailParagraphs: [
    "这里是商品详情描述占位。",
    "支持展示图文混排内容，包括商品参数、使用说明、注意事项等。后续可替换为真实详情内容。",
  ],
}

// 分类页排序 Tab（原型 category.html：综合 / 销量 / 价格）
export const sortTabs = ["综合", "销量", "价格"] as const

// 搜索页热门搜索词（原型 search.html）
export const hotKeywords = ["打火机", "音箱", "收纳盒", "钥匙扣", "毛巾套装", "帆布袋", "充电宝", "T恤"]

// 中奖记录（原型 records.html）
export type LotteryRecord = {
  id: string
  type: "prize" | "points" | "none"
  title: string
  orderId: string
  time: string
}

export const lotteryRecords: LotteryRecord[] = [
  { id: "1", type: "none", title: "谢谢参与，下次好运", orderId: "AJM8X7K2P9", time: "2026-08-27 10:23:45" },
  { id: "2", type: "points", title: "+50 积分", orderId: "BJM3M9N4Q1", time: "2026-08-26 18:40:22" },
  { id: "3", type: "prize", title: "加5元兑换槟榔一包", orderId: "CJM5L2R8T6", time: "2026-08-25 14:12:33" },
  { id: "4", type: "points", title: "+20 积分", orderId: "DJM9P1W5X2", time: "2026-08-24 09:33:17" },
  { id: "5", type: "none", title: "谢谢参与，下次好运", orderId: "EJM2K6Y3Z8", time: "2026-08-23 16:55:01" },
  { id: "6", type: "points", title: "+50 积分", orderId: "FJM4H7B9N5", time: "2026-08-22 11:20:38" },
  { id: "7", type: "prize", title: "加5元兑换槟榔一包", orderId: "GJM1D3C6V9", time: "2026-08-21 20:15:52" },
  { id: "8", type: "points", title: "+20 积分", orderId: "HJM7F2G4K8", time: "2026-08-20 08:47:29" },
]

// 消息中心（原型 message.html：订单消息 / 预警消息）
export type MallMessage = {
  id: string
  tab: "order" | "warning"
  title: string
  body: string
  tag: string
  time: string
  unread: boolean
}

export const messages: MallMessage[] = [
  {
    id: "m1",
    tab: "order",
    title: "兑换成功通知",
    body: "您已成功兑换 迈极炫定制打火机 x1，消耗 500 积分 + ¥6.00 运费，预计 30 分钟内发货。",
    tag: "已兑换",
    time: "10分钟前",
    unread: true,
  },
  {
    id: "m2",
    tab: "order",
    title: "发货提醒通知",
    body: "订单 XJM20260827001 已发货，请留意物流信息。",
    tag: "已发货",
    time: "35分钟前",
    unread: true,
  },
  {
    id: "m3",
    tab: "order",
    title: "物流更新通知",
    body: "订单 XJM20260826003 已揽收，物流单号 SF1234567890。",
    tag: "运输中",
    time: "昨天 18:20",
    unread: true,
  },
  {
    id: "m4",
    tab: "order",
    title: "签收成功通知",
    body: "订单 XJM20260825004 已签收，感谢您的兑换。",
    tag: "已签收",
    time: "08-25 14:12",
    unread: false,
  },
  {
    id: "m5",
    tab: "warning",
    title: "积分预警通知",
    body: "订单 XJM20260824005 积分即将到期，请及时使用。",
    tag: "预警",
    time: "08-24 11:05",
    unread: false,
  },
]

// 我的页订单入口（原型 profile.html）
export const orderEntries = [
  { key: "unpaid", label: "待付款", icon: "/profile/unpaid.png" },
  { key: "unshipped", label: "待发货", icon: "/profile/unshipped.png" },
  { key: "shipping", label: "待收货", icon: "/profile/shipping.png" },
  { key: "done", label: "已完成", icon: "/profile/done.png" },
]

// 我的页功能菜单（原型 profile.html）
export const profileMenu = [
  { key: "promo", label: "业务推广", icon: "/profile/promo.png" },
  { key: "console", label: "经销控制台", icon: "/profile/console.png" },
  { key: "sales", label: "销售数据", icon: "/profile/sales.png" },
  { key: "points", label: "积分明细", icon: "/profile/points.png" },
  { key: "records", label: "中奖记录", icon: "/profile/records.png", href: "/lottery/records" },
  { key: "address", label: "我的地址", icon: "/profile/address.png" },
  { key: "service", label: "联系客服", icon: "/profile/service.png" },
  { key: "about", label: "关于我们", icon: "/profile/about.png" },
]

// 活动规则（原型 rule.html）
export const ruleSections = [
  {
    title: "一、活动时间",
    items: ["本次活动自 2026 年 8 月 27 日 00:00 起至 2026 年 9 月 30 日 23:59 止。"],
  },
  {
    title: "二、参与方式",
    items: [
      "用户在迈极炫线下合作门店购买指定活动商品后，使用微信扫描包装外码即可进入抽奖页面。",
      "扫描外码后，需刮开产品内袋涂层，输入 4 位验证码完成验证，即可参与抽奖。",
      "每个内袋验证码仅限使用一次，重复扫码将直接展示历史抽奖结果。",
    ],
  },
  {
    title: "三、奖项设置",
    items: [
      "实物奖项：加 5 元兑换 50 元迈极炫槟榔一包，需到线下门店核验兑换。",
      "积分奖项：随机获得不同额度积分，积分将发放至用户账户，可在积分商城兑换商品。",
      "谢谢参与：未中奖，期待下次好运。",
    ],
  },
  {
    title: "四、兑奖说明",
    items: [
      "实物奖项需在活动有效期内，凭中奖页面到购买门店或指定兑换门店进行核验兑换。",
      "门店核验中奖信息无误后，用户加付相应金额即可兑换实物奖品。",
      "积分奖项自动发放至账户，无需线下核验。",
      "逾期未兑换的奖项视为自动放弃。",
    ],
  },
  {
    title: "五、注意事项",
    items: [
      "本次活动最终解释权归迈极炫品牌方所有。",
      "如遇不可抗力或系统故障，主办方有权调整活动规则。",
      "严禁任何形式的舞弊行为，一经发现取消资格。",
    ],
  },
]
