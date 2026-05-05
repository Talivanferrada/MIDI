# Command: /midi-canvas

## Objective
Genera o regenera el Business Model Canvas y Lean Canvas para el proyecto, asegurando que reflejen el estado actual del análisis y las iteraciones realizadas.

## Preconditions
- [ ] Market analysis exists
- [ ] Problem/solution analysis exists
- [ ] Idea has been selected
- [ ] Project is in financeable mode

## Termination Criteria
- BMC created with all 9 blocks
- Lean Canvas created with all 9 blocks
- Both canvases are consistent
- No empty blocks

## Agents Activated
- bmc-agent (Business Model Canvas)
- analyst-agent (análisis de soporte)

## Files Read
- `05_analysis/market_analysis.md`
- `05_analysis/problem_solution_analysis.md`
- `09_technical_financial_legal/financial_analysis.md`
- `PROJECT_STATE.md`
- `06_devil_advocate/devil_report.md` (si existe)

## Files Written
- `08_canvas/business_model_canvas.md`
- `08_canvas/lean_canvas.md`
- `DECISION_LOG.md` (actualizado)

## Flow
1. **Verificación de Precondiciones**
   - Confirmar que existe análisis de mercado y modelo de ingresos
   - Si no existe → sugerir ejecutar /midi-financeable primero

2. **Business Model Canvas**
   - Llenar los 9 bloques:
     1. Segmentos de clientes
     2. Propuestas de valor
     3. Canales
     4. Relaciones con clientes
     5. Fuentes de ingresos
     6. Recursos clave
     7. Actividades clave
     8. Asociaciones clave
     9. Estructura de costos

3. **Lean Canvas**
   - Versión adaptada para startups:
     1. Problema
     2. Segmento de clientes
     3. Propuesta de valor única
     4. Solución
     5. Canales
     6. Métricas clave
     7. Ventaja injusta
     8. Estructura de costos
     9. Fuentes de ingresos

4. **Validación de Consistencia**
   - Verificar que ambos canvas son consistentes
   - Identificar contradicciones
   - Asegurar que reflejan iteraciones del devil

5. **Documentación de Hipótesis**
   - Extraer supuestos clave de cada bloque
   - Actualizar ASSUMPTIONS.md
   - Identificar hipótesis prioritarias a validar

## Human Gates
- Ninguno (es un comando de generación/actualización)

## Example Usage
```
User: /midi-canvas

Agent: Generando Business Model Canvas y Lean Canvas...

Basado en:
- Análisis de mercado completado
- Análisis de problema/solución
- Proyecciones financieras
- Iteraciones del devil (2 mejoras aplicadas)

---

## BUSINESS MODEL CANVAS

### 1. Segmentos de Clientes
- **Primario:** Profesionales 25-40 años, Santiago, ingreso >$1.5M CLP
- **Secundario:** Personas con objetivos fitness/nutrición específicos
- **Terciario:** Familias que buscan alimentación saludable conveniente

### 2. Propuestas de Valor
- Personalización basada en objetivos y preferencias
- Conveniencia: delivery semanal sin pensar
- Calidad: ingredientes frescos, preparación profesional
- Flexibilidad: ajustes semanales según feedback

### 3. Canales
- App móvil (principal)
- Instagram y TikTok (marketing)
- Partnerships con gimnasios
- Referrals y programa de embajadores

### 4. Relaciones con Clientes
- Self-service via app
- Soporte via chat
- Comunidad online (grupo privado)
- Newsletter semanal con tips

### 5. Fuentes de Ingresos
- Suscripción semanal: $15.000 - $25.000 según plan
- Delivery: $2.000 por pedido
- Extras y add-ons: $3.000 - $8.000

### 6. Recursos Clave
- Plataforma tecnológica (app + backend)
- Cocina partner con SLA
- Equipo de nutricionistas
- Base de datos de recetas

### 7. Actividades Clave
- Desarrollo de producto (app)
- Gestión de cocina y proveedores
- Marketing y adquisición de clientes
- Atención al cliente

### 8. Asociaciones Clave
- Cocina partner (exclusividad 1 año)
- Proveedores de ingredientes
- Gimnasios y centros fitness
- Influencers de salud

### 9. Estructura de Costos
- COGS: 45% del precio
- Marketing: 20%
- Tecnología: 15%
- Personal: 15%
- Operaciones: 5%

---

## LEAN CANVAS

### Problema
1. Falta de tiempo para cocinar saludable
2. Desconocimiento de nutrición
3. Dificultad para mantener consistencia

Soluciones existentes: Meal prep DIY, restaurantes saludables, dietas pre-hechas

### Segmento de Clientes
Early adopters: Profesionales 25-35, tech-savvy, Instagram users, ingresos >$1.5M

### Propuesta de Valor Única
"Come según tus objetivos sin pensar, cada semana en tu puerta"

### Solución
1. App con personalización por objetivos
2. Preparación y delivery semanal
3. Ajustes según feedback y progreso

### Canales
- Instagram ads
- Referral program
- Gym partnerships

### Métricas Clave
- Clientes activos semanales
- Retención mensual
- NPS
- CAC vs LTV

### Ventaja Injusta
- Algoritmo de personalización propietario
- Relación exclusiva con cocina partner
- Comunidad de usuarios activos

### Estructura de Costos
- COGS: 45%
- CAC: $8.000 (target)
- Tecnología: $2M/mes
- Equipo: $8M/mes

### Fuentes de Ingresos
- Suscripción: $15.000 - $25.000/semana
- LTV proyectado: $450.000

---

Canvas generados en:
- 08_canvas/business_model_canvas.md
- 08_canvas/lean_canvas.md

Hipótesis identificadas para validar:
1. WTP $15.000+ por meal prep personalizado
2. CAC < $10.000 via Instagram
3. Retención >70% mes a mes

Ver ASSUMPTIONS.md para lista completa.
```

## Implementation Status
- [ ] Placeholder - needs implementation