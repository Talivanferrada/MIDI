# Command: /midi-devil

## ⚠️ MANDATORY COMMAND
This command CANNOT be skipped. It MUST run before /midi-final.

## Objective
Ejecuta el abogado del diablo, un análisis crítico obligatorio que cuestiona la propuesta, identifica debilidades, y genera recomendaciones para fortalecer el proyecto antes de la evaluación final.

## Preconditions
- [ ] Project is in financeable mode
- [ ] All analysis agents have completed
- [ ] Financial analysis exists
- [ ] Business model canvas exists

## Termination Criteria
- Devil report generated with verdict
- RISK_REGISTER.md updated with critical risks
- Recommendation provided (Continuar/Iterar/Fusionar/Pausar/Descartar)

## Agents Activated
- devil-advocate-agent (análisis crítico principal)
- risk-agent (identificación de riesgos ocultos)
- analyst-agent (contrainterrogatorio)

## Files Read
- Todos los archivos generados en Modo Financeable
- `05_analysis/*.md`
- `08_canvas/*.md`
- `09_technical_financial_legal/*.md`
- `RISK_REGISTER.md`
- `10_validation/validation_plan.md`

## Files Written
- `06_devil_advocate/devil_report.md`
- `07_iteration/iteration_plan.md` (si se requiere)
- `RISK_REGISTER.md` (actualizado con nuevos riesgos)
- `ASSUMPTIONS.md` (actualizado)
- `DECISION_LOG.md` (actualizado)

## Flow
1. **Preparación**
   - Verificar que el proyecto está en Modo Financeable
   - Revisar toda la documentación generada
   - Preparar mindset crítico constructivo

2. **Análisis de Supuestos**
   - Identificar todos los supuestos del modelo
   - Cuestionar cada uno
   - Evaluar nivel de riesgo

3. **Análisis de Debilidades**
   - Vulnerabilidades del modelo de negocio
   - Gaps en el análisis
   - Dependencias críticas
   - Aspectos no considerados

4. **Contrainterrogatorio**
   - Generar 10-20 preguntas difíciles
   - Simular objeciones de inversionistas
   - Preparar respuestas defensivas

5. **Análisis de Escenarios de Fracaso**
   - ¿Qué podría causar que el proyecto falle?
   - ¿Qué pasaría si X no funciona?
   - ¿Qué amenazas no se han considerado?

6. **Recomendaciones**
   - Mejoras específicas
   - Validaciones pendientes críticas
   - Iteraciones necesarias

7. **Veredicto**
   - CONTINUAR - Proyecto robusto
   - ITERAR - Mejoras necesarias
   - FUSIONAR - Combinar con otra idea
   - DESCARTAR - Fundamentos muy débiles

8. **Gate Humano 4**
   - Presentar hallazgos
   - Preguntar: "¿La idea debe continuar, iterar, fusionarse o descartarse?"
   - Documentar decisión

## Human Gates
- **Gate 4:** ¿La idea debe continuar, iterar, fusionarse o descartarse?

## Example Usage
```
User: /midi-devil

Agent: Ejecutando Abogado del Diablo...

Analizaré críticamente tu proyecto de "App de meal prep personalizado"

Revisando documentación...
- ✓ problem_solution_analysis.md
- ✓ market_analysis.md
- ✓ business_model_canvas.md
- ✓ financial_analysis.md
- ✓ legal_tax_analysis.md
- ✓ RISK_REGISTER.md

---

## ANÁLISIS CRÍTICO

### Supuestos Cuestionados

1. **"500 clientes en año 1"**
   - **Cuestión:** Sin presupuesto de marketing, ¿cómo alcanzarás 500 clientes?
   - **Riesgo:** CAC puede ser 3-4x lo proyectado
   - **Validación:** Necesitas pilot con 50 usuarios primero

2. **"Ticket promedio $15.000"**
   - **Cuestión:** ¿Has validado willingness to pay con usuarios reales?
   - **Riesgo:** Precio puede ser demasiado alto para segmento target
   - **Validación:** A/B testing de precios

3. **"Cocina tercerizada"**
   - **Cuestión:** ¿Qué control tienes sobre calidad y consistencia?
   - **Riesgo:** Dependencia crítica de proveedor
   - **Validación:** SLAs y redundancia

### Debilidades Identificadas

1. **Sin ventaja injusta**
   - Cualquier competidor con más capital puede copiar
   - Recomendación: Desarrollar algoritmo de personalización propietario

2. **Modelo operacionalmente pesado**
   - Logística de delivery diario es compleja
   - Recomendación: Empezar con delivery semanal, no diario

3. **CAC no validado**
   - Proyección de $8.000 por cliente sin evidencia
   - Recomendación: Correr pilot de marketing antes de escalar

### Preguntas Difíciles (de un inversionista)

1. "¿Por qué no puede Rappi lanzar esto en 2 semanas?"
2. "¿Cuál es tu verdadera diferenciación vs meal prep tradicional?"
3. "¿Qué pasa si tu proveedor de cocina quiebra?"
4. "¿Cómo escalas sin perder calidad?"
5. "¿Por qué ahora y no hace 2 años?"

### Escenarios de Fracaso

1. **No alcanzas masa crítica** → Quemas runway sin validar
2. **Competidor grande entra** → Price war que no puedes ganar
3. **Problemas de calidad** → Reviews negativos destruyen reputación
4. **CAC muy alto** → Unit economics no cierran

---

## VEREDICTO: ITERAR

Fortalezas:
- Problema real y validado
- Modelo de ingresos claro
- Equipo con skills relevantes

Debilidades críticas:
- CAC no validado
- Sin ventaja defendible
- Dependencia operacional

---

## RECOMENDACIONES

1. **Inmediatas (antes de inversión):**
   - Pilot con 50 usuarios para validar CAC real
   - Testear pricing con A/B
   - Desarrollar POV del algoritmo de personalización

2. **Corto plazo:**
   - Simplificar a delivery semanal
   - Buscar exclusividad con cocina partner
   - Validar willingness to pay $15.000

3. **Mediano plazo:**
   - Construir ventaja propietaria (algoritmo + datos)
   - Documentar procesos para escalar

---

[GATE 4] ¿La idea debe continuar, iterar, fusionarse o descartarse?

He generado iteration_plan.md con los pasos específicos.

¿Qué decides?
```

## Implementation Status
- [ ] Placeholder - needs implementation