# Diagnóstico de Mejoras MIDI v0.2.0

**Fecha:** 2026-05-05
**Versión base:** v0.1.0
**Versión objetivo:** v0.2.0

---

## 1. Estado Actual del Proyecto

### ✅ Componentes Existentes

| Componente | Estado | Calidad | Observaciones |
|------------|--------|---------|---------------|
| intake-agent | ✅ Existe | Alta | 26 preguntas base + preguntas dinámicas por sector |
| global-research-agent | ✅ Existe | Media | Falta integración con web real |
| fund-analyst-agent | ✅ Existe | Alta | Análisis de bases de fondos concursables |
| cost-researcher-agent | ✅ Existe | Alta | Presupuestos con fuentes |
| devil-advocate-agent | ✅ Existe | Alta | Crítica destructiva obligatoria |
| evaluator-agent | ✅ Existe | Alta | Scoring 0-100 |
| creative-agent | ✅ Existe | Media | Generación de ideas básica |
| hybridization-agent | ✅ Existe | Baja | Fusión de ideas limitada |
| niche-detector-agent | ✅ Existe | Baja | Detección de nichos básica |
| cohesion-agent | ✅ Existe | Media | Transición idea-proyecto |
| local-adaptation-agent | ✅ Existe | Media | Adaptación territorial básica |
| benchmark-agent | ✅ Existe | Media | Análisis de competencia |
| insight-agent | ✅ Existe | Media | Síntesis de insights |
| financial-agent | ✅ Existe | Alta | Análisis financiero con calculadoras |
| market-agent | ✅ Existe | Media | Análisis de mercado |
| legal-tax-agent | ✅ Existe | Alta | Aspectos legales y tributarios |
| technical-agent | ✅ Existe | Media | Factibilidad técnica |
| business-model-agent | ✅ Existe | Media | Modelos de negocio |
| risk-agent | ✅ Existe | Media | Análisis de riesgos |
| writer-agent | ✅ Existe | Alta | Documentación final |
| orchestrator-agent | ✅ Existe | Alta | Coordinación general |

### 📁 Archivos de Configuración

- ✅ `midi.config.json` - Configuración general
- ✅ `workflow-config.json` - Configuración de workflows
- ✅ `agent-routing.json` - Ruteo de agentes
- ✅ `scoring-rubric.json` - Rúbrica de evaluación

### 📋 Workflows

- ✅ `exploration.workflow.md` - Modo exploración
- ✅ `financeable.workflow.md` - Modo financiable
- ✅ `full-midi.workflow.md` - Workflow completo

---

## 2. Brechas Detectadas

### 🔴 CRÍTICAS

| Brecha | Impacto | Descripción |
|--------|---------|-------------|
| Falta Fase 0 explícita | Alto | Contextualización inicial no está separada como fase |
| Análisis territorial limitado | Alto | No hay agente de investigación territorial profunda |
| Metodologías de innovación ausentes | Alto | No hay aplicación de Design Thinking, JTBD, SCAMPER, etc. |
| Formato de backlog de ideas incompleto | Alto | El formato actual no incluye todos los campos requeridos |
| Fusión de ideas limitada | Alto | hybridization-agent necesita mejora significativa |
| Falta priorización robusta | Medio | No hay matriz de priorización multi-criterio |
| Workflows no reflejan fases nuevas | Alto | Faltan etapas de cohesión y rondas iterativas |

### 🟡 MEDIAS

| Brecha | Impacto | Descripción |
|--------|---------|-------------|
| Investigación sin web real | Medio | Agentes no tienen acceso a web fetching |
| Falta detector de experiencias similares | Medio | No hay agente dedicado a casos de éxito/fracaso |
| Formulación de proyecto no iterativa | Medio | No hay rondas de refinamiento |
| Falta validación final estructurada | Medio | Checklist de validación incompleto |

### 🟢 MENORES

| Brecha | Impacto | Descripción |
|--------|---------|-------------|
| Templates no incluyen todos los formatos | Bajo | Faltan templates para nuevos outputs |
| Documentación no actualizada | Bajo | Manual no refleja nuevas funcionalidades |

---

## 3. Arquitectura Propuesta v0.2.0

### 3.1 Fases del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    MIDI v0.2.0 Framework                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FASE 0: CONTEXTUALIZACIÓN INICIAL                          │
│  ├─ intake-agent (mejorado)                                  │
│  ├─ Objetivo: Entender punto de partida                     │
│  └─ Output: USER_CONTEXT.md + DECISION_ROUTE.md             │
│                                                              │
│  FASE 1: EXPLORACIÓN DE IDEAS                               │
│  ├─ global-research-agent (investigación externa)           │
│  ├─ territorial-research-agent (NUEVO - análisis territorio)│
│  ├─ innovation-methodology-agent (NUEVO - DT, JTBD, etc.)   │
│  ├─ niche-detector-agent (mejorado)                          │
│  ├─ creative-agent (backlog de ideas mejorado)              │
│  ├─ hybridization-agent (mejorado - fusión de ideas)        │
│  ├─ prioritizer-agent (NUEVO - matriz multi-criterio)       │
│  └─ Output: IDEA_BACKLOG.md + TOP3_IDEAS.md                 │
│                                                              │
│  FASE 1.5: COHESIÓN IDEA-PROYECTO                           │
│  ├─ cohesion-agent (mejorado)                                │
│  ├─ Objetivo: Traducir idea en hipótesis de proyecto        │
│  └─ Output: PROJECT_HYPOTHESIS.md                           │
│                                                              │
│  FASE 2: ANÁLISIS DEL PROYECTO                              │
│  │                                                          │
│  │  Ronda 1: Marco de Financiamiento                        │
│  │  ├─ fund-analyst-agent (bases de fondos)                 │
│  │  └─ Output: FUND_ANALYSIS.md                             │
│  │                                                          │
│  │  Ronda 2: Investigación de Casos                         │
│  │  ├─ case-research-agent (NUEVO - experiencias similares) │
│  │  └─ Output: CASE_RESEARCH.md                             │
│  │                                                          │
│  │  Ronda 3: Formulación                                    │
│  │  ├─ formulator-agent (NUEVO - objetivos, actividades)    │
│  │  └─ Output: PROJECT_FORMULATION.md                       │
│  │                                                          │
│  │  Ronda 4: Presupuesto                                    │
│  │  ├─ cost-researcher-agent (presupuesto con fuentes)      │
│  │  └─ Output: BUDGET_WITH_SOURCES.md                       │
│  │                                                          │
│  │  Ronda 5: Análisis Financiero y Riesgos                  │
│  │  ├─ financial-agent (análisis financiero)                │
│  │  ├─ risk-agent (análisis de riesgos)                     │
│  │  └─ Output: FINANCIAL_ANALYSIS.md + RISK_REGISTER.md     │
│  │                                                          │
│  │  Ronda 6: Validación Crítica                             │
│  │  ├─ devil-advocate-agent (crítica destructiva)           │
│  │  └─ Output: DEVIL_REPORT.md                              │
│  │                                                          │
│  │  Ronda 7: Evaluación                                     │
│  │  ├─ evaluator-agent (scoring 0-100)                      │
│  │  └─ Output: EVALUATOR_SCORECARD.md                       │
│  │                                                          │
│  │  Ronda 8: Documentación Final                            │
│  │  ├─ writer-agent (documento consolidado)                 │
│  │  └─ Output: FINAL_PROJECT_DOCUMENT.md                    │
│  │                                                          │
│  FASE 3: VALIDACIÓN FINAL                                   │
│  ├─ validation-agent (checklist de validación)              │
│  └─ Output: VALIDATION_REPORT.md                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Agentes Nuevos a Crear

| Agente | Propósito | Prioridad |
|--------|-----------|-----------|
| territorial-research-agent | Análisis geográfico, clima, territorio, actores locales | ALTA |
| innovation-methodology-agent | Aplicar Design Thinking, JTBD, SCAMPER, PESTEL, FODA | ALTA |
| prioritizer-agent | Matriz de priorización multi-criterio | ALTA |
| case-research-agent | Buscar experiencias similares, casos éxito/fracaso | MEDIA |
| formulator-agent | Formulación de objetivos, actividades, indicadores | MEDIA |

### 3.3 Agentes a Mejorar

| Agente | Mejoras Requeridas | Prioridad |
|--------|-------------------|-----------|
| intake-agent | Agregar Fase 0 explícita, preguntas de fondo concursable específico | ALTA |
| creative-agent | Formato de backlog más detallado, 20 campos por idea | ALTA |
| hybridization-agent | Análisis de fusiones más profundo, justificación de valor | ALTA |
| niche-detector-agent | Nichos con evidencia, potencial de financiamiento | ALTA |
| cohesion-agent | Más campos de transición, decisiones explícitas | MEDIA |
| local-adaptation-agent | Análisis territorial más profundo | MEDIA |

---

## 4. Reglas Estrictas de Comportamiento (20 Reglas)

### ✅ Reglas Implementadas

| # | Regla | Estado | Dónde |
|---|-------|--------|-------|
| 1 | No inventar precios | ✅ | cost-researcher-agent |
| 2 | No inventar bases de fondos | ✅ | fund-analyst-agent |
| 3 | No inventar restricciones | ✅ | fund-analyst-agent |
| 4 | No inventar fuentes | ✅ | global-research-agent |
| 5 | No entregar presupuestos sin desglose | ✅ | cost-researcher-agent |
| 6 | No generar ideas genéricas sin contexto | ⚠️ | creative-agent (mejorar) |
| 7 | No asumir que una idea es buena sin análisis | ⚠️ | Todos los agentes |
| 8 | No pasar a análisis sin definir financiamiento | ⚠️ | cohesion-agent (agregar) |
| 9 | No tratar igual proyecto privado vs fondo | ✅ | fund-analyst-agent |
| 10 | No usar presupuesto de forma arbitraria | ✅ | cost-researcher-agent |
| 11 | Optimizar uso del 100% del presupuesto | ✅ | cost-researcher-agent |
| 12 | Indicar explícitamente si falta información | ⚠️ | Todos los agentes |
| 13 | Separar supuestos de datos confirmados | ✅ | Varios agentes |
| 14 | Justificar ideas recomendadas | ⚠️ | creative-agent (mejorar) |
| 15 | Explicar ideas descartadas | ⚠️ | prioritizer-agent (crear) |
| 16 | Decir claramente si idea no calza con fondo | ✅ | fund-analyst-agent |
| 17 | Crear agentes/skills/workflows si faltan | ✅ | Framework flexible |
| 18 | Privilegiar evidencia, contexto y trazabilidad | ⚠️ | Todos los agentes |
| 19 | Entregar links en investigación externa | ⚠️ | global-research-agent (mejorar) |
| 20 | Trabajar de forma iterativa con decisiones | ⚠️ | workflow-config.json (mejorar) |

---

## 5. Outputs Esperados por Fase

### Fase 0: USER_CONTEXT.md (mejorado)

```markdown
# USER_CONTEXT

## Nivel de Madurez
- [ ] Cero idea
- [ ] Idea inicial
- [ ] Idea avanzada
- [ ] Proyecto en formulación
- [ ] Proyecto listo para evaluación
- [ ] Proyecto en búsqueda de financiamiento

## Ruta de Trabajo Decidida
- [ ] Explorar ideas desde cero
- [ ] Mejorar idea existente
- [ ] Analizar proyecto para financiamiento

## Fondo Concursable (si aplica)
- Nombre del fondo: [Nombre]
- Link oficial: [URL]
- Bases disponibles: [Sí/No]
- Presupuesto máximo: $[X]
- Fecha cierre: [Fecha]

## Decisiones Pendientes
1. [Decisión pendiente 1]
2. [Decisión pendiente 2]
```

### Fase 1: IDEA_BACKLOG.md (formato mejorado)

Cada idea incluye 20 campos:
1. Nombre tentativo
2. Descripción breve
3. Problema que resuelve
4. Público objetivo
5. Territorio o contexto ideal
6. Componentes principales
7. Innovación propuesta
8. Evidencia o inspiración encontrada
9. Recursos necesarios
10. Dificultad estimada
11. Costo estimado preliminar
12. Potencial de impacto
13. Potencial de financiamiento
14. Riesgos
15. Dependencias
16. Primeros pasos
17. Links o fuentes relevantes
18. Score preliminar (6 dimensiones)
19. Viabilidad territorial
20. Alineación con fondo (si existe)

### Fase 1.5: PROJECT_HYPOTHESIS.md

```markdown
# PROJECT_HYPOTHESIS

## Idea Seleccionada
- Nombre: [Nombre]
- Fuente: [Idea original / Fusión de ideas X+Y]

## Problema Concreto
[Descripción del problema]

## Beneficiarios
- Directos: [X personas/organizaciones]
- Indirectos: [Y personas/organizaciones]

## Territorio
- Ubicación: [Región/Comuna]
- Justificación: [Por qué este territorio]

## Objetivo General
[Objetivo general preliminar]

## Objetivos Específicos
1. [Objetivo específico 1]
2. [Objetivo específico 2]
3. [Objetivo específico 3]

## Resultados Esperados
1. [Resultado 1]
2. [Resultado 2]

## Vía de Financiamiento
- [ ] Fondo concursable: [Nombre]
- [ ] Financiamiento privado
- [ ] Autofinanciamiento
- [ ] Crowdfunding
- [ ] Otro: [Especificar]

## Restricciones Identificadas
1. [Restricción 1]
2. [Restricción 2]

## Información Faltante
1. [Información faltante 1]
2. [Información faltante 2]

## Decisiones Requeridas del Usuario
1. [Decisión 1] - ¿[Pregunta]?
2. [Decisión 2] - ¿[Pregunta]?

## Próximos Pasos
1. [Paso 1]
2. [Paso 2]
```

### Fase 2: Presupuesto Detallado

```markdown
| Categoría | Ítem | Descripción | Proveedor | Link | Unidad | Cantidad | Valor Unit. | Subtotal | Justificación | Elegible | Estado |
|-----------|------|-------------|-----------|------|--------|----------|-------------|----------|---------------|----------|--------|
| RRHH | Consultor | 40h consultoría | [Nombre] | [URL] | Hora | 40 | $50.000 | $2.000.000 | Diseño modelo | ✅ SÍ | ✅ Cotizado |

## Totales
- Total presupuesto: $[X]
- Monto máximo fondo: $[Y]
- % utilizado: [Z]%
- Saldo disponible: $[W]

## Optimización
[Propuesta para usar el 100% si corresponde]
```

---

## 6. Flujo de Conversación Ideal

```
INICIO
  │
  ├─ MIDI: "¿Quieres explorar ideas desde cero, mejorar una idea existente
  │        o analizar un proyecto para financiamiento?"
  │
  ├─ Usuario: "Explorar ideas"
  │   │
  │   ├─ MIDI: "¿Tema o área de interés?"
  │   ├─ MIDI: "¿Territorio?"
  │   ├─ MIDI: "¿Recursos disponibles?"
  │   ├─ MIDI: "¿Existe fondo o convocatoria específica?"
  │   │   │
  │   │   └─ Si SÍ: "Proporciona nombre o link del fondo"
  │   │              └─ Fase 1 condicionada por bases del fondo
  │   │
  │   ├─ FASE 1: Investigación → Metodologías → Nichos → Ideas → Fusiones → Priorización
  │   └─ Output: TOP3_IDEAS.md
  │
  ├─ Usuario: "Analizar proyecto"
  │   │
  │   ├─ MIDI: "Describe tu proyecto"
  │   ├─ MIDI: "¿Qué tipo de financiamiento buscas?"
  │   │   │
  │   │   ├─ "Fondo concursable" → Pedir bases oficiales
  │   │   │   └─ Fase 2 orientada a fondo específico
  │   │   │
  │   │   └─ "Financiamiento privado" → Pedir info de mercado/cliente
  │   │       └─ Fase 2 orientada a inversión privada
  │   │
  │   └─ FASE 2: Rondas iterativas de análisis
  │
  └─ Output: FINAL_PROJECT_DOCUMENT.md
```

---

## 7. Plan de Implementación

### Sprint 1: Fundamentos (Prioridad Alta)

1. **Actualizar intake-agent** - Fase 0 explícita, preguntas de fondo específico
2. **Crear territorial-research-agent** - Análisis territorial profundo
3. **Crear innovation-methodology-agent** - Aplicar metodologías de innovación
4. **Mejorar creative-agent** - Formato de backlog con 20 campos
5. **Mejorar hybridization-agent** - Análisis de fusiones completo
6. **Crear prioritizer-agent** - Matriz multi-criterio

### Sprint 2: Análisis (Prioridad Media)

1. **Mejorar cohesion-agent** - Más campos de transición
2. **Crear case-research-agent** - Experiencias similares
3. **Crear formulator-agent** - Formulación de proyecto
4. **Mejorar workflow-config.json** - Fases y rondas iterativas
5. **Actualizar workflows** - Exploración, Financeable, Full-MIDI

### Sprint 3: Documentación y Validación

1. **Crear templates** - Outputs esperados
2. **Actualizar documentación español** - Manual, Agentes, Quickstart
3. **Crear VALIDATION_REPORT template** - Checklist final
4. **Actualizar ROADMAP y PROJECT.md**
5. **Tests de nuevos agentes**

---

## 8. Estimación de Esfuerzo

| Componente | Líneas aprox. | Tiempo estimado | Complejidad |
|------------|---------------|-----------------|-------------|
| territorial-research-agent | ~350 líneas | 2 horas | Media |
| innovation-methodology-agent | ~400 líneas | 2.5 horas | Alta |
| prioritizer-agent | ~300 líneas | 1.5 horas | Media |
| case-research-agent | ~300 líneas | 1.5 horas | Media |
| formulator-agent | ~350 líneas | 2 horas | Media |
| Mejoras intake-agent | ~150 líneas | 1 hora | Baja |
| Mejoras creative-agent | ~200 líneas | 1.5 horas | Media |
| Mejoras hybridization-agent | ~150 líneas | 1 hora | Media |
| Actualizar workflows | ~300 líneas | 1.5 horas | Media |
| Templates | ~500 líneas | 2 horas | Baja |
| Documentación | ~800 líneas | 3 horas | Baja |
| **Total** | ~3,800 líneas | ~19 horas | - |

---

## 9. Dependencias

```
intake-agent (mejorado)
  └─> territorial-research-agent
       └─> innovation-methodology-agent
            └─> niche-detector-agent (mejorado)
                 └─> creative-agent (mejorado)
                      └─> hybridization-agent (mejorado)
                           └─> prioritizer-agent
                                └─> TOP3_IDEAS.md
                                     └─> cohesion-agent (mejorado)
                                          └─> PROJECT_HYPOTHESIS.md
                                               ├─> fund-analyst-agent
                                               │    └─> case-research-agent
                                               │         └─> formulator-agent
                                               │              └─> cost-researcher-agent
                                               │                   └─> financial-agent
                                               │                        └─> risk-agent
                                               │                             └─> devil-advocate-agent
                                               │                                  └─> evaluator-agent
                                               │                                       └─> writer-agent
                                               │                                            └─> validation-agent
                                               └─> (ruta financiamiento privado)
                                                    └─> [misma cadena sin fund-analyst-agent]
```

---

## 10. Criterios de Éxito

### Funcionales

- [ ] Fase 0 captura nivel de madurez y ruta de trabajo
- [ ] Fase 1 genera backlog con 20 campos por idea
- [ ] Fase 1 incluye análisis territorial y metodologías de innovación
- [ ] Fase 1.5 traduce idea en hipótesis de proyecto
- [ ] Fase 2 trabaja por rondas iterativas
- [ ] Presupuesto usa 100% del monto máximo cuando aplica
- [ ] Todas las reglas de comportamiento implementadas
- [ ] Devil-advocate es obligatorio antes de aprobar proyecto
- [ ] Validación final incluye checklist completo

### Técnicos

- [ ] Todos los agentes nuevos tienen tests
- [ ] Workflows actualizados y validados
- [ ] Documentación actualizada en español
- [ ] Score de calidad del framework >= 90/100

### Usuario

- [ ] Flujo de conversación es intuitivo
- [ ] Outputs son completos y útiles para postulación
- [ ] Links y fuentes son accesibles
- [ ] Decisiones clave se preguntan explícitamente

---

## 11. Próximos Pasos Inmediatos

1. ✅ Crear este documento de diagnóstico
2. 🔄 Actualizar `intake-agent.md` con Fase 0 explícita
3. ⏳ Crear `territorial-research-agent.md`
4. ⏳ Crear `innovation-methodology-agent.md`
5. ⏳ Mejorar `creative-agent.md`
6. ⏳ Mejorar `hybridization-agent.md`
7. ⏳ Crear `prioritizer-agent.md`
8. ⏳ Actualizar `workflow-config.json`
9. ⏳ Actualizar workflows
10. ⏳ Crear templates
11. ⏳ Actualizar documentación
12. ⏳ Commit y push

---

*Documento generado como parte de MIDI v0.2.0 Enhancement Plan*
*Fecha: 2026-05-05*
