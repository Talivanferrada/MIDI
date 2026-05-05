/**
 * MIDI Framework - Canvas Builder
 * Helpers for building BMC and Lean Canvas
 */

/**
 * Build a Business Model Canvas from project data
 */
export function buildBMC(projectData) {
  const {
    valueProposition,
    customerSegments,
    channels,
    customerRelationships,
    revenueStreams,
    keyResources,
    keyActivities,
    keyPartners,
    costStructure
  } = projectData;

  return {
    // Value Proposition (Center)
    valuePropositions: extractValuePropositions(valueProposition),
    
    // Customer Side (Right)
    customerSegments: extractCustomerSegments(customerSegments),
    channels: extractChannels(channels),
    customerRelationships: extractCustomerRelationships(customerRelationships),
    
    // Revenue
    revenueStreams: extractRevenueStreams(revenueStreams),
    
    // Production Side (Left)
    keyResources: extractKeyResources(keyResources),
    keyActivities: extractKeyActivities(keyActivities),
    keyPartners: extractKeyPartners(keyPartners),
    
    // Costs
    costStructure: extractCostStructure(costStructure),
    
    // Metadata
    generatedAt: new Date().toISOString(),
    version: '1.0'
  };
}

/**
 * Build a Lean Canvas from project data
 */
export function buildLeanCanvas(projectData) {
  const {
    problem,
    solution,
    uniqueValueProposition,
    unfairAdvantage,
    customerSegments,
    channels,
    revenueStreams,
    costStructure,
    keyMetrics,
    existingAlternatives
  } = projectData;

  return {
    // Problem Box (Left)
    problem: extractProblems(problem),
    existingAlternatives: extractExistingAlternatives(existingAlternatives),
    
    // Solution Box
    solution: extractSolutions(solution),
    
    // UVP (Center Top)
    uniqueValueProposition: formatUVP(uniqueValueProposition),
    
    // Unfair Advantage (Right Top)
    unfairAdvantage: formatUnfairAdvantage(unfairAdvantage),
    
    // Customer Segments (Right)
    customerSegments: extractCustomerSegments(customerSegments),
    
    // Channels (Right Bottom)
    channels: extractChannels(channels),
    
    // Bottom Row
    keyMetrics: extractKeyMetrics(keyMetrics),
    costStructure: extractCostStructure(costStructure),
    revenueStreams: extractRevenueStreams(revenueStreams),
    
    // Metadata
    generatedAt: new Date().toISOString(),
    version: '1.0'
  };
}

/**
 * Validate BMC completeness
 */
export function validateBMC(bmc) {
  const errors = [];
  const warnings = [];

  // Required blocks
  const requiredBlocks = [
    'valuePropositions',
    'customerSegments',
    'revenueStreams',
    'costStructure'
  ];

  requiredBlocks.forEach(block => {
    if (!bmc[block] || bmc[block].length === 0) {
      errors.push(`Bloque requerido vacío: ${block}`);
    }
  });

  // Recommended blocks
  const recommendedBlocks = [
    'keyPartners',
    'keyActivities',
    'keyResources',
    'channels',
    'customerRelationships'
  ];

  recommendedBlocks.forEach(block => {
    if (!bmc[block] || bmc[block].length === 0) {
      warnings.push(`Bloque recomendado vacío: ${block}`);
    }
  });

  // Check consistency
  if (bmc.revenueStreams?.length > 0 && bmc.customerSegments?.length === 0) {
    errors.push('Inconsistencia: Revenue streams sin customer segments');
  }

  if (bmc.costStructure?.length > 0 && 
      bmc.keyActivities?.length === 0 && 
      bmc.keyResources?.length === 0) {
    warnings.push('Cost structure sin actividades ni recursos clave');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completeness: calculateBMCCompleteness(bmc)
  };
}

/**
 * Validate Lean Canvas completeness
 */
export function validateLeanCanvas(lean) {
  const errors = [];
  const warnings = [];

  // Required blocks
  if (!lean.problem || lean.problem.length === 0) {
    errors.push('Problema no definido');
  }
  if (!lean.solution || lean.solution.length === 0) {
    errors.push('Solución no definida');
  }
  if (!lean.uniqueValueProposition || lean.uniqueValueProposition.length < 10) {
    errors.push('UVP muy corto o no definido');
  }
  if (!lean.customerSegments || lean.customerSegments.length === 0) {
    errors.push('Customer segments no definido');
  }

  // Recommended
  if (!lean.unfairAdvantage || lean.unfairAdvantage.length < 10) {
    warnings.push('Unfair advantage no claro - difícil de defender');
  }
  if (!lean.channels || lean.channels.length === 0) {
    warnings.push('Canales no definidos');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completeness: calculateLeanCompleteness(lean)
  };
}

// Helper extraction functions

function extractValuePropositions(vp) {
  if (Array.isArray(vp)) return vp;
  if (typeof vp === 'string') return [vp];
  return ['Definir propuesta de valor'];
}

function extractCustomerSegments(segments) {
  if (Array.isArray(segments)) {
    return segments.map(s => typeof s === 'string' ? s : s.description || s.name);
  }
  if (typeof segments === 'string') return [segments];
  return ['Definir segmento de clientes'];
}

function extractChannels(channels) {
  if (Array.isArray(channels)) {
    return channels.map(c => typeof c === 'string' ? c : c.name || c.description);
  }
  if (typeof channels === 'string') return [channels];
  return ['Definir canales'];
}

function extractCustomerRelationships(relations) {
  if (Array.isArray(relations)) return relations;
  if (typeof relations === 'string') return [relations];
  return ['Definir relaciones con clientes'];
}

function extractRevenueStreams(revenues) {
  if (Array.isArray(revenues)) {
    return revenues.map(r => typeof r === 'string' ? r : r.source || r.description);
  }
  if (typeof revenues === 'string') return [revenues];
  return ['Definir flujos de ingresos'];
}

function extractKeyResources(resources) {
  if (Array.isArray(resources)) {
    return resources.map(r => typeof r === 'string' ? r : r.name || r.description);
  }
  if (typeof resources === 'string') return [resources];
  return ['Definir recursos clave'];
}

function extractKeyActivities(activities) {
  if (Array.isArray(activities)) {
    return activities.map(a => typeof a === 'string' ? a : a.name || a.description);
  }
  if (typeof activities === 'string') return [activities];
  return ['Definir actividades clave'];
}

function extractKeyPartners(partners) {
  if (Array.isArray(partners)) {
    return partners.map(p => typeof p === 'string' ? p : p.name || p.description);
  }
  if (typeof partners === 'string') return [partners];
  return ['Definir socios clave'];
}

function extractCostStructure(costs) {
  if (Array.isArray(costs)) {
    return costs.map(c => typeof c === 'string' ? c : c.item || c.description);
  }
  if (typeof costs === 'string') return [costs];
  return ['Definir estructura de costos'];
}

function extractProblems(problems) {
  if (Array.isArray(problems)) return problems;
  if (typeof problems === 'string') return [problems];
  return ['Definir problemas'];
}

function extractExistingAlternatives(alternatives) {
  if (Array.isArray(alternatives)) return alternatives;
  if (typeof alternatives === 'string') return [alternatives];
  return ['Investigar alternativas existentes'];
}

function extractSolutions(solutions) {
  if (Array.isArray(solutions)) return solutions;
  if (typeof solutions === 'string') return [solutions];
  return ['Definir soluciones'];
}

function extractKeyMetrics(metrics) {
  if (Array.isArray(metrics)) {
    return metrics.map(m => typeof m === 'string' ? m : `${m.name}: ${m.target}`);
  }
  if (typeof metrics === 'string') return [metrics];
  return ['Definir métricas clave'];
}

function formatUVP(uvp) {
  if (typeof uvp === 'string') return uvp;
  if (uvp?.statement) return uvp.statement;
  return 'Definir propuesta de valor única';
}

function formatUnfairAdvantage(advantage) {
  if (typeof advantage === 'string') return advantage;
  if (advantage?.description) return advantage.description;
  return 'Identificar ventaja injusta';
}

function calculateBMCCompleteness(bmc) {
  const blocks = [
    'valuePropositions',
    'customerSegments',
    'channels',
    'customerRelationships',
    'revenueStreams',
    'keyResources',
    'keyActivities',
    'keyPartners',
    'costStructure'
  ];

  const filled = blocks.filter(block => 
    bmc[block] && bmc[block].length > 0 && 
    !bmc[block][0].includes('Definir')
  );

  return Math.round((filled.length / blocks.length) * 100);
}

function calculateLeanCompleteness(lean) {
  const blocks = [
    'problem',
    'solution',
    'uniqueValueProposition',
    'unfairAdvantage',
    'customerSegments',
    'channels',
    'keyMetrics',
    'costStructure',
    'revenueStreams'
  ];

  const filled = blocks.filter(block => {
    const value = lean[block];
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0 && !value[0].includes('Definir');
    if (typeof value === 'string') return value.length > 10 && !value.includes('Definir');
    return false;
  });

  return Math.round((filled.length / blocks.length) * 100);
}

/**
 * Convert BMC to Lean Canvas
 */
export function bmcToLeanCanvas(bmc) {
  return {
    problem: inferProblemsFromBMC(bmc),
    solution: inferSolutionsFromBMC(bmc),
    uniqueValueProposition: bmc.valuePropositions?.[0] || 'Definir UVP',
    unfairAdvantage: inferUnfairAdvantageFromBMC(bmc),
    customerSegments: bmc.customerSegments || [],
    channels: bmc.channels || [],
    keyMetrics: inferMetricsFromBMC(bmc),
    costStructure: bmc.costStructure || [],
    revenueStreams: bmc.revenueStreams || [],
    existingAlternatives: ['Investigar competencia'],
    generatedAt: new Date().toISOString()
  };
}

function inferProblemsFromBMC(bmc) {
  // Infer problems from customer segments and value propositions
  const problems = [];
  if (bmc.customerSegments) {
    problems.push(`Problemas de ${bmc.customerSegments[0]}`);
  }
  return problems.slice(0, 3);
}

function inferSolutionsFromBMC(bmc) {
  // Infer solutions from value propositions and key activities
  const solutions = [];
  if (bmc.valuePropositions) {
    solutions.push(...bmc.valuePropositions.slice(0, 3));
  }
  return solutions;
}

function inferUnfairAdvantageFromBMC(bmc) {
  // Infer from key resources and partnerships
  if (bmc.keyResources?.length > 0) {
    return `Recursos únicos: ${bmc.keyResources.slice(0, 2).join(', ')}`;
  }
  if (bmc.keyPartners?.length > 0) {
    return `Socios estratégicos: ${bmc.keyPartners[0]}`;
  }
  return 'Identificar ventaja injusta';
}

function inferMetricsFromBMC(bmc) {
  const metrics = [];
  if (bmc.revenueStreams?.length > 0) {
    metrics.push('Ingresos mensuales');
  }
  if (bmc.customerSegments?.length > 0) {
    metrics.push('Clientes activos');
  }
  metrics.push('CAC', 'LTV');
  return metrics;
}

// All functions exported via export keyword
