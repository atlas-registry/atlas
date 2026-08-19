---
title: Installer un Agent MCP
description: Guide opérationnel pour comprendre, installer et sécuriser un agent MCP.
---

# Installer un Agent MCP

Un agent MCP n’est pas magique.
C’est un serveur local que Claude sait appeler.

Si tu comprends ça, 80 % des bugs disparaissent.

## 1. Comprendre l’architecture
- L’agent tourne localement
- Il expose des capacités via MCP
- Claude Desktop agit comme client

Claude ne devine rien. Tout doit être explicitement déclaré.

## 2. Prérequis
- Claude Desktop installé
- Node.js ou Python
- Un dossier dédié par agent

Conseil : 1 agent = 1 repo Git versionné dès le départ.

## 3. Installer et lancer l’agent
Exemple Node :
```bash
npm install
npm run dev
```

Tu dois voir : « MCP server running… »
Sinon : dépendances manquantes, erreur de port ou script mal configuré.

## 4. Déclarer l’agent dans Claude Desktop
Dans `claude_desktop_config.json` :
```json
{
  "mcpServers": {
    "mon-agent": {
      "command": "node",
      "args": ["index.js"]
    }
  }
}
```

Sauvegarde puis redémarre complètement Claude Desktop.

## 5. Tester et déboguer
Erreurs fréquentes :
- JSON invalide
- mauvaise commande
- chemin incorrect
- agent lancé deux fois

Astuce : loggue systématiquement les entrées et sorties de l’agent.

## 6. Sécurité
Un agent MCP peut lire, écrire et exécuter du code.

Règle stricte : ne fais tourner que ce que tu comprends ligne par ligne.
