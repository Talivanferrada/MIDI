# Skill: legal-tax-analysis

## Description
Análisis de consideraciones legales y tributarias para proyectos en Chile, incluyendo estructura societaria, obligaciones tributarias, regulaciones sectoriales y riesgos legales.

## When to use
- En Modo Financiable para evaluar riesgos legales
- Para definir estructura societaria óptima
- Cuando se necesita entender obligaciones tributarias
- Para proyectos en sectores regulados (fintech, salud, educación)
- Al evaluar propiedad intelectual y protección

## Process
1. **Análisis de Estructura Societaria**
   - Evaluar opciones: SpA, EIRL, SA
   - Considerar número de socios
   - Analizar flexibilidad vs complejidad
   - Recomendar estructura óptima

2. **Obligaciones Tributarias**
   - Identificar régimen tributario aplicable
   - Calcular carga impositiva estimada
   - Identificar beneficios tributarios disponibles
   - Revisar obligaciones de retención y declaración

3. **Regulaciones Sectoriales**
   - Identificar regulaciones específicas del sector
   - Evaluar licencias y permisos requeridos
   - Analizar compliance necesario
   - Identificar barreras regulatorias

4. **Protección de Activos**
   - Evaluar necesidades de propiedad intelectual
   - Revisar protección de marca
   - Analizar confidencialidad y acuerdos
   - Considerar protección de datos

5. **Riesgos Legales**
   - Identificar riesgos legales principales
   - Evaluar probabilidad e impacto
   - Proponer mitigaciones
   - Documentar en registro de riesgos

## Templates
- `legal-tax-analysis.md`

## Outputs
- `09_technical_financial_legal/legal_tax_analysis.md`
- Riesgos identificados para `RISK_REGISTER.md`

## Examples

### Ejemplo de uso
```
Usuario: ¿Qué estructura legal necesito para mi fintech?

Agente con skill legal-tax-analysis:
1. Estructura recomendada: SpA
   - Flexibilidad para inversionistas
   - Permite múltiples socios
   - Menor complejidad que SA

2. Régimen tributario:
   - Régimen general (tribute en primera categoría)
   - Tasa: 27% sobre utilidades
   - PD: Créditos disponibles

3. Regulaciones específicas:
   - CMF: requiere autorización si captura recursos del público
   - SBIF: requisitos de capital mínimo
   - Ley de protección de datos: obligación de cumplir

4. Riesgos identificados:
   - No cumplimiento CMF: ALTO
   - Protección de datos: MEDIO
   - Propiedad intelectual del algoritmo: MEDIO

5. Recomendación: Asesoría legal especializada pre-obligatoria
```

## Guardrails

### ⛔ CRITICAL PROHIBITIONS - NEVER SUGGEST:
- ❌ Evasión tributaria
- ❌ Simulación
- ❌ Fraude
- ❌ Facturación falsa
- ❌ Boletas falsas
- ❌ Ocultamiento de ingresos
- ❌ Empresas de papel
- ❌ Abuso de figuras legales
- ❌ Estructuras sin sustancia económica real

### ✅ ALLOWED (Lawful Optimization):
- ✅ Elección de régimen tributario óptimo
- ✅ Uso de gastos aceptados
- ✅ Estructura societaria apropiada
- ✅ Separación de líneas con sustancia económica
- ✅ Beneficios tributarios existentes

### Professional Referral Rule
⚠️ ALWAYS recommend consulting lawyer/accountant when:
- Risk level is medium or high
- Complex tax structures involved
- International operations
- Sector-specific regulations

## Quality Criteria
- [ ] Entity type recommended
- [ ] Tax regime identified
- [ ] Sector regulations reviewed
- [ ] Risks documented
- [ ] Professional referral included if needed

## Implementation Status
- [x] Process documented
- [x] Prohibitions clearly marked
- [x] Professional referral rule
- [x] Quality criteria specified
