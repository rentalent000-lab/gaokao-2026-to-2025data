import { Header } from './components/layout/Header'
import { KeleiToggle } from './components/input/KeleiToggle'
import { RankInput } from './components/input/RankInput'
import { RankRangeSlider } from './components/input/RankRangeSlider'
import { SubjectSelector } from './components/input/SubjectSelector'
import { SearchBar } from './components/common/SearchBar'
import { BatchTabs } from './components/filters/BatchTabs'
import { FilterPanel } from './components/filters/FilterPanel'
import { ResultTable } from './components/table/ResultTable'
import { LoadingSpinner } from './components/common/LoadingSpinner'
import { EmptyState } from './components/common/EmptyState'
import { useFilterStore } from './store/useFilterStore'
import { useDataStore } from './store/useDataStore'
import { useFilteredData } from './hooks/useFilteredData'
import { useDataLoader } from './hooks/useDataLoader'

function App() {
  const kelei = useFilterStore((s) => s.kelei)
  const isLoading = useDataStore((s) => s.isLoading)
  const loadProgress = useDataStore((s) => s.loadProgress)
  const loadError = useDataStore((s) => s.loadError)

  // 自动加载数据
  useDataLoader()

  const { results, filteredCount, totalCount, isReady } = useFilteredData()

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* 无科类选择 → 初始引导页 */}
      {!kelei && (
        <main className="max-w-lg mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="text-center mb-2">
              <h2 className="text-lg font-semibold text-slate-800">开始查询</h2>
              <p className="text-sm text-slate-400 mt-1">输入信息后筛选适合的专业组</p>
            </div>
            <KeleiToggle />
            <RankInput />
            <RankRangeSlider />
            <SubjectSelector />
            <div className="pt-2 text-center text-xs text-slate-350">
              选择科类后自动加载数据
            </div>
          </div>
        </main>
      )}

      {/* 加载中 */}
      {kelei && isLoading && (
        <main className="max-w-7xl mx-auto px-4 py-12">
          <LoadingSpinner progress={loadProgress} message={`正在加载${kelei}类数据...`} />
        </main>
      )}

      {/* 加载出错 */}
      {kelei && loadError && (
        <main className="max-w-lg mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium mb-2">数据加载失败</p>
            <p className="text-red-500 text-sm">{loadError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors cursor-pointer"
            >
              重新加载
            </button>
          </div>
        </main>
      )}

      {/* 主界面 */}
      {kelei && !isLoading && !loadError && (
        <>
          <BatchTabs />
          <div className="flex">
            <FilterPanel />
            <main className="flex-1 min-w-0 px-4 sm:px-6 py-4">
              {/* 顶部工具栏 */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 max-w-md">
                  <SearchBar />
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>
                    共 <span className="font-semibold text-slate-700">{filteredCount.toLocaleString('zh-CN')}</span> 条
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>
                    总计 <span className="font-medium">{totalCount.toLocaleString('zh-CN')}</span> 条
                  </span>
                </div>
              </div>

              {/* 快捷信息 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <QuickFilterBadge label="科类" value={kelei} />
                <QuickFilterBadge label="批次" value={useFilterStore.getState().activeBatch} />
                {useFilterStore.getState().exactRank && (
                  <QuickFilterBadge
                    label="位次"
                    value={`${useFilterStore.getState().exactRank!.toLocaleString('zh-CN')} ± ${useFilterStore.getState().rankRange.toLocaleString('zh-CN')}`}
                  />
                )}
              </div>

              {/* 结果表格 */}
              {isReady && results.length === 0 ? (
                <EmptyState message="没有匹配的专业组" />
              ) : !isReady || results.length === 0 ? (
                <EmptyState message="请输入位次开始查询" />
              ) : (
                <ResultTable results={results} />
              )}
            </main>
          </div>
        </>
      )}
    </div>
  )
}

/** 快捷筛选标签 */
function QuickFilterBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-500">
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium text-slate-700">{value}</span>
    </span>
  )
}

export default App
