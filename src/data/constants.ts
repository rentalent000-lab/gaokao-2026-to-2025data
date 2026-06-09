import type { BatchType } from './types'

/** 批次列表（展示顺序） */
export const BATCHES: BatchType[] = [
  '本科批',
  '本科提前批A段',
  '本科提前批B段',
  '本科提前批C段',
  '高职专科批',
  '高职专科提前批',
]

/** 必展示列 */
export const REQUIRED_COLUMNS = [
  { key: 's', label: '院校名称', width: '180px' },
  { key: 'g', label: '专业组', width: '160px' },
  { key: 'm', label: '专业全称', width: '280px' },
  { key: 'sc', label: '2025最低分', width: '90px' },
  { key: 'r', label: '2025最低位次', width: '100px' },
  { key: 't', label: '学费', width: '90px' },
  { key: 'c', label: '城市', width: '90px' },
  { key: 'by', label: '保研率', width: '80px' },
] as const

/** 可选展示列 */
export const OPTIONAL_COLUMNS = [
  { key: 'sc24', label: '2024最低分', width: '90px' },
  { key: 'r24', label: '2024最低位次', width: '100px' },
  { key: 'xe', label: '学科评估', width: '120px' },
] as const

/** 批次颜色 */
export const BATCH_COLORS: Record<BatchType, string> = {
  '本科批': 'bg-blue-50 text-blue-700',
  '本科提前批A段': 'bg-purple-50 text-purple-700',
  '本科提前批B段': 'bg-violet-50 text-violet-700',
  '本科提前批C段': 'bg-pink-50 text-pink-700',
  '高职专科批': 'bg-green-50 text-green-700',
  '高职专科提前批': 'bg-teal-50 text-teal-700',
}

/** 冲稳保颜色映射 */
export const RISK_COLORS = {
  reach: { border: 'border-l-red-500', bg: 'bg-red-50', text: 'text-red-600', label: '冲刺' },
  match: { border: 'border-l-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-600', label: '稳妥' },
  safety: { border: 'border-l-green-500', bg: 'bg-green-50', text: 'text-green-600', label: '安全' },
} as const

/** 位次范围滑块配置 */
export const RANK_RANGE_CONFIG = {
  min: 0,
  max: 50000,
  step: 100,
  default: 2000,
}

/** 学费范围配置 */
export const TUITION_CONFIG = {
  min: 0,
  max: 100000,
  step: 1000,
}

/** 保研率范围配置 */
export const BAOYAN_CONFIG = {
  min: 0,
  max: 60,
  step: 1,
}
