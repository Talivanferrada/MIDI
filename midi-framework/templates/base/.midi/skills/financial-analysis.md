# Skill: financial-analysis

## Description
Proyecciones y análisis financiero para evaluar viabilidad económica, rentabilidad y necesidades de capital de un proyecto o negocio.

## When to use
- En Modo Financiable para validar sustentabilidad económica
- Para preparar proyecciones para inversionistas
- Cuando se necesita modelar unit economics
- Para determinar necesidades de financiamiento
- Al evaluar diferentes escenarios de crecimiento

## Process
1. **Modelo de Ingresos**
   - Definir fuentes de ingreso
   - Proyectar volumenes y precios
   - Modelar estacionalidad si aplica
   - Calcular revenue por cliente (LTV)

2. **Estructura de Costos**
   - Identificar costos fijos
   - Modelar costos variables
   - Proyectar CAC (Customer Acquisition Cost)
   - Calcular margen de contribución

3. **Unit Economics**
   - Calcular LTV/CAC ratio
   - Determinar payback period
   - Analizar punto de equilibrio
   - Proyectar ARPU (Average Revenue Per User)

4. **Proyecciones**
   - Crear P&L proyectado 3-5 años
   - Modelar flujo de caja
   - Proyectar balance general
   - Calcular métricas clave (ROI, IRR, NPV)

5. **Análisis de Escenarios**
   - Caso base, optimista, pesimista
   - Stress test del modelo
   - Sensibilidad a variables clave

## Templates
- `financial-analysis.md`

## Outputs
- `09_technical_financial_legal/financial_analysis.md`
- Datos para `FINAL_PROJECT_DOCUMENT.md` sección 27

## Examples

### Ejemplo de uso
```
Usuario: Proyecta los números para mi app de delivery saludable.

Agente con skill financial-analysis:
1. Ingresos:
   - Comisión 25% por pedido
   - Ticket promedio $15.000
   - Revenue por pedido: $3.750

2. Unit Economics:
   - CAC: $8.000 (Instagram ads + referral)
   - LTV: $45.000 (12 pedidos/mes x 6 meses x $3.750)
   - LTV/CAC: 5.6x (healthy)
   - Payback: 1.5 meses

3. Proyecciones Año 1:
   - 500 clientes activos mes 12
   - Revenue: $225M CLP
   - Costos: $180M CLP
   - EBITDA: $45M CLP (20% margin)

4. Break-even: 350 clientes activos
5. Necesidad de capital: $50M para lanzamiento + 6 meses runway
```

## Guardrails

### ⚠️ CRITICAL PROHIBITIONS
- ❌ **NUNCA** inventar cifras sin marcarlas como [SUPUESTO]
- ❌ **NUNCA** presentar estimaciones sin nivel de confianza
- ❌ **NUNCA** ocultar el margen de error
- ❌ **NUNCA** proyectar sin escenarios múltiples

### ✅ REQUIRED PRACTICES
- ✅ **TODAS** las estimaciones marcadas como [SUPUESTO]
- ✅ Explicar cómo validar cada supuesto
- ✅ Trabajar con rangos y escenarios
- ✅ Advertir sobre margen de error
- ✅ Indicar nivel de confianza (Alto/Medio/Bajo)

## Common Errors
1. Proyecciones lineales sin considerar estacionalidad
2. CAC subestimado (ignorar costos ocultos de adquisición)
3. LTV sobreestimado (ignorar churn)
4. No incluir análisis de sensibilidad
5. Un solo escenario sin alternativas

## Quality Criteria
- [ ] Todos los supuestos están marcados
- [ ] Mínimo 3 escenarios (pesimista/realista/optimista)
- [ ] Análisis de sensibilidad incluido
- [ ] Unit economics calculados
- [ ] Break-even identificado
- [ ] Flujo de caja proyectado

## Implementation Status
- [x] Process documented
- [x] Guardrails against invented numbers
- [x] Common errors identified
- [x] Quality criteria defined
