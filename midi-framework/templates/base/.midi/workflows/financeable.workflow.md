# Workflow: Financeable Mode

## Overview

El Modo Financeable de MIDI toma una idea seleccionada y la desarrolla como proyecto completo, analizado, tensionado y listo para presentar a inversionistas o fondos concursables.

**Objetivo:** Transformar una idea en proyecto ejecutable, defendible y financiable.

**Output principal:** FINAL_PROJECT_DOCUMENT.md con 40 secciones completas.

---

## Prerequisites

- [ ] Modo Exploración completado (o idea pre-seleccionada)
- [ ] TOP3_IDEAS.md existe con idea seleccionada
- [ ] USER_CONTEXT.md con contexto del usuario

---

## Stages

### Stage 1: Selección de Idea

**Command:** `/midi-financeable`

**Agent:** orchestrator-agent

**Activities:**
1. Confirmar idea seleccionada
2. Verificar que existe en TOP3_IDEAS.md
3. Preparar transición a Modo Financeable
4. Actualizar PROJECT_STATE.md

**Output:**
- `PROJECT_STATE.md` actualizado (modo: financeable)

---

### Stage 2: Análisis de Problema y Solución

**Agent:** analyst-agent

**Activities:**
1. Definir problema claramente
2. Validar que es real y frecuente
3. Describir solución propuesta
4. Articular propuesta de valor
5. Identificar innovación

**Output:**
- `05_analysis/problem_solution_analysis.md`

---

### Stage 3: Análisis de Mercado

**Agent:** analyst-agent

**Activities:**
1. Calcular TAM/SAM/SOM
2. Segmentar clientes
3. Analizar competencia
4. Evaluar barreras de entrada
5. Identificar tendencias

**Output:**
- `05_analysis/market_analysis.md`

---

### Stage 4: Business Model Canvas

**Agent:** bmc-agent

**Activities:**
1. Completar los 9 bloques del BMC
2. Identificar supuestos críticos
3. Validar consistencia
4. Documentar hipótesis

**Output:**
- `08_canvas/business_model_canvas.md`

---

### Stage 5: Lean Canvas

**Agent:** bmc-agent

**Activities:**
1. Completar Lean Canvas
2. Priorizar hipótesis
3. Identificar ventaja injusta
4. Definir métricas clave

**Output:**
- `08_canvas/lean_canvas.md`

---

### Stage 6: Análisis Técnico

**Agent:** analyst-agent

**Activities:**
1. Evaluar factibilidad técnica
2. Definir arquitectura propuesta
3. Identificar tecnologías requeridas
4. Estimar esfuerzo de desarrollo

**Output:**
- `09_technical_financial_legal/technical_analysis.md`

---

### Stage 7: Análisis Financiero

**Agent:** financial-agent

**Activities:**
1. Proyectar ingresos 3-5 años
2. Modelar costos
3. Calcular unit economics (LTV, CAC, payback)
4. Determinar punto de equilibrio
5. Calcular necesidades de capital

**Output:**
- `09_technical_financial_legal/financial_analysis.md`

---

### Stage 8: Análisis Legal y Tributario

**Agent:** legal-tax-agent

**Activities:**
1. Recomendar estructura societaria
2. Identificar obligaciones tributarias
3. Analizar regulaciones sectoriales
4. Evaluar protección de activos

**Output:**
- `09_technical_financial_legal/legal_tax_analysis.md`

---

### Stage 9: Registro de Riesgos

**Agent:** risk-agent

**Activities:**
1. Identificar riesgos clave
2. Evaluar probabilidad e impacto
3. Proponer mitigaciones
4. Priorizar por severidad

**Output:**
- `RISK_REGISTER.md`

---

### Stage 10: Devil's Advocate

**Command:** `/midi-devil`

**Agent:** devil-advocate-agent

**Activities:**
1. Cuestionar supuestos del modelo
2. Identificar debilidades
3. Generar preguntas difíciles
4. Simular objeciones de inversionistas
5. Proponer mejoras

**Output:**
- `06_devil_advocate/devil_report.md`

---

### Stage 11: Gate de Decisión

**Gate 4:** ¿La idea debe continuar, iterar, fusionarse o descartarse?

**Decisiones posibles:**
- **CONTINUAR:** Proyecto robusto, pasar a validación
- **ITERAR:** Mejoras necesarias antes de continuar
- **FUSIONAR:** Combinar con otra idea del top 3
- **DESCARTAR:** Fundamentos muy débiles, volver a selección

Si ITERAR:
- Generar `07_iteration/iteration_plan.md`
- Ejecutar mejoras
- Re-ejecutar devil's advocate

---

### Stage 12: Iteración (si requerida)

**Agent:** orchestrator-agent + especialistas

**Activities:**
1. Implementar mejoras del devil report
2. Actualizar análisis afectados
3. Re-documentar cambios
4. Volver a Gate 4

**Output:**
- `07_iteration/iteration_plan.md`
- Archivos actualizados según cambios

---

### Stage 13: Plan de Validación

**Agent:** validation-agent

**Activities:**
1. Identificar hipótesis críticas
2. Diseñar experimentos
3. Definir métricas de validación
4. Establecer timeline

**Output:**
- `10_validation/validation_plan.md`

---

### Stage 14: Estrategia de Financiamiento

**Agent:** analyst-agent + financial-agent

**Activities:**
1. Mapear fuentes de financiamiento
2. Evaluar elegibilidad
3. Priorizar fuentes
4. Definir estrategia de abordaje

**Output:**
- `11_funding/funding_strategy.md`

---

### Stage 15: Evaluación

**Command:** `/midi-evaluate`

**Agent:** evaluator-agent

**Activities:**
1. Evaluar por dimensiones (Innovación, Ejecutabilidad, Mercado, etc.)
2. Calcular puntaje total 0-100
3. Analizar fortalezas y debilidades
4. Generar recomendación

**Output:**
- `12_evaluation/evaluator_scorecard.md`

---

### Stage 16: Gate de Calidad

**Gate 5:** ¿El proyecto alcanza calidad suficiente?

**Regla:**
- Si puntaje < 70 → Recomendar iteración
- Si usuario decide avanzar → Documentar riesgo en DECISION_LOG.md

**Recomendaciones:**
- **POSTULAR:** >75 puntos
- **ITERAR:** 60-74 puntos
- **VALIDAR ANTES:** 45-59 puntos
- **DESCARTAR:** <45 puntos

---

### Stage 17: Optimización Narrativa

**Agent:** pitch-writer-agent

**Activities:**
1. Refinar pitch
2. Mejorar storytelling
3. Preparar respuestas a objeciones
4. Optimizar comunicación

---

### Stage 18: Due Diligence Preparation

**Agent:** orchestrator-agent

**Activities:**
1. Generate due diligence checklist
2. Identify required documents
3. Flag missing items
4. Prepare data room structure
5. Calculate investor readiness score

**Output:**
- `14_due_diligence/due-diligence-checklist.md`
- `14_due_diligence/data-room-checklist.md`
- `PROJECT_STATE.md` updated with investor readiness status

---

### Stage 19: Documento Final

**Command:** `/midi-final`

**Agent:** orchestrator-agent + pitch-writer-agent

**Activities:**
1. Consolidar las 40 secciones
2. Generar FINAL_PROJECT_DOCUMENT.md
3. Crear Executive Summary
4. Preparar Pitch Deck

**Output:**
- `13_final/FINAL_PROJECT_DOCUMENT.md`
- `13_final/EXECUTIVE_SUMMARY.md`
- `13_final/PITCH_DECK.md`

---

## Commands Reference

| Command | Purpose | Agents |
|---------|---------|--------|
| `/midi-financeable` | Iniciar Modo Financeable | orchestrator-agent, analyst-agent, bmc-agent, financial-agent, legal-tax-agent, risk-agent |
| `/midi-devil` | Ejecutar devil's advocate | devil-advocate-agent, risk-agent |
| `/midi-canvas` | Regenerar BMC/Lean Canvas | bmc-agent, analyst-agent |
| `/midi-evaluate` | Evaluar proyecto completo | evaluator-agent |
| `/midi-final` | Generar documento final | orchestrator-agent, pitch-writer-agent |

---

## Files Generated

| File | Stage | Description |
|------|-------|-------------|
| `05_analysis/problem_solution_analysis.md` | 2 | Análisis problema/solución |
| `05_analysis/market_analysis.md` | 3 | Análisis de mercado |
| `08_canvas/business_model_canvas.md` | 4 | BMC completo |
| `08_canvas/lean_canvas.md` | 5 | Lean Canvas |
| `09_technical_financial_legal/technical_analysis.md` | 6 | Factibilidad técnica |
| `09_technical_financial_legal/financial_analysis.md` | 7 | Proyecciones financieras |
| `09_technical_financial_legal/legal_tax_analysis.md` | 8 | Legal y tributario |
| `RISK_REGISTER.md` | 9 | Registro de riesgos |
| `06_devil_advocate/devil_report.md` | 10 | Reporte devil's advocate |
| `07_iteration/iteration_plan.md` | 12 | Plan de iteración (si aplica) |
| `10_validation/validation_plan.md` | 13 | Plan de validación |
| `11_funding/funding_strategy.md` | 14 | Estrategia financiamiento |
| `12_evaluation/evaluator_scorecard.md` | 15 | Evaluación completa |
| `13_final/FINAL_PROJECT_DOCUMENT.md` | 19 | Documento maestro |
| `13_final/EXECUTIVE_SUMMARY.md` | 19 | Resumen ejecutivo |
| `13_final/PITCH_DECK.md` | 19 | Pitch deck |
| `14_due_diligence/due-diligence-checklist.md` | 18 | Checklist de due diligence |
| `14_due_diligence/data-room-checklist.md` | 18 | Estructura data room |

---

## Success Criteria

- [ ] Idea seleccionada confirmada
- [ ] Análisis de problema/solución completado
- [ ] Análisis de mercado con TAM/SAM/SOM
- [ ] BMC y Lean Canvas generados
- [ ] Análisis técnico, financiero y legal
- [ ] Riesgos identificados y documentados
- [ ] Devil's advocate ejecutado
- [ ] Gate 4 aprobado
- [ ] Plan de validación definido
- [ ] Estrategia de financiamiento documentada
- [ ] Evaluación completada (score documentado)
- [ ] Gate 5 aprobado
- [ ] Due diligence checklist generado
- [ ] Investor readiness verificado
- [ ] Documento final generado (40 secciones)

---

## Reglas de Retorno

- Si una idea es postulable pero débil comercialmente → Mejorar modelo de ingresos
- Si una idea tiene riesgo legal alto → Activar legal-tax y risk agents
- Si una idea tiene baja validación → Activar validation-agent
- Si una idea tiene baja narrativa → Activar application-optimizer
- Si devil's advocate identifica problemas críticos → Iterar o descartar

---

## Implementation Status

- [ ] Placeholder - needs implementation