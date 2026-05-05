# Command: /midi-start

## Objective
Inicializa el flujo MIDI en un proyecto nuevo o existente. Es el punto de entrada para comenzar cualquier trabajo con el framework.

## Preconditions
- [ ] No critical preconditions (this is the entry point)
- [ ] Working directory is writable

## Termination Criteria
- USER_CONTEXT.md created with complete information
- PROJECT_STATE.md initialized
- Mode determined (exploration or financeable)
- Gate 1 passed (context sufficient)

## Agents Activated
- orchestrator-agent
- intake-agent

## Files Read
- `.midi/config/midi.config.yaml` (configuración del proyecto)
- `.midi/docs/USAGE.md` (guía de uso)
- `PROJECT_STATE.md` (si existe, para retomar)

## Files Written
- `00_intake/intake_form.md` (respuestas del usuario)
- `USER_CONTEXT.md` (perfil del usuario extraído del intake)
- `PROJECT_STATE.md` (estado inicial del proyecto)

## Flow
1. **Bienvenida**
   - Presentar MIDI y sus dos modos
   - Explicar el proceso general
   - Preguntar si desea continuar

2. **Intake Mínimo**
   - Nombre del proyecto
   - Descripción breve de la idea inicial
   - País/región de operación
   - Objetivo principal (comercial, fondos, validación)
   - Recursos disponibles
   - Restricciones conocidas

3. **Clasificación**
   - Determinar si corresponde Modo Exploración o Financiable
   - Si la idea está muy definida → preguntar si quiere explorar alternativas
   - Si la idea es vaga → recomendar Exploración

4. **Gate Humano 1**
   - Preguntar: "¿El contexto capturado es suficiente para continuar?"
   - Si no → solicitar información adicional
   - Si sí → registrar en DECISION_LOG.md

5. **Actualización de Estado**
   - Crear/actualizar PROJECT_STATE.md
   - Crear USER_CONTEXT.md
   - Determinar próximo comando sugerido

## Human Gates
- **Gate 1:** Confirmación de contexto suficiente después del intake

## Example Usage
```
User: /midi-start

Agent: ¡Bienvenido a MIDI!

MIDI es un framework que transforma ideas iniciales en proyectos completos, analizados y financeables.

Tengo dos modos de trabajo:
1. **Modo Exploración** - Investigar, generar ideas y seleccionar las mejores
2. **Modo Financeable** - Tomar una idea y convertirla en proyecto ejecutable

Para comenzar, necesito conocerte un poco mejor:

[Comienza intake con preguntas]

...

Contexto capturado:
- Proyecto: App de delivery de comida saludable
- País: Chile, Santiago
- Objetivo: Postular a fondos concursables
- Presupuesto: $50M CLP
- Skills: Marketing digital, operaciones
- Recursos: Equipo de 2 personas

¿Este contexto es suficiente para continuar? (sí/no/ agregar más info)
```

## Implementation Status
- [ ] Placeholder - needs implementation