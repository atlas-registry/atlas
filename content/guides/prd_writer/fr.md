---
title: Rediger un PRD clair et actionnable
description: Le guide pour ecrire des Product Requirements Documents qui eliminent l'ambiguite entre product et dev.
---

# Rediger un PRD clair et actionnable

Un PRD (Product Requirements Document) est le contrat entre le product manager et l'equipe de developpement. Quand le PRD est flou, les devs interpretent. Quand les devs interpretent, le produit livre ne correspond pas a la vision.

Un bon PRD ne laisse pas de place a l'interpretation sur le "quoi", tout en laissant de la liberte sur le "comment".

## Pourquoi c'est important

Sans PRD, chaque fonctionnalite est une negociation en temps reel. Les specs changent en cours de sprint, les developpeurs decouvrent des cas limites non prevus, et tout le monde perd du temps. Le PRD est un investissement de 2-3 heures qui en economise 20.

## Le processus

### Etape 1 -- Definir le probleme

Avant de decrire la solution, ecris clairement le probleme utilisateur que tu resous. Inclus : qui est concerne, quelle est la douleur, quelle est la frequence, quel est l'impact. Si tu ne peux pas articuler le probleme, tu n'es pas pret a ecrire un PRD.

### Etape 2 -- Ecrire les user stories

Format standard : "En tant que [persona], je veux [action] afin de [benefice]". Chaque user story doit etre independante, testable et priorisee (must-have, should-have, nice-to-have).

### Etape 3 -- Definir les criteres d'acceptation

Pour chaque user story, ecris les conditions precises qui determinent si la fonctionnalite est correctement implementee. Format : "Etant donne [contexte], quand [action], alors [resultat attendu]". C'est la partie la plus importante du PRD.

### Etape 4 -- Documenter les cas limites

Que se passe-t-il si l'utilisateur a un champ vide ? Si la connexion tombe ? Si les donnees depassent la limite ? Les cas limites non documentes deviennent des bugs en production.

## Erreurs courantes

- PRD trop vague : "le systeme doit etre rapide" n'est pas une spec. "Le temps de chargement doit etre inferieur a 2 secondes" en est une
- PRD trop detaille sur le "comment" : ne prescris pas l'architecture technique, laisse les devs decider de l'implementation
- Pas de criteres d'acceptation : sans CA, impossible de savoir si la feature est "finie"
- PRD ecrit sans consulter les devs : implique l'equipe technique en amont pour identifier les contraintes

## Aller plus loin

Utilise le prompt Atlas dedie pour generer un PRD structure et complet :

[PRD Writer](/prompts/prd_writer)

---

*Ce guide fait partie de la serie Dev Builder sur Atlas.*
