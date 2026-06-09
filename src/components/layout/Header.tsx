export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
            🎓 晋辉高考数据分析卡
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            2025年山西省高考志愿填报 · 专业组查询
          </p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
          2025 数据
        </span>
      </div>
    </header>
  )
}
