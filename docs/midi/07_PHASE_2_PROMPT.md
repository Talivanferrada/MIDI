# 07 — Phase 2 Prompt: Core Intelligence, Agents, Skills & Workflows

Usa los archivos `docs/midi/00_PROJECT_BRIEF.md` a `docs/midi/05_OUTPUTS.md` como fuente de verdad.

Ya existe el repositorio instalable de MIDI creado en Phase 1.

## Objetivo

Reemplazar placeholders por contenido real, profundo y operativo.

No rehagas la arquitectura salvo que encuentres un problema técnico importante.

## Entregables principales

Debes completar:

- agentes,
- skills,
- commands,
- workflows,
- templates,
- `agent-routing.json`,
- `scoring-rubric.json`,
- documentación de uso,
- reglas de calidad.

## Principio de diseño

Cada agente debe actuar como especialista real.

Cada agente debe tener:

- propósito específico,
- entradas,
- salidas,
- criterios de análisis,
- reglas,
- preguntas que puede hacer,
- archivos que lee,
- archivos que escribe,
- condiciones de activación,
- condiciones de término,
- riesgos de mala ejecución.

## Archivos globales obligatorios

Los agentes deben operar sobre:

- `midi-project/PROJECT_STATE.md`
- `midi-project/DECISION_LOG.md`
- `midi-project/ASSUMPTIONS.md`
- `midi-project/RISK_REGISTER.md`
- `midi-project/USER_CONTEXT.md`
- `midi-project/IDEA_BACKLOG.md`
- `midi-project/TOP3_IDEAS.md`
- `midi-project/FINAL_PROJECT_DOCUMENT.md`

## Agentes a completar

Completa los 20 agentes definidos en `02_AGENT_ARCHITECTURE.md`.

### Requisitos especiales por agente

#### midi-orchestrator

Debe:

- leer configuración,
- leer estado,
- decidir etapa,
- activar agentes,
- aplicar árbol de decisiones,
- exigir gates,
- bloquear final si faltan análisis,
- asegurar abogado del diablo obligatorio.

Reglas:

- Si no existe `USER_CONTEXT.md` completo, activar intake.
- Si no hay investigación global, activar research.
- Si no hay mínimo 10 ideas, activar creative.
- Si no hay top 3, activar hybridization y evaluator.
- Si una idea pasa a modo financiable, activar análisis profundo.
- Si devil advocate detecta riesgo crítico, volver a iteration.
- Si funding_focus=true, activar funding-match y application-optimizer.
- Si evaluación <70, recomendar iteración.

#### midi-intake-agent

Debe capturar:

- idea inicial,
- objetivo,
- país,
- región,
- ciudad/comuna,
- público,
- recursos,
- presupuesto,
- tiempo,
- habilidades,
- red,
- implementos,
- infraestructura,
- restricciones,
- motivaciones,
- nivel de riesgo,
- horizonte,
- fondos,
- inversionistas,
- rentabilidad rápida,
- innovación,
- impacto.

Debe generar `USER_CONTEXT.md`.

#### midi-global-research-agent

Debe investigar o dejar plan de investigación sobre:

- startups,
- proyectos similares,
- tendencias,
- tecnologías,
- modelos,
- casos exitosos,
- casos fallidos,
- referentes internacionales.

Si no hay web, marcar como pendiente de verificación.

#### midi-local-adaptation-agent

Debe adaptar al territorio, especialmente Chile.

Considerar:

- región,
- comuna,
- cultura,
- clima,
- logística,
- proveedores,
- permisos,
- mercado,
- fondos regionales.

#### midi-hybridization-agent

Debe fusionar ideas según reglas:

- innovadora + rentable,
- global + local,
- postulable + comercial,
- simple + escalable.

#### midi-devil-advocate-agent

Obligatorio.

Debe criticar duramente:

- problema,
- solución,
- mercado,
- competencia,
- innovación,
- factibilidad,
- finanzas,
- legal,
- equipo,
- timing,
- diferenciación,
- escalabilidad,
- narrativa,
- postulabilidad.

Debe recomendar:

- continuar,
- iterar,
- fusionar,
- pausar,
- descartar.

#### midi-legal-tax-agent

Debe proponer optimización lícita, pero rechazar:

- evasión,
- simulación,
- facturación falsa,
- ocultamiento,
- empresas sin sustancia,
- fraude.

Debe recomendar validación profesional cuando haya riesgo medio o alto.

#### midi-evaluator-agent

Debe puntuar 0-100 usando `scoring-rubric.json`.

Debe simular:

- jurado de fondo,
- inversionista,
- comité técnico.

Debe entregar:

- puntaje total,
- puntaje por dimensión,
- fortalezas,
- debilidades,
- mejoras,
- recomendación.

## Skills

Completa skills:

- research.md
- benchmarking.md
- business-model-canvas.md
- lean-canvas.md
- market-analysis.md
- financial-analysis.md
- legal-tax-analysis.md
- devil-advocate.md
- funding-strategy.md
- pitch-writing.md
- project-documentation.md

Cada skill debe contener:

- objetivo,
- cuándo usar,
- método,
- inputs,
- outputs,
- formato recomendado,
- errores comunes,
- criterios de calidad.

## Commands

Completa comandos:

- `/midi-start`
- `/midi-explore`
- `/midi-top3`
- `/midi-financeable`
- `/midi-devil`
- `/midi-canvas`
- `/midi-evaluate`
- `/midi-final`

Cada comando debe tener:

- objetivo,
- precondiciones,
- agentes activados,
- pasos,
- archivos de entrada,
- archivos de salida,
- criterios de término.

## Workflows

Completa:

- `exploration.workflow.md`
- `financeable.workflow.md`
- `full-midi.workflow.md`

Deben ser operativos y seguir lo definido en `03_WORKFLOWS.md`.

## agent-routing.json

Debe incluir:

- modos,
- etapas,
- agentes requeridos,
- agentes opcionales,
- condiciones de activación,
- condiciones de retorno,
- gates humanos,
- reglas de bloqueo.

Reglas mínimas:

- bloquear final si no pasó por devil advocate,
- bloquear final si no hay análisis financiero,
- bloquear final si no hay análisis legal/tributario cuando aplica,
- bloquear modo financiable si no hay idea seleccionada,
- volver a hybridization si evaluación <70,
- activar legal-tax si hay permisos, empresa, salud, alimentos, educación, datos personales, turismo, finanzas o impuestos,
- activar funding si funding_focus=true.

## scoring-rubric.json

Debe contemplar dos scoring:

### idea_exploration_score

- innovación,
- interés del usuario,
- facilidad de validación,
- potencial comercial,
- adaptabilidad,
- diferenciación,
- alineación con recursos.

### financeable_project_score

- problema,
- solución,
- innovación,
- mercado,
- modelo de negocio,
- factibilidad técnica,
- factibilidad financiera,
- legal/tributario,
- impacto,
- escalabilidad,
- equipo/encaje usuario,
- narrativa,
- postulabilidad,
- riesgo.

## Templates

Completa especialmente:

- `final-project-document.md`
- `business-model-canvas.md`
- `lean-canvas.md`
- `financial-analysis.md`
- `legal-tax-analysis.md`
- `risk-matrix.md`
- `evaluator-scorecard.md`

El documento final debe incluir todos los puntos definidos en `05_OUTPUTS.md`.

## Reglas de calidad

Agregar a docs/config:

- no inventar cifras,
- marcar supuestos,
- diferenciar hechos/inferencias/recomendaciones,
- si se requiere web y no hay acceso, marcar “requiere verificación”,
- no declarar viabilidad sin análisis,
- no declarar financiabilidad sin evaluación,
- no finalizar sin abogado del diablo,
- no suavizar riesgos.

## Criterios de aceptación

Phase 2 estará completa solo si:

- todos los agentes tienen instrucciones profundas,
- skills están completas,
- workflows son ejecutables por un agente,
- scoring tiene pesos reales,
- routing tiene reglas útiles,
- templates están completos,
- comandos tienen precondiciones y outputs,
- abogado del diablo es obligatorio,
- existe evaluación tipo jurado,
- existe modo exploración y modo financiable,
- el sistema puede iterar si una idea falla.

## Entrega

Al terminar, entregar:

1. resumen de archivos modificados,
2. descripción del flujo MIDI resultante,
3. cómo usar modo exploración,
4. cómo usar modo financiable,
5. cómo pasar de idea a documento final,
6. pendientes para Phase 3.

