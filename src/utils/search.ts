/**
 * 智能搜索
 * 支持: 中文院校名、中文专业名、拼音首字母
 */
import type { MajorRow } from '../data/types'

/**
 * 在结果集中执行智能搜索
 * 搜索优先级: 院校名 > 专业名 > 拼音首字母
 */
export function smartSearch(rows: MajorRow[], query: string): MajorRow[] {
  const q = query.toLowerCase().trim()
  if (!q) return rows

  // 阶段 1: 中文精确/包含匹配 (院校名 + 专业名)
  const chineseMatches = rows.filter(
    (r) =>
      r.s.includes(q) ||    // 院校名称包含
      r.m.includes(q) ||    // 专业全称包含
      r.mn.includes(q)      // 专业名称包含
  )

  if (chineseMatches.length > 0) return chineseMatches

  // 阶段 2: 拼音首字母匹配
  return rows.filter(
    (r) =>
      r.si?.includes(q) ||  // 院校拼音首字母
      r.mi?.includes(q)     // 专业拼音首字母
  )
}
