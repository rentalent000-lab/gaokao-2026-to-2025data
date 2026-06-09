# 🎓 晋辉高考数据分析卡

2025年山西省高考志愿填报 · 专业组查询工具

## 功能

- 输入**位次**和**选科**，快速筛选匹配的院校专业组
- **冲 / 稳 / 保** 自动分类，直观判断风险
- **多维度筛选**：省份、城市、院校标签（985/211/双一流）、学校类型、学费、保研率、学科评估
- **智能搜索**：支持中文院校名、专业名、拼音首字母
- **批次分离**：本科批 / 提前批A/B/C段 / 高职专科批 独立展示
- **详细信息**：2023-2025三年录取数据对比、学科评估、硕博点、院校水平

## 技术

纯前端应用，部署后即可使用：

```bash
npm install
npm run dev    # 本地开发
npm run build  # 生产构建
```

数据缓存到浏览器 IndexedDB，首次加载后秒开。

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 [GitHub](https://github.com/new) 创建新仓库（名称随意，如 `gaokao-data`）。

### 2. 推送代码

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 3. 启用 GitHub Pages

仓库 → Settings → Pages → Source 选择 **GitHub Actions**

推送后自动部署，几分钟后通过 `https://你的用户名.github.io/仓库名/` 访问。

## 数据更新

如需更新数据：

1. 替换 `~/Desktop/📊山西高考数据/` 下的 Excel 源文件
2. 运行 `python3 scripts/convert_excel_to_json.py`
3. 重新构建部署

## 项目文档

- [开发需求文档](docs/开发需求文档.md)
- [技术设计规范](docs/技术设计规范.md)
- [执行步骤](docs/执行步骤.md)
