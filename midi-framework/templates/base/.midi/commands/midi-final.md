# Command: /midi-final

## Objective
Genera el documento maestro final del proyecto (FINAL_PROJECT_DOCUMENT.md) consolidando toda la información, análisis, decisiones y documentos generados durante el proceso MIDI.

## Preconditions
- [ ] Devil advocate has been run (mandatory)
- [ ] Evaluation completed with scorecard
- [ ] Score ≥ 70 OR user override documented
- [ ] All required analyses complete

## Required Analyses Before Final
1. Market analysis
2. Business model canvas
3. Financial analysis (with assumptions marked)
4. Legal/tax analysis (if applicable)
5. Risk register
6. Devil advocate report
7. Evaluation scorecard

## Termination Criteria
- FINAL_PROJECT_DOCUMENT.md created with all 40 sections
- No placeholder text remains
- All assumptions marked
- No contradictions between sections

## Agents Activated
- orchestrator-agent (consolidación)
- pitch-writer-agent (narrativa final)
- project-documentation-agent (formato y estructura)

## Files Read
- Todos los archivos del proyecto en todas las etapas
- `00_intake/*.md`
- `01_research/*.md`
- `02_insights/*.md`
- `03_ideas/*.md`
- `04_top3/*.md`
- `05_analysis/*.md`
- `06_devil_advocate/*.md`
- `07_iteration/*.md`
- `08_canvas/*.md`
- `09_technical_financial_legal/*.md`
- `10_validation/*.md`
- `11_funding/*.md`
- `12_evaluation/*.md`
- Archivos de estado: `PROJECT_STATE.md`, `DECISION_LOG.md`, `ASSUMPTIONS.md`, `RISK_REGISTER.md`

## Files Written
- `13_final/FINAL_PROJECT_DOCUMENT.md`
- `13_final/EXECUTIVE_SUMMARY.md`
- `13_final/PITCH_DECK.md` (versión texto)
- `PROJECT_STATE.md` (actualizado con estado final)

## Flow
1. **Verificación de Completitud**
   - Confirmar que el proyecto pasó por evaluación
   - Verificar que existe documentación en todas las etapas
   - Identificar gaps para completar

2. **Consolidación por Secciones**
   Generar las 40 secciones del documento maestro:
   
   **Parte 1: Contexto (Secciones 1-13)**
   1. Portada
   2. Resumen ejecutivo
   3. Idea inicial
   4. Evolución de la idea
   5. Contexto del usuario
   6. Investigación global
   7. Investigación local
   8. Referentes y benchmark
   9. Tendencias relevantes
   10. Oportunidades detectadas
   11. Ideas generadas
   12. Top 3 ideas
   13. Justificación de selección

   **Parte 2: Análisis (Secciones 14-29)**
   14. Idea ganadora
   15. Problema
   16. Solución
   17. Propuesta de valor
   18. Innovación
   19. Clientes/usuarios
   20. Mercado
   21. Competencia
   22. Modelo de negocio
   23. Business Model Canvas
   24. Lean Canvas
   25. Factibilidad técnica
   26. Factibilidad operacional
   27. Análisis financiero
   28. Análisis legal y tributario
   29. Riesgos y mitigaciones

   **Parte 3: Ejecución (Secciones 30-40)**
   30. MVP
   31. Plan de validación
   32. Roadmap
   33. Estrategia comercial
   34. Estrategia de financiamiento
   35. Evaluación tipo jurado
   36. Mejoras recomendadas
   37. Pitch
   38. Anexos
   39. Supuestos
   40. Datos pendientes de validar

3. **Generación de Executive Summary**
   - Versión 1-2 páginas
   - Highlight de puntos clave
   - Solicitud o necesidad clara

4. **Generación de Pitch**
   - Versión texto del pitch deck
   - 10-12 slides
   - Ready para convertir a presentación

5. **Control de Calidad**
   - Verificar consistencia entre secciones
   - Confirmar que no hay contradicciones
   - Asegurar formato profesional

6. **Actualización de Estado**
   - Marcar proyecto como completado
   - Actualizar PROJECT_STATE.md
   - Registrar en DECISION_LOG.md

## Human Gates
- Ninguno (es un comando de consolidación)

## Example Usage
```
User: /midi-final

Agent: Generando documento maestro final...

Verificando completitud del proyecto:
✓ Intake completado
✓ Investigación global y local
✓ Ideas generadas (12)
✓ Top 3 seleccionado
✓ Análisis de problema/solución
✓ Análisis de mercado
✓ BMC y Lean Canvas
✓ Análisis técnico
✓ Análisis financiero
✓ Análisis legal/tributario
✓ Riesgos identificados
✓ Devil's advocate ejecutado
✓ Iteraciones aplicadas (2)
✓ Plan de validación
✓ Estrategia de financiamiento
✓ Evaluación completada (67/100)

Consolidando 40 secciones...

---

## FINAL_PROJECT_DOCUMENT.md GENERADO

### Estructura:

**PARTE 1: CONTEXTO**
1. Portada - "MealPrep Personalizado: Come según tus objetivos"
2. Resumen Ejecutivo - Proyecto de app de meal prep personalizado con potencial de $225M CLP año 1
3. Idea Inicial - App de delivery de comida saludable
4. Evolución - De marketplace a meal prep personalizado tras iteración
5. Contexto del Usuario - Chile, $50M presupuesto, equipo 2 personas, objetivo fondos
...

**PARTE 2: ANÁLISIS**
14. Idea Ganadora - "MealPrep Personalizado"
15. Problema - Falta de tiempo para cocinar saludable
16. Solución - App con personalización, preparación y delivery semanal
17. Propuesta de Valor - "Come según tus objetivos sin pensar"
...

**PARTE 3: EJECUCIÓN**
30. MVP - App básica + cocina partner + 50 usuarios pilot
31. Plan de Validación - Test de CAC, WTP, retención en 60 días
32. Roadmap - 6 fases desde pilot hasta 1000 usuarios
33. Estrategia Comercial - Instagram + referrals + gym partnerships
34. Estrategia de Financiamiento - Semilla Inicia + STARTUP CHILE + ángel
35. Evaluación - 67/100, recomendación ITERAR
36. Mejoras Recomendadas - Validar CAC, WTP, desarrollar algoritmo
37. Pitch - "MealPrep: Tu nutrición personalizada, sin pensar"
38. Anexos - Competitor matrix, financial projections, user personas
39. Supuestos - 15 identificados, 5 validados, 10 pendientes
40. Datos Pendientes - CAC real, WTP real, retención real

---

## DOCUMENTOS GENERADOS:

1. `13_final/FINAL_PROJECT_DOCUMENT.md` (documento completo, 40 secciones)
2. `13_final/EXECUTIVE_SUMMARY.md` (resumen 2 páginas)
3. `13_final/PITCH_DECK.md` (pitch en formato texto)

---

## ESTADO DEL PROYECTO

**Proyecto:** MealPrep Personalizado
**Estado:** COMPLETADO
**Evaluación:** 67/100 - ITERAR
**Próximos pasos:**
1. Validar CAC y WTP con pilot
2. Alcanzar 200 clientes activos
3. Re-evaluar y postular a STARTUP CHILE

---

Documento maestro final generado exitosamente.

¿Deseas revisar alguna sección específica o generar versiones adicionales (PDF, presentación)?
```

## Implementation Status
- [ ] Placeholder - needs implementation