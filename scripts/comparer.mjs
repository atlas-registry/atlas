/**
 * Harnais de comparaison de gabarits d'entretien.
 *
 * Le prompt engineering se fait sur des sorties comparables, pas à l'impression.
 * Ce script joue plusieurs variantes d'un gabarit sur le même jeu de réponses et
 * met leurs relances côte à côte, avec un relevé des défauts de forme.
 *
 *   node scripts/comparer.mjs raison-detre --variantes courant,origine
 *   node scripts/comparer.mjs raison-detre --fixture dev-infra --tours 3
 *
 * `courant` désigne le gabarit en vigueur, toute autre valeur un fichier de
 * `variantes/`. Une variante sans schéma structuré est jouée en texte libre.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { createAnthropic } from '@ai-sdk/anthropic'
import { generateText, jsonSchema, Output } from 'ai'

import { loadCartographies, parseDocument, ROOT } from './load.mjs'

const MODELE = process.env.ATLAS_ENTRETIEN_MODEL ?? 'claude-haiku-4-5'

const args = process.argv.slice(2)
const identifiant = args.find((a) => !a.startsWith('--')) ?? 'raison-detre'
const option = (nom, defaut) => {
  const index = args.indexOf(`--${nom}`)
  return index >= 0 && args[index + 1] ? args[index + 1] : defaut
}

const cartographie = loadCartographies().find((c) => c.directory === identifiant)
if (!cartographie) {
  console.error(`Cartographie inconnue : ${identifiant}`)
  process.exit(1)
}

const jeu = JSON.parse(readFileSync(join(ROOT, 'fixtures', `${option('fixture', 'dev-infra')}.json`), 'utf8'))
const tours = Number.parseInt(option('tours', String(jeu.reponses.length)), 10)
const reponses = jeu.reponses.slice(0, tours)

const dossierVariantes = join(ROOT, 'content/cartographies', identifiant, 'variantes')
const demandees = option('variantes', 'courant').split(',').map((v) => v.trim())

const gabaritDe = (nom) => {
  if (nom === 'courant') return { nom, texte: cartographie.documents.entretien.fr.body, structure: true }

  const fichier = join(dossierVariantes, `${nom}.fr.md`)
  if (!existsSync(fichier)) {
    const dispo = existsSync(dossierVariantes)
      ? readdirSync(dossierVariantes).map((f) => f.replace('.fr.md', '')).join(', ')
      : '(aucune)'
    throw new Error(`Variante inconnue : ${nom}. Disponibles : courant, ${dispo}`)
  }
  const brut = readFileSync(fichier, 'utf8').replace(/^<!--[\s\S]*?-->\n*/, '')
  // Une variante sans jetons d'exécution est un ancien prompt : texte libre.
  return { nom, texte: brut, structure: /\{\{TOURS_MAX\}\}/.test(brut) }
}

const AXE = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    score: { type: 'integer' },
    confiance: { type: 'integer' },
    mouvement: { type: 'string' },
    indice: { type: ['string', 'null'] },
  },
  required: ['id', 'score', 'confiance', 'mouvement', 'indice'],
  additionalProperties: false,
}

const SCHEMA = jsonSchema({
  type: 'object',
  properties: {
    miroir: { type: 'string' },
    question: { type: ['string', 'null'] },
    axes: { type: 'array', minItems: 4, maxItems: 4, items: AXE },
    hypothese: { type: ['string', 'null'] },
    tension: { type: ['string', 'null'] },
    termine: { type: 'boolean' },
  },
  required: ['miroir', 'question', 'axes', 'hypothese', 'tension', 'termine'],
  additionalProperties: false,
})

/** Défauts de forme, comptés plutôt qu'appréciés. */
const releverDefauts = (miroir, question) => ({
  menu: /\b(ou (plutôt|bien)|,\s*ou\b|\bou c'est\b)/i.test(question) ? 1 : 0,
  ponctuation: /[^\s ][?!:;]/.test(question) ? 1 : 0,
  cadratin: /[—–]/.test(`${miroir} ${question}`) ? 1 : 0,
  multiple: (question.match(/\?/g) ?? []).length > 1 ? 1 : 0,
  begaie: miroir && question && miroir.includes(question.slice(0, 30)) ? 1 : 0,
  emoji: /\p{Extended_Pictographic}/u.test(`${miroir} ${question}`) ? 1 : 0,
  // Une relance qui affirme avant de demander : la marque d'un entretien qui
  // prend position au lieu de collecter.
  affirme: /\.\s+[A-ZÀÉÈ]|\bnon \?|c'est ça \?/.test(question) ? 1 : 0,
})

const jouer = async ({ nom, texte, structure }) => {
  const messages = [{ role: 'user', content: "Commence l'entretien." }]
  let carte = 'aucun tour joué, tous les axes sont à zéro'
  const relances = []
  const total = { menu: 0, ponctuation: 0, cadratin: 0, multiple: 0, begaie: 0, emoji: 0, affirme: 0 }

  for (let i = 0; i < reponses.length; i += 1) {
    const systeme = structure
      ? texte
          .replaceAll('{{TOURS_MIN}}', String(cartographie.meta.tours.min))
          .replaceAll('{{TOURS_MAX}}', String(cartographie.meta.tours.max))
          .replaceAll('{{TOUR_COURANT}}', String(i))
          .replaceAll('{{CARTE_PRECEDENTE}}', carte)
      : texte

    const resultat = await generateText({
      model: createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })(MODELE),
      system: systeme,
      messages,
      ...(structure ? { output: Output.object({ schema: SCHEMA }) } : {}),
    })

    const miroir = structure ? resultat.output.miroir : ''
    // Une variante en texte libre n'isole pas sa relance : extraire « la
    // dernière ligne qui finit par ? » attrape une puce de menu et fausse la
    // comparaison. On montre donc sa fin telle quelle.
    const question = structure
      ? (resultat.output.question ?? '')
      : resultat.text.split('\n').filter((l) => l.trim()).slice(-4).join('\n               ')

    relances.push({ miroir, question })
    for (const [cle, valeur] of Object.entries(releverDefauts(miroir, question))) total[cle] += valeur

    messages.push({
      role: 'assistant',
      content: structure ? [miroir, question].filter(Boolean).join('\n\n') : resultat.text,
    })
    messages.push({ role: 'user', content: reponses[i] })
    if (structure) {
      carte = resultat.output.axes.map((a) => `${a.id} ${a.score}/10 confiance ${a.confiance}`).join(' · ')
    }
  }

  return { nom, relances, total }
}

console.log(`Cartographie : ${identifiant} · jeu : ${jeu.nom} · ${reponses.length} tours · modèle : ${MODELE}\n`)

const resultats = []
for (const nom of demandees) resultats.push(await jouer(gabaritDe(nom)))

for (let tour = 0; tour < reponses.length; tour += 1) {
  console.log(`\n══ TOUR ${tour + 1} ${'═'.repeat(60)}`)
  for (const { nom, relances } of resultats) {
    const { miroir, question } = relances[tour]
    console.log(`\n  [${nom}]`)
    if (miroir) console.log(`    miroir   : ${miroir}`)
    console.log(`    question : ${question}`)
  }
}

console.log(`\n\n══ DÉFAUTS DE FORME ${'═'.repeat(52)}\n`)
const colonnes = ['menu', 'ponctuation', 'cadratin', 'multiple', 'begaie', 'emoji']
console.log(`  ${'variante'.padEnd(12)} ${colonnes.map((c) => c.padStart(12)).join('')} ${'affirme'.padStart(12)}`)
for (const { nom, total } of resultats) {
  const cellules = colonnes.map((c) => String(total[c]).padStart(12)).join('')
  console.log(`  ${nom.padEnd(12)} ${cellules} ${String(total.affirme).padStart(12)}`)
}
console.log(`\n  Les six premières colonnes sont des défauts : moins il y en a, mieux c'est.`)
console.log(`  « affirme » compte les relances qui posent une affirmation avant de questionner.`)
