<div align="center">

# 📸 HTML2Image

**🚀 使用 HTML5 Canvas 和 SVG 实现闪电般快速的 HTML 转图片转换**

[![Website](https://img.shields.io/badge/Website-html2image.pro-blue?style=flat-square)](https://html2image.pro)
[![NPM Version](https://img.shields.io/npm/v/@devxiyang/html2image?style=flat-square&color=blue)](https://www.npmjs.com/package/@devxiyang/html2image)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devxiyang/html2image?style=flat-square&color=green)](https://bundlephobia.com/package/@devxiyang/html2image)
[![Downloads](https://img.shields.io/npm/dm/@devxiyang/html2image?style=flat-square&color=orange)](https://www.npmjs.com/package/@devxiyang/html2image)
[![License](https://img.shields.io/github/license/devxiyang/html2image?style=flat-square&color=red)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

*轻松将任何 DOM 元素转换为高质量图片*

[🌐 官方网站](https://html2image.pro) • [🎯 特性](#-特性) • [📦 安装](#-安装) • [🚀 快速开始](#-快速开始) • [📖 文档](#-api-参考) • [💡 示例](#-示例)

</div>

---

## 🌐 官方网站

访问我们的官方网站 [html2image.pro](https://html2image.pro) 获取：
- 🎨 在线演示和游乐场
- 📚 完整文档
- 💡 高级使用示例
- 🛠️ API 浏览器
- 🔧 配置生成器

## ✨ 特性

- 🎯 **零依赖** - 轻量级且自包含
- 🚀 **高性能** - 使用 Web Workers 和上下文重用优化
- 🎨 **多种格式** - 支持 PNG、JPEG、WebP、SVG、Canvas、Blob
- 📱 **跨平台** - 支持所有现代浏览器
- 🔧 **TypeScript 支持** - 包含完整的类型定义
- 🌐 **现代 API** - 基于 Promise 并支持 async/await
- 🎛️ **高度可配置** - 提供丰富的自定义选项
- 📏 **像素完美** - 保持精确的样式和布局

## 📦 安装

### 包管理器

```bash
# npm
npm install @devxiyang/html2image

# yarn
yarn add @devxiyang/html2image

# pnpm
pnpm add @devxiyang/html2image
```

### 在线体验

访问我们的[游乐场](https://html2image.pro/playground)直接在浏览器中体验 HTML2Image，无需安装。

## 🚀 快速开始

### 基础用法

```typescript
import { domToPng } from '@devxiyang/html2image'

// 将任何元素转换为 PNG
const element = document.querySelector('#my-element')
const dataUrl = await domToPng(element)

// 下载图片
const link = document.createElement('a')
link.download = 'screenshot.png'
link.href = dataUrl
link.click()
```

### 使用选项

```typescript
import { domToPng } from '@devxiyang/html2image'

const dataUrl = await domToPng(element, {
  width: 1920,
  height: 1080,
  scale: 2,
  backgroundColor: '#ffffff',
  style: {
    'transform': 'scale(1.5)',
    'transform-origin': 'top left'
  }
})
```

## 📖 API 参考

### 核心方法

| 方法 | 输出类型 | 描述 |
|--------|-------------|-------------|
| `domToPng(node, options?)` | Data URL | 转换为 PNG 格式 |
| `domToJpeg(node, options?)` | Data URL | 转换为 JPEG 格式 |
| `domToWebp(node, options?)` | Data URL | 转换为 WebP 格式 |
| `domToSvg(node, options?)` | Data URL | 转换为 SVG 格式 |
| `domToCanvas(node, options?)` | HTMLCanvasElement | 转换为 Canvas 元素 |
| `domToBlob(node, options?)` | Blob | 转换为 Blob 对象 |
| `domToPixel(node, options?)` | ImageData | 转换为像素数据 |

### 高级方法

| 方法 | 描述 |
|--------|-------------|
| `createContext(node, options?)` | 创建用于批量操作的可重用上下文 |
| `destroyContext(context)` | 清理上下文资源 |
| `domToForeignObjectSvg(node, options?)` | 使用 SVG foreignObject 转换 |
| `domToImage(node, options?)` | 转换为 HTMLImageElement |

### 选项接口

```typescript
interface Options {
  // 尺寸
  width?: number
  height?: number
  scale?: number

  // 质量和格式
  quality?: number
  backgroundColor?: string

  // 过滤
  filter?: (node: Element) => boolean

  // 样式
  style?: Record<string, string>

  // 高级
  cacheBust?: boolean
  imagePlaceholder?: string
  skipAutoScale?: boolean
  debug?: boolean

  // 回调
  progress?: (current: number, total: number) => void

  // Web Worker
  workerUrl?: string
  workerNumber?: number
}
```

## 💡 示例

### 📊 转换图表为图片

```typescript
import { domToPng } from '@devxiyang/html2image'

// 以高 DPI 捕获图表
const chart = document.querySelector('#my-chart')
const imageUrl = await domToPng(chart, {
  scale: 2, // 2x 分辨率以获得清晰图片
  backgroundColor: 'white'
})
```

### 🎨 自定义样式

```typescript
import { domToJpeg } from '@devxiyang/html2image'

const element = document.querySelector('#content')
const imageUrl = await domToJpeg(element, {
  quality: 0.95,
  style: {
    'transform': 'scale(0.8)',
    'border': '2px solid #333',
    'border-radius': '8px'
  }
})
```

### ⚡ 高性能批量处理

```typescript
import { createContext, destroyContext, domToPng } from '@devxiyang/html2image'

// 创建上下文用于多次截图
const context = await createContext(document.querySelector('#app'), {
  workerUrl: '/html2image-worker.js',
  workerNumber: 2
})

// 高效地进行多次截图
const screenshots = await Promise.all([
  domToPng(context),
  domToPng(context),
  domToPng(context)
])

// 清理
destroyContext(context)
```

### 🎯 进度跟踪

```typescript
import { domToPng } from '@devxiyang/html2image'

const imageUrl = await domToPng(element, {
  progress: (current, total) => {
    console.log(`处理中: ${current}/${total} (${Math.round(current / total * 100)}%)`)
  }
})
```

## 🔧 高级配置

### 自定义图片占位符

```typescript
const options = {
  imagePlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+'
}
```

### 元素过滤

```typescript
const options = {
  filter: (node) => {
    // 跳过带有 'no-screenshot' 类的元素
    return !node.classList?.contains('no-screenshot')
  }
}
```

## 🌟 使用场景

- 📊 **数据可视化** - 导出图表和图形
- 🎨 **设计工具** - 截图设计组件
- 📱 **社交媒体** - 生成预览图片
- 📋 **报告** - 将 HTML 报告转换为图片
- 🎮 **游戏** - 捕获游戏状态
- 📚 **文档** - 生成可视化文档

## 🤝 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m '添加一些很棒的特性'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 基于 [modern-screenshot](https://github.com/qq15725/modern-screenshot) 构建
- 灵感来自 [html-to-image](https://github.com/bubkoo/html-to-image)

---

<div align="center">

**Made with ❤️ by [@devxiyang](https://x.com/devxiyang)**

[🌐 官方网站](https://html2image.pro) • [⭐ GitHub](https://github.com/devxiyang/html2image) • [🐛 问题反馈](https://github.com/devxiyang/html2image/issues) • [💬 讨论](https://github.com/devxiyang/html2image/discussions)

</div>

---

<div align="center">

<sub>© 2024 HTML2Image. All rights reserved.</sub>
<sub>访问 [html2image.pro](https://html2image.pro) 获取更多信息。</sub>

</div>
