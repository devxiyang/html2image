<div align="center">

# 📸 HTML2Image

**🚀 Lightning-fast HTML to Image conversion using HTML5 Canvas and SVG**

[![NPM Version](https://img.shields.io/npm/v/modern-screenshot?style=flat-square&color=blue)](https://www.npmjs.com/package/modern-screenshot)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/modern-screenshot?style=flat-square&color=green)](https://bundlephobia.com/package/modern-screenshot)
[![Downloads](https://img.shields.io/npm/dm/modern-screenshot?style=flat-square&color=orange)](https://www.npmjs.com/package/modern-screenshot)
[![License](https://img.shields.io/github/license/devxiyang/html2image?style=flat-square&color=red)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

*Transform any DOM element into high-quality images with ease*

[🎯 Features](#-features) • [📦 Installation](#-installation) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-api-reference) • [💡 Examples](#-examples)

</div>

---

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

```bash
# npm
npm install modern-screenshot

# yarn
yarn add modern-screenshot

# pnpm
pnpm add modern-screenshot
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { domToPng } from 'modern-screenshot'

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
import { domToPng } from 'modern-screenshot'

const dataUrl = await domToPng(element, {
  width: 1920,
  height: 1080,
  scale: 2,
  backgroundColor: '#ffffff',
  style: {
    transform: 'scale(1.5)',
    'transform-origin': 'top left'
  }
})
```

## 🌐 CDN Usage

```html
<script src="https://unpkg.com/modern-screenshot"></script>
<script>
  modernScreenshot.domToPng(document.body).then(dataUrl => {
    console.log('Screenshot ready:', dataUrl)
  })
</script>
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
import { domToPng } from 'modern-screenshot'

// Capture a chart with high DPI
const chart = document.querySelector('#my-chart')
const imageUrl = await domToPng(chart, {
  scale: 2, // 2x resolution for crisp images
  backgroundColor: 'white'
})
```

### 🎨 Custom Styling

```typescript
import { domToJpeg } from 'modern-screenshot'

const element = document.querySelector('#content')
const imageUrl = await domToJpeg(element, {
  quality: 0.95,
  style: {
    transform: 'scale(0.8)',
    border: '2px solid #333',
    'border-radius': '8px'
  }
})
```

### ⚡ High-Performance Batch Processing

```typescript
import { createContext, destroyContext, domToPng } from 'modern-screenshot'

// Create context once for multiple screenshots
const context = await createContext(document.querySelector('#app'), {
  workerUrl: '/modern-screenshot-worker.js',
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
import { domToPng } from 'modern-screenshot'

const imageUrl = await domToPng(element, {
  progress: (current, total) => {
    console.log(`Processing: ${current}/${total} (${Math.round(current/total*100)}%)`)
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

**Made with ❤️ by the HTML2Image team**

[⭐ Star us on GitHub](https://github.com/devxiyang/html2image) • [🐛 Report Issues](https://github.com/devxiyang/html2image/issues) • [💬 Discussions](https://github.com/devxiyang/html2image/discussions)

</div>
