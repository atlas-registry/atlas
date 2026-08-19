/**
 * Migration unique : des six fichiers JSON plats vers la source structurée.
 *
 * Ce script ne s'exécute qu'une fois. Il est conservé dans l'historique pour
 * documenter la transformation appliquée au contenu, notamment la
 * canonicalisation des variables et des labels.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import YAML from 'yaml'

import { LEGACY_LABELS } from './taxonomy.mjs'
import { LEGACY_VARIABLES, VARIABLES } from './variables.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => JSON.parse(readFileSync(join(ROOT, file), 'utf8'))

/**
 * Classement éditorial initial de la difficulté, établi sur l'effort d'entrée
 * demandé à l'utilisateur et les prérequis de connaissance, faute de donnée
 * dans le registre d'origine. Aucune valeur n'est déduite automatiquement.
 */
const DIFFICULTY = {
  ikigai_archeologie: 'beginner', 'ikigai-archeologie': 'beginner',
  zone_de_genie: 'beginner', lettre_futur_toi: 'beginner',
  saboteur_interne: 'beginner', pivot_invisible: 'beginner',
  founder_energy_audit: 'beginner', linkedin_post_generator: 'beginner',
  meeting_to_actions: 'beginner', automation_time_saver_extractor: 'beginner',
  content_autopsy: 'beginner', reputation_power_check: 'beginner',

  saas_idea_validator: 'intermediate', market_timing_detector: 'intermediate',
  moat_extractor: 'intermediate', business_fragility_check: 'intermediate',
  anti_pitch: 'intermediate', le_juste_prix: 'intermediate',
  competitor_radar: 'intermediate', customer_persona_sculptor: 'intermediate',
  landing_page_copywriter: 'intermediate', cold_outreach_crafter: 'intermediate',
  seo_content_brief_builder: 'intermediate', email_onboarding_sequence: 'intermediate',
  sop_generator: 'intermediate', delegation_framework: 'intermediate',
  linkedin_post_forge: 'intermediate', mkt_personal_branding_social_30d: 'intermediate',
  code_review_brutal_but_kind: 'intermediate', prd_writer: 'intermediate',

  pricing_strategy_builder: 'advanced', business_model_stress_test: 'advanced',
  pitch_deck_architect: 'advanced', unit_economics_calculator: 'advanced',
}

const TOKEN = /\{\{\s*([^}\s]+)\s*\}\}/g

/**
 * Jetons dont le sens dépend du prompt qui les porte. `{{IDEE}}` désigne une
 * idée de publication chez les prompts LinkedIn, mais une idée de business chez
 * market_timing_detector : la correspondance globale ne peut pas trancher.
 */
const TOKEN_OVERRIDES = {
  market_timing_detector: { IDEE: 'IDEA', IDEA: 'IDEA' },
}

/**
 * Certains prompts illustrent le message à produire en y montrant des champs à
 * personnaliser. Ces jetons décrivent la sortie attendue, pas une saisie de
 * l'utilisateur : ils passent en notation crochets pour que `{{…}}` reste
 * strictement réservé aux entrées.
 */
const ILLUSTRATIVE_TOKENS = {
  cold_outreach_crafter: {
    prenom: { fr: '[Prénom]', en: '[First name]' },
    entreprise: { fr: '[Entreprise]', en: '[Company]' },
    observation: { fr: '[Observation]', en: '[Observation]' },
    connexion: { fr: '[Point commun]', en: '[Common ground]' },
    FIRST_NAME: { fr: '[Prénom]', en: '[First name]' },
    COMPANY: { fr: '[Entreprise]', en: '[Company]' },
    OBSERVATION: { fr: '[Observation]', en: '[Observation]' },
    CONNECTION: { fr: '[Point commun]', en: '[Common ground]' },
  },
}

/** Remplace chaque jeton par son nom canonique et renvoie les noms rencontrés. */
function canonicalise(body, promptId, locale) {
  const seen = new Set()
  const illustrative = ILLUSTRATIVE_TOKENS[promptId] ?? {}
  const overrides = TOKEN_OVERRIDES[promptId] ?? {}

  const output = body.replace(TOKEN, (_match, raw) => {
    if (illustrative[raw]) return illustrative[raw][locale]

    const canonical = overrides[raw] ?? LEGACY_VARIABLES[raw]
    if (!canonical) {
      throw new Error(`${promptId} : jeton inconnu {{${raw}}} — ajouter sa correspondance`)
    }
    seen.add(canonical)
    return `{{${canonical}}}`
  })

  return { body: output, variables: [...seen] }
}

function canonicaliseLabels(labels, promptId) {
  const mapped = (labels ?? []).map((label) => {
    const canonical = LEGACY_LABELS[label]
    if (!canonical) throw new Error(`${promptId} : label inconnu « ${label} »`)
    return canonical
  })
  return [...new Set(mapped)].sort()
}

const front = (data, body) =>
  `---\n${YAML.stringify(data, { lineWidth: 0 }).trimEnd()}\n---\n\n${body.trimEnd()}\n`

const write = (relative, contents) => {
  const target = join(ROOT, relative)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, contents)
}

// --- prompts -------------------------------------------------------------
const promptsFr = read('prompts.fr.json')
const promptsEn = read('prompts.en.json')
let promptCount = 0

for (const [index, fr] of promptsFr.entries()) {
  const en = promptsEn.find((candidate) => candidate.id === fr.id)
  if (!en) throw new Error(`${fr.id} : absent de prompts.en.json`)

  const difficulty = DIFFICULTY[fr.id]
  if (!difficulty) throw new Error(`${fr.id} : difficulté non classée`)

  const canonFr = canonicalise(fr.prompt, fr.id, 'fr')
  const canonEn = canonicalise(en.prompt, fr.id, 'en')

  // Les exemples citent les jetons : ils doivent suivre la même canonicalisation
  // que le corps, sans quoi ils montreraient des variables qui n'existent plus.
  const example = (text, locale) =>
    typeof text === 'string' ? canonicalise(text, fr.id, locale).body : (text ?? null)

  // Les deux locales doivent désormais exposer exactement le même jeu de variables.
  const union = [...new Set([...canonFr.variables, ...canonEn.variables])].sort()
  const missing = union.filter(
    (name) => !canonFr.variables.includes(name) || !canonEn.variables.includes(name)
  )
  if (missing.length > 0) {
    console.warn(`  ! ${fr.id} : variables présentes dans une seule locale → ${missing.join(', ')}`)
  }

  const meta = {
    id: fr.id,
    category: fr.category,
    difficulty,
    order: index,
    labels: canonicaliseLabels(fr.labels, fr.id),
    variables: union.map((name) => ({ name, type: VARIABLES[name].type })),
  }

  write(`content/prompts/${fr.id}/meta.json`, `${JSON.stringify(meta, null, 2)}\n`)
  write(
    `content/prompts/${fr.id}/fr.md`,
    front(
      {
        name: fr.name,
        hook: fr.hook,
        description: fr.description,
        gains: fr.gains,
        example_input: example(fr.example_input, 'fr'),
        example_output: example(fr.example_output, 'fr'),
      },
      canonFr.body
    )
  )
  write(
    `content/prompts/${fr.id}/en.md`,
    front(
      {
        name: en.name,
        hook: en.hook,
        description: en.description,
        gains: en.gains,
        example_input: example(en.example_input, 'en'),
        example_output: example(en.example_output, 'en'),
      },
      canonEn.body
    )
  )
  promptCount += 1
}

// --- guides --------------------------------------------------------------
const guidesFr = read('guides.fr.json')
const guidesEn = read('guides.en.json')
let guideCount = 0

for (const [index, fr] of guidesFr.entries()) {
  const en = guidesEn.find((candidate) => candidate.id === fr.id)
  if (!en) throw new Error(`guide ${fr.id} : absent de guides.en.json`)

  const meta = {
    id: fr.id,
    slug: fr.slug,
    category: fr.category,
    difficulty: fr.difficulty,
    readTime: fr.readTime,
    date: fr.date,
    order: index,
  }

  write(`content/guides/${fr.slug}/meta.json`, `${JSON.stringify(meta, null, 2)}\n`)
  write(
    `content/guides/${fr.slug}/fr.md`,
    front({ title: fr.title, description: fr.description }, fr.content)
  )
  write(
    `content/guides/${fr.slug}/en.md`,
    front({ title: en.title, description: en.description }, en.content)
  )
  guideCount += 1
}

// --- outils --------------------------------------------------------------
const toolsFr = read('tools.fr.json')
const toolsEn = read('tools.en.json')
let toolCount = 0

for (const [index, fr] of toolsFr.entries()) {
  const en = toolsEn.find((candidate) => candidate.id === fr.id)
  if (!en) throw new Error(`outil ${fr.id} : absent de tools.en.json`)

  const tool = {
    id: fr.id,
    category: fr.category,
    link: fr.link,
    order: index,
    name: fr.name,
    description: { fr: fr.description, en: en.description },
    why: { fr: fr.why, en: en.why },
  }

  write(`content/tools/${fr.id}.json`, `${JSON.stringify(tool, null, 2)}\n`)
  toolCount += 1
}

console.log(`prompts migrés : ${promptCount}`)
console.log(`guides migrés  : ${guideCount}`)
console.log(`outils migrés  : ${toolCount}`)
