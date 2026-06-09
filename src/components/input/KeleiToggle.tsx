import { useFilterStore } from '../../store/useFilterStore'
import type { Kelei } from '../../data/types'

const OPTIONS: { value: Kelei; label: string; desc: string }[] = [
  { value: '物理', label: '物理类', desc: '理科/工科/医学为主' },
  { value: '历史', label: '历史类', desc: '文科/社科/经管为主' },
]

export function KeleiToggle() {
  const kelei = useFilterStore((s) => s.kelei)
  const setKelei = useFilterStore((s) => s.setKelei)

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        ① 选择科类
      </label>
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const active = kelei === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => setKelei(opt.value)}
              className={`text-left px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                active
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className={`font-semibold text-sm ${active ? 'text-blue-700' : 'text-slate-700'}`}>
                {opt.label}
              </div>
              <div className={`text-xs mt-0.5 ${active ? 'text-blue-500' : 'text-slate-400'}`}>
                {opt.desc}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
