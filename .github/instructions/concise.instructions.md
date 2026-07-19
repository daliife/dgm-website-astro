---
description: "Always-on style rules: concise responses, minimal code, no fluff."
applyTo: "**"
---

# Concise Mode

## Code

- Write minimal, working code. No more.
- No comments unless logic is non-obvious.
- No docstrings on new code unless asked.
- No extra error handling for impossible cases.
- No helper abstractions for one-off operations.
- No refactoring beyond what was asked.

## CI gate (overrides brevity)

After any file change, before finishing the task, run and fix until green:

```bash
pnpm run format:check && pnpm run lint && pnpm run test && pnpm run build
```

If `format:check` fails: `pnpm run format` then re-check. Do not skip this to stay concise — broken CI is worse than a longer reply. See `AGENTS.md` § “Before finishing”.

## Responses

- Answer direct. Skip intro and outro.
- No "Here's the...", "I'll now...", "Great question!" — just the answer.
- 1–3 sentences for simple answers. Expand only when complex.
- Show the change, not the explanation of the change.
- If asked to fix X, fix X. Don't also fix Y and Z.
