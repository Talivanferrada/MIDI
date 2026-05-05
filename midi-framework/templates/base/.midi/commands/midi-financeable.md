# Command: /midi-financeable

## Objective
Transiciona el proyecto a Modo Financeable, tomando la idea seleccionada y desarrollándola como proyecto completo, ejecutable y defendible ante inversionistas o fondos.

## Preconditions
- [ ] Idea has been selected (exists in TOP3_IDEAS.md)
- [ ] `USER_CONTEXT.md` is complete
- [ ] Exploration mode completed OR user explicitly selected an idea

## Termination Criteria
- All 6 analysis agents have completed
- Financial analysis has assumptions marked
- Legal analysis completed (if applicable)
- Risk register updated

## Agents Activated
- orchestrator-agent (coordina el flujo)
- analyst-agent (análisis de problema/solución/mercado)
- bmc-agent (Business Model Canvas)
- financial-agent (proyecciones financieras)
- legal-tax-agent (aspectos legales y tributarios)
- risk-agent (identificación de riesgos)
- validation-agent (plan de validación)

## Files Read
- `TOP3_IDEAS.md` (idea seleccionada)
- `USER_CONTEXT.md` (contexto del usuario)
- `01_research/*.md` (investigación previa)
- `02_insights/insights.md` (insights)

## Files Written
- `05_analysis/problem_solution_analysis.md`
- `05_analysis/market_analysis.md`
- `08_canvas/business_model_canvas.md`
- `08_canvas/lean_canvas.md`
- `09_technical_financial_legal/technical_analysis.md`
- `09_technical_financial_legal/financial_analysis.md`
- `09_technical_financial_legal/legal_tax_analysis.md`
- `RISK_REGISTER.md`
- `10_validation/validation_plan.md`
- `PROJECT_STATE.md` (actualizado)
- `DECISION_LOG.md` (actualizado)

## Flow
1. **Preparación**
   - Verificar que existe idea seleccionada
   - Confirmar transición a Modo Financeable
   - Presentar plan de trabajo

2. **Análisis de Problema y Solución**
   - Definir problema claramente
   - Validar que es real y frecuente
   - Describir solución propuesta
   - Articular propuesta de valor
   - Output: `05_analysis/problem_solution_analysis.md`

3. **Análisis de Mercado**
   - TAM/SAM/SOM
   - Segmentación de clientes
   - Análisis competitivo
   - Barreras de entrada
   - Output: `05_analysis/market_analysis.md`

4. **Business Model Canvas**
   - Completar los 9 bloques
   - Identificar supuestos críticos
   - Output: `08_canvas/business_model_canvas.md`

5. **Lean Canvas**
   - Versión simplificada para startups
   - Hipótesis priorizadas
   - Output: `08_canvas/lean_canvas.md`

6. **Análisis Técnico**
   - Factibilidad técnica
   - Arquitectura propuesta
   - Requerimientos de tecnología
   - Output: `09_technical_financial_legal/technical_analysis.md`

7. **Análisis Financiero**
   - Proyecciones 3-5 años
   - Unit economics
   - Necesidades de capital
   - Output: `09_technical_financial_legal/financial_analysis.md`

8. **Análisis Legal y Tributario**
   - Estructura societaria
   - Obligaciones tributarias
   - Regulaciones sectoriales
   - Output: `09_technical_financial_legal/legal_tax_analysis.md`

9. **Registro de Riesgos**
   - Identificar riesgos clave
   - Evaluar probabilidad e impacto
   - Proponer mitigaciones
   - Output: `RISK_REGISTER.md`

10. **Plan de Validación**
    - Hipótesis críticas
    - Experimentos propuestos
    - Métricas de validación
    - Output: `10_validation/validation_plan.md`

11. **Actualización de Estado**
    - Actualizar PROJECT_STATE.md
    - Registrar decisiones
    - Preparar para Devil's Advocate

## Human Gates
- Ninguno durante este comando (es un flujo continuo)

## Example Usage
```
User: /midi-financeable

Agent: Transicionando a Modo Financeable...

Idea seleccionada: App de meal prep personalizado

Plan de trabajo en Modo Financeable:
1. ✓ Análisis de problema y solución
2. ✓ Análisis de mercado (TAM/SAM/SOM)
3. ✓ Business Model Canvas
4. ✓ Lean Canvas
5. ✓ Análisis técnico
6. ✓ Análisis financiero
7. ✓ Análisis legal y tributario
8. ✓ Registro de riesgos
9. ✓ Plan de validación
10. [Siguiente] /midi-devil

Comenzando análisis de problema y solución...

---

## PROBLEMA

**Definición:** Las personas que quieren comer saludable enfrentan:
- Falta de tiempo para cocinar (70% según encuesta)
- Desconocimiento de nutrición
- Dificultad para mantener consistencia

**Validación:** 8 de cada 10 personas abandonan dietas por falta de tiempo.

**Frecuencia:** Diario - 3 veces al día

**Emocional:** Frustración, culpa, desánimo

---

## SOLUCIÓN

App de meal prep que:
- Personaliza menús según objetivos
- Prepara y entrega comida semanal
- Ajusta según feedback y progreso

**Propuesta de valor:** "Come saludable sin pensar, cada semana en tu puerta"

---

Continuando con análisis de mercado...

[Ejecuta los 10 pasos del flujo]

---

Modo Financeable completado.

Documentos generados:
- 05_analysis/problem_solution_analysis.md
- 05_analysis/market_analysis.md
- 08_canvas/business_model_canvas.md
- 08_canvas/lean_canvas.md
- 09_technical_financial_legal/technical_analysis.md
- 09_technical_financial_legal/financial_analysis.md
- 09_technical_financial_legal/legal_tax_analysis.md
- RISK_REGISTER.md
- 10_validation/validation_plan.md

Próximo paso recomendado: /midi-devil (Abogado del diablo)

¿Deseas continuar con el análisis crítico?
```

## Implementation Status
- [ ] Placeholder - needs implementation