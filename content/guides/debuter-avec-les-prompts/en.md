---
title: Getting Started with Prompts
description: A practical guide to understanding how to structure a clear, actionable, and improvable prompt.
---

# Getting Started with Prompts

A prompt is not a "well-written" sentence.
It is an operational instruction designed to reduce ambiguity.

If the model gets it wrong often, it is not because it is bad.
It is because the prompt is vague.

## 1. Start Simple... Then Refine
A good prompt answers 3 questions:
- What? (the task)
- Why? (the objective)
- With what constraints?

Examples:
- Bad: "Give me a business idea"
- Good: "Suggest 3 B2C business ideas, gross margin >40%, launchable in 30 days, max budget 2,000 EUR, no physical logistics."

Tip: start broad, then add one constraint at a time. Too many constraints from the start make the response rigid.

## 2. Give the Model a Clear Role
A vague role produces a vague response.

- Bad: "Act like an expert"
- Good: "Act as a B2B product manager with 10 years of experience, used to early-stage MVPs."

The role frames the vocabulary, assumptions, and level of detail.

## 3. Specify the Expected Deliverable
Do not let the model guess the format.

Specify:
- output type (list, table, plan, text)
- length
- level of detail

Example: "Answer as a numbered list, 1 sentence per point, no introduction."

## 4. Use Examples (Few-Shot)
An example is worth more than a rule.

Example: "Here is a response I consider good: [EXAMPLE]. Do the same on a different topic."

Models imitate better than they understand.

## 5. Always Challenge the Response
A response is never the truth.

Systematically add:
- "What implicit assumptions did you make?"
- "What is the opposing view?"
- "In what cases would this answer be wrong?"

## 6. Improvement Loop
Simple process:
1. Raw prompt
2. Response
3. Clarification
4. Simplification
5. Stable version

The perfect prompt does not exist. A good-enough, reusable prompt does.
