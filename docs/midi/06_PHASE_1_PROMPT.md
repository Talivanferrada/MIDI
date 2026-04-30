# 06 — Phase 1 Prompt: Repository Bootstrap & Installer

Usa los archivos `docs/midi/00_PROJECT_BRIEF.md` a `docs/midi/05_OUTPUTS.md` como fuente de verdad.

## Objetivo

Construir la primera versión del repositorio instalable de MIDI.

Esta fase debe crear un proyecto real, funcional, instalable y extensible.

No debes desarrollar todavía toda la inteligencia profunda de los agentes. Debes crear la arquitectura, CLI, estructura, placeholders útiles, configuración, documentación y tests básicos.

## Nombre del repositorio

`midi-framework`

## Stack técnico

Usar preferentemente:

- Node.js
- npm
- Commander.js o equivalente
- fs-extra o equivalente
- prompts, inquirer o enquirer para instalación interactiva
- Vitest o Jest para tests básicos

Debe funcionar en:

- Windows
- macOS
- Linux

## Comandos objetivo

El CLI debe permitir:

```bash
midi init
midi init --yes
midi init --project-name "Mi Proyecto" --country "Chile" --region "Maule" --mode "full" --platform "opencode"
midi doctor
midi --version
```

Opcionalmente preparar publicación futura como:

```bash
npx create-midi-framework@latest
npx midi-framework init
```

## Estructura del repositorio

Crear:

```text
midi-framework/
  package.json
  README.md
  LICENSE
  .gitignore
  bin/
    midi.js
  src/
    cli/
      init.js
      doctor.js
      prompts.js
      logger.js
    installer/
      createStructure.js
      copyTemplates.js
      detectPlatform.js
      writeConfig.js
      validateInstall.js
    utils/
      fileSystem.js
      pathUtils.js
  templates/
    base/
      .midi/
        config/
        agents/
        skills/
        commands/
        templates/
        workflows/
        docs/
      midi-project/
        00_intake/
        01_research/
        02_insights/
        03_ideas/
        04_top3/
        05_analysis/
        06_devil_advocate/
        07_iteration/
        08_canvas/
        09_technical_financial_legal/
        10_validation/
        11_funding/
        12_evaluation/
        13_final/
  tests/
    init.test.js
    doctor.test.js
```

Puedes mejorar la estructura si lo justificas, pero no elimines estos conceptos.

## Estructura que debe instalar en el proyecto usuario

```text
.midi/
  config/
    midi.config.json
    agent-routing.json
    scoring-rubric.json
  agents/
    midi-orchestrator.md
    midi-intake-agent.md
    midi-global-research-agent.md
    midi-local-adaptation-agent.md
    midi-benchmark-agent.md
    midi-insight-agent.md
    midi-creative-agent.md
    midi-hybridization-agent.md
    midi-market-agent.md
    midi-business-model-agent.md
    midi-technical-agent.md
    midi-financial-agent.md
    midi-legal-tax-agent.md
    midi-devil-advocate-agent.md
    midi-validation-agent.md
    midi-funding-match-agent.md
    midi-evaluator-agent.md
    midi-application-optimizer-agent.md
    midi-risk-agent.md
    midi-writer-agent.md
  skills/
    research.md
    benchmarking.md
    business-model-canvas.md
    lean-canvas.md
    market-analysis.md
    financial-analysis.md
    legal-tax-analysis.md
    devil-advocate.md
    funding-strategy.md
    pitch-writing.md
    project-documentation.md
  commands/
    midi-start.md
    midi-explore.md
    midi-top3.md
    midi-financeable.md
    midi-devil.md
    midi-canvas.md
    midi-evaluate.md
    midi-final.md
  templates/
    intake-form.md
    idea-card.md
    top3-comparison.md
    business-model-canvas.md
    lean-canvas.md
    market-analysis.md
    financial-analysis.md
    legal-tax-analysis.md
    risk-matrix.md
    evaluator-scorecard.md
    funding-strategy.md
    final-project-document.md
  workflows/
    exploration.workflow.md
    financeable.workflow.md
    full-midi.workflow.md
  docs/
    README.md
    INSTALL.md
    USAGE.md
    AGENTS.md
    WORKFLOWS.md

midi-project/
  PROJECT_STATE.md
  DECISION_LOG.md
  ASSUMPTIONS.md
  RISK_REGISTER.md
  USER_CONTEXT.md
  IDEA_BACKLOG.md
  TOP3_IDEAS.md
  FINAL_PROJECT_DOCUMENT.md
  00_intake/
  01_research/
  02_insights/
  03_ideas/
  04_top3/
  05_analysis/
  06_devil_advocate/
  07_iteration/
  08_canvas/
  09_technical_financial_legal/
  10_validation/
  11_funding/
  12_evaluation/
  13_final/
```

## Configuración

Crear `.midi/config/midi.config.json` con:

```json
{
  "framework": "MIDI",
  "framework_full_name": "Modelo Inteligente de Desarrollo de Innovación",
  "version": "0.1.0",
  "project_name": "",
  "country": "",
  "region": "",
  "language": "es",
  "default_mode": "full",
  "funding_focus": true,
  "legal_tax_country": "",
  "risk_level": "medium",
  "output_depth": "deep",
  "require_sources": true,
  "human_approval_gates": true,
  "agent_platform": "generic",
  "created_at": "",
  "updated_at": ""
}
```

Crear placeholders útiles para:

- `agent-routing.json`
- `scoring-rubric.json`

## Contenido mínimo de cada agente placeholder

Cada archivo de agente debe tener:

```markdown
# Agent: [nombre]

## Role
## Purpose
## When to activate
## Inputs
## Outputs
## Reads from
## Writes to
## Guardrails
## Current implementation status
```

No dejar archivos vacíos.

## Comandos Markdown

Cada comando debe tener:

- nombre,
- objetivo,
- agentes que activa,
- archivos que lee,
- archivos que escribe,
- flujo resumido,
- ejemplo de uso.

## Adaptación a plataformas

El instalador debe permitir seleccionar:

- opencode,
- claude-code,
- cursor,
- codex,
- windsurf,
- gemini-cli,
- generic.

Debe crear un archivo raíz de instrucciones:

- `AGENTS.md` para generic/opencode si no hay archivo específico claro,
- `CLAUDE.md` para Claude Code.

El archivo debe indicar que el agente debe leer `.midi/docs/README.md`, `.midi/config/midi.config.json` y `.midi/workflows/full-midi.workflow.md`.

## Tests mínimos

Crear tests que verifiquen:

1. `init` crea `.midi/`
2. `init` crea `midi-project/`
3. `init` crea config
4. `init` crea agentes
5. `doctor` detecta instalación válida

## Criterios de aceptación

Phase 1 estará completa solo si:

- `npm install` funciona,
- CLI se ejecuta localmente,
- `midi init` crea toda la estructura,
- `midi init --yes` funciona,
- `midi doctor` funciona,
- archivos no están vacíos,
- README explica el proyecto,
- tests básicos pasan,
- repo queda listo para Phase 2.

## Entrega

Al terminar, entregar:

1. resumen de lo creado,
2. árbol de archivos,
3. comandos para instalar y probar,
4. cómo ejecutar el CLI,
5. pendientes para Phase 2.

