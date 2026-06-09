import { useState, useEffect } from 'react'
import { useFilterStore } from '../../store/useFilterStore'

export function TuitionFilter() {
  const tuitionMin = useFilterStore((s) => s.tuitionMin)
  const tuitionMax = useFilterStore((s) => s.tuitionMax)
  const setTuitionRange = useFilterStore((s) => s.setTuitionRange)

  const [localMin, setLocalMin] = useState(tuitionMin ?? 0)
  const [localMax, setLocalMax] = useState(tuitionMax ?? 100000)

  useEffect(() => {
    setLocalMin(tuitionMin ?? 0)
    setLocalMax(tuitionMax ?? 100000)
  }, [tuitionMin, tuitionMax])

  const apply = () => {
    setTuitionRange(localMin === 0 ? null : localMin, localMax === 100000 ? null : localMax)
  }

  return (
    <div>
      <span className="text-sm font-medium text-slate-600 block mb-2">学费范围</span>
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <input
          type="number"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          className="w-20 px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          step={1000}
        />
        <span>—</span>
        <input
          type="number"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="w-20 px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          step={1000}
        />
        <span>元/年</span>
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
