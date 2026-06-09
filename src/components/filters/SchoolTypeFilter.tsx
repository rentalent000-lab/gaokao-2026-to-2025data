import { useMemo, useState } from 'react'
import { useFilterStore } from '../../store/useFilterStore'
import { useDataStore } from '../../store/useDataStore'

export function SchoolTypeFilter() {
  const selected = useFilterStore((s) => s.selectedSchoolTypes)
  const toggle = useFilterStore((s) => s.toggleSchoolType)
  const rawData = useDataStore((s) => s.rawData)
  const [expanded, setExpanded] = useState(false)

  const types = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const r of rawData) {
      counts[r.st] = (counts[r.st] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [rawData])

  const visible = expanded ? types : types.slice(0, 6)

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-1 cursor-pointer w-full text-left"
      >
        学校类型 ({selected.length || '全部'})
        <span className="text-xs text-slate-400">{expanded ? '▲' : '▼'}</span>
      </button>
      <div className="flex flex-wrap gap-1.5">
        {visible.map(([t, count]) => {
          const active = selected.includes(t)
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`text-xs px-2 py-1 rounded-md border transition-all cursor-pointer
                ${active
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
            >
              {t} <span className="opacity-60">{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
