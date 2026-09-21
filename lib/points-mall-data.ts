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
  image: string
}

export const lotteryRecords: LotteryRecord[] = [
  { id: "1", type: "none", title: "谢谢参与，下次好运", orderId: "AJM8X7K2P9", time: "2026-08-27 10:23:45", image: "/products/gift-box.png" },
  { id: "2", type: "points", title: "+50 积分", orderId: "BJM3M9N4Q1", time: "2026-08-26 18:40:22", image: "/products/box-50.png" },
  { id: "3", type: "prize", title: "加5元兑换槟榔一包", orderId: "CJM5L2R8T6", time: "2026-08-25 14:12:33", image: "/products/box-20.png" },
  { id: "4", type: "points", title: "+20 积分", orderId: "DJM9P1W5X2", time: "2026-08-24 09:33:17", image: "/products/box-20.png" },
  { id: "5", type: "none", title: "谢谢参与，下次好运", orderId: "EJM2K6Y3Z8", time: "2026-08-23 16:55:01", image: "/products/gift-box.png" },
  { id: "6", type: "points", title: "+50 积分", orderId: "FJM4H7B9N5", time: "2026-08-22 11:20:38", image: "/products/box-50.png" },
  { id: "7", type: "prize", title: "加5元兑换槟榔一包", orderId: "GJM1D3C6V9", time: "2026-08-21 20:15:52", image: "/products/box-20.png" },
  { id: "8", type: "points", title: "+20 积分", orderId: "HJM7F2G4K8", time: "2026-08-20 08:47:29", image: "/products/box-20.png" },
]

// 消息中心（原型 message.html：订单消息 / 预警消息）
// 身份：业务员 / 经销商 / 销售
export type MessageRole = "salesman" | "dealer" | "sales"

export type MallMessage = {
  id: string
  tab: "order" | "warning"
  title: string
  body: string
  tag: string
  time: string
  unread: boolean
  // 订单消息：点击进入对应订单详情
  orderId?: string
  // 预警消息：可见身份 + 库存预警类型（门店库存 / 经销商库存）
  warnRoles?: MessageRole[]
  warnType?: "store" | "dealer"
  target?: string
}

// 订单消息：仅 待支付 / 支付成功 / 订单发货 三类，点击进入对应订单详情
export const messages: MallMessage[] = [
  {
    id: "m1",
    tab: "order",
    title: "订单待支付",
    body: "您有一笔订单待支付：迈极炫定制打火机 x1，共需 500 积分 + ¥6.00 运费，请于 30 分钟内完成支付。",
    tag: "待支付",
    time: "10分钟前",
    unread: true,
    orderId: "XJM20260827001",
  },
  {
    id: "m2",
    tab: "order",
    title: "订单支付成功",
    body: "您的订单 XJM20260827001 已支付成功，商家将尽快为您发货。",
    tag: "支付成功",
    time: "35分钟前",
    unread: true,
    orderId: "XJM20260827001",
  },
  {
    id: "m3",
    tab: "order",
    title: "订单已发货",
    body: "您的订单 XJM20260827003 已由顺丰速运发出，运单号 SF1234567890。",
    tag: "订单发货",
    time: "昨天 18:20",
    unread: true,
    orderId: "XJM20260827003",
  },
  {
    id: "m4",
    tab: "order",
    title: "订单支付成功",
    body: "您的订单 XJM20260827004 已支付成功，等待商家发货。",
    tag: "支付成功",
    time: "08-25 14:12",
    unread: false,
    orderId: "XJM20260827004",
  },
  {
    id: "m5",
    tab: "order",
    title: "订单已发货",
    body: "您的订单 XJM20260827005 已发货，请注意查收。",
    tag: "订单发货",
    time: "08-24 11:05",
    unread: false,
    orderId: "XJM20260827005",
  },
  // —— 预警消息 ——
  // 门店库存不足：业务员 / 经销商 / 销售 均可见，点击跳转门店管理列表
  {
    id: "w1",
    tab: "warning",
    title: "门店库存不足预警",
    body: "长沙旗舰店 现有库存 8 件，已低于安全库存（20 件），请及时补货。",
    tag: "门店库存",
    time: "20分钟前",
    unread: true,
    warnRoles: ["salesman", "dealer", "sales"],
    warnType: "store",
    target: "长沙旗舰店",
  },
  {
    id: "w2",
    tab: "warning",
    title: "门店库存不足预警",
    body: "开福分店 现有库存 5 件，已低于安全库存（20 件），请及时补货。",
    tag: "门店库存",
    time: "1小时前",
    unread: true,
    warnRoles: ["salesman", "dealer", "sales"],
    warnType: "store",
    target: "开福分店",
  },
  // 经销商库存不足：仅销售身份可见，点击跳转区域详情（销售数据-区域详情）
  {
    id: "w3",
    tab: "warning",
    title: "经销商库存不足预警",
    body: "长沙总经销 现有库存 120 件，已低于安全库存（500 件），请及时安排进货。",
    tag: "经销商库存",
    time: "昨天 15:40",
    unread: true,
    warnRoles: ["sales"],
    warnType: "dealer",
    target: "长沙总经销",
  },
  {
    id: "w4",
    tab: "warning",
    title: "经销商库存不足预警",
    body: "岳阳经销商 现有库存 90 件，已低于安全库存（500 件），请及时安排进货。",
    tag: "经销商库存",
    time: "08-24 11:05",
    unread: false,
    warnRoles: ["sales"],
    warnType: "dealer",
    target: "岳阳经销商",
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

// 收货地址（原型 address.html / order-submit.html）
export type Address = {
  id: string
  name: string
  phone: string
  region: string
  detail: string
  isDefault: boolean
}

export const addresses: Address[] = [
  {
    id: "a1",
    name: "张三",
    phone: "138****8888",
    region: "广东省 广州市 天河区",
    detail: "科韵路 123 号某某大厦 18 楼",
    isDefault: true,
  },
  {
    id: "a2",
    name: "李四",
    phone: "139****9999",
    region: "湖南省 长沙市 岳麓区",
    detail: "麓谷大道 88 号创业园 6 栋",
    isDefault: false,
  },
]

// 我的订单（原型 orders.html / order-detail.html）
export type OrderStatus = "unpaid" | "unshipped" | "shipping" | "done"

export type Order = {
  id: string
  status: OrderStatus
  goodsId: number
  name: string
  points: number
  qty: number
  freight: string
  time: string
}

export const orderStatusText: Record<OrderStatus, string> = {
  unpaid: "待付款",
  unshipped: "待发货",
  shipping: "待收货",
  done: "已完成",
}

export const orderTabs = [
  { key: "all", label: "全部" },
  { key: "unpaid", label: "待付款" },
  { key: "unshipped", label: "待发货" },
  { key: "shipping", label: "待收货" },
  { key: "done", label: "已完成" },
] as const

export const orders: Order[] = [
  { id: "XJM20260827001", status: "unpaid", goodsId: 0, name: "迈极炫定制打火机", points: 500, qty: 1, freight: "¥6.00", time: "2026-08-27 10:23:45" },
  { id: "XJM20260827002", status: "unshipped", goodsId: 1, name: "便携收纳盒", points: 300, qty: 2, freight: "¥6.00", time: "2026-08-27 09:12:08" },
  { id: "XJM20260827003", status: "shipping", goodsId: 2, name: "品牌毛巾套装", points: 800, qty: 1, freight: "¥6.00", time: "2026-08-26 18:40:22" },
  { id: "XJM20260827004", status: "done", goodsId: 4, name: "迷你蓝牙音箱", points: 1500, qty: 1, freight: "¥6.00", time: "2026-08-25 14:12:33" },
  { id: "XJM20260827005", status: "done", goodsId: 3, name: "迈极炫帆布袋", points: 450, qty: 1, freight: "¥6.00", time: "2026-08-24 11:05:09" },
]

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id)
}

// 积分明细（原型 points-detail.html：全部 / 积分获得 / 积分扣减）
export const pointsBalance = 1280

export type PointsRecord = {
  id: string
  title: string
  time: string
  amount: number // 正为获得，负为扣减
}

export const pointsRecords: PointsRecord[] = [
  { id: "p1", title: "扫码抽奖获得积分", time: "2026-08-27 10:23:45", amount: 50 },
  { id: "p2", title: "兑换 迈极炫定制打火机", time: "2026-08-27 10:25:10", amount: -500 },
  { id: "p3", title: "每日签到奖励", time: "2026-08-26 18:40:22", amount: 300 },
  { id: "p4", title: "分享活动奖励", time: "2026-08-26 15:12:08", amount: 20 },
  { id: "p5", title: "兑换 品牌毛巾套装", time: "2026-08-25 14:12:33", amount: -600 },
  { id: "p6", title: "新人注册奖励", time: "2026-08-25 11:05:09", amount: 2500 },
  { id: "p7", title: "扫码抽奖获得积分", time: "2026-08-24 09:33:17", amount: 50 },
]

// 业务推广（原型 promote.html）
export const promoteInfo = {
  name: "业务员：张三",
  phone: "138****8888",
  dealer: "经销商：长沙总经销",
  points: "8,600",
  stats: [
    { label: "全部", value: "12860" },
    { label: "铺货量", value: "9268" },
    { label: "兑奖量", value: "352" },
  ],
  entries: ["产品激活", "产品回收", "兑奖核销", "门店管理", "产品明细"],
}

// 经销控制台（原型 dealer.html）
export const dealerInfo = {
  name: "湖南海拔互联网科技有限公司",
  status: "启用",
  province: "湖南省 长沙市",
  region: "华中大区 · 湖南省",
  points: "12,860",
  stats: [
    { label: "进货量", value: "3,600" },
    { label: "激活量", value: "3,240" },
    { label: "动销量", value: "2,960" },
    { label: "中奖量", value: "880" },
  ],
  entries: ["进货商城", "进货订单", "产品库存", "门店管理", "业务管理", "销售明细", "兑奖明细", "物料商城", "积分明细", "物料订单"],
}

// 销售数据（原型 sales.html）多级下钻：省份 → 市 → 经销商
export type SalesMetric = { dealers: number; salesmen: number; stores: number }

export type SalesDealer = {
  id: string
  name: string
  status: "启用" | "禁用"
  contact: string
  phone: string
  location: string // 省市
  region: string // 销售区域
  salesmen: number
  stores: number
}

export type SalesCity = {
  id: string
  name: string
  metric: SalesMetric
  dealers: SalesDealer[]
}

export type SalesProvince = {
  id: string
  name: string
  metric: SalesMetric
  cities: SalesCity[]
}

export const salesProvinces: SalesProvince[] = [
  {
    id: "p1",
    name: "湖南省",
    metric: { dealers: 28, salesmen: 156, stores: 482 },
    cities: [
      {
        id: "c11",
        name: "长沙市",
        metric: { dealers: 8, salesmen: 45, stores: 142 },
        dealers: [
          { id: "d111", name: "长沙兴盛商贸有限公司", status: "启用", contact: "刘经理", phone: "138****1234", location: "湖南省长沙市", region: "长沙市天心区", salesmen: 6, stores: 18 },
          { id: "d112", name: "长沙锦程贸易有限公司", status: "禁用", contact: "陈经理", phone: "139****5678", location: "湖南省长沙市", region: "长沙市岳麓区", salesmen: 5, stores: 15 },
          { id: "d113", name: "长沙联华批发部", status: "启用", contact: "张老板", phone: "137****9012", location: "湖南省长沙市", region: "长沙市开福区", salesmen: 4, stores: 12 },
        ],
      },
      {
        id: "c12",
        name: "株洲市",
        metric: { dealers: 5, salesmen: 28, stores: 86 },
        dealers: [
          { id: "d121", name: "株洲鸿运商贸", status: "启用", contact: "王经理", phone: "136****2345", location: "湖南省株洲市", region: "株洲市天元区", salesmen: 5, stores: 16 },
          { id: "d122", name: "株洲百盛批发", status: "启用", contact: "李老板", phone: "135****6789", location: "湖南省株洲市", region: "株洲市芦淞区", salesmen: 4, stores: 11 },
        ],
      },
      {
        id: "c13",
        name: "湘潭市",
        metric: { dealers: 4, salesmen: 22, stores: 68 },
        dealers: [
          { id: "d131", name: "湘潭万家商贸", status: "启用", contact: "周经理", phone: "134****3456", location: "湖南省湘潭市", region: "湘潭市雨湖区", salesmen: 5, stores: 14 },
        ],
      },
      {
        id: "c14",
        name: "衡阳市",
        metric: { dealers: 6, salesmen: 34, stores: 98 },
        dealers: [
          { id: "d141", name: "衡阳恒隆贸易", status: "启用", contact: "赵经理", phone: "133****4567", location: "湖南省衡阳市", region: "衡阳市雁峰区", salesmen: 6, stores: 17 },
        ],
      },
      {
        id: "c15",
        name: "岳阳市",
        metric: { dealers: 5, salesmen: 27, stores: 88 },
        dealers: [
          { id: "d151", name: "岳阳楼商贸有限公司", status: "启用", contact: "孙经理", phone: "132****5678", location: "湖南省岳阳市", region: "岳阳市岳阳楼区", salesmen: 5, stores: 15 },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "湖北省",
    metric: { dealers: 22, salesmen: 134, stores: 396 },
    cities: [
      {
        id: "c21",
        name: "武汉市",
        metric: { dealers: 10, salesmen: 62, stores: 180 },
        dealers: [
          { id: "d211", name: "武汉江城商贸有限公司", status: "启用", contact: "胡经理", phone: "131****1122", location: "湖北省武汉市", region: "武汉市江汉区", salesmen: 8, stores: 22 },
          { id: "d212", name: "武汉盛世批发", status: "启用", contact: "吴老板", phone: "130****3344", location: "湖北省武汉市", region: "武汉市武昌区", salesmen: 6, stores: 18 },
        ],
      },
      {
        id: "c22",
        name: "宜昌市",
        metric: { dealers: 6, salesmen: 38, stores: 112 },
        dealers: [
          { id: "d221", name: "宜昌三峡商贸", status: "启用", contact: "郑经理", phone: "139****5566", location: "湖北省宜昌市", region: "宜昌市西陵区", salesmen: 5, stores: 15 },
        ],
      },
    ],
  },
  {
    id: "p3",
    name: "广东省",
    metric: { dealers: 35, salesmen: 201, stores: 623 },
    cities: [
      {
        id: "c31",
        name: "广州市",
        metric: { dealers: 15, salesmen: 92, stores: 280 },
        dealers: [
          { id: "d311", name: "广州盈丰贸易有限公司", status: "启用", contact: "何经理", phone: "138****7788", location: "广东省广州市", region: "广州市天河区", salesmen: 10, stores: 30 },
          { id: "d312", name: "广州兴发批发", status: "禁用", contact: "梁老板", phone: "137****9900", location: "广东省广州市", region: "广州市白云区", salesmen: 7, stores: 20 },
        ],
      },
      {
        id: "c32",
        name: "深圳市",
        metric: { dealers: 12, salesmen: 68, stores: 210 },
        dealers: [
          { id: "d321", name: "深圳鹏程商贸", status: "启用", contact: "黄经理", phone: "136****2233", location: "广东省深圳市", region: "深圳市南山区", salesmen: 9, stores: 26 },
        ],
      },
    ],
  },
  {
    id: "p4",
    name: "江西省",
    metric: { dealers: 18, salesmen: 98, stores: 287 },
    cities: [
      {
        id: "c41",
        name: "南昌市",
        metric: { dealers: 9, salesmen: 52, stores: 150 },
        dealers: [
          { id: "d411", name: "南昌洪城商贸", status: "启用", contact: "熊经理", phone: "135****4455", location: "江西省南昌市", region: "南昌市东湖区", salesmen: 7, stores: 21 },
        ],
      },
      {
        id: "c42",
        name: "赣州市",
        metric: { dealers: 5, salesmen: 26, stores: 78 },
        dealers: [
          { id: "d421", name: "赣州客家商贸", status: "启用", contact: "刘老板", phone: "134****6677", location: "江西省赣州市", region: "赣州市章贡区", salesmen: 5, stores: 14 },
        ],
      },
    ],
  },
  {
    id: "p5",
    name: "四川省",
    metric: { dealers: 25, salesmen: 167, stores: 412 },
    cities: [
      {
        id: "c51",
        name: "成都市",
        metric: { dealers: 14, salesmen: 96, stores: 240 },
        dealers: [
          { id: "d511", name: "成都锦官商贸有限公司", status: "启用", contact: "杨经理", phone: "138****8899", location: "四川省成都市", region: "成都市锦江区", salesmen: 11, stores: 32 },
          { id: "d512", name: "成都天府批发", status: "启用", contact: "罗老板", phone: "137****1010", location: "四川省成都市", region: "成都市武侯区", salesmen: 8, stores: 24 },
        ],
      },
      {
        id: "c52",
        name: "绵阳市",
        metric: { dealers: 6, salesmen: 40, stores: 96 },
        dealers: [
          { id: "d521", name: "绵阳科技城商贸", status: "启用", contact: "邓经理", phone: "136****1212", location: "四川省绵阳市", region: "绵阳市涪城区", salesmen: 5, stores: 16 },
        ],
      },
    ],
  },
]

// 关于我们（原型 about.html）
export const aboutSections = [
  {
    title: "关于迈极炫",
    body: "迈极炫是专注于高品质槟榔产品研发、生产与销售的品牌。我们始终坚持以消费者为核心，致力于为用户提供安全、放心、美味的产品体验。",
  },
  {
    title: "品牌理念",
    body: "传承经典工艺，融合现代技术，打造具有迈极炫特色的槟榔产品。我们相信，每一颗槟榔都承载着对品质的执着追求。",
  },
  {
    title: "产品承诺",
    body: "精选优质原料，严格把控生产工艺。建立完善的质量追溯体系，保障食品安全。持续创新产品口味，满足多样化消费需求。",
  },
  {
    title: "一物一码服务",
    body: "迈极炫推出「一物一码」扫码抽奖活动，消费者购买产品后扫描包装内二维码，即可参与积分兑换、实物奖品等丰富活动。我们希望通过数字化互动，为用户带来更多惊喜与价值。",
  },
  {
    title: "联系我们",
    body: "如您在使用过程中有任何问题，可通过小程序「联系客服」功能与我们取得联系，我们将竭诚为您服务。",
  },
]

// 个人设置（原型 settings.html）
export const settingsInfo = {
  nickname: "微信用户_abc123",
  phone: "138****8888",
}

export const freightFee = "¥6.00"

// 活动规则（原型 rule.html）
export const ruleSections = [
  {
    title: "一、活动时间",
    items: ["本次活动自 2026 年 8 月 27 日 00:00 起至 2026 年 9 月 30 日 23:59 止。"],
  },
  {
    title: "二、参与方式",
    items: [
      "用户在迈极炫线下合作门店购买指定活动商品后，使用微信扫�����装外码即可进入抽奖页面。",
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

// 经销商详情下钻（原型 dealer-detail.html / dealer-sales.html / dealer-stores.html）
export type DealerStat = { activation: number; moving: number; winning: number }

export type DealerSalesman = {
  id: string
  name: string
  status: "在职" | "离职"
  phone: string
  region: string
  stores: number
  createdAt: string
  stat: DealerStat
}

export type DealerStore = {
  id: string
  name: string
  status: "营业中" | "已停业"
  contact: string
  phone: string
  salesman: string
  address: string
  createdAt: string
  stockTotal: number
  stat: DealerStat
}

export type DealerDetail = {
  dealer: SalesDealer
  stat: DealerStat
  salesmen: DealerSalesman[]
  stores: DealerStore[]
}

const SALESMAN_NAMES = ["刘伟", "陈静", "赵磊", "王芳", "李强", "周敏", "孙浩", "吴磊", "郑霞", "黄涛", "徐亮", "朱琳"]
const STORE_SUFFIX = ["旗舰店", "综合店", "便民店", "精品店", "社区店", "中心店", "连锁店", "直营店"]
const STREETS = ["劳动西路 188 号", "韶山中路 66 号", "五一大道 302 号", "芙蓉南路 120 号", "枫林路 45 号", "东风路 77 号"]

function seededRandom(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function hashId(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return Math.abs(h) || 1
}

export function findSalesDealer(id: string): SalesDealer | undefined {
  for (const p of salesProvinces) {
    for (const c of p.cities) {
      const d = c.dealers.find((x) => x.id === id)
      if (d) return d
    }
  }
  return undefined
}

export function getDealerDetail(id: string): DealerDetail | undefined {
  const dealer = findSalesDealer(id)
  if (!dealer) return undefined

  const rand = seededRandom(hashId(id))
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]
  const between = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1))
  const districtBase = dealer.region.replace(/^.*市/, "") || "城区"
  const districts = [districtBase, "天心区", "雨花区", "芙蓉区", "岳麓区", "开福区"]

  // 门店（含库存与激活/动销/中奖），业务员数据由其名下门店汇总
  const salesmen: DealerSalesman[] = Array.from({ length: dealer.salesmen }).map((_, i) => {
    const name = SALESMAN_NAMES[i % SALESMAN_NAMES.length]
    return {
      id: `${id}-s${i + 1}`,
      name,
      status: i === dealer.salesmen - 1 && dealer.salesmen > 2 ? "离职" : "在职",
      phone: `13${between(0, 9)}****${String(between(1000, 9999))}`,
      region: districts[i % districts.length],
      stores: 0,
      createdAt: `2025-0${between(1, 9)}-${String(between(10, 28))} 00:00`,
      stat: { activation: 0, moving: 0, winning: 0 },
    }
  })

  const stores: DealerStore[] = Array.from({ length: dealer.stores }).map((_, i) => {
    const owner = salesmen[i % salesmen.length]
    const district = districts[i % districts.length]
    const activation = between(18, 60)
    const moving = between(12, activation)
    const winning = between(2, Math.max(3, Math.floor(moving / 5)))
    const store: DealerStore = {
      id: `${id}-st${i + 1}`,
      name: `${dealer.contact.replace(/经理|老板/, "")}${dealer.name.slice(2, 4)}·${district}${pick(STORE_SUFFIX)}`,
      status: "营业中",
      contact: `${pick(["刘", "王", "李", "陈", "张"])}店长`,
      phone: `137****${String(between(1000, 9999))}`,
      salesman: owner.name,
      address: `${dealer.location}${district}${pick(STREETS)}`,
      createdAt: `2024-1${between(0, 2)}-${String(between(10, 28))} 00:00`,
      stockTotal: between(30, 80),
      stat: { activation, moving, winning },
    }
    owner.stores += 1
    owner.stat.activation += activation
    owner.stat.moving += moving
    owner.stat.winning += winning
    return store
  })

  const stat = stores.reduce<DealerStat>(
    (acc, s) => ({
      activation: acc.activation + s.stat.activation,
      moving: acc.moving + s.stat.moving,
      winning: acc.winning + s.stat.winning,
    }),
    { activation: 0, moving: 0, winning: 0 },
  )

  return { dealer, stat, salesmen, stores }
}
