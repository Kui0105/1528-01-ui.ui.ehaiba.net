import { ContentScreen } from "@/components/points-mall/content-screen"
import { privacySections } from "@/lib/dealer-data"

export default function Page() {
  return <ContentScreen title="隐私政策" heading="迈极炫隐私政策" sections={privacySections} footer="迈极炫运营方 · 版权所有" />
}
