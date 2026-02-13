# Contribuer à Amazing AI Tools

Les contributions sont bienvenues 🎉
Le but est simple : garder une liste utile, lisible et vraiment utilisée — pas un annuaire géant.

---

## 🛠️ Comment contribuer

1. **Forkez** le dépôt
2. Ajoutez ou modifiez un outil dans les fichiers concernés :
   - `tools.fr.json` / `tools.en.json` → ajoutez l'entrée avec le même schéma que les autres (les deux langues doivent avoir les mêmes IDs)
   - `prompts.fr.json` / `prompts.en.json` → idem pour les prompts
   - `guides.fr.json` / `guides.en.json` → idem pour les guides
3. Ouvrez une **Pull Request** incluant :
   - une courte description de l’outil
   - la catégorie envisagée
   - pourquoi il mérite sa place dans la liste

---

## 📐 Format JSON attendu

Les prompts doivent suivre la structure :

ROLE / CONTEXT / GOAL / FORMAT / INSTRUCTIONS / RULES / {{USERDATA}}

→ Voir la section **“Structure des prompts”** dans le `README.md` pour un exemple complet.

```json
{
  "id": "nom-unique",
  "name": "Nom du prompt",
  "llm": ["gpt-4o", "claude-3.5"],
  "category": "dev",
  "labels": ["tag1"],
  "description": "Description...",
  "prompt": "Le prompt complet...",
  "example_input": "Exemple",
  "example_output": "Exemple"
}
```

---

## 💡 Règles simples

- Un outil = une PR si possible
- Pas de spam, affiliation ou placement marketing déguisé
- Description courte, claire, en français
- Pas d’emoji dans le JSON
- Propose uniquement des outils que tu utilises ou recommandes réellement

---

## ❓Besoin d’aide ?

- Ouvre une issue
- Ou viens discuter (Discord bientôt 😉)

Merci d’aider à faire de ce projet une ressource réellement utile 🙏
