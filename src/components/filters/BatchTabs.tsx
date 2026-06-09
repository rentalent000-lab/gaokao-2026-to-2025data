import { useFilterStore } from '../../store/useFilterStore'
import { useDataStore } from '../../store/useDataStore'
import { BATCHES } from '../../data/constants'

export function BatchTabs() {
  const activeBatch = useFilterStore((s) => s.activeBatch)
  const setActiveBatch = useFilterStore((s) => s.setActiveBatch)
  const rawData = useDataStore((s) => s.rawData)
  const kelei = useFilterStore((s) => s.kelei)

  // 统计每个批次的记录数
  const batchCounts: Record<string, number> = {}
  if (rawData.length > 0) {
    for (const row of rawData) {
      const b = row.b
      batchCounts[b] = (batchCounts[b] || 0) + 1
    }
  }

  // 只显示有数据的批次
  const visibleBatches = BATCHES.filter((b) => {
    if (rawData.length === 0) return true // 数据未加载时显示所有
    return (batchCounts[b] || 0) > 0
  })

  if (!kelei) return null

  return (
    <div className="border-b border-slate-200 bg-white overflow-x-auto">
      <div className="flex gap-0 px-4 sm:px-6 min-w-max">
        {visibleBatches.map((batch) => {
          const active = activeBatch === batch
          const count = batchCounts[batch]

          return (
            <button
              key={batch}
              onClick={() => setActiveBatch(batch)}
              className={`relative px-4 py-3 text-sm font-medium transition-all cursor-pointer whitespace-nowrap
                ${active
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-slate-500 hover:text-slate-700 border-b-2 border-transparent'
                }`}
            >
              {batch}
              {count !== undefined && (
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  active ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {count.toLocaleString('zh-CN')}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
