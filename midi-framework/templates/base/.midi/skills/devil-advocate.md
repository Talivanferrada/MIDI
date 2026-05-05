# Skill: devil-advocate

## Description
Metodología de revisión crítica para identificar debilidades, riesgos y supuestos no validados en un proyecto, actuando como "abogado del diablo" para fortalecer la propuesta antes de presentarla.

## When to use
- En Modo Financiable como etapa obligatoria (Gate 4)
- Antes de presentar a inversionistas o fondos
- Cuando el proyecto parece "demasiado bueno"
- Para validar robustez de la propuesta
- Como preparación para preguntas difíciles

## Process
1. **Preparación**
   - Revisar toda la documentación del proyecto
   - Identificar áreas de mayor incertidumbre
   - Preparar mindset crítico constructivo

2. **Análisis de Debilidades**
   - Cuestionar supuestos clave
   - Identificar vulnerabilidades del modelo
   - Desafiar proyecciones optimistas
   - Buscar sesgos de confirmación

3. **Análisis de Riesgos**
   - Identificar riesgos ocultos o subestimados
   - Evaluar escenarios de fracaso
   - Analizar amenazas competitivas
   - Considerar cambios de contexto

4. **Contrainterrogatorio**
   - Generar preguntas difíciles
   - Simular objeciones de inversionistas
   - Preparar respuestas defensivas
   - Identificar gaps de información

5. **Recomendaciones**
   - Proponer mejoras específicas
   - Sugerir validaciones pendientes
   - Recomendar iteraciones necesarias
   - Documentar fortalezas y debilidades

## Templates
- `risk-matrix.md`
- `evaluator-scorecard.md`

## Outputs
- `06_devil_advocate/devil_report.md`
- Actualización de `RISK_REGISTER.md`
- Recomendaciones para iteración en `07_iteration/`

## Examples

### Ejemplo de uso
```
Usuario: Evalúa críticamente mi proyecto de delivery saludable.

Agente con skill devil-advocate:
1. Supuestos cuestionados:
   - "500 clientes en año 1" - ¿Cómo los adquiere sin marketing budget?
   - "Ticket $15.000" - ¿Validado con usuarios reales?
   - "30 min delivery" - ¿Con restaurantes propios o terceros?

2. Debilidades identificadas:
   - Dependencia de restaurantes terceros
   - Sin ventaja competitiva defendible
   - CAC puede ser 2x lo proyectado
   - No hay validación de willingness to pay

3. Riesgos:
   - Entrada de competidor con más capital
   - Restaurantes pueden desarrollar delivery propio
   - Regulación de alimentos puede aumentar

4. Recomendación: ITERAR
   - Validar CAC con pilot de 50 usuarios
   - Desarrollar marca propia o exclusividad
   - Testear pricing con A/B

5. Preguntas difíciles para inversionista:
   - "¿Por qué no puede copiar Rappi esto en 2 semanas?"
   - "¿Cuál es su ventaja injusta?"
```

## Hard Language Rule

### ⛔ NO USAR lenguaje suave:
- ❌ "Podría mejorar un poco..."
- ❌ "Sería ideal considerar..."
- ❌ "Tal vez existe un pequeño riesgo..."

### ✅ USAR lenguaje claro y directo:
- ✅ "Esta idea PODRÍA FRACASAR porque..."
- ✅ "El supuesto más DÉBIL es..."
- ✅ "Esto NO es suficientemente innovador porque..."

## Mandatory Status

**⚠️ This skill is OBLIGATORY before any project is declared viable.**
**Cannot be skipped under any circumstance.**

## Recommendation Options
1. **CONTINUAR** - Proyecto viable con mitigaciones
2. **ITERAR** - Debilidades recuperables, especificar qué
3. **FUSIONAR** - Combinar con otra idea del Top 3
4. **PAUSAR** - Bloqueadores externos, esperar
5. **DESCARTAR** - Riesgos demasiado altos

## Quality Criteria
- [ ] Todas las dimensiones analizadas
- [ ] Lenguaje directo y claro usado
- [ ] Riesgos específicos identificados
- [ ] Recomendación clara proporcionada
- [ ] Supuestos no validados marcados

## Implementation Status
- [x] Process documented
- [x] Hard language rule defined
- [x] Mandatory status marked
- [x] Recommendation options defined
- [x] Quality criteria defined
