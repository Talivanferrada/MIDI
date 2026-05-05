/**
 * Intake Agent Executor
 * Conducts initial interview and generates USER_CONTEXT.md
 */

import fs from 'fs-extra';
import path from 'path';
import { logger } from '../cli/logger.js';
import { fileExists, writeFile } from '../utils/fileSystem.js';

// Interview questions structure
const INTERVIEW_QUESTIONS = {
  idea: {
    title: 'Idea y Objetivo',
    questions: [
      {
        id: 'idea_descripcion',
        question: '¿Cuál es tu idea inicial?',
        type: 'text',
        followUps: [
          '¿De dónde surgió la idea?',
          '¿Qué te entusiasma de ella?'
        ]
      },
      {
        id: 'objetivo',
        question: '¿Cuál es tu objetivo principal?',
        type: 'choice',
        options: [
          'Crear un negocio rentable',
          'Postular a fondos concursables',
          'Validar una hipótesis',
          'Resolver un problema personal',
          'Generar impacto social',
          'Otro'
        ]
      },
      {
        id: 'etapa',
        question: '¿En qué etapa está tu idea?',
        type: 'choice',
        options: [
          'Solo una idea vaga',
          'Tengo un concepto definido',
          'Ya investigué un poco',
          'Tengo un prototipo/MVP',
          'Ya tengo clientes/usuarios'
        ]
      }
    ]
  },
  ubicacion: {
    title: 'Ubicación y Contexto',
    questions: [
      {
        id: 'pais',
        question: '¿En qué país estás?',
        type: 'text',
        default: 'Chile'
      },
      {
        id: 'region',
        question: '¿En qué región?',
        type: 'choice',
        options: [
          'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama',
          'Coquimbo', 'Valparaíso', 'Metropolitana', 'O\'Higgins',
          'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Ríos',
          'Los Lagos', 'Aysén', 'Magallanes'
        ]
      },
      {
        id: 'alcance',
        question: '¿Tu proyecto es:',
        type: 'choice',
        options: ['Local', 'Nacional', 'Internacional']
      }
    ]
  },
  publico: {
    title: 'Público y Mercado',
    questions: [
      {
        id: 'publico_objetivo',
        question: '¿Quién es tu público objetivo?',
        type: 'text'
      },
      {
        id: 'problema',
        question: '¿Qué problema les resuelves?',
        type: 'text'
      },
      {
        id: 'conocimiento_competencia',
        question: '¿Conoces a tus competidores?',
        type: 'choice',
        options: [
          'No, no he investigado',
          'Conozco algunos nombres',
          'He hecho análisis de competencia'
        ]
      }
    ]
  },
  recursos: {
    title: 'Recursos',
    questions: [
      {
        id: 'presupuesto',
        question: '¿Cuánto dinero puedes invertir?',
        type: 'text',
        placeholder: 'Rango: $X - $Y CLP/USD'
      },
      {
        id: 'tiempo',
        question: '¿Cuánto tiempo puedes dedicar?',
        type: 'choice',
        options: ['Full-time', 'Part-time']
      },
      {
        id: 'habilidades_usuario',
        question: '¿Qué habilidades tienes?',
        type: 'text'
      },
      {
        id: 'habilidades_equipo',
        question: '¿Qué habilidades tiene tu equipo?',
        type: 'text'
      },
      {
        id: 'red_contactos',
        question: '¿Qué red de contactos tienes?',
        type: 'text'
      }
    ]
  },
  restricciones: {
    title: 'Restricciones y Motivaciones',
    questions: [
      {
        id: 'restricciones',
        question: '¿Qué restricciones tienes?',
        type: 'text'
      },
      {
        id: 'motivaciones',
        question: '¿Por qué quieres hacer esto?',
        type: 'text'
      },
      {
        id: 'nivel_riesgo',
        question: '¿Qué nivel de riesgo aceptas?',
        type: 'choice',
        options: [
          'Bajo - Prefiero seguridad',
          'Medio - Equilibrado',
          'Alto - Dispuesto a arriesgar'
        ]
      },
      {
        id: 'horizonte',
        question: '¿Cuál es tu horizonte de tiempo?',
        type: 'text'
      }
    ]
  },
  financiamiento: {
    title: 'Financiamiento',
    questions: [
      {
        id: 'busca_fondos',
        question: '¿Buscas fondos concursables?',
        type: 'choice',
        options: ['Sí, es prioridad', 'Sería bueno', 'No, autofinanciado']
      },
      {
        id: 'fondos_interes',
        question: '¿Qué fondos conoces o te interesan?',
        type: 'text',
        placeholder: 'CORFO, SERCOTEC, Start-Up Chile, etc.'
      },
      {
        id: 'busca_inversionistas',
        question: '¿Buscas inversionistas?',
        type: 'choice',
        options: ['Sí, activamente', 'Lo consideraría', 'No']
      }
    ]
  },
  innovacion: {
    title: 'Innovación e Impacto',
    questions: [
      {
        id: 'nivel_innovacion',
        question: '¿Qué nivel de innovación buscas?',
        type: 'choice',
        options: [
          'Radical - Crear algo nuevo',
          'Incremental - Mejorar existente',
          'No es mi prioridad'
        ]
      },
      {
        id: 'impacto',
        question: '¿Qué impacto buscas generar?',
        type: 'text'
      }
    ]
  }
};

// Mandatory fields validation
const MANDATORY_FIELDS = [
  'idea_descripcion',
  'objetivo',
  'pais',
  'presupuesto',
  'nivel_riesgo'
];

/**
 * Execute Intake Agent
 * @param {Object} context - Execution context with answers or prompts
 * @returns {Object} Execution result with generated USER_CONTEXT.md
 */
export async function executeIntake(context = {}) {
  const projectPath = context.projectPath || process.cwd();
  const answers = context.answers || {};
  const errors = [];
  const warnings = [];
  
  logger.info('Executing Intake Agent...');
  
  try {
    // Check for existing USER_CONTEXT.md
    const userContextPath = path.join(projectPath, 'midi-project', 'USER_CONTEXT.md');
    const existingContext = await loadExistingContext(userContextPath);
    
    // Merge existing answers with new answers
    const mergedAnswers = { ...existingContext, ...answers };
    
    // Validate mandatory fields
    const validation = validateAnswers(mergedAnswers);
    
    if (!validation.complete) {
      warnings.push(`Missing mandatory fields: ${validation.missing.join(', ')}`);
    }
    
    // Generate follow-up questions based on answers
    const followUps = generateFollowUps(mergedAnswers);
    
    // Generate USER_CONTEXT.md content
    const userContext = generateUserContextMd(mergedAnswers, validation, followUps);
    
    // Write output
    await fs.ensureDir(path.dirname(userContextPath));
    await writeFile(userContextPath, userContext);
    
    logger.success('Generated USER_CONTEXT.md');
    
    // Update PROJECT_STATE.md
    await updateProjectState(projectPath, mergedAnswers);
    
    return {
      success: true,
      context: mergedAnswers,
      outputs: {
        'midi-project/USER_CONTEXT.md': userContext
      },
      validation,
      followUps,
      errors,
      warnings,
      needsMoreInfo: !validation.complete
    };
  } catch (error) {
    logger.error(`Intake execution failed: ${error.message}`);
    errors.push(error.message);
    
    return {
      success: false,
      errors,
      warnings
    };
  }
}

/**
 * Load existing USER_CONTEXT.md if it exists
 */
async function loadExistingContext(filePath) {
  if (await fileExists(filePath)) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return parseUserContext(content);
    } catch (error) {
      logger.warning(`Could not parse existing USER_CONTEXT: ${error.message}`);
    }
  }
  return {};
}

/**
 * Parse USER_CONTEXT.md content into structured data
 */
function parseUserContext(content) {
  const data = {};
  
  // Extract key fields using regex
  const extractField = (label) => {
    const regex = new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n]+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  };
  
  data.idea_descripcion = extractField('Idea Inicial') || extractField('Descripción');
  data.pais = extractField('Ubicación')?.split(',')[0];
  data.objetivo = extractField('Objetivo');
  data.presupuesto = extractField('Presupuesto');
  data.nivel_riesgo = extractField('Nivel');
  
  return data;
}

/**
 * Validate that mandatory fields are complete
 */
function validateAnswers(answers) {
  const missing = [];
  const contradictions = [];
  
  // Check mandatory fields
  for (const field of MANDATORY_FIELDS) {
    if (!answers[field] || answers[field].trim() === '') {
      missing.push(field);
    }
  }
  
  // Check for contradictions
  if (answers.busca_fondos === 'Sí, es prioridad' && 
      answers.presupuesto && answers.presupuesto.toLowerCase().includes('sin presupuesto')) {
    contradictions.push('Busca fondos pero declara sin presupuesto (requiere contraparte)');
  }
  
  if (answers.busca_fondos === 'Sí, es prioridad' && 
      answers.etapa === 'Solo una idea vaga') {
    contradictions.push('Busca fondos pero está en etapa muy temprana');
  }
  
  return {
    complete: missing.length === 0 && contradictions.length === 0,
    missing,
    contradictions
  };
}

/**
 * Generate follow-up questions based on answers
 */
function generateFollowUps(answers) {
  const followUps = [];
  
  // Contradiction-based follow-ups
  if (answers.busca_fondos === 'Sí, es prioridad' && 
      answers.presupuesto && answers.presupuesto.toLowerCase().includes('sin presupuesto')) {
    followUps.push({
      id: 'financiamiento_contraparte',
      question: 'Detecté que quieres postular a fondos pero no tienes presupuesto para contraparte. ¿Cómo planeas resolver esto?',
      options: ['Buscaré cofinanciamiento', 'Ajustaré el presupuesto', 'Buscaré fondos sin contraparte', 'Otro']
    });
  }
  
  // Sector-specific follow-ups
  if (answers.idea_descripcion) {
    const idea = answers.idea_descripcion.toLowerCase();
    
    if (idea.includes('aliment') || idea.includes('comida') || idea.includes('restaurante')) {
      followUps.push({
        id: 'permisos_alimentos',
        question: 'Tu proyecto involucra alimentos. ¿Tienes información sobre los permisos sanitarios requeridos?',
        type: 'yes-no'
      });
    }
    
    if (idea.includes('salud') || idea.includes('medicin') || idea.includes('clínica')) {
      followUps.push({
        id: 'regulacion_salud',
        question: 'Tu proyecto involucra salud. ¿Has investigado las regulaciones sectoriales?',
        type: 'yes-no'
      });
    }
  }
  
  // Team-based follow-ups
  if (answers.habilidades_equipo && answers.habilidades_equipo.toLowerCase().includes('no tengo')) {
    followUps.push({
      id: 'equipo_faltante',
      question: 'No tienes equipo actualmente. ¿Qué roles son críticos para tu proyecto?',
      type: 'text'
    });
  }
  
  return followUps;
}

/**
 * Generate USER_CONTEXT.md content
 */
function generateUserContextMd(answers, validation, followUps) {
  const today = new Date().toISOString().split('T')[0];
  
  return `# USER_CONTEXT

## Información Personal
- **Nombre:** ${answers.nombre || '[No proporcionado]'}
- **Ubicación:** ${answers.pais || '[País]'}, ${answers.region || '[Región]'}, ${answers.ciudad || '[Ciudad]'}
- **Fecha de intake:** ${today}

## Idea Inicial
- **Descripción:** ${answers.idea_descripcion || '[Por completar]'}
- **Etapa:** ${answers.etapa || '[Por completar]'}
- **Fuente:** ${answers.idea_origen || '[Por completar]'}

## Objetivo Principal
- **Objetivo:** ${answers.objetivo || '[Por completar]'}
- **Éxito significa:** ${answers.exito_significado || '[Por completar]'}

## Público Objetivo
- **Segmento:** ${answers.publico_objetivo || '[Por completar]'}
- **Problema:** ${answers.problema || '[Por completar]'}
- **Solución actual:** ${answers.solucion_actual || '[Por completar]'}

## Recursos Disponibles

### Financieros
- **Presupuesto:** ${answers.presupuesto || '[Por completar]'}
- **Fuente:** ${answers.fuente_presupuesto || 'Propio'}

### Tiempo
- **Dedicación:** ${answers.tiempo || '[Por completar]'}
- **Horizonte:** ${answers.horizonte || '[Por completar]'}

### Habilidades
- **Usuario:** ${answers.habilidades_usuario || '[Por completar]'}
- **Equipo:** ${answers.habilidades_equipo || '[Sin equipo]'}
- **Gaps:** ${answers.habilidades_faltantes || '[Por identificar]'}

### Red
- **Contactos del sector:** ${answers.red_contactos || '[Por completar]'}

## Restricciones
- **Tiempo:** ${answers.restricciones_tiempo || answers.restricciones || '[Sin restricciones específicas]'}
- **Presupuesto:** ${answers.restricciones_presupuesto || '[Sin restricciones específicas]'}
- **Ubicación:** ${answers.restricciones_ubicacion || '[Sin restricciones específicas]'}

## Perfil de Riesgo
- **Nivel:** ${answers.nivel_riesgo || '[Por completar]'}
- **Razonamiento:** ${answers.razonamiento_riesgo || '[Por completar]'}

## Motivaciones
- **Profundas:** ${answers.motivaciones || '[Por completar]'}

## Financiamiento

### Fondos
- **Interés:** ${answers.busca_fondos || '[Por completar]'}
- **Fondos conocidos:** ${answers.fondos_interes || '[Por completar]'}

### Inversionistas
- **Interés:** ${answers.busca_inversionistas || '[Por completar]'}

## Innovación e Impacto
- **Nivel de innovación:** ${answers.nivel_innovacion || '[Por completar]'}
- **Impacto buscado:** ${answers.impacto || '[Por completar]'}

## Modo Recomendado
- **Modo:** ${determineRecommendedMode(answers)}
- **Razón:** ${getModeReason(answers)}

## Flags y Alertas
${validation.missing.length > 0 ? `- [ ] Datos faltantes críticos: ${validation.missing.join(', ')}` : '- [x] Datos mandatorios completos'}
${validation.contradictions.length > 0 ? `- [ ] Contradicciones detectadas: ${validation.contradictions.join(', ')}` : '- [x] Sin contradicciones detectadas'}
${generateAssumptionsList(answers)}

## Próximos Pasos
1. ${validation.complete ? 'Continuar con /midi-explore para investigación' : 'Completar campos faltantes'}
2. ${answers.busca_fondos === 'Sí, es prioridad' ? 'Investigar requisitos de fondos de interés' : 'Validar idea con investigación inicial'}
3. Generar ideas con /midi-explore

## Preguntas de Seguimiento Sugeridas
${followUps.length > 0 ? followUps.map(f => `- ${f.question}`).join('\n') : '- Sin preguntas de seguimiento pendientes'}

---
*Generado por midi-intake-agent*
*Fecha: ${today}*
`;
}

/**
 * Determine recommended mode based on answers
 */
function determineRecommendedMode(answers) {
  if (answers.busca_fondos === 'Sí, es prioridad') {
    return 'Financeable (post exploración)';
  }
  
  if (answers.etapa === 'Ya tengo clientes/usuarios' || answers.etapa === 'Tengo un prototipo/MVP') {
    return 'Financeable (si tiene claro el modelo)';
  }
  
  return 'Exploración';
}

/**
 * Get reason for recommended mode
 */
function getModeReason(answers) {
  if (answers.busca_fondos === 'Sí, es prioridad') {
    return 'El usuario busca fondos, requiere análisis profundo para postulación';
  }
  
  if (answers.etapa === 'Ya tengo clientes/usuarios') {
    return 'Proyecto avanzado, puede ir directo a análisis financeable';
  }
  
  return 'Idea en etapa temprana, necesita exploración y validación';
}

/**
 * Generate list of assumptions made
 */
function generateAssumptionsList(answers) {
  const assumptions = [];
  
  if (!answers.habilidades_equipo || answers.habilidades_equipo.toLowerCase().includes('no tengo')) {
    assumptions.push('[SUPUESTO] No hay equipo cofundador');
  }
  
  if (!answers.presupuesto) {
    assumptions.push('[SUPUESTO] Presupuesto limitado o por definir');
  }
  
  if (assumptions.length === 0) {
    return '- [x] Sin supuestos realizados';
  }
  
  return assumptions.map(a => `- [ ] ${a}`).join('\n');
}

/**
 * Update PROJECT_STATE.md with intake status
 */
async function updateProjectState(projectPath, answers) {
  const statePath = path.join(projectPath, 'midi-project', 'PROJECT_STATE.md');
  
  if (await fileExists(statePath)) {
    let content = await fs.readFile(statePath, 'utf8');
    
    // Update mode
    content = content.replace(
      /\*\*Mode:\*\*.*$/m,
      `**Mode:** ${determineRecommendedMode(answers).split(' ')[0]}`
    );
    
    // Mark intake as complete
    content = content.replace(
      /- \[ \] Intake/g,
      '- [x] Intake'
    );
    
    await writeFile(statePath, content);
    logger.info('Updated PROJECT_STATE.md');
  }
}

/**
 * Get interview questions for dynamic generation
 */
export function getInterviewQuestions() {
  return INTERVIEW_QUESTIONS;
}

/**
 * Get mandatory fields list
 */
export function getMandatoryFields() {
  return MANDATORY_FIELDS;
}

export default executeIntake;
