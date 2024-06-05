import { DataGrid } from '@/components/data-grid'
import { DataCharts } from '@/components/data-charts'

export default function Home() {
  return (
    <main className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <DataGrid />
      <DataCharts />
    </main>
  )
}
