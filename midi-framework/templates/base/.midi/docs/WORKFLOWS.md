# Workflows MIDI

## Workflow Principal

```
/midi-start
      ↓
  [Intake]
      ↓
  [Investigación]
      ↓
  [Insights]
      ↓
  [Ideación]
      ↓
  [Top 3] ← Gate Humano
      ↓
  [Modo Financiable]
      ↓
  [Abogado del Diablo] ⚠️ Obligatorio
      ↓
  [Evaluación] ← Gate: Puntaje ≥ 70
      ↓
  [Documento Final]
```

---

## Modo Exploración

### Objetivo
Descubrir oportunidades y seleccionar las mejores ideas.

### Secuencia

```
1. Intake mínimo
      ↓
2. Investigación global
      ↓
3. Investigación local (Chile)
      ↓
4. Benchmark
      ↓
5. Insights
      ↓
6. Generación de 10-15 ideas
      ↓
7. Hibridación
      ↓
8. Scoring preliminar
      ↓
9. Top 3
      ↓
10. Gate humano ← ¿Qué idea pasa a financiable?
```

### Agentes Activados

| Etapa | Agentes |
|-------|---------|
| Intake | intake-agent |
| Investigación | global-research, local-adaptation, benchmark |
| Insights | insight-agent |
| Ideación | creative-agent, hybridization-agent |
| Selección | orchestrator |

### Outputs

| Archivo | Contenido |
|---------|-----------|
| `USER_CONTEXT.md` | Contexto del usuario |
| `01_research/global_research.md` | Investigación global |
| `01_research/local_adaptation.md` | Adaptación local |
| `01_research/benchmark.md` | Análisis competitivo |
| `02_insights/insights.md` | Oportunidades detectadas |
| `IDEA_BACKLOG.md` | 10-15 ideas generadas |
| `TOP3_IDEAS.md` | Top 3 seleccionadas |
| `DECISION_LOG.md` | Decisiones tomadas |

---

## Modo Financiable

### Objetivo
Transformar una idea seleccionada en proyecto completo y financiable.

### Secuencia

```
1. Selección de idea
      ↓
2. Análisis de problema
      ↓
3. Análisis de solución
      ↓
4. Análisis de mercado
      ↓
5. Modelo de negocio (BMC + Lean Canvas)
      ↓
6. Análisis técnico
      ↓
7. Análisis financiero
      ↓
8. Análisis legal/tributario
      ↓
9. Riesgos
      ↓
10. Abogado del diablo ⚠️ OBLIGATORIO
      ↓
11. Gate: ¿Continuar o iterar?
      ↓
12. Plan de validación
      ↓
13. Estrategia de financiamiento
      ↓
14. Evaluación tipo jurado
      ↓
15. Gate: ¿Puntaje ≥ 70?
      ↓
16. Optimización de narrativa
      ↓
17. Documento final
```

### Agentes Activados

| Etapa | Agentes |
|-------|---------|
| Análisis | market-agent, business-model-agent |
| Factibilidad | technical-agent, financial-agent, legal-tax-agent |
| Validación | devil-advocate, validation-agent, risk-agent |
| Financiamiento | funding-match-agent, evaluator-agent |
| Cierre | application-optimizer, writer-agent |

### Outputs

| Archivo | Contenido |
|---------|-----------|
| `05_analysis/market_analysis.md` | Análisis de mercado |
| `08_canvas/business_model_canvas.md` | BMC |
| `08_canvas/lean_canvas.md` | Lean Canvas |
| `09_technical_financial_legal/` | Análisis técnico, financiero, legal |
| `RISK_REGISTER.md` | Registro de riesgos |
| `06_devil_advocate/devil_report.md` | Crítica constructiva |
| `10_validation/validation_plan.md` | Plan de validación |
| `11_funding/funding_strategy.md` | Estrategia de financiamiento |
| `12_evaluation/evaluator_scorecard.md` | Evaluación |
| `FINAL_PROJECT_DOCUMENT.md` | Documento maestro |

---

## Gates de Aprobación Humana

### Gate 1: Post-Intake
**Pregunta:** ¿El contexto capturado es suficiente?

**Si No:**
- Pedir datos críticos faltantes
- Marcar supuestos

---

### Gate 2: Post-Investigación
**Pregunta:** ¿Hay suficiente información para idear?

**Si No:**
- Generar plan de investigación pendiente
- Marcar qué falta investigar

---

### Gate 3: Post-Top 3
**Pregunta:** ¿Qué idea pasa a modo financiable?

**Opciones:**
- Seleccionar una
- Pedir más ideas
- Fusionar ideas
- Volver a investigar

---

### Gate 4: Post-Abogado del Diablo
**Pregunta:** ¿La idea debe continuar, iterar, fusionarse o descartarse?

**Opciones:**
- Continuar → pasar a validación
- Iterar → mejorar aspectos identificados
- Fusionar → combinar con otra idea
- Descartar → volver a top 3

---

### Gate 5: Post-Evaluación
**Pregunta:** ¿El proyecto alcanza calidad suficiente?

**Reglas:**
- Puntaje ≥ 70 → Aprobar
- Puntaje 55-69 → Requerir iteración
- Puntaje < 55 → Requerir cambios mayores

**Si usuario decide avanzar con puntaje bajo:**
- Documentar riesgo explícitamente
- Sugerir mejoras prioritarias

---

## Reglas de Retorno

| Problema Detectado | Acción |
|--------------------|--------|
| Idea innovadora pero poco ejecutable | Volver a hibridación |
| Rentable pero poco innovadora | Mejorar diferenciación |
| Postulable pero débil comercialmente | Mejorar modelo de ingresos |
| Riesgo legal alto | Activar legal-tax y risk |
| Baja validación | Activar validation-agent |
| Baja narrativa | Activar application-optimizer |

---

## Comandos de Workflow

| Comando | Workflow |
|---------|----------|
| `/midi-start` | Inicia workflow completo |
| `/midi-explore` | Solo modo exploración |
| `/midi-financeable` | Solo modo financiable (requiere idea seleccionada) |
| `/midi-final` | Solo documento final (requiere análisis completos) |

---

## Tiempos Estimados

| Modo | Tiempo Estimado |
|------|-----------------|
| Exploración | 2-4 horas |
| Financiable | 4-8 horas |
| Completo | 6-12 horas |

*Nota: Tiempos variables según complejidad del proyecto.*

---

## Checkpoints de Bloqueo

MIDI **no puede** generar documento final si faltan:

- [ ] Idea seleccionada
- [ ] Análisis de mercado
- [ ] Modelo de negocio (BMC o Lean Canvas)
- [ ] Análisis financiero
- [ ] Análisis legal/tributario (si aplica)
- [ ] Riesgos registrados
- [ ] Abogado del diablo ejecutado
- [ ] Evaluación completada
- [ ] Supuestos marcados
