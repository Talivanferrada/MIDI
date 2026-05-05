/**
 * Research Agent Executor
 * Executes global research and generates research output
 */

import fs from 'fs-extra';
import path from 'path';
import { logger } from '../cli/logger.js';
import { fileExists, writeFile } from '../utils/fileSystem.js';

/**
 * Execute Research Agent
 * @param {Object} context - Execution context with user context and project info
 * @returns {Object} Execution result with research output
 */
export async function executeResearch(context = {}) {
  const projectPath = context.projectPath || process.cwd();
  const userInput = context.userInput || {};
  const webAccess = context.webAccess || false;
  const errors = [];
  const warnings = [];
  
  logger.info('Executing Research Agent...');
  
  try {
    // Load USER_CONTEXT.md
    const userContextPath = path.join(projectPath, 'midi-project', 'USER_CONTEXT.md');
    const userContext = await loadUserContext(userContextPath);
    
    // Extract research topics from context
    const topics = extractResearchTopics(userContext);
    
    logger.info(`Research topics identified: ${topics.length}`);
    
    // Generate research output
    const researchOutput = await generateResearchOutput(topics, userContext, webAccess);
    
    // Ensure output directory exists
    const outputDir = path.join(projectPath, 'midi-project', '01_research');
    await fs.ensureDir(outputDir);
    
    // Write research output
    const outputPath = path.join(outputDir, 'global_research.md');
    await writeFile(outputPath, researchOutput);
    
    logger.success('Generated global_research.md');
    
    // Update PROJECT_STATE.md
    await updateProjectState(projectPath);
    
    return {
      success: true,
      topics,
      outputs: {
        'midi-project/01_research/global_research.md': researchOutput
      },
      errors,
      warnings,
      webAccess,
      pendingVerification: !webAccess
    };
  } catch (error) {
    logger.error(`Research execution failed: ${error.message}`);
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
async function loadUserContext(filePath) {
  if (await fileExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return '';
}

/**
 * Extract research topics from user context
 */
function extractResearchTopics(userContext) {
  const topics = [];
  const content = userContext.toLowerCase();
  
  // Extract idea description
  const ideaMatch = userContext.match(/\*\*Descripción:\*\*\s*([^\n]+)/i);
  const idea = ideaMatch ? ideaMatch[1] : 'Proyecto';
  
  // Determine sector based on keywords
  const sectorKeywords = {
    'tecnología': ['software', 'app', 'plataforma', 'saas', 'digital', 'tecnología'],
    'alimentos': ['aliment', 'comida', 'restaurante', 'bebida', 'cocina'],
    'salud': ['salud', 'medicin', 'clínica', 'hospital', 'bienestar'],
    'educación': ['educación', 'curso', 'aprendizaje', 'enseñanza', 'capacitación'],
    'finanzas': ['finanzas', 'pago', 'banco', 'crédito', 'inversión'],
    'retail': ['tienda', 'comercio', 'venta', 'retail', 'ecommerce'],
    'energía': ['energía', 'solar', 'renovable', 'eléctrica'],
    'transporte': ['transporte', 'logística', 'delivery', 'movilidad']
  };
  
  let sector = 'General';
  for (const [s, keywords] of Object.entries(sectorKeywords)) {
    if (keywords.some(k => content.includes(k))) {
      sector = s;
      break;
    }
  }
  
  // Generate research topics
  topics.push({
    id: 'startups_similares',
    title: 'Startups Similares a Nivel Mundial',
    queries: [
      `${sector} startups funding 2024`,
      `similar to ${idea} business model`,
      `${sector} competitors global market`
    ]
  });
  
  topics.push({
    id: 'tendencias',
    title: 'Tendencias del Sector',
    queries: [
      `${sector} industry trends 2024`,
      `${sector} market forecast`,
      `emerging technologies ${sector}`
    ]
  });
  
  topics.push({
    id: 'modelos_negocio',
    title: 'Modelos de Negocio Exitosos',
    queries: [
      `${sector} business models successful`,
      `${sector} revenue models`,
      `${sector} pricing strategies`
    ]
  });
  
  topics.push({
    id: 'casos_exito',
    title: 'Casos de Éxito y Fracaso',
    queries: [
      `${sector} startup success stories`,
      `${sector} startup failures lessons`,
      `why ${sector} startups fail`
    ]
  });
  
  topics.push({
    id: 'tecnologias',
    title: 'Tecnologías Relevantes',
    queries: [
      `technology stack for ${sector}`,
      `${sector} technology trends`,
      `infrastructure requirements ${sector}`
    ]
  });
  
  topics.push({
    id: 'oportunidades',
    title: 'Oportunidades Identificadas',
    queries: [
      `${sector} market gaps`,
      `unmet needs ${sector}`,
      `${sector} underserved segments`
    ]
  });
  
  return topics;
}

/**
 * Generate research output markdown
 */
async function generateResearchOutput(topics, userContext, webAccess) {
  const today = new Date().toISOString().split('T')[0];
  
  // Extract idea for header
  const ideaMatch = userContext.match(/\*\*Descripción:\*\*\s*([^\n]+)/i);
  const idea = ideaMatch ? ideaMatch[1] : 'Proyecto';
  
  const sectorMatch = userContext.match(/\*\*Sector:\*\*\s*([^\n]+)/i);
  const sector = sectorMatch ? sectorMatch[1] : 'General';
  
  let markdown = `# Global Research

## Información del Proyecto
- **Idea:** ${idea}
- **Sector:** ${sector}
- **Fecha de investigación:** ${today}
- **Fuentes consultadas:** ${webAccess ? 'Web search activo' : 'Conocimiento base (web no disponible)'}

---

`;

  // Generate sections for each topic
  for (const topic of topics) {
    markdown += generateTopicSection(topic, webAccess);
  }

  // Add pending research section
  markdown += generatePendingResearchSection(topics, webAccess);

  // Add sources section
  markdown += `## Fuentes

${webAccess ? 
  '1. Búsquedas web realizadas\n2. Crunchbase\n3. Reportes de industria\n' :
  '**Nota:** Investigación realizada sin acceso web. Los datos deben ser verificados.\n'
}

---

*Generado por midi-global-research-agent*
*Fecha: ${today}*
`;

  return markdown;
}

/**
 * Generate section for a research topic
 */
function generateTopicSection(topic, webAccess) {
  let section = `## ${topic.title}

`;
  
  if (!webAccess) {
    section += `### [PENDIENTE VERIFICACIÓN]

**Nota:** Esta sección requiere investigación con acceso web.

#### Preguntas de Investigación
${topic.queries.map(q => `- "${q}"`).join('\n')}

#### Qué buscar
- Datos actualizados del sector
- Casos específicos de startups
- Tendencias emergentes
- Modelos de negocio validados

`;
  } else {
    section += `### Hallazgos Preliminares

[Los resultados de búsqueda web aparecerán aquí cuando esté disponible]

#### Búsquedas a realizar:
${topic.queries.map(q => `- \`${q}\``).join('\n')}

`;
  }
  
  section += `---\n\n`;
  return section;
}

/**
 * Generate pending research section
 */
function generatePendingResearchSection(topics, webAccess) {
  let section = `## Información Pendiente

### [PENDIENTE VERIFICACIÓN]

`;
  
  if (!webAccess) {
    section += `**Acceso web no disponible** - Los siguientes datos requieren verificación:

`;
    
    for (const topic of topics) {
      section += `- **${topic.title}**: Requiere búsqueda actualizada\n`;
    }
    
    section += `
### Plan de Búsqueda (cuando web esté disponible)

#### Búsquedas prioritarias:
`;
    
    for (const topic of topics.slice(0, 3)) {
      section += `1. \`${topic.queries[0]}\`\n`;
    }
    
    section += `
#### Fuentes a revisar:
- Crunchbase - Datos de funding
- CB Insights - Inteligencia de mercado
- Gartner - Reportes de tendencias
- McKinsey - Análisis sectoriales
- Product Hunt - Nuevos productos

`;
  } else {
    section += `- Verificar datos específicos con fuentes primarias\n`;
    section += `- Actualizar información de mercado con datos recientes\n`;
  }
  
  section += `### Hipótesis a Validar

| Hipótesis | Evidencia | Confianza | Cómo validar |
|-----------|-----------|-----------|--------------|
| El mercado está creciendo | Pendiente | Baja | Investigación de mercado |
| Existe demanda no satisfecha | Pendiente | Baja | Entrevistas con clientes |
| El modelo es replicable | Pendiente | Baja | Análisis de casos de éxito |

---

`;
  
  return section;
}

/**
 * Update PROJECT_STATE.md with research status
 */
async function updateProjectState(projectPath) {
  const statePath = path.join(projectPath, 'midi-project', 'PROJECT_STATE.md');
  
  if (await fileExists(statePath)) {
    let content = await fs.readFile(statePath, 'utf8');
    
    // Mark research as complete
    content = content.replace(
      /- \[ \] Research/g,
      '- [x] Research'
    );
    
    await writeFile(statePath, content);
    logger.info('Updated PROJECT_STATE.md');
  }
}

export default executeResearch;
