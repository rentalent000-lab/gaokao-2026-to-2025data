import type { FilteredRow } from '../../hooks/useFilteredData'
import type { MajorRow } from '../../data/types'
import { RISK_COLORS } from '../../data/constants'
import { fmtNum, fmtTuition, fmtBaoyan } from '../../lib/utils'

interface Props {
  item: FilteredRow
  isExpanded: boolean
  columns: readonly { key: string; label: string; width: string }[]
  onToggleExpand: () => void
  onShowDetail: () => void
}

function getCellValue(row: MajorRow, key: string): string {
  switch (key) {
    case 's': return row.s
    case 'g': return row.g
    case 'm': return row.m
    case 'sc': return row.sc !== null ? `${row.sc}` : '-'
    case 'r': return fmtNum(row.r)
    case 'c': return row.c
    case 't': return fmtTuition(row.t)
    case 'by': return fmtBaoyan(row.by)
    case 'sc24': return row.sc24 !== null ? `${row.sc24}` : '-'
    case 'r24': return fmtNum(row.r24)
    case 'xe': return row.xe || '-'
    default: return '-'
  }
}

export function TableRow({ item, isExpanded, columns, onToggleExpand, onShowDetail }: Props) {
  const { row, riskLevel } = item
  const risk = RISK_COLORS[riskLevel]

  const has985 = row.tg.includes('985')
  const has211 = row.tg.includes('211')
  const hasShuang = row.tg.includes('双一流')

  return (
    <>
      <div
        className={`grid items-center border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer border-l-4 ${risk.border}`}
        style={{
          gridTemplateColumns: `24px ${columns.map(c => c.width).join(' ')}`,
          height: '56px',
        }}
        onClick={onToggleExpand}
      >
        {/* 冲稳保指示 */}
        <div className="flex items-center justify-center">
          <span className={`text-[10px] font-medium ${risk.text}`}>
            {risk.label[0]}
          </span>
        </div>

        {/* 院校名称 */}
        <div className="px-2 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-medium text-slate-800 text-sm truncate">{row.s}</span>
            <span className="flex gap-0.5 shrink-0">
              {has985 && <Tag color="red">985</Tag>}
              {has211 && <Tag color="amber">211</Tag>}
              {hasShuang && <Tag color="blue">双</Tag>}
            </span>
          </div>
        </div>

        {/* 专业组 */}
        <div className="px-2 text-sm text-slate-600 truncate">{row.g}</div>

        {/* 专业全称 */}
        <div className="px-2 text-sm text-slate-700 truncate" title={row.m}>
          {row.m}
        </div>

        {/* 其余列 */}
        {columns.slice(3).map((col) => (
          <div
            key={col.key}
            className={`px-2 text-sm truncate ${
              col.key === 'r' ? 'font-mono font-medium text-slate-700' :
              col.key === 'sc' ? 'font-mono text-slate-700' :
              'text-slate-500'
            }`}
          >
            {getCellValue(row, col.key)}
          </div>
        ))}
      </div>

      {/* 展开详情 */}
      {isExpanded && (
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 text-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Detail label="院校水平" value={row.schoolLevel} />
            <Detail label="所在城市" value={`${row.p} ${row.c} (${row.ct})`} />
            <Detail label="学校类型" value={`${row.st} · ${row.pp}`} />
            <Detail label="隶属单位" value={row.affiliation} />
            <Detail label="选科要求" value={row.xk} />
            <Detail label="计划人数" value={`${row.pl} 人`} />
            <Detail label="学制" value={`${row.duration} 年`} />
            <Detail label="保研率" value={fmtBaoyan(row.by)} />
            {row.xe && <Detail label="学科评估" value={row.xe} />}
            {row.majorLevel && <Detail label="专业水平" value={row.majorLevel} />}
            {row.ms && <Detail label="硕士点" value={row.ms} />}
            {row.ds && <Detail label="博士点" value={row.ds} />}
            {row.transfer && <Detail label="转专业" value={row.transfer} />}
            {row.r24 !== null && <Detail label="2024位次" value={fmtNum(row.r24)} />}
            {row.r23 !== null && <Detail label="2023位次" value={fmtNum(row.r23)} />}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onShowDetail() }}
            className="mt-2 text-xs text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            查看完整详情 →
          </button>
        </div>
      )}
    </>
  )
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div>
      <span className="text-slate-400 text-xs">{label}</span>
      <p className="text-slate-700 text-xs mt-0.5 line-clamp-2" title={value}>{value}</p>
    </div>
  )
}

function Tag({ children, color }: { children: string; color: 'red' | 'amber' | 'blue' }) {
  const colors = {
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
  }
  return (
    <span className={`text-[10px] px-1 py-0.5 rounded font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}
