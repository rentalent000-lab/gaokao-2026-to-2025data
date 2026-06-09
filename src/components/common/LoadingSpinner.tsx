interface Props {
  progress?: number
  message?: string
}

export function LoadingSpinner({ progress, message = '数据加载中...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-sm">{message}</p>
      {progress !== undefined && progress > 0 && (
        <div className="w-48 mt-4">
          <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1 text-center">{progress}%</p>
        </div>
      )}
    </div>
  )
}
