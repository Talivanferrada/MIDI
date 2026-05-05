# MIDI Framework - Diagnóstico y Plan de Mejoras

## 1. Estado Actual vs. Propuesto

### 1.1 Fases del Sistema

| Aspecto | MIDI Actual | Propuesto en Prompt | Brecha |
|---------|-------------|---------------------|--------|
| **Fase 0** | No existe | Contextualización inicial comprehensiva | ❌ CRÍTICO |
| **Fase 1** | Exploración existe | Exploración con investigación real, territorial, metodologías | ⚠️ PARCIAL |
| **Fase Cohesión** | No existe | Traduce idea en hipótesis de proyecto | ❌ CRÍTICO |
| **Fase 2** | Análisis existe | Análisis iterativo por rondas | ⚠️ PARCIAL |

### 1.2 Agentes Existentes vs. Necesarios

| Agente Propuesto | Existe en MIDI | Estado | Acción |
|------------------|----------------|--------|--------|
| Orquestador | ✅ midi-orchestrator | OK | Mejorar lógica de decisión |
| Contextualización | ⚠️ midi-intake-agent | PARCIAL | Ampliar preguntas |
| Investigador Global | ✅ midi-global-research-agent | OK | Agregar obligatoriedad de fuentes |
| Investigador Territorial | ⚠️ midi-local-adaptation-agent | PARCIAL | Agregar clima, riesgos, conectividad |
| Metodologías Innovación | ⚠️ midi-creative-agent | PARCIAL | Agregar PESTEL, Teoría de Cambio |
| Detector de Nichos | ❌ No existe | FALTA | CREAR |
| Generador de Ideas | ✅ midi-creative-agent | OK | Mejorar formato de backlog |
| Fusionador de Ideas | ✅ midi-hybridization-agent | OK | Agregar más detalle |
| Priorizador | ⚠️ midi-evaluator-agent | PARCIAL | Agregar matriz específica |
| Cohesión Proyecto-Idea | ❌ No existe | FALTA | CREAR |
| Analista de Bases | ❌ No existe | FALTA | CREAR CRÍTICO |
| Financiamiento | ✅ midi-funding-match-agent | OK | Agregar análisis de bases |
| Investigador de Casos | ⚠️ midi-benchmark-agent | PARCIAL | Agregar búsqueda de experiencias |
| Costos y Cotizaciones | ❌ No existe | FALTA | CREAR CRÍTICO |
| Formulador de Proyecto | ✅ midi-writer-agent | OK | Mejorar para fondos concursables |
| Evaluador Crítico | ✅ midi-devil-advocate-agent | OK | Agregar validación de presupuesto |

### 1.3 Funcionalidades Críticas Faltantes

| Funcionalidad | Prioridad | Descripción |
|---------------|-----------|-------------|
| **Análisis de bases de fondos** | 🔴 CRÍTICO | Leer PDFs/links de convocatorias, extraer requisitos |
| **Presupuestos con fuentes** | 🔴 CRÍTICO | Cotizaciones reales, links, proveedores |
| **Optimización de presupuesto** | 🔴 CRÍTICO | Usar 100% del presupuesto máximo |
| **Investigación externa obligatoria** | 🟡 ALTA | Links, fuentes, fechas obligatorias |
| **Análisis territorial detallado** | 🟡 ALTA | Clima, riesgos, conectividad, actores |
| **Backlog de ideas detallado** | 🟡 ALTA | Más campos por idea |
| **Fase de cohesión** | 🟡 ALTA | Entre exploración y análisis |
| **Checklist de admisibilidad** | 🟡 ALTA | Verificar requisitos antes de formular |

---

## 2. Plan de Implementación

### 2.1 Nuevos Agentes a Crear

1. **midi-fund-analyst-agent** - Analista de bases de fondos concursables
2. **midi-cost-researcher-agent** - Investigador de costos y cotizaciones
3. **midi-niche-detector-agent** - Detector de nichos y oportunidades
4. **midi-cohesion-agent** - Cohesión entre idea y proyecto

### 2.2 Agentes a Mejorar

1. **midi-intake-agent** - Agregar Fase 0 completa
2. **midi-local-adaptation-agent** - Análisis territorial profundo
3. **midi-creative-agent** - Más metodologías, mejor backlog
4. **midi-financial-agent** - Presupuestos con fuentes obligatorias
5. **midi-funding-match-agent** - Análisis de bases
6. **midi-writer-agent** - Formulación para fondos

### 2.3 Nuevas Estructuras

1. **Fase 0: Contextualización** - Nueva fase en workflows
2. **Fase Cohesión** - Entre exploración y análisis
3. **Template de Backlog Detallado** - Más campos por idea
4. **Template de Presupuesto con Fuentes** - Formato obligatorio
5. **Checklist de Admisibilidad** - Para fondos concursables

---

## 3. Reglas Estrictas a Implementar

### 3.1 En todos los agentes de investigación

```
REGLA: Toda afirmación debe tener fuente.
FORMATO: "Según [fuente] ([link]), [fecha]..."
SI NO HAY FUENTE: Marcar como [SUPUESTO - Validar]
```

### 3.2 En agentes de presupuesto

```
REGLA: No inventar precios.
FORMATO: 
- Precio de mercado: [valor] según [proveedor] ([link])
- Pendiente: [REQUIERE COTIZACIÓN FORMAL]
- Estimado: [valor] [ESTIMADO - Validar]

OBLIGATORIO:
- Link o fuente de cada precio
- Fecha de consulta
- Proveedor referencial
```

### 3.3 En análisis de fondos

```
REGLA: No inventar restricciones.
OBLIGATORIO:
- Solo usar información de bases oficiales
- Si no hay bases: [PENDIENTE - Solicitar bases oficiales]
- Si hay dudas: [VERIFICAR EN BASES]
```

---

## 4. Cambios por Archivo

### 4.1 Nuevos Archivos

| Archivo | Propósito |
|---------|-----------|
| `agents/midi-fund-analyst-agent.md` | Analiza bases de fondos |
| `agents/midi-cost-researcher-agent.md` | Busca precios reales |
| `agents/midi-niche-detector-agent.md` | Detecta nichos |
| `agents/midi-cohesion-agent.md` | Une exploración y análisis |
| `workflows/contextualization.workflow.md` | Fase 0 |
| `workflows/cohesion.workflow.md` | Fase intermedia |
| `templates/idea-backlog-detailed.md` | Backlog mejorado |
| `templates/budget-with-sources.md` | Presupuesto con fuentes |
| `templates/fund-analysis.md` | Análisis de bases |
| `templates/admissibility-checklist.md` | Checklist admisibilidad |

### 4.2 Archivos a Modificar

| Archivo | Cambios |
|---------|---------|
| `agents/midi-intake-agent.md` | Agregar Fase 0 completa |
| `agents/midi-local-adaptation-agent.md` | Análisis territorial |
| `agents/midi-creative-agent.md` | Mejorar metodologías |
| `agents/midi-financial-agent.md` | Presupuestos con fuentes |
| `agents/midi-funding-match-agent.md` | Análisis de bases |
| `agents/midi-orchestrator.md` | Nueva lógica de fases |
| `workflows/full-midi.workflow.md` | Agregar Fase 0 y Cohesión |
| `config/agent-routing.json` | Nuevas rutas |
| `config/scoring-rubric.json` | Nuevos criterios |

---

## 5. Ejecución

### Orden de implementación:

1. **Paso 1:** Crear nuevos agentes críticos
   - midi-fund-analyst-agent
   - midi-cost-researcher-agent
   - midi-niche-detector-agent
   - midi-cohesion-agent

2. **Paso 2:** Mejorar agentes existentes
   - intake-agent (Fase 0)
   - local-adaptation-agent (territorial)
   - creative-agent (backlog)
   - financial-agent (presupuestos)

3. **Paso 3:** Crear nuevas estructuras
   - Templates
   - Workflows
   - Checklists

4. **Paso 4:** Actualizar orquestador
   - Nueva lógica de decisiones
   - Rutas actualizadas

5. **Paso 5:** Documentar
   - Actualizar MANUAL_DE_USO.md
   - Actualizar AGENTES.md

---

*Diagnóstico generado: 2026-05-04*
*Basado en: Prompt_extend.md*
