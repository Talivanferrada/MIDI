/**
 * Risk Matrix Generator
 * Generates visual risk matrix and distribution charts
 */

/**
 * Generate risk probability vs impact matrix
 */
export function matrix(riskData) {
  const { risks = [] } = riskData;

  // Count risks by position
  const matrix = {
    high: { high: [], medium: [], low: [] },
    medium: { high: [], medium: [], low: [] },
    low: { high: [], medium: [], low: [] }
  };

  risks.forEach(risk => {
    const prob = (risk.probability || 'media').toLowerCase();
    const impact = (risk.impact || 'medio').toLowerCase();
    if (matrix[prob] && matrix[prob][impact]) {
      matrix[prob][impact].push(risk);
    }
  });

  const getCellContent = (risks) => {
    if (risks.length === 0) return '     ';
    if (risks.length <= 3) return risks.map(r => `#${r.id || '?'}`).join(' ');
    return `${risks.length} riesgos`;
  };

  const getCellColor = (prob, impact) => {
    const score = getSeverityScore(prob, impact);
    if (score >= 6) return '🔴';
    if (score >= 4) return '🟡';
    return '🟢';
  };

  return `
## Risk Matrix (Probability vs Impact)

\`\`\`
                           IMPACT
                  Bajo       Medio      Alto
              ┌───────────┬───────────┬───────────┐
         Alta │ 🟡 ${getCellContent(matrix.alta.medio).padEnd(7)}│ 🔴 ${getCellContent(matrix.alta.alto).padEnd(7)}│ 🔴 ${getCellContent(matrix.alta.alto).padEnd(7)}│
              ├───────────┼───────────┼───────────┤
PROBABILIDAD  │ 🟢 ${getCellContent(matrix.media.bajo).padEnd(7)}│ 🟡 ${getCellContent(matrix.media.medio).padEnd(7)}│ 🔴 ${getCellContent(matrix.media.alto).padEnd(7)}│
    Media     │           │           │           │
              ├───────────┼───────────┼───────────┤
         Baja │ 🟢 ${getCellContent(matrix.baja.bajo).padEnd(7)}│ 🟢 ${getCellContent(matrix.baja.medio).padEnd(7)}│ 🟡 ${getCellContent(matrix.baja.alto).padEnd(7)}│
              └───────────┴───────────┴───────────┘

Legend: 🔴 Alto (6-9)  🟡 Medio (2-4)  🟢 Bajo (1)
\`\`\`

**Risk Distribution:**
- 🔴 High Severity: ${risks.filter(r => getSeverityScore(r.probability, r.impact) >= 6).length}
- 🟡 Medium Severity: ${risks.filter(r => {
  const s = getSeverityScore(r.probability, r.impact);
  return s >= 2 && s < 6;
}).length}
- 🟢 Low Severity: ${risks.filter(r => getSeverityScore(r.probability, r.impact) < 2).length}
`;
}

/**
 * Generate risk distribution by category
 */
export function distribution(riskData) {
  const { risks = [] } = riskData;

  const categories = {
    'Mercado': [],
    'Técnico': [],
    'Financiero': [],
    'Legal': [],
    'Operacional': [],
    'Externo': []
  };

  risks.forEach(risk => {
    const cat = risk.category || 'Operacional';
    if (categories[cat]) {
      categories[cat].push(risk);
    }
  });

  const maxCount = Math.max(...Object.values(categories).map(c => c.length), 1);
  const scale = 20 / maxCount;

  let chart = `
## Risk Distribution by Category

\`\`\`
`;

  Object.entries(categories).forEach(([cat, risks]) => {
    const highCount = risks.filter(r => getSeverityScore(r.probability, r.impact) >= 6).length;
    const medCount = risks.filter(r => {
      const s = getSeverityScore(r.probability, r.impact);
      return s >= 2 && s < 6;
    }).length;
    const lowCount = risks.filter(r => getSeverityScore(r.probability, r.impact) < 2).length;

    const highBar = '█'.repeat(Math.round(highCount * scale));
    const medBar = '█'.repeat(Math.round(medCount * scale));
    const lowBar = '█'.repeat(Math.round(lowCount * scale));

    chart += `${cat.padEnd(12)} │ 🔴${highBar} 🟡${medBar} 🟢${lowBar} │ ${risks.length}\n`;
  });

  chart += `             └${'─'.repeat(25)}
              🔴 Alto  🟡 Medio  🟢 Bajo
\`\`\`
`;

  return chart;
}

/**
 * Generate risk mitigation timeline
 */
export function timeline(riskData) {
  const { risks = [] } = riskData;

  const highRisks = risks
    .filter(r => getSeverityScore(r.probability, r.impact) >= 6)
    .sort((a, b) => getSeverityScore(b.probability, b.impact) - getSeverityScore(a.probability, a.impact));

  if (highRisks.length === 0) {
    return `
## Risk Mitigation Timeline

✅ No high-severity risks identified.
`;
  }

  let chart = `
## Risk Mitigation Timeline (High Priority)

\`\`\`
Week  │ Risk ID │ Action Required
──────┼─────────┼──────────────────────────────────────────
`;

  highRisks.slice(0, 5).forEach((risk, i) => {
    const week = i + 1;
    const id = `R-${risk.id || '00'}`.padEnd(7);
    const action = (risk.mitigation || risk.description || 'Review required').substring(0, 40);
    chart += `  ${week.toString().padStart(2)}   │ ${id} │ ${action}\n`;
  });

  chart += `──────┴─────────┴──────────────────────────────────────────
\`\`\`

**Immediate Actions Required:** ${highRisks.length}
`;

  return chart;
}

/**
 * Generate risk summary table
 */
export function summary(riskData) {
  const { risks = [], totalRisks = risks.length } = riskData;

  const high = risks.filter(r => getSeverityScore(r.probability, r.impact) >= 6).length;
  const medium = risks.filter(r => {
    const s = getSeverityScore(r.probability, r.impact);
    return s >= 2 && s < 6;
  }).length;
  const low = risks.filter(r => getSeverityScore(r.probability, r.impact) < 2).length;

  const riskScore = calculateRiskScore(risks);

  return `
## Risk Summary

| Metric | Value |
|--------|-------|
| **Total Risks** | ${totalRisks} |
| **High Severity** | ${high} 🔴 |
| **Medium Severity** | ${medium} 🟡 |
| **Low Severity** | ${low} 🟢 |
| **Overall Risk Score** | ${riskScore}/100 |
| **Risk Level** | ${riskScore >= 70 ? '🔴 Alto' : riskScore >= 40 ? '🟡 Medio' : '🟢 Bajo'} |

**Risk Score Formula:** (High × 30) + (Medium × 10) + (Low × 2) = ${high * 30 + medium * 10 + low * 2}
Normalized to 0-100 scale.
`;
}

/**
 * Helper: Get severity score from probability and impact
 */
function getSeverityScore(probability, impact) {
  const probScores = { 'alta': 3, 'media': 2, 'baja': 1, 'alto': 3, 'medio': 2, 'bajo': 1 };
  const impScores = { 'alto': 3, 'medio': 2, 'bajo': 1, 'alta': 3, 'media': 2, 'baja': 1 };
  
  const prob = (probability || 'media').toLowerCase();
  const imp = (impact || 'medio').toLowerCase();
  
  return (probScores[prob] || 2) * (impScores[imp] || 2);
}

/**
 * Helper: Calculate overall risk score (0-100)
 */
function calculateRiskScore(risks) {
  if (risks.length === 0) return 0;
  
  const high = risks.filter(r => getSeverityScore(r.probability, r.impact) >= 6).length;
  const medium = risks.filter(r => {
    const s = getSeverityScore(r.probability, r.impact);
    return s >= 2 && s < 6;
  }).length;
  
  // Weighted score: each high = 30, each medium = 10
  const rawScore = high * 30 + medium * 10;
  
  // Normalize to 0-100 (assuming max reasonable = 3 high + 5 medium = 140)
  return Math.min(100, Math.round((rawScore / 140) * 100));
}


// All functions exported via export keyword
