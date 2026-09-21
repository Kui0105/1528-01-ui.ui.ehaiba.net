import { GoodsDetailScreen } from "@/components/points-mall/goods-detail-screen"

export default async function GoodsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <GoodsDetailScreen id={Number(id)} />
}
