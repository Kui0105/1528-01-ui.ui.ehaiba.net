// 经销 / 推广 / 内容类页面数据（原型 dealer / promote / settings 等子页面）

// —— 富文本内容页（用户协议 / 隐私政策 / 积分规则）——
export type ContentSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export const agreementSections: ContentSection[] = [
  {
    title: "一、协议范围",
    paragraphs: [
      "本协议是您与迈极炫平台之间就使用本平台服务所订立的协议。您在使用本平台服务前，应当仔细阅读并充分理解本协议全部内容。",
    ],
  },
  {
    title: "二、账号注册与安全",
    paragraphs: [
      "您确认，在您开始注册程序使用本平台服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。",
    ],
  },
  {
    title: "三、用户行为规范",
    paragraphs: [
      "您在使用本平台服务过程中，应当遵守中华人民共和国法律法规、社会公德和公序良俗，不得利用本平台服务从事违法违规行为。",
    ],
  },
  {
    title: "四、积分与兑换规则",
    paragraphs: [
      "用户通过参与活动获得的积分，可用于在积分商城兑换商品。积分不可转让、不可提现，兑换商品时须遵守平台公示的兑换规则。",
    ],
  },
  {
    title: "五、协议的变更与终止",
    paragraphs: [
      "迈极炫平台可根据国家法律法规变化及维护交易秩序、保护消费者权益需要，不时修改本协议。修改后的协议将在本平台公示，公示后即生效。",
    ],
  },
  {
    title: "六、其他",
    paragraphs: [
      "本协议内容同时包括平台已经发布或将来可能发布的各类规则、规范。所有规则为本协议不可分割的组成部分，与本协议正文具有同等法律效力。",
    ],
  },
]

export const privacySections: ContentSection[] = [
  {
    title: "一、引言",
    paragraphs: [
      "迈极炫平台重视您的隐私保护。本隐私政策将帮助您了解我们如何收集、使用、存储和保护您的个人信息，以及您享有的相关权利。",
    ],
  },
  {
    title: "二、信息收集",
    paragraphs: [
      "我们可能收集的信息包括：您提供的信息（如昵称、头像、手机号）、您使用服务过程中产生的信息（如设备信息、日志信息、位置信息）以及通过合法途径获得的第三方信息。",
    ],
  },
  {
    title: "三、信息使用",
    paragraphs: [
      "我们严格遵守法律法规的规定及与您的约定，将收集的信息用于以下用途：向您提供服务、满足您的个性化需求、产品开发和服务优化、安全保障、向您推荐可能感兴趣的内容等。",
    ],
  },
  {
    title: "四、信息共享与披露",
    paragraphs: [
      "未经您同意，我们不会向第三方共享、转让您的个人信息，但法律法规另有规定或政府机关依法要求的除外。我们会与第三方合作伙伴签署保密协议，要求其按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。",
    ],
  },
  {
    title: "五、信息存储与保护",
    paragraphs: [
      "我们采取符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权的访问、公开披露、使用、修改、损坏或丢失。",
    ],
  },
  {
    title: "六、您的权利",
    paragraphs: [
      "按照中国相关的法律、法规、标准，您有权访问、更正、删除您的个人信息，改变您授权同意的范围或撤回授权，以及注销您的账号。",
    ],
  },
]

export const pointsRuleSections: ContentSection[] = [
  { title: "", paragraphs: ["欢迎您使用迈极炫会员积分服务。为保障您的权益，请在使用前仔细阅读以下规则。"] },
  {
    title: "一、积分获取",
    items: [
      "用户通过扫描迈极炫产品包装内袋二维码（一物一码），验证成功后可获得随机积分奖励。",
      "同一验证码仅限使用一次，重复扫码不会重复获得积分。",
      "积分将实时发放至您的会员账户，可在「积分明细」中查看。",
    ],
  },
  {
    title: "二、积分使用",
    items: [
      "积分可在积分商城兑换指定商品，兑换时按商品标注积分值进行扣减。",
      "积分不可兑换现金、不可转让、不可提现。",
      "兑换商品如需物流配送，用户需自行支付运费；运费金额以订单提交页为准。",
    ],
  },
  {
    title: "三、积分退回",
    items: [
      "订单在未支付状态下取消，积分不予扣减。",
      "订单在支付成功后取消，已扣减积分将在订单取消后自动退回账户。",
      "退货退款完成后，对应积分将在处理完成后退回账户。",
    ],
  },
  {
    title: "四、积分有效期",
    items: ["积分有效期为获取之日起 12 个自然月，过期未使用将自动清零。", "积分使用时优先扣除较早获取的积分。"],
  },
  {
    title: "五、其他说明",
    items: [
      "如发现通过不正当手段获取积分，平台有权扣除相应积分并保留追究法律责任的权利。",
      "本规则由迈极炫运营方制定并保留最终解释权。",
      "规则内容如有调整，将以最新公示为准。",
    ],
  },
]

// —— 物流信息（原型 logistics.html）——
export type LogisticsNode = {
  time: string
  desc: string
}

export const logisticsInfo = {
  company: "圆通速递",
  trackingNo: "YT1234567890123",
  nodes: [
    { time: "2026-08-27 09:30", desc: "【广州市】快件已到达 广州天河转运中心" },
    { time: "2026-08-27 06:15", desc: "【广州市】快件已从 广州白云转运中心 发出" },
    { time: "2026-08-26 20:40", desc: "【深圳市】快件已揽收" },
    { time: "2026-08-26 18:40", desc: "商家已发货，等待快递员揽收" },
  ] as LogisticsNode[],
}

// —— 门店（原型 store.html / activate.html）——
export type StoreItem = {
  id: string
  name: string
  status: "启用" | "停用"
  address: string
  owner: string
  phone: string
  activated: number
  salesman: string
}

export const stores: StoreItem[] = [
  { id: "s1", name: "湘江东路店", status: "启用", address: "长沙市天心区湘江东路 88 号", owner: "王建国", phone: "138****6688", activated: 88, salesman: "刘伟" },
  { id: "s2", name: "五一广场店", status: "启用", address: "长沙市芙蓉区五一大道 168 号", owner: "李慧敏", phone: "139****7766", activated: 168, salesman: "陈静" },
  { id: "s3", name: "岳麓山北店", status: "启用", address: "长沙市岳麓区麓山南路 66 号", owner: "陈志强", phone: "137****5522", activated: 66, salesman: "张三" },
  { id: "s4", name: "开福万达店", status: "启用", address: "长沙市开福区万达广场 1 楼", owner: "赵敏", phone: "136****3399", activated: 420, salesman: "李四" },
  { id: "s5", name: "雨花德思勤店", status: "停用", address: "长沙市雨花区德思勤广场 B 座", owner: "刘洋", phone: "135****1122", activated: 178, salesman: "王五" },
]

// 业务员候选（门店编辑-业务员选择）
export const salesmanOptions = ["刘伟", "陈静", "张三", "李四", "王五", "赵敏"] as const

export const storeStock = [
  { name: "迈极炫冰爽槟榔 20元装", stock: 320, unit: "条" },
  { name: "迈极炫冰爽槟榔 50元装", stock: 186, unit: "条" },
  { name: "迈极炫至��槟榔 100元装", stock: 92, unit: "条" },
  { name: "迈极炫经典槟榔礼盒", stock: 48, unit: "盒" },
]

export const storeSalesOrders = [
  { no: "XS20260903008", product: "迈极炫冰爽槟榔 20元装", qty: 12, date: "2026-09-03" },
  { no: "XS20260902015", product: "迈极炫至尊槟榔 100元装", qty: 3, date: "2026-09-02" },
  { no: "XS20260901022", product: "迈极炫冰爽槟榔 50元装", qty: 8, date: "2026-09-01" },
  { no: "XS20260831006", product: "迈极炫经典槟榔礼盒", qty: 5, date: "2026-08-31" },
  ]

  // —— 门店库存明细（原型 store-stock.html）——
  export const storeStockTabs = ["全部", "20元系列", "50元系列", "100元系列"] as const

  export type StoreStockItem = {
  id: string
  name: string
  series: string
  spec: string
  stock: number
  unit: string
  }

  export const storeStockItems: StoreStockItem[] = [
  { id: "ss1", name: "迈极炫槟榔 20元装", series: "20元系列", spec: "12颗/袋", stock: 18, unit: "件" },
  { id: "ss2", name: "迈极炫槟榔 50元装", series: "50元系列", spec: "15颗/袋", stock: 8, unit: "件" },
  { id: "ss3", name: "迈极炫槟榔 100元装", series: "100元系列", spec: "20颗/袋", stock: 5, unit: "件" },
  { id: "ss4", name: "迈极炫定制打火机", series: "100元系列", spec: "金属/防风", stock: 20, unit: "件" },
  { id: "ss5", name: "品牌毛巾套装", series: "50元系列", spec: "3条装", stock: 5, unit: "件" },
  { id: "ss6", name: "迈极炫礼盒套装", series: "100元系列", spec: "100元系列专属", stock: 3, unit: "件" },
  ]

  // —— 门店变动记录（原型 store-logs.html）——
  export type StoreChangeLog = {
  id: string
  title: string
  type: "新增/激活产品" | "兑奖核销" | "产品回收"
  date: string
  }

  export const storeChangeLogs: StoreChangeLog[] = [
  { id: "log1", title: "迈极炫槟榔 50元装", type: "新增/激活产品", date: "2026-08-27 14:32" },
  { id: "log2", title: "迈极炫槟榔 30元装", type: "新增/激活产品", date: "2026-08-27 11:18" },
  { id: "log3", title: "加5元兑换50元迈极炫槟榔一包", type: "兑奖核销", date: "2026-08-26 17:05" },
  { id: "log4", title: "迈极炫槟榔 50元装", type: "产品回收", date: "2026-08-26 09:40" },
  { id: "log5", title: "迈极炫定制打火机", type: "新增/激活产品", date: "2026-08-25 16:22" },
  { id: "log6", title: "100积分兑换券", type: "兑奖核销", date: "2026-08-25 10:11" },
  ]

// —— 产品库存（原型 product-stock.html）——
export const stockTabs = ["全部", "20元系列", "50元系列", "100元系列"] as const

export type StockItem = {
  id: string
  name: string
  series: string
  spec: string
  stock: number
  image: string
}

export const stockItems: StockItem[] = [
  { id: "k1", name: "迈极炫冰爽槟榔 20元装", series: "20元系列", spec: "12包/条", stock: 1860, image: "/products/box-20.png" },
  { id: "k2", name: "迈极炫冰爽槟榔 50元装", series: "50元系列", spec: "15包/条", stock: 980, image: "/products/box-50.png" },
  { id: "k3", name: "迈极炫至尊槟榔 100元装", series: "100元系列", spec: "20包/条", stock: 420, image: "/products/box-100.png" },
  { id: "k4", name: "迈极炫经典槟榔礼盒", series: "50元系列", spec: "礼盒/装", stock: 520, image: "/products/gift-box.png" },
  { id: "k5", name: "迈极炫醒神槟榔", series: "20元系列", spec: "3包装", stock: 240, image: "/products/box-20.png" },
  { id: "k6", name: "迈极炫定制礼品袋", series: "100元系列", spec: "100个/箱", stock: 160, image: "/products/canvas-bag.png" },
]

// —— 业务管理（原型 business-manage.html）——
export const businessTabs = ["今日", "昨日", "本周", "本月"] as const

export type Salesman = {
  id: string
  name: string
  status: "在职" | "离职"
  phone: string
  stores: number
  joinDate: string
  active: number
  recycle: number
  prize: number
}

export const salesmen: Salesman[] = [
  { id: "b1", name: "张三", status: "在职", phone: "138****6688", stores: 12, joinDate: "2024-03-15", active: 37, recycle: 26, prize: 17 },
  { id: "b2", name: "李四", status: "在职", phone: "139****7766", stores: 8, joinDate: "2024-05-22", active: 54, recycle: 38, prize: 24 },
  { id: "b3", name: "王五", status: "离职", phone: "137****5522", stores: 5, joinDate: "2023-11-08", active: 71, recycle: 50, prize: 32 },
  { id: "b4", name: "赵六", status: "在职", phone: "136****3399", stores: 7, joinDate: "2024-06-30", active: 88, recycle: 62, prize: 40 },
]

// —— 兑奖明细（原型 prize-detail.html）——
export const prizeStatusTabs = ["全部状态", "待核销", "已核销"] as const

export type PrizeRecord = {
  id: string
  no: string
  status: "待核销" | "已核销"
  batch: string
  codeId: string
  prize: string
  salesman: string
  store: string
  time: string
}

export const prizeRecords: PrizeRecord[] = [
  { id: "pz1", no: "PC202608000", status: "待核销", batch: "第1批次", codeId: "JD4B2907E5C3A", prize: "加5元兑换50元迈极炫槟榔一包", salesman: "刘伟", store: "湘江东路店", time: "2026-08-25 09:23" },
  { id: "pz2", no: "PC202608001", status: "已核销", batch: "第2批次", codeId: "J2907E5C3A18F", prize: "加5元兑换50元迈极炫槟榔一包", salesman: "陈静", store: "五一广场店", time: "2026-08-22 10:10" },
  { id: "pz3", no: "PC202608002", status: "待核销", batch: "第3批次", codeId: "J7E5C3A18F6D4", prize: "加5元兑换50元迈极炫槟榔一包", salesman: "张三", store: "岳麓山北店", time: "2026-08-27 11:47" },
  { id: "pz4", no: "PC202608003", status: "已核销", batch: "第4批次", codeId: "J5C3A18F6D4B2", prize: "加5元兑换50元迈极炫槟榔一包", salesman: "赵敏", store: "开福万达店", time: "2026-08-20 16:32" },
]

// —— 销售明细（原型 sales-detail.html）——
export const saleStatusTabs = ["全部状态", "已激活", "待兑奖", "待核销", "已完成"] as const

export type SaleRecord = {
  id: string
  no: string
  status: "已激活" | "待兑奖" | "待核销" | "已完成"
  batch: string
  codeId: string
  expire: string
  store: string
  salesman: string
  product: string
  time: string
}

export const saleRecords: SaleRecord[] = [
  { id: "sd1", no: "PC20260827001", status: "已激活", batch: "第1批次", codeId: "JM000001", expire: "2027-08-27", store: "湘江东路店", salesman: "刘伟", product: "迈极炫槟榔 20元装", time: "2026-08-27 08:00" },
  { id: "sd2", no: "PC20260827002", status: "待兑奖", batch: "第2批次", codeId: "JM000002", expire: "2027-08-27", store: "五一广场店", salesman: "陈静", product: "迈极炫槟榔 50元装", time: "2026-08-27 09:07" },
  { id: "sd3", no: "PC20260827003", status: "待核销", batch: "第3批次", codeId: "JM000003", expire: "2027-08-27", store: "岳麓山北店", salesman: "张三", product: "迈极炫槟榔 100元装", time: "2026-08-27 10:14" },
  { id: "sd4", no: "PC20260827004", status: "已完成", batch: "第4批次", codeId: "JM000004", expire: "2027-08-26", store: "开福万达店", salesman: "李四", product: "迈极炫槟榔 20元装", time: "2026-08-26 15:20" },
]

// —— 进货商城 / 进货订单（原型 purchase-mall.html / purchase-orders.html）——
export const purchaseTabs = ["全部", "20元系列", "50元系列", "100元系列"] as const

export type PurchaseProduct = {
  id: string
  name: string
  series: string
  price: number
  spec: string
  image: string
}

export const purchaseProducts: PurchaseProduct[] = [
  { id: "pp1", name: "迈极炫冰爽槟榔 20元装", series: "20元系列", price: 16, spec: "15包/条", image: "/products/box-20.png" },
  { id: "pp2", name: "迈极炫冰爽槟榔 50元装", series: "50元系列", price: 42, spec: "12包/条", image: "/products/box-50.png" },
  { id: "pp3", name: "迈极炫至尊槟榔 100元装", series: "100元系列", price: 88, spec: "10包/条", image: "/products/box-100.png" },
  { id: "pp4", name: "迈极炫经典槟榔礼盒", series: "50元系列", price: 168, spec: "1盒/箱", image: "/products/gift-box.png" },
]

export const purchaseOrderTabs = ["全部", "待入库", "已入库", "已驳回", "已取消"] as const

export type PurchaseOrder = {
  id: string
  no: string
  status: "待入库" | "已入库" | "已驳回" | "已取消"
  name: string
  image: string
  spec: string
  price: number
  qty: number
  total: number
  rejectReason?: string
}

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po1", no: "JH202608260012", status: "待入库", name: "迈极炫冰爽槟榔 50元装", image: "/products/box-50.png", spec: "15包/条", price: 42, qty: 300, total: 12600 },
  { id: "po2", no: "JH202608240008", status: "已入库", name: "迈极炫至尊槟榔 100元装", image: "/products/box-100.png", spec: "10包/条", price: 86, qty: 120, total: 10320 },
  { id: "po3", no: "JH202608220005", status: "已入库", name: "迈极炫冰爽槟榔 20元装", image: "/products/box-20.png", spec: "15包/条", price: 16, qty: 500, total: 8000 },
  { id: "po4", no: "JH202608180003", status: "已驳回", name: "迈极炫经典槟榔礼盒", image: "/products/gift-box.png", spec: "1盒/箱", price: 96, qty: 60, total: 5760, rejectReason: "进货数量超过当月配额，请调整数量后重新提交。" },
]

// —— 物料商城 / 物料订单（原型 dealer-material-mall.html / dealer-material-orders.html）——
export const materialTabs = ["全部", "陈列物料", "宣传物料", "促销礼品"] as const

export type MaterialProduct = {
  id: string
  name: string
  category: string
  points: number
  stock: number
  unit: string
  image: string
}

export const materialProducts: MaterialProduct[] = [
  { id: "mt1", name: "门店台面展示架", category: "陈列物料", points: 1200, stock: 36, unit: "个", image: "/material/stand.png" },
  { id: "mt2", name: "品牌宣传海报", category: "宣传物料", points: 860, stock: 120, unit: "张", image: "/material/poster.png" },
  { id: "mt3", name: "产品宣传单页", category: "宣传物料", points: 120, stock: 800, unit: "份", image: "/material/flyer.png" },
  { id: "mt4", name: "促销广播喇叭", category: "促销礼品", points: 420, stock: 64, unit: "个", image: "/material/horn.png" },
  { id: "mt5", name: "品牌定制遮阳伞", category: "促销礼品", points: 1500, stock: 50, unit: "把", image: "/material/umbrella.png" },
  { id: "mt6", name: "定制纸杯套装", category: "促销礼品", points: 980, stock: 88, unit: "套", image: "/material/cup.png" },
  { id: "mt7", name: "品牌钥匙扣挂件", category: "促销礼品", points: 260, stock: 200, unit: "个", image: "/material/keychain.png" },
]

export const materialOrderTabs = ["全部", "待付款", "待发货", "待收货", "已完成", "已关闭"] as const

export type MaterialOrder = {
  id: string
  no: string
  status: "待付款" | "待发货" | "待收货" | "已完成" | "已关闭"
  name: string
  image: string
  points: number
  qty: number
  total: number
  freight: string
  orderTime: string
}

export const materialOrders: MaterialOrder[] = [
  { id: "mo1", no: "WL20260903001", status: "待付款", name: "门店台面展示架", image: "/material/stand.png", points: 1200, qty: 2, total: 2400, freight: "¥6.00", orderTime: "2026-09-03" },
  { id: "mo2", no: "WL20260901005", status: "待发货", name: "品牌钥匙扣挂件", image: "/material/keychain.png", points: 260, qty: 10, total: 2600, freight: "¥6.00", orderTime: "2026-09-01" },
  { id: "mo3", no: "WL20260829003", status: "待收货", name: "定制纸杯套装", image: "/material/cup.png", points: 80, qty: 5, total: 400, freight: "¥6.00", orderTime: "2026-08-29" },
  { id: "mo4", no: "WL20260825007", status: "待收货", name: "门店灯箱海报", image: "/material/poster.png", points: 860, qty: 2, total: 1720, freight: "¥6.00", orderTime: "2026-08-25" },
  { id: "mo5", no: "WL20260821005", status: "已完成", name: "定制保温杯", image: "/material/cup.png", points: 980, qty: 2, total: 1960, freight: "¥6.00", orderTime: "2026-08-21" },
  { id: "mo6", no: "WL20260818002", status: "已关闭", name: "促销礼品袋", image: "/material/bag.png", points: 80, qty: 5, total: 400, freight: "¥6.00", orderTime: "2026-08-18" },
]

// —— 经销商积分明细（原型 dealer-points-detail.html）——
export const dealerPointsBalance = "12,860"
export const dealerPointsTabs = ["全部", "收入", "支出"] as const

export type DealerPointsRecord = {
  id: string
  title: string
  time: string
  amount: number
  balance: number
}

export const dealerPointsRecords: DealerPointsRecord[] = [
  { id: "dp1", title: "兑换物料：门店台面展示架 x2", time: "2026-09-02 15:20", amount: -1200, balance: 12860 },
  { id: "dp2", title: "进货返积分：50元系列", time: "2026-09-01 10:05", amount: 5000, balance: 14060 },
  { id: "dp3", title: "动销激励奖励", time: "2026-08-31 16:42", amount: 420, balance: 9060 },
  { id: "dp4", title: "兑换物料：促销广播喇叭", time: "2026-08-29 11:18", amount: -400, balance: 8640 },
  { id: "dp5", title: "进货返积分：20元系列", time: "2026-08-27 09:30", amount: 3000, balance: 9040 },
  { id: "dp6", title: "兑换物料：品牌定制遮阳伞 x2", time: "2026-08-25 14:55", amount: -1720, balance: 6040 },
  { id: "dp7", title: "月度动销激励", time: "2026-08-23 17:02", amount: 260, balance: 7760 },
]

// —— 业务员积分明细（原型 salesman-points-detail.html）——
export const salesmanPointsBalance = "8,600"

export type SalesmanPointsRecord = {
  id: string
  title: string
  time: string
  amount: number
  balance: number
}

export const salesmanPointsRecords: SalesmanPointsRecord[] = [
  { id: "sp1", title: "产品激活奖励", time: "2026-09-20 15:20:11", amount: 500, balance: 8600 },
  { id: "sp2", title: "兑奖核销奖励", time: "2026-09-20 09:12:33", amount: 300, balance: 8100 },
  { id: "sp3", title: "门店铺货激励", time: "2026-09-19 17:42:08", amount: 800, balance: 7800 },
  { id: "sp4", title: "产品激活奖励", time: "2026-09-18 11:06:52", amount: 600, balance: 7000 },
  { id: "sp5", title: "月度达标奖励", time: "2026-09-17 16:31:20", amount: 1200, balance: 6400 },
  { id: "sp6", title: "兑奖核销奖励", time: "2026-09-15 10:48:07", amount: 400, balance: 5200 },
  { id: "sp7", title: "门店铺货激励", time: "2026-09-14 14:05:39", amount: 900, balance: 4800 },
  { id: "sp8", title: "新店开发奖励", time: "2026-09-08 09:55:14", amount: 1500, balance: 3900 },
]

// —— 产品明细（原型 product-detail.html：激活流水）——
export type ActivationRecord = {
  id: string
  store: string
  spec: string
  status: "已激活"
  time: string
}

export const activationRecords: ActivationRecord[] = [
  { id: "ar1", store: "湘江东路店", spec: "冰爽·50元装 15包/条", status: "已激活", time: "2026-08-27 10:23:18" },
  { id: "ar2", store: "五一广场店", spec: "冰爽·50元装 15包/条", status: "已激活", time: "2026-08-27 09:45:06" },
  { id: "ar3", store: "岳麓山北店", spec: "至尊·100元装 10包/条", status: "已激活", time: "2026-08-26 16:30:22" },
  { id: "ar4", store: "开福万达店", spec: "冰爽·50元装 15包/条", status: "已激活", time: "2026-08-26 14:12:55" },
  { id: "ar5", store: "湘江东路店", spec: "经典礼盒装", status: "已激活", time: "2026-08-26 11:08:37" },
  { id: "ar6", store: "五一广场店", spec: "冰爽·50元装 15包/条", status: "已激活", time: "2026-08-25 17:20:09" },
  { id: "ar7", store: "雨花德思勤店", spec: "至尊·100元装 10包/条", status: "已激活", time: "2026-08-25 10:05:41" },
]
