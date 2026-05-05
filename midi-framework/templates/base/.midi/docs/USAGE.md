# Guía de Uso

## Flujo de Trabajo Básico

### 1. Iniciar un Nuevo Proyecto

```bash
midi init
```

Responde las preguntas del asistente para configurar tu proyecto.

### 2. Iniciar el Agente

Abre tu agente de desarrollo (OpenCode, Claude Code, Cursor, etc.) en el directorio del proyecto.

### 3. Ejecutar el Primer Comando

```
/midi-start
```

Esto iniciará el workflow completo de MIDI.

---

## Comandos Disponibles

### `/midi-start`
Inicia el workflow completo de MIDI desde el principio.

**Actividad:**
- Lee el contexto del usuario
- Inicia el flujo de exploración
- Genera ideas y las evalúa

**Cuándo usar:** Al comenzar un proyecto nuevo.

---

### `/midi-explore`
Activa el modo exploración.

**Produce:**
- Investigación global y local
- Benchmark de competencia
- 10-15 ideas generadas
- Top 3 ideas seleccionadas

**Cuándo usar:** Cuando tienes una idea vaga y quieres explorar posibilidades.

---

### `/midi-top3`
Genera o actualiza el top 3 de ideas.

**Lee:**
- IDEA_BACKLOG.md
- Investigación existente

**Escribe:**
- TOP3_IDEAS.md

**Cuándo usar:** Después de generar ideas para seleccionar las mejores.

---

### `/midi-financeable`
Activa el modo financiable para una idea seleccionada.

**Produce:**
- Análisis de mercado
- Business Model Canvas
- Análisis financiero
- Análisis legal/tributario
- Plan de validación

**Cuándo usar:** Cuando tienes una idea seleccionada y quieres convertirla en proyecto.

---

### `/midi-devil`
Ejecuta el abogado del diablo.

**IMPORTANTE:** Este comando es obligatorio antes del documento final.

**Produce:**
- Crítica dura y realista
- Supuestos débiles identificados
- Riesgos no considerados

**Cuándo usar:** Antes de declarar el proyecto como viable o financiable.

---

### `/midi-canvas`
Genera Business Model Canvas y Lean Canvas.

**Lee:**
- Información del proyecto
- Análisis de mercado

**Escribe:**
- business-model-canvas.md
- lean-canvas.md

---

### `/midi-evaluate`
Ejecuta la evaluación tipo jurado/inversionista.

**Produce:**
- Puntaje 0-100
- Evaluación por dimensión
- Recomendación final

**Criterios de aprobación:**
- Puntaje ≥ 70: Aprobado
- Puntaje 55-69: Requiere iteración
- Puntaje < 55: Requiere cambios mayores

---

### `/midi-final`
Genera el documento maestro final.

**Prerrequisitos obligatorios:**
- [ ] Idea seleccionada
- [ ] Análisis de mercado
- [ ] Modelo de negocio
- [ ] Análisis financiero
- [ ] Abogado del diablo ejecutado
- [ ] Evaluación completada

---

## Gates de Aprobación Humana

MIDI incluye checkpoints donde se requiere tu aprobación:

### Gate 1: Después del Intake
¿El contexto capturado es suficiente?

### Gate 2: Después de Investigación
¿Hay suficiente información para idear?

### Gate 3: Después del Top 3
¿Qué idea pasa a modo financiable?

### Gate 4: Después del Abogado del Diablo
¿La idea continúa, itera, se fusiona o descarta?

### Gate 5: Después de Evaluación
¿El proyecto alcanza calidad suficiente?

---

## Archivos de Estado

Mantén estos archivos actualizados:

| Archivo | Propósito |
|---------|-----------|
| `PROJECT_STATE.md` | Estado actual del proyecto |
| `DECISION_LOG.md` | Registro de decisiones |
| `ASSUMPTIONS.md` | Supuestos identificados |
| `RISK_REGISTER.md` | Riesgos y mitigaciones |
| `USER_CONTEXT.md` | Tu contexto personal |
| `IDEA_BACKLOG.md` | Todas las ideas generadas |
| `TOP3_IDEAS.md` | Las 3 mejores ideas |

---

## Tips y Mejores Prácticas

### 1. No te enamores de la idea inicial
MIDI está diseñado para explorar, comparar y mejorar. Deja que el framework te sugiera alternativas.

### 2. Completa el intake honestamente
Mejor información inicial = mejores resultados.

### 3. Usa el abogado del diablo
Es tentador saltarse la crítica, pero encontrar problemas temprano ahorra tiempo y dinero.

### 4. Valida supuestos críticos
Antes de invertir demasiado, identifica y valida los supuestos más arriesgados.

### 5. Itera cuando sea necesario
Un puntaje bajo en evaluación no es un fracaso, es información para mejorar.

---

## Ejemplo de Sesión Completa

```
Usuario: /midi-start

Agente: Bienvenido a MIDI. Veo que no hay contexto previo.
        Comenzaré con el intake...
        
        ¿Cuál es tu idea inicial?
        
Usuario: Quiero crear una app de bienestar

Agente: [Continúa el intake con preguntas adicionales...]
        [Realiza investigación...]
        [Genera ideas...]
        
        He generado 12 ideas. El top 3 es:
        1. ...
        2. ...
        3. ...
        
        ¿Cuál idea deseas desarrollar?

Usuario: La número 2

Agente: [Activa modo financiable...]
        [Ejecuta análisis...]
        [Abogado del diablo...]
        
        Puntaje de evaluación: 72/100
        Recomendación: Listo para iterar menores detalles y postular.
        
        ¿Genero el documento final?

Usuario: Sí

Agente: [Genera FINAL_PROJECT_DOCUMENT.md]
        ¡Proyecto completado!
```

---

## Problemas Comunes

### "El agente no reconoce los comandos"
- Verifica que exista el archivo `AGENTS.md` o `CLAUDE.md`
- Asegúrate de que el agente lea `.midi/docs/README.md`

### "Falta información en el documento final"
- Ejecuta `midi doctor` para verificar prerrequisitos
- Completa los análisis faltantes

### "El puntaje de evaluación es muy bajo"
- Revisa las recomendaciones del evaluador
- Ejecuta `/midi-devil` si no lo has hecho
- Itera sobre las debilidades identificadas
