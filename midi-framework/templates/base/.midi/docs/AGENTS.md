# Referencia de Agentes MIDI

## Visión General

MIDI utiliza 20 agentes especializados que trabajan en coordinación para transformar ideas en proyectos financiables.

---

## Agentes de Orquestación

### midi-orchestrator
**Rol:** Coordina todo el flujo MIDI.

**Cuándo activa:** Al iniciar cualquier workflow MIDI.

**Responsabilidades:**
- Leer configuración y estado
- Decidir siguiente etapa
- Activar otros agentes
- Exigir gates humanos
- Bloquear final si faltan análisis

---

## Agentes de Exploración

### midi-intake-agent
**Rol:** Entrevista inicial del usuario.

**Captura:**
- Idea inicial
- Objetivos
- País/región
- Recursos y presupuesto
- Habilidades
- Restricciones
- Público objetivo
- Nivel de riesgo aceptado
- Búsqueda de fondos

**Escribe:** `USER_CONTEXT.md`

---

### midi-global-research-agent
**Rol:** Investigar referentes globales.

**Busca:**
- Startups similares
- Tendencias
- Casos exitosos/fallidos
- Modelos de negocio
- Tecnologías relevantes

**Escribe:** `01_research/global_research.md`

---

### midi-local-adaptation-agent
**Rol:** Adaptar al territorio local (Chile).

**Considera:**
- Región y comuna
- Permisos requeridos
- Cultura local
- Mercado regional
- Fondos disponibles
- Clima y geografía

**Escribe:** `01_research/local_adaptation.md`

---

### midi-benchmark-agent
**Rol:** Analizar competencia y sustitutos.

**Produce:**
- Competidores directos
- Competidores indirectos
- Precios de mercado
- Canales de distribución
- Propuestas de valor existentes

**Escribe:** `01_research/benchmark.md`

---

### midi-insight-agent
**Rol:** Transformar investigación en oportunidades.

**Identifica:**
- Dolores no resueltos
- Necesidades insatisfechas
- Patrones emergentes
- Oportunidades de innovación

**Escribe:** `02_insights/insights.md`

---

### midi-creative-agent
**Rol:** Generar ideas creativas.

**Usa:**
- Design Thinking
- Jobs To Be Done
- Blue Ocean
- Ten Types of Innovation

**Produce:** 10-15 ideas

**Escribe:** `IDEA_BACKLOG.md`

---

### midi-hybridization-agent
**Rol:** Fusionar y combinar ideas.

**Combina:**
- Innovadora + rentable
- Global + local
- Postulable + comercial
- Simple + escalable

**Actualiza:** `IDEA_BACKLOG.md`

---

## Agentes de Análisis

### midi-market-agent
**Rol:** Análisis de mercado.

**Analiza:**
- Segmentos de clientes
- Tamaño de mercado
- Demanda
- Pricing
- Barreras de entrada

**Escribe:** `05_analysis/market_analysis.md`

---

### midi-business-model-agent
**Rol:** Modelo de negocio.

**Genera:**
- Business Model Canvas
- Lean Canvas
- Propuesta de valor
- Modelo de ingresos
- Estructura de costos

**Escribe:** 
- `08_canvas/business_model_canvas.md`
- `08_canvas/lean_canvas.md`

---

### midi-technical-agent
**Rol:** Factibilidad técnica.

**Analiza:**
- Stack tecnológico
- Infraestructura
- Complejidad
- Tiempos de desarrollo
- Dependencias

**Escribe:** `09_technical_financial_legal/technical_analysis.md`

---

### midi-financial-agent
**Rol:** Análisis financiero.

**Proyecta:**
- Inversión inicial
- Costos fijos/variables
- Ingresos
- Punto de equilibrio
- Escenarios

**IMPORTANTE:** No inventa cifras. Marca supuestos.

**Escribe:** `09_technical_financial_legal/financial_analysis.md`

---

### midi-legal-tax-agent
**Rol:** Análisis legal y tributario.

**Analiza:**
- Tipo de empresa recomendado
- Permisos requeridos
- Régimen tributario
- Obligaciones laborales

**NUNCA sugiere:** Evasión, fraude, simulación.

**Escribe:** `09_technical_financial_legal/legal_tax_analysis.md`

---

## Agentes de Validación

### midi-devil-advocate-agent ⚠️ OBLIGATORIO
**Rol:** Destruir la idea antes de declararla viable.

**Busca fallas en:**
- Problema real
- Solución propuesta
- Tamaño de mercado
- Diferenciación
- Factibilidad
- Rentabilidad
- Riesgos legales

**Es duro y directo. No usa lenguaje suave.**

**Escribe:** `06_devil_advocate/devil_report.md`

---

### midi-validation-agent
**Rol:** Validación Lean.

**Propone:**
- Hipótesis críticas
- MVP mínimo
- Experimentos
- Métricas de éxito

**Escribe:** `10_validation/validation_plan.md`

---

### midi-risk-agent
**Rol:** Consolidar riesgos.

**Actualiza:** `RISK_REGISTER.md`

---

## Agentes de Financiamiento

### midi-funding-match-agent
**Rol:** Estrategia de financiamiento.

**Identifica:**
- Fondos públicos
- Incubadoras/aceleradoras
- Inversionistas ángel
- Fondos regionales

**Diferencia:** Confirmado vs. Sugerido vs. Pendiente

**Escribe:** `11_funding/funding_strategy.md`

---

### midi-evaluator-agent
**Rol:** Simular jurado o inversionista.

**Evalúa (0-100):**
- Innovación (15%)
- Mercado (15%)
- Escalabilidad (10%)
- Factibilidad (15%)
- Finanzas (15%)
- Legal (10%)
- Narrativa (10%)
- Postulabilidad (10%)

**Puntaje mínimo:** 70 para aprobar

**Escribe:** `12_evaluation/evaluator_scorecard.md`

---

### midi-application-optimizer-agent
**Rol:** Mejorar narrativa y postulación.

**Fortalece:**
- Problema y solución
- Impacto
- Innovación
- Presupuesto
- Indicadores
- Pitch

---

## Agentes de Cierre

### midi-writer-agent
**Rol:** Redactar documento maestro final.

**Consolida:**
- Todos los análisis
- Evitando contradicciones
- Con coherencia narrativa

**Escribe:** `FINAL_PROJECT_DOCUMENT.md`

---

## Reglas de Activación

| Condición | Agentes Obligatorios |
|-----------|---------------------|
| Proyecto financiable | devil-advocate, evaluator |
| funding_focus=true | funding-match, application-optimizer |
| Riesgo legal medio/alto | legal-tax, risk |

---

## Flujo Típico

```
orchestrator
    ↓
intake-agent
    ↓
global-research + local-adaptation + benchmark (paralelo)
    ↓
insight-agent
    ↓
creative-agent
    ↓
hybridization-agent
    ↓
[Gate: Top 3]
    ↓
market + business-model + technical + financial + legal (paralelo)
    ↓
devil-advocate ⚠️
    ↓
[Gate: Continuar/Iterar]
    ↓
validation + funding-match
    ↓
evaluator
    ↓
[Gate: Puntaje ≥ 70]
    ↓
application-optimizer
    ↓
writer-agent
```
