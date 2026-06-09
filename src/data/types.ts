/* eslint-disable @typescript-eslint/no-namespace */

// ============ 核心数据行 ============

/** 一条专业记录（对应 Excel 中的一行，JSON 中使用短键名） */
export interface MajorRow {
  /** 院校名称 */
  s: string
  /** 院校代码 */
  scode: string
  /** 专业组名称 */
  g: string
  /** 专业组代码 */
  gcode: string
  /** 专业全称 */
  m: string
  /** 专业名称 */
  mn: string
  /** 专业备注 */
  note: string
  /** 专业层次 (本科/专科) */
  level: string
  /** 学制 (年) */
  duration: number
  /** 2025年最低位次 */
  r: number
  /** 2025年最低分 */
  sc: number
  /** 2025年计划人数 */
  pl: number
  /** 学费 (元/年) */
  t: number | null
  /** 所在省 */
  p: string
  /** 城市 */
  c: string
  /** 城市水平标签 */
  ct: string
  /** 院校标签 (985/211/双一流/国重点/省重点/保研资格) */
  tg: string
  /** 院校水平描述 */
  schoolLevel: string
  /** 学校类型 (综合/理工/师范...) */
  st: string
  /** 公私性质 (公办/民办/中外合作办学) */
  pp: string
  /** 保研率 (如 0.123 表示 12.3%) */
  by: number | null
  /** 院校排名 */
  schoolRank: number | null
  /** 选科要求 (如 "化学" "不限" "化学和生物") */
  xk: string
  /** 选科要求解析后数组 */
  xkArr: string[]
  /** 学科评估 (如 "四轮：A+；五轮：A+") */
  xe: string | null
  /** 专业水平 */
  majorLevel: string | null
  /** 本专业硕士点 */
  ms: string | null
  /** 本专业博士点 */
  ds: string | null
  /** 门类 (工学/理学/医学...) */
  category: string
  /** 专业类 */
  subcategory: string
  /** 批次 */
  b: string
  /** 科类 (物理/历史) */
  kl: string
  /** 隶属单位 */
  affiliation: string
  /** 转专业情况 */
  transfer: string | null

  // ===== 历史数据 (可选) =====
  /** 2024年最低位次 */
  r24: number | null
  /** 2024年最低分 */
  sc24: number | null
  /** 2023年最低位次 */
  r23: number | null
  /** 2023年最低分 */
  sc23: number | null

  // ===== 拼音首字母 (搜索用) =====
  /** 院校拼音首字母 */
  si: string
  /** 专业拼音首字母 */
  mi: string
}

// ============ 筛选状态 ============

export type Kelei = '物理' | '历史'

export type BatchType =
  | '本科批'
  | '本科提前批A段'
  | '本科提前批B段'
  | '本科提前批C段'
  | '高职专科批'
  | '高职专科提前批'

/** 冲稳保分类 */
export type RiskLevel = 'reach' | 'match' | 'safety'

export interface FilterState {
  // 核心输入
  kelei: Kelei | null
  exactRank: number | null
  rankRange: number

  // 选科
  studentSubjects: string[]

  // 批次
  activeBatch: BatchType

  // 筛选器
  selectedProvinces: string[]
  selectedCities: string[]
  selectedCityTiers: string[]
  selectedSchoolTags: string[] // 985, 211, 双一流, 国重点, 省重点, 保研资格
  selectedSchoolTypes: string[] // 综合, 理工, 师范...
  tuitionMin: number | null
  tuitionMax: number | null
  baoyanMin: number | null
  baoyanMax: number | null
  selectedDisciplines: string[] // A+, A, A-, B+...
  publicPrivate: string[] // 公办, 民办

  // 搜索
  searchQuery: string

  // 排序
  sortKey: SortKey
  sortDirection: 'asc' | 'desc'

  // UI
  show2024Data: boolean
  showDisciplineEval: boolean
}

export type SortKey = 'r' | 'sc' | 't' | 'by' | 's'

// ============ 常量数据 ============

export const BATCH_OPTIONS: BatchType[] = [
  '本科批',
  '本科提前批A段',
  '本科提前批B段',
  '本科提前批C段',
  '高职专科批',
  '高职专科提前批',
]

export const SUBJECT_OPTIONS = [
  { value: '物理', group: 'primary' },
  { value: '历史', group: 'primary' },
  { value: '化学', group: 'secondary' },
  { value: '生物', group: 'secondary' },
  { value: '政治', group: 'secondary' },
  { value: '地理', group: 'secondary' },
] as const

export const CITY_TIER_OPTIONS = [
  '一线城市',
  '新一线城市',
  '二线城市',
  '三线城市',
  '四线城市',
  '五线城市',
]

export const SCHOOL_TAG_OPTIONS = [
  '985',
  '211',
  '双一流',
  '国重点',
  '省重点',
  '保研资格',
]

export const DISCIPLINE_OPTIONS = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
]

export const PUBLIC_PRIVATE_OPTIONS = ['公办', '民办', '中外合作办学']

export const DEFAULT_FILTER_STATE: FilterState = {
  kelei: null,
  exactRank: null,
  rankRange: 2000,
  studentSubjects: [],
  activeBatch: '本科批',
  selectedProvinces: [],
  selectedCities: [],
  selectedCityTiers: [],
  selectedSchoolTags: [],
  selectedSchoolTypes: [],
  tuitionMin: null,
  tuitionMax: null,
  baoyanMin: null,
  baoyanMax: null,
  selectedDisciplines: [],
  publicPrivate: [],
  searchQuery: '',
  sortKey: 'r',
  sortDirection: 'asc',
  show2024Data: false,
  showDisciplineEval: false,
}
