import type { Context } from '../context'
import type { Options } from '../utils/options'
import { cloneNode } from '../clone/clone-node'
import { embedNode } from '../embeded/embed-node'
import { embedWebFont } from '../embeded/embed-web-font'
import { orCreateContext } from '../utils/create-context'
import { destroyContext } from '../utils/destroy-context'
import {
  createSvg,
  isElementNode,
  isSVGElementNode,
} from '../utils/utils'

export async function domToForeignObjectSvg<T extends Node>(node: T, options?: Options): Promise<SVGElement>
export async function domToForeignObjectSvg<T extends Node>(context: Context<T>): Promise<SVGElement>
export async function domToForeignObjectSvg(node: any, options?: any): Promise<SVGElement> {
  const context = await orCreateContext(node, options)

  if (isElementNode(context.node) && isSVGElementNode(context.node))
    return context.node

  const {
    ownerDocument,
    log,
    tasks,
    svgStyleElement,
    svgDefsElement,
    svgStyles,
    font,
    progress,
    autoDestruct,
    onCloneNode,
    onEmbedNode,
    onCreateForeignObjectSvg,
  } = context

  log.time('clone node')
  const clone = await cloneNode(context.node, context, true)
  if (svgStyleElement && ownerDocument) {
    let allCssText = ''
    svgStyles.forEach((klasses: string[], cssText: string) => {
      allCssText += `${klasses.join(',\n')} {\n  ${cssText}\n}\n`
    })
    svgStyleElement.appendChild(ownerDocument.createTextNode(allCssText))
  }
  log.timeEnd('clone node')

  await onCloneNode?.(clone)

  if (font !== false && isElementNode(clone)) {
    log.time('embed web font')
    await embedWebFont(clone, context)
    log.timeEnd('embed web font')
  }

  log.time('embed node')
  embedNode(clone, context)
  const count = tasks.length
  let current = 0
  const runTask = async (): Promise<void> => {
    while (true) {
      const task = tasks.pop()
      if (!task)
        break
      try {
        await task
      }
      catch (error) {
        context.log.warn('Failed to run task', error)
      }
      progress?.(++current, count)
    }
  }
  progress?.(current, count)
  await Promise.all([...Array.from({ length: 4 })].map(runTask))
  log.timeEnd('embed node')

  await onEmbedNode?.(clone)

  const svg = createForeignObjectSvg(clone, context)
  svgDefsElement && svg.insertBefore(svgDefsElement, svg.children[0])
  svgStyleElement && svg.insertBefore(svgStyleElement, svg.children[0])

  autoDestruct && destroyContext(context)

  await onCreateForeignObjectSvg?.(svg)

  return svg
}

function createForeignObjectSvg(clone: Node, context: Context): SVGSVGElement {
  const { width, height } = context
  const svg = createSvg(width, height, clone.ownerDocument)
  const foreignObject = svg.ownerDocument.createElementNS(svg.namespaceURI, 'foreignObject')
  foreignObject.setAttributeNS(null, 'x', '0%')
  foreignObject.setAttributeNS(null, 'y', '0%')
  foreignObject.setAttributeNS(null, 'width', '100%')
  foreignObject.setAttributeNS(null, 'height', '100%')
  foreignObject.append(clone)
  svg.appendChild(foreignObject)
  return svg
}
