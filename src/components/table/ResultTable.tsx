import { useRef, useState, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useFilterStore } from '../../store/useFilterStore'
import { TableRow } from './TableRow'
import { DetailModal } from './DetailModal'
import { RISK_COLORS, REQUIRED_COLUMNS, OPTIONAL_COLUMNS } from '../../data/constants'
import type { FilteredRow } from '../../hooks/useFilteredData'
import type { SortKey } from '../../data/types'

interface Props {
  results: FilteredRow[]
}

export function ResultTable({ results }: Props) {
  const sortKey = useFilterStore((s) => s.sortKey)
  const sortDirection = useFilterStore((s) => s.sortDirection)
  const setSortKey = useFilterStore((s) => s.setSortKey)
  const setSortDirection = useFilterStore((s) => s.setSortDirection)
  const show2024Data = useFilterStore((s) => s.show2024Data)
  const showDisciplineEval = useFilterStore((s) => s.showDisciplineEval)
  const toggleShow2024Data = useFilterStore((s) => s.toggleShow2024Data)
  const toggleShowDisciplineEval = useFilterStore((s) => s.toggleShowDisciplineEval)

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 10,
  })

  const handleSort = useCallback((key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }, [sortKey, sortDirection, setSortKey, setSortDirection])

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (colKey !== sortKey) return <span className="text-slate-300 ml-1">⇅</span>
    return <span className="text-blue-500 ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
  }

  // 合并必选和可选的列
  const displayColumns = [
    ...REQUIRED_COLUMNS,
    ...(show2024Data ? OPTIONAL_COLUMNS.filter(c => c.key === 'sc24' || c.key === 'r24') : []),
    ...(showDisciplineEval ? OPTIONAL_COLUMNS.filter(c => c.key === 'xe') : []),
  ]

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* 列显示选项 */}
      <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-4 text-xs text-slate-500">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={show2024Data}
            onChange={toggleShow2024Data}
            className="rounded border-slate-300 text-blue-500"
          />
          显示2024数据
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showDisciplineEval}
            onChange={toggleShowDisciplineEval}
            className="rounded border-slate-300 text-blue-500"
          />
          显示学科评估
        </label>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-slate-400">冲稳保:</span>
          {(['safety', 'match', 'reach'] as const).map((level) => (
            <span key={level} className="flex items-center gap-1">
              <span className={`w-3 h-3 rounded-sm ${RISK_COLORS[level].border.replace('border-l-', 'bg-')}`} />
              {RISK_COLORS[level].label}
            </span>
          ))}
        </div>
      </div>

      {/* 表头 */}
      <div className="grid px-2 py-2 border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600"
        style={{
          gridTemplateColumns: `24px ${displayColumns.map(c => c.width).join(' ')}`,
          minWidth: '800px',
        }}
      >
        <div />
        {displayColumns.map((col) => (
          <button
            key={col.key}
            onClick={() => handleSort(col.key as SortKey)}
            className="flex items-center px-2 hover:text-slate-800 cursor-pointer whitespace-nowrap"
          >
            {col.label}
            <SortIcon colKey={col.key} />
          </button>
        ))}
      </div>

      {/* 虚拟化行 */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
            minWidth: '800px',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = results[virtualItem.index]
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <TableRow
                  item={item}
                  isExpanded={expandedIndex === virtualItem.index}
                  columns={displayColumns}
                  onToggleExpand={() =>
                    setExpandedIndex(
                      expandedIndex === virtualItem.index ? null : virtualItem.index
                    )
                  }
                  onShowDetail={() => setModalIndex(virtualItem.index)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* 详情弹窗 */}
      {modalIndex !== null && (
        <DetailModal
          item={results[modalIndex]}
          onClose={() => setModalIndex(null)}
        />
      )}
    </div>
  )
}
