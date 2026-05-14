# 🚀 Instrucciones Rápidas - MIDI Framework

**Versión:** 0.2.0

---

## ✅ Ya tienes MIDI instalado

### Comenzar ahora

```bash
# Iniciar workflow completo
midi start

# O solo exploración de ideas
midi explore
```

---

## 📖 Flujo de Trabajo

### Opción 1: Explorar Ideas desde Cero

```bash
midi start
```
1. Selecciona: **"Explorar ideas desde cero"**
2. Responde preguntas sobre tu contexto (territorio, recursos, objetivo)
3. El sistema investiga, aplica metodologías, genera ideas
4. Recibes un ranking de ideas con scores

**Outputs:**
- `00_context/` - Tu perfil y decisiones
- `10_exploration/` - Análisis territorial, insights, ideas
- `15_TOP3_IDEAS.md` - Las 3 mejores ideas rankeadas

### Opción 2: Analizar Proyecto Existente

```bash
midi start
```
1. Selecciona: **"Analizar proyecto para financiamiento"**
2. Describe tu proyecto
3. Indica tipo de financiamiento (fondo, inversión privada, etc.)
4. El sistema analiza en profundidad

**Outputs:**
- `20_cohesion/` - Hipótesis del proyecto
- `30_analysis/` - Análisis completo
- `50_final/` - Documento final listo para postular

### Opción 3: Postular a Fondo Específico

```bash
midi start
```
1. Selecciona: **"Postular a fondo concursable específico"**
2. Proporciona nombre del fondo (ej: CORFO Innova Corrobio)
3. Ten listo el **link a las bases oficiales**
4. El sistema extrae requisitos y optimiza el presupuesto

**Ventajas:**
- Checklist de admisibilidad automático
- Presupuesto optimizado al 100% del máximo
- Lenguaje alineado con criterios de evaluación
- Gastos verificados como permitidos

---

## 📁 Estructura de Tu Proyecto

Después de ejecutar `midi init`:

```
mi-proyecto/
├── .midi/
│   ├── config/           # Configuración del proyecto
│   ├── agents/           # 28 agentes especializados
│   ├── skills/           # Skills disponibles
│   ├── commands/         # Comandos disponibles
│   ├── workflows/        # Workflows definidos
│   └── templates/        # Templates de documentos
│
├── midi-project/
│   ├── 00_context/       # Fase 0: Contexto
│   ├── 10_exploration/   # Fase 1: Exploración
│   ├── 20_cohesion/      # Fase 1.5: Cohesión
│   ├── 30_analysis/      # Fase 2: Análisis
│   ├── 40_validation/   # Fase 3: Validación
│   └── 50_final/         # Documentos finales
│
└── README.md
```

---

## 🛠️ Comandos Principales

| Comando | Qué hace | Cuándo usar |
|---------|----------|-------------|
| `midi start` | Workflow completo | Empezar un nuevo proyecto |
| `midi explore` | Solo exploración | Generar y priorizar ideas |
| `midi financeable` | Solo análisis | Cuando ya tienes idea clara |
| `midi doctor` | Verificar instalación | Si algo no funciona |
| `midi status` | Ver estado actual | Saber en qué fase estás |
| `midi reset` | Reiniciar workflow | Si quieres empezar de nuevo |

---

## 💡 Tips Importantes

### Fondos Concursables
- **Siempre** ten el link a las bases oficiales
- El sistema **no inventa** restricciones, solo las extrae
- Presupuestos se optimizan al **100%** del máximo
- Todos los precios deben tener **fuentes reales**

### Inversión Privada
- Define claramente tu **modelo de negocio**
- Ten datos de **mercado y clientes**
- Prepara tu **pitch deck** basics

### Proyectos Sociales
- Define **impacto esperado** claramente
- Identifica **beneficiarios directos e indirectos**
- Considera **sostenibilidad** post-financiamiento

---

## ⚠️ Reglas del Sistema

MIDI **nunca** hace estas cosas:

1. ❌ Inventar precios sin fuentes
2. ❌ Inventar bases de fondos
3. ❌ Inventar restricciones
4. ❌ Inventar fuentes
5. ❌ Entregar presupuestos sin desglose

MIDI **siempre** hace estas cosas:

1. ✅ Cita fuentes con links
2. ✅ Separa supuestos de datos confirmados
3. ✅ Pregunta decisiones clave al usuario
4. ✅ Aplica abogado del diablo obligatoriamente
5. ✅ Entrega scores con justificación

---

## 📚 Documentación

- **Manual completo:** `.midi/docs/MANUAL_DE_USO.md`
- **Agentes:** `.midi/docs/AGENTES.md`
- **Quick Start:** `.midi/docs/QUICKSTART.md`
- **GitHub:** https://github.com/Talivanferrada/MIDI

---

## 🆘 Ayuda

```bash
# Ver todos los comandos
midi --help

# Ver ayuda de un comando específico
midi init --help
midi start --help

# Verificar que todo está OK
midi doctor
```

---

## 🎯 Ejemplo de Sesión Completa

```bash
# 1. Crear proyecto
$ midi init mi-startup

╔═══════════════════════════════════════════════════════════╗
║          MIDI Framework v0.2.0                             ║
╚═══════════════════════════════════════════════════════════╝

✓ Proyecto inicializado
✓ Estructura creada
✓ Configuración escrita

📚 PRÓXIMOS PASOS:
  1. midi start    - Iniciar workflow
  2. midi explore  - Solo exploración
  3. midi doctor   - Verificar

# 2. Iniciar workflow
$ midi start

? ¿Qué deseas hacer hoy?
  → Explorar ideas desde cero

? ¿Territorio?
  → Metropolitana, Chile

? ¿Área de interés?
  → Tecnología educativa

? ¿Recursos disponibles?
  → $30.000.000, tiempo completo

✓ Fase 0 completada
⏳ Fase 1.1: Análisis territorial...
⏳ Fase 1.2: Metodologías de innovación...
⏳ Fase 1.3: Generación de ideas...

📊 12 ideas generadas
🏆 Top 3:
   1. Plataforma de cursos interactivos - Score 4.5/5
   2. App de aprendizaje adaptativo - Score 4.2/5
   3. Marketplace de contenido educativo - Score 3.9/5

? ¿Cuál idea desarrollar?
  → 1. Plataforma de cursos interactivos

🔗 Fase 1.5: Cohesión...
? ¿Tipo de financiamiento?
  → Fondo CORFO

? ¿Nombre del fondo?
  → CORFO Innova Corrobio

? ¿Link a bases?
  → https://www.corfo.cl/convocatoria-innova-corrobio-2024

⏳ Fase 2: Análisis...

✅ Proyecto completo
   Score: 82/100 (MUY BUENO)
   Listo para postular
```

---

**¡Listo para innovar! 🚀**
