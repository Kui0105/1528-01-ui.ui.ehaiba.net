import { ScanFlowScreen } from "@/components/points-mall/scan-flow-screen"

export default function VerifyPrizePage() {
  return (
    <ScanFlowScreen
      title="兑奖核销"
      hint="扫描消费者出示的中奖二维码，核销后奖品即视为已发放，同一奖品仅可核销一次。"
      scanTip="将消费者中奖二维码放入框内"
      successTitle="核销成功"
      successDesc="奖品已核销，可继续核销下一笔"
      buttonText="扫码核销"
    />
  )
}
