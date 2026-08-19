/**
 * Vérifie que les artefacts JSON versionnés correspondent bien à la source.
 *
 * Les fichiers à la racine sont servis directement par raw.githubusercontent.com :
 * ils doivent être commités. Ce contrôle garantit qu'une contribution qui touche
 * `content/` sans relancer `pnpm build` ne passe pas en revue inaperçue.
 */
import { execFileSync } from 'node:child_process'

import { ROOT } from './load.mjs'

const ARTIFACTS = ['prompts', 'cartographies', 'guides', 'tools', 'labels'].flatMap((resource) =>
  ['fr', 'en'].map((locale) => `${resource}.${locale}.json`)
)

const changed = execFileSync('git', ['diff', '--name-only', '--', ...ARTIFACTS], {
  cwd: ROOT,
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean)

if (changed.length > 0) {
  console.error('Les artefacts ne correspondent pas à la source :\n')
  for (const file of changed) console.error(`  - ${file}`)
  console.error('\nLancez `npm run build` puis committez les fichiers régénérés.')
  process.exit(1)
}

console.log(`artefacts à jour (${ARTIFACTS.length} fichiers)`)
