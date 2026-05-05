---
phase: 02-core-intelligence
plan: 04
subsystem: validation-agents
tags: [devil-advocate, validation, evaluator, funding-match, application-optimizer, writer]
requires: [02-01]
provides: [validation-closure-agents]
affects: [final-document-generation]
tech-stack:
  added: [hard-language-rule, scoring-thresholds, Chile-funding-sources, 40-section-document]
  patterns: [lean-validation, jury-simulation, pitch-structure]
key-files:
  created: []
  modified:
    - midi-framework/templates/base/.midi/agents/midi-devil-advocate-agent.md
    - midi-framework/templates/base/.midi/agents/midi-validation-agent.md
    - midi-framework/templates/base/.midi/agents/midi-evaluator-agent.md
    - midi-framework/templates/base/.midi/agents/midi-funding-match-agent.md
    - midi-framework/templates/base/.midi/agents/midi-application-optimizer-agent.md
    - midi-framework/templates/base/.midi/agents/midi-writer-agent.md
decisions:
  - Devil advocate is MANDATORY with hard language rule
  - Evaluator uses 13 dimensions with risk modifier
  - Writer creates 40-section final document
metrics:
  duration: "55 minutes"
  files_modified: 6
  tasks_completed: 6
---

# Phase 2 Plan 04: Validation and Closure Agents Summary

## One-liner
Implemented 6 validation agents including MANDATORY devil advocate with hard language rule, Lean validation framework, evaluator scoring 0-100 with 13 dimensions, Chile-specific funding sources, application optimization, and final document writer with 40 sections.

## Changes Made

### 1. midi-devil-advocate-agent.md
- **CRITICAL:** Marked as MANDATORY (cannot be skipped)
- Added hard language rule (no soft language)
- Defined 12 critique dimensions
- Created 5 recommendation options (Continuar/Iterar/Fusionar/Pausar/Descartar)
- Added devil_report.md output format

### 2. midi-validation-agent.md
- Created hypothesis prioritization framework
- Defined 5 validation methods (interviews, landing, pre-sale, pilot, concierge)
- Added MVP specification process
- Documented metrics and success criteria

### 3. midi-evaluator-agent.md
- Created 13-dimension scoring system
- Defined thresholds (≥85 Excellent, 70-84 Good, 55-69 Regular, 40-54 Weak, <40 No viable)
- Added risk modifier system
- Created strength/weakness analysis framework

### 4. midi-funding-match-agent.md
- Compiled Chile funding sources (CORFO, SERCOTEC, FIA, FOSIS, incubators, VCs)
- Created status classification (Confirmado/Sugerido/Pendiente)
- Added matching criteria framework
- Defined funding strategy output format

### 5. midi-application-optimizer-agent.md
- Created narrative strengthening framework
- Defined 5 narrative elements
- Added SMART indicators framework
- Created pitch improvement structure

### 6. midi-writer-agent.md
- Defined 40-section final document structure
- Created quality checks framework
- Added consistency verification
- Documented guardrails (no devil advocate = no final doc)

## Verification

| Check | Status |
|-------|--------|
| Devil advocate is MANDATORY | ✅ |
| Evaluator has scoring | ✅ |
| Writer has 40 sections | ✅ |

## Deviations from Plan
None - plan executed exactly as written.

## Critical Features

### Devil Advocate Hard Language Rule
- ❌ NO: "Podría mejorar un poco..."
- ✅ YES: "Esta idea PODRÍA FRACASAR porque..."

### Evaluator Thresholds
- ≥85: Excelente - Listo para postular
- 70-84: Bueno - Iterar detalles menores
- 55-69: Regular - Requiere mejoras
- <55: No viable

## Next Steps
- All agents complete
- Plan 05 (skills/commands/workflows) ready
