# Workflow: Exploration Mode

## Overview

El Modo Exploración de MIDI está diseñado para descubrir oportunidades, investigar el panorama, generar múltiples ideas y seleccionar las mejores 3 para evaluación posterior.

**Objetivo:** Ampliar posibilidades, investigar referentes, detectar tendencias, generar ideas y seleccionar las mejores.

**Output principal:** TOP3_IDEAS.md con análisis comparativo y recomendación.

---

## Stages

### Stage 1: Intake Mínimo

**Command:** `/midi-start`

**Agent:** intake-agent

**Activities:**
1. Capturar contexto del usuario
2. Entender objetivo principal (comercial, fondos, validación)
3. Identificar recursos y restricciones
4. Documentar en USER_CONTEXT.md

**Output:**
- `00_intake/intake_form.md`
- `USER_CONTEXT.md`

**Gate 1:** ¿El contexto del usuario es suficiente?
- Si NO → Pedir datos críticos, marcar supuestos
- Si SÍ → Continuar a investigación

---

### Stage 2: Investigación Global

**Agent:** research-agent

**Activities:**
1. Buscar tendencias internacionales
2. Identificar innovaciones y disruptores
3. Analizar modelos de negocio exitosos
4. Detectar oportunidades globales

**Output:**
- `01_research/global_research.md`

---

### Stage 3: Investigación Local

**Agent:** research-agent

**Activities:**
1. Adaptar hallazgos al contexto chileno
2. Identificar actores locales relevantes
3. Analizar regulaciones locales
4. Evaluar condiciones del mercado nacional

**Output:**
- `01_research/local_adaptation.md`

---

### Stage 4: Benchmarking

**Agent:** research-agent

**Activities:**
1. Identificar competidores y referentes
2. Analizar propuestas de valor
3. Comparar modelos de negocio
4. Detectar gaps y oportunidades

**Output:**
- `01_research/benchmark.md`

---

### Stage 5: Gate de Investigación

**Gate 2:** ¿Hay suficiente información para idear?
- Si NO → Generar plan de investigación pendiente
- Si SÍ → Continuar a síntesis

---

### Stage 6: Síntesis de Insights

**Agent:** insight-agent

**Activities:**
1. Consolidar hallazgos de investigación
2. Identificar patrones y tendencias
3. Detectar oportunidades específicas
4. Generar insights accionables

**Output:**
- `02_insights/insights.md`

---

### Stage 7: Generación de Ideas

**Agent:** creative-agent

**Activities:**
1. Generar 10-15 ideas basadas en insights
2. Cada idea con: nombre, descripción, cliente, problema, solución
3. Identificar ideas híbridas
4. Combinar elementos de ideas existentes

**Output:**
- `03_ideas/idea_01.md` hasta `idea_15.md`
- `IDEA_BACKLOG.md`

---

### Stage 8: Scoring Preliminar

**Agent:** analyst-agent

**Activities:**
1. Evaluar cada idea con criterios predefinidos
2. Criterios: Innovación, Ejecutabilidad, Rentabilidad, Fit, Riesgo
3. Rankear ideas por score total
4. Actualizar IDEA_BACKLOG.md con scores

**Output:**
- `IDEA_BACKLOG.md` actualizado con scores

---

### Stage 9: Selección Top 3

**Command:** `/midi-top3`

**Agent:** analyst-agent + orchestrator-agent

**Activities:**
1. Analizar top 5 ideas rankeadas
2. Crear matriz comparativa
3. Evaluar trade-offs
4. Generar recomendación basada en contexto del usuario
5. Documentar top 3 con pros, contras y scoring

**Output:**
- `04_top3/top3_comparison.md`
- `TOP3_IDEAS.md`

---

### Stage 10: Gate de Decisión

**Gate 3:** ¿Qué idea pasa a Modo Financeable?
- Si NO hay decisión → Recomendar una, explicar trade-offs
- Si SÍ → Preparar transición a Modo Financeable

---

## Commands Reference

| Command | Purpose | Agents |
|---------|---------|--------|
| `/midi-start` | Iniciar proyecto, intake | intake-agent, orchestrator-agent |
| `/midi-explore` | Ejecutar exploración completa | research-agent, insight-agent, creative-agent, analyst-agent |
| `/midi-top3` | Generar/regenerar top 3 | analyst-agent, creative-agent, orchestrator-agent |

---

## Files Generated

| File | Stage | Description |
|------|-------|-------------|
| `USER_CONTEXT.md` | 1 | Perfil del usuario |
| `00_intake/intake_form.md` | 1 | Respuestas del intake |
| `01_research/global_research.md` | 2 | Investigación internacional |
| `01_research/local_adaptation.md` | 3 | Adaptación Chile |
| `01_research/benchmark.md` | 4 | Análisis de referentes |
| `02_insights/insights.md` | 6 | Insights consolidados |
| `03_ideas/idea_*.md` | 7 | Ideas individuales |
| `IDEA_BACKLOG.md` | 7-8 | Backlog con scores |
| `04_top3/top3_comparison.md` | 9 | Matriz comparativa |
| `TOP3_IDEAS.md` | 9 | Top 3 seleccionado |
| `DECISION_LOG.md` | Continuo | Registro de decisiones |

---

## Success Criteria

- [ ] Intake completado con contexto suficiente
- [ ] Investigación global y local realizada
- [ ] Benchmark de competidores completado
- [ ] Al menos 10 ideas generadas
- [ ] Scoring de todas las ideas
- [ ] Top 3 seleccionado con análisis comparativo
- [ ] Gate 3 aprobado con decisión documentada

---

## Transition to Financeable Mode

Una vez completado el Modo Exploración y seleccionada una idea:

```
User: /midi-financeable
```

El sistema transiciona a Modo Financeable para desarrollar la idea seleccionada como proyecto completo.

---

## Reglas de Retorno

- Si una idea es innovadora pero poco ejecutable → Volver a hibridación
- Si una idea es rentable pero poco innovadora → Mejorar diferenciación
- Si el contexto del usuario cambia → Re-ejecutar intake
- Si la investigación es insuficiente → Ampliar alcance

---

## Implementation Status

- [ ] Placeholder - needs implementation