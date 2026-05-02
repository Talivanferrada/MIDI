/**
 * Generate Risk Matrix visualizations
 * @param {Array} risks - Array of risk objects
 * @returns {string} Markdown formatted visualization
 */
export function generateRiskMatrixVisual(risks) {
  if (!risks || !Array.isArray(risks) || risks.length === 0) {
    return `
## Risk Matrix - Visual

### No Risks Identified

No risks have been registered in the risk register. Consider conducting a comprehensive risk assessment.
`;
  }

  // Categorize risks by severity
  const highRisks = risks.filter(r => r.severity === 'Alto' || r.riskLevel === 'Alto');
  const medRisks = risks.filter(r => r.severity === 'Medio' || r.riskLevel === 'Medio');
  const lowRisks = risks.filter(r => r.severity === 'Bajo' || r.riskLevel === 'Bajo');
  
  // Calculate matrix counts
  const matrix = calculateMatrixCounts(risks);
  
  return `
## Risk Matrix - Visual

### Probability vs Impact Matrix

\`\`\`
                    IMPACT
                 Bajo    Medio    Alto
           ┌────────┬────────┬────────┐
     Alto  │   ⚠️   │   🔴   │   🔴   │
PROB       │   ${matrix.high.bajo}    │   ${matrix.high.medio}    │   ${matrix.high.alto}    │
           ├────────┼────────┼────────┤
    Medio  │   ⚠️   │   ⚠️   │   🔴   │
           │   ${matrix.medium.bajo}    │   ${matrix.medium.medio}    │   ${matrix.medium.alto}    │
           ├────────┼────────┼────────┤
     Bajo  │   ✅   │   ✅   │   ⚠️   │
           │   ${matrix.low.bajo}    │   ${matrix.low.medio}    │   ${matrix.low.alto}    │
           └────────┴────────┴────────┘

✅ = Accept/Monitor    ⚠️ = Monitor Closely    🔴 = Immediate Action
\`\`\`

### Risk Distribution

\`\`\`
Risk Count
    ^
${generateRiskBarChart(highRisks.length, medRisks.length, lowRisks.length)}
    +──────────────────────────> Severity
       Alto  Medio  Bajo
        ${highRisks.length}      ${medRisks.length}      ${lowRisks.length}
\`\`\`

### Risk Summary

| Severity | Count | Percentage | Action Required |
|----------|-------|------------|-----------------|
| 🔴 Alto | ${highRisks.length} | ${calculatePercentage(highRisks.length, risks.length)}% | Immediate mitigation |
| ⚠️ Medio | ${medRisks.length} | ${calculatePercentage(medRisks.length, risks.length)}% | Monitor and plan |
| ✅ Bajo | ${lowRisks.length} | ${calculatePercentage(lowRisks.length, risks.length)}% | Accept and track |

### Top 5 Risks Requiring Immediate Action

${generateRiskTable(highRisks)}

${highRisks.length > 5 ? `\n_+ ${highRisks.length - 5} more high-severity risks_` : ''}

### Medium Priority Risks

${generateRiskTable(medRisks.slice(0, 3))}

### Risk Mitigation Timeline

\`\`\`
Month 1-3: Immediate
${highRisks.slice(0, 3).map(r => `  🔴 ${r.name || r.risk}`).join('\n') || '  No critical risks'}

Month 3-6: Short-term
${medRisks.slice(0, 3).map(r => `  ⚠️ ${r.name || r.risk}`).join('\n') || '  No medium risks'}

Month 6-12: Long-term
${lowRisks.slice(0, 3).map(r => `  ✅ ${r.name || r.risk}`).join('\n') || '  No low risks'}
\`\`\`

### Mitigation Status

\`\`\`
Mitigation Progress
    ^
100%│              ████  ████  ████
    │        ████  ████  ████  ████  ████
 75%│  ████  ████  ████  ████  ████  ████
    │  ████  ████  ████  ████  ████  ████
 50%│  ████  ████  ████  ████  ████  ████
    │  ████  ████  ████  ████  ████  ████
 25%│  ████  ████  ████  ████  ████  ████
    │  ████  ████  ████  ████  ████  ████
    +──────────────────────────────────────> Risk
      ${risks.slice(0, 6).map(() => '█').join('  ')}
      
      ████ Complete   ▓▓▓▓ In Progress   ░░░░ Not Started
\`\`\`
`;
}

function calculateMatrixCounts(risks) {
  const matrix = {
    high: { bajo: 0, medio: 0, alto: 0 },
    medium: { bajo: 0, medio: 0, alto: 0 },
    low: { bajo: 0, medio: 0, alto: 0 }
  };
  
  risks.forEach(risk => {
    const prob = (risk.probability || 'Medio').toLowerCase();
    const impact = (risk.impact || 'Medio').toLowerCase();
    
    if (prob.includes('alto')) {
      if (impact.includes('alto')) matrix.high.alto++;
      else if (impact.includes('bajo')) matrix.high.bajo++;
      else matrix.high.medio++;
    } else if (prob.includes('bajo')) {
      if (impact.includes('alto')) matrix.low.alto++;
      else if (impact.includes('bajo')) matrix.low.bajo++;
      else matrix.low.medio++;
    } else {
      if (impact.includes('alto')) matrix.medium.alto++;
      else if (impact.includes('bajo')) matrix.medium.bajo++;
      else matrix.medium.medio++;
    }
  });
  
  return matrix;
}

function generateRiskBarChart(high, medium, low) {
  const maxCount = Math.max(high, medium, low, 1);
  const scale = 5 / maxCount;
  
  const highBar = '█'.repeat(Math.round(high * scale));
  const medBar = '█'.repeat(Math.round(medium * scale));
  const lowBar = '█'.repeat(Math.round(low * scale));
  
  return `  ${maxCount} │     ${highBar}
    │     ${highBar}  ${medBar}
  3 │     ${highBar}  ${medBar}  ${lowBar}
  2 │     ${highBar}  ${medBar}  ${lowBar}
  1 │     ${highBar}  ${medBar}  ${lowBar}
  0 │     ${highBar}  ${medBar}  ${lowBar}`;
}

function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

function generateRiskTable(risks) {
  if (!risks || risks.length === 0) {
    return 'No risks in this category.';
  }
  
  const header = `| # | Riesgo | Probabilidad | Impacto | Acción |
|---|--------|--------------|---------|--------|`;
  
  const rows = risks.slice(0, 5).map((r, i) => {
    const name = (r.name || r.risk || 'Unknown').substring(0, 30);
    const prob = r.probability || 'Medio';
    const impact = r.impact || 'Medio';
    const action = (r.mitigation || r.action || 'Not defined').substring(0, 30);
    
    return `| ${i + 1} | ${name} | ${prob} | ${impact} | ${action} |`;
  });
  
  return header + '\n' + rows.join('\n');
}
