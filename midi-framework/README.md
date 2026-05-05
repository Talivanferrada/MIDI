# MIDI Framework

**MIDI — Modelo Inteligente de Desarrollo de Innovación**

Un framework multiagente para transformar ideas en proyectos financiables.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)

## ¿Qué es MIDI?

MIDI es un framework de innovación que utiliza inteligencia artificial multiagente para guiar proyectos desde la idea inicial hasta un documento de proyecto financiable. Combina metodologías probadas de innovación, modelado de negocio y preparación para financiación.

### Características principales

- **Múltiples modos de trabajo**: Exploración, Financeable o Full MIDI
- **20 agentes especializados**: Desde investigación global hasta escritura de propuestas
- **Workflows estructurados**: Flujos de trabajo paso a paso
- **Adaptable a tu región**: Configuración por país y región
- **Compatible con múltiples plataformas de agentes**: OpenCode, Claude Code, Cursor, y más

## Instalación

### Requisitos previos

- Node.js 18.0.0 o superior
- npm o yarn

### Instalación global

```bash
npm install -g midi-framework
```

### Uso con npx (sin instalación)

```bash
npx midi-framework init
```

### Instalación desde el repositorio

```bash
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework
npm install
npm link  # Para usar 'midi' globalmente
```

## Uso Rápido

### 1. Inicializar MIDI en tu proyecto

```bash
# Interactivo (con preguntas)
midi init

# Con valores por defecto
midi init --yes

# Con opciones específicas
midi init --project-name "Mi Proyecto" --country "Chile" --region "Maule" --mode "full" --platform "opencode"
```

### 2. Verificar la instalación

```bash
midi doctor
```

### 3. Ver la versión

```bash
midi --version
```

## Comandos CLI

| Comando | Descripción |
|---------|-------------|
| `midi init` | Inicializa MIDI en el proyecto actual |
| `midi init --yes` | Inicializa con valores por defecto |
| `midi doctor` | Verifica la instalación y muestra el estado |
| `midi --version` | Muestra la versión del framework |
| `midi --help` | Muestra la ayuda |

### Opciones de `midi init`

| Opción | Descripción | Valor por defecto |
|--------|-------------|-------------------|
| `--yes, -y` | Usar valores por defecto | - |
| `--project-name` | Nombre del proyecto | "Mi Proyecto MIDI" |
| `--country` | País del proyecto | "Chile" |
| `--region` | Región/Estado | "Metropolitana" |
| `--mode` | Modo de trabajo | "full" |
| `--platform` | Plataforma de agentes | "generic" |

### Modos de trabajo

| Modo | Descripción |
|------|-------------|
| `full` | MIDI completo: Exploración + Financeable |
| `exploration` | Generación y exploración de ideas |
| `financeable` | Desarrollo de proyecto hacia financiación |

### Plataformas soportadas

| Plataforma | Valor | Archivo de instrucciones |
|------------|-------|--------------------------|
| OpenCode | `opencode` | `AGENTS.md` |
| Claude Code | `claude-code` | `CLAUDE.md` |
| Cursor | `cursor` | `.cursorrules` |
| Codex | `codex` | `AGENTS.md` |
| Windsurf | `windsurf` | `.windsurfrules` |
| Gemini CLI | `gemini-cli` | `AGENTS.md` |
| Generic | `generic` | `AGENTS.md` |

## Estructura del Proyecto

Después de ejecutar `midi init`, se crea la siguiente estructura:

```text
.midi/
├── config/
│   ├── midi.config.json      # Configuración principal
│   ├── agent-routing.json    # Rutas de agentes
│   └── scoring-rubric.json   # Rubrica de evaluación
├── agents/                    # 20 agentes especializados
├── skills/                    # Habilidades reutilizables
├── commands/                  # Comandos MIDI
├── templates/                 # Plantillas de documentos
├── workflows/                 # Flujos de trabajo
└── docs/                      # Documentación

midi-project/
├── PROJECT_STATE.md          # Estado del proyecto
├── DECISION_LOG.md           # Registro de decisiones
├── ASSUMPTIONS.md            # Supuestos
├── RISK_REGISTER.md          # Registro de riesgos
├── USER_CONTEXT.md           # Contexto del usuario
├── IDEA_BACKLOG.md           # Backlog de ideas
├── TOP3_IDEAS.md             # Top 3 ideas
├── FINAL_PROJECT_DOCUMENT.md # Documento final
└── [fases 00-13]/            # Directorios por fase
```

## Agents

MIDI incluye 20 agentes especializados:

| Agente | Función |
|--------|---------|
| midi-orchestrator | Coordina todos los agentes |
| midi-intake-agent | Recopila información inicial |
| midi-global-research-agent | Investigación global |
| midi-local-adaptation-agent | Adaptación local |
| midi-benchmark-agent | Benchmarking competitivo |
| midi-insight-agent | Generación de insights |
| midi-creative-agent | Ideación creativa |
| midi-hybridization-agent | Hibridación de ideas |
| midi-market-agent | Análisis de mercado |
| midi-business-model-agent | Modelado de negocio |
| midi-technical-agent | Análisis técnico |
| midi-financial-agent | Análisis financiero |
| midi-legal-tax-agent | Análisis legal y fiscal |
| midi-devil-advocate-agent | Crítica constructiva |
| midi-validation-agent | Validación de hipótesis |
| midi-funding-match-agent | Búsqueda de financiación |
| midi-evaluator-agent | Evaluación de proyectos |
| midi-application-optimizer-agent | Optimización de aplicaciones |
| midi-risk-agent | Análisis de riesgos |
| midi-writer-agent | Redacción de documentos |

## Workflows

### Workflow de Exploración

Para generar y explorar ideas de innovación:

1. **Intake**: Recopilación de contexto y objetivos
2. **Research**: Investigación de tendencias y oportunidades
3. **Insights**: Generación de insights clave
4. **Ideas**: Desarrollo de ideas iniciales
5. **Top 3**: Selección de las mejores 3 ideas

### Workflow Financeable

Para desarrollar un proyecto hacia financiación:

1. **Analysis**: Análisis profundo de la idea seleccionada
2. **Devil's Advocate**: Crítica y fortalecimiento
3. **Iteration**: Refinamiento basado en feedback
4. **Canvas**: Modelado de negocio (Business Model Canvas / Lean Canvas)
5. **Technical/Financial/Legal**: Análisis detallados
6. **Validation**: Validación de hipótesis
7. **Funding**: Preparación para financiación
8. **Evaluation**: Evaluación final
9. **Final Document**: Documento de proyecto final

### Full MIDI Workflow

Combina ambos workflows para un proceso completo desde la idea hasta el proyecto financiable.

## Comandos MIDI

Los comandos se activan en tu agente de IA:

| Comando | Descripción |
|---------|-------------|
| `/midi-start` | Inicia el workflow MIDI |
| `/midi-explore` | Ejecuta el workflow de exploración |
| `/midi-top3` | Selecciona las top 3 ideas |
| `/midi-financeable` | Ejecuta el workflow financeable |
| `/midi-devil` | Activa el devil's advocate |
| `/midi-canvas` | Genera el business model canvas |
| `/midi-evaluate` | Evalúa el proyecto |
| `/midi-final` | Genera el documento final |

## Desarrollo

### Configurar entorno de desarrollo

```bash
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework
npm install
```

### Ejecutar tests

```bash
npm test
```

### Ejecutar tests en modo watch

```bash
npm run test:watch
```

### Ejecutar el CLI localmente

```bash
node bin/midi.js --help
node bin/midi.js init --yes
node bin/midi.js doctor
```

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Roadmap

### Fase 1: Bootstrap ✅
- CLI funcional
- Estructura de directorios
- Placeholders de agentes
- Tests básicos

### Fase 2: Agentes
- Implementación de lógica de agentes
- Prompts específicos por agente
- Integración entre agentes

### Fase 3: Workflows
- Workflows completos
- Automatización de flujos
- Validación de outputs

### Fase 4: Integración
- APIs externas
- Bases de datos de funding
- Templates enriquecidos

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Créditos

Desarrollado por el equipo de MIDI Framework.

## Documentación

### 📚 Documentación en Español

| Documento | Descripción |
|-----------|-------------|
| [🚀 Guía Rápida](./docs/es/QUICKSTART.md) | Comienza en 5 minutos |
| [📖 Manual de Uso](./docs/es/MANUAL_DE_USO.md) | Guía completa del framework |
| [🤖 Guía de Agentes](./docs/es/AGENTES.md) | Todos los agentes explicados |
| [💰 Calculadoras Financieras](./docs/es/CALCULADORAS.md) | Referencia de funciones |
| [📊 Visualizaciones](./docs/es/VISUALIZACION.md) | Sistema de gráficos |

### Tests

```bash
npm test           # Ejecutar todos los tests
npm run test:watch # Modo watch
```

**143 tests passing** - Cobertura completa de:
- Módulo de visualización
- Calculadoras financieras
- Sistema de scoring
- Canvas builder
- CLI y workflows

## Soporte

- **Issues**: [GitHub Issues](https://github.com/Talivanferrada/MIDI/issues)
- **Documentación**: Ver `docs/es/` para guías completas

---

**MIDI Framework** - Transformando ideas en proyectos financiables con IA multiagente.
