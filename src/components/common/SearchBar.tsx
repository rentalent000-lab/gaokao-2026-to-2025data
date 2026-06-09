import { useState, useEffect } from 'react'
import { useFilterStore } from '../../store/useFilterStore'
import { useDebounce } from '../../hooks/useDebounce'

export function SearchBar() {
  const setSearchQuery = useFilterStore((s) => s.setSearchQuery)
  const [localQuery, setLocalQuery] = useState('')
  const debouncedQuery = useDebounce(localQuery, 300)

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  }, [debouncedQuery, setSearchQuery])

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="搜索院校/专业，支持拼音首字母..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white
                   text-slate-800 placeholder-slate-400 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {localQuery && (
        <button
          onClick={() => setLocalQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
        >
          ✕
        </button>
      )}
    </div>
  )
}
