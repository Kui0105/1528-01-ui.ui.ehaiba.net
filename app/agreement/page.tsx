import { ContentScreen } from "@/components/points-mall/content-screen"
import { agreementSections } from "@/lib/dealer-data"

export default function Page() {
  return <ContentScreen title="用户协议" heading="迈极炫用户服务协议" sections={agreementSections} footer="迈极炫运营方 · 版权所有" />
}
