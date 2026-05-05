# MIDI Framework - Documentación

## ¿Qué es MIDI?

**MIDI — Modelo Inteligente de Desarrollo de Innovación**

MIDI es un framework multiagente que transforma ideas iniciales en proyectos reales, financiables y ejecutables.

## Inicio Rápido

### 1. Instalación

```bash
# Instalar globalmente
npm install -g midi-framework

# O usar con npx
npx midi-framework init
```

### 2. Inicializar Proyecto

```bash
midi init
```

### 3. Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `midi init` | Inicializa MIDI en el proyecto actual |
| `midi init --yes` | Inicializa con valores por defecto |
| `midi doctor` | Verifica la instalación |
| `midi --version` | Muestra la versión |

## Estructura del Proyecto

Después de ejecutar `midi init`, se crea:

```
.midi/
├── config/          # Configuración del framework
├── agents/          # Definiciones de agentes
├── skills/          # Habilidades especializadas
├── commands/        # Comandos disponibles
├── templates/       # Plantillas de documentos
├── workflows/       # Flujos de trabajo
└── docs/            # Documentación

midi-project/
├── PROJECT_STATE.md # Estado actual del proyecto
├── DECISION_LOG.md  # Registro de decisiones
├── ASSUMPTIONS.md   # Supuestos del proyecto
├── RISK_REGISTER.md # Registro de riesgos
├── USER_CONTEXT.md  # Contexto del usuario
├── IDEA_BACKLOG.md  # Backlog de ideas
├── TOP3_IDEAS.md    # Top 3 ideas
└── */               # Directorios de trabajo
```

## Modos de Operación

### Modo Exploración
- Objetivo: Generar y evaluar ideas
- Produce: Investigación, benchmark, 10-15 ideas, top 3
- Activar: `/midi-explore`

### Modo Financiable
- Objetivo: Convertir idea en proyecto completo
- Produce: Análisis, BMC, financiero, legal, documento final
- Activar: `/midi-financeable`

## Comandos Slash Disponibles

| Comando | Propósito |
|---------|-----------|
| `/midi-start` | Iniciar workflow completo |
| `/midi-explore` | Modo exploración |
| `/midi-top3` | Generar top 3 ideas |
| `/midi-financeable` | Modo financiable |
| `/midi-devil` | Ejecutar abogado del diablo |
| `/midi-canvas` | Generar BMC y Lean Canvas |
| `/midi-evaluate` | Evaluar proyecto |
| `/midi-final` | Generar documento final |

## Agentes Disponibles

MIDI incluye 20 agentes especializados:

1. **orchestrator** - Coordina todo el flujo
2. **intake-agent** - Entrevista inicial
3. **global-research-agent** - Investigación global
4. **local-adaptation-agent** - Adaptación local (Chile)
5. **benchmark-agent** - Análisis de competencia
6. **insight-agent** - Transformar datos en oportunidades
7. **creative-agent** - Generar ideas
8. **hybridization-agent** - Fusionar ideas
9. **market-agent** - Análisis de mercado
10. **business-model-agent** - Modelos de negocio
11. **technical-agent** - Factibilidad técnica
12. **financial-agent** - Análisis financiero
13. **legal-tax-agent** - Análisis legal y tributario
14. **devil-advocate-agent** - Crítica constructiva
15. **validation-agent** - Validación Lean
16. **funding-match-agent** - Estrategia de financiamiento
17. **evaluator-agent** - Evaluación tipo jurado
18. **application-optimizer-agent** - Optimización de postulaciones
19. **risk-agent** - Gestión de riesgos
20. **writer-agent** - Redacción de documentos

## Plataformas Compatibles

- OpenCode
- Claude Code
- Cursor
- Codex
- Windsurf
- Gemini CLI
- Generic (cualquier agente que lea Markdown)

## Configuración

El archivo principal de configuración es `.midi/config/midi.config.json`:

```json
{
  "framework": "MIDI",
  "version": "0.1.0",
  "project_name": "Mi Proyecto",
  "country": "Chile",
  "region": "Metropolitana",
  "language": "es",
  "default_mode": "full",
  "funding_focus": true
}
```

## Más Información

- [INSTALL.md](./INSTALL.md) - Guía de instalación detallada
- [USAGE.md](./USAGE.md) - Guía de uso avanzado
- [AGENTS.md](./AGENTS.md) - Referencia de agentes
- [WORKFLOWS.md](./WORKFLOWS.md) - Flujos de trabajo
