import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `prs.json` lives at the repo root (written by .github/workflows/update-prs.yml),
// but Cloudflare Pages serves only `dist/`. This plugin:
//   - serves /prs.json from the repo root during `vite dev`
//   - copies it into `dist/` right after every `vite build`
function prsJsonPlugin(): Plugin {
  const prsPath = resolve(__dirname, 'prs.json')

  return {
    name: 'prs-json',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/prs.json')) {
          next()
          return
        }

        try {
          const data = readFileSync(prsPath, 'utf-8')
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(data)
        } catch {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end('[]')
        }
      })
    },
    closeBundle() {
      if (existsSync(prsPath)) {
        copyFileSync(prsPath, resolve(__dirname, 'dist/prs.json'))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), prsJsonPlugin()],
})
