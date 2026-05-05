# Skill: lean-canvas

## Description
Metodología para crear Lean Canvas, la versión adaptada del BMC para startups que enfatiza problemas, soluciones y métricas clave para validación rápida.

## When to use
- En Modo Financiable como complemento al BMC
- Para proyectos con alta incertidumbre que requieren validación
- Cuando se necesita priorizar hipótesis a testear
- Para startups en etapa temprana
- Como herramienta de comunicación con mentores e inversionistas

## Process
1. **Definición del Problema**
   - Identificar los 3 problemas principales
   - Listar soluciones alternativas existentes
   - Validar que el problema sea real y frecuente

2. **Segmento de Clientes**
   - Definir early adopters específicos
   - Identificar características demográficas y psicográficas
   - Validar acceso a estos clientes

3. **Propuesta de Valor Única**
   - Definir el mensaje único de diferenciación
   - Clarificar "why now" y "why us"
   - Asegurar que sea comunicable en 1 frase

4. **Solución**
   - Listar las 3 features principales
   - Priorizar MVP vs nice-to-have
   - Alinear con problemas identificados

5. **Canales y Métricas**
   - Definir canales de adquisición
   - Establecer métricas clave (KPIs)
   - Identificar leading indicators

6. **Estructura de Costos e Ingresos**
   - Modelar costos principales
   - Proyectar fuentes de ingreso
   - Calcular break-even básico

7. **Ventaja Injusta**
   - Identificar qué no puede ser copiado fácilmente
   - Validar sostenibilidad de la ventaja

## Templates
- `lean-canvas.md`

## Outputs
- `08_canvas/lean_canvas.md`
- Hipótesis identificadas para `ASSUMPTIONS.md`
- Métricas para validación en `10_validation/validation_plan.md`

## Examples

### Ejemplo de uso
```
Usuario: Quiero validar mi idea de fintech para pymes.

Agente con skill Lean Canvas:
1. Problema: Pymes no acceden a créditos bancarios (tiempo, requisitos, scoring)
2. Clientes: Pymes <5 años, sin historial crediticio, dueños 30-50 años
3. Propuesta: Créditos en 48hrs con scoring alternativo
4. Solución: App con integración bancaria, scoring con datos no tradicionales
5. Canales: Instagram, LinkedIn, partnerships con contadores
6. Métricas: Aplicaciones/mes, tasa aprobación, NPS, default rate
7. Costos: Desarrollo, riesgo crediticio, compliance, equipo
8. Ingresos: Interés + fee de originación
9. Ventaja: Algoritmo de scoring propietario con 3 años de data
```

## Guardrails
- ✅ ALL 9 blocks must be completed
- ✅ Problem must be validated or marked as hypothesis
- ✅ Unfair advantage must be specific (not generic)
- ✅ Metrics must be measurable
- ❌ NEVER leave "Unfair Advantage" empty - if none, mark as risk

## Quality Criteria
- [ ] All 9 blocks completed
- [ ] Problem is specific and validated/marked
- [ ] UVP is one clear sentence
- [ ] Metrics are measurable
- [ ] Unfair advantage identified or risk marked

## Implementation Status
- [x] Process documented
- [x] Guardrails defined
- [x] Quality criteria specified
