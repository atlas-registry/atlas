---
title: Installing an MCP Agent
description: An operational guide to understanding, installing, and securing an MCP agent.
---

# Installing an MCP Agent

An MCP agent is not magic.
It is a local server that Claude knows how to call.

If you understand that, 80% of bugs disappear.

## 1. Understand the Architecture
- The agent runs locally
- It exposes capabilities via MCP
- Claude Desktop acts as a client

Claude does not guess anything. Everything must be explicitly declared.

## 2. Prerequisites
- Claude Desktop installed
- Node.js or Python
- A dedicated folder per agent

Advice: 1 agent = 1 Git repo, versioned from the start.

## 3. Install and Launch the Agent
Node example:
```bash
npm install
npm run dev
```

You should see: "MCP server running..."
Otherwise: missing dependencies, port error, or misconfigured script.

## 4. Declare the Agent in Claude Desktop
In `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "my-agent": {
      "command": "node",
      "args": ["index.js"]
    }
  }
}
```

Save then fully restart Claude Desktop.

## 5. Test and Debug
Common errors:
- Invalid JSON
- Wrong command
- Incorrect path
- Agent launched twice

Tip: systematically log the agent's inputs and outputs.

## 6. Security
An MCP agent can read, write, and execute code.

Strict rule: only run what you understand line by line.
