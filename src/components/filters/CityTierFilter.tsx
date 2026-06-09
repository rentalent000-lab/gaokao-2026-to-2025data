import { useFilterStore } from '../../store/useFilterStore'
import { CITY_TIER_OPTIONS } from '../../data/types'

export function CityTierFilter() {
  const selected = useFilterStore((s) => s.selectedCityTiers)
  const toggle = useFilterStore((s) => s.toggleCityTier)

  return (
    <CheckboxGroup
      title="城市水平"
      selected={selected}
      options={CITY_TIER_OPTIONS}
      onToggle={toggle}
      showSelected
    />
  )
}

export function SchoolTagFilter() {
  const selected = useFilterStore((s) => s.selectedSchoolTags)
  const toggle = useFilterStore((s) => s.toggleSchoolTag)
  const OPTIONS = ['985', '211', '双一流', '省重点', '保研资格']

  return (
    <CheckboxGroup
      title="院校标签"
      selected={selected}
      options={OPTIONS}
      onToggle={toggle}
      showSelected
      colorMap={{
        '985': 'text-red-600 bg-red-50',
        '211': 'text-amber-600 bg-amber-50',
        '双一流': 'text-blue-600 bg-blue-50',
      }}
    />
  )
}

export function DisciplineFilter() {
  const selected = useFilterStore((s) => s.selectedDisciplines)
  const toggle = useFilterStore((s) => s.toggleDiscipline)
  const OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-']

  return (
    <CheckboxGroup
      title="学科评估"
      selected={selected}
      options={OPTIONS}
      onToggle={toggle}
      showSelected
      compact
    />
  )
}

export function PublicPrivateFilter() {
  const selected = useFilterStore((s) => s.publicPrivate)
  const toggle = useFilterStore((s) => s.togglePublicPrivate)
  const OPTIONS = ['公办', '民办', '中外合作办学']

  return (
    <CheckboxGroup
      title="办学性质"
      selected={selected}
      options={OPTIONS}
      onToggle={toggle}
      showSelected
    />
  )
}

// ------ 通用多选组件 ------

function CheckboxGroup({
  title,
  selected,
  options,
  onToggle,
  showSelected = false,
  compact = false,
  colorMap,
}: {
  title: string
  selected: string[]
  options: string[]
  onToggle: (v: string) => void
  showSelected?: boolean
  compact?: boolean
  colorMap?: Record<string, string>
}) {
  return (
    <div>
      <span className="text-sm font-medium text-slate-600 block mb-2">
        {title}{showSelected && selected.length > 0 ? ` (${selected.length})` : ''}
      </span>
      <div className={`${compact ? 'grid grid-cols-3 gap-1' : 'flex flex-wrap gap-1.5'}`}>
        {options.map((opt) => {
          const active = selected.includes(opt)
          const extraColor = colorMap?.[opt] ?? ''
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`text-xs px-2 py-1 rounded-md border transition-all cursor-pointer whitespace-nowrap
                ${active
                  ? `bg-blue-500 text-white border-blue-500 ${extraColor ? 'bg-opacity-90' : ''}`
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
