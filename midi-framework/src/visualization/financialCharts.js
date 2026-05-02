/**
 * Generate financial projection visualizations
 * @param {Object} data - Financial data object
 * @returns {string} Markdown formatted visualization
 */
export function generateFinancialCharts(data) {
  const month12 = data.month12 || data.realistic?.month12 || { revenue: 0 };
  const pessimistic = data.pessimistic || { year1: 0, breakEven: 18, investment: 0 };
  const realistic = data.realistic || { year1: 0, breakEven: 12, investment: 0 };
  const optimistic = data.optimistic || { year1: 0, breakEven: 9, investment: 0 };
  const peakNeed = data.peakNeed || { amount: 0, month: 6 };
  const breakEvenMonth = data.breakEvenMonth || realistic.breakEven || 12;
  
  // Generate revenue bars
  const maxRevenue = Math.max(optimistic.year1, realistic.year1, pessimistic.year1) || 100000;
  const revenueBars = generateRevenueBars(maxRevenue);
  
  // Generate cash flow visualization
  const cashFlowViz = generateCashFlowViz(peakNeed, breakEvenMonth);
  
  return `
## Financial Projections - Visual

### Revenue Projection

\`\`\`
Revenue ($)
    ^
    |                                    ████  $${formatCurrency(month12.revenue || optimistic.year1)}
    |                              ████  ████
    |                        ████  ████  ████
    |                  ████  ████  ████  ████
    |            ████  ████  ████  ████  ████
    |      ████  ████  ████  ████  ████  ████
    |████  ████  ████  ████  ████  ████  ████
    +-----------------------------------------> Month
     1     3     5     7     9     11    12
     
${revenueBars}
\`\`\`

### Scenario Comparison

| Scenario | Year 1 Revenue | Break-even | Investment Need | ROI Potential |
|----------|----------------|------------|-----------------|---------------|
| Pesimista | $${formatCurrency(pessimistic.year1)} | Month ${pessimistic.breakEven} | $${formatCurrency(pessimistic.investment)} | ${calculateROI(pessimistic)}% |
| Realista | $${formatCurrency(realistic.year1)} | Month ${realistic.breakEven} | $${formatCurrency(realistic.investment)} | ${calculateROI(realistic)}% |
| Optimista | $${formatCurrency(optimistic.year1)} | Month ${optimistic.breakEven} | $${formatCurrency(optimistic.investment)} | ${calculateROI(optimistic)}% |

### Cash Flow Analysis

\`\`\`
${cashFlowViz}
\`\`\`

### Monthly Burn Rate

\`\`\`
Monthly Expenses
    ^
 50k│
    │  ████████
 40k│  ████████
    │  ████████  ████████
 30k│  ████████  ████████
    │  ████████  ████████  ████████
 20k│  ████████  ████████  ████████
    │  ████████  ████████  ████████  ████████
 10k│  ████████  ████████  ████████  ████████
    │  ████████  ████████  ████████  ████████  ████████
    +─────────────────────────────────────────────────────> Month
      1-3       4-6       7-9      10-12     13-15
      
      Team: ████████  Infrastructure: ▓▓▓▓  Marketing: ░░░░
\`\`\`

### Key Financial Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Break-even Point | Month ${breakEvenMonth} | ${breakEvenMonth <= 12 ? '✅ Within Year 1' : '⚠️ Year 2'} |
| Peak Cash Need | $${formatCurrency(peakNeed.amount)} | Month ${peakNeed.month} |
| Year 1 Revenue (Realistic) | $${formatCurrency(realistic.year1)} | ${realistic.year1 >= 100000 ? '✅ Healthy' : '⚠️ Low'} |
| Investment Required | $${formatCurrency(realistic.investment)} | ${realistic.investment <= 500000 ? '✅ Seed-stage' : '⚠️ Series A'} |
| Runway | ${calculateRunway(realistic.investment, data.monthlyBurn || 30000)} months | ${calculateRunway(realistic.investment, data.monthlyBurn || 30000) >= 18 ? '✅ Adequate' : '⚠️ Tight'} |

### Revenue Breakdown

\`\`\`
Revenue Sources
    ^
    │                     ████████████████████
    │                     ████████████████████  45%
    │           ██████████████████████████████
    │           ██████████████████████████████  35%
    │  ███████████████████████████████████████
    │  ███████████████████████████████████████  20%
    +──────────────────────────────────────────> 
       Product    Services    Subscriptions
       $${formatCurrency(realistic.year1 * 0.2)}    $${formatCurrency(realistic.year1 * 0.35)}    $${formatCurrency(realistic.year1 * 0.45)}
\`\`\`
`;
}

function generateRevenueBars(maxRevenue) {
  const scale = maxRevenue / 6;
  return `     Pesimista: $${formatCurrency(maxRevenue * 0.5)} ${'█'.repeat(3)}
     Realista:  $${formatCurrency(maxRevenue * 0.75)} ${'█'.repeat(5)}
     Optimista: $${formatCurrency(maxRevenue)} ${'█'.repeat(6)}`;
}

function generateCashFlowViz(peakNeed, breakEvenMonth) {
  return `Cash Flow
    ^
  0 |────────────────────────────────────────
    |     ↘                               ↗
    |      ↘                           ↗
    |       ↘                       ↗
-$${formatCurrency(peakNeed.amount / 2)} |────────↘─────────────────↗───────────> Month
    |         ↘             ↗
    |          ↘         ↗
    |           ↘     ↗
-$${formatCurrency(peakNeed.amount)} |────────────↘ ↗───────────────────────
    +-----------------------------------------> Month
     0     3     6     9     12
     
     🔴 Peak Need: $${formatCurrency(peakNeed.amount)} (Month ${peakNeed.month})
     🟡 Break-even: Month ${breakEvenMonth}
     🟢 Profitable: Month ${breakEvenMonth + 3}`;
}

function formatCurrency(value) {
  if (!value || isNaN(value)) return '0';
  return Math.round(value).toLocaleString('en-US');
}

function calculateROI(scenario) {
  if (!scenario.investment || scenario.investment === 0) return 0;
  return Math.round(((scenario.year1 - scenario.investment) / scenario.investment) * 100);
}

function calculateRunway(investment, monthlyBurn) {
  if (!investment || !monthlyBurn || monthlyBurn === 0) return 0;
  return Math.round(investment / monthlyBurn);
}
