// 精简版全国行政区划三级联动数据（省 / 市 / 区县）
// 覆盖常用省市，用于收货地址选择演示

export type District = string
export type City = { name: string; districts: District[] }
export type Province = { name: string; cities: City[] }

export const chinaRegions: Province[] = [
  {
    name: "湖南省",
    cities: [
      { name: "长沙市", districts: ["天心区", "芙蓉区", "岳麓区", "开福区", "雨花区", "望城区", "长沙县", "浏阳市", "宁乡市"] },
      { name: "株洲市", districts: ["天元区", "荷塘区", "芦淞区", "石峰区", "醴陵市", "攸县"] },
      { name: "湘潭市", districts: ["雨湖区", "岳塘区", "湘乡市", "韶山市"] },
      { name: "衡阳市", districts: ["雁峰区", "石鼓区", "珠晖区", "蒸湘区", "耒阳市"] },
      { name: "岳阳市", districts: ["岳阳楼区", "云溪区", "君山区", "汨罗市", "临湘市"] },
      { name: "常德市", districts: ["武陵区", "鼎城区", "津市市", "澧县"] },
    ],
  },
  {
    name: "广东省",
    cities: [
      { name: "广州市", districts: ["天河区", "越秀区", "海珠区", "荔湾区", "白云区", "番禺区", "黄埔区"] },
      { name: "深圳市", districts: ["福田区", "罗湖区", "南山区", "宝安区", "龙岗区", "龙华区"] },
      { name: "东莞市", districts: ["莞城街道", "南城街道", "东城街道", "长安镇", "虎门镇"] },
      { name: "佛山市", districts: ["禅城区", "南海区", "顺德区", "高明区", "三水区"] },
    ],
  },
  {
    name: "浙江省",
    cities: [
      { name: "杭州市", districts: ["上城区", "拱墅区", "西湖区", "滨江区", "余杭区", "萧山区"] },
      { name: "宁波市", districts: ["海曙区", "江北区", "鄞州区", "镇海区", "北仑区"] },
      { name: "温州市", districts: ["鹿城区", "龙湾区", "瓯海区", "瑞安市", "乐清市"] },
    ],
  },
  {
    name: "江苏省",
    cities: [
      { name: "南京市", districts: ["玄武区", "秦淮区", "鼓楼区", "建邺区", "江宁区", "浦口区"] },
      { name: "苏州市", districts: ["姑苏区", "虎丘区", "吴中区", "相城区", "昆山市"] },
      { name: "无锡市", districts: ["梁溪区", "锡山区", "惠山区", "滨湖区", "江阴市"] },
    ],
  },
  {
    name: "北京市",
    cities: [{ name: "北京市", districts: ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "通州区"] }],
  },
  {
    name: "上海市",
    cities: [{ name: "上海市", districts: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "浦东新区", "闵行区"] }],
  },
]
