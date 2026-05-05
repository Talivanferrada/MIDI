# Skill: Business Model Canvas

## Description
Metodología para crear un Business Model Canvas (BMC) completo que describe el modelo de negocio en 9 bloques fundamentales.

## When to use
- Cuando se necesita visualizar el modelo de negocio completo
- Para comunicar el proyecto a inversionistas
- Cuando se evalúa la viabilidad comercial
- Como paso previo al Lean Canvas

## Process
1. **Preparación**
   - Revisar información del proyecto disponible
   - Identificar supuestos clave
   - Definir alcance del canvas

2. **Llenado de los 9 bloques**
   - Segmentos de clientes: ¿A quién servimos?
   - Propuestas de valor: ¿Qué valor entregamos?
   - Canales: ¿Cómo llegamos a los clientes?
   - Relaciones con clientes: ¿Cómo nos relacionamos?
   - Fuentes de ingresos: ¿Cómo generamos dinero?
   - Recursos clave: ¿Qué recursos necesitamos?
   - Actividades clave: ¿Qué debemos hacer?
   - Asociaciones clave: ¿Quiénes son nuestros partners?
   - Estructura de costos: ¿Cuáles son los costos?

3. **Validación**
   - Identificar supuestos riesgosos
   - Priorizar hipótesis a validar
   - Documentar en `08_canvas/business_model_canvas.md`

4. **Iteración**
   - Revisar consistencia entre bloques
   - Identificar gaps
   - Proponer mejoras

## Templates
- `templates/business-model-canvas.md`

## Outputs
- `08_canvas/business_model_canvas.md` - BMC completo
- Lista de hipótesis a validar
- Áreas de riesgo identificadas

## Examples

### Ejemplo: BMC para startup de educación
```
User: Crear BMC para plataforma de cursos online
Agent: Ejecutaré la skill de BMC para:
1. Definir segmentos de clientes (estudiantes, profesionales)
2. Identificar propuestas de valor (flexibilidad, precio, calidad)
3. Mapear canales de distribución
4. Definir modelo de ingresos
5. Completar los 9 bloques del canvas
6. Generar documento BMC en 08_canvas/
```

## Guardrails
- ✅ ALL 9 blocks must be completed
- ✅ No block should be empty or vague
- ✅ Value proposition must be specific
- ✅ Revenue model must be clear
- ✅ Ensure consistency between blocks
- ❌ NEVER leave blocks as "TBD" without justification

## Quality Criteria
- [ ] All 9 blocks completed
- [ ] No vague descriptions
- [ ] Revenue model defined
- [ ] Customer segments specific
- [ ] Value proposition clear

## Implementation Status
- [x] Process documented
- [x] Guardrails defined
- [x] Quality criteria specified