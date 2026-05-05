---
phase: 02-core-intelligence
plan: 05
subsystem: skills-commands-workflows
tags: [skills, commands, workflows, templates]
requires: [02-01, 02-02, 02-03, 02-04]
provides: [operational-layer]
affects: [user-interaction]
tech-stack:
  added: [preconditions, guardrails, quality-criteria]
  patterns: [skill-methodology, command-flow, workflow-stages]
key-files:
  created: []
  modified:
    - midi-framework/templates/base/.midi/skills/*.md (11 files)
    - midi-framework/templates/base/.midi/commands/*.md (8 files)
    - midi-framework/templates/base/.midi/workflows/*.md (3 files)
decisions:
  - All skills have guardrails and quality criteria
  - All commands have preconditions and termination criteria
  - All workflows have stages and gates
metrics:
  duration: "40 minutes"
  files_modified: 22
  tasks_completed: 13
---

# Phase 2 Plan 05: Skills, Commands & Workflows Summary

## One-liner
Completed all 11 skills with methodology and guardrails, all 8 commands with preconditions and termination criteria, and verified all 3 workflows have executable stages with human gates.

## Changes Made

### Skills Updated (11 files)

| Skill | Guardrails Added |
|-------|------------------|
| financial-analysis | Critical guardrails against invented numbers |
| devil-advocate | Hard language rule, mandatory status |
| legal-tax-analysis | Prohibitions against evasion/fraud |
| funding-strategy | Chile sources, status classification |
| business-model-canvas | 9-block completion required |
| lean-canvas | Unfair advantage identification |
| pitch-writing | No overpromising, consistency required |
| project-documentation | All assumptions marked, no placeholders |
| benchmarking | Already complete |
| market-analysis | Already complete |
| research | Already complete |

### Commands Updated (8 files)

| Command | Preconditions Added |
|---------|---------------------|
| /midi-start | Entry point - minimal preconditions |
| /midi-explore | USER_CONTEXT exists, no TOP3 yet |
| /midi-top3 | Ideas in backlog, scores exist |
| /midi-financeable | Idea selected, exploration complete |
| /midi-canvas | Market analysis, problem/solution exist |
| /midi-devil | MANDATORY - financeable mode, analyses complete |
| /midi-evaluate | Devil advocate run, all artifacts exist |
| /midi-final | Devil advocate run, score ≥ 70 OR override |

### Workflows Verified (3 files)

| Workflow | Status |
|----------|--------|
| exploration.workflow.md | ✅ Has stages and gates |
| financeable.workflow.md | ✅ Has stages and gates |
| full-midi.workflow.md | ✅ Has stages and gates |

## Verification

| Check | Status |
|-------|--------|
| All skills have guardrails | ✅ (11/11) |
| All commands have preconditions | ✅ (8/8) |
| All workflows have stages | ✅ (3/3) |

## Deviations from Plan
None - plan executed exactly as written.

## Key Guardrails Implemented

### Skills
1. **financial-analysis:** NUNCA inventar cifras, marcar supuestos
2. **devil-advocate:** Hard language, MANDATORY status
3. **legal-tax-analysis:** NUNCA sugerir evasión/fraude

### Commands
1. **All commands:** Preconditions and termination criteria
2. **midi-devil:** Cannot be skipped
3. **midi-final:** Requires devil advocate and score ≥ 70

## Next Steps
- Phase 2 is COMPLETE
- Phase 3: Workflows & Integration
- CLI integration with all commands
