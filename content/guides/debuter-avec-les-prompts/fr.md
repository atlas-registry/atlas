---
title: Débuter avec les Prompts
description: Le guide pratique pour comprendre comment structurer un prompt clair, exploitable et améliorable.
---

# Débuter avec les Prompts

Un prompt n’est pas une phrase "bien écrite".
C’est une instruction opérationnelle destinée à réduire l’ambiguïté.

Si le modèle se trompe souvent, ce n’est pas qu’il est mauvais.
C’est que le prompt est flou.

## 1. Commencer simple… puis préciser
Un bon prompt répond à 3 questions :
- Quoi ? (la tâche)
- Pour quoi ? (l’objectif)
- Avec quelles contraintes ?

Exemples :
- ❌ « Donne-moi une idée de business »
- ✅ « Propose 3 idées de business B2C, marge brute >40%, lançables en 30 jours, budget max 2 000€, sans logistique physique. »

Astuce : commence large, puis ajoute une contrainte à la fois. Trop de contraintes dès le départ rigidifient la réponse.

## 2. Donner un rôle clair au modèle
Un rôle flou produit une réponse floue.

- ❌ « Agis comme un expert »
- ✅ « Agis comme un product manager B2B avec 10 ans d’expérience, habitué aux MVPs early-stage. »

Le rôle cadre le vocabulaire, les hypothèses et le niveau de détail.

## 3. Indiquer le livrable attendu
Ne laisse pas le modèle deviner le format.

Précise :
- type de sortie (liste, tableau, plan, texte)
- longueur
- niveau de détail

Exemple : « Réponds sous forme de liste numérotée, 1 phrase par point, sans introduction. »

## 4. Utiliser des exemples (few-shot)
Un exemple vaut mieux qu’une règle.

Exemple : « Voici une réponse que je considère comme bonne : [EXEMPLE]. Fais la même chose sur un autre sujet. »

Les modèles imitent mieux qu’ils ne comprennent.

## 5. Toujours challenger la réponse
Une réponse n’est jamais une vérité.

Ajoute systématiquement :
- « Quelles hypothèses implicites as-tu faites ? »
- « Quelle est l’opinion opposée ? »
- « Dans quels cas cette réponse serait fausse ? »

## 6. Boucle d’amélioration
Process simple :
1. Prompt brut
2. Réponse
3. Clarification
4. Simplification
5. Version stable

Le prompt parfait n’existe pas. Un prompt suffisamment bon et réutilisable, oui.
