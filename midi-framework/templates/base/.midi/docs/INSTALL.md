# Guía de Instalación

## Requisitos Previos

- Node.js 18 o superior
- npm 8 o superior
- Git (opcional, para control de versiones)

## Instalación

### Opción 1: npm global

```bash
npm install -g midi-framework
```

### Opción 2: npx (sin instalación)

```bash
npx midi-framework init
```

### Opción 3: Desde el código fuente

```bash
git clone https://github.com/Talivanferrada/MIDI.git
cd MIDI/midi-framework
npm install
npm link
```

## Inicialización

### Interactiva

```bash
midi init
```

El asistente preguntará:
- Nombre del proyecto
- País
- Región
- Modo (full, exploration, financeable)
- Plataforma (opencode, claude-code, cursor, etc.)

### Con parámetros

```bash
midi init \
  --project-name "Mi Proyecto" \
  --country "Chile" \
  --region "Metropolitana" \
  --mode "full" \
  --platform "opencode"
```

### Modo automático

```bash
midi init --yes
```

Usa valores por defecto sin preguntar.

## Verificar Instalación

```bash
midi doctor
```

Este comando verifica:
- Directorio .midi/ existe
- Configuración válida
- Agentes presentes
- Skills y commands disponibles

## Estructura Creada

```
tu-proyecto/
├── .midi/
│   ├── config/
│   │   ├── midi.config.json
│   │   ├── agent-routing.json
│   │   └── scoring-rubric.json
│   ├── agents/          # 20 agentes
│   ├── skills/          # 11 habilidades
│   ├── commands/        # 8 comandos
│   ├── templates/       # 12 plantillas
│   ├── workflows/       # 3 flujos
│   └── docs/
│
├── midi-project/
│   ├── PROJECT_STATE.md
│   ├── DECISION_LOG.md
│   ├── ASSUMPTIONS.md
│   ├── RISK_REGISTER.md
│   ├── USER_CONTEXT.md
│   ├── IDEA_BACKLOG.md
│   ├── TOP3_IDEAS.md
│   ├── FINAL_PROJECT_DOCUMENT.md
│   └── */               # 14 directorios de trabajo
│
└── AGENTS.md            # Instrucciones para el agente
```

## Configuración de Plataforma

### OpenCode
El archivo `AGENTS.md` se crea automáticamente con las instrucciones necesarias.

### Claude Code
El instalador puede crear `CLAUDE.md` con instrucciones específicas.

### Cursor
Detecta `.cursorrules` y se adapta automáticamente.

### Otras plataformas
Usa el modo "generic" para cualquier agente que lea archivos Markdown.

## Solución de Problemas

### Error: "command not found: midi"
- Verifica que Node.js esté instalado
- Intenta con `npx midi-framework init`

### Error: "permission denied"
- En Linux/macOS, puede requerir sudo para instalación global
- Alternativa: usar npx

### Error: "Cannot find module"
- Ejecuta `npm install` en el directorio del framework
- Verifica la versión de Node.js (>= 18)

## Próximos Pasos

1. Revisa `.midi/config/midi.config.json`
2. Lee `.midi/docs/README.md`
3. Inicia tu agente con `/midi-start`
4. Ejecuta `midi doctor` para verificar

## Soporte

- GitHub: https://github.com/Talivanferrada/MIDI
- Documentación: `.midi/docs/`
