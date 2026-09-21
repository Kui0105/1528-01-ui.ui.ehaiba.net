import { ScanFlowScreen } from "@/components/points-mall/scan-flow-screen"

export default function RecyclePage() {
  return (
    <ScanFlowScreen
      title="产品回收"
      hint="扫描产品外包装二维码，可将未售出或需退回的产品进行回收登记，回收后产品状态将更新为已回收。"
      scanTip="将产品外包装二维码放入框内"
      successTitle="回收成功"
      successDesc="该产品已登记回收，库存已同步更新"
      buttonText="扫码回收"
    />
  )
}
