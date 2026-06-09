import { useFilterStore } from '../../store/useFilterStore'

export function RankInput() {
  const exactRank = useFilterStore((s) => s.exactRank)
  const setExactRank = useFilterStore((s) => s.setExactRank)

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        ② 输入位次
      </label>
      <div className="relative">
        <input
          type="number"
          value={exactRank ?? ''}
          onChange={(e) => {
            const v = e.target.value
            setExactRank(v ? parseInt(v, 10) : null)
          }}
          placeholder="如 15000"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white
                     text-slate-800 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-base"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          名
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-1">
        输入你的高考全省排名位次
      </p>
    </div>
  )
}
