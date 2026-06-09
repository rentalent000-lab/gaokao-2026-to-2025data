/**
 * 选科匹配 —— 超集逻辑
 * 学生的科目集合需要覆盖专业要求的全部科目
 *
 * 例: 学生选了 {物理, 化学, 生物}
 *     - 专业要求 "化学" → 匹配 ✓
 *     - 专业要求 "化学和生物" → 匹配 ✓
 *     - 专业要求 "政治" → 不匹配 ✗
 *     - 专业要求 "不限" → 匹配 ✓
 */

/**
 * 判断学生选科是否匹配专业要求
 * @param studentSubjects 学生选的科目 Set
 * @param requiredSubjects 专业要求的科目数组 (已解析, "不限" = 空数组)
 * @returns true = 匹配
 */
export function isSubjectMatch(
  studentSubjects: Set<string>,
  requiredSubjects: string[]
): boolean {
  // 不限选科 → 总是匹配
  if (requiredSubjects.length === 0) return true

  // 学生还没选科 → 不匹配
  if (studentSubjects.size === 0) return false

  // 超集判断: 学生的科目必须覆盖所有要求的科目
  return requiredSubjects.every((req) => studentSubjects.has(req))
}

/**
 * 从字符串解析选科要求为数组
 * "化学和生物" → ["化学", "生物"]
 * "不限" → []
 */
export function parseXuankeRequirement(xk: string): string[] {
  const trimmed = xk.trim()
  if (!trimmed || trimmed === '不限') return []
  return trimmed
    .split('和')
    .map((s) => s.trim())
    .filter(Boolean)
}
