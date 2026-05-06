# Guía de Agentes MIDI

## Índice

1. [Introducción a los Agentes](#introducción-a-los-agentes)
2. [Orquestador](#orquestador)
3. [Agentes de Exploración](#agentes-de-exploración)
4. [Agentes de Análisis](#agentes-de-análisis)
5. [Agentes de Evaluación](#agentes-de-evaluación)
6. [Agentes de Financiamiento](#agentes-de-financiamiento)
7. [Agente de Documentación](#agente-de-documentación)

---

## Introducción a los Agentes

### ¿Qué es un Agente MIDI?

Un agente es un especialista automatizado que realiza una función específica en el proceso de desarrollo de innovación. Cada agente tiene:

- **Rol:** Su función principal
- **Propósito:** Por qué existe
- **Cuándo activarse:** Triggers de ejecución
- **Inputs:** Qué lee
- **Outputs:** Qué genera
- **Guardrails:** Qué NO debe hacer

### Principios de los Agentes

1. **Especialización:** Cada agente hace UNA cosa muy bien
2. **Trazabilidad:** Todo queda documentado
3. **Guardrails:** Límites claros de comportamiento
4. **Validación:** Outputs con criterios de calidad

---

## Orquestador

### midi-orchestrator

**Rol:** Director de orquesta. Coordina todos los agentes y decide qué ejecutar en cada momento.

**Decisiones que toma:**
- Qué agente activar según el estado del proyecto
- Si bloquear o permitir continuar
- Cuándo pedir aprobación humana (gates)

**Flujo de Decisiones:**

```
INICIO
  ↓
¿USER_CONTEXT.md existe?
  NO → activar intake-agent
  SÍ → continuar
  ↓
¿Modo exploración?
  SÍ → ejecutar flujo exploración
  NO → ejecutar flujo financiable
  ↓
¿Devil advocate ejecutado?
  NO → BLOQUEAR hasta ejecutar
  SÍ → permitir evaluación
  ↓
¿Score >= 70?
  NO → recomendar iteración
  SÍ → generar documento final
```

**Reglas de Bloqueo:**

| Condición | Acción |
|-----------|--------|
| Devil advocate no ejecutado | BLOQUEAR documento final |
| Evaluación < 70 | Advertir, pedir decisión |
| Análisis legal faltante | BLOQUEAR si sector regulado |

---

## Agentes de Exploración

### midi-intake-agent

**Rol:** Entrevistador inicial. Captura toda la información relevante del usuario.

**Preguntas obligatorias (26):**
- Idea inicial y etapa
- País, región, ciudad
- Público objetivo
- Presupuesto y tiempo disponible
- Habilidades del usuario/equipo
- Restricciones y motivaciones
- Nivel de riesgo aceptado
- Interés en financiamiento

**Preguntas dinámicas por sector:**
- Salud → certificaciones, profesionales en equipo
- Educación → MINEDUC, currículum
- Alimentos → SEREMI, manipuladores
- Turismo → SERNATUR
- Finanzas → CMF, Ley Fintech

**Output:** `USER_CONTEXT.md`

**Validación:**
- Campos mandatorios completos
- Sin contradicciones
- Nivel de riesgo definido

---

### midi-global-research-agent

**Rol:** Investigador internacional. Busca referentes globales, tendencias y casos de éxito/fracaso.

**Temas de investigación:**
1. Startups similares a nivel mundial
2. Proyectos con modelo comparable
3. Tendencias del sector
4. Tecnologías relevantes
5. Modelos de negocio exitosos
6. Casos de éxito y fracaso
7. Referentes internacionales

**Protocolo sin web:**
- Marcar información como `[PENDIENTE VERIFICACIÓN]`
- Generar preguntas de investigación
- Crear plan de búsqueda para cuando haya conexión

**Output:** `global_research.md`

---

### midi-local-adaptation-agent

**Rol:** Adaptador local. Aterriza oportunidades globales en el contexto chileno.

**Información regional (16 regiones):**
- Población y economía principal
- Permisos municipales y sectoriales
- Cultura local y patrones de consumo
- Clima y geografía
- Proveedores disponibles
- Fondos regionales

**Permisos por sector:**

| Sector | Permiso Principal | Institución |
|--------|-------------------|-------------|
| Alimentos | Resolución sanitaria | SEREMI Salud |
| Salud | Autorización | SEREMI Salud |
| Educación | Reconocimiento oficial | MINEDUC |
| Turismo | Inscripción | SERNATUR |
| Construcción | Permiso edificación | DOM |

**Output:** `local_adaptation.md`

---

### midi-benchmark-agent

**Rol:** Analista competitivo. Identifica competencia directa, indirecta y sustitutos.

**Tipos de competencia:**

1. **Directa:** Mismo producto, mismo cliente
2. **Indirecta:** Diferente producto, mismo problema
3. **Sustitutos:** Alternativas de otras industrias

**Análisis de precios:**
- Modelos de pricing detectados
- Precio mínimo/máximo viable
- Sensibilidad por segmento

**Output:** `benchmark.md`

---

### midi-insight-agent

**Rol:** Sintetizador de oportunidades. Convierte investigación en insights accionables.

**5 tipos de insights:**

1. **Dolores no resueltos:** Problemas sin solución adecuada
2. **Necesidades insatisfechas:** Funcionales, emocionales, sociales
3. **Patrones emergentes:** Tendencias ganando momentum
4. **Oportunidades de innovación:** Áreas donde innovar crearía valor
5. **Hipótesis de valor:** Enunciados testeables sobre lo que el cliente pagaría

**Output:** `insights.md`

---

### midi-creative-agent

**Rol:** Generador de ideas. Produce 10-15 ideas usando metodologías de innovación.

**5 Frameworks de creatividad:**

| Framework | Enfoque | Output Esperado |
|-----------|---------|-----------------|
| Design Thinking | Empatizar → Definir → Idear | 3-5 ideas centradas en usuario |
| Jobs To Be Done | Trabajos funcionales/emocionales | 2-4 ideas basadas en necesidades |
| Blue Ocean | Eliminar/Reducir/Elevar/Crear | 2-3 ideas de nuevo mercado |
| Ten Types | 10 tipos de innovación | 3-5 ideas multi-dimensión |
| SCAMPER | Sustituir/Combinar/Adaptar/... | 2-3 ideas transformadas |

**Scoring preliminar (1-10):**
- Claridad del problema (15%)
- Factibilidad técnica (20%)
- Alineación con recursos (20%)
- Potencial de mercado (15%)
- Diferenciación (15%)
- Postulabilidad (15%)

**Output:** `IDEA_BACKLOG.md`

---

### midi-hybridization-agent

**Rol:** Combinador de ideas. Fusiona ideas complementarias.

**6 reglas de fusión:**

| Regla | Combina | Resultado |
|-------|---------|-----------|
| Innovadora + Rentable | Idea innovadora + Modelo probado | Innovación con revenue validado |
| Global + Local | Concepto global + Adaptación local | Modelo validado adaptado |
| Postulable + Comercial | Elegible para fondos + Comercialmente viable | Fondos + sustentabilidad |
| Simple + Escalable | MVP simple + Escalabilidad | Entrada fácil, crecimiento posible |
| Alta Tech + Bajo Costo | Tecnología avanzada + Costo accesible | Tech apropiada |
| Servicio + Producto | Relación cercana + Escalabilidad | Servicio productizado |

**Output:** Ideas híbridas en `IDEA_BACKLOG.md`

---

## Agentes de Análisis

### midi-market-agent

**Rol:** Analista de mercado. Dimensiona TAM/SAM/SOM y perfiles de cliente.

**Tamaño de mercado:**

```
TAM (Total Addressable Market)
  ↓ Filtro geográfico/modelo
SAM (Serviceable Available Market)
  ↓ Restricciones de capacidad
SOM (Serviceable Obtainable Market)
```

**Segmentación:**
- Demographics (edad, género, NSE)
- Psychographics (valores, estilo de vida)
- Behaviors (hábitos de compra)
- Jobs To Be Done

**Output:** `market_analysis.md`

---

### midi-business-model-agent

**Rol:** Arquitecto de modelo de negocio. Crea BMC y Lean Canvas.

**Business Model Canvas (9 bloques):**

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Key Partners  │ Key Activities│Value Props   │Relationships │
│              │ Key Resources │              │ Channels     │
├──────────────┴──────────────┴──────────────┴──────────────┤
│ Cost Structure              │ Revenue Streams             │
└─────────────────────────────┴─────────────────────────────┘
```

**Lean Canvas (startup adaptation):**
- Problema → Solución → UVP
- Segmento → Canal → Ingresos
- Métricas clave → Costos

**Output:** `bmc.md`, `lean_canvas.md`

---

### midi-technical-agent

**Rol:** Arquitecto técnico. Evalúa factibilidad de implementación.

**Análisis incluye:**
- Stack tecnológico recomendado
- Infraestructura necesaria
- Definición de MVP (features priorizadas)
- Complejidad técnica (Bajo/Medio/Alto)
- Timeline de desarrollo
- Dependencias críticas
- Make vs Buy decisions

**Criterio de MVP:**
```
Must have    → Incluir en MVP
Should have  → Incluir si hay tiempo
Nice to have → Post-launch
```

**Output:** `technical_analysis.md`

---

### midi-financial-agent

**Rol:** Analista financiero. Proyecta inversión, costos, ingresos y flujos.

**⚠️ GUARDRAILS CRÍTICOS:**

| NUNCA | SIEMPRE |
|-------|---------|
| Inventar cifras sin marcar | Marcar TODO como `[SUPUESTO]` |
| Ocultar margen de error | Indicar nivel de confianza |
| Proyectar sin escenarios | Incluir 3 escenarios |
| Mostrar solo caso optimista | Advertir sobre incertidumbre |

**7 Secciones:**
1. Inversión inicial
2. Estructura de costos
3. Proyección de ingresos
4. Punto de equilibrio
5. Flujo de caja
6. Escenarios (pesimista/realista/optimista)
7. Análisis de sensibilidad

**Reality Check:**
- CAC vs benchmark de industria
- Crecimiento vs benchmark startups
- Churn vs empresas similares

**Output:** `financial_analysis.md`

---

### midi-legal-tax-agent

**Rol:** Asesor legal y tributario. Estructura legal y obligaciones.

**⚠️ PROHIBICIONES ABSOLUTAS:**

| ❌ NUNCA sugerir |
|-------------------|
| Evasión tributaria |
| Facturación falsa |
| Ocultamiento de ingresos |
| Empresas de papel |
| Estructuras sin sustancia económica |

**Análisis incluye:**
- Tipo de entidad recomendada (EIRL, Ltda, SpA, SA)
- Giro comercial
- Permisos municipales y sectoriales
- Contratos necesarios
- Propiedad intelectual
- Régimen tributario
- Gastos aceptados
- Obligaciones laborales

**Zonas grises:**
Si una estructura está en zona gris:
1. Advertir explícitamente
2. Recomendar consultar contador
3. Documentar el riesgo

**Output:** `legal_tax_analysis.md`

---

### midi-risk-agent

**Rol:** Gestor de riesgos. Consolida y categoriza todos los riesgos del proyecto.

**6 Categorías:**
1. Mercado
2. Técnico
3. Financiero
4. Legal
5. Operacional
6. Externo

**Matriz de severidad:**

```
             IMPACTO
           Bajo  Medio  Alto
     Alta │ Medio│ Alto │ Alto │
PROB Media │ Bajo │ Medio│ Alto │
     Baja │ Bajo │ Bajo │ Medio│
```

**Formato de riesgo:**
```
RIESGO-001: [Nombre]
- Categoría: [Tipo]
- Probabilidad: [Baja/Media/Alta]
- Impacto: [Bajo/Medio/Alto]
- Severidad: [Bajo/Medio/Alto]
- Mitigación: [Plan]
- Estado: [Activo/Mitigando/Cerrado]
```

**Output:** `RISK_REGISTER.md`

---

## Agentes de Evaluación

### midi-devil-advocate-agent

**⚠️ OBLIGATORIO - NO PUEDE OMITIRSE**

**Rol:** Crítico riguroso. Busca activamente destruir la idea.

**Regla de lenguaje duro:**

| ❌ NO usar | ✅ USAR |
|-----------|---------|
| "Podría mejorar..." | "Esta idea PODRÍA FRACASAR porque..." |
| "Sería ideal..." | "El supuesto más DÉBIL es..." |
| "Tal vez existe riesgo..." | "El riesgo es ALTO y no está mitigado" |

**12 Dimensiones de crítica:**

1. **Problema Real:** ¿Existe o es suposición?
2. **Solución:** ¿Resuelve realmente el problema?
3. **Mercado:** ¿Tamaño sobreestimado?
4. **Competencia:** ¿Pueden copiarte fácilmente?
5. **Innovación:** ¿Realmente innovador?
6. **Factibilidad:** ¿Ejecutable con recursos actuales?
7. **Finanzas:** ¿Proyecciones realistas?
8. **Legal:** ¿Riesgos legales?
9. **Equipo:** ¿Depende de una persona?
10. **Timing:** ¿Mercado listo?
11. **Narrativa:** ¿Pitch convincente?
12. **Postulabilidad:** ¿Requisitos cumplidos?

**5 Veredictos posibles:**

| Veredicto | Cuándo |
|-----------|--------|
| ✅ CONTINUAR | Riesgos manejables |
| ⚠️ ITERAR | Debilidades recuperables |
| 🔗 FUSIONAR | Fortalezas complementan otra idea |
| ⏸️ PAUSAR | Bloqueadores externos |
| ❌ DESCARTAR | Riesgos críticos insuperables |

**Output:** `06_devil_advocate/devil_report.md`

---

### midi-evaluator-agent

**Rol:** Evaluador objetivo. Simula jurado de fondo/inversionista.

**Sistema de scoring (0-100):**

| Dimensión | Peso |
|-----------|------|
| Problema | 8% |
| Solución | 8% |
| Innovación | 10% |
| Mercado | 10% |
| Modelo de Negocio | 10% |
| Factibilidad Técnica | 8% |
| Factibilidad Financiera | 12% |
| Legal/Tributario | 8% |
| Impacto | 6% |
| Escalabilidad | 6% |
| Equipo/Encaje | 5% |
| Narrativa | 5% |
| Postulabilidad | 4% |

**Modificador de riesgo:**
- 3+ riesgos altos → -10 puntos
- 1-2 riesgos altos → -5 puntos

**Clasificaciones:**

| Score | Clasificación | Acción |
|-------|---------------|--------|
| ≥85 | EXCELENTE | Listo para postular/ejecutar |
| 70-84 | BUENO | Proceder con ajustes menores |
| 55-69 | REGULAR | Requiere mejoras significativas |
| 40-54 | DÉBIL | Revisar fundamentos |
| <40 | NO VIABLE | Reformular o descartar |

**⚠️ BLOQUEO:** Si `RISK_REGISTER.md` no existe, NO puede evaluar.

**Output:** `evaluator_scorecard.md`

---

### midi-validation-agent

**Rol:** Diseñador de validación. Crea plan Lean Startup para testear hipótesis.

**5 Métodos de validación:**

| Método | Cuándo usar | Tiempo | Costo |
|--------|-------------|--------|-------|
| MVP funcional | Validar solución | 4-8 sem | Medio |
| Entrevistas | Validar problema | 1-2 sem | Bajo |
| Landing page | Validar interés | 1 sem | Muy bajo |
| Pre-venta | Validar pago | 2-4 sem | Bajo |
| Piloto | Validar uso real | 4-8 sem | Medio |

**Estructura de hipótesis:**
```
"Los [segmento] valorarían [propuesta] porque [razón] 
y pagarían [monto] porque [justificación]."
```

**Métricas clave:**
- Conversión de interés → registro
- Conversión de registro → pago
- Retención a 30 días
- NPS promedio

**Output:** `validation_plan.md`

---

## Agentes de Financiamiento

### midi-funding-match-agent

**Rol:** Matchmaker de fondos. Identifica oportunidades de financiamiento.

**Fondos chilenos:**

| Fondo | Monto | Foco | Requisito |
|-------|-------|------|-----------|
| CORFO Semilla | $5-40M CLP | Emprendimiento temprano | Persona jurídica |
| Start-Up Chile | $10-75M CLP | Startups tech globales | +2 años vida, inglés |
| Capital Abeja | $3-5M CLP | Pequeños negocios | Microempresarios |
| FIA | Variable | Innovación agrícola | Proyecto agro |
| FOSIS | $1-3M CLP | Emprendimiento social | Vulnerabilidad |

**Clasificación de estado:**
- `[Confirmado]` - Fondos con convocatoria abierta
- `[Sugerido]` - Fondos que aplican pero fecha incierta
- `[Pendiente]` - Requiere más investigación

**Output:** `funding_strategy.md`

---

### midi-application-optimizer-agent

**Rol:** Optimizador de narrativa. Mejora pitch y aplicaciones.

**Estructura de narrativa:**

1. **Problema** → Dolor → Evidencia → Cierre emocional
2. **Solución** → Qué hace → Cómo funciona → Por qué es único → La prueba
3. **Impacto** → Métricas económicas, sociales, ambientales
4. **Innovación** → Por qué es innovador → Qué cambia → Barreras de entrada
5. **Escalabilidad** → Modelo de escalamiento → Expansión geográfica

**Elementos de aplicación:**
- Presupuesto justificado con contraparte
- Indicadores SMART
- Timeline con hitos
- Equipo presentado

**Output:** `pitch.md`

---

## Agente de Documentación

### midi-writer-agent

**Rol:** Redactor final. Consolida todo en documento maestro.

**40 Secciones del documento final:**

1. Portada
2. Resumen Ejecutivo
3. Idea Inicial y Evolución
4. Contexto del Usuario
5-8. Investigación (Global, Local, Benchmark, Tendencias)
9-12. Ideas (Oportunidades, Generadas, Top 3, Ganadora)
13-23. Análisis (Problema, Solución, Propuesta, Innovación, Mercado, Competencia, Modelo, BMC, Técnico, Financiero, Legal)
24. Riesgos y Mitigaciones
25-27. Planificación (MVP, Validación, Roadmap)
28-29. Estrategia (Comercial, Financiamiento)
30. Evaluación
31-35. Mejoras y Próximos Pasos
36-40. Anexos y Referencias

**Validación antes de generar:**
- [ ] Todos los archivos fuente existen
- [ ] No hay contradicciones
- [ ] Supuestos marcados
- [ ] Fuentes citadas
- [ ] Sin texto placeholder

**Output:** `FINAL_PROJECT_DOCUMENT.md`

---

## Uso Programático

### Ejecutar agente específico

```javascript
import { WorkflowExecutor } from 'midi-framework';

const executor = new WorkflowExecutor(projectPath);

// Ejecutar intake
await executor.runStage('intake');

// Ejecutar devil advocate
await executor.runStage('devil_advocate');
```

### Verificar prerrequisitos

```javascript
const validator = new StageValidator();

const canRun = await validator.canRunStage('financial_analysis');
// { canRun: true, missing: [] }
```

---

*Guía generada para MIDI Framework v0.1.0*

---

## 🆕 Nuevos Agentes v0.2.0

### midi-territorial-research-agent

**Fase:** 1.1 - Investigación Territorial

**Rol:** Analiza el territorio geográfico donde se implementará el proyecto.

**Análisis que realiza:**
- **Geográfico físico:** Ubicación, clima, estacionalidad, accesibilidad, riesgos naturales
- **Socioeconómico:** Población, demografía, actividades económicas, brechas locales
- **Mapa de actores:** Actores públicos (municipalidades, servicios públicos, CORFO, SERCOTEC), privados (empresas, gremios, cámaras), comunitarios (juntas de vecinos, organizaciones)
- **Competencia:** Proyectos similares en el territorio, emprendimientos, proyectos fallidos
- **Marco regulatorio:** Normativas municipales, permisos requeridos, plan regulador
- **Oportunidades y desafíos:** Ventajas competitivas, recursos subutilizados, limitaciones

**Output:** `11_territorial_analysis.md` (mínimo 150 líneas)

**Guardrails:**
- ✅ Basar análisis en datos públicos verificables
- ✅ Citar fuentes cuando sea posible
- ❌ No inventar datos demográficos o económicos
- ❌ No asumir que territorio es igual a otros

---

### midi-innovation-methodology-agent

**Fase:** 1.2 - Metodologías de Innovación

**Rol:** Aplica metodologías de innovación estructuradas para generar insights.

**Metodologías implementadas (10):**

1. **Design Thinking**
   - Empatizar: Mapa de empatía, puntos de dolor, ganancias
   - Definir: POV (Point of View), preguntas "How Might We"
   - Idear: Brainstorming, Worst Possible Idea, analogías
   - Prototipar: Concepto de MVP

2. **Jobs To Be Done (JTBD)**
   - Job Stories: Cuando... Quiero... Para poder...
   - Competidores a despedir
   - Oportunidades JTBD

3. **Blue Ocean Strategy**
   - Canvas de estrategia
   - Acciones: Eliminar, Reducir, Aumentar, Crear
   - Espacio de mercado nuevo

4. **SCAMPER**
   - Sustituir, Combinar, Adaptar, Modificar, Otro uso, Eliminar, Reorganizar

5. **Análisis PESTEL**
   - Político, Económico, Social, Tecnológico, Ecológico, Legal

6. **Análisis FODA**
   - Fortalezas, Oportunidades, Debilidades, Amenazas
   - Estrategias FO, FA, DO, DA

7. **Árbol de Problemas**
   - Problema central
   - Causas directas e indirectas
   - Efectos directos e indirectos

8. **Árbol de Objetivos**
   - Objetivo central (propósito)
   - Objetivos específicos (medios)
   - Actividades

9. **Teoría de Cambio**
   - Impacto a largo plazo
   - Outcomes (resultados intermedios)
   - Outputs (entregables)
   - Actividades
   - Insumos/recursos
   - Supuestos críticos

10. **Lean Startup**
    - Hipótesis de valor y crecimiento
    - MVP (Minimum Viable Product)
    - Métricas AARRR (Adquisición, Activación, Retención, Referencia, Ingresos)
    - Build-Measure-Learn Cycle

**Lógica de selección automática:**
```
IF problema_no_claro → Design Thinking
IF necesidad_diferenciación → Blue Ocean + SCAMPER
IF fondo_social → Árbol de Problemas + Teoría de Cambio
IF startup_comercial → Lean Startup + JTBD
IF análisis_entorno → PESTEL + FODA
```

**Output:** `13_innovation_insights.md`

**Guardrails:**
- ✅ Seleccionar metodologías relevantes según contexto
- ✅ Aplicar metodologías de forma completa
- ❌ No aplicar todas las metodologías sin criterio
- ❌ No generar insights genéricos sin conexión al contexto

---

### midi-prioritizer-agent

**Fase:** 1.4 - Priorización de Ideas

**Rol:** Evalúa y prioriza ideas usando matriz multi-criterio.

**Criterios de evaluación (14 dimensiones):**

| Criterio | Peso Base | Descripción |
|----------|-----------|-------------|
| Impacto | 15% | Potencial de cambio positivo |
| Factibilidad Técnica | 10% | ¿Se puede implementar con tecnología disponible? |
| Factibilidad Económica | 10% | ¿Es viable financieramente? |
| Deseabilidad Usuario | 12% | ¿Qué tan fuerte es la necesidad? |
| Alineación Territorial | 8% | ¿Calza con oportunidades del territorio? |
| Alineación Fondo | 10% | ¿Calza con objetivos del fondo? |
| Innovación | 8% | ¿Qué tan novedosa es? |
| Sostenibilidad | 7% | ¿Puede mantenerse sin financiamiento continuo? |
| Escalabilidad | 5% | ¿Puede crecer/replicarse? |
| Riesgo | 5% | Nivel de riesgo (invertido) |
| Tiempo Implementación | 5% | ¿Se puede implementar en el plazo? |
| Uso Presupuesto | 3% | ¿Aprovecha eficientemente el presupuesto? |
| Evidencia Disponible | 5% | ¿Hay datos que respalden viabilidad? |
| Diferenciación | 7% | ¿Se diferencia de soluciones existentes? |

**Ajuste de pesos según contexto:**

- **Fondo concursable público:**
  - ↑ Alineación Fondo (10% → 20%)
  - ↑ Impacto Social
  - ↓ Escalabilidad (si fondo es local)

- **Inversión privada:**
  - ↑ Factibilidad Económica (10% → 15%)
  - ↑ Escalabilidad (5% → 10%)
  - ↑ Diferenciación (7% → 12%)

- **Proyecto social:**
  - ↑ Impacto Social (15% → 20%)
  - ↑ Sostenibilidad (7% → 12%)
  - ↓ Innovación (si es mejora incremental)

- **Startup comercial:**
  - ↑ Factibilidad Económica (10% → 15%)
  - ↑ Deseabilidad Usuario (12% → 18%)
  - ↑ Diferenciación (7% → 12%)

**Output:** `15_idea_ranking.md`, `15_TOP3_IDEAS.md`

**Guardrails:**
- ✅ Justificar cada puntaje con evidencia
- ✅ Explicar por qué se descartan ideas
- ✅ Considerar contexto específico del usuario
- ❌ No rankear sin justificación
- ❌ No usar pesos estáticos sin ajuste

---

### midi-case-research-agent

**Fase:** 2.2 - Investigación de Casos

**Rol:** Busca experiencias similares al proyecto para aprender de éxitos y fracasos.

**Categorías de casos (8):**

1. **Casos de Éxito**
   - Proyectos similares exitosos
   - Emprendimientos que resolvieron el mismo problema
   - Iniciativas que funcionaron en territorios parecidos
   - Información: Nombre, ubicación, año, modelo, financiamiento, resultados, factores de éxito, lecciones

2. **Casos de Fracaso**
   - Proyectos similares que fallaron
   - Startups que cerraron en el mismo sector
   - Razón del fracaso, errores, qué podrían haber hecho diferente

3. **Proyectos Financiados Anteriormente**
   - Ganadores de la misma convocatoria (si hay fondo objetivo)
   - Montos otorgados, duración, resultados reportados

4. **Pilotos y Prototipos**
   - MVPs que validaron hipótesis similar
   - Qué probaron, cómo, resultados, costo, tiempo

5. **Papers e Investigación**
   - Papers académicos sobre el problema
   - Estudios de impacto
   - Hallazgos relevantes

6. **Notas de Prensa**
   - Cobertura mediática
   - Reportajes
   - Artículos de expertos

7. **Bases de Datos Públicas**
   - Chile: CORFO, SERCOTEC, FIA, SII, INE
   - Internacional: Crunchbase, CB Insights, Product Hunt

8. **Programas Anteriores**
   - Resultados de programas similares
   - Evaluaciones de impacto
   - Lecciones oficiales

**Análisis de patrones:**
- Qué funciona (características comunes de éxitos)
- Qué falla (características comunes de fracasos)
- Factores diferenciadores
- Recomendaciones basadas en evidencia

**Output:** `33_case_research.md`

**Guardrails:**
- ✅ Proporcionar links a fuentes
- ✅ Distinguir entre éxito y fracaso
- ✅ Identificar patrones, no solo casos aislados
- ❌ No inventar casos
- ❌ No generalizar de un solo caso

**Fuentes Chile específicas:**
- CORFO: https://www.corfo.cl
- SERCOTEC: https://www.sercotec.cl
- FIA: https://www.fia.cl
- Start-Up Chile: https://www.startupchile.org
- INE: https://www.ine.cl

---

**Total agentes v0.2.0: 28**

*Actualizado: 2026-05-05*
