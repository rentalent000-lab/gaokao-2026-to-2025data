import { useFilterStore } from '../../store/useFilterStore'

const PRIMARY = ['物理', '历史']
const SECONDARY = ['化学', '生物', '政治', '地理']

export function SubjectSelector() {
  const kelei = useFilterStore((s) => s.kelei)
  const studentSubjects = useFilterStore((s) => s.studentSubjects)
  const setStudentSubjects = useFilterStore((s) => s.setStudentSubjects)

  const toggleSubject = (subj: string) => {
    if (studentSubjects.includes(subj)) {
      setStudentSubjects(studentSubjects.filter((s) => s !== subj))
    } else {
      setStudentSubjects([...studentSubjects, subj])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        ④ 你的选科
      </label>

      {/* 首选科目 */}
      <div className="mb-3">
        <span className="text-xs text-slate-400 mb-1.5 block">首选（二选一）</span>
        <div className="flex gap-2">
          {PRIMARY.map((subj) => {
            const isKelei = kelei === subj
            const isSelected = studentSubjects.includes(subj)
            return (
              <button
                key={subj}
                onClick={() => {
                  // 切换科类 + 更新选科
                  if (!isKelei) {
                    useFilterStore.getState().setKelei(subj as '物理' | '历史')
                  }
                  toggleSubject(subj)
                }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all cursor-pointer
                  ${isSelected
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {subj}
              </button>
            )
          })}
        </div>
      </div>

      {/* 再选科目 */}
      <div>
        <span className="text-xs text-slate-400 mb-1.5 block">再选（四选二）</span>
        <div className="flex gap-2 flex-wrap">
          {SECONDARY.map((subj) => {
            const isSelected = studentSubjects.includes(subj)
            return (
              <button
                key={subj}
                onClick={() => toggleSubject(subj)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all cursor-pointer
                  ${isSelected
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {subj}
              </button>
            )
          })}
        </div>
      </div>

      {studentSubjects.length > 0 && (
        <p className="text-xs text-slate-400 mt-2">
          当前选择：{studentSubjects.join(' + ')}
        </p>
      )}
    </div>
  )
}
