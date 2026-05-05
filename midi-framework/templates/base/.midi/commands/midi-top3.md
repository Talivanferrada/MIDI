# Command: /midi-top3

## Objective
Genera o regenera el ranking Top 3 de ideas con análisis comparativo detallado, recomendación y trade-offs para facilitar la decisión del usuario.

## Preconditions
- [ ] Ideas exist in IDEA_BACKLOG.md (minimum 10)
- [ ] Ideas have preliminary scores
- [ ] USER_CONTEXT.md is complete

## Termination Criteria
- TOP3_IDEAS.md created with 3 selected ideas
- Comparative matrix generated
- Recommendation provided based on user context

## Agents Activated
- analyst-agent (análisis comparativo)
- creative-agent (refinamiento de ideas si necesario)
- orchestrator-agent (síntesis y recomendación)

## Files Read
- `IDEA_BACKLOG.md` (todas las ideas generadas)
- `USER_CONTEXT.md` (contexto del usuario)
- `02_insights/insights.md` (insights de investigación)
- `03_ideas/*.md` (ideas individuales)

## Files Written
- `04_top3/top3_comparison.md` (matriz comparativa)
- `TOP3_IDEAS.md` (top 3 con detalles)
- `DECISION_LOG.md` (actualizado con análisis)

## Flow
1. **Verificación de Precondiciones**
   - Confirmar que existen ideas en backlog
   - Si no hay ideas → sugerir ejecutar /midi-explore primero

2. **Análisis Comparativo**
   - Evaluar ideas con criterios ponderados:
     - Innovación (25%)
     - Ejecutabilidad (25%)
     - Rentabilidad potencial (25%)
     - Fit con usuario (15%)
     - Riesgo (10%)
   - Crear matriz comparativa

3. **Selección Top 3**
   - Identificar las 3 mejores rankeadas
   - Analizar trade-offs entre ellas
   - Identificar fortalezas y debilidades de cada una

4. **Recomendación**
   - Basada en contexto del usuario (presupuesto, skills, recursos)
   - Considerando objetivos (comercial vs fondos)
   - Explicando reasoning

5. **Documentación**
   - Crear top3_comparison.md con análisis completo
   - Actualizar TOP3_IDEAS.md
   - Registrar decisión en DECISION_LOG.md

6. **Presentación al Usuario**
   - Mostrar top 3 con pros y contras
   - Presentar recomendación
   - Preguntar por selección

## Human Gates
- Ninguno (es un comando de análisis)

## Example Usage
```
User: /midi-top3

Agent: Analizando ideas del backlog...

12 ideas encontradas en IDEA_BACKLOG.md

Aplicando criterios de evaluación:
- Innovación (25%)
- Ejecutabilidad (25%)
- Rentabilidad potencial (25%)
- Fit con tu contexto (15%)
- Riesgo (10%)

---

## TOP 3 IDEAS

### 1. Marketplace de comida saludable - Score: 78/100

**Pros:**
- Modelo de negocio probado (UberEats, PedidosYa)
- No requiere inversión en cocina
- Escalable con network effects
- Fit con tus skills de marketing

**Contras:**
- Alta competencia
- Requiere masa crítica de restaurantes
- Margen bajo (15-25%)

**Score breakdown:** Innovación: 70 | Ejecutabilidad: 85 | Rentabilidad: 80 | Fit: 80 | Riesgo: 75

---

### 2. App de meal prep personalizado - Score: 75/100

**Pros:**
- Diferenciación clara
- Mayor margen (40-50%)
- Recurrente (suscripción)

**Contras:**
- Operacionalmente complejo
- Requiere cocina propia
- Menos escalable inicialmente

**Score breakdown:** Innovación: 85 | Ejecutabilidad: 65 | Rentabilidad: 85 | Fit: 70 | Riesgo: 70

---

### 3. Suscripción de snacks saludables - Score: 71/100

**Pros:**
- Modelo simple
- Bajo CAPEX
- Quick validation possible

**Contras:**
- Menos innovación
- Competencia de retail
- Baja barrera de entrada

**Score breakdown:** Innovación: 60 | Ejecutabilidad: 90 | Rentabilidad: 70 | Fit: 75 | Riesgo: 60

---

## RECOMENDACIÓN

Basado en tu contexto (presupuesto $50M, equipo de 2, objetivo fondos):

**Recomiendo la Idea 2: App de meal prep personalizado**

Por qué:
- Mayor potencial de innovación para fondos concursables
- Modelo de ingresos recurrente atractivo
- Tamaño razonable para tu equipo
- Fit con objetivo de postular a STARTUP CHILE

Ver análisis completo en 04_top3/top3_comparison.md

¿Cuál idea deseas desarrollar? (1/2/3/u otra del backlog)
```

## Implementation Status
- [ ] Placeholder - needs implementation