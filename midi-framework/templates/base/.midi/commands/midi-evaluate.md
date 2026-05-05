# Command: /midi-evaluate

## Objective
Ejecuta la evaluación tipo jurado/inversionista del proyecto completo, generando un scorecard con puntaje, fortalezas, debilidades y recomendación final.

## Preconditions
- [ ] Devil advocate has been run (devil_report.md exists)
- [ ] All analysis artifacts exist
- [ ] Risk register is complete

## Termination Criteria
- Scorecard generated with total score
- Strengths and weaknesses identified
- Recommendation provided based on threshold

## Thresholds
- ≥85: EXCELENTE - Listo para postular
- 70-84: BUENO - Iterar detalles menores
- 55-69: REGULAR - Requiere mejoras significativas
- 40-54: DÉBIL - Revisar fundamentos
- <40: NO VIABLE - Descartar o reformular

## Agents Activated
- evaluator-agent (evaluación principal)
- orchestrator-agent (síntesis)
- pitch-writer-agent (mejoras narrativas si necesario)

## Files Read
- Todos los archivos del proyecto
- `FINAL_PROJECT_DOCUMENT.md` (si existe)
- `08_canvas/*.md`
- `09_technical_financial_legal/*.md`
- `06_devil_advocate/devil_report.md`
- `RISK_REGISTER.md`
- `10_validation/validation_plan.md`

## Files Written
- `12_evaluation/evaluator_scorecard.md`
- `DECISION_LOG.md` (actualizado)

## Flow
1. **Preparación**
   - Verificar que el proyecto ha pasado por devil's advocate
   - Confirmar que existe documentación completa
   - Establecer criterios de evaluación

2. **Evaluación por Dimensiones**
   Puntaje 0-10 por dimensión:
   
   - **Innovación** (15%)
     - Diferenciación
     - Novedad de propuesta
     - Potencial disruptivo
   
   - **Ejecutabilidad** (20%)
     - Claridad de roadmap
     - Capacidad del equipo
     - Recursos disponibles
   
   - **Mercado** (15%)
     - Tamaño de oportunidad
     - Crecimiento del sector
     - Timing
   
   - **Modelo de Negocio** (15%)
     - Claridad de propuesta de valor
     - Escalabilidad
     - Unit economics
   
   - **Equipo** (10%)
     - Skills relevantes
     - Complementariedad
     - Track record
   
   - **Riesgo** (10%)
     - Riesgos identificados
     - Mitigaciones propuestas
     - Tolerancia a falla
   
   - **Validación** (10%)
     - Hipótesis validadas
     - Plan de validación
     - Evidencia
   
   - **Narrativa** (5%)
     - Claridad de comunicación
     - Storytelling
     - Persuasión

3. **Cálculo de Puntaje Total**
   - Ponderar dimensiones
   - Calcular score 0-100
   - Comparar con benchmark

4. **Análisis de Fortalezas**
   - Top 3 fortalezas
   - Por qué son ventajas
   - Cómo potenciarlas

5. **Análisis de Debilidades**
   - Top 3 debilidades
   - Impacto en el proyecto
   - Cómo mitigarlas

6. **Condiciones para Mejorar**
   - Acciones específicas
   - Timeline sugerido
   - Recursos necesarios

7. **Recomendación Final**
   - POSTULAR (>75 puntos)
   - ITERAR (60-74 puntos)
   - VALIDAR ANTES (45-59 puntos)
   - DESCARTAR (<45 puntos)
   - PIVOTAR (cambio de dirección)

8. **Gate Humano 5**
   - Presentar evaluación
   - Preguntar: "¿El proyecto alcanza calidad suficiente?"
   - Si <70 → recomendar iteración
   - Si usuario decide avanzar → documentar riesgo

## Human Gates
- **Gate 5:** ¿El proyecto alcanza calidad suficiente?

## Example Usage
```
User: /midi-evaluate

Agent: Ejecutando evaluación tipo jurado...

Evaluando proyecto: "App de meal prep personalizado"

---

## EVALUATOR SCORECARD

### Puntaje por Dimensión

| Dimensión | Peso | Puntaje | Ponderado |
|-----------|------|---------|-----------|
| Innovación | 15% | 7/10 | 10.5 |
| Ejecutabilidad | 20% | 6/10 | 12.0 |
| Mercado | 15% | 8/10 | 12.0 |
| Modelo de Negocio | 15% | 7/10 | 10.5 |
| Equipo | 10% | 7/10 | 7.0 |
| Riesgo | 10% | 6/10 | 6.0 |
| Validación | 10% | 5/10 | 5.0 |
| Narrativa | 5% | 8/10 | 4.0 |

**PUNTAJE TOTAL: 67/100**

---

### Análisis Detallado

#### Innovación (7/10)
✓ Personalización por objetivos
✓ Modelo de suscripción recurrente
⚠ No es radicalmente diferente de meal prep tradicional

#### Ejecutabilidad (6/10)
✓ Equipo con skills relevantes
✓ Roadmap claro
⚠ CAC no validado
⚠ Dependencia operacional

#### Mercado (8/10)
✓ Tamaño de mercado atractivo
✓ Crecimiento del sector saludable
✓ Timing favorable post-pandemia

#### Modelo de Negocio (7/10)
✓ Unit economics favorables (LTV/CAC 5.6x)
✓ Escalable con network effects
⚠ Margen depende de eficiencia operacional

#### Equipo (7/10)
✓ Complementariedad (marketing + ops)
✓ Experiencia relevante
⚠ Falta perfil técnico

#### Riesgo (6/10)
✓ Riesgos identificados
⚠ Mitigaciones no todas implementadas
⚠ Dependencia de cocina partner

#### Validación (5/10)
⚠ Solo 50 pilotos, no representativo
⚠ WTP no validado
⚠ Retención no medida

#### Narrativa (8/10)
✓ Problema claro y emotivo
✓ Solución fácil de entender
✓ Historia coherente

---

### Fortalezas Principales

1. **Problema Real y Validado**
   - 70% personas no cocinan por falta de tiempo
   - Necesidad clara y frecuente

2. **Modelo de Negocio Atractivo**
   - Recurrente, escalable, unit economics favorables
   - Diferenciación por personalización

3. **Timing de Mercado**
   - Crecimiento acelerado de comida saludable
   - Post-pandemia normalizó delivery

### Debilidades Principales

1. **Validación Insuficiente**
   - CAC no probado a escala
   - WTP no validado con precios reales

2. **Sin Ventaja Defendible**
   - Baja barrera de entrada
   - Competidores pueden copiar

3. **Dependencia Operacional**
   - Cocina tercerizada es riesgo
   - Logística compleja

---

### Condiciones para Mejorar

**Inmediatas (antes de postular):**
1. Validar CAC real con pilot de marketing ($2M)
2. A/B test de precios para confirmar WTP
3. Medir retención 30 días con pilot

**Corto plazo (1-2 meses):**
1. Desarrollar MVP del algoritmo de personalización
2. Negociar contrato de exclusividad con cocina
3. Documentar procesos operacionales

**Mediano plazo (3-6 meses):**
1. Alcanzar 200 clientes activos
2. Demostrar retención >70%
3. Construir case studies de usuarios

---

## RECOMENDACIÓN: ITERAR

Puntaje de 67/100 indica que el proyecto tiene fundamentos sólidos pero requiere validación adicional antes de postular a financiamiento.

**Riesgo de postular ahora:**
- Preguntas sobre CAC y WTP sin respuesta
- Competencia no diferenciada suficientemente
- Validación insuficiente

**Beneficio de iterar:**
- Aumentar score a 75+ en 2-3 meses
- Mitigar objeciones de inversionistas
- Fortalecer narrativa con datos

---

[GATE 5] ¿El proyecto alcanza calidad suficiente para postular?

Recomendación: NO. Iterar primero.

Si decides avanzar de todas formas, documentaré el riesgo en DECISION_LOG.md.

¿Qué decides? (postular/iterar/validar antes)
```

## Implementation Status
- [ ] Placeholder - needs implementation