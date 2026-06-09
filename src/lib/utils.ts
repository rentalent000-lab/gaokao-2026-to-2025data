/** 合并 className 字符串 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** 格式化数字 */
export function fmtNum(n: number | null | undefined): string {
  if (n === null || n === undefined) return '-'
  return n.toLocaleString('zh-CN')
}

/** 格式化学费 */
export function fmtTuition(n: number | null | undefined): string {
  if (n === null || n === undefined) return '-'
  if (n === 0) return '免费'
  return n.toLocaleString('zh-CN') + ' 元/年'
}

/** 格式化保研率 */
export function fmtBaoyan(n: number | null | undefined): string {
  if (n === null || n === undefined) return '-'
  return (n * 100).toFixed(1) + '%'
}
