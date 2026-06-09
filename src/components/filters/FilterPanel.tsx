import { useState } from 'react'
import { useFilterStore } from '../../store/useFilterStore'
import { ProvinceFilter } from './ProvinceFilter'
import { CityFilter } from './CityFilter'
import { CityTierFilter } from './CityTierFilter'
import { SchoolTagFilter, DisciplineFilter, PublicPrivateFilter } from './CityTierFilter'
import { SchoolTypeFilter } from './SchoolTypeFilter'
import { TuitionFilter } from './TuitionFilter'
import { BaoyanFilter } from './BaoyanFilter'

export function FilterPanel() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const hasActive = useFilterStore((s) => s.hasActiveFilters())
  const resetFilters = useFilterStore((s) => s.resetFilters)
  const kelei = useFilterStore((s) => s.kelei)

  if (!kelei) return null

  const filterContent = (
    <div className="px-3 py-2 space-y-4">
      <ProvinceFilter />
      <CityFilter />
      <CityTierFilter />
      <SchoolTagFilter />
      <SchoolTypeFilter />
      <TuitionFilter />
      <BaoyanFilter />
      <DisciplineFilter />
      <PublicPrivateFilter />

      {hasActive && (
        <button
          onClick={resetFilters}
          className="w-full py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          清除所有筛选
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* 移动端筛选按钮 */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {hasActive && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">!</span>
        )}
      </button>

      {/* 移动端遮罩 */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setMobileOpen(false)} />
      )}

      {/* 移动端抽屉 */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-white shadow-xl overflow-y-auto transition-transform duration-300 w-72 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-3 py-3 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-600">筛选条件</span>
          <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            ✕
          </button>
        </div>
        {filterContent}
      </aside>

      {/* 桌面端侧边栏 */}
      <aside className={`hidden lg:block bg-white border-r border-slate-200 overflow-y-auto shrink-0 transition-all duration-200 ${
        collapsed ? 'w-10' : 'w-64'
      }`}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
          {!collapsed && (
            <span className="text-sm font-medium text-slate-600">筛选条件</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            title={collapsed ? '展开筛选' : '收起筛选'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>
        {collapsed ? (
          <div className="p-2 text-center">
            {hasActive && <span className="text-xs text-blue-500">●</span>}
          </div>
        ) : (
          filterContent
        )}
      </aside>
    </>
  )
}
