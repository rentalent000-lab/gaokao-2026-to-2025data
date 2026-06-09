# 开发日志

## 2026-06-09 — 阶段一 + 阶段二 完成

### 阶段一：项目脚手架 + 数据转换 ✅

- [x] 初始化 Vite + React 18 + TypeScript 项目
- [x] 配置 Tailwind CSS v4 + Vite 插件
- [x] 安装运行时依赖: zustand, @tanstack/react-virtual
- [x] 编写 TypeScript 类型定义 (`src/data/types.ts`)
- [x] 编写 Python Excel → JSON 转换脚本 (`scripts/convert_excel_to_json.py`)
- [x] 运行脚本，生成 4 个数据分片文件:
  - `wuli_benke.json`: 16,382 条, 14.4 MB
  - `wuli_zhuanke.json`: 4,737 条, 3.1 MB
  - `lishi_benke.json`: 5,836 条, 4.9 MB
  - `lishi_zhuanke.json`: 3,660 条, 2.4 MB
  - `_lookup.json`: 32 省 / 349 市 / 30 学校类型
- [x] 实现 IndexedDB 缓存加载逻辑 (`src/utils/loadData.ts`)
- [x] ✅ `npm run build` 通过

### 阶段二：核心筛选逻辑 ✅

- [x] 选科匹配算法 —— 超集逻辑 (`src/utils/subjectMatch.ts`)
- [x] 位次范围筛选 + 冲稳保分类 (`src/utils/filter.ts`)
- [x] 智能搜索 —— 中文 + 拼音首字母 (`src/utils/search.ts`)
- [x] 排序逻辑 (`src/utils/sort.ts`)
- [x] Zustand 筛选状态管理 (`src/store/useFilterStore.ts`)
- [x] Zustand 数据状态管理 (`src/store/useDataStore.ts`)
- [x] useFilteredData hook —— 组合筛选+排序 (`src/hooks/useFilteredData.ts`)
- [x] useDebounce hook (`src/hooks/useDebounce.ts`)

### 修复记录
- 修复 npm 缓存权限问题（使用 `--cache /tmp/npm-cache`）
- 修复 Python 3.9 类型注解兼容（`from __future__ import annotations`）
- 修复 Excel 列索引偏移（14-17, 25-27, 30-32, 35-37, 43-67 区域全部修正）

### 当前状态
- 项目可成功构建（`npm run build` ✓）
- App.tsx 为占位页面
- 共 30,615 条有效数据记录已转换

### 下一步
- **阶段三**：UI 框架 —— 页面布局 + 位次/选科输入组件 + 批次切换 + 搜索框
