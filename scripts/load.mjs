/**
 * Lecture de la source structurée (`content/`).
 *
 * La source est le contenu de ce dossier ; les fichiers JSON à la racine du
 * dépôt en sont des artefacts générés, conservés pour que les consommateurs
 * existants continuent de fonctionner sans changement.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import YAML from 'yaml'

import { CARTOGRAPHIE_ROLES } from './taxonomy.mjs'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
export const LOCALES = ['fr', 'en']

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/

/** Sépare le frontmatter YAML du corps markdown. */
export function parseDocument(raw, source) {
  const match = FRONTMATTER.exec(raw)
  if (!match) throw new Error(`${source} : frontmatter absent`)

  return {
    data: YAML.parse(match[1]) ?? {},
    body: raw.slice(match[0].length).trim(),
  }
}

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

const directoriesIn = (path) =>
  existsSync(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()
    : []

export function loadPrompts() {
  const base = join(ROOT, 'content/prompts')

  return directoriesIn(base).map((id) => {
    const meta = readJson(join(base, id, 'meta.json'))
    const locales = Object.fromEntries(
      LOCALES.map((locale) => {
        const file = join(base, id, `${locale}.md`)
        if (!existsSync(file)) throw new Error(`prompt ${id} : ${locale}.md manquant`)
        return [locale, parseDocument(readFileSync(file, 'utf8'), `${id}/${locale}.md`)]
      })
    )
    return { meta, locales, directory: id }
  })
}

export function loadGuides() {
  const base = join(ROOT, 'content/guides')

  return directoriesIn(base).map((slug) => {
    const meta = readJson(join(base, slug, 'meta.json'))
    const locales = Object.fromEntries(
      LOCALES.map((locale) => {
        const file = join(base, slug, `${locale}.md`)
        if (!existsSync(file)) throw new Error(`guide ${slug} : ${locale}.md manquant`)
        return [locale, parseDocument(readFileSync(file, 'utf8'), `${slug}/${locale}.md`)]
      })
    )
    return { meta, locales, directory: slug }
  })
}

export function loadTools() {
  const base = join(ROOT, 'content/tools')
  if (!existsSync(base)) return []

  return readdirSync(base)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => readJson(join(base, file)))
}

/**
 * Cartographies : entretiens conduits, par opposition aux prompts qui sont des
 * gabarits à trou. Chacune porte trois documents par locale - le gabarit de
 * conduite, les consignes de la Carte, celles du Dossier - parce que ce sont
 * trois appels distincts au modèle et non trois sections d'un même texte.
 */
export function loadCartographies() {
  const base = join(ROOT, 'content/cartographies')

  return directoriesIn(base).map((id) => {
    const meta = readJson(join(base, id, 'meta.json'))
    const documents = {}

    for (const role of CARTOGRAPHIE_ROLES) {
      documents[role] = Object.fromEntries(
        LOCALES.map((locale) => {
          const file = join(base, id, `${role}.${locale}.md`)
          if (!existsSync(file)) {
            throw new Error(`cartographie ${id} : ${role}.${locale}.md manquant`)
          }
          return [locale, parseDocument(readFileSync(file, 'utf8'), `${id}/${role}.${locale}.md`)]
        })
      )
    }

    return { meta, documents, directory: id }
  })
}
