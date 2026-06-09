import type { FilteredRow } from '../../hooks/useFilteredData'
import { fmtNum, fmtTuition, fmtBaoyan } from '../../lib/utils'
import { RISK_COLORS } from '../../data/constants'

interface Props {
  item: FilteredRow
  onClose: () => void
}

export function DetailModal({ item, onClose }: Props) {
  const { row, riskLevel } = item
  const risk = RISK_COLORS[riskLevel]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className={`px-6 py-4 border-b border-slate-100 flex items-start justify-between ${risk.bg}`}>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{row.s}</h3>
            <p className="text-sm text-slate-500 mt-1">{row.g} · {row.m}</p>
            <div className="flex gap-2 mt-2">
              {row.tg.split('/').map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-white/70 rounded-full text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none cursor-pointer">
            ✕
          </button>
        </div>

        {/* 录取数据 */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">📊 录取数据</h4>
          <div className="grid grid-cols-3 gap-4">
            <YearBlock year="2025" score={row.sc} rank={row.r} isCurrent />
            <YearBlock year="2024" score={row.sc24} rank={row.r24} />
            <YearBlock year="2023" score={row.sc23} rank={row.r23} />
          </div>
          <p className="text-xs text-slate-400 mt-3">
            2025年计划招收 <span className="font-medium text-slate-600">{row.pl} 人</span>
            {row.duration && ` · 学制 ${row.duration} 年`}
          </p>
        </div>

        {/* 院校信息 */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">🏫 院校信息</h4>
          <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
            <Info label="所在地" value={`${row.p} ${row.c}`} />
            <Info label="城市水平" value={row.ct} />
            <Info label="学校类型" value={row.st} />
            <Info label="办学性质" value={row.pp} />
            <Info label="隶属单位" value={row.affiliation} />
            <Info label="保研率" value={fmtBaoyan(row.by)} />
            <Info label="院校排名" value={row.schoolRank !== null ? `全国第 ${row.schoolRank} 名` : null} />
            <Info label="院校水平" value={row.schoolLevel} span={2} />
            {row.transfer && <Info label="转专业情况" value={row.transfer} span={2} />}
          </div>
        </div>

        {/* 专业信息 */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">📖 专业信息</h4>
          <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
            <Info label="门类" value={row.category} />
            <Info label="专业类" value={row.subcategory} />
            <Info label="选科要求" value={row.xk} />
            <Info label="专业层次" value={row.level} />
            <Info label="学费" value={fmtTuition(row.t)} />
            {row.xe && <Info label="学科评估" value={row.xe} />}
            {row.majorLevel && <Info label="专业水平" value={row.majorLevel} />}
            {row.ms && <Info label="本专业硕士点" value={row.ms} />}
            {row.ds && <Info label="本专业博士点" value={row.ds} />}
          </div>
        </div>

        {/* 底部 */}
        <div className="px-6 py-3 text-center">
          <span className={`text-xs ${risk.text}`}>
            {risk.label}志愿 · 位次差：{row.r !== null ? (row.r - (item.row.r ?? 0)) : '—'}
          </span>
        </div>
      </div>
    </div>
  )
}

function YearBlock({
  year,
  score,
  rank,
  isCurrent = false,
}: {
  year: string
  score: number | null
  rank: number | null
  isCurrent?: boolean
}) {
  return (
    <div className={`rounded-lg p-3 text-center ${isCurrent ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-slate-50'}`}>
      <div className="text-xs text-slate-400 mb-1">{year}年</div>
      <div className="text-lg font-bold text-slate-800">
        {score !== null ? `${score}` : '-'}
        <span className="text-xs font-normal text-slate-400"> 分</span>
      </div>
      <div className="text-xs text-slate-500 mt-0.5">
        位次 {fmtNum(rank)}
      </div>
    </div>
  )
}

function Info({
  label,
  value,
  span = 1,
}: {
  label: string
  value: string | null | undefined
  span?: number
}) {
  if (!value) return null
  return (
    <div style={{ gridColumn: `span ${span}` }}>
      <span className="text-xs text-slate-400">{label}</span>
      <p className="text-sm text-slate-700 mt-0.5">{value}</p>
    </div>
  )
}
