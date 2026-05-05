# Manual de Uso - MIDI Framework

## Índice

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Inicio Rápido](#inicio-rápido)
4. [Comandos CLI](#comandos-cli)
5. [Workflows](#workflows)
6. [Agentes](#agentes)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Ejemplos de Uso](#ejemplos-de-uso)
9. [Solución de Problemas](#solución-de-problemas)
10. [Referencia de APIs](#referencia-de-apis)

---

## Introducción

### ¿Qué es MIDI?

**MIDI** (Modelo Inteligente de Desarrollo de Innovación) es un framework multiagente que transforma ideas iniciales en proyectos completos, analizados, validados y listos para presentar a inversionistas o postular a fondos.

### ¿Para quién es MIDI?

- **Emprendedores** que quieren validar y estructurar su idea
- **Startups** que buscan financiamiento
- **Consultores** que acompañan procesos de innovación
- **Incubadoras/Aceleradoras** que evalúan proyectos

### ¿Qué hace diferente a MIDI?

1. **Rigor metodológico**: No es solo "generar ideas", sino analizarlas críticamente
2. **Devil's Advocate obligatorio**: Todo proyecto pasa por crítica rigurosa antes de aprobarse
3. **Contexto chileno**: Diseñado para la realidad de fondos CORFO, SERCOTEC, Start-Up Chile
4. **Guardrails de seguridad**: Agentes con prohibiciones explícitas (no sugerir evasión, no inventar cifras)

---

## Instalación

### Requisitos

- Node.js 18 o superior
- npm o yarn
- OpenCode, Claude Code, o compatible

### Instalación desde npm

```bash
npm install -g midi-framework
```

### Instalación desde código fuente

```bash
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework
npm install
npm link
```

### Verificar instalación

```bash
midi doctor
```

Deberías ver:
```
✓ Node.js version: 18.x.x
✓ MIDI CLI instalado correctamente
✓ Todos los módulos disponibles
```

---

## Inicio Rápido

### Paso 1: Crear un nuevo proyecto

```bash
mkdir mi-proyecto
cd mi-proyecto
midi init
```

### Paso 2: Iniciar el workflow

```bash
midi start
```

### Paso 3: Seguir las etapas

El workflow te guiará a través de:
1. **Intake** - Captura de tu contexto y recursos
2. **Exploración** - Generación de ideas
3. **Selección** - Elegir la mejor idea
4. **Análisis** - Estudio profundo (mercado, finanzas, legal)
5. **Evaluación** - Score final y recomendaciones

### Paso 4: Obtener el documento final

Al completar el workflow, encontrarás:
- `FINAL_PROJECT_DOCUMENT.md` - Documento completo
- `pitch.md` - Pitch deck listo para presentar
- Todos los análisis individuales en carpetas

---

## Comandos CLI

### Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `midi init` | Inicializa un nuevo proyecto MIDI |
| `midi start` | Inicia workflow completo (exploración + financiable) |
| `midi explore` | Solo modo exploración (generar ideas) |
| `midi financeable` | Solo modo financiable (análisis profundo) |
| `midi run` | Ejecuta workflow con validación |
| `midi status` | Muestra estado actual del proyecto |
| `midi doctor` | Diagnóstico del sistema |
| `midi reset-workflow` | Reinicia el workflow |

### Opciones de Comandos

#### `midi init`
```bash
midi init                    # Inicialización interactiva
midi init --name "Mi Proyecto" --description "Descripción"
```

#### `midi start`
```bash
midi start                   # Workflow completo
midi start --explore         # Solo exploración
midi start --financeable     # Solo financiable
```

#### `midi run`
```bash
midi run                     # Ejecutar workflow
midi run --workflow full     # Workflow completo
midi run --workflow explore  # Solo exploración
midi run --verbose           # Salida detallada
```

#### `midi status`
```bash
midi status                  # Estado del proyecto
midi status --json           # Salida en JSON
```

---

## Workflows

### Workflow de Exploración

**Objetivo:** Generar y evaluar múltiples ideas de negocio.

**Etapas:**
1. **Intake** - Entrevista inicial
2. **Investigación Global** - Tendencias y referentes
3. **Adaptación Local** - Contexto chileno
4. **Benchmark** - Análisis competitivo
5. **Insights** - Oportunidades identificadas
6. **Ideación** - Generación de 10-15 ideas
7. **Hibridación** - Combinar ideas
8. **Top 3** - Selección de mejores ideas

**Comando:**
```bash
midi explore
```

### Workflow Financiable

**Objetivo:** Analizar profundamente una idea seleccionada.

**Etapas:**
1. **Análisis de Mercado** - TAM/SAM/SOM, segmentos
2. **Modelo de Negocio** - BMC y Lean Canvas
3. **Factibilidad Técnica** - Stack, MVP, timeline
4. **Análisis Financiero** - Inversión, costos, proyecciones
5. **Análisis Legal/Tributario** - Entidad, permisos, impuestos
6. **Registro de Riesgos** - Identificación y mitigación
7. **Devil's Advocate** - Crítica rigurosa (OBLIGATORIO)
8. **Validación** - Plan de MVP y experimentos
9. **Estrategia de Financiamiento** - Fondos y pitch
10. **Evaluación Final** - Score 0-100
11. **Documento Final** - Consolidación

**Comando:**
```bash
midi financeable
```

### Workflow Completo

Combina exploración + financiable en un flujo continuo.

**Comando:**
```bash
midi start
```

---

## Agentes

### Agentes de Exploración

| Agente | Rol | Output |
|--------|-----|--------|
| `midi-intake-agent` | Entrevista inicial | `USER_CONTEXT.md` |
| `midi-global-research-agent` | Investigación global | `global_research.md` |
| `midi-local-adaptation-agent` | Contexto local Chile | `local_adaptation.md` |
| `midi-benchmark-agent` | Análisis competitivo | `benchmark.md` |
| `midi-insight-agent` | Síntesis de oportunidades | `insights.md` |
| `midi-creative-agent` | Generación de ideas | `IDEA_BACKLOG.md` |
| `midi-hybridization-agent` | Fusión de ideas | Ideas híbridas |

### Agentes de Análisis

| Agente | Rol | Output |
|--------|-----|--------|
| `midi-market-agent` | Análisis de mercado | `market_analysis.md` |
| `midi-business-model-agent` | BMC y Lean Canvas | `bmc.md`, `lean_canvas.md` |
| `midi-technical-agent` | Factibilidad técnica | `technical_analysis.md` |
| `midi-financial-agent` | Proyecciones financieras | `financial_analysis.md` |
| `midi-legal-tax-agent` | Aspectos legales | `legal_tax_analysis.md` |
| `midi-risk-agent` | Gestión de riesgos | `RISK_REGISTER.md` |

### Agentes de Evaluación

| Agente | Rol | Output |
|--------|-----|--------|
| `midi-devil-advocate-agent` | Crítica rigurosa | `devil_report.md` |
| `midi-evaluator-agent` | Score final | `evaluator_scorecard.md` |
| `midi-validation-agent` | Plan de validación | `validation_plan.md` |

### Agentes de Financiamiento

| Agente | Rol | Output |
|--------|-----|--------|
| `midi-funding-match-agent` | Oportunidades de fondos | `funding_strategy.md` |
| `midi-application-optimizer-agent` | Mejora de narrativa | `pitch.md` |

### Agente Final

| Agente | Rol | Output |
|--------|-----|--------|
| `midi-writer-agent` | Documento consolidado | `FINAL_PROJECT_DOCUMENT.md` |

---

## Estructura del Proyecto

### Directorios Generados

```
mi-proyecto/
├── .midi/
│   ├── agents/              # 20 agentes especializados
│   ├── skills/              # 11 habilidades
│   ├── commands/            # 8 comandos
│   ├── workflows/           # 3 workflows
│   ├── templates/           # 12 templates
│   ├── config/
│   │   ├── midi.config.json
│   │   ├── agent-routing.json
│   │   └── scoring-rubric.json
│   └── docs/
├── 01_research/
│   ├── global_research.md
│   ├── local_adaptation.md
│   └── benchmark.md
├── 02_insights/
│   └── insights.md
├── 03_ideation/
│   ├── IDEA_BACKLOG.md
│   └── TOP3_IDEAS.md
├── 04_analysis/
│   ├── market_analysis.md
│   ├── bmc.md
│   ├── lean_canvas.md
│   ├── technical_analysis.md
│   └── financial_analysis.md
├── 05_financial/
│   └── financial_analysis.md
├── 06_devil_advocate/
│   └── devil_report.md
├── 07_evaluation/
│   └── evaluator_scorecard.md
├── USER_CONTEXT.md
├── PROJECT_STATE.md
├── RISK_REGISTER.md
├── ASSUMPTIONS.md
├── DECISION_LOG.md
└── FINAL_PROJECT_DOCUMENT.md
```

### Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `USER_CONTEXT.md` | Información capturada del usuario |
| `PROJECT_STATE.md` | Estado actual del proyecto |
| `RISK_REGISTER.md` | Registro de riesgos identificados |
| `ASSUMPTIONS.md` | Todos los supuestos documentados |
| `DECISION_LOG.md` | Historial de decisiones |
| `FINAL_PROJECT_DOCUMENT.md` | Documento final consolidado |

---

## Ejemplos de Uso

### Ejemplo 1: Idea Vaga

**Usuario:** "Quiero emprender con algo de bienestar"

```bash
midi init --name "Proyecto Bienestar"
midi start
```

**Resultado:**
- Intake profundo para entender motivaciones
- 15 ideas generadas en diferentes áreas de bienestar
- Análisis completo de las 3 mejores
- Score final y recomendaciones

### Ejemplo 2: Postulación a Fondo

**Usuario:** "Quiero postular a CORFO"

```bash
midi init --name "Mi Startup" --funding-focus
midi financeable
```

**Resultado:**
- Análisis financiero con supuestos marcados
- Estrategia de financiamiento específica para CORFO
- Pitch optimizado para postulación
- Score de postulabilidad

### Ejemplo 3: Validación de Idea Existente

**Usuario:** "Tengo una idea definida, quiero validarla"

```bash
midi init
midi financeable --skip-exploration
```

**Resultado:**
- Análisis completo de la idea
- Devil's Advocate riguroso
- Plan de validación con MVP
- Score de viabilidad

---

## Solución de Problemas

### Error: "Command not found: midi"

**Solución:**
```bash
npm link
# o
npm install -g midi-framework
```

### Error: "Node version mismatch"

**Solución:**
```bash
nvm install 18
nvm use 18
```

### Error: "Project already initialized"

**Solución:**
```bash
rm -rf .midi
midi init
```

### El workflow se detiene

**Verificar:**
```bash
midi status
midi doctor
```

### Quiero reiniciar el workflow

```bash
midi reset-workflow
```

---

## Referencia de APIs

### Módulo de Visualización

```javascript
import { Visualizer } from 'midi-framework';

const visualizer = new Visualizer(outputPath);

// Generar todas las visualizaciones
const visualizations = await visualizer.generateAll({
  bmc: bmcData,
  leanCanvas: leanData,
  financials: financialData,
  risks: riskData,
  evaluation: evaluationData
});
```

### Módulo de Calculadoras Financieras

```javascript
import { FinancialCalculators as Finance } from 'midi-framework';

// Calcular punto de equilibrio
const breakEven = Finance.calculateBreakEven(10000, 100, 20);
// { units: 125, revenue: 12500 }

// Calcular flujo de caja
const cashFlow = Finance.calculateCashFlow({
  initialInvestment: 50000,
  monthlyRevenue: [10000, 15000, 20000],
  monthlyFixedCosts: 8000,
  months: 12
});

// Calcular CAC y LTV
const cac = Finance.calculateCAC({
  marketingSpend: 10000,
  newCustomersAcquired: 100
});
const ltv = Finance.calculateLTV({
  averageRevenuePerCustomer: 100,
  grossMargin: 80,
  churnRate: 5
});
```

### Módulo de Scoring

```javascript
import { scoreIdea, rankIdeas } from 'midi-framework';

// Evaluar una idea
const score = scoreIdea(idea, userContext);
// { total: 7.5, recommendation: "Recomendada con mejoras menores" }

// Rankear múltiples ideas
const ranking = rankIdeas(ideas, userContext);
// { ranked: [...], top3: [...], distribution: {...} }
```

### Módulo de Canvas Builder

```javascript
import { buildBMC, validateBMC } from 'midi-framework';

// Construir BMC
const bmc = buildBMC(projectData);

// Validar BMC
const validation = validateBMC(bmc);
// { isValid: true, errors: [], completeness: 100 }
```

---

## Soporte

### Documentación Adicional

- [Guía de Agentes](./AGENTES.md)
- [Referencia de Workflows](./WORKFLOWS.md)
- [Calculadoras Financieras](./CALCULADORAS.md)
- [Sistema de Visualización](./VISUALIZACION.md)

### Contribuir

```bash
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI
npm install
npm test
```

### Licencia

MIT License - Ver [LICENSE](../../LICENSE)

---

*Documentación generada para MIDI Framework v0.1.0*
*Última actualización: 2026-05-02*
