/**
 * Creative Agent Executor
 * Generates ideas using multiple innovation frameworks
 */

import fs from 'fs-extra';
import path from 'path';
import { logger } from '../cli/logger.js';
import { fileExists, writeFile } from '../utils/fileSystem.js';

// Innovation frameworks
const FRAMEWORKS = {
  designThinking: {
    name: 'Design Thinking',
    stages: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
    template: generateDesignThinkingIdea
  },
  jtbd: {
    name: 'Jobs To Be Done',
    dimensions: ['Functional', 'Emotional', 'Social'],
    template: generateJTBDIdea
  },
  blueOcean: {
    name: 'Blue Ocean Strategy',
    actions: ['Eliminate', 'Reduce', 'Raise', 'Create'],
    template: generateBlueOceanIdea
  },
  tenTypes: {
    name: 'Ten Types of Innovation',
    types: [
      'Profit Model', 'Network', 'Structure', 'Process',
      'Product Performance', 'Product System', 'Service',
      'Channel', 'Brand', 'Customer Engagement'
    ],
    template: generateTenTypesIdea
  },
  scamper: {
    name: 'SCAMPER',
    techniques: ['Substitute', 'Combine', 'Adapt', 'Modify', 'Put to other uses', 'Eliminate', 'Reverse'],
    template: generateSCAMPERIdea
  }
};

/**
 * Execute Creative Agent
 * @param {Object} context - Execution context with user context and research
 * @returns {Object} Execution result with generated ideas
 */
export async function executeCreative(context = {}) {
  const projectPath = context.projectPath || process.cwd();
  const minIdeas = context.minIdeas || 10;
  const maxIdeas = context.maxIdeas || 15;
  const errors = [];
  const warnings = [];
  
  logger.info('Executing Creative Agent...');
  
  try {
    // Load inputs
    const userContext = await loadUserContext(projectPath);
    const research = await loadResearch(projectPath);
    
    // Generate ideas using all frameworks
    const ideas = await generateIdeas(userContext, research, minIdeas, maxIdeas);
    
    logger.info(`Generated ${ideas.length} ideas`);
    
    // Score ideas preliminarily
    const scoredIdeas = scoreIdeas(ideas, userContext);
    
    // Generate IDEA_BACKLOG.md
    const ideaBacklog = generateIdeaBacklogMd(scoredIdeas, userContext);
    
    // Write output
    const outputPath = path.join(projectPath, 'midi-project', 'IDEA_BACKLOG.md');
    await writeFile(outputPath, ideaBacklog);
    
    logger.success('Generated IDEA_BACKLOG.md');
    
    // Update PROJECT_STATE.md
    await updateProjectState(projectPath);
    
    return {
      success: true,
      ideasGenerated: ideas.length,
      ideas: scoredIdeas,
      outputs: {
        'midi-project/IDEA_BACKLOG.md': ideaBacklog
      },
      errors,
      warnings
    };
  } catch (error) {
    logger.error(`Creative execution failed: ${error.message}`);
    errors.push(error.message);
    
    return {
      success: false,
      errors,
      warnings
    };
  }
}

/**
 * Load USER_CONTEXT.md
 */
async function loadUserContext(projectPath) {
  const filePath = path.join(projectPath, 'midi-project', 'USER_CONTEXT.md');
  if (await fileExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return '';
}

/**
 * Load research output
 */
async function loadResearch(projectPath) {
  const filePath = path.join(projectPath, 'midi-project', '01_research', 'global_research.md');
  if (await fileExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return '';
}

/**
 * Generate ideas using all frameworks
 */
async function generateIdeas(userContext, research, minIdeas, maxIdeas) {
  const ideas = [];
  const ideaSet = new Set();
  
  // Extract context
  const ideaMatch = userContext.match(/\*\*Descripción:\*\*\s*([^\n]+)/i);
  const originalIdea = ideaMatch ? ideaMatch[1] : 'Nueva idea de negocio';
  
  const sectorMatch = userContext.match(/\*\*Sector:\*\*\s*([^\n]+)/i);
  const sector = sectorMatch ? sectorMatch[1] : 'General';
  
  const objetivoMatch = userContext.match(/\*\*Objetivo:\*\*\s*([^\n]+)/i);
  const objetivo = objetivoMatch ? objetivoMatch[1] : 'Crear valor';
  
  const publicoMatch = userContext.match(/\*\*Segmento:\*\*\s*([^\n]+)/i);
  const publico = publicoMatch ? publicoMatch[1] : 'Clientes';
  
  // Generate ideas with Design Thinking
  for (let i = 0; i < 3 && ideas.length < maxIdeas; i++) {
    const idea = generateDesignThinkingIdea(originalIdea, sector, publico, i);
    if (!ideaSet.has(idea.title)) {
      ideaSet.add(idea.title);
      ideas.push(idea);
    }
  }
  
  // Generate ideas with JTBD
  for (let i = 0; i < 3 && ideas.length < maxIdeas; i++) {
    const idea = generateJTBDIdea(originalIdea, sector, publico, i);
    if (!ideaSet.has(idea.title)) {
      ideaSet.add(idea.title);
      ideas.push(idea);
    }
  }
  
  // Generate ideas with Blue Ocean
  for (let i = 0; i < 2 && ideas.length < maxIdeas; i++) {
    const idea = generateBlueOceanIdea(originalIdea, sector, publico, i);
    if (!ideaSet.has(idea.title)) {
      ideaSet.add(idea.title);
      ideas.push(idea);
    }
  }
  
  // Generate ideas with Ten Types
  for (let i = 0; i < 3 && ideas.length < maxIdeas; i++) {
    const idea = generateTenTypesIdea(originalIdea, sector, publico, i);
    if (!ideaSet.has(idea.title)) {
      ideaSet.add(idea.title);
      ideas.push(idea);
    }
  }
  
  // Generate ideas with SCAMPER
  for (let i = 0; i < 3 && ideas.length < maxIdeas; i++) {
    const idea = generateSCAMPERIdea(originalIdea, sector, publico, i);
    if (!ideaSet.has(idea.title)) {
      ideaSet.add(idea.title);
      ideas.push(idea);
    }
  }
  
  // Ensure minimum ideas
  while (ideas.length < minIdeas) {
    const idea = {
      title: `${originalIdea} - Variante ${ideas.length + 1}`,
      description: `Variación del concepto original enfocada en ${['eficiencia', 'experiencia', 'costo', 'calidad', 'innovación'][ideas.length % 5]}`,
      framework: 'Iteración',
      cliente: {
        segmento: publico,
        problema: 'Necesidad insatisfecha en el mercado'
      },
      solucion: {
        queOfrece: 'Solución optimizada',
        comoFunciona: 'Modelo de negocio mejorado'
      },
      diferenciacion: 'Enfoque único en el segmento',
      modelo: 'Modelo de ingresos por suscripción o transacción',
      riesgo: ['Bajo', 'Medio', 'Alto'][ideas.length % 3],
      score: 60 + Math.floor(Math.random() * 20)
    };
    ideas.push(idea);
  }
  
  return ideas.slice(0, maxIdeas);
}

/**
 * Generate Design Thinking idea
 */
function generateDesignThinkingIdea(originalIdea, sector, publico, variant) {
  const howMightWe = [
    `¿Cómo podríamos ayudar a ${publico} a resolver su problema de manera más eficiente?`,
    `¿Cómo podríamos crear una solución que elimine las barreras actuales?`,
    `¿Cómo podríamos diseñar una experiencia superior para ${publico}?`
  ];
  
  return {
    title: `${sector}: Solución centrada en usuario (DT-${variant + 1})`,
    description: `Idea generada mediante Design Thinking enfocada en empatizar con ${publico} y crear soluciones basadas en sus necesidades reales.`,
    framework: 'Design Thinking',
    methodology: {
      howMightWe: howMightWe[variant % howMightWe.length],
      empathy: `Usuario: ${publico}, Necesidad: Eficiencia y simplicidad`,
      definition: `${publico} necesita una solución más accesible y efectiva`
    },
    cliente: {
      segmento: publico,
      problema: 'Falta de opciones eficientes en el mercado'
    },
    solucion: {
      queOfrece: 'Solución diseñada desde la perspectiva del usuario',
      comoFunciona: 'Proceso simplificado que reduce fricción'
    },
    diferenciacion: 'Diseño centrado 100% en la experiencia del usuario',
    modelo: 'Freemium con características premium',
    riesgo: 'Medio',
    score: 0 // Will be calculated later
  };
}

/**
 * Generate JTBD idea
 */
function generateJTBDIdea(originalIdea, sector, publico, variant) {
  const jobs = [
    { funcional: 'Completar tareas de forma eficiente', emocional: 'Sentirse productivo', social: 'Ser percibido como profesional' },
    { funcional: 'Resolver problemas rápidamente', emocional: 'Reducir estrés', social: 'Ganar reconocimiento' },
    { funcional: 'Acceder a información clave', emocional: 'Sentirse informado', social: 'Ser visto como experto' }
  ];
  
  const job = jobs[variant % jobs.length];
  
  return {
    title: `${sector}: Producto que cumple el trabajo (JTBD-${variant + 1})`,
    description: `Idea basada en Jobs To Be Done: cuando ${publico} necesita resolver un problema, quiere sentirse ${job.emocional} para ser percibido como ${job.social}.`,
    framework: 'Jobs To Be Done',
    methodology: {
      functionalJob: job.funcional,
      emotionalJob: job.emocional,
      socialJob: job.social
    },
    cliente: {
      segmento: publico,
      problema: `Necesita ${job.funcional.toLowerCase()}`
    },
    solucion: {
      queOfrece: 'Solución que cumple los tres trabajos: funcional, emocional y social',
      comoFunciona: 'Aborda la necesidad completa del cliente'
    },
    diferenciacion: 'Resuelve la motivación profunda, no solo el síntoma',
    modelo: 'Suscripción mensual',
    riesgo: 'Medio',
    score: 0
  };
}

/**
 * Generate Blue Ocean idea
 */
function generateBlueOceanIdea(originalIdea, sector, publico, variant) {
  const strategies = [
    { eliminate: 'Complejidad innecesaria', reduce: 'Costos de intermediación', raise: 'Valor para el cliente', create: 'Nueva categoría de servicio' },
    { eliminate: 'Barreras de entrada', reduce: 'Tiempo de implementación', raise: 'Accesibilidad', create: 'Modelo de autoservicio' }
  ];
  
  const strategy = strategies[variant % strategies.length];
  
  return {
    title: `${sector}: Nuevo espacio de mercado (Blue Ocean-${variant + 1})`,
    description: `Idea que crea un océano azul eliminando ${strategy.eliminate.toLowerCase()} y creando ${strategy.create.toLowerCase()}.`,
    framework: 'Blue Ocean Strategy',
    methodology: {
      eliminate: strategy.eliminate,
      reduce: strategy.reduce,
      raise: strategy.raise,
      create: strategy.create
    },
    cliente: {
      segmento: publico,
      problema: 'Mercado saturado con opciones similares'
    },
    solucion: {
      queOfrece: 'Propuesta de valor única que redefine la categoría',
      comoFunciona: 'Modelo simplificado que rompe con lo establecido'
    },
    diferenciacion: 'Crea un nuevo espacio de mercado sin competencia directa',
    modelo: 'Modelo innovador de ingresos',
    riesgo: 'Alto',
    score: 0
  };
}

/**
 * Generate Ten Types idea
 */
function generateTenTypesIdea(originalIdea, sector, publico, variant) {
  const typeCombos = [
    ['Product Performance', 'Service', 'Customer Engagement'],
    ['Profit Model', 'Channel', 'Brand'],
    ['Network', 'Process', 'Structure']
  ];
  
  const types = typeCombos[variant % typeCombos.length];
  
  return {
    title: `${sector}: Innovación multidimensional (Ten Types-${variant + 1})`,
    description: `Idea que innova en ${types.join(', ')} creando ventaja competitiva en múltiples frentes.`,
    framework: 'Ten Types of Innovation',
    methodology: {
      innovationTypes: types,
      approach: `Innovación en ${types.length} dimensiones simultáneamente`
    },
    cliente: {
      segmento: publico,
      problema: 'Soluciones unidimensionales insuficientes'
    },
    solucion: {
      queOfrece: 'Propuesta completa que innova en varios aspectos',
      comoFunciona: 'Ecosistema de valor integrado'
    },
    diferenciacion: 'Innovación en múltiples dimensiones dificulta la copia',
    modelo: 'Modelo de negocio con múltiples flujos de ingresos',
    riesgo: 'Medio',
    score: 0
  };
}

/**
 * Generate SCAMPER idea
 */
function generateSCAMPERIdea(originalIdea, sector, publico, variant) {
  const techniques = [
    { name: 'Substitute', description: 'Reemplazar componentes clave por alternativas más eficientes' },
    { name: 'Combine', description: 'Combinar con otros servicios para crear propuesta integral' },
    { name: 'Adapt', description: 'Adaptar soluciones exitosas de otros sectores' }
  ];
  
  const technique = techniques[variant % techniques.length];
  
  return {
    title: `${sector}: Transformación ${technique.name} (SCAMPER-${variant + 1})`,
    description: `Idea generada aplicando la técnica SCAMPER de ${technique.name}: ${technique.description}.`,
    framework: 'SCAMPER',
    methodology: {
      technique: technique.name,
      transformation: technique.description
    },
    cliente: {
      segmento: publico,
      problema: 'Soluciones convencionales no satisfacen'
    },
    solucion: {
      queOfrece: 'Solución transformada que ofrece nueva perspectiva',
      comoFunciona: `${technique.description}`
    },
    diferenciacion: `Aplicación de ${technique.name} crea propuesta única`,
    modelo: 'Modelo adaptado al nuevo enfoque',
    riesgo: 'Bajo',
    score: 0
  };
}

/**
 * Score ideas preliminarily
 */
function scoreIdeas(ideas, userContext) {
  // Extract user risk tolerance
  const riskMatch = userContext.match(/\*\*Nivel:\*\*\s*([^\n]+)/i);
  const userRisk = riskMatch ? riskMatch[1].toLowerCase() : 'medio';
  
  // Extract user budget
  const budgetMatch = userContext.match(/\*\*Presupuesto:\*\*\s*([^\n]+)/i);
  const hasBudget = budgetMatch && !budgetMatch[1].toLowerCase().includes('sin');
  
  return ideas.map(idea => {
    let score = 50; // Base score
    
    // Innovation bonus (0-15)
    score += idea.framework === 'Blue Ocean Strategy' ? 15 : 
             idea.framework === 'Ten Types of Innovation' ? 12 : 8;
    
    // Execution feasibility (0-15)
    const feasibilityBonus = idea.riesgo === 'Bajo' ? 15 : 
                             idea.riesgo === 'Medio' ? 10 : 5;
    score += hasBudget ? feasibilityBonus : feasibilityBonus * 0.7;
    
    // User fit (0-15)
    const riskFit = idea.riesgo.toLowerCase().includes(userRisk) ? 15 : 
                    userRisk.includes('alto') && idea.riesgo === 'Alto' ? 12 : 8;
    score += riskFit;
    
    // Commercial potential (0-15)
    score += idea.modelo.includes('suscripción') ? 12 : 10;
    
    // Normalize to 0-100
    idea.score = Math.min(100, Math.max(0, Math.round(score)));
    
    // Generate scoring breakdown
    idea.scoring = {
      innovacion: idea.framework === 'Blue Ocean Strategy' ? 90 : 
                  idea.framework === 'Ten Types' ? 85 : 75,
      ejecutabilidad: idea.riesgo === 'Bajo' ? 85 : 
                      idea.riesgo === 'Medio' ? 70 : 55,
      potencialComercial: 75,
      fitUsuario: riskFit * 5 + 25,
      total: idea.score
    };
    
    return idea;
  });
}

/**
 * Generate IDEA_BACKLOG.md content
 */
function generateIdeaBacklogMd(ideas, userContext) {
  const today = new Date().toISOString().split('T')[0];
  
  // Count by framework
  const frameworkCounts = {};
  const riskCounts = { Bajo: 0, Medio: 0, Alto: 0 };
  
  ideas.forEach(idea => {
    frameworkCounts[idea.framework] = (frameworkCounts[idea.framework] || 0) + 1;
    riskCounts[idea.riesgo] = (riskCounts[idea.riesgo] || 0) + 1;
  });
  
  let markdown = `# IDEA BACKLOG

## Información
- **Fecha de generación:** ${today}
- **Total de ideas:** ${ideas.length}
- **Frameworks usados:** ${Object.keys(frameworkCounts).join(', ')}

---

## Ideas Generadas

`;

  // Add each idea
  ideas.forEach((idea, index) => {
    markdown += generateIdeaSection(idea, index + 1);
  });

  // Summary table
  markdown += `---

## Resumen de Ideas

| # | Nombre | Framework | Riesgo | Score | Notas |
|---|--------|-----------|--------|-------|-------|
${ideas.map((idea, i) => 
  `| ${i + 1} | ${idea.title.substring(0, 40)}... | ${idea.framework} | ${idea.riesgo} | ${idea.score} | Preliminar |`
).join('\n')}

---

## Ideas por Nivel de Riesgo
- **Bajo:** ${riskCounts.Bajo} ideas
- **Medio:** ${riskCounts.Medio} ideas
- **Alto:** ${riskCounts.Alto} ideas

## Ideas por Framework
${Object.entries(frameworkCounts).map(([fw, count]) => `- **${fw}:** ${count} ideas`).join('\n')}

---

*Generado por midi-creative-agent*
*Fecha: ${today}*
`;
  
  return markdown;
}

/**
 * Generate section for a single idea
 */
function generateIdeaSection(idea, num) {
  return `### Idea ${num}: ${idea.title}

#### Metodología
- **Framework usado:** ${idea.framework}

#### Descripción
${idea.description}

#### Cliente
- **Segmento:** ${idea.cliente.segmento}
- **Problema:** ${idea.cliente.problema}

#### Solución
- **Qué ofrece:** ${idea.solucion.queOfrece}
- **Cómo funciona:** ${idea.solucion.comoFunciona}

#### Diferenciación
- **Qué la hace única:** ${idea.diferenciacion}

#### Modelo Preliminar
- **Cómo gana dinero:** ${idea.modelo}

#### Nivel de Riesgo
- [${idea.riesgo === 'Bajo' ? 'x' : ' '}] Bajo - Modelo probado, mercado conocido
- [${idea.riesgo === 'Medio' ? 'x' : ' '}] Medio - Algunos elementos innovadores
- [${idea.riesgo === 'Alto' ? 'x' : ' '}] Alto - Muy innovador, mercado incierto

#### Score Preliminar (1-10)
| Dimensión | Score |
|-----------|-------|
| Innovación | ${idea.scoring.innovacion} |
| Ejecutabilidad | ${idea.scoring.ejecutabilidad} |
| Potencial comercial | ${idea.scoring.potencialComercial} |
| Fit con usuario | ${idea.scoring.fitUsuario} |
| **Total** | **${idea.score}** |

---

`;
}

/**
 * Update PROJECT_STATE.md
 */
async function updateProjectState(projectPath) {
  const statePath = path.join(projectPath, 'midi-project', 'PROJECT_STATE.md');
  
  if (await fileExists(statePath)) {
    let content = await fs.readFile(statePath, 'utf8');
    
    // Mark ideas as generated
    content = content.replace(
      /- \[ \] Ideas generated/g,
      '- [x] Ideas generated'
    );
    
    await writeFile(statePath, content);
    logger.info('Updated PROJECT_STATE.md');
  }
}

/**
 * Get available frameworks
 */
export function getFrameworks() {
  return Object.keys(FRAMEWORKS);
}

export default executeCreative;
