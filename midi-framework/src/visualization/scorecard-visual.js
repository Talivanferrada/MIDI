/**
 * Scorecard Visual Generator
 * Generates visual representations for evaluation scorecards
 */

/**
 * Generate overall score visual
 */
export function overall(evaluationData) {
  const { finalScore = 0, classification = 'REGULAR' } = evaluationData;
  
  const score = Math.max(0, Math.min(100, finalScore));
  const filled = Math.round(score / 5);
  const empty = 20 - filled;
  
  const colorEmoji = score >= 85 ? '🟢' : score >= 70 ? '🟡' : score >= 55 ? '🟠' : '🔴';
  
  const progressBar = `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
  
  return `
## Overall Score

\`\`\`
┌──────────────────────────────────────────────────────┐
│                                                      │
│   ${colorEmoji}  FINAL SCORE: ${score.toString().padStart(3)} / 100                  │
│                                                      │
│   [${progressBar}] ${score}%   │
│                                                      │
│   Classification: ${classification.padEnd(30)}│
│                                                      │
└──────────────────────────────────────────────────────┘
\`\`\`

${getScoreInterpretation(score)}
`;
}

/**
 * Generate dimension bars chart
 */
export function dimensions(evaluationData) {
  const { dimensionScores = {} } = evaluationData;
  
  const defaultDimensions = {
    'Problema': 0,
    'Solución': 0,
    'Innovación': 0,
    'Mercado': 0,
    'Modelo de Negocio': 0,
    'Factibilidad Técnica': 0,
    'Factibilidad Financiera': 0,
    'Legal/Tributario': 0,
    'Impacto': 0,
    'Escalabilidad': 0,
    'Equipo/Encaje': 0,
    'Narrativa': 0,
    'Postulabilidad': 0
  };
  
  const scores = { ...defaultDimensions, ...dimensionScores };
  
  let chart = `
## Score by Dimension

\`\`\`
`;
  
  Object.entries(scores).forEach(([dim, score]) => {
    const s = Math.max(0, Math.min(100, score));
    const filled = Math.round(s / 5);
    const empty = 20 - filled;
    const bar = `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
    const emoji = s >= 85 ? '🟢' : s >= 70 ? '🟡' : s >= 55 ? '🟠' : '🔴';
    
    chart += `${emoji} ${dim.padEnd(22)} │[${bar}] ${s.toString().padStart(3)}\n`;
  });
  
  chart += `\`\`\`
`;
  
  return chart;
}

/**
 * Generate strengths visualization
 */
export function strengths(evaluationData) {
  const { strengths = [] } = evaluationData;
  
  if (strengths.length === 0) {
    return `
## Strengths

No significant strengths identified. Consider improving overall project quality.
`;
  }
  
  let chart = `
## Top Strengths

\`\`\`
`;
  
  strengths.slice(0, 3).forEach((strength, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
    const score = strength.score || 0;
    const filled = Math.round(score / 5);
    const bar = '█'.repeat(filled);
    
    chart += `
${medal} ${strength.dimension || `Strength ${i + 1}`}
   Score: ${score}/100
   ${bar}
   ${strength.justification || 'Strong performance in this dimension'}
`;
  });
  
  chart += `\`\`\`
`;
  
  return chart;
}

/**
 * Generate weaknesses visualization
 */
export function weaknesses(evaluationData) {
  const { weaknesses = [] } = evaluationData;
  
  if (weaknesses.length === 0) {
    return `
## Weaknesses

✅ No critical weaknesses identified. Project is well-balanced.
`;
  }
  
  let chart = `
## Top Weaknesses (Require Attention)

\`\`\`
`;
  
  weaknesses.slice(0, 3).forEach((weakness, i) => {
    const priority = i === 0 ? '🔴 HIGH' : i === 1 ? '🟠 MEDIUM' : '🟡 LOW';
    const score = weakness.score || 0;
    const filled = Math.round(score / 5);
    const empty = 20 - filled;
    const bar = `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
    
    chart += `
${priority} ${weakness.dimension || `Weakness ${i + 1}`}
   Score: ${score}/100
   [${bar}]
   ⚠️  ${weakness.justification || 'Needs improvement'}
   📋 Action: ${weakness.improvement || 'Review and strengthen this area'}
`;
  });
  
  chart += `\`\`\`
`;
  
  return chart;
}

/**
 * Generate radar chart representation
 */
export function radar(evaluationData) {
  const { dimensionScores = {} } = evaluationData;
  
  const dimensions = [
    'Problema',
    'Solución',
    'Innovación',
    'Mercado',
    'Modelo de Negocio',
    'Factibilidad Técnica',
    'Factibilidad Financiera',
    'Legal/Tributario',
    'Impacto',
    'Escalabilidad',
    'Equipo/Encaje',
    'Narrativa',
    'Postulabilidad'
  ];
  
  const scores = dimensions.map(d => dimensionScores[d] || 50);
  
  // Simple radar representation using ASCII
  const levels = [20, 40, 60, 80, 100];
  
  let chart = `
## Evaluation Radar Chart

\`\`\`
                    ${dimensions[0]}
                       ▲
                       │
        ${dimensions[12].padEnd(13)}│${dimensions[1].padStart(13)}
                     ╱ │ ╲
                    ╱  │  ╲
  ${dimensions[11].padEnd(10)}╱   │   ╲${dimensions[2].padStart(10)}
                  ╱    │    ╲
                 ╱     │     ╲
                ╱      │      ╲
${dimensions[10].padEnd(8)}─┼───────┼${dimensions[3].padStart(8)}
                ╲      │      ╱
                 ╲     │     ╱
                  ╲    │    ╱
  ${dimensions[9].padEnd(10)}╲   │   ╱${dimensions[4].padStart(10)}
                    ╲  │  ╱
                     ╲ │ ╱
        ${dimensions[8].padEnd(13)}│${dimensions[5].padStart(13)}
                       │
                       ▼
              ${dimensions[7].padEnd(10)} ${dimensions[6]}

Score Levels:
  ─ ─  20 (Low)
  ─ ─  40 (Below Average)
  ─ ─  60 (Average)
  ─ ─  80 (Good)
  ─ ─ 100 (Excellent)
\`\`\`

**Average Score:** ${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}/100
`;
  
  return chart;
}

/**
 * Helper: Get score interpretation
 */
function getScoreInterpretation(score) {
  if (score >= 85) {
    return `✅ **EXCELENTE** - Listo para postular/ejecutar
El proyecto demuestra fortalezas claras en múltiples dimensiones y está 
preparado para presentación a fondos o ejecución inmediata.`;
  } else if (score >= 70) {
    return `✅ **BUENO** - Puede proceder con ajustes menores
El proyecto es sólido pero tiene áreas que pueden mejorarse antes de 
postular o ejecutar.`;
  } else if (score >= 55) {
    return `⚠️ **REGULAR** - Requiere mejoras significativas
El proyecto tiene potencial pero necesita trabajo en dimensiones clave 
antes de estar listo para fondos o ejecución.`;
  } else if (score >= 40) {
    return `⚠️ **DÉBIL** - Revisar fundamentos
El proyecto tiene debilidades significativas que deben abordarse antes 
de proceder. Posible pivot necesario.`;
  } else {
    return `🔴 **NO VIABLE** - Reformular o descartar
El proyecto en su estado actual no cumple con criterios mínimos para 
ser financiable o ejecutable.`;
  }
}


// All functions exported via export keyword
