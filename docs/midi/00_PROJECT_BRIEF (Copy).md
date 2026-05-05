

Necesito que revises y mejores un proyecto existente llamado MIDI.

Contexto general:
MIDI es un sistema multiagente orientado a la generación, exploración, maduración, evaluación y estructuración de ideas/proyectos de innovación, emprendimiento, investigación aplicada, negocios o iniciativas postulables a fondos concursables o financiamiento privado.

El sistema debe funcionar como una arquitectura de agentes que guíe al usuario desde una idea inicial o problema difuso hasta una propuesta de proyecto robusta, investigada, presupuestada, defendible y lista para tomar decisiones o postular.

Actualmente quiero reforzar la lógica del proyecto considerando que MIDI debe centrarse en dos grandes etapas principales:

1. Exploración de ideas.
2. Análisis del proyecto.

Pero ambas etapas NO deben estar separadas de forma rígida, ya que deben retroalimentarse entre sí. Por ejemplo, si desde el inicio la idea está orientada a un fondo concursable específico, la fase de exploración debe estar condicionada por las bases del fondo, sus objetivos, restricciones, presupuesto disponible, gastos permitidos, criterios de evaluación, plazos, beneficiarios, territorio, impacto esperado y cualquier otra condición relevante.

Además, si existe un presupuesto definido por un fondo concursable, MIDI debe optimizar el proyecto para utilizar el 100% del presupuesto disponible de manera justificada, coherente, realista y basada en costos reales de mercado. No debe inventar valores ni entregar presupuestos “al aire”.

Objetivo de esta tarea:
Revisar el proyecto MIDI existente, detectar brechas y rediseñar o ampliar la arquitectura de agentes, prompts, flujos, documentos, comandos, configuraciones y lógica interna para que MIDI funcione de forma mucho más completa, investigativa, iterativa y útil.

Debes modificar el repositorio existente si corresponde. Si falta un agente, créalo. Si falta una fase, créala. Si falta una carpeta, archivo, prompt, skill, template, workflow, checklist o documento de arquitectura, créalo. Si hay agentes existentes que deben ser ajustados, refactorízalos.

No elimines funcionalidad útil. Mejora, amplía y ordena.

---

# 1. Nueva estructura conceptual de MIDI

MIDI debe organizarse como un sistema con al menos estas fases:

## Fase 0: Contextualización inicial

Antes de explorar ideas o analizar proyectos, el sistema debe entender el punto de partida del usuario.

Debe preguntar o inferir, cuando corresponda:

- Qué busca el usuario:
  - generar ideas desde cero;
  - mejorar una idea existente;
  - postular a un fondo concursable;
  - buscar financiamiento privado;
  - crear un emprendimiento;
  - resolver un problema territorial;
  - diseñar un proyecto social, educativo, tecnológico, cultural, científico, turístico, ambiental, productivo u otro.
- En qué país, región, comuna o territorio se desarrollaría.
- Si existe una convocatoria, fondo, programa, inversionista o marco de financiamiento ya definido.
- Si existen bases, documentos, restricciones o presupuesto máximo.
- Si hay un público objetivo definido.
- Si hay una problemática concreta.
- Si hay un equipo, recursos previos, infraestructura o capacidades disponibles.
- Si se busca impacto económico, social, ambiental, científico, educativo, cultural o mixto.
- Nivel de madurez de la idea:
  - cero idea;
  - idea inicial;
  - idea avanzada;
  - proyecto en formulación;
  - proyecto listo para evaluación;
  - proyecto en búsqueda de financiamiento.

Esta fase debe decidir la ruta de trabajo.

---

# 2. Fase 1: Exploración de ideas

Esta fase debe ser mucho más potente que una lluvia de ideas genérica.

Debe incorporar investigación real, análisis de entorno, metodologías de innovación y generación estructurada de alternativas.

## Objetivo

Ayudar al usuario a descubrir oportunidades, nichos, problemas relevantes, tendencias, ideas innovadoras y combinaciones posibles, considerando contexto real, territorio, restricciones, mercado, evidencia y oportunidades de financiamiento.

## La exploración debe incluir:

### 2.1 Investigación externa real

Cuando el entorno lo permita, MIDI debe buscar información actualizada en fuentes externas, tales como:

- noticias nacionales e internacionales;
- tendencias mundiales de innovación;
- revistas especializadas;
- papers científicos;
- reportes de organismos públicos;
- reportes de organismos internacionales;
- publicaciones de innovación, emprendimiento o tecnología;
- experiencias similares;
- casos de éxito;
- casos fallidos;
- estadísticas territoriales;
- datos climáticos o geográficos si el proyecto depende del lugar;
- información económica, social, turística, ambiental o sectorial según el caso.

La salida debe incluir links o referencias para que el usuario pueda profundizar.

No basta con decir “según tendencias actuales”. Debe entregar fuentes, links, nombre de artículo/reporte/noticia, fecha si está disponible y una síntesis de por qué es relevante.

### 2.2 Análisis territorial y geográfico

Si el proyecto se vincula a un lugar físico, MIDI debe analizar:

- ubicación geográfica;
- clima;
- estacionalidad;
- accesibilidad;
- conectividad;
- riesgos naturales;
- ventajas del territorio;
- desventajas del territorio;
- oportunidades productivas;
- brechas locales;
- actores relevantes;
- posibles usuarios o beneficiarios;
- competencia o iniciativas similares;
- regulaciones locales si aplica.

Ejemplo:
Si el usuario quiere hacer un proyecto turístico, agrícola, educativo rural, ambiental o comunitario, el sistema debe revisar pros y contras del territorio y no generar ideas descontextualizadas.

### 2.3 Exploración basada en metodologías

La fase de exploración debe incorporar metodologías como:

- Design Thinking;
- Lean Startup;
- Jobs To Be Done;
- Blue Ocean Strategy;
- análisis PESTEL;
- análisis FODA;
- análisis de tendencias;
- análisis de nichos;
- matriz impacto/esfuerzo;
- matriz deseabilidad/factibilidad/viabilidad;
- mapa de actores;
- árbol de problemas;
- árbol de objetivos;
- teoría de cambio;
- benchmarking;
- análisis de dolores del usuario;
- innovación por combinación o fusión de ideas;
- SCAMPER;
- análisis de brechas;
- análisis de oportunidades territoriales.

No es necesario usar todas siempre. MIDI debe seleccionar las metodologías más adecuadas según el caso.

### 2.4 Identificación de nichos

MIDI debe detectar nichos y micronichos considerando:

- problemas poco atendidos;
- cambios tecnológicos;
- cambios sociales;
- cambios regulatorios;
- oportunidades territoriales;
- públicos específicos;
- comunidades desatendidas;
- necesidades emergentes;
- tendencias internacionales adaptables localmente;
- posibilidades de financiamiento;
- capacidades del usuario o equipo;
- ventajas competitivas.

Cada nicho debe ser descrito con:

- problema que aborda;
- público objetivo;
- oportunidad;
- evidencia o señal externa;
- dificultad de implementación;
- potencial de impacto;
- posible modelo de sostenibilidad;
- riesgos;
- relación con fondos o financiamiento.

### 2.5 Generación de backlog de ideas

Después de investigar, MIDI debe construir un backlog de ideas.

Cada idea debe presentarse con detalle, no como una frase suelta.

Cada idea del backlog debe incluir:

- nombre tentativo;
- descripción breve;
- problema que resuelve;
- público objetivo;
- territorio o contexto ideal;
- componentes principales;
- innovación propuesta;
- evidencia o inspiración encontrada;
- recursos necesarios;
- dificultad estimada;
- costo estimado preliminar;
- potencial de impacto;
- potencial de financiamiento;
- riesgos;
- dependencias;
- primeros pasos;
- links o fuentes relevantes;
- score preliminar.

### 2.6 Fusión y evolución de ideas

MIDI debe ser capaz de proponer fusiones entre ideas.

No solo debe listar ideas separadas. Debe analizar combinaciones posibles.

Para cada fusión debe explicar:

- qué ideas combina;
- por qué la combinación tiene sentido;
- qué valor nuevo aparece;
- qué problema aborda mejor que las ideas separadas;
- qué aumenta en complejidad;
- qué reduce en riesgo;
- qué fondo o tipo de financiamiento podría calzar;
- cómo sería un MVP o piloto;
- qué presupuesto aproximado podría requerir.

### 2.7 Priorización de ideas

MIDI debe aplicar una matriz de priorización con criterios como:

- impacto;
- factibilidad técnica;
- factibilidad económica;
- deseabilidad del usuario;
- alineación territorial;
- alineación con bases de fondos si existen;
- innovación;
- sostenibilidad;
- escalabilidad;
- riesgo;
- tiempo de implementación;
- uso eficiente del presupuesto;
- evidencia disponible;
- diferenciación.

Debe entregar ranking y justificar por qué recomienda avanzar con ciertas ideas.

---

# 3. Fase de cohesión entre exploración y análisis

Antes de pasar al análisis profundo del proyecto, MIDI debe tener una fase intermedia de cohesión.

Esta fase debe traducir una idea exploratoria en una hipótesis de proyecto analizable.

Debe responder:

- Qué idea o fusión se seleccionó.
- Qué problema concreto aborda.
- A quién beneficia.
- En qué territorio se implementa.
- Qué objetivo general podría tener.
- Qué objetivos específicos preliminares tendría.
- Qué resultados esperados se proyectan.
- Qué actividades principales se imaginan.
- Qué tipo de financiamiento se buscará.
- Qué restricciones existen.
- Qué información falta.
- Qué decisiones debe tomar el usuario antes de analizar en profundidad.

Aquí MIDI debe preguntar explícitamente:

¿Quieres orientar este proyecto a financiamiento privado, fondo concursable, autofinanciamiento, preventa, inversión ángel, subsidio público, patrocinio, crowdfunding u otra vía?

Si el usuario responde “fondo concursable”, MIDI debe solicitar las bases del fondo o un link oficial. Si el usuario no tiene las bases, MIDI puede sugerir buscar convocatorias posibles, pero debe distinguir claramente entre:
- análisis con bases reales;
- análisis exploratorio sin bases;
- supuestos pendientes de validación.

---

# 4. Fase 2: Análisis del proyecto

Esta fase debe ser iterativa, rigurosa y basada en evidencia.

No debe entregar un análisis cerrado de inmediato si faltan decisiones clave.

Debe trabajar por rondas:

1. Definición del marco de financiamiento.
2. Revisión de bases o requisitos.
3. Formulación del proyecto.
4. Validación técnica y territorial.
5. Presupuesto detallado.
6. Riesgos y mitigaciones.
7. Evaluación de impacto.
8. Ajuste final.
9. Entregables para postulación, pitch o decisión.

## 4.1 Decisión de financiamiento

MIDI debe preguntar o resolver:

- ¿El proyecto busca financiamiento privado o fondo concursable?
- ¿Existe una convocatoria específica?
- ¿Hay bases disponibles?
- ¿Cuál es el presupuesto máximo?
- ¿Qué gastos son permitidos?
- ¿Qué gastos están prohibidos?
- ¿Qué porcentaje de cofinanciamiento existe?
- ¿Existe aporte propio obligatorio?
- ¿Qué duración máxima tiene el proyecto?
- ¿Qué criterios de evaluación se usarán?
- ¿Qué documentos administrativos se solicitan?
- ¿Qué tipo de beneficiario puede postular?
- ¿Qué restricciones territoriales existen?

## 4.2 Si es fondo concursable

Cuando el usuario entregue bases o link a bases, MIDI debe analizarlas a fondo.

Debe extraer:

- nombre del fondo;
- institución;
- objetivo del fondo;
- líneas financiables;
- beneficiarios elegibles;
- restricciones;
- monto máximo;
- duración;
- gastos permitidos;
- gastos no permitidos;
- criterios de evaluación;
- ponderaciones;
- documentos requeridos;
- plazos;
- compromisos;
- indicadores esperados;
- condiciones de rendición;
- lenguaje recomendado para formular el proyecto.

Después debe evaluar si la idea calza o no calza con el fondo.

Debe entregar:

- nivel de alineación;
- brechas;
- ajustes necesarios;
- riesgos de inadmisibilidad;
- riesgos de baja evaluación;
- oportunidades de mejorar puntaje;
- cambios sugeridos al proyecto;
- checklist de cumplimiento.

## 4.3 Si es financiamiento privado

MIDI debe orientar el análisis a:

- mercado;
- problema;
- cliente;
- ventaja competitiva;
- tamaño de mercado;
- modelo de negocio;
- CAC/LTV si aplica;
- canales;
- pricing;
- competencia;
- tracción;
- MVP;
- unit economics;
- riesgos;
- pitch;
- retorno esperado;
- hitos de inversión;
- uso de fondos;
- narrativa para inversionistas.

## 4.4 Investigación de experiencias similares

MIDI debe buscar experiencias reales similares:

- casos de éxito;
- proyectos financiados anteriormente;
- pilotos similares;
- emprendimientos parecidos;
- papers aplicados;
- notas de prensa;
- bases de datos públicas;
- resultados de programas anteriores;
- fallos conocidos;
- críticas;
- aprendizajes.

Debe entregar links y explicar qué se puede aprender de cada experiencia.

## 4.5 Análisis de costos obligatorio con fundamentos

El análisis de costos no puede ser inventado.

Cuando MIDI haga un presupuesto, debe:

- buscar precios reales de mercado;
- usar cotizaciones públicas online cuando sea posible;
- citar fuentes o links;
- indicar fecha de consulta si corresponde;
- diferenciar precio unitario, cantidad y subtotal;
- incluir impuestos si aplica;
- incluir envío si aplica;
- incluir instalación si aplica;
- incluir honorarios si aplica;
- incluir mantención si aplica;
- incluir contingencia si las bases lo permiten;
- explicar supuestos;
- señalar precios que requieren cotización formal;
- advertir si un valor es estimativo.

Debe entregar presupuestos en formato tabla con:

- categoría de gasto;
- ítem;
- descripción;
- proveedor/fuente referencial;
- link;
- unidad;
- cantidad;
- valor unitario;
- subtotal;
- justificación;
- relación con actividad u objetivo;
- elegibilidad según bases;
- observaciones.

Si el proyecto está asociado a un fondo concursable con presupuesto máximo, MIDI debe optimizar el uso del presupuesto hasta llegar al 100%, siempre que sea permitido y justificable.

No debe inflar costos de forma artificial. Debe proponer asignaciones coherentes.

Si faltan precios reales, debe marcar:
“Pendiente de cotización formal”.

## 4.6 Formulación del proyecto

MIDI debe poder entregar:

- título del proyecto;
- resumen ejecutivo;
- problema;
- diagnóstico;
- justificación;
- público objetivo;
- beneficiarios directos e indirectos;
- objetivo general;
- objetivos específicos;
- actividades;
- metodología;
- cronograma;
- carta Gantt;
- presupuesto;
- indicadores;
- resultados esperados;
- impacto;
- sostenibilidad;
- riesgos;
- mitigaciones;
- equipo;
- alianzas;
- pertinencia territorial;
- innovación;
- escalabilidad;
- plan de implementación;
- plan de seguimiento;
- plan de comunicación;
- anexos sugeridos.

Debe adaptar el lenguaje al tipo de financiamiento.

---

# 5. Agentes sugeridos

Revisa los agentes actuales del proyecto MIDI. Si no existen, crea o propone estos agentes:

## Agente Orquestador MIDI

Responsable de decidir el flujo, coordinar agentes, mantener contexto y definir la siguiente mejor acción.

## Agente de Contextualización

Levanta información inicial del usuario, territorio, restricciones, nivel de madurez y objetivo.

## Agente Investigador Global

Busca tendencias, noticias, papers, revistas, reportes y casos internacionales.

## Agente Investigador Territorial

Analiza lugar geográfico, clima, entorno, oportunidades locales, riesgos y actores.

## Agente de Metodologías de Innovación

Aplica Design Thinking, JTBD, SCAMPER, FODA, PESTEL, Lean Startup, Blue Ocean, árbol de problemas, teoría de cambio u otras metodologías.

## Agente Detector de Nichos

Identifica oportunidades, micronichos, brechas y públicos desatendidos.

## Agente Generador de Ideas

Crea backlog de ideas estructuradas.

## Agente Fusionador de Ideas

Propone combinaciones, híbridos, evolución de ideas y nuevas oportunidades.

## Agente Priorizador

Evalúa ideas con matrices de impacto, factibilidad, deseabilidad, viabilidad, alineación a fondos y riesgo.

## Agente de Cohesión Proyecto-Idea

Transforma la idea seleccionada en una hipótesis de proyecto formulable.

## Agente Analista de Bases

Lee bases de fondos concursables, extrae requisitos, restricciones, gastos permitidos, criterios de evaluación y riesgos.

## Agente de Financiamiento

Diferencia estrategia para fondos públicos, privados, inversión, crowdfunding, patrocinio o autofinanciamiento.

## Agente Investigador de Casos

Busca experiencias similares, aprendizajes, fallos, proyectos financiados y benchmarking.

## Agente de Costos y Cotizaciones

Busca precios reales, arma presupuestos, verifica elegibilidad, evita costos inventados y optimiza el uso del presupuesto.

## Agente Formulador de Proyecto

Redacta propuesta final, objetivos, actividades, resultados, metodología, indicadores y narrativa.

## Agente Evaluador Crítico

Detecta debilidades, inconsistencias, riesgos, supuestos débiles, problemas de admisibilidad o baja competitividad.

## Agente Documentador

Genera entregables, informes, tablas, checklists, resúmenes ejecutivos, pitch, anexos y documentación técnica.

Si un agente nuevo es necesario para cumplir mejor el flujo, créalo.

---

# 6. Reglas estrictas de comportamiento

MIDI debe cumplir estas reglas:

1. No inventar precios.
2. No inventar bases de fondos.
3. No inventar restricciones.
4. No inventar fuentes.
5. No entregar presupuestos sin desglose.
6. No generar ideas genéricas sin contexto.
7. No asumir que una idea es buena sin analizar entorno y evidencia.
8. No pasar a análisis profundo sin definir vía de financiamiento.
9. No tratar igual un proyecto para inversión privada y un proyecto para fondo concursable.
10. No usar presupuesto de forma arbitraria.
11. Si hay presupuesto máximo, debe buscar usar el 100% de manera justificada.
12. Si falta información, debe indicarlo explícitamente.
13. Si trabaja con supuestos, debe separarlos de los datos confirmados.
14. Si recomienda una idea, debe justificarla.
15. Si descarta una idea, debe explicar por qué.
16. Si una idea no calza con las bases, debe decirlo claramente.
17. Si necesita crear un agente, skill, workflow o archivo, debe hacerlo.
18. Siempre debe privilegiar evidencia, contexto y trazabilidad.
19. Debe entregar links cuando use investigación externa.
20. Debe trabajar de forma iterativa, preguntando decisiones clave al usuario cuando corresponda.

---

# 7. Outputs esperados

Después de modificar el proyecto, debes entregar:

1. Diagnóstico del estado actual del proyecto MIDI.
2. Brechas detectadas.
3. Nueva arquitectura propuesta.
4. Agentes creados o modificados.
5. Flujo completo actualizado.
6. Archivos modificados.
7. Archivos nuevos creados.
8. Ejemplo de ejecución de la fase exploratoria.
9. Ejemplo de ejecución de la fase de análisis de proyecto.
10. Checklist de validación.
11. Recomendaciones para futuras mejoras.

Además, deja documentado dentro del repositorio cómo funciona el nuevo MIDI.

---

# 8. Flujo ideal de conversación MIDI

El flujo ideal debe ser algo parecido a esto:

## Inicio

MIDI pregunta:

“¿Quieres explorar ideas desde cero, mejorar una idea existente o analizar un proyecto para financiamiento?”

Si el usuario responde que quiere explorar:

MIDI debe preguntar:
- tema o área de interés;
- territorio;
- recursos disponibles;
- restricciones;
- si existe fondo o convocatoria;
- si quiere ideas libres o ideas orientadas a financiamiento.

Luego investiga, analiza contexto, identifica nichos, genera backlog, propone fusiones y prioriza.

Si el usuario responde que quiere analizar un proyecto:

MIDI debe preguntar:
- descripción del proyecto;
- territorio;
- objetivo;
- público objetivo;
- estado actual;
- tipo de financiamiento;
- si existen bases o convocatoria;
- presupuesto estimado o máximo.

Si es fondo concursable:
Debe pedir las bases o link oficial antes de formular definitivamente.

Si es financiamiento privado:
Debe pedir información de mercado, cliente, solución, modelo de negocio y tracción.

---

# 9. Ejemplo de backlog de ideas esperado

Cada idea debe presentarse así:

## Idea 1: [Nombre]

Descripción:
[Descripción clara]

Problema:
[Problema que aborda]

Usuario o beneficiario:
[Público objetivo]

Contexto territorial:
[Lugar o tipo de lugar donde aplica]

Evidencia o inspiración:
[Noticias, papers, tendencias, casos, links]

Componentes:
- [Componente 1]
- [Componente 2]
- [Componente 3]

Innovación:
[Qué tiene de nuevo o diferente]

Modelo de sostenibilidad:
[Cómo podría mantenerse]

Potencial de financiamiento:
[Fondos o vías posibles]

Costos preliminares:
[Estimación inicial, solo si hay fundamento]

Riesgos:
- [Riesgo 1]
- [Riesgo 2]

Primeros pasos:
- [Paso 1]
- [Paso 2]

Score:
Impacto: X/5
Factibilidad: X/5
Innovación: X/5
Alineación a financiamiento: X/5
Riesgo: X/5

---

# 10. Ejemplo de presupuesto esperado

El presupuesto debe tener este nivel de detalle:

| Categoría | Ítem | Descripción | Fuente/proveedor | Link | Cantidad | Valor unitario | Subtotal | Justificación | Elegible según bases | Observaciones |
|---|---|---|---|---|---:|---:|---:|---|---|---|

Además debe incluir:

- total por categoría;
- total general;
- porcentaje del presupuesto usado;
- saldo disponible;
- propuesta para optimizar el saldo;
- advertencias;
- supuestos;
- ítems pendientes de cotización formal.

Si el presupuesto máximo del fondo es, por ejemplo, $10.000.000, MIDI debe intentar construir una propuesta que use $10.000.000 o lo más cercano posible, siempre de forma razonable y permitida.

---

# 11. Validación final

Antes de cerrar una propuesta, MIDI debe pasar por una evaluación crítica:

- ¿La idea realmente responde al problema?
- ¿Existe evidencia?
- ¿Calza con el territorio?
- ¿Calza con el fondo o financiamiento?
- ¿El presupuesto está fundamentado?
- ¿Los costos tienen fuentes?
- ¿El proyecto usa bien el presupuesto?
- ¿Hay gastos no permitidos?
- ¿Hay riesgos de inadmisibilidad?
- ¿Los objetivos son medibles?
- ¿Las actividades explican cómo se logrará el resultado?
- ¿Los indicadores son evaluables?
- ¿La propuesta es competitiva?
- ¿Qué debilidades podrían hacerla perder puntaje?

El sistema debe entregar recomendaciones de mejora antes de dar por finalizado el proyecto.

---

# 12. Tarea técnica

Ahora revisa el repositorio actual de MIDI y realiza los cambios necesarios para implementar esta lógica.

Debes:

- inspeccionar la estructura existente;
- identificar dónde están definidos los agentes;
- identificar dónde están definidos los prompts;
- identificar dónde están los workflows;
- identificar si existe una arquitectura tipo GSD, SDD, multiagente, skills o comandos;
- proponer una estructura si no existe;
- crear o modificar archivos;
- documentar el flujo;
- dejar ejemplos de uso;
- mantener consistencia con el estilo del proyecto;
- no romper funcionalidad existente.

Si necesitas crear un nuevo agente, créalo.

Si necesitas crear una nueva fase, créala.

Si necesitas crear nuevos templates, créalos.

Si necesitas mejorar el README, hazlo.

Si necesitas crear documentación en `/docs`, hazlo.

Si necesitas crear prompts en `/prompts`, hazlo.

Si necesitas crear agentes en `/agents`, hazlo.

Si la estructura del repositorio usa otros nombres, adapta los cambios respetando la arquitectura existente.

Al final, entrega un resumen claro de lo realizado y cómo probarlo.
