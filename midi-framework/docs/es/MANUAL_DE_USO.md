# Manual de Uso - MIDI Framework v0.2.0

## Índice

1. [Introducción](#introducción)
2. [Novedades v0.2.0](#novedades-v020)
3. [Instalación](#instalación)
4. [Inicio Rápido](#inicio-rápido)
5. [Arquitectura del Framework](#arquitectura-del-framework)
6. [Fases del Proceso](#fases-del-proceso)
7. [Comandos CLI](#comandos-cli)
8. [Agentes](#agentes)
9. [Workflows](#workflows)
10. [Estructura de Outputs](#estructura-de-outputs)
11. [Ejemplos de Uso](#ejemplos-de-uso)
12. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

### ¿Qué es MIDI?

**MIDI** (Modelo Inteligente de Desarrollo de Innovación) es un framework multiagente que guía desde una idea inicial o problema difuso hasta una propuesta de proyecto robusta, investigada, presupuestada y lista para postular a fondos concursables o buscar financiamiento privado.

### ¿Para quién es MIDI?

- **Emprendedores** que quieren validar y estructurar su idea
- **Startups** que buscan financiamiento (fondos o inversión privada)
- **Organizaciones** que postulan a fondos concursables públicos
- **Consultores** que acompañan procesos de innovación
- **Incubadoras/Aceleradoras** que evalúan proyectos

### ¿Qué hace diferente a MIDI?

1. **Proceso estructurado en fases**: Contextualización → Exploración → Cohesión → Análisis → Validación
2. **10 metodologías de innovación**: Design Thinking, JTBD, Blue Ocean, SCAMPER, PESTEL, FODA, Árbol de Problemas, Teoría de Cambio, Lean Startup
3. **Análisis territorial profundo**: Geografía, clima, actores, oportunidades, riesgos
4. **Priorización multi-criterio**: 14 dimensiones con pesos adaptativos según contexto
5. **Devil's Advocate obligatorio**: Todo proyecto pasa por crítica rigurosa antes de aprobarse
6. **Presupuestos con fuentes reales**: Links a proveedores, precios de mercado, optimización al 100%
7. **20 reglas estrictas**: No inventar precios, no inventar bases, separar supuestos de datos
8. **Contexto chileno**: Diseñado para la realidad de fondos CORFO, SERCOTEC, FIA, Start-Up Chile

---

## Novedades v0.2.0

### Nuevos Agentes (4)
- **territorial-research-agent**: Análisis geográfico, climático, de actores y oportunidades
- **innovation-methodology-agent**: Aplica Design Thinking, JTBD, Blue Ocean, SCAMPER, PESTEL, FODA, etc.
- **prioritizer-agent**: Matriz multi-criterio de 14 dimensiones con pesos adaptativos
- **case-research-agent**: Investiga casos similares, éxitos, fracasos y aprendizajes

### Nueva Estructura de Fases
- **Fase 0**: Contextualización explícita (decide ruta de trabajo)
- **Fase 1**: Exploración con análisis territorial y metodologías de innovación
- **Fase 1.5**: Cohesión idea-proyecto (transforma idea en hipótesis)
- **Fase 2**: Análisis iterativo en 8 rondas
- **Fase 3**: Validación final con checklist completo

### Mejoras
- Workflow v2.0.0 con 15 etapas y 10 gates de decisión
- 20 reglas estrictas de comportamiento formalizadas
- Outputs organizados por prefijo de fase (00_, 10_, 20_, 30_, 40_, 50_)
- Templates de outputs con estructura detallada

---

## Instalación

### Requisitos

- Node.js >= 16.x
- npm >= 8.x
- Git
- OpenCode, Claude Code, o compatible

### Instalación desde Código Fuente

```bash
# Clonar repositorio
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework

# Instalar dependencias
npm install

# Instalar globalmente (opcional)
npm link

# Verificar instalación
midi doctor
```

### Verificación

```bash
$ midi doctor

✅ MIDI Framework v0.2.0
✅ Node.js: v18.x
✅ Configuración: OK
✅ Agentes: 28 disponibles
✅ Workflows: 3 disponibles
✅ Templates: 12 disponibles

Todo listo para usar MIDI.
```

---

## Inicio Rápido

### Crear nuevo proyecto

```bash
# Crear proyecto
midi init mi-proyecto

# Entrar al directorio
cd mi-proyecto

# Iniciar workflow
midi start
```

### Ejemplo de sesión interactiva

```
$ midi start

🚀 MIDI Framework v0.2.0
Iniciando proyecto: mi-proyecto

📋 Fase 0: Contextualización

? ¿Qué deseas hacer hoy?
  → Explorar ideas desde cero

? ¿En qué región se implementará?
  → Araucanía

? ¿Buscas financiamiento específico?
  → Sí, fondo concursable CORFO

? ¿Tienes el link a las bases?
  → https://www.corfo.cl/convocatoria...

✅ Fase 0 completada
   → 00_USER_CONTEXT.md
   → 00_DECISION_ROUTE.md

⏳ Ejecutando Fase 1.1: Investigación Territorial...
```

---

## Arquitectura del Framework

```
┌─────────────────────────────────────────────────────────────┐
│                    MIDI Framework v0.2.0                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CLI (midi.js)                                               │
│  ├─ init: Crear proyecto                                     │
│  ├─ start: Iniciar workflow completo                        │
│  ├─ explore: Modo exploración                               │
│  ├─ analyze: Modo análisis                                   │
│  └─ doctor: Verificar instalación                           │
│                                                              │
│  Workflows (.midi/workflows/)                               │
│  ├─ full-midi.workflow.md: Proceso completo                 │
│  ├─ exploration.workflow.md: Solo exploración               │
│  └─ financeable.workflow.md: Solo análisis                  │
│                                                              │
│  Agents (.midi/agents/)                                      │
│  ├─ 28 agentes especializados                              │
│  └─ Orchestrator coordina flujo                             │
│                                                              │
│  Config (.midi/config/)                                      │
│  ├─ midi.config.json: Configuración general                  │
│  ├─ workflow-config.json: Workflows y reglas                │
│  ├─ agent-routing.json: Ruteo de agentes                     │
│  └─ scoring-rubric.json: Rúbrica de evaluación              │
│                                                              │
│  Outputs (midi-project/)                                    │
│  ├─ 00_context/                                              │
│  ├─ 10_exploration/                                          │
│  ├─ 20_cohesion/                                             │
│  ├─ 30_analysis/                                             │
│  ├─ 40_validation/                                           │
│  └─ 50_final/                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Fases del Proceso

### FASE 0: Contextualización Inicial

**Objetivo:** Entender el punto de partida del usuario y decidir la ruta de trabajo.

**Preguntas clave:**
1. ¿Qué busca el usuario? (explorar, mejorar, analizar, postular)
2. ¿Nivel de madurez? (cero idea → proyecto listo)
3. ¿Tipo de financiamiento? (fondo público, inversión privada, crowdfunding, etc.)
4. ¿Territorio? (país, región, comuna)
5. ¿Fondo específico? (nombre, bases, presupuesto máximo)

**Outputs:**
- `00_USER_CONTEXT.md`: Perfil completo del usuario
- `00_DECISION_ROUTE.md`: Ruta de trabajo decidida

**Decisión:**
- Si "Explorar ideas" → RUTA EXPLORACIÓN → Fase 1
- Si "Analizar proyecto" → RUTA ANÁLISIS → Fase 1.5

---

### FASE 1: Exploración de Ideas

**Objetivo:** Descubrir oportunidades, investigar, generar y priorizar ideas contextualizadas.

#### Fase 1.1: Investigación Territorial

**Agente:** territorial-research-agent

**Análisis:**
- Geografía física (ubicación, clima, riesgos naturales, accesibilidad)
- Socioeconómico (población, economía, brechas)
- Mapa de actores (públicos, privados, comunitarios)
- Competencia e iniciativas similares
- Marco regulatorio local
- Oportunidades y desafíos

**Output:** `11_territorial_analysis.md`

#### Fase 1.2: Metodologías de Innovación

**Agente:** innovation-methodology-agent

**Metodologías aplicadas (selección automática):**
- Design Thinking → Para problemas no claros
- Jobs To Be Done → Para entender "trabajo" del usuario
- Blue Ocean Strategy → Para diferenciación
- SCAMPER → Para innovación sistemática
- PESTEL → Para análisis de entorno
- FODA → Para fortalezas/debilidades
- Árbol de Problemas → Para proyectos sociales
- Teoría de Cambio → Para impacto social
- Lean Startup → Para startups comerciales

**Output:** `13_innovation_insights.md`

#### Fase 1.3: Generación de Ideas

**Agentes:** niche-detector-agent, creative-agent, hybridization-agent

**Proceso:**
1. Detectar nichos y oportunidades
2. Generar 10-15 ideas con 20 campos cada una
3. Proponer fusiones entre ideas

**Output:** `14_IDEA_BACKLOG.md`

#### Fase 1.4: Priorización

**Agente:** prioritizer-agent

**Matriz multi-criterio (14 dimensiones):**
1. Impacto (15%)
2. Factibilidad técnica (10%)
3. Factibilidad económica (10%)
4. Deseabilidad usuario (12%)
5. Alineación territorial (8%)
6. Alineación fondo (10%)
7. Innovación (8%)
8. Sostenibilidad (7%)
9. Escalabilidad (5%)
10. Riesgo (5%)
11. Tiempo implementación (5%)
12. Uso presupuesto (3%)
13. Evidencia disponible (5%)
14. Diferenciación (7%)

**Pesos ajustados según contexto:**
- Fondo público → ↑ Alineación fondo, ↑ Impacto social
- Inversión privada → ↑ Factibilidad económica, ↑ Escalabilidad
- Proyecto social → ↑ Impacto social, ↑ Sostenibilidad

**Outputs:** `15_idea_ranking.md`, `15_TOP3_IDEAS.md`

---

### FASE 1.5: Cohesión Idea-Proyecto

**Objetivo:** Transformar la idea seleccionada en una hipótesis de proyecto analizable.

**Agente:** cohesion-agent

**Elementos:**
- Problema concreto
- Beneficiarios
- Territorio de implementación
- Objetivo general preliminar
- Objetivos específicos
- Vía de financiamiento (DECISIÓN OBLIGATORIA)
- Restricciones
- Información faltante
- Decisiones requeridas del usuario

**Gate:** ¿Qué tipo de financiamiento busca?
- Fondo concursable → Pide bases oficiales
- Inversión privada → Pide info de mercado/clientes
- Otro → Continúa con ajustes

**Output:** `20_PROJECT_HYPOTHESIS.md`

---

### FASE 2: Análisis del Proyecto

**Objetivo:** Análisis profundo, iterativo y basado en evidencia.

#### Ronda 2.1: Análisis de Fondo (si aplica)

**Agente:** fund-analyst-agent

**Análisis:**
- Requisitos de admisibilidad
- Criterios de evaluación con ponderaciones
- Gastos permitidos y prohibidos
- Monto máximo y cofinanciamiento
- Checklist de cumplimiento
- Alineación del proyecto
- Recomendaciones de mejora

**Outputs:** `31_fund_analysis.md`, `32_admissibility_checklist.md`

#### Ronda 2.2: Investigación de Casos

**Agente:** case-research-agent

**Categorías:**
1. Casos de éxito
2. Casos de fracaso
3. Proyectos financiados anteriormente
4. Pilotos similares
5. Papers e investigación
6. Notas de prensa
7. Bases de datos públicas
8. Programas anteriores

**Análisis:**
- Patrones de éxito
- Patrones de fracaso
- Factores diferenciadores
- Lecciones aprendidas

**Output:** `33_case_research.md`

#### Ronda 2.3: Formulación

**Agentes:** business-model-agent, technical-agent

**Elementos:**
- Objetivos (general y específicos)
- Resultados esperados
- Actividades
- Metodología
- Cronograma
- Indicadores
- Medios de verificación

**Output:** `34_project_formulation.md`

#### Ronda 2.4: Presupuesto Detallado

**Agente:** cost-researcher-agent

**Requisitos:**
- Precios reales de mercado
- Links a proveedores
- Fecha de consulta
- Desglose por ítem
- Verificación de elegibilidad
- Optimización al 100% del máximo

**Output:** `35_budget_with_sources.md`

#### Ronda 2.5: Análisis Financiero y Riesgos

**Agentes:** financial-agent, market-agent, risk-agent

**Análisis financiero:**
- Inversión inicial
- Costos operativos
- Proyección de ingresos
- Break-even point
- Cash flow
- Sensibilidad

**Análisis de riesgos:**
- Identificación
- Probabilidad e impacto
- Mitigaciones
- Plan de contingencia

**Outputs:** `36_financial_analysis.md`, `37_risk_register.md`

#### Ronda 2.6: Abogado del Diablo (OBLIGATORIO)

**Agente:** devil-advocate-agent

**Crítica destructiva:**
- Debilidades del proyecto
- Inconsistencias
- Supuestos débiles
- Riesgos de inadmisibilidad
- Riesgos de baja evaluación
- Competencia

**Veredicto:**
- CONTINUAR
- CONTINUAR CON AJUSTES
- ITERAR
- PAUSAR
- DESCARTAR

**Output:** `38_devil_report.md`

#### Ronda 2.7: Evaluación

**Agente:** evaluator-agent

**Score 0-100:**
- Rubrica de 6 dimensiones
- Puntaje por dimensión
- Recomendaciones

**Clasificación:**
- 90-100: EXCELENTE
- 80-89: MUY BUENO
- 70-79: BUENO
- 60-69: ACEPTABLE
- <60: BAJO

**Output:** `39_evaluator_scorecard.md`

---

### FASE 3: Validación Final

**Objetivo:** Checklist completo antes de documentación final.

**Agente:** validation-agent

**Validaciones:**
1. Documentación completa
2. Coherencia del proyecto
3. Alineación con fondo
4. Presupuesto con fuentes
5. Devil's Advocate aprobado
6. Score >= 70
7. Cumplimiento de 20 reglas estrictas

**Outputs:** `41_validation_report.md`, `50_final_project_document.md`

---

## Comandos CLI

### Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `midi init [nombre]` | Crear nuevo proyecto |
| `midi start` | Iniciar workflow completo |
| `midi doctor` | Verificar instalación |
| `midi status` | Ver estado del proyecto |
| `midi reset` | Reiniciar workflow |

### Comandos por Fase

| Comando | Fase | Descripción |
|---------|------|-------------|
| `midi territorial` | 1.1 | Análisis territorial |
| `midi innovate` | 1.2 | Metodologías de innovación |
| `midi ideate` | 1.3 | Generar ideas |
| `midi prioritize` | 1.4 | Priorizar ideas |
| `midi cohesion` | 1.5 | Cohesión idea-proyecto |
| `midi fund` | 2.1 | Análisis de fondo |
| `midi cases` | 2.2 | Investigar casos |
| `midi formulate` | 2.3 | Formular proyecto |
| `midi budget` | 2.4 | Crear presupuesto |
| `midi analyze` | 2.5 | Análisis financiero |
| `midi devil` | 2.6 | Abogado del diablo |
| `midi evaluate` | 2.7 | Evaluación 0-100 |
| `midi validate` | 3 | Validación final |
| `midi final` | Final | Documento final |

### Comandos de Workflow

| Comando | Descripción |
|---------|-------------|
| `midi explore` | Ejecutar solo modo exploración |
| `midi analyze` | Ejecutar solo modo análisis |
| `midi workflow full-midi` | Workflow completo |
| `midi workflow exploration` | Workflow exploración |
| `midi workflow financeable` | Workflow financiable |

---

## Agentes

### Agentes de Contexto

| Agente | Fase | Función |
|--------|------|---------|
| **intake-agent** | 0 | Captura contexto, decide ruta |
| **orchestrator-agent** | Todas | Coordina flujo |

### Agentes de Exploración

| Agente | Fase | Función |
|--------|------|---------|
| **territorial-research-agent** | 1.1 | Análisis territorial profundo |
| **global-research-agent** | 1.1 | Tendencias internacionales |
| **innovation-methodology-agent** | 1.2 | Aplica metodologías |
| **niche-detector-agent** | 1.3 | Detecta nichos |
| **creative-agent** | 1.3 | Genera ideas |
| **hybridization-agent** | 1.3 | Fusiona ideas |
| **prioritizer-agent** | 1.4 | Rankea ideas |

### Agentes de Análisis

| Agente | Fase | Función |
|--------|------|---------|
| **cohesion-agent** | 1.5 | Transforma idea en proyecto |
| **fund-analyst-agent** | 2.1 | Analiza fondos concursables |
| **case-research-agent** | 2.2 | Investiga casos similares |
| **business-model-agent** | 2.3 | Define modelo de negocio |
| **technical-agent** | 2.3 | Evalúa factibilidad técnica |
| **cost-researcher-agent** | 2.4 | Presupuesto con fuentes |
| **financial-agent** | 2.5 | Análisis financiero |
| **market-agent** | 2.5 | Análisis de mercado |
| **risk-agent** | 2.5 | Análisis de riesgos |
| **devil-advocate-agent** | 2.6 | Crítica destructiva |
| **evaluator-agent** | 2.7 | Evaluación 0-100 |

### Agentes de Documentación

| Agente | Fase | Función |
|--------|------|---------|
| **validation-agent** | 3 | Validación final |
| **writer-agent** | Final | Documento consolidado |

---

## Workflows

### full-midi (Completo)

**Etapas (15):**
1. contextualization
2. territorial-research
3. innovation-methods
4. idea-generation
5. idea-prioritization
6. cohesion
7. fund-analysis
8. case-research
9. formulation
10. budget
11. financial-risk
12. devil-advocate
13. evaluation
14. final-validation
15. final

**Gates (10):**
1. gate_contextualization
2. gate_territorial
3. gate_innovation
4. gate_prioritization
5. gate_cohesion
6. gate_fund
7. gate_devil
8. gate_evaluation
9. gate_validation

### exploration (Solo Exploración)

**Etapas (5):**
1. contextualization
2. territorial-research
3. innovation-methods
4. idea-generation
5. idea-prioritization

### financeable (Solo Análisis)

**Etapas (10):**
1. cohesion
2. fund-analysis
3. case-research
4. formulation
5. budget
6. financial-risk
7. devil-advocate
8. evaluation
9. final-validation
10. final

---

## Estructura de Outputs

### Organización por Prefijo de Fase

```
midi-project/
├── 00_context/
│   ├── 00_USER_CONTEXT.md
│   ├── 00_DECISION_ROUTE.md
│   └── 00_ASSUMPTIONS.md
│
├── 10_exploration/
│   ├── 11_territorial_analysis.md
│   ├── 12_global_research.md
│   ├── 13_innovation_insights.md
│   ├── 14_IDEA_BACKLOG.md
│   └── 15_TOP3_IDEAS.md
│
├── 20_cohesion/
│   └── 20_PROJECT_HYPOTHESIS.md
│
├── 30_analysis/
│   ├── 31_fund_analysis.md
│   ├── 32_admissibility_checklist.md
│   ├── 33_case_research.md
│   ├── 34_project_formulation.md
│   ├── 35_budget_with_sources.md
│   ├── 36_financial_analysis.md
│   ├── 37_risk_register.md
│   ├── 38_devil_report.md
│   └── 39_evaluator_scorecard.md
│
├── 40_validation/
│   └── 41_validation_report.md
│
└── 50_final/
    └── 50_final_project_document.md
```

### Formato de Idea (20 campos)

Cada idea en `14_IDEA_BACKLOG.md` incluye:

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
18. Score preliminar
19. Viabilidad territorial
20. Alineación con fondo (si existe)

---

## Ejemplos de Uso

### Ejemplo 1: Proyecto para Fondo CORFO

```bash
$ midi init agroinnova

🚀 MIDI Framework v0.2.0

? ¿Qué deseas hacer hoy?
  → Postular a fondo concursable específico

? ¿Nombre del fondo?
  → CORFO Innova Corrobio

? ¿Link a bases?
  → https://www.corfo.cl/convocatoria-innova-corrobio-2024

? ¿Región?
  → Araucanía

? ¿Presupuesto máximo?
  → $50.000.000

✅ Fase 0 completada
⏳ Ejecutando Fase 1...

[Proceso continúa automáticamente]

🎉 Proyecto completo
   → Score: 78/100 (BUENO)
   → Listo para postular
   → Fecha cierre: 15 días restantes
```

### Ejemplo 2: Exploración de Ideas

```bash
$ midi init ideas-turismo

🚀 MIDI Framework v0.2.0

? ¿Qué deseas hacer hoy?
  → Explorar ideas desde cero

? ¿Área de interés?
  → Turismo rural

? ¿Territorio?
  → Los Lagos, Puerto Varas

? ¿Recursos disponibles?
  → $10.000.000, tiempo completo

✅ Fase 0 completada
⏳ Fase 1.1: Análisis territorial...
⏳ Fase 1.2: Metodologías de innovación...
⏳ Fase 1.3: Generación de ideas...

📊 12 ideas generadas
🏆 Top 3:
   1. Glamping sustentable - Score 4.2/5
   2. Tours gastronómicos locales - Score 4.0/5
   3. Plataforma de experiencias - Score 3.8/5

? ¿Cuál idea desarrollar?
  → 1. Glamping sustentable

🔗 Fase 1.5: Cohesión...
? ¿Tipo de financiamiento?
  → Inversión privada

⏳ Fase 2: Análisis...

🎉 Proyecto completo para pitch de inversión
```

---

## Solución de Problemas

### Error: "No se encontró midi command"

**Solución:**
```bash
cd MIDI/midi-framework
npm link
```

### Error: "Agent not found"

**Solución:**
```bash
midi doctor
# Verificar que todos los agentes estén en .midi/agents/
```

### Error: "Workflow stuck"

**Solución:**
```bash
midi reset
midi status
midi start
```

### Error: "Score bajo (<70)"

**Acciones:**
1. Revisar `38_devil_report.md` para debilidades
2. Ejecutar `midi analyze` con ajustes
3. Iterar hasta score >= 70

---

## 20 Reglas Estrictas

1. ❌ No inventar precios
2. ❌ No inventar bases de fondos
3. ❌ No inventar restricciones
4. ❌ No inventar fuentes
5. ❌ No presupuestos sin desglose
6. ❌ No ideas genéricas sin contexto
7. ❌ No asumir éxito sin análisis
8. ❌ No analizar sin financiamiento definido
9. ❌ No tratar igual privado vs fondo
10. ❌ No usar presupuesto arbitrariamente
11. ✅ Optimizar 100% del presupuesto
12. ✅ Indicar explícitamente faltantes
13. ✅ Separar supuestos de datos
14. ✅ Justificar recomendaciones
15. ✅ Explicar descartes
16. ✅ Ser explícito si no calza
17. ✅ Crear lo que falta
18. ✅ Privilegiar evidencia
19. ✅ Links en investigación
20. ✅ Iterar con decisiones

---

## Contacto y Soporte

- **GitHub Issues:** https://github.com/Talivanferrada/MIDI/issues
- **Documentación:** `docs/es/`
- **Quick Start:** `docs/es/QUICKSTART.md`

---

*Manual de Uso - MIDI Framework v0.2.0*
*Última actualización: 2026-05-05*
