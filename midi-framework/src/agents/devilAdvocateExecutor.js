/**
 * Devil Advocate Agent Executor
 * Critiques ideas across 12 dimensions and generates verdict
 */

import fs from 'fs-extra';
import path from 'path';
import { logger } from '../cli/logger.js';
import { fileExists, writeFile } from '../utils/fileSystem.js';

// 12 critique dimensions
const CRITIQUE_DIMENSIONS = [
  {
    id: 'problema_real',
    name: 'Problema Real',
    questions: [
      '¿El problema existe REALMENTE o es una suposición?',
      '¿Es SUFICIENTEMENTE IMPORTANTE como para pagar por resolverlo?',
      '¿Hay EVIDENCIA del problema o solo intuición?'
    ]
  },
  {
    id: 'solucion',
    name: 'Solución',
    questions: [
      '¿Resuelve REALMENTE el problema?',
      '¿Es la MEJOR solución disponible?',
      '¿Por qué alguien elegiría ESTA solución?'
    ]
  },
  {
    id: 'mercado',
    name: 'Mercado',
    questions: [
      '¿El mercado es SUFICIENTEMENTE GRANDE?',
      '¿Es ACCESIBLE para ti?',
      '¿Por qué los competidores NO han capturado este mercado?'
    ]
  },
  {
    id: 'competencia',
    name: 'Competencia',
    questions: [
      '¿Pueden COPIARTE fácilmente?',
      '¿Qué ventaja tienes que NO puedan replicar?',
      '¿Por qué no han hecho algo similar?'
    ]
  },
  {
    id: 'innovacion',
    name: 'Innovación',
    questions: [
      '¿Es REALMENTE innovador?',
      '¿Qué lo hace diferente?',
      '¿Por qué es mejor que lo existente?'
    ]
  },
  {
    id: 'factibilidad',
    name: 'Factibilidad',
    questions: [
      '¿Puedes EJECUTARLO con los recursos que tienes?',
      '¿Qué habilidades te FALTAN?',
      '¿Cuánto tiempo REALMENTE tomará?'
    ]
  },
  {
    id: 'finanzas',
    name: 'Finanzas',
    questions: [
      '¿Es RENTABLE?',
      '¿Cuándo RECUPERAS la inversión?',
      '¿Los supuestos financieros son REALISTAS?'
    ]
  },
  {
    id: 'legal',
    name: 'Legal',
    questions: [
      '¿Hay RIESGOS LEGALES?',
      '¿Qué permisos NECESITAS?',
      '¿Puedes OPERAR legalmente?'
    ]
  },
  {
    id: 'equipo',
    name: 'Equipo',
    questions: [
      '¿TIENES las habilidades necesarias?',
      '¿Depende SOLO de ti?',
      '¿Qué pasa si te enfermas/abandonas?'
    ]
  },
  {
    id: 'timing',
    name: 'Timing',
    questions: [
      '¿Es el MOMENTO correcto?',
      '¿El mercado está LISTO?',
      '¿Por qué ahora y no en 2 años?'
    ]
  },
  {
    id: 'narrativa',
    name: 'Narrativa',
    questions: [
      '¿Se ENTIENDE la idea?',
      '¿CONVENCE el pitch?',
      '¿Es MEMORABLE?'
    ]
  },
  {
    id: 'postulabilidad',
    name: 'Postulabilidad',
    questions: [
      '¿Puedes POSTULAR a fondos?',
      '¿CUMPLES los requisitos?',
      '¿Hay fondos DISPONIBLES?'
    ]
  }
];

// Verdict options
const VERDICT_OPTIONS = [
  {
    id: 'CONTINUAR',
    condition: 'Todos los riesgos son mitigables y el proyecto tiene fundamento sólido',
    template: `✅ RECOMENDACIÓN: CONTINUAR

El proyecto es VIABLE con las siguientes condiciones:
{conditions}

Riesgos identificados son MANEJABLES.`
  },
  {
    id: 'ITERAR',
    condition: 'Hay debilidades significativas pero recuperables',
    template: `⚠️ RECOMENDACIÓN: ITERAR

El proyecto tiene DEBILIDADES que deben resolverse ANTES de continuar:

PRIORIDAD 1 (Alto):
{priority_high}

PRIORIDAD 2 (Importante):
{priority_medium}

NO continuar hasta resolver las prioridades 1.`
  },
  {
    id: 'FUSIONAR',
    condition: 'La idea es buena pero tiene fallas estructurales que otra idea complementa',
    template: `⚠️ RECOMENDACIÓN: FUSIONAR

Esta idea tiene FORTALEZAS pero también DEBILIDADES críticas.
Se recomienda fusionar con otra idea del Top 3 porque:
{reasons}`
  },
  {
    id: 'PAUSAR',
    condition: 'Hay bloqueadores externos que impiden continuar ahora',
    template: `⏸️ RECOMENDACIÓN: PAUSAR

El proyecto tiene BLOQUEADORES que impiden continuar:
{blockers}

Recomendación: Pausar hasta {resume_condition}.`
  },
  {
    id: 'DESCARTAR',
    condition: 'Los riesgos son demasiado altos o el modelo no es viable',
    template: `❌ RECOMENDACIÓN: DESCARTAR

El proyecto NO ES VIABLE en su estado actual por:
{reasons}

Recomendación: Volver a exploración y seleccionar otra idea del Top 3 o generar nuevas ideas.`
  }
];

/**
 * Execute Devil Advocate Agent
 * @param {Object} context - Execution context with project data
 * @returns {Object} Execution result with devil report
 */
export async function executeDevilAdvocate(context = {}) {
  const projectPath = context.projectPath || process.cwd();
  const errors = [];
  const warnings = [];
  
  logger.info('Executing Devil Advocate Agent...');
  
  try {
    // Load project data
    const projectData = await loadProjectData(projectPath);
    
    if (!projectData.selectedIdea) {
      throw new Error('No hay idea seleccionada para analizar');
    }
    
    // Execute critique for all dimensions
    const critiques = critiqueAllDimensions(projectData);
    
    // Identify risks
    const risks = identifyRisks(critiques, projectData);
    
    // Generate verdict
    const verdict = generateVerdict(critiques, risks);
    
    // Generate devil report
    const devilReport = generateDevilReportMd(projectData, critiques, risks, verdict);
    
    // Write output
    const outputDir = path.join(projectPath, 'midi-project', '06_devil_advocate');
    await fs.ensureDir(outputDir);
    
    const outputPath = path.join(outputDir, 'devil_report.md');
    await writeFile(outputPath, devilReport);
    
    logger.success('Generated devil_report.md');
    
    // Update RISK_REGISTER.md
    await updateRiskRegister(projectPath, risks);
    
    // Update PROJECT_STATE.md
    await updateProjectState(projectPath, verdict);
    
    return {
      success: true,
      verdict: verdict.id,
      critiques,
      risks,
      outputs: {
        'midi-project/06_devil_advocate/devil_report.md': devilReport
      },
      errors,
      warnings
    };
  } catch (error) {
    logger.error(`Devil Advocate execution failed: ${error.message}`);
    errors.push(error.message);
    
    return {
      success: false,
      errors,
      warnings
    };
  }
}

/**
 * Load project data
 */
async function loadProjectData(projectPath) {
  const data = {
    userContext: '',
    selectedIdea: '',
    riskRegister: '',
    assumptions: ''
  };
  
  // Load USER_CONTEXT
  const userContextPath = path.join(projectPath, 'midi-project', 'USER_CONTEXT.md');
  if (await fileExists(userContextPath)) {
    data.userContext = await fs.readFile(userContextPath, 'utf8');
  }
  
  // Load TOP3_IDEAS or get selected idea
  const top3Path = path.join(projectPath, 'midi-project', 'TOP3_IDEAS.md');
  if (await fileExists(top3Path)) {
    const top3Content = await fs.readFile(top3Path, 'utf8');
    // Extract first idea as selected (simplified)
    const ideaMatch = top3Content.match(/## Idea 1[^\n]*\n([\s\S]*?)(?=## Idea 2|$)/i);
    data.selectedIdea = ideaMatch ? ideaMatch[1] : top3Content.substring(0, 500);
  }
  
  // Load RISK_REGISTER
  const riskPath = path.join(projectPath, 'midi-project', 'RISK_REGISTER.md');
  if (await fileExists(riskPath)) {
    data.riskRegister = await fs.readFile(riskPath, 'utf8');
  }
  
  // Load ASSUMPTIONS
  const assumptionsPath = path.join(projectPath, 'midi-project', 'ASSUMPTIONS.md');
  if (await fileExists(assumptionsPath)) {
    data.assumptions = await fs.readFile(assumptionsPath, 'utf8');
  }
  
  return data;
}

/**
 * Critique all 12 dimensions
 */
function critiqueAllDimensions(projectData) {
  const critiques = [];
  
  for (const dimension of CRITIQUE_DIMENSIONS) {
    const critique = critiqueDimension(dimension, projectData);
    critiques.push(critique);
  }
  
  return critiques;
}

/**
 * Critique a single dimension
 */
function critiqueDimension(dimension, projectData) {
  const critique = {
    id: dimension.id,
    name: dimension.name,
    assessment: '',
    hardPoints: [],
    severity: 'Medio',
    recommendation: ''
  };
  
  // Generate critique based on dimension type
  switch (dimension.id) {
    case 'problema_real':
      critique.assessment = generateProblemaCritique(projectData);
      critique.severity = 'Alto';
      break;
    case 'solucion':
      critique.assessment = generateSolucionCritique(projectData);
      break;
    case 'mercado':
      critique.assessment = generateMercadoCritique(projectData);
      critique.severity = 'Alto';
      break;
    case 'competencia':
      critique.assessment = generateCompetenciaCritique(projectData);
      break;
    case 'innovacion':
      critique.assessment = generateInnovacionCritique(projectData);
      break;
    case 'factibilidad':
      critique.assessment = generateFactibilidadCritique(projectData);
      critique.severity = 'Alto';
      break;
    case 'finanzas':
      critique.assessment = generateFinanzasCritique(projectData);
      critique.severity = 'Alto';
      break;
    case 'legal':
      critique.assessment = generateLegalCritique(projectData);
      critique.severity = 'Medio';
      break;
    case 'equipo':
      critique.assessment = generateEquipoCritique(projectData);
      critique.severity = 'Medio';
      break;
    case 'timing':
      critique.assessment = generateTimingCritique(projectData);
      break;
    case 'narrativa':
      critique.assessment = generateNarrativaCritique(projectData);
      break;
    case 'postulabilidad':
      critique.assessment = generatePostulabilidadCritique(projectData);
      break;
    default:
      critique.assessment = `[Pendiente análisis detallado de ${dimension.name}]`;
  }
  
  // Generate hard points
  critique.hardPoints = generateHardPoints(dimension, critique.assessment);
  
  // Generate recommendation
  critique.recommendation = generateRecommendation(dimension, critique);
  
  return critique;
}

/**
 * Generate critique for Problema Real dimension
 */
function generateProblemaCritique(projectData) {
  const hasValidation = projectData.userContext.includes('validado') || 
                        projectData.userContext.includes('entrevistas');
  
  if (!hasValidation) {
    return `⚠️ PROBLEMA NO VALIDADO

El problema que dices resolver NO está validado.
- No hay evidencia de que el segmento sufra este problema específicamente
- Las suposiciones sobre el dolor del cliente no han sido verificadas
- No hay datos de mercado que respalden la existencia del problema

**RECOMENDACIÓN:** Validar el problema con mínimo 30 entrevistas antes de continuar.`;
  }
  
  return `✅ PROBLEMA PARCIALMENTE VALIDADO

El problema tiene algunos indicios de existencia:
- Existe documentación inicial del problema
- Se requiere mayor validación para confirmar magnitud

**RECOMENDACIÓN:** Continuar con más validación mientras se avanza en otras áreas.`;
}

/**
 * Generate critique for Solución dimension
 */
function generateSolucionCritique(projectData) {
  return `⚠️ SOLUCIÓN REQUIERE VALIDACIÓN

La solución propuesta necesita más desarrollo:
- No está claro si resuelve completamente el problema identificado
- Existen posibles soluciones alternativas más simples
- No hay demostración de que la solución funcione

**RECOMENDACIÓN:** Desarrollar MVP para validar que los clientes prefieren esta solución.`;
}

/**
 * Generate critique for Mercado dimension
 */
function generateMercadoCritique(projectData) {
  return `⚠️ MERCADO REQUIERE ANÁLISIS PROFUNDO

El tamaño de mercado necesita verificación:
- El TAM/SAM/SOM debe ser calculado con datos actuales
- No hay evidencia clara de willingness to pay
- El segmento debe estar mejor definido

**RECOMENDACIÓN:** Rehacer análisis de mercado con datos específicos y validación de disposición a pagar.`;
}

/**
 * Generate critique for Competencia dimension
 */
function generateCompetenciaCritique(projectData) {
  return `⚠️ VENTAJA COMPETITIVA CUESTIONABLE

No hay clara ventaja defendible:
- Los competidores pueden replicar fácilmente
- No hay propiedad intelectual identificada
- No hay "unfair advantage" clara

**RECOMENDACIÓN:** Identificar y desarrollar ventaja que sea difícil de copiar.`;
}

/**
 * Generate critique for Innovación dimension
 */
function generateInnovacionCritique(projectData) {
  return `✅ INNOVACIÓN MODERADA

La innovación es incremental:
- Mejora sobre soluciones existentes
- No es disruptiva pero agrega valor
- La diferenciación requiere comunicación clara

**RECOMENDACIÓN:** Clarificar y comunicar la propuesta de valor única.`;
}

/**
 * Generate critique for Factibilidad dimension
 */
function generateFactibilidadCritique(projectData) {
  const hasTeam = projectData.userContext.includes('equipo') && 
                  !projectData.userContext.toLowerCase().includes('sin equipo');
  
  if (!hasTeam) {
    return `⚠️ FACTIBILIDAD DUDOSA

El proyecto tiene gaps de ejecución:
- Falta expertise clave en el equipo
- El timeline puede estar subestimado
- Los recursos disponibles son limitados

**RECOMENDACIÓN:** Conseguir cofundador con habilidades complementarias o reducir scope.`;
  }
  
  return `✅ FACTIBILIDAD MODERADA

El proyecto es técnicamente posible:
- Requiere esfuerzo de ejecución significativo
- Hay dependencias que deben gestionarse
- El equipo tiene capacidades base

**RECOMENDACIÓN:** Desarrollar plan de ejecución detallado con hitos.`;
}

/**
 * Generate critique for Finanzas dimension
 */
function generateFinanzasCritique(projectData) {
  return `⚠️ PROYECCIONES REQUIEREN VALIDACIÓN

Los supuestos financieros necesitan respaldo:
- Las proyecciones de ingresos son optimistas
- El CAC debe ser calculado con benchmarks
- No hay plan de financiamiento claro para los primeros 18 meses

**RECOMENDACIÓN:** Rehacer proyecciones con supuestos conservadores y documentar claramente cada supuesto.`;
}

/**
 * Generate critique for Legal dimension
 */
function generateLegalCritique(projectData) {
  return `⚠️ REVISIÓN LEGAL PENDIENTE

Se requiere análisis legal:
- Identificar permisos y licencias necesarias
- Revisar regulaciones sectoriales aplicables
- Evaluar estructura legal óptima

**RECOMENDACIÓN:** Consultar con abogado especializado en el sector.`;
}

/**
 * Generate critique for Equipo dimension
 */
function generateEquipoCritique(projectData) {
  return `⚠️ EQUIPO INCOMPLETO

El equipo tiene gaps:
- No hay cofundador identificado
- Hay dependencia excesiva del fundador
- Riesgo de "bus factor" = 1

**RECOMENDACIÓN:** Conseguir cofundador o segundo ejecutor clave antes de escalar.`;
}

/**
 * Generate critique for Timing dimension
 */
function generateTimingCritique(projectData) {
  return `✅ TIMING APROPIADO

El momento parece favorable:
- El mercado muestra interés creciente
- Las condiciones generales son propicias
- Hay ventana de oportunidad

**RECOMENDACIÓN:** Ejecutar rápidamente para capturar la oportunidad.`;
}

/**
 * Generate critique for Narrativa dimension
 */
function generateNarrativaCritique(projectData) {
  return `⚠️ NARRATICA MEJORABLE

La historia del proyecto necesita trabajo:
- El pitch puede ser más claro
- Falta un "hook" memorable
- El problema-solución debe simplificarse

**RECOMENDACIÓN:** Rehacer pitch con estructura clara: problema → solución → propuesta de valor.`;
}

/**
 * Generate critique for Postulabilidad dimension
 */
function generatePostulabilidadCritique(projectData) {
  const buscaFondos = projectData.userContext.includes('fondos') || 
                      projectData.userContext.includes('CORFO');
  
  if (buscaFondos) {
    return `⚠️ POSTULABILIDAD REQUIERE PREPARACIÓN

El proyecto puede postular a fondos pero necesita preparación:
- Verificar requisitos de elegibilidad específicos
- Preparar documentación requerida
- Revisar ventanas de postulación

**RECOMENDACIÓN:** Preparar postulación con 2-3 meses de anticipación.`;
  }
  
  return `✅ NO APLICA POSTULACIÓN

El proyecto no busca fondos actualmente:
- Modelo autofinanciado o bootstrapping
- Evaluar si en el futuro quiere buscar financiamiento externo

**RECOMENDACIÓN:** Continuar con ejecución y reevaluar financiamiento según progreso.`;
}

/**
 * Generate hard language points
 */
function generateHardPoints(dimension, assessment) {
  const points = [];
  
  if (assessment.includes('NO VALIDADO') || assessment.includes('NO ESTÁ VALIDADO')) {
    points.push('PODRÍA FRACASAR por falta de validación del problema');
  }
  
  if (assessment.includes('DUDOSA') || assessment.includes('CUESTIONABLE')) {
    points.push('RIESGO ALTO de no poder ejecutar');
  }
  
  if (assessment.includes('REQUIERE') || assessment.includes('NECESITA')) {
    points.push('Supuesto más DÉBIL identificado');
  }
  
  if (points.length === 0) {
    points.push('Dimensión con riesgos manejables');
  }
  
  return points;
}

/**
 * Generate recommendation for dimension
 */
function generateRecommendation(dimension, critique) {
  if (critique.severity === 'Alto') {
    return `Acción inmediata requerida para ${dimension.name}`;
  }
  return `Monitorear y planear mejoras en ${dimension.name}`;
}

/**
 * Identify risks from critiques
 */
function identifyRisks(critiques, projectData) {
  const risks = [];
  let riskCounter = 1;
  
  for (const critique of critiques) {
    if (critique.severity === 'Alto' || critique.assessment.includes('⚠️')) {
      risks.push({
        id: `RIESGO-${String(riskCounter).padStart(3, '0')}`,
        name: `Riesgo en ${critique.name}`,
        category: getCategoryForDimension(critique.id),
        description: critique.hardPoints[0] || `Riesgo identificado en ${critique.name}`,
        probability: critique.severity === 'Alto' ? 'Alta' : 'Media',
        impact: critique.severity === 'Alto' ? 'Alto' : 'Medio',
        severity: critique.severity,
        mitigation: critique.recommendation,
        detectedBy: 'midi-devil-advocate-agent',
        status: 'Activo'
      });
      riskCounter++;
    }
  }
  
  return risks;
}

/**
 * Get risk category for dimension
 */
function getCategoryForDimension(dimensionId) {
  const categoryMap = {
    problema_real: 'Mercado',
    solucion: 'Mercado',
    mercado: 'Mercado',
    competencia: 'Mercado',
    innovacion: 'Mercado',
    factibilidad: 'Técnico',
    finanzas: 'Financiero',
    legal: 'Legal',
    equipo: 'Operacional',
    timing: 'Externo',
    narrativa: 'Mercado',
    postulabilidad: 'Financiero'
  };
  
  return categoryMap[dimensionId] || 'Otro';
}

/**
 * Generate verdict based on critiques
 */
function generateVerdict(critiques, risks) {
  const highSeverityCount = critiques.filter(c => c.severity === 'Alto').length;
  const riskCount = risks.length;
  
  // Determine verdict based on analysis
  if (highSeverityCount === 0 && riskCount <= 2) {
    return {
      id: 'CONTINUAR',
      conditions: [
        'Validar problema con clientes',
        'Desarrollar MVP para prueba de concepto',
        'Documentar supuestos claramente'
      ]
    };
  }
  
  if (highSeverityCount <= 2 && riskCount <= 4) {
    return {
      id: 'ITERAR',
      priority_high: risks.filter(r => r.severity === 'Alto').map(r => `- ${r.description}: ${r.mitigation}`),
      priority_medium: risks.filter(r => r.severity !== 'Alto').map(r => `- ${r.description}: ${r.mitigation}`)
    };
  }
  
  if (highSeverityCount <= 3 && riskCount <= 6) {
    return {
      id: 'FUSIONAR',
      reasons: [
        'La idea tiene mérito pero debilidades significativas',
        'Combinar con otra idea del Top 3 podría fortalecerla',
        'Revisar IDEA_BACKLOG para alternativas'
      ]
    };
  }
  
  if (riskCount > 6) {
    return {
      id: 'DESCARTAR',
      reasons: [
        'Demasiados riesgos altos identificados',
        'El modelo no es viable en estado actual',
        'Recomendación: volver a exploración'
      ]
    };
  }
  
  return {
    id: 'PAUSAR',
    blockers: risks.filter(r => r.severity === 'Alto').map(r => `- ${r.description}`),
    resume_condition: 'los bloqueadores críticos sean resueltos'
  };
}

/**
 * Generate devil_report.md content
 */
function generateDevilReportMd(projectData, critiques, risks, verdict) {
  const today = new Date().toISOString().split('T')[0];
  
  let markdown = `# Devil Advocate Report

## ⚠️ OBLIGATORY CRITIQUE

**Este reporte es OBLIGATORIO antes de declarar el proyecto viable.**
**No puede ser omitido ni suavizado.**

---

## Información del Proyecto
- **Idea:** ${projectData.selectedIdea?.substring(0, 100) || 'Idea seleccionada'}...
- **Fecha de análisis:** ${today}
- **Analista:** midi-devil-advocate-agent

---

## Crítica por Dimensión

`;

  // Add each dimension critique
  for (const critique of critiques) {
    markdown += `### ${critiques.indexOf(critique) + 1}. ${critique.name}

${critique.assessment}

**Puntos críticos:**
${critique.hardPoints.map(p => `- ${p}`).join('\n')}

**Recomendación:** ${critique.recommendation}

---

`;
  }

  // Add risks section
  markdown += `## Riesgos Altos Identificados

| Riesgo | Severidad | Urgencia | Acción requerida |
|--------|-----------|----------|------------------|
${risks.map(r => `| ${r.name} | ${r.severity} | ${r.probability === 'Alta' ? 'Inmediata' : 'Media'} | ${r.mitigation.substring(0, 50)}... |`).join('\n')}

---

## Supuestos No Validados

| Supuesto | Criticidad | Cómo validar | Por qué es riesgoso |
|----------|------------|--------------|---------------------|
| Problema existe | Alto | Entrevistas con clientes | Sin validación, no hay demanda real |
| Clientes pagan | Alto | Willingness to pay research | Sin ingresos, no hay negocio |
| Modelo escalable | Medio | Análisis de unit economics | Puede no ser rentable a escala |

---

## VEREDICTO FINAL

### ${verdict.id}

`;

  // Add verdict-specific content
  if (verdict.id === 'CONTINUAR') {
    markdown += `**Justificación:**
El proyecto tiene fundamento con riesgos manejables.

**Condiciones para continuar:**
${verdict.conditions.map((c, i) => `${i + 1}. ${c}`).join('\n')}
`;
  } else if (verdict.id === 'ITERAR') {
    markdown += `**Justificación:**
El proyecto tiene debilidades recuperables que deben resolverse.

**Prioridades inmediatas:**
${verdict.priority_high?.join('\n') || '- Resolver riesgos altos'}

**No continuar hasta:**
- Resolver las prioridades 1
- Validar supuestos críticos
`;
  } else if (verdict.id === 'DESCARTAR') {
    markdown += `**Justificación:**
${verdict.reasons?.join('\n') || 'Los riesgos son demasiado altos'}
`;
  }

  markdown += `

---

## Próximo Paso Obligatorio

- [${verdict.id === 'CONTINUAR' ? 'x' : ' '}] Si CONTINUAR: Pasar a evaluator-agent
- [${verdict.id === 'ITERAR' ? 'x' : ' '}] Si ITERAR: Resolver issues y volver a devil-advocate
- [${verdict.id === 'FUSIONAR' ? 'x' : ' '}] Si FUSIONAR: Volver a hybridization-agent
- [${verdict.id === 'PAUSAR' ? 'x' : ' '}] Si PAUSAR: Esperar condición y re-evaluar
- [${verdict.id === 'DESCARTAR' ? 'x' : ' '}] Si DESCARTAR: Volver a exploración

---

*Generado por midi-devil-advocate-agent*
**⚠️ Este reporte es MANDATORIO. No puede ser omitido.**
`;

  return markdown;
}

/**
 * Update RISK_REGISTER.md
 */
async function updateRiskRegister(projectPath, risks) {
  const riskPath = path.join(projectPath, 'midi-project', 'RISK_REGISTER.md');
  
  let content = `# RISK REGISTER

## Información del Proyecto
- **Fecha de actualización:** ${new Date().toISOString().split('T')[0]}
- **Total de riesgos:** ${risks.length}
- **Altos:** ${risks.filter(r => r.severity === 'Alto').length}
- **Medios:** ${risks.filter(r => r.severity === 'Medio').length}
- **Bajos:** ${risks.filter(r => r.severity === 'Bajo').length}

---

## Resumen de Riesgos

| Categoría | Altos | Medios | Bajos | Total |
|-----------|-------|--------|-------|-------|
${generateRiskSummaryTable(risks)}

---

## Riesgos Detallados

`;

  risks.forEach(risk => {
    content += `### ${risk.id}: ${risk.name}

**Categoría:** ${risk.category}

**Descripción:**
${risk.description}

**Probabilidad:** ${risk.probability}

**Impacto:** ${risk.impact}

**Severidad:** ${risk.severity}

**Detectado por:** ${risk.detectedBy}

**Plan de Mitigación:**
${risk.mitigation}

**Estado:** ${risk.status}

---

`;
  });

  content += `*Actualizado por midi-devil-advocate-agent*
*Fecha: ${new Date().toISOString().split('T')[0]}*
`;

  await writeFile(riskPath, content);
  logger.info('Updated RISK_REGISTER.md');
}

/**
 * Generate risk summary table
 */
function generateRiskSummaryTable(risks) {
  const categories = ['Mercado', 'Técnico', 'Financiero', 'Legal', 'Operacional', 'Externo'];
  
  return categories.map(cat => {
    const catRisks = risks.filter(r => r.category === cat);
    const altos = catRisks.filter(r => r.severity === 'Alto').length;
    const medios = catRisks.filter(r => r.severity === 'Medio').length;
    const bajos = catRisks.filter(r => r.severity === 'Bajo').length;
    return `| ${cat} | ${altos} | ${medios} | ${bajos} | ${catRisks.length} |`;
  }).join('\n');
}

/**
 * Update PROJECT_STATE.md
 */
async function updateProjectState(projectPath, verdict) {
  const statePath = path.join(projectPath, 'midi-project', 'PROJECT_STATE.md');
  
  if (await fileExists(statePath)) {
    let content = await fs.readFile(statePath, 'utf8');
    
    // Mark devil advocate as complete
    content = content.replace(
      /- \[ \] Devil advocate/g,
      '- [x] Devil advocate'
    );
    
    await writeFile(statePath, content);
    logger.info('Updated PROJECT_STATE.md');
  }
}

/**
 * Get critique dimensions
 */
export function getCritiqueDimensions() {
  return CRITIQUE_DIMENSIONS;
}

/**
 * Get verdict options
 */
export function getVerdictOptions() {
  return VERDICT_OPTIONS;
}

export default executeDevilAdvocate;
