import { ContentScreen } from "@/components/points-mall/content-screen"
import { pointsRuleSections } from "@/lib/dealer-data"

export default function Page() {
  return <ContentScreen title="积分规则" heading="积分使用规则" sections={pointsRuleSections} footer="最终解释权归迈极炫运营方所有" />
}
