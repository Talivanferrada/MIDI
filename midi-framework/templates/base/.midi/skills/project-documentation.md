# Skill: project-documentation

## Description
Estándares y metodología para crear documentación clara, completa y mantenible de proyectos MIDI, incluyendo el documento maestro final y archivos de estado.

## When to use
- Durante todo el proceso MIDI para mantener documentación actualizada
- Al crear el documento maestro final
- Para generar archivos de estado del proyecto
- Cuando se necesita comunicar el estado del proyecto
- Para crear handoff documentation

## Process
1. **Documentos de Estado**
   - PROJECT_STATE.md: Snapshot del proyecto
   - DECISION_LOG.md: Registro de decisiones
   - ASSUMPTIONS.md: Supuestos y validación
   - RISK_REGISTER.md: Riesgos y mitigaciones
   - USER_CONTEXT.md: Perfil del usuario

2. **Documentos de Proceso**
   - Mantener actualización continua
   - Versionar cambios significativos
   - Usar formato consistente
   - Incluir timestamps

3. **Documento Maestro Final**
   - Seguir estructura de 40 secciones
   - Consolidar información de todas las etapas
   - Incluir evidencia y fuentes
   - Formato profesional y presentable

4. **Calidad de Documentación**
   - Claridad y concisión
   - Evidencia respalda afirmaciones
   - Supuestos claramente marcados
   - Fuentes citadas
   - Actualizable

5. **Control de Versiones**
   - Versionar documentos clave
   - Mantener historial de cambios
   - Documentar razones de cambios

## Templates
- Todos los templates en `.midi/templates/`
- `final-project-document.md`

## Outputs
- Todos los archivos de estado
- `FINAL_PROJECT_DOCUMENT.md`
- Documentación específica por etapa

## Examples

### Ejemplo de uso
```
Usuario: Documenta el estado actual del proyecto.

Agente con skill project-documentation:
1. Actualiza PROJECT_STATE.md:
   - Nombre: "Fintech Créditos Pymes"
   - Modo: Financeable
   - Etapa: Devil's Advocate completado
   - Idea seleccionada: "Scoring alternativo para pymes"
   - Hipótesis: 5 validadas, 3 pendientes
   - Riesgos: 8 identificados, 5 mitigados
   - Próximos pasos: Iteración según devil report

2. Registra decisión en DECISION_LOG.md:
   - Fecha: 2026-04-30
   - Decisión: Pivotar de B2C a B2B
   - Agente: devil-advocate
   - Motivo: CAC muy alto en B2C
   - Alternativas descartadas: Marketing agresivo
   - Impacto: Reducción CAC 60%

3. Prepara FINAL_PROJECT_DOCUMENT.md:
   - Secciones 1-25 completadas
   - Secciones 26-30 en progreso
   - Faltan: validación, evaluación, pitch
```

## Guardrails
- ✅ ALL assumptions must be marked with confidence level
- ✅ ALL sources must be cited where possible
- ✅ NO contradictions between sections
- ✅ NO placeholder text in final documents
- ✅ Timestamp all major changes

## Quality Criteria
- [ ] All 40 sections complete (for final doc)
- [ ] No placeholder text
- [ ] Assumptions marked
- [ ] Sources cited
- [ ] No contradictions

## Implementation Status
- [x] Process documented
- [x] Guardrails defined
- [x] Quality criteria specified
