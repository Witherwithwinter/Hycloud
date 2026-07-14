import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import 'highlight.js/styles/github.css'

export interface RenderedPost {
  html: string
  headings: { id: string; text: string; level: number }[]
}

export async function renderMarkdown(rawContent: string): Promise<RenderedPost> {
  const headings: { id: string; text: string; level: number }[] = []

  // Custom plugin: extract heading info from the rehype AST before serialization
  const extractHeadings = () => {
    return (tree: any) => {
      function visit(node: any) {
        if (
          node.tagName &&
          node.tagName.startsWith('h') &&
          node.properties?.id
        ) {
          const level = parseInt(node.tagName[1], 10)
          if (level >= 2 && level <= 3) {
            const text = (node.children || [])
              .filter((c: any) => c.type === 'text')
              .map((c: any) => c.value)
              .join('')
              .trim()
            if (text) {
              headings.push({ id: node.properties.id, text, level })
            }
          }
        }
        if (node.children) {
          node.children.forEach(visit)
        }
      }
      visit(tree)
    }
  }

  const result = await remark()
    .use(remarkGfm) // Enable GFM features: tables, strikethrough, task lists, autolinks
    .use(remarkRehype) // Convert remark AST → rehype AST first
    .use(rehypeSlug) // Add id attributes to headings (on rehype tree)
    .use(extractHeadings) // Capture headings with their IDs from the AST
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
    } as any)
    .use(rehypeHighlight)
    .use(rehypeStringify) // Serialize to HTML — preserves id attributes
    .process(rawContent)

  return { html: result.toString(), headings }
}
