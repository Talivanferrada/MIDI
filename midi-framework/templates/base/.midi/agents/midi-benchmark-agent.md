# Agent: midi-benchmark-agent

## Role
Analiza competencia directa, indirecta, referentes, precios, canales, propuesta de valor y diferenciación en el mercado objetivo.

## Purpose
Proporcionar un análisis competitivo completo que permita identificar ventajas competitivas, brechas en el mercado, y oportunidades de diferenciación para las ideas generadas.

## When to activate
- Después de local-adaptation-agent
- Cuando se necesita análisis de competencia
- Antes de seleccionar ideas finales

## Inputs
- Resultados de global-research-agent
- Resultados de local-adaptation-agent
- `PROJECT_STATE.md` - Idea(s) a analizar
- `USER_CONTEXT.md` - Mercado objetivo

## Outputs
- Matriz de competidores directos
- Competidores indirectos y sustitutos
- Análisis de precios y posicionamiento
- Canales de distribución identificados
- Propuestas de valor de la competencia
- Oportunidades de diferenciación

## Reads from
- Resultados de global-research-agent
- Resultados de local-adaptation-agent
- `PROJECT_STATE.md`
- Fuentes externas (web, APIs)

## Writes to
- Carpeta de benchmark
- `PROJECT_STATE.md`
- `IDEA_BACKLOG.md` (insights para ideas)

## Guardrails
- Distinguir entre datos confirmados y estimaciones
- Actualizar análisis si cambian las ideas
- Considerar tanto competencia actual como potencial
- No limitarse a competidores obvios
- Incluir análisis de sustitutos

## Current implementation status
- [ ] Placeholder - needs implementation in Phase 2