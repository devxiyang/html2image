import type { Context } from '../context'
import { replaceCssUrlToDataUrl } from '../styles/css-url'
import { IN_FIREFOX, IN_SAFARI } from '../utils/utils'

const properties = [
  'background-image',
  'border-image-source',
  '-webkit-border-image',
  '-webkit-mask-image',
  'list-style-image',
]

function isInlineSvg(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.startsWith('url("data:image/svg+xml')
    || trimmed.startsWith('url(\'data:image/svg+xml')
}

export function embedCssStyleImage(
  style: CSSStyleDeclaration,
  context: Context,
): Promise<void>[] {
  return properties
    .map((property) => {
      const value = style.getPropertyValue(property)
      if (!value || value === 'none') {
        return null
      }
      // Skip processing if it's an inline SVG for background-image
      if (property === 'background-image' && isInlineSvg(value)) {
        return null
      }
      if (IN_SAFARI || IN_FIREFOX) {
        context.drawImageCount++
      }
      return replaceCssUrlToDataUrl(value, null, context, true).then((newValue) => {
        if (!newValue || value === newValue)
          return
        style.setProperty(
          property,
          newValue,
          style.getPropertyPriority(property),
        )
      })
    })
    .filter(Boolean) as Promise<void>[]
}
