# 02 — Agent Architecture MIDI

## Arquitectura general

MIDI se organiza como un sistema multiagente con capas.

```text
Orquestación
↓
Intake y contexto
↓
Investigación
↓
Insights
↓
Generación e hibridación
↓
Análisis
↓
Abogado del diablo
↓
Validación
↓
Financiamiento y evaluación
↓
Documento final
```

## Agentes requeridos

### 1. midi-orchestrator

Rol: coordina todo el flujo.

Responsabilidades:

- leer configuración,
- leer estado,
- decidir siguiente etapa,
- activar agentes,
- aplicar árbol de decisiones,
- exigir gates humanos,
- bloquear final si faltan análisis,
- permitir volver atrás e iterar.

### 2. midi-intake-agent

Rol: entrevista inicial.

Debe capturar:

- idea inicial,
- objetivo,
- país,
- región,
- recursos,
- presupuesto,
- habilidades,
- restricciones,
- público objetivo,
- motivaciones,
- nivel de riesgo,
- búsqueda de fondos,
- búsqueda de inversionistas.

### 3. midi-global-research-agent

Rol: investigar referentes globales.

Debe buscar o dejar plan de búsqueda sobre:

- startups,
- tendencias,
- proyectos similares,
- tecnologías,
- casos exitosos,
- casos fallidos,
- modelos de negocio.

### 4. midi-local-adaptation-agent

Rol: adaptar al territorio.

Para Chile debe considerar:

- región,
- comuna,
- permisos,
- cultura,
- logística,
- mercado local,
- clima,
- conectividad,
- fondos regionales.

### 5. midi-benchmark-agent

Rol: analizar competencia y sustitutos.

Debe producir:

- competidores directos,
- indirectos,
- referentes,
- precios,
- canales,
- propuesta de valor,
- diferenciación.

### 6. midi-insight-agent

Rol: transformar investigación en oportunidades.

Debe producir:

- dolores,
- necesidades,
- patrones,
- oportunidades,
- hipótesis de innovación.

### 7. midi-creative-agent

Rol: generar ideas.

Debe usar:

- Design Thinking,
- Jobs To Be Done,
- Blue Ocean,
- Ten Types of Innovation,
- analogías,
- modelos globales adaptados.

Debe generar 10 a 15 ideas.

### 8. midi-hybridization-agent

Rol: fusionar ideas.

Debe combinar:

- innovadora + rentable,
- global + local,
- postulable + comercial,
- simple + escalable.

### 9. midi-market-agent

Rol: análisis de mercado.

Debe analizar:

- clientes,
- segmentos,
- demanda,
- pricing,
- canales,
- competencia,
- barreras de entrada.

### 10. midi-business-model-agent

Rol: modelo de negocio.

Debe generar:

- Business Model Canvas,
- Lean Canvas,
- propuesta de valor,
- modelo de ingresos,
- costos,
- socios,
- canales.

### 11. midi-technical-agent

Rol: factibilidad técnica.

Debe analizar:

- herramientas,
- infraestructura,
- MVP,
- stack si aplica,
- complejidad,
- tiempos,
- dependencias.

### 12. midi-financial-agent

Rol: análisis financiero.

Debe analizar:

- inversión inicial,
- costos fijos,
- costos variables,
- ingresos,
- punto de equilibrio,
- escenarios,
- sensibilidad.

No debe inventar cifras sin marcarlas como supuestos.

### 13. midi-legal-tax-agent

Rol: análisis legal y tributario.

Puede sugerir optimización lícita:

- tipo de empresa,
- giro,
- permisos,
- contratos,
- IVA,
- gastos aceptados,
- separación de líneas con sustancia económica real.

No debe sugerir:

- evasión,
- fraude,
- simulación,
- facturación falsa,
- ocultamiento de ingresos.

### 14. midi-devil-advocate-agent

Rol: destruir la idea.

Es obligatorio.

Debe buscar fallas en:

- problema,
- solución,
- mercado,
- innovación,
- competencia,
- ejecución,
- técnica,
- legal,
- finanzas,
- narrativa,
- postulabilidad.

### 15. midi-validation-agent

Rol: validación Lean.

Debe proponer:

- hipótesis críticas,
- MVP,
- entrevistas,
- landing,
- preventa,
- piloto,
- métricas,
- criterios de éxito.

### 16. midi-funding-match-agent

Rol: estrategia de financiamiento.

Debe analizar:

- fondos públicos,
- incubadoras,
- aceleradoras,
- inversionistas,
- alianzas,
- instrumentos regionales.

Debe diferenciar confirmado, sugerido y pendiente de investigación.

### 17. midi-evaluator-agent

Rol: simular jurado o inversionista.

Debe puntuar 0 a 100.

Debe evaluar:

- innovación,
- mercado,
- escalabilidad,
- factibilidad,
- finanzas,
- legal,
- narrativa,
- postulabilidad.

### 18. midi-application-optimizer-agent

Rol: mejorar narrativa y postulación.

Debe fortalecer:

- problema,
- solución,
- impacto,
- innovación,
- escalabilidad,
- presupuesto,
- indicadores,
- pitch.

### 19. midi-risk-agent

Rol: consolidar riesgos.

Debe actualizar `RISK_REGISTER.md`.

### 20. midi-writer-agent

Rol: redactar documento maestro final.

Debe consolidar todos los artefactos y evitar contradicciones.

## Reglas de interacción entre agentes

- El orquestador decide el flujo.
- Cada agente debe leer estado antes de actuar.
- Cada agente debe escribir en artefactos concretos.
- El abogado del diablo debe ejecutarse antes del documento final.
- El evaluador debe ejecutarse antes de cerrar proyecto financiable.
- Si el puntaje es bajo, se debe iterar.
- Si hay riesgo legal, legal-tax y risk son obligatorios.
- Si funding_focus=true, funding-match y application-optimizer son obligatorios.

