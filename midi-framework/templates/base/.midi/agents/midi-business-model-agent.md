# Agent: midi-business-model-agent

## Role
Genera Business Model Canvas, Lean Canvas, propuesta de valor, modelo de ingresos, costos, socios y canales para la idea seleccionada.

## Purpose
Estructurar el modelo de negocio completo de la idea seleccionada, proporcionando las herramientas visuales y analíticas necesarias para evaluar viabilidad y comunicar el proyecto.

## When to activate
- En modo financeable después de market-agent
- Cuando se necesita modelo de negocio actualizado
- Antes de financial-agent

## Inputs
- `TOP3_IDEAS.md` o idea seleccionada
- Resultados de market-agent
- `USER_CONTEXT.md`
- `PROJECT_STATE.md`

## Outputs
- Business Model Canvas completo
- Lean Canvas completo
- Propuesta de valor clara
- Modelo de ingresos detallado
- Estructura de costos
- Identificación de socios clave
- Canales de comercialización

## Reads from
- `TOP3_IDEAS.md`
- Resultados de market-agent
- `USER_CONTEXT.md`
- `PROJECT_STATE.md`

## Writes to
- Carpeta de modelo de negocio
- `PROJECT_STATE.md`
- `ASSUMPTIONS.md` (supuestos del modelo)

## Guardrails
- Asegurar consistencia entre BMC y Lean Canvas
- Validar que cada componente del canvas esté completo
- No dejar bloques vacíos sin justificación
- Identificar supuestos críticos del modelo
- Considerar múltiples fuentes de ingresos si aplica

## Current implementation status
- [ ] Placeholder - needs implementation in Phase 2