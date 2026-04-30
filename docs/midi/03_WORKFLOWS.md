# 03 — Workflows MIDI

## Workflow general

```text
/midi-start
↓
/midi-explore
↓
/midi-top3
↓
/midi-financeable
↓
/midi-devil
↓
/midi-canvas
↓
/midi-evaluate
↓
/midi-final
```

## Modo Exploración

Objetivo: descubrir oportunidades y elegir top 3 ideas.

### Etapas

1. Intake mínimo
2. Investigación global
3. Investigación local
4. Benchmark
5. Insights
6. Generación de 10 a 15 ideas
7. Hibridación
8. Scoring preliminar
9. Selección top 3
10. Gate humano

### Salidas

- `USER_CONTEXT.md`
- `01_research/global_research.md`
- `01_research/local_adaptation.md`
- `01_research/benchmark.md`
- `02_insights/insights.md`
- `IDEA_BACKLOG.md`
- `TOP3_IDEAS.md`
- `DECISION_LOG.md`

## Modo Financiable

Objetivo: transformar una idea seleccionada en proyecto completo.

### Etapas

1. Selección idea
2. Análisis de problema
3. Análisis de solución
4. Mercado
5. Modelo de negocio
6. Técnico
7. Financiero
8. Legal/tributario
9. Riesgos
10. Abogado del diablo
11. Iteración
12. Validación Lean
13. Estrategia de financiamiento
14. Evaluación jurado/inversionista
15. Optimización narrativa
16. Documento final

### Salidas

- `05_analysis/market_analysis.md`
- `08_canvas/business_model_canvas.md`
- `08_canvas/lean_canvas.md`
- `09_technical_financial_legal/technical_analysis.md`
- `09_technical_financial_legal/financial_analysis.md`
- `09_technical_financial_legal/legal_tax_analysis.md`
- `RISK_REGISTER.md`
- `06_devil_advocate/devil_report.md`
- `10_validation/validation_plan.md`
- `11_funding/funding_strategy.md`
- `12_evaluation/evaluator_scorecard.md`
- `FINAL_PROJECT_DOCUMENT.md`

## Full MIDI Workflow

```text
Idea inicial
↓
/midi-start
↓
Modo Exploración
↓
Top 3
↓
Selección humana o recomendada
↓
Modo Financiable
↓
Abogado del diablo
↓
Iteración
↓
Evaluación
↓
Documento final
```

## Gates obligatorios

### Gate 1 — Después de intake

Pregunta: ¿El contexto del usuario es suficiente?

Si no:
- pedir datos críticos,
- marcar supuestos.

### Gate 2 — Después de investigación

Pregunta: ¿Hay suficiente información para idear?

Si no:
- generar plan de investigación pendiente.

### Gate 3 — Después de top 3

Pregunta: ¿Qué idea pasa a modo financiable?

Si no hay decisión:
- recomendar una,
- explicar trade-offs.

### Gate 4 — Después de abogado del diablo

Pregunta: ¿La idea debe continuar, iterar, fusionarse o descartarse?

### Gate 5 — Después de evaluación

Pregunta: ¿El proyecto alcanza calidad suficiente?

Regla:
- si puntaje < 70, recomendar iteración;
- si el usuario decide avanzar, documentar riesgo.

## Reglas de retorno

- Si una idea es innovadora pero poco ejecutable → volver a hibridación.
- Si una idea es rentable pero poco innovadora → mejorar diferenciación.
- Si una idea es postulable pero débil comercialmente → mejorar modelo de ingresos.
- Si una idea tiene riesgo legal alto → activar legal-tax y risk.
- Si una idea tiene baja validación → activar validation-agent.
- Si una idea tiene baja narrativa → activar application-optimizer.

