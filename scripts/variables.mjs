/**
 * Table de canonicalisation des variables de prompt.
 *
 * Avant cette refonte, les variables étaient inventées à l'écriture et
 * divergeaient entre locales : {{PRODUIT_PRICING}} côté français,
 * {{PRODUCT_PRICING}} côté anglais, et jusqu'à six variables d'un côté contre
 * deux de l'autre pour un même prompt. Un formulaire généré depuis ces jetons
 * aurait donc changé de forme selon la langue.
 *
 * Chaque jeton porte désormais un nom canonique unique, partagé par les deux
 * locales, et des libellés traduits destinés à l'interface.
 *
 * `type` gouverne le champ de saisie : `text` pour une ligne, `textarea` pour un
 * contenu long (notes, code, transcription).
 */

/** Jeton hérité (toutes locales) → nom canonique. */
export const LEGACY_VARIABLES = {
  USERDATA: 'USERDATA',
  IDEE_SAAS: 'SAAS_IDEA', SAAS_IDEA: 'SAAS_IDEA',
  LISTE_DE_TACHES: 'TASK_LIST', TASK_LIST: 'TASK_LIST',
  CODE_A_REVIEWER: 'CODE', CODE_TO_REVIEW: 'CODE', CODE: 'CODE',
  CONTENU: 'CONTENT', CONTENT: 'CONTENT',
  BUSINESS: 'BUSINESS',
  POSTS: 'POSTS',
  SEMAINE_TYPE: 'TYPICAL_WEEK', TYPICAL_WEEK: 'TYPICAL_WEEK',
  IDEE: 'POST_IDEA', IDEE_POST: 'POST_IDEA', POST_IDEA: 'POST_IDEA', IDEA: 'IDEA',
  PROFIL: 'PROFILE', PROFILE: 'PROFILE',
  PLATFORMS: 'PLATFORMS', PLATEFORMES: 'PLATFORMS',
  PROJET: 'PROJECT', PROJECT: 'PROJECT',
  SITUATION: 'SITUATION',
  CONTEXTE: 'CONTEXT', CONTEXT: 'CONTEXT',
  PRICING_ACTUEL: 'CURRENT_PRICING', CURRENT_PRICING: 'CURRENT_PRICING',
  PRODUIT_PRICING: 'PRODUCT_PRICING', PRODUCT_PRICING: 'PRODUCT_PRICING',
  BUSINESS_CONCURRENCE: 'COMPETITORS', BUSINESS_COMPETITORS: 'COMPETITORS',
  BUSINESS_MODEL: 'BUSINESS_MODEL',
  CLIENTS: 'CUSTOMERS', PRODUCT_CUSTOMERS: 'CUSTOMERS',
  PROJET_PITCH: 'PITCH_CONTEXT', PITCH_CONTEXT: 'PITCH_CONTEXT',
  OFFRE_LANDING: 'LANDING_BRIEF', LANDING_PAGE_BRIEF: 'LANDING_BRIEF',
  OUTREACH_CONTEXT: 'OUTREACH_BRIEF', OUTREACH_BRIEF: 'OUTREACH_BRIEF',
  prenom: 'FIRST_NAME', entreprise: 'COMPANY',
  observation: 'OBSERVATION', connexion: 'CONNECTION',
  MOT_CLE: 'KEYWORD', SEO_TOPIC: 'KEYWORD',
  PRODUIT_ONBOARDING: 'ONBOARDING_CONTEXT', ONBOARDING_CONTEXT: 'ONBOARDING_CONTEXT',
  PROCESS: 'PROCESS', PROCESS_DESCRIPTION: 'PROCESS',
  NOTES_REUNION: 'MEETING_NOTES', MEETING_NOTES: 'MEETING_NOTES',
  TACHES_DELEGATION: 'TASKS_TO_DELEGATE', ROLE_AND_TASKS: 'TASKS_TO_DELEGATE',
  FEATURE: 'FEATURE', FEATURE_DESCRIPTION: 'FEATURE',
  DONNEES_BUSINESS: 'BUSINESS_METRICS', BUSINESS_NUMBERS: 'BUSINESS_METRICS',
}

/** Définition d'affichage de chaque variable canonique. */
export const VARIABLES = {
  USERDATA: {
    type: 'textarea',
    label: { fr: 'Tes informations', en: 'Your input' },
    placeholder: {
      fr: 'Colle ici les éléments que l’IA doit analyser.',
      en: 'Paste here whatever the AI should work from.',
    },
  },
  SAAS_IDEA: {
    type: 'textarea',
    label: { fr: 'Ton idée de SaaS', en: 'Your SaaS idea' },
    placeholder: {
      fr: 'Décris ton idée en quelques phrases : le problème, pour qui, ta solution.',
      en: 'Describe your idea in a few sentences: the problem, for whom, your solution.',
    },
  },
  TASK_LIST: {
    type: 'textarea',
    label: { fr: 'Ta liste de tâches', en: 'Your task list' },
    placeholder: { fr: 'Une tâche par ligne.', en: 'One task per line.' },
  },
  CODE: {
    type: 'textarea',
    label: { fr: 'Le code à relire', en: 'The code to review' },
    placeholder: { fr: 'Colle ton extrait de code.', en: 'Paste your code snippet.' },
  },
  CONTENT: {
    type: 'textarea',
    label: { fr: 'Ton contenu', en: 'Your content' },
    placeholder: { fr: 'Colle le texte à travailler.', en: 'Paste the text to work on.' },
  },
  BUSINESS: {
    type: 'textarea',
    label: { fr: 'Ton business', en: 'Your business' },
    placeholder: {
      fr: 'Ce que tu vends, à qui, et où tu en es.',
      en: 'What you sell, to whom, and where you stand.',
    },
  },
  POSTS: {
    type: 'textarea',
    label: { fr: 'Tes publications', en: 'Your posts' },
    placeholder: { fr: 'Colle quelques publications récentes.', en: 'Paste a few recent posts.' },
  },
  TYPICAL_WEEK: {
    type: 'textarea',
    label: { fr: 'Ta semaine type', en: 'Your typical week' },
    placeholder: {
      fr: 'Décris une semaine ordinaire, jour par jour.',
      en: 'Describe an ordinary week, day by day.',
    },
  },
  IDEA: {
    type: 'textarea',
    label: { fr: 'Ton idée', en: 'Your idea' },
    placeholder: {
      fr: 'Décris l’idée que tu veux confronter au marché.',
      en: 'Describe the idea you want to test against the market.',
    },
  },
  POST_IDEA: {
    type: 'textarea',
    label: { fr: 'Ton idée de publication', en: 'Your post idea' },
    placeholder: { fr: 'Le message que tu veux faire passer.', en: 'The point you want to make.' },
  },
  PROFILE: {
    type: 'textarea',
    label: { fr: 'Ton profil', en: 'Your profile' },
    placeholder: { fr: 'Ton parcours, tes compétences.', en: 'Your background and skills.' },
  },
  PLATFORMS: {
    type: 'text',
    label: { fr: 'Tes plateformes', en: 'Your platforms' },
    placeholder: { fr: 'LinkedIn, X, YouTube…', en: 'LinkedIn, X, YouTube…' },
  },
  PROJECT: {
    type: 'textarea',
    label: { fr: 'Ton projet', en: 'Your project' },
    placeholder: { fr: 'De quoi il s’agit, où tu en es.', en: 'What it is, where you stand.' },
  },
  SITUATION: {
    type: 'textarea',
    label: { fr: 'Ta situation', en: 'Your situation' },
    placeholder: { fr: 'Décris ce que tu traverses.', en: 'Describe what you are going through.' },
  },
  CONTEXT: {
    type: 'textarea',
    label: { fr: 'Le contexte', en: 'Context' },
    placeholder: { fr: 'Ce que l’IA doit savoir pour t’aider.', en: 'What the AI needs to know.' },
  },
  CURRENT_PRICING: {
    type: 'textarea',
    label: { fr: 'Ton pricing actuel', en: 'Your current pricing' },
    placeholder: { fr: 'Tes offres et leurs tarifs.', en: 'Your offers and their prices.' },
  },
  PRODUCT_PRICING: {
    type: 'textarea',
    label: { fr: 'Ton produit', en: 'Your product' },
    placeholder: {
      fr: 'Ce que tu vends et la valeur que ça crée.',
      en: 'What you sell and the value it creates.',
    },
  },
  COMPETITORS: {
    type: 'textarea',
    label: { fr: 'Ton marché et tes concurrents', en: 'Your market and competitors' },
    placeholder: {
      fr: 'Ton secteur et les acteurs que tu identifies.',
      en: 'Your sector and the players you see.',
    },
  },
  BUSINESS_MODEL: {
    type: 'textarea',
    label: { fr: 'Ton business model', en: 'Your business model' },
    placeholder: { fr: 'Comment tu gagnes de l’argent.', en: 'How you make money.' },
  },
  CUSTOMERS: {
    type: 'textarea',
    label: { fr: 'Tes clients', en: 'Your customers' },
    placeholder: { fr: 'Qui achète, et pourquoi.', en: 'Who buys, and why.' },
  },
  PITCH_CONTEXT: {
    type: 'textarea',
    label: { fr: 'Ton projet à pitcher', en: 'The project to pitch' },
    placeholder: {
      fr: 'Le projet, le stade, ce que tu cherches.',
      en: 'The project, its stage, what you are after.',
    },
  },
  LANDING_BRIEF: {
    type: 'textarea',
    label: { fr: 'Ton offre', en: 'Your offer' },
    placeholder: {
      fr: 'Ce que tu proposes, à qui, et le bénéfice principal.',
      en: 'What you offer, to whom, and the main benefit.',
    },
  },
  OUTREACH_BRIEF: {
    type: 'textarea',
    label: { fr: 'Ton contexte de prospection', en: 'Your outreach context' },
    placeholder: {
      fr: 'Ce que tu vends et qui tu vises.',
      en: 'What you sell and who you target.',
    },
  },
  FIRST_NAME: {
    type: 'text',
    label: { fr: 'Prénom du contact', en: 'Contact first name' },
    placeholder: { fr: 'Camille', en: 'Alex' },
  },
  COMPANY: {
    type: 'text',
    label: { fr: 'Entreprise du contact', en: 'Contact company' },
    placeholder: { fr: 'Nom de l’entreprise', en: 'Company name' },
  },
  OBSERVATION: {
    type: 'textarea',
    label: { fr: 'Ce que tu as remarqué', en: 'What you noticed' },
    placeholder: {
      fr: 'Un fait précis et récent sur cette personne.',
      en: 'A specific, recent fact about this person.',
    },
  },
  CONNECTION: {
    type: 'text',
    label: { fr: 'Votre point commun', en: 'Your common ground' },
    placeholder: { fr: 'Un lien réel entre vous.', en: 'A genuine link between you.' },
  },
  KEYWORD: {
    type: 'text',
    label: { fr: 'Ton mot-clé', en: 'Your keyword' },
    placeholder: { fr: 'Le terme que tu veux viser.', en: 'The term you want to rank for.' },
  },
  ONBOARDING_CONTEXT: {
    type: 'textarea',
    label: { fr: 'Ton produit', en: 'Your product' },
    placeholder: {
      fr: 'Ce que fait ton produit et le premier succès visé.',
      en: 'What your product does and the first win you aim for.',
    },
  },
  PROCESS: {
    type: 'textarea',
    label: { fr: 'Le process à documenter', en: 'The process to document' },
    placeholder: { fr: 'Décris les étapes telles que tu les fais.', en: 'Describe the steps as you do them.' },
  },
  MEETING_NOTES: {
    type: 'textarea',
    label: { fr: 'Tes notes de réunion', en: 'Your meeting notes' },
    placeholder: { fr: 'Colle tes notes brutes.', en: 'Paste your raw notes.' },
  },
  TASKS_TO_DELEGATE: {
    type: 'textarea',
    label: { fr: 'Les tâches à déléguer', en: 'Tasks to delegate' },
    placeholder: { fr: 'Le rôle visé et les tâches concernées.', en: 'The target role and the tasks involved.' },
  },
  FEATURE: {
    type: 'textarea',
    label: { fr: 'La fonctionnalité', en: 'The feature' },
    placeholder: { fr: 'Ce que tu veux construire, et pour qui.', en: 'What you want to build, and for whom.' },
  },
  BUSINESS_METRICS: {
    type: 'textarea',
    label: { fr: 'Tes chiffres', en: 'Your numbers' },
    placeholder: {
      fr: 'Prix, coûts, volumes — même approximatifs.',
      en: 'Prices, costs, volumes — even rough ones.',
    },
  },
}
