/**
 * 核心筛选逻辑
 * 按选择度从高到低依次应用筛选条件
 */
import type { MajorRow, FilterState, RiskLevel } from '../data/types'
import { isSubjectMatch } from './subjectMatch'
import { smartSearch } from './search'

/**
 * 对原始数据应用所有筛选条件
 * 筛选顺序按选择度排列（最可能排除最多数据的排前面）
 */
export function applyAllFilters(
  rawData: MajorRow[],
  filters: FilterState
): MajorRow[] {
  let result = rawData

  // 1. 科类筛选 (排除 ~50%)
  if (filters.kelei) {
    result = result.filter((r) => r.kl === filters.kelei)
  }

  // 2. 批次筛选 (排除 ~30-80%)
  result = result.filter((r) => r.b === filters.activeBatch)

  // 3. 位次范围筛选 (排除重大比例)
  if (filters.exactRank !== null) {
    const minRank = filters.exactRank - filters.rankRange
    const maxRank = filters.exactRank + filters.rankRange
    result = result.filter((r) => {
      if (r.r === null) return false
      return r.r >= minRank && r.r <= maxRank
    })
  }

  // 4. 选科匹配 (排除 ~5-15%)
  if (filters.studentSubjects.length > 0) {
    const studentSet = new Set(filters.studentSubjects)
    result = result.filter((r) => isSubjectMatch(studentSet, r.xkArr))
  }

  // 5. 省份筛选
  if (filters.selectedProvinces.length > 0) {
    result = result.filter((r) => filters.selectedProvinces.includes(r.p))
  }

  // 6. 城市筛选
  if (filters.selectedCities.length > 0) {
    result = result.filter((r) => filters.selectedCities.includes(r.c))
  }

  // 7. 城市水平筛选
  if (filters.selectedCityTiers.length > 0) {
    result = result.filter((r) => {
      return filters.selectedCityTiers.some((tier) => r.ct.includes(tier))
    })
  }

  // 8. 院校标签筛选
  if (filters.selectedSchoolTags.length > 0) {
    result = result.filter((r) => {
      return filters.selectedSchoolTags.some((tag) => r.tg.includes(tag))
    })
  }

  // 9. 学校类型筛选
  if (filters.selectedSchoolTypes.length > 0) {
    result = result.filter((r) => filters.selectedSchoolTypes.includes(r.st))
  }

  // 10. 学费范围筛选
  if (filters.tuitionMin !== null) {
    result = result.filter((r) => r.t !== null && r.t >= filters.tuitionMin!)
  }
  if (filters.tuitionMax !== null) {
    result = result.filter((r) => r.t !== null && r.t <= filters.tuitionMax!)
  }

  // 11. 保研率范围筛选
  if (filters.baoyanMin !== null) {
    result = result.filter((r) => r.by !== null && r.by >= filters.baoyanMin! / 100)
  }
  if (filters.baoyanMax !== null) {
    result = result.filter((r) => r.by !== null && r.by <= filters.baoyanMax! / 100)
  }

  // 12. 学科评估筛选
  if (filters.selectedDisciplines.length > 0) {
    result = result.filter((r) => {
      if (!r.xe) return false
      return filters.selectedDisciplines.some((d) => r.xe!.includes(d))
    })
  }

  // 13. 公私性质筛选
  if (filters.publicPrivate.length > 0) {
    result = result.filter((r) => filters.publicPrivate.includes(r.pp))
  }

  // 14. 智能搜索 (最后, 最昂贵)
  if (filters.searchQuery.trim()) {
    result = smartSearch(result, filters.searchQuery.trim())
  }

  return result
}

/**
 * 根据位次差异判断冲稳保分类
 */
export function getRiskLevel(
  exactRank: number,
  recordRank: number | null,
  rankRange: number
): RiskLevel {
  if (recordRank === null) return 'match' // 无数据默认稳妥

  const diff = recordRank - exactRank // 正 = 冲刺, 负 = 安全

  // 冲: 位次高于用户位次 (> exactRank)
  if (diff > rankRange * 0.3) return 'reach'
  // 安全: 位次远低于用户位次
  if (diff < -rankRange * 0.3) return 'safety'
  // 稳妥: 位次接近
  return 'match'
}
