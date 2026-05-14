<div align="center">

# MIDI Framework

**Modelo Inteligente de Desarrollo de Innovación**

*Sistema multiagente que transforma ideas en proyectos financiables*

[![Versión](https://img.shields.io/badge/versión-0.2.0-blue.svg)](https://github.com/Talivanferrada/MIDI)
[![Licencia](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)
[![Chile](https://img.shields.io/badge/🇨🇱-Chile-red.svg)](https://github.com/Talivanferrada/MIDI)

</div>

---

## 📖 ¿Qué es MIDI?

**MIDI (Modelo Inteligente de Desarrollo de Innovación)** es un framework multiagente que guía a usuarios desde una idea inicial o problema difuso hasta una propuesta de proyecto robusta, investigada, presupuestada y lista para postular a fondos concursables o buscar financiamiento privado.

### 🎯 Objetivo Principal

Transformar **intuiciones en proyectos validados** mediante un proceso sistemático que incluye:
- Investigación territorial y de mercado
- Aplicación de metodologías de innovación
- Generación y priorización de ideas
- Análisis financiero con fuentes reales
- Validación crítica obligatoria

---

## ✨ Características Principales

### 🔍 Exploración Inteligente
- **Análisis territorial profundo**: Geografía, clima, actores, oportunidades, riesgos
- **10 metodologías de innovación**: Design Thinking, JTBD, Blue Ocean, SCAMPER, PESTEL, FODA, Árbol de Problemas, Teoría de Cambio, Lean Startup
- **Detección de nichos**: Identificación de oportunidades desatendidas
- **Fusión de ideas**: Propuestas híbridas con valor agregado

### 📊 Priorización Multi-Criterio
- **14 dimensiones de evaluación**: Impacto, factibilidad, deseabilidad, innovación, sostenibilidad, riesgo, etc.
- **Pesos adaptativos**: Ajuste automático según tipo de proyecto (fondo público, inversión privada, social)
- **Justificación transparente**: Cada ranking explica por qué

### 💰 Análisis de Financiamiento
- **Fondos concursables**: Extracción automática de requisitos, gastos permitidos, criterios de evaluación
- **Inversión privada**: Análisis de mercado, modelo de negocio, métricas de startup
- **Presupuestos con fuentes**: Precios reales de mercado, links a proveedores, optimización al 100% del presupuesto máximo

### ⚖️ Validación Rigurosa
- **20 reglas estrictas**: No inventar precios, no inventar bases, separar supuestos de datos
- **Abogado del diablo obligatorio**: Crítica destructiva antes de aprobación
- **Evaluación 0-100**: Scorecard con rúbrica detallada

---

## 🏗️ Arquitectura del Sistema

```
┌────────────────────────────────────────────────────────────────┐
│                     MIDI Framework v0.2.0                        │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FASE 0: CONTEXTUALIZACIÓN                                      │
│  └─► ¿Qué busca el usuario?                                     │
│  └─► Nivel de madurez                                           │
│  └─► Tipo de financiamiento                                     │
│                                                                  │
│  FASE 1: EXPLORACIÓN DE IDEAS                                  │
│  ├─► Investigación territorial                                  │
│  ├─► Metodologías de innovación                                 │
│  ├─► Generación de backlog (10-15 ideas)                       │
│  └─► Priorización multi-criterio                               │
│                                                                  │
│  FASE 1.5: COHESIÓN                                             │
│  └─► Transformación idea → hipótesis de proyecto               │
│                                                                  │
│  FASE 2: ANÁLISIS DEL PROYECTO (8 rondas iterativas)            │
│  ├─► Ronda 1: Análisis de fondo (si aplica)                     │
│  ├─► Ronda 2: Investigación de casos similares                 │
│  ├─► Ronda 3: Formulación (objetivos, actividades)             │
│  ├─► Ronda 4: Presupuesto detallado con fuentes                │
│  ├─► Ronda 5: Análisis financiero y riesgos                     │
│  ├─► Ronda 6: Abogado del diablo (obligatorio)                 │
│  ├─► Ronda 7: Evaluación 0-100                                  │
│  └─► Ronda 8: Documentación final                              │
│                                                                  │
│  FASE 3: VALIDACIÓN FINAL                                       │
│  └─► Checklist de completitud                                   │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Instalación

### Requisitos

- Node.js >= 16.x
- npm >= 8.x
- Git

### Instalación Rápida (Recomendada)

```bash
# 1. Clonar repositorio
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework

# 2. Ejecutar instalador automático
./install.sh

# ¡Listo! El instalador hace todo automáticamente:
# - Instala dependencias
# - Configura comando 'midi' global
# - Muestra instrucciones de uso
```

### Instalación Manual

```bash
# Clonar repositorio
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework

# Instalar dependencias
npm install

# Instalar globalmente
npm link

# Verificar instalación
midi doctor
```

### Inicio Rápido

```bash
# Opción 1: Crear proyecto y ver instrucciones
midi init mi-proyecto

# Opción 2: Crear proyecto e iniciar workflow automáticamente
midi init mi-proyecto --start

# Opción 3: Setup completo en un comando
midi setup --project-name mi-proyecto --start
```

### Solución de Problemas Comunes

| Problema | Solución |
|----------|----------|
| `npm install` falla con ENOENT | Asegúrate de estar en `MIDI/midi-framework/` |
| `midi: command not found` | Ejecuta `npm link` en el directorio `midi-framework` |
| Error con prompts interactivos | Usa flags: `midi init --yes --project-name nombre` |
| `node_modules` no encontrado | Ejecuta `./install.sh` para instalación automática |
| Error en entorno no interactivo | Agrega `--non-interactive` a los comandos |

---

## 📚 Uso

### Inicio Rápido

```bash
# Crear nuevo proyecto
midi init mi-proyecto

# Entrar al directorio
cd mi-proyecto

# Iniciar workflow completo
midi start
```

### Modos de Operación

#### 1. Modo Exploración (Generar ideas desde cero)

```bash
midi init
# Seleccionar: "Explorar ideas desde cero"
# Responder preguntas de contexto
# El sistema investiga, aplica metodologías, genera ideas y prioriza
```

**Outputs generados:**
```
00_context/
├── 00_USER_CONTEXT.md
└── 00_DECISION_ROUTE.md

10_exploration/
├── 11_territorial_analysis.md
├── 12_global_research.md
├── 13_innovation_insights.md
├── 14_idea_backlog.md
└── 15_top3_ideas.md
```

#### 2. Modo Financeable (Analizar proyecto existente)

```bash
midi init
# Seleccionar: "Analizar proyecto para financiamiento"
# Proporcionar descripción del proyecto
# Seleccionar tipo de financiamiento
```

**Outputs generados:**
```
00_context/
├── 00_USER_CONTEXT.md
└── 00_DECISION_ROUTE.md

20_cohesion/
├── 20_project_hypothesis.md

30_analysis/
├── 31_fund_analysis.md (si es fondo)
├── 32_case_research.md
├── 33_project_formulation.md
├── 34_budget_with_sources.md
├── 35_financial_analysis.md
├── 36_risk_register.md
├── 37_devil_report.md
└── 38_evaluator_scorecard.md

40_final/
├── 41_validation_report.md
└── 42_final_project_document.md
```

#### 3. Modo Fondo Específico (Postular a convocatoria)

```bash
midi init
# Seleccionar: "Postular a fondo concursable específico"
# Proporcionar: Nombre del fondo + Link a bases
# El sistema condiciona todo el análisis según las bases
```

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `midi init [nombre]` | Inicializar nuevo proyecto |
| `midi start` | Iniciar workflow completo |
| `midi explore` | Ejecutar solo modo exploración |
| `midi analyze` | Ejecutar solo modo análisis |
| `midi doctor` | Verificar instalación |
| `midi status` | Ver estado del proyecto actual |
| `midi reset` | Reiniciar workflow |

### Comandos por Fase

| Comando | Fase | Descripción |
|---------|------|-------------|
| `midi territorial` | 1.1 | Análisis territorial |
| `midi innovate` | 1.2 | Aplicar metodologías |
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

---

## 📁 Estructura de Outputs

Los documentos se organizan por fase con prefijos numéricos:

```
midi-project/
├── 00_context/                    # Fase 0
│   ├── 00_USER_CONTEXT.md
│   ├── 00_DECISION_ROUTE.md
│   └── 00_ASSUMPTIONS.md
│
├── 10_exploration/                # Fase 1
│   ├── 11_territorial_analysis.md
│   ├── 12_global_research.md
│   ├── 13_innovation_insights.md
│   ├── 14_idea_backlog.md
│   └── 15_top3_ideas.md
│
├── 20_cohesion/                   # Fase 1.5
│   └── 20_project_hypothesis.md
│
├── 30_analysis/                   # Fase 2
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
├── 40_validation/                 # Fase 3
│   └── 41_validation_report.md
│
└── 50_final/                      # Documentos finales
    └── 50_final_project_document.md
```

---

## 🤖 Agentes del Sistema

### Agentes de Contexto y Exploración

| Agente | Fase | Función |
|--------|------|---------|
| **intake-agent** | 0 | Captura contexto inicial, decide ruta de trabajo |
| **territorial-research-agent** | 1.1 | Analiza territorio: geografía, actores, oportunidades |
| **global-research-agent** | 1.1 | Investiga tendencias internacionales, casos globales |
| **innovation-methodology-agent** | 1.2 | Aplica Design Thinking, JTBD, Blue Ocean, SCAMPER, etc. |
| **niche-detector-agent** | 1.3 | Detecta nichos y oportunidades desatendidas |
| **creative-agent** | 1.3 | Genera backlog de ideas estructuradas |
| **hybridization-agent** | 1.3 | Propone fusiones entre ideas |
| **prioritizer-agent** | 1.4 | Rankea ideas con matriz multi-criterio |

### Agentes de Cohesión y Análisis

| Agente | Fase | Función |
|--------|------|---------|
| **cohesion-agent** | 1.5 | Transforma idea en hipótesis de proyecto |
| **fund-analyst-agent** | 2.1 | Extrae requisitos de fondos concursables |
| **case-research-agent** | 2.2 | Investiga casos similares, éxitos y fracasos |
| **business-model-agent** | 2.3 | Define modelo de negocio y canvas |
| **technical-agent** | 2.3 | Evalúa factibilidad técnica |
| **cost-researcher-agent** | 2.4 | Busca precios reales, crea presupuesto |
| **financial-agent** | 2.5 | Análisis financiero, proyecciones |
| **market-agent** | 2.5 | Análisis de mercado y competencia |
| **risk-agent** | 2.5 | Identifica y evalúa riesgos |
| **devil-advocate-agent** | 2.6 | Crítica destructiva obligatoria |
| **evaluator-agent** | 2.7 | Evalúa proyecto 0-100 |

### Agentes de Documentación

| Agente | Fase | Función |
|--------|------|---------|
| **validation-agent** | 3 | Checklist de validación final |
| **writer-agent** | Final | Genera documento consolidado |

---

## 📖 Ejemplo de Uso Completo

### Escenario: Proyecto para Fondo CORFO

```bash
# 1. Iniciar proyecto
$ midi init agroinnova

🚀 MIDI Framework v0.2.0
Creando proyecto: agroinnova

# 2. Responder preguntas de Fase 0
? ¿Qué deseas hacer hoy?
  → Postular a fondo concursable específico

? ¿Cuál es el nombre del fondo?
  → CORFO Innova Corrobio

? ¿Tienes el link a las bases oficiales?
  → https://www.corfo.cl/convocatoria-innova-corrobio-2024

? ¿En qué región se implementará?
  → Araucanía

? ¿Cuál es tu presupuesto máximo disponible?
  → $50.000.000

# 3. El sistema ejecuta automáticamente

📋 Fase 0: Contextualización ✓
   → 00_USER_CONTEXT.md
   → 00_DECISION_ROUTE.md

🔍 Fase 1.1: Investigación Territorial ✓
   → 11_territorial_analysis.md

💡 Fase 1.2: Metodologías de Innovación ✓
   → 13_innovation_insights.md
   → Se aplicó: Design Thinking + Árbol de Problemas + Teoría de Cambio

📝 Fase 1.3-1.4: Generación y Priorización de Ideas ✓
   → 14_idea_backlog.md (12 ideas generadas)
   → 15_top3_ideas.md

🔗 Fase 1.5: Cohesión ✓
   → 20_project_hypothesis.md
   → Idea seleccionada: "Centro de Almacenamiento Post-Cosecha Comunitario"

💰 Fase 2.1: Análisis de Fondo ✓
   → 31_fund_analysis.md
   → 32_admissibility_checklist.md
   → Alineación: 85%
   → Gastos permitidos: ✓
   → Riesgo de inadmisibilidad: Bajo

📊 Fase 2.2: Investigación de Casos ✓
   → 33_case_research.md
   → 8 casos similares encontrados
   → 5 éxitos, 3 fracasos documentados

📐 Fase 2.3: Formulación ✓
   → 34_project_formulation.md

💵 Fase 2.4: Presupuesto ✓
   → 35_budget_with_sources.md
   → Total: $49.850.000 (99.7% del máximo)
   → Todos los ítems con fuentes reales
   → 2 ítems marcados [PENDIENTE COTIZACIÓN]

📈 Fase 2.5: Análisis Financiero y Riesgos ✓
   → 36_financial_analysis.md
   → 37_risk_register.md

😈 Fase 2.6: Abogado del Diablo ✓
   → 38_devil_report.md
   → Veredicto: CONTINUAR CON AJUSTES
   → 3 debilidades identificadas

📊 Fase 2.7: Evaluación ✓
   → 39_evaluator_scorecard.md
   → Score: 78/100 (BUENO)
   → Cumple umbral mínimo (70)

✅ Fase 3: Validación Final ✓
   → 41_validation_report.md
   → 2 advertencias menores

📄 Fase Final: Documento Consolidado ✓
   → 50_final_project_document.md

🎉 ¡Proyecto completo!
   → Listo para postular a CORFO Innova Corrobio
   → Fecha cierre: 15 días restantes
```

---

## 📊 Ejemplo de Output: Presupuesto con Fuentes

```markdown
| Categoría | Ítem | Proveedor | Link | Cantidad | Valor Unit. | Subtotal |
|-----------|------|-----------|------|----------|-------------|----------|
| RRHH | Consultor especialista | Colegio Ingenieros | ingenieros.cl | 200h | $35.000 | $7.000.000 |
| Equipamiento | Sistema de frío | Mabe Industrial | mabe.cl | 1 | $15.000.000 | $15.000.000 |
| Insumos | Material didáctico | Editorial Universitaria | eun.cl | 500 | $3.500 | $1.750.000 |

**Total:** $49.850.000
**Presupuesto máximo:** $50.000.000
**% utilizado:** 99.7%
**Ítems cotizados:** 15/17
**Ítems pendientes:** 2 (requieren cotización formal)

⚠️ NOTA: Todos los precios consultados el 2026-05-05
```

---

## 📖 Ejemplo de Output: Top 3 Ideas

```markdown
# Top 3 Ideas Seleccionadas

## Idea #1: Centro de Almacenamiento Post-Cosecha Comunitario
**Score:** 4.2/5

### Problema
Pequeños agricultores pierden hasta 40% de producción por falta de almacenamiento

### Solución
Centro comunitario con sistemas de refrigeración compartidos

### Innovación
Modelo de gestión comunitaria con tecnología simple

### Alineación con CORFO
✅ Impacto regional: Alto
✅ Beneficiarios: 150 agricultores
✅ Presupuesto: Dentro del rango

### Score Detallado
- Impacto: 5/5
- Factibilidad: 4/5
- Deseabilidad: 5/5
- Alineación fondo: 4/5
- Innovación: 4/5
```

---

## ⚖️ Reglas Estrictas del Sistema

MIDI implementa **20 reglas obligatorias** que el sistema nunca viola:

1. ❌ **No inventar precios** - Siempre usar fuentes o marcar [ESTIMADO]
2. ❌ **No inventar bases de fondos** - Solo información oficial
3. ❌ **No inventar restricciones** - Solo lo extraído de documentos
4. ❌ **No inventar fuentes** - Siempre proporcionar links
5. ❌ **No presupuestos sin desglose** - Tabla con proveedor, link, cantidad, valor
6. ❌ **No ideas genéricas** - Siempre contextualizadas al territorio
7. ❌ **No asumir éxito** - Análisis obligatorio antes de aprobar
8. ❌ **No analizar sin financiamiento** - Decisión obligatoria antes de Fase 2
9. ❌ **No tratar igual** - Fondo público ≠ Inversión privada
10. ❌ **No usar presupuesto arbitrariamente** - Optimizar al 100% cuando hay máximo
11. ✅ **Optimizar presupuesto** - Usar el 100% del máximo permitido
12. ✅ **Indicar faltantes** - Si falta información, decirlo explícitamente
13. ✅ **Separar supuestos** - Distinguir claramente datos vs supuestos
14. ✅ **Justificar recomendaciones** - Siempre explicar por qué
15. ✅ **Explicar descartes** - Decir por qué se descarta una idea
16. ✅ **Ser explícito** - Si no calza con el fondo, decirlo claro
17. ✅ **Crear lo que falta** - Si falta un agente o skill, crearlo
18. ✅ **Privilegiar evidencia** - Contexto y trazabilidad primero
19. ✅ **Links en investigación** - Siempre proporcionar URLs
20. ✅ **Iterar con decisiones** - Preguntar al usuario en momentos clave

---

## 🇨🇱 Fondos Chilenos Soportados

| Fondo | Institución | Cobertura |
|-------|-------------|-----------|
| Innova Corrobio | CORFO | Nacional |
| Fondo Semilla | SERCOTEC | Nacional |
| FIA | Fundación para la Innovación Agraria | Agrícola |
| FOSIS | Fondo de Solidaridad e Inversión Social | Social |
| GOREs | Gobiernos Regionales | Regional |
| Start-Up Chile | CORFO | Tech |
| Fondo de Innovación para la Competitividad | CORFO | Regional |

---

## 🛠️ Configuración

### Archivo: `.midi/config/midi.config.json`

```json
{
  "framework": "MIDI",
  "version": "0.2.0",
  "country": "Chile",
  "region": "",
  "language": "es",
  "default_mode": "full",
  "require_sources": true,
  "human_approval_gates": true
}
```

### Archivo: `.midi/config/workflow-config.json`

```json
{
  "version": "2.0.0",
  "defaultWorkflow": "full-midi",
  "strictRules": {
    "rules": [
      "No inventar precios",
      "No inventar bases de fondos",
      "..."
    ]
  }
}
```

---

## 📚 Documentación

| Documento | Ubicación | Descripción |
|-----------|----------|-------------|
| Manual de Uso | `docs/es/MANUAL_DE_USO.md` | Guía completa del framework |
| Guía de Agentes | `docs/es/AGENTES.md` | Descripción de cada agente |
| Quick Start | `docs/es/QUICKSTART.md` | Inicio en 5 minutos |
| Calculadoras | `docs/es/CALCULADORAS.md` | Referencia de funciones financieras |
| Visualización | `docs/es/VISUALIZACION.md` | Sistema de gráficos y canvas |

---

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests específicos
npm test -- --grep "territorial"
npm test -- --grep "prioritizer"
npm test -- --grep "workflow"
```

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 👥 Autores

- **Talivanferrada** - *Desarrollo inicial* - [GitHub](https://github.com/Talivanferrada)

---

## 🙏 Agradecimientos

- Inspirado en frameworks GSD (Get Shit Done) y SDD
- Metodologías de innovación: IDEO, Clayton Christensen, W. Chan Kim
- Comunidad de desarrolladores chilenos

---

<div align="center">

**Hecho con ❤️ en Chile 🇨🇱**

[Documentación](docs/es/) | [Inicio Rápido](docs/es/QUICKSTART.md) | [Reportar Bug](https://github.com/Talivanferrada/MIDI/issues)

</div>
