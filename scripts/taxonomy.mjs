/**
 * Vocabulaire contrôlé du registre.
 *
 * Les identifiants (labels, variables, catégories) ne sont jamais traduits :
 * ce sont des clés techniques, en anglais, partagées par les deux locales.
 * Seuls leurs libellés d'affichage le sont. C'est ce qui rend une divergence
 * FR/EN structurellement impossible — le défaut qui affectait 14 prompts et
 * l'ensemble de la taxonomie avant cette refonte.
 */

/** Catégories de prompts. Fermé. */
export const CATEGORIES = [
  'business',
  'growth',
  'marketing',
  'automation',
  'dev',
  'productivity',
  'introspection',
]

/** Labels autorisés, avec leur libellé d'affichage. Fermé. */
export const LABELS = {
  validation: { fr: 'Validation', en: 'Validation' },
  'market-research': { fr: 'Étude de marché', en: 'Market research' },
  competition: { fr: 'Concurrence', en: 'Competition' },
  positioning: { fr: 'Positionnement', en: 'Positioning' },
  differentiation: { fr: 'Différenciation', en: 'Differentiation' },
  'business-model': { fr: 'Business model', en: 'Business model' },
  pricing: { fr: 'Pricing', en: 'Pricing' },
  'unit-economics': { fr: 'Unit economics', en: 'Unit economics' },
  risk: { fr: 'Risques', en: 'Risk' },
  fundraising: { fr: 'Levée de fonds', en: 'Fundraising' },
  pitch: { fr: 'Pitch', en: 'Pitch' },
  growth: { fr: 'Croissance', en: 'Growth' },
  content: { fr: 'Contenu', en: 'Content' },
  copywriting: { fr: 'Copywriting', en: 'Copywriting' },
  seo: { fr: 'SEO', en: 'SEO' },
  'social-media': { fr: 'Réseaux sociaux', en: 'Social media' },
  'personal-branding': { fr: 'Personal branding', en: 'Personal branding' },
  outreach: { fr: 'Prospection', en: 'Outreach' },
  sales: { fr: 'Vente', en: 'Sales' },
  conversion: { fr: 'Conversion', en: 'Conversion' },
  email: { fr: 'Email', en: 'Email' },
  retention: { fr: 'Rétention', en: 'Retention' },
  product: { fr: 'Produit', en: 'Product' },
  persona: { fr: 'Persona', en: 'Persona' },
  onboarding: { fr: 'Onboarding', en: 'Onboarding' },
  engineering: { fr: 'Ingénierie', en: 'Engineering' },
  productivity: { fr: 'Productivité', en: 'Productivity' },
  delegation: { fr: 'Délégation', en: 'Delegation' },
  process: { fr: 'Process', en: 'Process' },
  automation: { fr: 'Automatisation', en: 'Automation' },
  purpose: { fr: 'Raison d’être', en: 'Purpose' },
  clarity: { fr: 'Clarté', en: 'Clarity' },
  energy: { fr: 'Énergie', en: 'Energy' },
  'decision-making': { fr: 'Décision', en: 'Decision-making' },
  leadership: { fr: 'Leadership', en: 'Leadership' },
}

/**
 * Correspondance des anciens labels libres vers le vocabulaire contrôlé.
 * Sert uniquement à la migration : une fois celle-ci passée, seuls les labels
 * de `LABELS` sont acceptés.
 */
export const LEGACY_LABELS = {
  validation: 'validation', market: 'market-research', 'vc-style': 'fundraising',
  process: 'process', automation: 'automation', 'time-tracking': 'energy',
  'code-review': 'engineering', 'best-practices': 'engineering', refactor: 'engineering',
  ikigai: 'purpose', carrière: 'purpose', career: 'purpose', purpose: 'purpose',
  stratégie: 'positioning', strategie: 'positioning', strategy: 'positioning',
  reputation: 'personal-branding', 'personal-branding': 'personal-branding',
  positioning: 'positioning', positionnement: 'positioning',
  clarity: 'clarity', clarté: 'clarity', risks: 'risk', risques: 'risk',
  'business-model': 'business-model', viability: 'business-model', viabilite: 'business-model',
  viabilité: 'business-model', content: 'content', contenu: 'content',
  engagement: 'social-media', linkedin: 'social-media', optimization: 'growth',
  productivité: 'productivity', productivite: 'productivity', productivity: 'productivity',
  énergie: 'energy', energy: 'energy', focus: 'energy', priorisation: 'energy',
  prioritization: 'energy', timing: 'market-research',
  différenciation: 'differentiation', differentiation: 'differentiation',
  défendabilité: 'differentiation', defensibility: 'differentiation', moat: 'differentiation',
  'social-media': 'social-media', 'content-strategy': 'content', growth: 'growth',
  pitch: 'pitch', confrontation: 'decision-making', vc: 'fundraising',
  talent: 'purpose', pivot: 'decision-making', décision: 'decision-making',
  decision: 'decision-making', decisions: 'decision-making', blocage: 'clarity',
  blocker: 'clarity', lucidité: 'clarity', lucidity: 'clarity', vision: 'purpose',
  motivation: 'purpose', perspective: 'clarity', pattern: 'clarity',
  psychologie: 'clarity', psychology: 'clarity', croissance: 'growth',
  copywriting: 'copywriting', distribution: 'growth', pricing: 'pricing',
  revenus: 'pricing', revenue: 'pricing', saas: 'business-model',
  packaging: 'pricing', tiers: 'pricing', concurrence: 'competition',
  competition: 'competition', veille: 'market-research', intelligence: 'market-research',
  'unit-economics': 'unit-economics', 'stress-test': 'risk', persona: 'persona',
  client: 'persona', customer: 'persona', segmentation: 'persona', icp: 'persona',
  fundraising: 'fundraising', storytelling: 'pitch', investissement: 'fundraising',
  investment: 'fundraising', conversion: 'conversion', 'landing-page': 'conversion',
  cro: 'conversion', outreach: 'outreach', prospection: 'outreach',
  prospecting: 'outreach', 'cold-email': 'outreach', vente: 'sales', sales: 'sales',
  rapide: 'productivity', quick: 'productivity', seo: 'seo', brief: 'content',
  email: 'email', onboarding: 'onboarding', retention: 'retention',
  activation: 'onboarding', sop: 'process', documentation: 'process',
  delegation: 'delegation', reunion: 'process', meeting: 'process',
  actions: 'process', management: 'leadership', leadership: 'leadership',
  prd: 'product', produit: 'product', product: 'product',
  specifications: 'product', feature: 'product', ltv: 'unit-economics',
  cac: 'unit-economics', rentabilite: 'unit-economics', profitability: 'unit-economics',
}

/** Placeholder générique de fin de prompt, présent dans tous les prompts. */
export const USER_INPUT_TOKEN = 'USERDATA'

export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced']

export const VARIABLE_TYPES = ['text', 'textarea']
