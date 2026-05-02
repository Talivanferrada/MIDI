/**
 * Generate Evaluation Scorecard visualizations
 * @param {Object} scorecard - Scorecard data object
 * @returns {string} Markdown formatted visualization
 */
export function generateScorecardVisual(scorecard) {
  if (!scorecard) {
    return `
## Evaluation Scorecard - Visual

### No Evaluation Data Available

The project has not been evaluated yet. Run the evaluator agent to generate a scorecard.
`;
  }

  const total = scorecard.totalScore || scorecard.total || 0;
  const baseScore = scorecard.baseScore || total;
  const riskModifier = scorecard.riskModifier || 0;
  const barLength = Math.round(total / 10);
  const bar = '█'.repeat(Math.min(barLength, 10)) + '░'.repeat(Math.max(10 - barLength, 0));
  const classification = getClassification(total);
  
  const dimensions = scorecard.dimensions || scorecard.scores || getDefaultDimensions(scorecard);
  
  return `
## Evaluation Scorecard - Visual

### Overall Score

\`\`\`
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   TOTAL SCORE: ${total}/100                                    │
│                                                            │
│   [${bar}] ${total}%             │
│                                                            │
│   Classification: ${classification.padEnd(30)}│
│                                                            │
└────────────────────────────────────────────────────────────┘
\`\`\`

### Score Interpretation

${getScoreInterpretation(total)}

### Dimension Scores

\`\`\`
Dimension                    Score    Bar
─────────────────────────────────────────────────────────────
${generateDimensionBars(dimensions)}
\`\`\`

### Dimension Details

${generateDimensionTable(dimensions)}

### Strengths (Score ≥ 7)

${generateStrengths(dimensions)}

### Areas for Improvement (Score < 5)

${generateWeaknesses(dimensions)}

### Risk Modifier Applied

\`\`\`
Base Score:                  ${baseScore}/100
Risk Penalty:                -${riskModifier} points
─────────────────────────────────────
FINAL SCORE:                 ${total}/100
\`\`\`

### Risk Impact on Score

${generateRiskImpact(riskModifier)}

### Progress Visualization

\`\`\`
Category Progress
    ^
100%│
    │     ████████████████████  ${calculateCategoryScore(dimensions, ['problema', 'solucion', 'innovacion'])}%
 75%│     ████████████████████
    │     ████████████████████  ████████████████  ${calculateCategoryScore(dimensions, ['mercado', 'modelo', 'tecnica'])}%
 50%│     ████████████████████  ████████████████
    │     ████████████████████  ████████████████  ████████████  ${calculateCategoryScore(dimensions, ['financiera', 'legal', 'impacto'])}%
 25%│     ████████████████████  ████████████████  ████████████
    │     ████████████████████  ████████████████  ████████████  ████  ${calculateCategoryScore(dimensions, ['escalabilidad', 'equipo', 'narrativa', 'postulabilidad'])}%
    +──────────────────────────────────────────────────────────────> Category
       Problem/Solution    Feasibility        Viability        Readiness
\`\`\`

### Comparison to Thresholds

\`\`\`
            40        55        70        85        100
            │         │         │         │         │
    Not     │  Weak   │ Regular │  Good   │Excellent│
    Viable  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                          ↑
                    Your Score: ${total}/100
                    Status: ${total >= 70 ? '✅ Ready to apply' : '⚠️ Needs improvement'}
\`\`\`

### Recommended Actions

${generateRecommendations(total, dimensions)}
`;
}

function getClassification(score) {
  if (score >= 85) return 'EXCELENTE - Listo para postular';
  if (score >= 70) return 'BUENO - Listo con mejoras menores';
  if (score >= 55) return 'REGULAR - Requiere mejoras significativas';
  if (score >= 40) return 'DÉBIL - Iterar profundamente';
  return 'NO VIABLE - Considerar pivot';
}

function getScoreInterpretation(score) {
  if (score >= 85) {
    return `✅ **Excellent (85-100)**: Your project is ready for funding applications. All critical dimensions are strong, with minimal risks and a compelling narrative.`;
  } else if (score >= 70) {
    return `✅ **Good (70-84)**: Your project is fundable with minor improvements. Address the areas highlighted below to strengthen your application.`;
  } else if (score >= 55) {
    return `⚠️ **Regular (55-69)**: Your project requires significant improvements before applying for funding. Focus on the weak areas identified below.`;
  } else if (score >= 40) {
    return `⚠️ **Weak (40-54)**: Your project needs substantial iteration. Consider revisiting the core value proposition and business model.`;
  } else {
    return `❌ **Not Viable (<40)**: The current project direction may not be viable. Consider pivoting or exploring alternative approaches.`;
  }
}

function getDefaultDimensions(scorecard) {
  // Try to extract dimensions from different scorecard structures
  return {
    problema: scorecard.problema || 5,
    solucion: scorecard.solucion || 5,
    innovacion: scorecard.innovacion || 5,
    mercado: scorecard.mercado || 5,
    modelo: scorecard.modeloNegocio || scorecard.modelo || 5,
    tecnica: scorecard.factibilidadTecnica || scorecard.tecnica || 5,
    financiera: scorecard.factibilidadFinanciera || scorecard.financiera || 5,
    legal: scorecard.legalTributario || scorecard.legal || 5,
    impacto: scorecard.impacto || 5,
    escalabilidad: scorecard.escalabilidad || 5,
    equipo: scorecard.equipoEncaje || scorecard.equipo || 5,
    narrativa: scorecard.narrativa || 5,
    postulabilidad: scorecard.postulabilidad || 5
  };
}

function generateDimensionBars(dimensions) {
  const dimList = [
    { key: 'problema', name: 'Problema' },
    { key: 'solucion', name: 'Solución' },
    { key: 'innovacion', name: 'Innovación' },
    { key: 'mercado', name: 'Mercado' },
    { key: 'modelo', name: 'Modelo de Negocio' },
    { key: 'tecnica', name: 'Factibilidad Técnica' },
    { key: 'financiera', name: 'Factibilidad Financiera' },
    { key: 'legal', name: 'Legal/Tributario' },
    { key: 'impacto', name: 'Impacto' },
    { key: 'escalabilidad', name: 'Escalabilidad' },
    { key: 'equipo', name: 'Equipo/Encaje' },
    { key: 'narrativa', name: 'Narrativa' },
    { key: 'postulabilidad', name: 'Postulabilidad' }
  ];
  
  return dimList.map(dim => {
    const score = dimensions[dim.key] || 5;
    const name = dim.name.padEnd(25);
    const bar = '█'.repeat(score) + '░'.repeat(10 - score);
    return `${name} ${score}/10    ${bar}`;
  }).join('\n');
}

function generateDimensionTable(dimensions) {
  const dimList = [
    { key: 'problema', name: 'Problem Definition', weight: 10 },
    { key: 'solucion', name: 'Solution Quality', weight: 10 },
    { key: 'innovacion', name: 'Innovation Level', weight: 10 },
    { key: 'mercado', name: 'Market Opportunity', weight: 10 },
    { key: 'modelo', name: 'Business Model', weight: 10 },
    { key: 'tecnica', name: 'Technical Feasibility', weight: 10 },
    { key: 'financiera', name: 'Financial Viability', weight: 10 },
    { key: 'legal', name: 'Legal/Tax Compliance', weight: 10 },
    { key: 'impacto', name: 'Impact Potential', weight: 10 },
    { key: 'escalabilidad', name: 'Scalability', weight: 10 },
    { key: 'equipo', name: 'Team Fit', weight: 10 },
    { key: 'narrativa', name: 'Narrative Quality', weight: 10 },
    { key: 'postulabilidad', name: 'Application Readiness', weight: 10 }
  ];
  
  const header = `| Dimension | Score | Weight | Status |
|-----------|-------|--------|--------|`;
  
  const rows = dimList.map(dim => {
    const score = dimensions[dim.key] || 5;
    const status = score >= 7 ? '✅ Strong' : score >= 5 ? '⚠️ Acceptable' : '❌ Weak';
    return `| ${dim.name} | ${score}/10 | ${dim.weight}% | ${status} |`;
  });
  
  return header + '\n' + rows.join('\n');
}

function generateStrengths(dimensions) {
  const strengths = Object.entries(dimensions)
    .filter(([key, value]) => value >= 7)
    .map(([key, value]) => {
      const names = {
        problema: 'Problem Definition',
        solucion: 'Solution Quality',
        innovacion: 'Innovation Level',
        mercado: 'Market Opportunity',
        modelo: 'Business Model',
        tecnica: 'Technical Feasibility',
        financiera: 'Financial Viability',
        legal: 'Legal/Tax Compliance',
        impacto: 'Impact Potential',
        escalabilidad: 'Scalability',
        equipo: 'Team Fit',
        narrativa: 'Narrative Quality',
        postulabilidad: 'Application Readiness'
      };
      return `- **${names[key] || key}**: ${value}/10`;
    });
  
  return strengths.length > 0 ? strengths.join('\n') : '- No dimensions scored 7 or above';
}

function generateWeaknesses(dimensions) {
  const weaknesses = Object.entries(dimensions)
    .filter(([key, value]) => value < 5)
    .map(([key, value]) => {
      const names = {
        problema: 'Problem Definition',
        solucion: 'Solution Quality',
        innovacion: 'Innovation Level',
        mercado: 'Market Opportunity',
        modelo: 'Business Model',
        tecnica: 'Technical Feasibility',
        financiera: 'Financial Viability',
        legal: 'Legal/Tax Compliance',
        impacto: 'Impact Potential',
        escalabilidad: 'Scalability',
        equipo: 'Team Fit',
        narrativa: 'Narrative Quality',
        postulabilidad: 'Application Readiness'
      };
      return `- **${names[key] || key}**: ${value}/10`;
    });
  
  return weaknesses.length > 0 ? weaknesses.join('\n') : '- No dimensions scored below 5';
}

function generateRiskImpact(riskModifier) {
  if (riskModifier === 0) {
    return '✅ No risk penalty applied. The project has managed risks effectively.';
  } else if (riskModifier <= 5) {
    return `⚠️ Minor risk penalty (${riskModifier} points). Some risks need attention but are manageable.`;
  } else if (riskModifier <= 10) {
    return `⚠️ Moderate risk penalty (${riskModifier} points). Several significant risks need mitigation strategies.`;
  } else {
    return `❌ Severe risk penalty (${riskModifier} points). Critical risks require immediate attention before proceeding.`;
  }
}

function calculateCategoryScore(dimensions, keys) {
  const scores = keys.map(k => dimensions[k] || 5);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg * 10);
}

function generateRecommendations(total, dimensions) {
  const recommendations = [];
  
  if (total < 70) {
    recommendations.push('1. **Focus on weak dimensions** - Address areas scoring below 5 before applying');
    recommendations.push('2. **Strengthen narrative** - A compelling story can overcome some weaknesses');
    recommendations.push('3. **Validate assumptions** - Test key assumptions with real data');
  }
  
  if (dimensions.problema < 7) {
    recommendations.push('4. **Clarify the problem** - Better articulate the pain point and its urgency');
  }
  
  if (dimensions.mercado < 7) {
    recommendations.push('5. **Strengthen market research** - Add more data on market size and growth');
  }
  
  if (dimensions.financiera < 7) {
    recommendations.push('6. **Improve financial projections** - Add more detail to revenue assumptions');
  }
  
  if (dimensions.equipo < 7) {
    recommendations.push('7. **Highlight team strengths** - Better showcase relevant experience and skills');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ **Project is ready** - No critical improvements needed');
    recommendations.push('1. **Fine-tune narrative** - Polish the story for maximum impact');
    recommendations.push('2. **Prepare materials** - Get presentation and documents ready');
    recommendations.push('3. **Submit applications** - Begin the funding application process');
  }
  
  return recommendations.join('\n');
}
