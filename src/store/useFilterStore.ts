import { create } from 'zustand'
import type { Kelei, BatchType, SortKey } from '../data/types'
import { DEFAULT_FILTER_STATE } from '../data/types'

interface FilterState {
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
  selectedSchoolTags: string[]
  selectedSchoolTypes: string[]
  tuitionMin: number | null
  tuitionMax: number | null
  baoyanMin: number | null
  baoyanMax: number | null
  selectedDisciplines: string[]
  publicPrivate: string[]

  // 搜索
  searchQuery: string

  // 排序
  sortKey: SortKey
  sortDirection: 'asc' | 'desc'

  // UI 选项
  show2024Data: boolean
  showDisciplineEval: boolean

  // Actions
  setKelei: (k: Kelei) => void
  setExactRank: (r: number | null) => void
  setRankRange: (n: number) => void
  setStudentSubjects: (subjects: string[]) => void
  setActiveBatch: (b: BatchType) => void
  toggleProvince: (p: string) => void
  toggleCity: (c: string) => void
  toggleCityTier: (t: string) => void
  toggleSchoolTag: (t: string) => void
  toggleSchoolType: (t: string) => void
  setTuitionRange: (min: number | null, max: number | null) => void
  setBaoyanRange: (min: number | null, max: number | null) => void
  toggleDiscipline: (d: string) => void
  togglePublicPrivate: (pp: string) => void
  setSearchQuery: (q: string) => void
  setSortKey: (k: SortKey) => void
  setSortDirection: (d: 'asc' | 'desc') => void
  toggleShow2024Data: () => void
  toggleShowDisciplineEval: () => void
  resetFilters: () => void
  /** 是否有任何活跃筛选 */
  hasActiveFilters: () => boolean
}

export const useFilterStore = create<FilterState>((set, get) => ({
  ...DEFAULT_FILTER_STATE,

  setKelei: (k) => set({ kelei: k }),
  setExactRank: (r) => set({ exactRank: r }),
  setRankRange: (n) => set({ rankRange: n }),
  setStudentSubjects: (subjects) => set({ studentSubjects: subjects }),
  setActiveBatch: (b) => set({ activeBatch: b }),

  toggleProvince: (p) =>
    set((s) => ({
      selectedProvinces: s.selectedProvinces.includes(p)
        ? s.selectedProvinces.filter((x) => x !== p)
        : [...s.selectedProvinces, p],
    })),

  toggleCity: (c) =>
    set((s) => ({
      selectedCities: s.selectedCities.includes(c)
        ? s.selectedCities.filter((x) => x !== c)
        : [...s.selectedCities, c],
    })),

  toggleCityTier: (t) =>
    set((s) => ({
      selectedCityTiers: s.selectedCityTiers.includes(t)
        ? s.selectedCityTiers.filter((x) => x !== t)
        : [...s.selectedCityTiers, t],
    })),

  toggleSchoolTag: (t) =>
    set((s) => ({
      selectedSchoolTags: s.selectedSchoolTags.includes(t)
        ? s.selectedSchoolTags.filter((x) => x !== t)
        : [...s.selectedSchoolTags, t],
    })),

  toggleSchoolType: (t) =>
    set((s) => ({
      selectedSchoolTypes: s.selectedSchoolTypes.includes(t)
        ? s.selectedSchoolTypes.filter((x) => x !== t)
        : [...s.selectedSchoolTypes, t],
    })),

  setTuitionRange: (min, max) => set({ tuitionMin: min, tuitionMax: max }),
  setBaoyanRange: (min, max) => set({ baoyanMin: min, baoyanMax: max }),

  toggleDiscipline: (d) =>
    set((s) => ({
      selectedDisciplines: s.selectedDisciplines.includes(d)
        ? s.selectedDisciplines.filter((x) => x !== d)
        : [...s.selectedDisciplines, d],
    })),

  togglePublicPrivate: (pp) =>
    set((s) => ({
      publicPrivate: s.publicPrivate.includes(pp)
        ? s.publicPrivate.filter((x) => x !== pp)
        : [...s.publicPrivate, pp],
    })),

  setSearchQuery: (q) => set({ searchQuery: q }),
  setSortKey: (k) => set({ sortKey: k }),
  setSortDirection: (d) => set({ sortDirection: d }),
  toggleShow2024Data: () => set((s) => ({ show2024Data: !s.show2024Data })),
  toggleShowDisciplineEval: () => set((s) => ({ showDisciplineEval: !s.showDisciplineEval })),

  resetFilters: () =>
    set({
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
    }),

  hasActiveFilters: () => {
    const s = get()
    return (
      s.selectedProvinces.length > 0 ||
      s.selectedCities.length > 0 ||
      s.selectedCityTiers.length > 0 ||
      s.selectedSchoolTags.length > 0 ||
      s.selectedSchoolTypes.length > 0 ||
      s.tuitionMin !== null ||
      s.tuitionMax !== null ||
      s.baoyanMin !== null ||
      s.baoyanMax !== null ||
      s.selectedDisciplines.length > 0 ||
      s.publicPrivate.length > 0 ||
      s.searchQuery !== ''
    )
  },
}))
