import { useState, useEffect } from 'react'
import { useFilterStore } from '../../store/useFilterStore'

export function BaoyanFilter() {
  const baoyanMin = useFilterStore((s) => s.baoyanMin)
  const baoyanMax = useFilterStore((s) => s.baoyanMax)
  const setBaoyanRange = useFilterStore((s) => s.setBaoyanRange)

  const [localMin, setLocalMin] = useState(baoyanMin ?? 0)
  const [localMax, setLocalMax] = useState(baoyanMax ?? 60)

  useEffect(() => {
    setLocalMin(baoyanMin ?? 0)
    setLocalMax(baoyanMax ?? 60)
  }, [baoyanMin, baoyanMax])

  const apply = () => {
    setBaoyanRange(localMin === 0 ? null : localMin, localMax === 60 ? null : localMax)
  }

  const presets = [
    { label: '全部', min: 0, max: 60 },
    { label: '≥10%', min: 10, max: 60 },
    { label: '≥20%', min: 20, max: 60 },
    { label: '≥30%', min: 30, max: 60 },
  ]

  return (
    <div>
      <span className="text-sm font-medium text-slate-600 block mb-2">保研率</span>
      <div className="flex flex-wrap gap-1 mb-2">
        {presets.map((p) => {
          const active = localMin === p.min && localMax === p.max
          return (
            <button
              key={p.label}
              onClick={() => {
                setLocalMin(p.min)
                setLocalMax(p.max)
                setBaoyanRange(p.min === 0 ? null : p.min, p.max === 60 ? null : p.max)
              }}
              className={`text-xs px-2 py-0.5 rounded border transition-all cursor-pointer
                ${active
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
            >
              {p.label}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <input
          type="number"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          className="w-14 px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <span>—</span>
        <input
          type="number"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="w-14 px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <span>%</span>
        <button
          onClick={apply}
          className="ml-auto px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          确定
        </button>
      </div>
    </div>
  )
}
