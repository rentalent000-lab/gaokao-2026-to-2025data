import { useMemo, useState } from 'react'
import { useFilterStore } from '../../store/useFilterStore'
import { useDataStore } from '../../store/useDataStore'

export function ProvinceFilter() {
  const selectedProvinces = useFilterStore((s) => s.selectedProvinces)
  const toggleProvince = useFilterStore((s) => s.toggleProvince)
  const rawData = useDataStore((s) => s.rawData)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)

  const provinces = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const r of rawData) {
      counts[r.p] = (counts[r.p] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [rawData])

  const filtered = search
    ? provinces.filter(([p]) => p.includes(search))
    : provinces

  const visible = expanded ? filtered : filtered.slice(0, 5)

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-1 cursor-pointer w-full text-left"
      >
        省份 ({selectedProvinces.length || '全部'})
        <span className="text-xs text-slate-400">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索省份..."
          className="w-full px-2 py-1 text-xs border border-slate-200 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      )}
      <div className="space-y-0.5 max-h-48 overflow-y-auto">
        {visible.map(([prov, count]) => (
          <label
            key={prov}
            className="flex items-center gap-2 px-1 py-0.5 rounded hover:bg-slate-50 cursor-pointer text-xs"
          >
            <input
              type="checkbox"
              checked={selectedProvinces.includes(prov)}
              onChange={() => toggleProvince(prov)}
              className="rounded border-slate-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-slate-700 flex-1 truncate">{prov}</span>
            <span className="text-slate-400 tabular-nums">{count}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
