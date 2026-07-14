import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Markdown plugin — transforms .md files into ES modules with frontmatter exports
function markdownPlugin() {
  return {
    name: 'markdown-plugin',
    async transform(code: string, id: string) {
      if (!id.endsWith('.md') || id.includes('node_modules')) return

      const raw = fs.readFileSync(id, 'utf-8')
      const slug = path.basename(id, '.md')

      const fmMatch = raw.match(/^---\s*([\s\S]*?)\s*---/)
      const frontmatter: Record<string, string> = {}
      if (fmMatch) {
        fmMatch[1].split('\n').forEach((line) => {
          const ci = line.indexOf(':')
          if (ci === -1) return
          const key = line.slice(0, ci).trim()
          const val = line.slice(ci + 1).trim().replace(/^["']|["']$/g, '')
          frontmatter[key] = val
        })
      }

      const content = raw.replace(fmMatch ? fmMatch[0] : '', '').trim()
      const excerpt = frontmatter.excerpt || content.slice(0, 150).replace(/[#*_`]/g, '').trim()

      const safe = (s: string) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')

      return [
        `export const slug = '${safe(slug)}'`,
        `export const title = '${safe(frontmatter.title || slug)}'`,
        `export const date = '${safe(frontmatter.date || '')}'`,
        `export const category = '${safe(frontmatter.category || 'Uncategorized')}'`,
        `export const excerpt = '${safe(excerpt)}'`,
        `export const content = ${JSON.stringify(content)}`,
        `export const htmlContent = null // use remark to render`,
        '',
      ].join('\n')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), markdownPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
