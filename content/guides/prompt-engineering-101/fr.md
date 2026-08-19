---
title: Prompt Engineering 101
description: Techniques concrètes pour structurer des prompts robustes et reproductibles.
---

# Prompt Engineering 101

Le prompt engineering n’est pas une phrase magique.
C’est une discipline de structuration.

Ton objectif : empêcher le modèle de partir dans la mauvaise direction.

## 1. Chain-of-Thought (raisonnement pas à pas)
Principe : « Explique ton raisonnement étape par étape avant de donner la réponse. »

Utile pour :
- décisions
- analyses
- comparaisons complexes

Limite : un raisonnement détaillé peut être faux mais très convaincant. Vérifie toujours les hypothèses.

## 2. Few-Shot Examples
Tu fournis 1 à 3 exemples représentatifs.

Structure :
- Input → Output attendu
- Puis : « Fais la même chose pour X »

C’est la technique la plus fiable aujourd’hui.

## 3. Structurer le prompt
Ordre recommandé :
1. Contexte
2. Objectif
3. Contraintes
4. Format attendu
5. Ton / style
6. Exemples

Si deux règles se contredisent, le modèle choisira arbitrairement.

## 4. Contrôle qualité intégré
Demande une auto-vérification :
- « Identifie les incohérences éventuelles. »
- « Propose une version améliorée. »
- « Liste les points faibles de ta réponse. »

Très efficace pour passer de correct à solide.

## 5. Dire ce que tu ne veux pas
Les modèles ont tendance à trop introduire et trop conclure.

Exemple : « Pas d’introduction. Pas de conclusion. Phrases courtes. Pas de jargon. »

## 6. Approche expérimentale
Le prompt engineering est empirique.

Règle simple : si tu ne peux pas expliquer pourquoi ça marche, tu ne pourras pas le reproduire. Documente tes prompts efficaces.
