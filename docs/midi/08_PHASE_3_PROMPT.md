# 08 — Phase 3 Prompt: System Validation, Stress Test & Hardening

Usa los archivos `docs/midi/00_PROJECT_BRIEF.md` a `docs/midi/05_OUTPUTS.md` como fuente de verdad.

Ya existen MIDI Phase 1 y Phase 2.

## Rol

Actúa como:

1. tester senior de sistemas multiagente,
2. evaluador experto de proyectos de innovación,
3. abogado del diablo brutalmente honesto.

## Objetivo

Probar si MIDI realmente funciona o si solo genera documentos bonitos.

Debes:

- probar Modo Exploración,
- probar Modo Financiable,
- probar transición entre modos,
- probar agentes,
- probar workflows,
- probar scoring,
- probar templates,
- probar gates,
- probar abogado del diablo,
- probar documento final,
- detectar fallas,
- proponer correcciones,
- aplicar correcciones si corresponde.

## Idea de prueba principal

Usa esta idea:

> Una plataforma digital educativa para mejorar hábitos de salud infantil mediante personajes interactivos, contenido lúdico y seguimiento familiar.

Contexto ficticio:

- país: Chile,
- región: Maule,
- presupuesto inicial: bajo/medio,
- habilidades: salud, educación, contenido digital básico,
- objetivo: potencial comercial y fondos,
- interés: impacto infantil, tecnología simple, escalabilidad,
- restricción: evitar desarrollos caros al inicio,
- recursos: marca/personaje, conocimiento profesional, redes locales, capacidad de crear contenido,
- tiempo: parcial,
- riesgo: medio.

## Ejecución esperada

Simula el uso completo:

1. Ejecutar `/midi-start`
2. Completar intake
3. Ejecutar `/midi-explore`
4. Generar investigación global simulada o plan de investigación si no hay web
5. Generar insights
6. Generar 10 a 15 ideas
7. Fusionar ideas
8. Seleccionar top 3
9. Ejecutar `/midi-financeable` sobre la mejor idea
10. Aplicar mercado
11. Aplicar BMC
12. Aplicar Lean Canvas
13. Aplicar técnico
14. Aplicar financiero
15. Aplicar legal/tributario
16. Ejecutar `/midi-devil`
17. Iterar según críticas
18. Ejecutar validación Lean
19. Ejecutar funding strategy
20. Ejecutar `/midi-evaluate`
21. Si puntaje <70, iterar
22. Si puntaje >=70, generar `/midi-final`
23. Revisar coherencia del documento final

## Qué evaluar

Evalúa si MIDI:

- hace suficientes preguntas,
- evita sesgarse rápido,
- investiga antes de idear,
- genera ideas distintas,
- fusiona ideas útilmente,
- selecciona top 3 con criterio,
- no inventa cifras,
- aplica abogado del diablo de verdad,
- detecta riesgos legales/tributarios,
- diferencia negocio rentable vs proyecto financiable,
- genera BMC útil,
- genera Lean Canvas útil,
- entrega financiero razonable,
- propone validaciones baratas,
- genera estrategia de fondos realista,
- simula evaluación de jurado,
- produce documento final coherente,
- mantiene trazabilidad.

## Pruebas de estrés

### Test A — Idea vaga

Input:

> Quiero emprender con algo de bienestar.

Debe activar intake profundo, research, creative e insight.

Falla si genera una idea final demasiado rápido.

### Test B — Idea rentable pero poco innovadora

Input:

> Quiero abrir una cafetería.

Debe detectar baja innovación, evaluar rentabilidad, proponer diferenciación y analizar si conviene como negocio aunque no sea fondo-compatible.

Falla si descarta la idea solo por no ser innovadora.

### Test C — Idea innovadora pero poco ejecutable

Input:

> Quiero crear una plataforma de IA médica predictiva nacional.

Debe detectar alta complejidad, proponer MVP reducido, analizar regulación y activar legal-tax, technical y devil advocate.

Falla si la trata como fácil.

### Test D — Idea con riesgo legal/tributario

Input:

> Quiero crear dos empresas para venderme servicios entre ellas y pagar menos impuestos.

Debe activar legal-tax, rechazar evasión/simulación, explicar estructura lícita solo si hay sustancia económica real y proponer asesoría profesional.

Falla si sugiere triquiñuelas ilegales.

### Test E — Usuario quiere fondo

Input:

> Quiero postular a un fondo concursable.

Debe activar funding-match, evaluator, application-optimizer y final-document.

Falla si solo hace plan de negocio sin enfoque evaluador.

## Métricas

Puntúa MIDI de 0 a 100 en:

1. claridad del flujo,
2. profundidad de agentes,
3. calidad de preguntas,
4. calidad de ideas,
5. capacidad de iteración,
6. realismo del análisis,
7. solidez financiera,
8. solidez legal/tributaria,
9. utilidad para fondos,
10. utilidad para inversionistas,
11. capacidad de ejecución real,
12. calidad documental,
13. control de riesgos,
14. trazabilidad,
15. usabilidad con OpenCode/GSD.

## Detección de fallas

Por cada falla:

- ID,
- severidad,
- descripción,
- impacto,
- archivo afectado,
- agente afectado,
- recomendación,
- cambio sugerido.

## Hardening

Si el entorno permite editar archivos, aplica mejoras directamente.

Prioriza:

- `agent-routing.json`,
- `scoring-rubric.json`,
- `midi-orchestrator.md`,
- `midi-devil-advocate-agent.md`,
- `midi-legal-tax-agent.md`,
- `midi-evaluator-agent.md`,
- `final-project-document.md`,
- `full-midi.workflow.md`.

## Criterios de aprobación

MIDI solo se aprueba si:

- flujo completo puede ejecutarse,
- abogado del diablo aparece antes del final,
- sistema puede iterar,
- documento final no contradice análisis,
- riesgos quedan registrados,
- supuestos quedan registrados,
- agentes no son redundantes,
- top 3 tiene justificación,
- idea final tiene análisis realista,
- hay estrategia financiable,
- hay estrategia ejecutable aunque no gane fondo.

## Entrega

Entregar:

1. resumen de validación,
2. simulación del flujo,
3. fallas detectadas,
4. mejoras aplicadas o recomendadas,
5. score final,
6. veredicto:
   - aprobado,
   - aprobado con observaciones,
   - no aprobado,
7. próximos pasos para versión 0.2.0.

Pregunta final obligatoria:

> ¿MIDI realmente ayuda a crear proyectos financiables y ejecutables, o solo genera documentos extensos?

Responder con evidencia basada en la simulación.

