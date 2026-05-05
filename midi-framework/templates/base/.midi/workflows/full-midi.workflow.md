# Workflow: Full MIDI

## Overview

El workflow completo de MIDI combina los Modos Exploración y Financeable en un flujo integrado que transforma una idea inicial en un proyecto completo, analizado, tensionado y listo para financiamiento.

**Objetivo:** Transformar cualquier idea inicial en proyecto real, financiable y ejecutable.

**Output final:** FINAL_PROJECT_DOCUMENT.md con evaluación tipo jurado.

---

## Complete Flow Diagram

```text
Idea Inicial
     ↓
/midi-start ─────────────────────────────────────────
     ↓
MODO EXPLORACIÓN
     ↓
Intake Mínimo
     ↓
[GATE 1: ¿Contexto suficiente?]
     ↓
Investigación Global
     ↓
Investigación Local
     ↓
Benchmarking
     ↓
[GATE 2: ¿Info suficiente para idear?]
     ↓
Síntesis de Insights
     ↓
Generación de 10-15 Ideas
     ↓
Hibridación y Scoring
     ↓
Selección Top 3
     ↓
[GATE 3: ¿Qué idea pasa a Financeable?]
     ↓
MODO FINANCIABLE
     ↓
Análisis Problema/Solución
     ↓
Análisis de Mercado (TAM/SAM/SOM)
     ↓
Business Model Canvas
     ↓
Lean Canvas
     ↓
Análisis Técnico
     ↓
Análisis Financiero
     ↓
Análisis Legal/Tributario
     ↓
Registro de Riesgos
     ↓
DEVIL'S ADVOCATE
     ↓
[GATE 4: ¿Continuar/Iterar/Fusionar/Descartar?]
     ↓
Iteración (si requerida)
     ↓
Plan de Validación
     ↓
Estrategia de Financiamiento
     ↓
Evaluación Tipo Jurado
     ↓
[GATE 5: ¿Calidad suficiente?]
     ↓
Optimización Narrativa
     ↓
Documento Final
     ↓
FINAL_PROJECT_DOCUMENT.md
```

---

## Commands Sequence

### Inicio

```text
/midi-start     → Inicializa proyecto y captura contexto
```

### Modo Exploración

```text
/midi-explore   → Ejecuta exploración completa
                 (investigación, insights, ideas, scoring)
                 
/midi-top3      → Genera/regenera análisis top 3
                 (si se ejecuta después de /midi-explore, usa ideas existentes)
```

### Transición

```text
/midi-financeable → Transiciona a Modo Financeable
                   (toma idea seleccionada del top 3)
```

### Modo Financeable

```text
/midi-devil     → Ejecuta devil's advocate
                 (obligatorio antes de evaluación)
                 
/midi-canvas    → Regenera BMC y Lean Canvas
                 (si se requiere después de iteraciones)
                 
/midi-evaluate  → Ejecuta evaluación tipo jurado
                 (score 0-100 con recomendación)
                 
/midi-final     → Genera documento final
                 (40 secciones consolidadas)
```

---

## Human Gates

### Gate 1: Después de Intake

**Pregunta:** ¿El contexto del usuario es suficiente?

**Si NO:**
- Pedir datos críticos faltantes
- Marcar supuestos en USER_CONTEXT.md
- Re-ejecutar intake si es necesario

**Si SÍ:**
- Documentar decisión en DECISION_LOG.md
- Continuar a investigación

---

### Gate 2: Después de Investigación

**Pregunta:** ¿Hay suficiente información para idear?

**Si NO:**
- Generar plan de investigación pendiente
- Identificar gaps de información
- Ampliar alcance de investigación

**Si SÍ:**
- Continuar a síntesis de insights

---

### Gate 3: Después de Top 3

**Pregunta:** ¿Qué idea pasa a Modo Financeable?

**Si NO hay decisión:**
- Recomendar una idea basada en contexto
- Explicar trade-offs de cada opción
- Mostrar scoring detallado

**Si SÍ:**
- Documentar selección en DECISION_LOG.md
- Preparar transición a Modo Financeable

---

### Gate 4: Después de Devil's Advocate

**Pregunta:** ¿La idea debe continuar, iterar, fusionarse o descartarse?

**Opciones:**

| Decisión | Condición | Acción |
|----------|-----------|--------|
| CONTINUAR | Fundamentos robustos | Pasar a validación |
| ITERAR | Mejoras identificadas | Implementar y re-evaluar |
| FUSIONAR | Combinación prometedora | Fusionar con otra idea |
| DESCARTAR | Fundamentos débiles | Volver a selección de idea |

**Si ITERAR:**
- Generar iteration_plan.md
- Implementar mejoras
- Re-ejecutar /midi-devil

---

### Gate 5: Después de Evaluación

**Pregunta:** ¿El proyecto alcanza calidad suficiente?

**Regla de puntaje:**

| Puntaje | Recomendación | Acción |
|---------|---------------|--------|
| >75 | POSTULAR | Proceder a documento final |
| 60-74 | ITERAR | Mejoras antes de postular |
| 45-59 | VALIDAR ANTES | Validar hipótesis críticas |
| <45 | DESCARTAR/PIVOTAR | Reconsiderar dirección |

**Si <70 y usuario decide avanzar:**
- Documentar riesgo en DECISION_LOG.md
- Advertir sobre debilidades
- Continuar con precaución

---

## Reglas de Retorno

### Durante Exploración

| Situación | Acción |
|-----------|--------|
| Idea innovadora pero poco ejecutable | Volver a hibridación |
| Idea rentable pero poco innovadora | Mejorar diferenciación |
| Contexto insuficiente | Re-ejecutar intake |
| Investigación insuficiente | Ampliar alcance |

### Durante Financeable

| Situación | Acción |
|-----------|--------|
| Idea postulable pero débil comercialmente | Mejorar modelo de ingresos |
| Riesgo legal alto | Activar legal-tax y risk agents |
| Baja validación | Activar validation-agent |
| Baja narrativa | Activar pitch-writer-agent |
| Devil identifica problemas críticos | Iterar o descartar |

---

## Agents Activation Map

### Modo Exploración

| Stage | Agents Activated |
|-------|------------------|
| Intake | intake-agent, orchestrator-agent |
| Research | research-agent |
| Insights | insight-agent |
| Ideas | creative-agent, analyst-agent |
| Top 3 | analyst-agent, orchestrator-agent |

### Modo Financeable

| Stage | Agents Activated |
|-------|------------------|
| Selección | orchestrator-agent |
| Problema/Solución | analyst-agent |
| Mercado | analyst-agent |
| BMC | bmc-agent |
| Lean Canvas | bmc-agent |
| Técnico | analyst-agent |
| Financiero | financial-agent |
| Legal/Tributario | legal-tax-agent |
| Riesgos | risk-agent |
| Devil's Advocate | devil-advocate-agent, risk-agent |
| Iteración | orchestrator-agent + especialistas |
| Validación | validation-agent |
| Financiamiento | analyst-agent, financial-agent |
| Evaluación | evaluator-agent |
| Narrativa | pitch-writer-agent |
| Documento Final | orchestrator-agent, pitch-writer-agent |

---

## Output Files Summary

### Archivos de Estado (Continuos)

- `PROJECT_STATE.md` - Estado actual del proyecto
- `DECISION_LOG.md` - Registro de decisiones
- `ASSUMPTIONS.md` - Supuestos y validación
- `RISK_REGISTER.md` - Riesgos y mitigaciones
- `USER_CONTEXT.md` - Perfil del usuario
- `IDEA_BACKLOG.md` - Ideas generadas (Exploración)
- `TOP3_IDEAS.md` - Top 3 seleccionado (Exploración)

### Archivos de Exploración

- `00_intake/intake_form.md`
- `01_research/global_research.md`
- `01_research/local_adaptation.md`
- `01_research/benchmark.md`
- `02_insights/insights.md`
- `03_ideas/idea_*.md` (10-15 archivos)
- `04_top3/top3_comparison.md`

### Archivos de Financeable

- `05_analysis/problem_solution_analysis.md`
- `05_analysis/market_analysis.md`
- `06_devil_advocate/devil_report.md`
- `07_iteration/iteration_plan.md` (si aplica)
- `08_canvas/business_model_canvas.md`
- `08_canvas/lean_canvas.md`
- `09_technical_financial_legal/technical_analysis.md`
- `09_technical_financial_legal/financial_analysis.md`
- `09_technical_financial_legal/legal_tax_analysis.md`
- `10_validation/validation_plan.md`
- `11_funding/funding_strategy.md`
- `12_evaluation/evaluator_scorecard.md`
- `13_final/FINAL_PROJECT_DOCUMENT.md`
- `13_final/EXECUTIVE_SUMMARY.md`
- `13_final/PITCH_DECK.md`

---

## Success Criteria

### Exploración

- [ ] Intake completado con contexto suficiente
- [ ] Gate 1 aprobado
- [ ] Investigación global y local realizada
- [ ] Benchmark de competidores
- [ ] Gate 2 aprobado
- [ ] Al menos 10 ideas generadas
- [ ] Scoring de todas las ideas
- [ ] Top 3 con análisis comparativo
- [ ] Gate 3 aprobado con decisión documentada

### Financeable

- [ ] Idea seleccionada confirmada
- [ ] Análisis completos (problema, mercado, modelo)
- [ ] BMC y Lean Canvas generados
- [ ] Análisis técnico, financiero, legal
- [ ] Riesgos documentados
- [ ] Devil's advocate ejecutado
- [ ] Gate 4 aprobado
- [ ] Plan de validación definido
- [ ] Estrategia de financiamiento
- [ ] Evaluación completada
- [ ] Gate 5 aprobado
- [ ] Documento final de 40 secciones

---

## Quick Reference

### Flujo Típico Completo

```bash
# Iniciar
/midi-start

# Exploración
/midi-explore
# [Gate 1, 2, 3 automáticos durante el comando]

# Transición
/midi-financeable

# Financeable
/midi-devil
# [Gate 4 - decidir continuar/iterar]
/midi-evaluate
# [Gate 5 - decidir postular/iterar]
/midi-final
```

### Flujo Abreviado (Idea Pre-Seleccionada)

Si ya tienes una idea clara sin necesidad de exploración:

```bash
/midi-start        # Intake mínimo
/midi-financeable  # Saltar exploración
/midi-devil        # Devil's advocate
/midi-evaluate     # Evaluación
/midi-final        # Documento final
```

---

## Implementation Status

- [ ] Placeholder - needs implementation