---
title: Prompt Engineering 101
description: Concrete techniques for structuring robust and reproducible prompts.
---

# Prompt Engineering 101

Prompt engineering is not a magic sentence.
It is a structuring discipline.

Your goal: prevent the model from going in the wrong direction.

## 1. Chain-of-Thought (Step-by-Step Reasoning)
Principle: "Explain your reasoning step by step before giving the answer."

Useful for:
- decisions
- analyses
- complex comparisons

Limitation: a detailed reasoning can be wrong but very convincing. Always verify the assumptions.

## 2. Few-Shot Examples
You provide 1 to 3 representative examples.

Structure:
- Input -> Expected output
- Then: "Do the same for X"

This is the most reliable technique today.

## 3. Structure the Prompt
Recommended order:
1. Context
2. Objective
3. Constraints
4. Expected format
5. Tone / style
6. Examples

If two rules contradict each other, the model will choose arbitrarily.

## 4. Built-in Quality Control
Ask for self-verification:
- "Identify any inconsistencies."
- "Suggest an improved version."
- "List the weak points of your answer."

Very effective for going from correct to solid.

## 5. Say What You Do Not Want
Models tend to over-introduce and over-conclude.

Example: "No introduction. No conclusion. Short sentences. No jargon."

## 6. Experimental Approach
Prompt engineering is empirical.

Simple rule: if you cannot explain why it works, you will not be able to reproduce it. Document your effective prompts.
