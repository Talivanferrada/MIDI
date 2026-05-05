# Command: /midi-explore

## Objective
Inicia el Modo Exploración para investigar, descubrir oportunidades, generar ideas y seleccionar las mejores 3 para evaluación posterior.

## Preconditions
- [ ] `USER_CONTEXT.md` exists and is complete
- [ ] Project is in exploration mode or no mode set
- [ ] No TOP3_IDEAS.md exists yet (or user wants to regenerate)

## Agents Activated
- orchestrator-agent (coordina el flujo)
- research-agent (investigación global y local)
- insight-agent (síntesis de hallazgos)
- creative-agent (generación de ideas)
- analyst-agent (scoring preliminar)

## Files Read
- `USER_CONTEXT.md` (perfil del usuario)
- `PROJECT_STATE.md` (estado actual)
- `.midi/config/midi.config.yaml` (configuración)

## Files Written
- `01_research/global_research.md`
- `01_research/local_adaptation.md`
- `01_research/benchmark.md`
- `02_insights/insights.md`
- `03_ideas/idea_N.md` (múltiples archivos)
- `IDEA_BACKLOG.md`
- `04_top3/top3_comparison.md`
- `TOP3_IDEAS.md`
- `DECISION_LOG.md` (actualizado)

## Flow
1. **Preparación**
   - Verificar que existe USER_CONTEXT.md
   - Confirmar que el proyecto está en Modo Exploración
   - Presentar el plan de exploración

2. **Investigación Global** (research-agent)
   - Tendencias internacionales
   - Modelos exitosos
   - Innovaciones relevantes
   - Output: `01_research/global_research.md`

3. **Investigación Local** (research-agent)
   - Adaptación al contexto chileno
   - Actores locales
   - Regulaciones
   - Output: `01_research/local_adaptation.md`

4. **Benchmarking** (research-agent)
   - Competidores y referentes
   - Análisis comparativo
   - Gaps identificados
   - Output: `01_research/benchmark.md`

5. **Gate Humano 2**
   - Preguntar: "¿Hay suficiente información para idear?"
   - Si no → generar plan de investigación pendiente
   - Si sí → continuar

6. **Síntesis de Insights** (insight-agent)
   - Consolidar hallazgos
   - Identificar oportunidades
   - Detectar patrones
   - Output: `02_insights/insights.md`

7. **Generación de Ideas** (creative-agent)
   - Generar 10-15 ideas
   - Cada idea con: nombre, descripción, cliente, problema, solución
   - Hibridar combinaciones prometedoras
   - Output: `IDEA_BACKLOG.md` + `03_ideas/*.md`

8. **Scoring Preliminar** (analyst-agent)
   - Evaluar cada idea con criterios predefinidos
   - Innovación, ejecutabilidad, rentabilidad, riesgo
   - Output: Scoring en `IDEA_BACKLOG.md`

9. **Selección Top 3**
   - Presentar ideas rankeadas
   - Explicar criterios de selección
   - Recomendar top 3
   - Output: `TOP3_IDEAS.md`

10. **Gate Humano 3**
    - Preguntar: "¿Qué idea pasa a Modo Financeable?"
    - Si no hay decisión → recomendar una con trade-offs
    - Si sí → preparar transición

## Human Gates
- **Gate 2:** ¿Hay suficiente información para idear?
- **Gate 3:** ¿Qué idea pasa a Modo Financeable?

## Example Usage
```
User: /midi-explore

Agent: Iniciando Modo Exploración...

Plan de exploración:
1. ✓ Investigación global (tendencias, referentes)
2. ✓ Investigación local (contexto chileno)
3. ✓ Benchmarking (competidores, gaps)
4. [GATE 2] ¿Suficiente info para idear?
5. ✓ Síntesis de insights
6. ✓ Generación de 10-15 ideas
7. ✓ Hibridación y scoring
8. ✓ Selección Top 3
9. [GATE 3] Selección de idea ganadora

Comenzando investigación global...

[Ejecuta research-agent]

Investigación completada. Ver 01_research/global_research.md

[GATE 2] He completado la investigación. ¿Hay suficiente información para comenzar a generar ideas, o necesito profundizar en algo específico?

User: Suficiente, continuemos.

Agent: Perfecto. Sintetizando insights...

[Ejecuta insight-agent y creative-agent]

He generado 12 ideas basadas en la investigación. Las top 5 son:

1. Marketplace de comida saludable (Score: 78/100)
2. App de meal prep personalizado (Score: 75/100)
3. Suscripción de snacks saludables (Score: 71/100)
4. Ghost kitchen de comida saludable (Score: 68/100)
5. App de nutrición con delivery (Score: 65/100)

Ver todas las ideas en IDEA_BACKLOG.md

[GATE 3] ¿Cuál de estas ideas deseas desarrollar en Modo Financeable? También puedo recomendarte una basándome en tu contexto.
```

## Implementation Status
- [ ] Placeholder - needs implementation