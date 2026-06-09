import { useMemo } from 'react'
import { useFilterStore } from '../store/useFilterStore'
import { useDataStore } from '../store/useDataStore'
import { applyAllFilters, getRiskLevel } from '../utils/filter'
import { sortRows } from '../utils/sort'
import type { MajorRow, RiskLevel } from '../data/types'

export interface FilteredRow {
  row: MajorRow
  riskLevel: RiskLevel
}

export function useFilteredData(): {
  results: FilteredRow[]
  totalCount: number
  filteredCount: number
  isReady: boolean
} {
  const rawData = useDataStore((s) => s.rawData)
  const isLoading = useDataStore((s) => s.isLoading)
  const filters = useFilterStore()

  // 使用 useMemo 避免不必要的重算
  const filtered = useMemo(() => {
    if (rawData.length === 0) return []

    const matched = applyAllFilters(rawData, filters)
    const sorted = sortRows(matched, filters.sortKey, filters.sortDirection)

    return sorted.map((row) => ({
      row,
      riskLevel: getRiskLevel(
        filters.exactRank ?? 0,
        row.r,
        filters.rankRange
      ),
    }))
  }, [rawData, filters])

  return {
    results: filtered,
    totalCount: rawData.length,
    filteredCount: filtered.length,
    isReady: !isLoading && rawData.length > 0,
  }
}
