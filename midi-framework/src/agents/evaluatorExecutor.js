/**
 * Evaluator Agent Executor
 * Scores project using scoring-rubric.json dimensions
 */

import fs from 'fs-extra';
import path from 'path';
import { logger } from '../cli/logger.js';
import { fileExists, writeFile, readJson } from '../utils/fileSystem.js';

// Default scoring dimensions (from scoring-rubric.json)
const DEFAULT_DIMENSIONS = {
  problema: { weight: 8, description: 'Claridad y relevancia del problema' },
  solucion: { weight: 8, description: 'Calidad y pertinencia de la solución' },
  innovacion: { weight: 10, description: 'Nivel de innovación y diferenciación' },
  mercado: { weight: 10, description: 'Tamaño y características del mercado' },
  modelo_de_negocio: { weight: 10, description: 'Claridad del modelo de ingresos' },
  factibilidad_tecnica: { weight: 8, description: 'Viabilidad técnica de implementación' },
  factibilidad_financiera: { weight: 12, description: 'Viabilidad financiera y supuestos' },
  legal_tributario: { weight: 8, description: 'Cumplimiento legal y tributario' },
  impacto: { weight: 6, description: 'Impacto social/ambiental/económico' },
  escalabilidad: { weight: 6, description: 'Capacidad de crecer sin perder eficiencia' },
  equipo_encaje: { weight: 5, description: 'Fit entre habilidades y requerimientos' },
  narrativa: { weight: 5, description: 'Calidad de la historia y comunicación' },
  postulabilidad: { weight: 4, description: 'Capacidad de postular a fondos' }
};

// Thresholds for classification
const THRESHOLDS = {
  EXCELENTE: 85,
  BUENO: 70,
  REGULAR: 55,
  DEBIL: 40
};

/**
 * Execute Evaluator Agent
 * @param {Object} context - Execution context with project data
 * @returns {Object} Execution result with evaluator scorecard
 */
export async function executeEvaluator(context = {}) {
  const projectPath = context.projectPath || process.cwd();
  const errors = [];
  const warnings = [];
  
  logger.info('Executing Evaluator Agent...');
  
  try {
    // Load scoring rubric
    const rubric = await loadScoringRubric(projectPath);
    const dimensions = rubric?.financeable_project_score?.dimensions || DEFAULT_DIMENSIONS;
    
    // Load project data
    const projectData = await loadProjectData(projectPath);
    
    // Check for mandatory files
    if (!projectData.riskRegister) {
      throw new Error('Cannot evaluate without risk assessment. Run risk-agent first.');
    }
    
    // Extract risk level
    const riskLevel = extractRiskLevel(projectData.riskRegister);
    
    // Score each dimension
    const scores = scoreAllDimensions(projectData, dimensions);
    
    // Calculate base score
    const baseScore = calculateBaseScore(scores, dimensions);
    
    // Apply risk modifier
    const riskModifier = calculateRiskModifier(riskLevel);
    const finalScore = Math.max(0, Math.min(100, baseScore + riskModifier));
    
    // Determine classification
    const classification = determineClassification(finalScore);
    
    // Identify strengths and weaknesses
    const analysis = analyzeScores(scores, dimensions);
    
    // Generate evaluator scorecard
    const scorecard = generateEvaluatorScorecardMd(
      projectData,
      scores,
      dimensions,
      baseScore,
      riskModifier,
      riskLevel,
      finalScore,
      classification,
      analysis
    );
    
    // Write output
    const outputDir = path.join(projectPath, 'midi-project', '04_analysis');
    await fs.ensureDir(outputDir);
    
    const outputPath = path.join(outputDir, 'evaluator_scorecard.md');
    await writeFile(outputPath, scorecard);
    
    logger.success(`Generated evaluator_scorecard.md - Score: ${finalScore}/100`);
    
    // Update PROJECT_STATE.md
    await updateProjectState(projectPath, finalScore, classification);
    
    return {
      success: true,
      score: finalScore,
      classification: classification.classification,
      scores,
      outputs: {
        'midi-project/04_analysis/evaluator_scorecard.md': scorecard
      },
      errors,
      warnings,
      recommendation: classification.recommendation
    };
  } catch (error) {
    logger.error(`Evaluator execution failed: ${error.message}`);
    errors.push(error.message);
    
    return {
      success: false,
      errors,
      warnings
    };
  }
}

/**
 * Load scoring rubric from config
 */
async function loadScoringRubric(projectPath) {
  const rubricPath = path.join(projectPath, '.midi', 'config', 'scoring-rubric.json');
  
  if (await fileExists(rubricPath)) {
    try {
      return await readJson(rubricPath);
    } catch (error) {
      logger.warning(`Could not load scoring rubric: ${error.message}`);
    }
  }
  
  return null;
}

/**
 * Load project data
 */
async function loadProjectData(projectPath) {
  const data = {
    userContext: '',
    selectedIdea: '',
    riskRegister: '',
    devilReport: '',
    assumptions: ''
  };
  
  // Load USER_CONTEXT
  const userContextPath = path.join(projectPath, 'midi-project', 'USER_CONTEXT.md');
  if (await fileExists(userContextPath)) {
    data.userContext = await fs.readFile(userContextPath, 'utf8');
  }
  
  // Load TOP3_IDEAS
  const top3Path = path.join(projectPath, 'midi-project', 'TOP3_IDEAS.md');
  if (await fileExists(top3Path)) {
    data.selectedIdea = await fs.readFile(top3Path, 'utf8');
  }
  
  // Load RISK_REGISTER - MANDATORY
  const riskPath = path.join(projectPath, 'midi-project', 'RISK_REGISTER.md');
  if (await fileExists(riskPath)) {
    data.riskRegister = await fs.readFile(riskPath, 'utf8');
  }
  
  // Load devil_report
  const devilPath = path.join(projectPath, 'midi-project', '06_devil_advocate', 'devil_report.md');
  if (await fileExists(devilPath)) {
    data.devilReport = await fs.readFile(devilPath, 'utf8');
  }
  
  return data;
}

/**
 * Extract risk level from RISK_REGISTER
 */
function extractRiskLevel(riskRegister) {
  // Count high risks
  const highRiskMatches = riskRegister.match(/Alto/gi) || [];
  const highRiskCount = highRiskMatches.length;
  
  if (highRiskCount >= 3) {
    return { level: 'alto', count: highRiskCount, penalty: -10 };
  }
  if (highRiskCount >= 1) {
    return { level: 'medio', count: highRiskCount, penalty: -5 };
  }
  return { level: 'bajo', count: 0, penalty: 0 };
}

/**
 * Score all dimensions
 */
function scoreAllDimensions(projectData, dimensions) {
  const scores = {};
  
  for (const [key, dimension] of Object.entries(dimensions)) {
    scores[key] = scoreDimension(key, dimension, projectData);
  }
  
  return scores;
}

/**
 * Score a single dimension
 */
function scoreDimension(key, dimension, projectData) {
  // Base scoring logic - would be enhanced with actual analysis
  let score = 60; // Default moderate score
  
  const context = projectData.userContext.toLowerCase();
  const devilReport = projectData.devilReport.toLowerCase();
  
  // Adjust score based on content analysis
  switch (key) {
    case 'problema':
      if (context.includes('validado') || context.includes('entrevistas')) {
        score = 75;
      } else if (devilReport.includes('problema no validado')) {
        score = 40;
      } else {
        score = 55;
      }
      break;
      
    case 'solucion':
      if (context.includes('mvp') || context.includes('prototipo')) {
        score = 70;
      } else if (devilReport.includes('solución débil')) {
        score = 45;
      } else {
        score = 60;
      }
      break;
      
    case 'innovacion':
      if (context.includes('radical') || context.includes('disruptiv')) {
        score = 80;
      } else if (context.includes('incremental')) {
        score = 65;
      } else {
        score = 55;
      }
      break;
      
    case 'mercado':
      if (context.includes('tam') && context.includes('sam')) {
        score = 70;
      } else if (devilReport.includes('mercado sobreestimado')) {
        score = 45;
      } else {
        score = 55;
      }
      break;
      
    case 'modelo_de_negocio':
      if (context.includes('suscripción') || context.includes('saas')) {
        score = 75;
      } else if (devilReport.includes('modelo')) {
        score = 50;
      } else {
        score = 60;
      }
      break;
      
    case 'factibilidad_tecnica':
      if (context.includes('prototipo') || context.includes('desarrollado')) {
        score = 75;
      } else if (devilReport.includes('factibilidad dudosa')) {
        score = 40;
      } else {
        score = 60;
      }
      break;
      
    case 'factibilidad_financiera':
      if (context.includes('proyecciones') || context.includes('financiero')) {
        score = 65;
      } else if (devilReport.includes('proyecciones financieras')) {
        score = 45;
      } else {
        score = 55;
      }
      break;
      
    case 'legal_tributario':
      if (devilReport.includes('riesgo legal alto')) {
        score = 35;
      } else if (devilReport.includes('legal')) {
        score = 50;
      } else {
        score = 60;
      }
      break;
      
    case 'impacto':
      if (context.includes('social') || context.includes('ambiental') || context.includes('ods')) {
        score = 75;
      } else {
        score = 50;
      }
      break;
      
    case 'escalabilidad':
      if (context.includes('escalab') || context.includes('saaS') || context.includes('plataforma')) {
        score = 75;
      } else {
        score = 55;
      }
      break;
      
    case 'equipo_encaje':
      if (context.includes('cofundador') || context.includes('equipo')) {
        score = 70;
      } else if (devilReport.includes('equipo incompleto')) {
        score = 40;
      } else {
        score = 50;
      }
      break;
      
    case 'narrativa':
      if (devilReport.includes('narrativa débil')) {
        score = 45;
      } else {
        score = 60;
      }
      break;
      
    case 'postulabilidad':
      if (context.includes('fondos') || context.includes('corfo') || context.includes('startup chile')) {
        score = 70;
      } else if (context.includes('autofinanciado')) {
        score = 50;
      } else {
        score = 55;
      }
      break;
      
    default:
      score = 60;
  }
  
  // Add justification
  const justification = generateJustification(key, score, projectData);
  
  return {
    score,
    weight: dimension.weight,
    weightedScore: score * (dimension.weight / 100),
    justification
  };
}

/**
 * Generate justification for a score
 */
function generateJustification(dimension, score, projectData) {
  if (score >= 80) {
    return `${dimension}: Fuertemente fundamentado, sin debilidades significativas`;
  } else if (score >= 70) {
    return `${dimension}: Mayoritariamente sólido, algunas áreas de mejora`;
  } else if (score >= 55) {
    return `${dimension}: Debilidades identificables, requiere mejoras`;
  } else if (score >= 40) {
    return `${dimension}: Debilidades significativas, requiere revisión profunda`;
  } else {
    return `${dimension}: Fallas críticas identificadas`;
  }
}

/**
 * Calculate base score from dimension scores
 */
function calculateBaseScore(scores, dimensions) {
  let totalWeightedScore = 0;
  
  for (const [key, scoreData] of Object.entries(scores)) {
    totalWeightedScore += scoreData.weightedScore;
  }
  
  return Math.round(totalWeightedScore);
}

/**
 * Calculate risk modifier
 */
function calculateRiskModifier(riskLevel) {
  return riskLevel.penalty;
}

/**
 * Determine classification from final score
 */
function determineClassification(finalScore) {
  if (finalScore >= THRESHOLDS.EXCELENTE) {
    return {
      classification: 'EXCELENTE',
      recommendation: 'Listo para postular/ejecutar. Proyecto fuerte con alta probabilidad de éxito.',
      action: 'Proceder a aplicación o ejecución'
    };
  }
  
  if (finalScore >= THRESHOLDS.BUENO) {
    return {
      classification: 'BUENO',
      recommendation: 'Proyecto sólido con áreas de mejora menores. Iterar detalles antes de postular/ejecutar.',
      action: 'Iterar menores detalles y proceder'
    };
  }
  
  if (finalScore >= THRESHOLDS.REGULAR) {
    return {
      classification: 'REGULAR',
      recommendation: 'Proyecto con debilidades significativas. Requiere mejoras antes de ser financeable.',
      action: 'Iterar según recomendaciones específicas'
    };
  }
  
  if (finalScore >= THRESHOLDS.DEBIL) {
    return {
      classification: 'DÉBIL',
      recommendation: 'Proyecto con problemas serios. Volver a análisis profundo o considerar pivot.',
      action: 'Revisar fundamentos, posible pivot'
    };
  }
  
  return {
    classification: 'NO VIABLE',
    recommendation: 'Proyecto no viable en estado actual. Considerar descartar o reformular completamente.',
    action: 'Descartar o reformular desde cero'
  };
}

/**
 * Analyze scores to identify strengths and weaknesses
 */
function analyzeScores(scores, dimensions) {
  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1].score - a[1].score);
  
  const strengths = sortedDimensions.slice(0, 3).map(([key, data]) => ({
    dimension: key,
    score: data.score,
    description: dimensions[key]?.description || key
  }));
  
  const weaknesses = sortedDimensions.slice(-3).reverse().map(([key, data]) => ({
    dimension: key,
    score: data.score,
    description: dimensions[key]?.description || key,
    improvement: generateImprovementAction(key, data.score)
  }));
  
  return { strengths, weaknesses };
}

/**
 * Generate improvement action for a weakness
 */
function generateImprovementAction(dimension, score) {
  const actions = {
    problema: 'Validar problema con 30+ entrevistas de clientes',
    solucion: 'Desarrollar MVP para validar preferencia de solución',
    innovacion: 'Identificar propuesta de valor única y defenderla',
    mercado: 'Rehacer análisis de TAM/SAM/SOM con datos actuales',
    modelo_de_negocio: 'Definir modelo de ingresos con unit economics claro',
    factibilidad_tecnica: 'Evaluar requerimientos técnicos y dependencias',
    factibilidad_financiera: 'Rehacer proyecciones con supuestos conservadores',
    legal_tributario: 'Consultar con abogado especializado',
    impacto: 'Identificar y medir impacto positivo del proyecto',
    escalabilidad: 'Analizar limitantes de escala y cómo superarlos',
    equipo_encaje: 'Identificar y cubrir gaps de habilidades',
    narrativa: 'Mejorar pitch con estructura clara',
    postulabilidad: 'Revisar requisitos de fondos y preparar documentación'
  };
  
  return actions[dimension] || 'Revisar y mejorar esta dimensión';
}

/**
 * Generate evaluator_scorecard.md content
 */
function generateEvaluatorScorecardMd(
  projectData,
  scores,
  dimensions,
  baseScore,
  riskModifier,
  riskLevel,
  finalScore,
  classification,
  analysis
) {
  const today = new Date().toISOString().split('T')[0];
  
  let markdown = `# Evaluator Scorecard

## Información del Proyecto
- **Idea:** ${projectData.selectedIdea?.substring(0, 100) || 'Proyecto'}...
- **Fecha de evaluación:** ${today}
- **Evaluador:** midi-evaluator-agent (simulando jurado/inversionista)

---

## Puntaje Total

# **${finalScore} / 100**

### Clasificación: ${classification.classification}

---

## Puntaje por Dimensión

| Dimensión | Peso | Puntaje (0-100) | Puntaje Ponderado | Justificación |
|-----------|------|-----------------|-------------------|---------------|
${Object.entries(scores).map(([key, data]) => 
  `| ${formatDimensionName(key)} | ${data.weight}% | ${data.score} | ${data.weightedScore.toFixed(2)} | ${data.justification.substring(0, 40)}... |`
).join('\n')}
| **Subtotal** | **100%** | | **${baseScore.toFixed(2)}** | |

### Modificador de Riesgo

#### Riesgos desde RISK_REGISTER.md
- Total riesgos: ${riskLevel.count > 0 ? 'Detectados' : 'No detectados'}
- Riesgos altos: ${riskLevel.count}
- Nivel de riesgo: ${riskLevel.level.toUpperCase()}

#### Modificador de Riesgo Aplicado
- Nivel de riesgo: ${riskLevel.level.toUpperCase()}
- Penalización aplicada: ${riskModifier} puntos

#### Cálculo del Puntaje
- Puntaje base: ${baseScore}/100
- Penalización por riesgo: ${riskModifier}
- **Puntaje final: ${finalScore}/100**

---

## Fortalezas (Top 3)

`;

  analysis.strengths.forEach((strength, i) => {
    markdown += `### ${i + 1}. ${formatDimensionName(strength.dimension)}
- **Puntaje:** ${strength.score}/100
- **Por qué es fortaleza:** ${strength.description}
- **Cómo mantenerla:** Continuar desarrollando esta área

`;
  });

  markdown += `---

## Debilidades (Top 3)

`;

  analysis.weaknesses.forEach((weakness, i) => {
    markdown += `### ${i + 1}. ${formatDimensionName(weakness.dimension)}
- **Puntaje:** ${weakness.score}/100
- **Por qué es debilidad:** ${weakness.description}
- **Impacto en el proyecto:** Afecta la viabilidad general
- **Cómo mejorarla:** ${weakness.improvement}

`;
  });

  markdown += `---

## Riesgos Altos

| Riesgo | Dimensión Afectada | Impacto en Puntaje | Mitigación |
|--------|-------------------|-------------------|------------|
${analysis.weaknesses.map(w => 
  `| Debilidad en ${formatDimensionName(w.dimension)} | ${formatDimensionName(w.dimension)} | -${(60 - w.score) * 0.1} | ${w.improvement.substring(0, 30)}... |`
).join('\n')}

---

## Análisis por Área

### Fortalezas Técnicas
${scores.factibilidad_tecnica.score >= 70 ? '✅ Buena factibilidad técnica identificada' : '⚠️ Factibilidad técnica requiere atención'}

### Fortalezas de Mercado
${scores.mercado.score >= 70 && scores.modelo_de_negocio.score >= 70 ? '✅ Mercado y modelo bien definidos' : '⚠️ Mercado y modelo necesitan desarrollo'}

### Áreas que Requieren Atención
${analysis.weaknesses.map(w => `- ${formatDimensionName(w.dimension)}: Score ${w.score}/100`).join('\n')}

---

## Recomendación Final

### ${finalScore >= 70 ? 'APROBAR' : finalScore >= 55 ? 'ITERAR' : 'VALIDAR ANTES'}

**Justificación:**
${classification.recommendation}

### Condiciones para Aprobar (si ITERAR o VALIDAR ANTES):
${analysis.weaknesses.map((w, i) => `${i + 1}. ${w.improvement}`).join('\n')}

### Próximos Pasos:
1. ${finalScore >= 70 ? 'Proceder a generación de documento final' : 'Resolver debilidades identificadas'}
2. ${classification.action}
3. Reevaluar después de iteraciones

---

## Comparación con Benchmark

| Criterio | Este Proyecto | Benchmark Exitoso | Gap |
|----------|---------------|-------------------|-----|
| Problema claro | ${scores.problema.score} | 80 | ${scores.problema.score - 80 >= 0 ? '+' : ''}${scores.problema.score - 80} |
| Solución viable | ${scores.solucion.score} | 75 | ${scores.solucion.score - 75 >= 0 ? '+' : ''}${scores.solucion.score - 75} |
| Innovación | ${scores.innovacion.score} | 70 | ${scores.innovacion.score - 70 >= 0 ? '+' : ''}${scores.innovacion.score - 70} |

---

## Perfil del Proyecto

**Este proyecto es:**
- [ ] Alta innovación, alto riesgo
- [${scores.innovacion.score >= 70 && riskLevel.level === 'alto' ? 'x' : ' '}] Innovación media, riesgo medio
- [ ] Baja innovación, bajo riesgo
- [ ] Alto impacto, lenta escalabilidad
- [ ] Bajo impacto, rápida escalabilidad

**Mejor ajuste para:**
- [${projectData.userContext.toLowerCase().includes('corfo') ? 'x' : ' '}] Fondos de innovación (CORFO, FIA)
- [${projectData.userContext.toLowerCase().includes('startup chile') ? 'x' : ' '}] Aceleradoras (Start-Up Chile)
- [ ] Inversión ángel
- [ ] Bootstrapping
- [ ] No es financeable actualmente

---

*Generado por midi-evaluator-agent*
*Fecha: ${today}*
`;

  return markdown;
}

/**
 * Format dimension name for display
 */
function formatDimensionName(key) {
  const names = {
    problema: 'Problema',
    solucion: 'Solución',
    innovacion: 'Innovación',
    mercado: 'Mercado',
    modelo_de_negocio: 'Modelo de Negocio',
    factibilidad_tecnica: 'Factibilidad Técnica',
    factibilidad_financiera: 'Factibilidad Financiera',
    legal_tributario: 'Legal/Tributario',
    impacto: 'Impacto',
    escalabilidad: 'Escalabilidad',
    equipo_encaje: 'Equipo/Encaje',
    narrativa: 'Narrativa',
    postulabilidad: 'Postulabilidad'
  };
  
  return names[key] || key;
}

/**
 * Update PROJECT_STATE.md
 */
async function updateProjectState(projectPath, score, classification) {
  const statePath = path.join(projectPath, 'midi-project', 'PROJECT_STATE.md');
  
  if (await fileExists(statePath)) {
    let content = await fs.readFile(statePath, 'utf8');
    
    // Update evaluation score
    content = content.replace(
      /\*\*Score:\*\*.*$/m,
      `**Score:** ${score}/100`
    );
    
    // Mark evaluation as complete
    content = content.replace(
      /- \[ \] Evaluation/g,
      '- [x] Evaluation'
    );
    
    await writeFile(statePath, content);
    logger.info('Updated PROJECT_STATE.md');
  }
}

/**
 * Get scoring dimensions
 */
export function getScoringDimensions() {
  return DEFAULT_DIMENSIONS;
}

/**
 * Get thresholds
 */
export function getThresholds() {
  return THRESHOLDS;
}

export default executeEvaluator;
