/**
 * JSON 数据加载 + IndexedDB 缓存
 * 首次加载从网络获取并缓存，后续访问直接从 IndexedDB 读取
 */
import type { MajorRow } from '../data/types'

const DB_NAME = 'jinhuigaokao'
const DB_VERSION = 1
const STORE_NAME = 'data'

/** 缓存版本 key —— 修改此值可强制刷新缓存 */
const CACHE_VERSION_KEY = 'data_version'
const CURRENT_VERSION = '2025-v1'

/** 数据分片配置 */
export const DATA_FILES: Record<string, { file: string; label: string }> = {
  wuli_benke: { file: '/data/wuli_benke.json', label: '物理-本科' },
  wuli_zhuanke: { file: '/data/wuli_zhuanke.json', label: '物理-专科' },
  lishi_benke: { file: '/data/lishi_benke.json', label: '历史-本科' },
  lishi_zhuanke: { file: '/data/lishi_zhuanke.json', label: '历史-专科' },
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getFromCache(key: string): Promise<MajorRow[] | null> {
  try {
    // 检查版本
    const cachedVersion = localStorage.getItem(CACHE_VERSION_KEY)
    if (cachedVersion !== CURRENT_VERSION) return null

    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const request = store.get(key)
      request.onsuccess = () => resolve(request.result ?? null)
      request.onerror = () => resolve(null)
      tx.oncomplete = () => db.close()
    })
  } catch {
    return null
  }
}

async function saveToCache(key: string, data: MajorRow[]): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.put(data, key)
      tx.oncomplete = () => {
        localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION)
        db.close()
        resolve()
      }
      tx.onerror = () => {
        db.close()
        resolve()
      }
    })
  } catch {
    // 缓存失败不影响使用
  }
}

/**
 * 加载数据：优先 IndexedDB 缓存，否则 fetch
 * @param key 数据分片键 (如 'wuli_benke')
 * @param onProgress 进度回调 (0-100)
 */
export async function loadDataFile(
  key: string,
  onProgress?: (pct: number) => void
): Promise<MajorRow[]> {
  const fileInfo = DATA_FILES[key]
  if (!fileInfo) throw new Error(`未知数据分片: ${key}`)

  // 1. 尝试缓存
  const cached = await getFromCache(key)
  if (cached && cached.length > 0) {
    onProgress?.(100)
    return cached
  }

  // 2. 从网络加载
  onProgress?.(0)
  const response = await fetch(fileInfo.file)
  if (!response.ok) throw new Error(`加载失败: ${response.status}`)

  const contentLength = response.headers.get('content-length')
  const total = contentLength ? parseInt(contentLength, 10) : 0
  let loaded = 0

  // 流式读取以追踪进度
  const reader = response.body?.getReader()
  if (reader && total > 0) {
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      loaded += value.length
      onProgress?.(Math.round((loaded / total) * 90)) // 留 10% 给解析
    }
    const blob = new Blob(chunks as BlobPart[])
    const text = await blob.text()
    onProgress?.(95)
    const data = JSON.parse(text) as MajorRow[]
    onProgress?.(100)

    // 3. 存入缓存
    saveToCache(key, data)
    return data
  }

  // 降级：直接 JSON 解析
  const text = await response.text()
  onProgress?.(95)
  const data = JSON.parse(text) as MajorRow[]
  onProgress?.(100)

  saveToCache(key, data)
  return data
}

/** 清除所有缓存 */
export async function clearCache(): Promise<void> {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.clear()
    tx.oncomplete = () => {
      localStorage.removeItem(CACHE_VERSION_KEY)
      db.close()
    }
  } catch {
    // ignore
  }
}
