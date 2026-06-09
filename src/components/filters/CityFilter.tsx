import { useMemo, useState } from 'react'
import { useFilterStore } from '../../store/useFilterStore'
import { useDataStore } from '../../store/useDataStore'

export function CityFilter() {
  const selectedCities = useFilterStore((s) => s.selectedCities)
  const selectedProvinces = useFilterStore((s) => s.selectedProvinces)
  const toggleCity = useFilterStore((s) => s.toggleCity)
  const rawData = useDataStore((s) => s.rawData)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)

  const cities = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const r of rawData) {
      // 如果选了省份，只显示该省份下的城市
      if (selectedProvinces.length > 0 && !selectedProvinces.includes(r.p)) continue
      counts[r.c] = (counts[r.c] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [rawData, selectedProvinces])

  const filtered = search
    ? cities.filter(([c]) => c.includes(search))
    : cities

  const visible = expanded ? filtered : filtered.slice(0, 5)

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-1 cursor-pointer w-full text-left"
      >
        城市 ({selectedCities.length || '全部'})
        <span className="text-xs text-slate-400">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索城市..."
          className="w-full px-2 py-1 text-xs border border-slate-200 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      )}
      <div className="space-y-0.5 max-h-48 overflow-y-auto">
        {visible.map(([city, count]) => (
          <label
            key={city}
            className="flex items-center gap-2 px-1 py-0.5 rounded hover:bg-slate-50 cursor-pointer text-xs"
          >
            <input
              type="checkbox"
              checked={selectedCities.includes(city)}
              onChange={() => toggleCity(city)}
              className="rounded border-slate-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-slate-700 flex-1 truncate">{city}</span>
            <span className="text-slate-400 tabular-nums">{count}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
