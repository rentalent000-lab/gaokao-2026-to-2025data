import { create } from 'zustand'
import type { MajorRow } from '../data/types'

interface DataState {
  /** 当前加载的所有原始数据 */
  rawData: MajorRow[]
  /** 是否正在加载 */
  isLoading: boolean
  /** 加载进度 0-100 */
  loadProgress: number
  /** 加载错误信息 */
  loadError: string | null
  /** 当前已加载的数据键 */
  loadedKey: string | null

  setRawData: (data: MajorRow[], key: string) => void
  setIsLoading: (v: boolean) => void
  setLoadProgress: (p: number) => void
  setLoadError: (e: string | null) => void
}

export const useDataStore = create<DataState>((set) => ({
  rawData: [],
  isLoading: false,
  loadProgress: 0,
  loadError: null,
  loadedKey: null,

  setRawData: (data, key) => set({ rawData: data, loadedKey: key, isLoading: false, loadProgress: 100 }),
  setIsLoading: (v) => set({ isLoading: v, loadError: null }),
  setLoadProgress: (p) => set({ loadProgress: p }),
  setLoadError: (e) => set({ loadError: e, isLoading: false }),
}))
