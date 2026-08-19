/**
 * Validation de la source du registre.
 *
 * Objectif : rendre impossible la classe de défauts qui a motivé la refonte —
 * variables divergentes entre locales, labels inventés à l'écriture, champs
 * absents d'une langue. Toute anomalie est signalée, et le script sort en
 * erreur pour bloquer la CI.
 */
import { z } from 'zod'

import { LOCALES, loadGuides, loadPrompts, loadTools } from './load.mjs'
import { CATEGORIES, DIFFICULTIES, LABELS, USER_INPUT_TOKEN, VARIABLE_TYPES } from './taxonomy.mjs'
import { VARIABLES } from './variables.mjs'

const problems = []
const fail = (where, message) => problems.push(`${where} : ${message}`)

const TOKEN = /\{\{\s*([^}\s]+)\s*\}\}/g
const tokensIn = (text) => [...new Set([...text.matchAll(TOKEN)].map((match) => match[1]))].sort()

const slug = z.string().regex(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/, 'identifiant en minuscules')

const promptMetaSchema = z.object({
  id: slug,
  category: z.enum(CATEGORIES),
  difficulty: z.enum(DIFFICULTIES),
  order: z.number().int().nonnegative(),
  labels: z.array(z.enum(Object.keys(LABELS))).min(1).max(5),
  variables: z.array(
    z.object({ name: z.enum(Object.keys(VARIABLES)), type: z.enum(VARIABLE_TYPES) })
  ),
  featured: z.boolean().optional(),
})

const promptTextSchema = z.object({
  name: z.string().min(1),
  hook: z.string().min(1).max(120),
  description: z.string().min(1),
  gains: z.string().min(1),
  example_input: z.string().min(1).nullable(),
  example_output: z.string().nullable(),
})

const guideMetaSchema = z.object({
  id: z.string().min(1),
  slug,
  category: z.string().min(1),
  difficulty: z.enum(DIFFICULTIES),
  readTime: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order: z.number().int().nonnegative(),
})

const guideTextSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

const toolSchema = z.object({
  id: slug,
  category: z.string().min(1),
  link: z.url(),
  order: z.number().int().nonnegative(),
  name: z.string().min(1),
  description: z.object({ fr: z.string().min(1), en: z.string().min(1) }),
  why: z.object({ fr: z.string().min(1), en: z.string().min(1) }),
})

const check = (schema, value, where) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fail(where, `${issue.path.join('.') || '(racine)'} — ${issue.message}`)
    }
  }
  return result.success
}

// --- prompts -------------------------------------------------------------
const prompts = loadPrompts()
const seenOrders = new Map()

for (const { meta, locales, directory } of prompts) {
  const where = `prompt ${directory}`

  if (!check(promptMetaSchema, meta, `${where}/meta.json`)) continue
  if (meta.id !== directory) fail(where, `l'identifiant « ${meta.id} » ne correspond pas au dossier`)

  if (seenOrders.has(meta.order)) {
    fail(where, `rang ${meta.order} déjà pris par ${seenOrders.get(meta.order)}`)
  }
  seenOrders.set(meta.order, directory)

  const declared = meta.variables.map((variable) => variable.name).sort()

  for (const locale of LOCALES) {
    check(promptTextSchema, locales[locale].data, `${where}/${locale}.md`)

    const used = tokensIn(locales[locale].body)
    const unknown = used.filter((name) => !VARIABLES[name])
    if (unknown.length > 0) {
      fail(`${where}/${locale}.md`, `jeton hors vocabulaire : ${unknown.join(', ')}`)
    }

    const undeclared = used.filter((name) => !declared.includes(name))
    if (undeclared.length > 0) {
      fail(`${where}/${locale}.md`, `variable utilisée mais non déclarée : ${undeclared.join(', ')}`)
    }

    const unused = declared.filter((name) => !used.includes(name))
    if (unused.length > 0) {
      fail(`${where}/${locale}.md`, `variable déclarée mais absente du corps : ${unused.join(', ')}`)
    }

    if (declared.length > 0 && !used.includes(USER_INPUT_TOKEN)) {
      fail(`${where}/${locale}.md`, `le placeholder {{${USER_INPUT_TOKEN}}} est attendu en fin de prompt`)
    }
  }

  // Le cœur de la garantie : les deux locales exposent le même formulaire.
  const [fr, en] = LOCALES.map((locale) => tokensIn(locales[locale].body).join(','))
  if (fr !== en) fail(where, `variables divergentes entre locales — FR: ${fr} | EN: ${en}`)
}

// --- guides --------------------------------------------------------------
const guides = loadGuides()
const seenSlugs = new Set()

for (const { meta, locales, directory } of guides) {
  const where = `guide ${directory}`
  if (!check(guideMetaSchema, meta, `${where}/meta.json`)) continue
  if (meta.slug !== directory) fail(where, `le slug « ${meta.slug} » ne correspond pas au dossier`)
  if (seenSlugs.has(meta.slug)) fail(where, 'slug en double')
  seenSlugs.add(meta.slug)

  for (const locale of LOCALES) {
    check(guideTextSchema, locales[locale].data, `${where}/${locale}.md`)
    if (locales[locale].body.length < 200) {
      fail(`${where}/${locale}.md`, 'contenu anormalement court')
    }
  }
}

// --- outils --------------------------------------------------------------
const seenTools = new Set()
for (const tool of loadTools()) {
  const where = `outil ${tool.id}`
  if (!check(toolSchema, tool, where)) continue
  if (seenTools.has(tool.id)) fail(where, 'identifiant en double')
  seenTools.add(tool.id)
}

// --- verdict -------------------------------------------------------------
if (problems.length > 0) {
  console.error(`${problems.length} anomalie(s) :\n`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log(`registre valide : ${prompts.length} prompts, ${guides.length} guides, ${seenTools.size} outils`)
