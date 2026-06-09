import { useEffect, useRef } from 'react'
import { useFilterStore } from '../store/useFilterStore'
import { useDataStore } from '../store/useDataStore'
import { loadDataFile } from '../utils/loadData'
import type { Kelei } from '../data/types'

/** 科类 → 数据分片键映射 */
function getDataKeys(kelei: Kelei): string[] {
  return kelei === '物理'
    ? ['wuli_benke', 'wuli_zhuanke']
    : ['lishi_benke', 'lishi_zhuanke']
}

/**
 * 监听科类变化，自动加载对应数据
 */
export function useDataLoader() {
  const kelei = useFilterStore((s) => s.kelei)
  const loadedKey = useDataStore((s) => s.loadedKey)
  const setRawData = useDataStore((s) => s.setRawData)
  const setIsLoading = useDataStore((s) => s.setIsLoading)
  const setLoadProgress = useDataStore((s) => s.setLoadProgress)
  const setLoadError = useDataStore((s) => s.setLoadError)

  const loadingRef = useRef(false)

  useEffect(() => {
    if (!kelei) return
    if (loadingRef.current) return

    // 检查是否已加载相同科类的数据
    const expectedPrefix = kelei === '物理' ? 'wuli' : 'lishi'
    if (loadedKey?.startsWith(expectedPrefix)) return

    const load = async () => {
      loadingRef.current = true
      setIsLoading(true)
      setLoadProgress(0)
      setLoadError(null)

      try {
        const keys = getDataKeys(kelei)
        const allData: Awaited<ReturnType<typeof loadDataFile>>[] = []

        for (let i = 0; i < keys.length; i++) {
          const data = await loadDataFile(keys[i], (pct) => {
            // 总体进度：每个分片占 50%
            const overall = Math.round((i * 100 + pct) / keys.length)
            setLoadProgress(overall)
          })
          allData.push(data)
        }

        const merged = allData.flat()
        setRawData(merged, expectedPrefix)
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : '加载失败')
      } finally {
        loadingRef.current = false
      }
    }

    load()
  }, [kelei, loadedKey, setRawData, setIsLoading, setLoadProgress, setLoadError])
}
