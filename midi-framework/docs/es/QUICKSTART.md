# MIDI Framework - Guía Rápida

## 🚀 En 5 Minutos

### 1. Instalar

```bash
npm install -g midi-framework
```

### 2. Crear Proyecto

```bash
mkdir mi-startup
cd mi-startup
midi init
```

### 3. Ejecutar

```bash
midi start
```

### 4. Obtener Resultados

```bash
# Ver estado
midi status

# Documento final
cat FINAL_PROJECT_DOCUMENT.md
```

---

## 📋 Comandos Esenciales

| Comando | Qué hace |
|---------|----------|
| `midi init` | Inicializa proyecto |
| `midi start` | Workflow completo |
| `midi explore` | Solo generar ideas |
| `midi financeable` | Solo análisis profundo |
| `midi status` | Ver progreso |
| `midi doctor` | Diagnosticar problemas |

---

## 🎯 Flujos Recomendados

### Tengo una idea vaga

```bash
midi init
midi explore          # Genera 10-15 ideas
# Revisa IDEA_BACKLOG.md
# Elige una idea
midi financeable      # Analiza la elegida
```

### Tengo una idea definida

```bash
midi init
midi financeable      # Análisis directo
# Responde preguntas de intake
# Revisa evaluación final
```

### Quiero postular a fondo

```bash
midi init --funding-focus
midi financeable
# Revisa funding_strategy.md
# Usa pitch.md para postular
```

---

## 📁 Archivos Importantes

### Generados Automáticamente

```
USER_CONTEXT.md          # Tu información
IDEA_BACKLOG.md          # Todas las ideas
TOP3_IDEAS.md            # Las 3 mejores
evaluator_scorecard.md   # Score final
FINAL_PROJECT_DOCUMENT.md # Documento completo
```

### Para Revisar

```
06_devil_advocate/
  devil_report.md        # Crítica rigurosa ⚠️

04_analysis/
  financial_analysis.md  # Proyecciones
  market_analysis.md     # Mercado

07_evaluation/
  evaluator_scorecard.md # Score 0-100
```

---

## ⚡ Ejemplo Rápido

```bash
# 1. Crear proyecto
mkdir cafeteria-virtual && cd cafeteria-virtual

# 2. Inicializar
midi init --name "Cafetería Virtual"

# 3. Iniciar workflow
midi start

# 4. Seguir el proceso
# - Responder 26 preguntas de intake
# - Revisar 10-15 ideas generadas
# - Elegir 1 idea
# - Esperar análisis completo

# 5. Ver resultado
cat FINAL_PROJECT_DOCUMENT.md

# 6. Ver score
grep -A5 "Puntaje Total" 07_evaluation/evaluator_scorecard.md
```

---

## 🔍 Interpretar Resultados

### Score Final

| Score | Significado | Acción |
|-------|-------------|--------|
| ≥85 | EXCELENTE | Postular/ejecutar ya |
| 70-84 | BUENO | Ajustes menores |
| 55-69 | REGULAR | Mejoras significativas |
| <55 | DÉBIL | Replantear |

### Devil's Advocate

El reporte más importante. Busca:

- 🟢 **CONTINUAR** → Procede
- 🟡 **ITERAR** → Mejora lo indicado
- 🔴 **DESCARTAR** → Otra idea

---

## ⚠️ Cosas Importantes

### El Devil's Advocate es OBLIGATORIO

No se puede saltar. Todo proyecto debe pasar por crítica rigurosa.

### El Financial Agent NO inventa cifras

Todo número está marcado como `[SUPUESTO]` con nivel de confianza.

### El Legal Agent NO sugiere evasión

Prohibido sugerir eludir impuestos o estructuras ilegales.

---

## 🛠️ Problemas Comunes

### "Command not found"

```bash
npm link
# o
npm install -g midi-framework
```

### "Project already initialized"

```bash
rm -rf .midi
midi init
```

### Quiero reiniciar

```bash
midi reset-workflow
```

---

## 📚 Más Información

- [Manual Completo](./MANUAL_DE_USO.md)
- [Guía de Agentes](./AGENTES.md)
- [Calculadoras Financieras](./CALCULADORAS.md)
- [Visualizaciones](./VISUALIZACION.md)

---

## 🎓 Próximos Pasos

1. ✅ Instalar MIDI
2. ✅ Crear primer proyecto
3. ✅ Completar workflow
4. ✅ Revisar documento final
5. 🚀 Ejecutar o postular

---

*MIDI Framework - De idea a proyecto financiable*
