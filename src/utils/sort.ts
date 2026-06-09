/**
 * 排序工具
 */
import type { MajorRow, SortKey } from '../data/types'

/**
 * 按指定键对数据进行排序
 * null 值始终排在最后
 */
export function sortRows(
  rows: MajorRow[],
  key: SortKey,
  direction: 'asc' | 'desc'
): MajorRow[] {
  return [...rows].sort((a, b) => {
    const va = a[key] ?? (direction === 'asc' ? Infinity : -Infinity)
    const vb = b[key] ?? (direction === 'asc' ? Infinity : -Infinity)

    let cmp = 0
    if (va < vb) cmp = -1
    else if (va > vb) cmp = 1

    return direction === 'asc' ? cmp : -cmp
  })
}
