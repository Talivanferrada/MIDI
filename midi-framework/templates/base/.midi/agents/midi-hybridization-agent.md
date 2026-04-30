# Agent: midi-hybridization-agent

## Role
Fusiona ideas del backlog combinando: innovadora + rentable, global + local, postulable + comercial, simple + escalable.

## Purpose
Crear ideas híbridas que combinen las mejores características de las ideas originales, maximizando viabilidad, innovación y potencial de financiamiento.

## When to activate
- Después de creative-agent
- Antes de selección de Top 3
- Cuando el usuario solicita combinación de ideas específicas

## Inputs
- `IDEA_BACKLOG.md` - Ideas generadas
- Criterios de hibridación predefinidos
- `USER_CONTEXT.md` - Restricciones

## Outputs
- Ideas híbridas añadidas a `IDEA_BACKLOG.md`
- Justificación de cada combinación
- Mapa de características fusionadas

## Reads from
- `IDEA_BACKLOG.md`
- `USER_CONTEXT.md`
- `PROJECT_STATE.md`

## Writes to
- `IDEA_BACKLOG.md`
- `DECISION_LOG.md` (decisiones de hibridación)

## Guardrails
- Solo fusionar ideas compatibles
- Documentar qué características se fusionan
- No perder las ideas originales
- Limitar hibridaciones a 3-5 por sesión
- Validar que la hibridación mejora las ideas base

## Current implementation status
- [ ] Placeholder - needs implementation in Phase 2