/**
 * Financial Charts Generator
 * Generates ASCII charts for financial analysis projections
 */

/**
 * Generate revenue projection chart
 */
export function revenue(financialData) {
  const { projections = [], totalYear1 = 0 } = financialData;
  
  // Generate 12-month revenue chart
  const months = projections.slice(0, 12) || Array(12).fill({ revenue: 0 });
  const maxRevenue = Math.max(...months.map(m => m.revenue || 0), 1);
  const scale = maxRevenue > 0 ? 20 / maxRevenue : 1;

  let chart = `
## Revenue Projection (12 Months)

\`\`\`
Revenue (${formatCurrency(maxRevenue)} max)
  │
`;
  
  months.forEach((m, i) => {
    const value = m.revenue || 0;
    const barHeight = Math.round(value * scale);
    const bar = '█'.repeat(barHeight);
    const monthName = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i];
    chart += `  │${bar.padEnd(22)} ${formatCurrency(value).padStart(10)}\n`;
  });

  chart += `  └${'─'.repeat(22)}${'─'.repeat(10)}
     E  F  M  A  M  J  J  A  S  O  N  D    Month
\`\`\`

**Total Year 1:** ${formatCurrency(totalYear1)}
`;

  return chart;
}

/**
 * Generate cash flow chart
 */
export function cashFlow(financialData) {
  const { cashFlow = [] } = financialData;
  
  const months = cashFlow.slice(0, 12) || Array(12).fill({ netFlow: 0, cumulative: 0 });
  
  let chart = `
## Cash Flow Analysis

\`\`\`
Cumulative Cash Position
  │
`;

  const maxCumulative = Math.max(...months.map(m => Math.abs(m.cumulative || 0)), 1);
  const zeroLine = 10;
  const scale = maxCumulative > 0 ? 10 / maxCumulative : 0.1;

  months.forEach((m, i) => {
    const cumulative = m.cumulative || 0;
    const position = Math.round(cumulative * scale);
    const bar = cumulative >= 0 
      ? ' '.repeat(zeroLine) + '█'.repeat(position)
      : '█'.repeat(zeroLine + position) + ' '.repeat(-position);
    const marker = cumulative >= 0 ? '▲' : '▼';
    chart += `  │${bar.padEnd(22)} ${marker} ${formatCurrency(cumulative).padStart(10)}\n`;
  });

  chart += `  └${'─'.repeat(22)}${'─'.repeat(12)}
      Zero Line →  ${'─'.repeat(10)}
\`\`\`
`;

  return chart;
}

/**
 * Generate scenario comparison chart
 */
export function scenarios(financialData) {
  const { scenarios = {} } = financialData;
  const { pessimistic = {}, realistic = {}, optimistic = {} } = scenarios;

  const pessimisticRevenue = pessimistic.year1Revenue || 0;
  const realisticRevenue = realistic.year1Revenue || 0;
  const optimisticRevenue = optimistic.year1Revenue || 0;
  
  const maxRevenue = Math.max(pessimisticRevenue, realisticRevenue, optimisticRevenue, 1);
  const scale = 30 / maxRevenue;

  return `
## Scenario Analysis

\`\`\`
Year 1 Revenue Comparison

Pessimistic  │${'█'.repeat(Math.round(pessimisticRevenue * scale)).padEnd(32)}│ ${formatCurrency(pessimisticRevenue)}
Realistic    │${'█'.repeat(Math.round(realisticRevenue * scale)).padEnd(32)}│ ${formatCurrency(realisticRevenue)}
Optimistic   │${'█'.repeat(Math.round(optimisticRevenue * scale)).padEnd(32)}│ ${formatCurrency(optimisticRevenue)}
             └${'─'.repeat(32)}┘
              $0${' '.repeat(25)}${formatCurrency(maxRevenue)}
\`\`\`

**Scenario Probabilities:**
- Pessimistic: ${pessimistic.probability || '20%'}
- Realistic: ${realistic.probability || '60%'}
- Optimistic: ${optimistic.probability || '20%'}
`;
}

/**
 * Generate burn rate visualization
 */
export function burnRate(financialData) {
  const { monthlyBurnRate = 0, runway = 0, cashBalance = 0 } = financialData;

  const months = Math.round(runway);
  const filledMonths = Math.min(months, 18);
  const emptyMonths = Math.max(0, 18 - filledMonths);

  return `
## Burn Rate & Runway

\`\`\`
Monthly Burn Rate: ${formatCurrency(monthlyBurnRate)}
Cash Balance: ${formatCurrency(cashBalance)}

Runway: ${months} months

${'█'.repeat(filledMonths)}${'░'.repeat(emptyMonths)}
${'▲'.repeat(filledMonths)}${'△'.repeat(emptyMonths)}
<─── Cash Available ───><── Need Funding ──>

Scale: Each █ = 1 month of runway
\`\`\`

**Funding Status:** ${months >= 12 ? '✅ Healthy runway' : months >= 6 ? '⚠️ Monitor cash closely' : '🔴 Urgent funding needed'}
`;
}

/**
 * Generate break-even analysis chart
 */
export function breakeven(financialData) {
  const { 
    fixedCosts = 0, 
    contributionMargin = 0, 
    breakevenUnits = 0,
    currentUnits = 0,
    breakevenMonths = 0
  } = financialData;

  const progress = contributionMargin > 0 ? Math.min(currentUnits / breakevenUnits, 1) : 0;
  const progressBar = '█'.repeat(Math.round(progress * 30));
  const remainingBar = '░'.repeat(30 - Math.round(progress * 30));

  return `
## Break-Even Analysis

\`\`\`
Fixed Costs: ${formatCurrency(fixedCosts)}/month
Contribution Margin: ${formatCurrency(contributionMargin)}/unit
Break-Even Point: ${breakevenUnits.toLocaleString()} units/month

Current Progress to Break-Even:
│${progressBar}${remainingBar}│ ${(progress * 100).toFixed(1)}%

${currentUnits.toLocaleString()} / ${breakevenUnits.toLocaleString()} units
\`\`\`

**Estimated Time to Break-Even:** ${breakevenMonths} months
**Status:** ${progress >= 1 ? '✅ Profitable' : progress >= 0.5 ? '⚠️ Approaching break-even' : '🔴 Pre-revenue phase'}
`;
}

/**
 * Format currency for display
 */
function formatCurrency(value) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${Math.round(value)}`;
}


// All functions exported via export keyword
