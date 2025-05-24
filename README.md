<div align="center">

# 📸 HTML2Image

**🚀 Lightning-fast HTML to Image conversion using HTML5 Canvas and SVG**

[![Website](https://img.shields.io/badge/Website-html2image.pro-blue?style=flat-square)](https://html2image.pro)
[![NPM Version](https://img.shields.io/npm/v/@devxiyang/html2image?style=flat-square&color=blue)](https://www.npmjs.com/package/@devxiyang/html2image)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devxiyang/html2image?style=flat-square&color=green)](https://bundlephobia.com/package/@devxiyang/html2image)
[![Downloads](https://img.shields.io/npm/dm/@devxiyang/html2image?style=flat-square&color=orange)](https://www.npmjs.com/package/@devxiyang/html2image)
[![License](https://img.shields.io/github/license/devxiyang/html2image?style=flat-square&color=red)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

*Transform any DOM element into high-quality images with ease*

[🌐 Website](https://html2image.pro) • [🎯 Features](#-features) • [📦 Installation](#-installation) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-api-reference) • [💡 Examples](#-examples)

</div>

---

## 🌐 Official Website

Visit our official website at [html2image.pro](https://html2image.pro) for:
- 🎨 Live Demo & Playground
- 📚 Comprehensive Documentation
- 💡 Advanced Usage Examples
- 🛠️ API Explorer
- 🔧 Configuration Generator

## ✨ Features

- 🎯 **Zero Dependencies** - Lightweight and self-contained
- 🚀 **High Performance** - Optimized with Web Workers and context reuse
- 🎨 **Multiple Formats** - PNG, JPEG, WebP, SVG, Canvas, Blob support
- 📱 **Cross-Platform** - Works in all modern browsers
- 🔧 **TypeScript Ready** - Full type definitions included
- 🌐 **Modern API** - Promise-based with async/await support
- 🎛️ **Highly Configurable** - Extensive options for customization
- 📏 **Pixel Perfect** - Maintains exact styling and layout

## 📦 Installation

### Package Manager

```bash
# npm
npm install @devxiyang/html2image

# yarn
yarn add @devxiyang/html2image

# pnpm
pnpm add @devxiyang/html2image
```

### Try Online

Visit our [Playground](https://html2image.pro/playground) to try HTML2Image directly in your browser without installation.

## 🚀 Quick Start

### Basic Usage

```typescript
import { domToPng } from '@devxiyang/html2image'

// Convert any element to PNG
const element = document.querySelector('#my-element')
const dataUrl = await domToPng(element)

// Download the image
const link = document.createElement('a')
link.download = 'screenshot.png'
link.href = dataUrl
link.click()
```

### With Options

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

## 📖 API Reference

### Core Methods

| Method | Output Type | Description |
|--------|-------------|-------------|
| `domToPng(node, options?)` | Data URL | Convert to PNG format |
| `domToJpeg(node, options?)` | Data URL | Convert to JPEG format |
| `domToWebp(node, options?)` | Data URL | Convert to WebP format |
| `domToSvg(node, options?)` | Data URL | Convert to SVG format |
| `domToCanvas(node, options?)` | HTMLCanvasElement | Convert to Canvas element |
| `domToBlob(node, options?)` | Blob | Convert to Blob object |
| `domToPixel(node, options?)` | ImageData | Convert to pixel data |

### Advanced Methods

| Method | Description |
|--------|-------------|
| `createContext(node, options?)` | Create reusable context for batch operations |
| `destroyContext(context)` | Clean up context resources |
| `domToForeignObjectSvg(node, options?)` | Convert using SVG foreignObject |
| `domToImage(node, options?)` | Convert to HTMLImageElement |

### Options Interface

```typescript
interface Options {
  // Dimensions
  width?: number
  height?: number
  scale?: number

  // Quality & Format
  quality?: number
  backgroundColor?: string

  // Filtering
  filter?: (node: Element) => boolean

  // Styling
  style?: Record<string, string>

  // Advanced
  cacheBust?: boolean
  imagePlaceholder?: string
  skipAutoScale?: boolean
  debug?: boolean

  // Callbacks
  progress?: (current: number, total: number) => void

  // Web Worker
  workerUrl?: string
  workerNumber?: number
}
```

## 💡 Examples

### 📊 Convert Chart to Image

```typescript
import { domToPng } from '@devxiyang/html2image'

// Capture a chart with high DPI
const chart = document.querySelector('#my-chart')
const imageUrl = await domToPng(chart, {
  scale: 2, // 2x resolution for crisp images
  backgroundColor: 'white'
})
```

### 🎨 Custom Styling

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

### ⚡ High-Performance Batch Processing

```typescript
import { createContext, destroyContext, domToPng } from '@devxiyang/html2image'

// Create context once for multiple screenshots
const context = await createContext(document.querySelector('#app'), {
  workerUrl: '/html2image-worker.js',
  workerNumber: 2
})

// Take multiple screenshots efficiently
const screenshots = await Promise.all([
  domToPng(context),
  domToPng(context),
  domToPng(context)
])

// Clean up
destroyContext(context)
```

### 🎯 Progress Tracking

```typescript
import { domToPng } from '@devxiyang/html2image'

const imageUrl = await domToPng(element, {
  progress: (current, total) => {
    console.log(`Processing: ${current}/${total} (${Math.round(current / total * 100)}%)`)
  }
})
```

## 🔧 Advanced Configuration

### Custom Image Placeholder

```typescript
const options = {
  imagePlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+'
}
```

### Element Filtering

```typescript
const options = {
  filter: (node) => {
    // Skip elements with 'no-screenshot' class
    return !node.classList?.contains('no-screenshot')
  }
}
```

## 🌟 Use Cases

- 📊 **Data Visualization** - Export charts and graphs
- 🎨 **Design Tools** - Screenshot design components
- 📱 **Social Media** - Generate preview images
- 📋 **Reports** - Convert HTML reports to images
- 🎮 **Gaming** - Capture game states
- 📚 **Documentation** - Generate visual documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of [modern-screenshot](https://github.com/qq15725/modern-screenshot)
- Inspired by [html-to-image](https://github.com/bubkoo/html-to-image)

---

<div align="center">

**Made with ❤️ by [@devxiyang](https://x.com/devxiyang)**

[🌐 Official Website](https://html2image.pro) • [⭐ Star us on GitHub](https://github.com/devxiyang/html2image) • [🐛 Report Issues](https://github.com/devxiyang/html2image/issues) • [💬 Discussions](https://github.com/devxiyang/html2image/discussions)

</div>

---

<div align="center">

<sub>© 2024 HTML2Image. All rights reserved.</sub>
<sub>Visit [html2image.pro](https://html2image.pro) for more information.</sub>

</div>
