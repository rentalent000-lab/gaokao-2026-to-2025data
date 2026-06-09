import { useFilterStore } from '../../store/useFilterStore'

export function RankRangeSlider() {
  const exactRank = useFilterStore((s) => s.exactRank)
  const rankRange = useFilterStore((s) => s.rankRange)
  const setRankRange = useFilterStore((s) => s.setRankRange)

  const disabled = exactRank === null

  const minRank = exactRank !== null ? Math.max(1, exactRank - rankRange) : null
  const maxRank = exactRank !== null ? exactRank + rankRange : null

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        ③ 浮动范围
      </label>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 w-6">±</span>
        <input
          type="range"
          min={0}
          max={50000}
          step={100}
          value={rankRange}
          disabled={disabled}
          onChange={(e) => setRankRange(parseInt(e.target.value, 10))}
          className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer
            ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-runnable-track]:rounded-lg
            [&::-webkit-slider-runnable-track]:bg-slate-200`}
          style={{
            background: disabled ? undefined : `linear-gradient(to right, #e2e8f0 0%, #3b82f6 ${(rankRange / 50000) * 100}%, #e2e8f0 ${(rankRange / 50000) * 100}%)`,
          }}
        />
        <span className="text-sm font-mono font-semibold text-blue-600 min-w-[60px] text-right">
          {rankRange.toLocaleString('zh-CN')} 名
        </span>
      </div>
      {minRank && maxRank && (
        <p className="text-xs text-slate-400 mt-2">
          位次区间：
          <span className="text-green-600 font-medium">{minRank.toLocaleString('zh-CN')}</span>
          {' — '}
          <span className="text-red-500 font-medium">{maxRank.toLocaleString('zh-CN')}</span>
        </p>
      )}
      {disabled && (
        <p className="text-xs text-slate-300 mt-1">请先输入位次</p>
      )}
    </div>
  )
}
