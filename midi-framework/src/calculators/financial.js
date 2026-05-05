/**
 * MIDI Framework - Financial Calculators
 * Helper functions for financial analysis
 */

/**
 * Calculate break-even point
 */
export function calculateBreakEven(fixedCosts, pricePerUnit, variableCostPerUnit) {
  if (pricePerUnit <= variableCostPerUnit) {
    return {
      units: Infinity,
      revenue: Infinity,
      contributionMargin: 0,
      message: 'Precio debe ser mayor que costo variable'
    };
  }
  
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  
  return {
    units: breakEvenUnits,
    revenue: breakEvenRevenue,
    contributionMargin,
    message: `${breakEvenUnits.toLocaleString()} unidades para cubrir costos`
  };
}

/**
 * Calculate cash flow projections
 */
export function calculateCashFlow(params) {
  const {
    initialInvestment = 0,
    monthlyRevenue = [],
    monthlyFixedCosts = 0,
    variableCostPercent = 0,
    months = 12
  } = params;
  
  const projections = [];
  let cumulative = -initialInvestment;
  let peakCashNeed = -initialInvestment;
  let positiveCashMonth = null;
  
  for (let i = 0; i < months; i++) {
    const revenue = monthlyRevenue[i] || 0;
    const variableCosts = revenue * (variableCostPercent / 100);
    const netFlow = revenue - monthlyFixedCosts - variableCosts;
    cumulative += netFlow;
    
    if (cumulative < peakCashNeed) {
      peakCashNeed = cumulative;
    }
    
    if (cumulative > 0 && positiveCashMonth === null) {
      positiveCashMonth = i + 1;
    }
    
    projections.push({
      month: i + 1,
      revenue,
      fixedCosts: monthlyFixedCosts,
      variableCosts,
      netFlow,
      cumulative
    });
  }
  
  return {
    projections,
    peakCashNeed: Math.abs(peakCashNeed),
    positiveCashMonth: positiveCashMonth || 'No alcanza en 12 meses',
    totalRevenue: projections.reduce((sum, p) => sum + p.revenue, 0),
    totalCosts: projections.reduce((sum, p) => sum + p.fixedCosts + p.variableCosts, 0),
    finalPosition: cumulative
  };
}

/**
 * Calculate revenue projections with growth rate
 */
export function calculateRevenueProjections(params) {
  const {
    initialClients = 0,
    growthRate = 0,
    churnRate = 0,
    pricePerClient = 0,
    months = 12
  } = params;
  
  const projections = [];
  let clients = initialClients;
  
  for (let i = 0; i < months; i++) {
    const newClients = Math.round(clients * (growthRate / 100));
    const lostClients = Math.round(clients * (churnRate / 100));
    clients = Math.max(0, clients + newClients - lostClients);
    
    const revenue = clients * pricePerClient;
    
    projections.push({
      month: i + 1,
      clients,
      newClients,
      lostClients,
      revenue
    });
  }
  
  return {
    projections,
    year1Revenue: projections.reduce((sum, p) => sum + p.revenue, 0),
    finalClients: clients,
    averageMonthlyRevenue: projections.reduce((sum, p) => sum + p.revenue, 0) / months
  };
}

/**
 * Calculate CAC (Customer Acquisition Cost)
 */
export function calculateCAC(params) {
  const {
    marketingSpend = 0,
    salesTeamCost = 0,
    toolsAndSoftware = 0,
    newCustomersAcquired = 1
  } = params;
  
  const totalAcquisitionCost = marketingSpend + salesTeamCost + toolsAndSoftware;
  const cac = totalAcquisitionCost / Math.max(1, newCustomersAcquired);
  
  return {
    totalAcquisitionCost,
    cac,
    breakdown: {
      marketing: marketingSpend,
      sales: salesTeamCost,
      tools: toolsAndSoftware
    }
  };
}

/**
 * Calculate LTV (Lifetime Value)
 */
export function calculateLTV(params) {
  const {
    averageRevenuePerCustomer = 0,
    grossMargin = 100,
    averageCustomerLifespanMonths = 12,
    churnRate = 0
  } = params;
  
  // If churn rate provided, use it to calculate lifespan
  const lifespan = churnRate > 0 ? (1 / (churnRate / 100)) : averageCustomerLifespanMonths;
  
  const ltv = averageRevenuePerCustomer * (grossMargin / 100) * lifespan;
  const ltvToCacRatio = 0; // Will be calculated when combined with CAC
  
  return {
    ltv,
    averageLifespanMonths: lifespan,
    grossMarginPercent: grossMargin,
    ltvToCacRatio: null // Set externally when CAC is known
  };
}

/**
 * Calculate LTV:CAC ratio
 */
export function calculateLtvCacRatio(ltv, cac) {
  if (cac <= 0) return { ratio: 0, interpretation: 'CAC no válido' };
  
  const ratio = ltv / cac;
  
  let interpretation = '';
  if (ratio >= 3) {
    interpretation = '✅ Excelente - Escalable';
  } else if (ratio >= 1) {
    interpretation = '⚠️ Aceptable - Monitorear';
  } else {
    interpretation = '🔴 Problemático - No sostenible';
  }
  
  return { ratio, interpretation };
}

/**
 * Calculate runway
 */
export function calculateRunway(params) {
  const {
    cashBalance = 0,
    monthlyBurnRate = 0,
    monthlyRevenue = 0
  } = params;
  
  const netBurn = monthlyBurnRate - monthlyRevenue;
  
  if (netBurn <= 0) {
    return {
      months: Infinity,
      status: 'profitable',
      message: 'Ya es rentable o cercano a break-even'
    };
  }
  
  const runway = Math.floor(cashBalance / netBurn);
  
  let status = '';
  if (runway >= 18) {
    status = 'healthy';
  } else if (runway >= 12) {
    status = 'good';
  } else if (runway >= 6) {
    status = 'caution';
  } else {
    status = 'critical';
  }
  
  return {
    months: runway,
    netBurn,
    status,
    message: `${runway} meses de runway`
  };
}

/**
 * Calculate investment requirements
 */
export function calculateInvestmentRequired(params) {
  const {
    initialInvestment = 0,
    monthlyBurn = 0,
    monthsToProfitability = 12,
    bufferMonths = 3,
    contingencyPercent = 10
  } = params;
  
  const operationalCosts = monthlyBurn * monthsToProfitability;
  const bufferCosts = monthlyBurn * bufferMonths;
  const subtotal = initialInvestment + operationalCosts + bufferCosts;
  const contingency = subtotal * (contingencyPercent / 100);
  const total = subtotal + contingency;
  
  return {
    initialInvestment,
    operationalCosts,
    bufferCosts,
    contingency,
    totalRequired: total,
    breakdown: {
      'Inversión inicial': initialInvestment,
      'Operación hasta rentabilidad': operationalCosts,
      'Buffer de seguridad': bufferCosts,
      'Contingencia': contingency
    }
  };
}

/**
 * Calculate scenario analysis
 */
export function calculateScenarios(baseParams) {
  const {
    baseRevenue = 0,
    baseCosts = 0,
    baseGrowth = 0
  } = baseParams;
  
  return {
    pessimistic: {
      revenue: baseRevenue * 0.5,
      costs: baseCosts * 1.2,
      growth: baseGrowth * 0.5,
      probability: '20%',
      label: 'Escenario Pesimista'
    },
    realistic: {
      revenue: baseRevenue,
      costs: baseCosts,
      growth: baseGrowth,
      probability: '60%',
      label: 'Escenario Realista'
    },
    optimistic: {
      revenue: baseRevenue * 1.5,
      costs: baseCosts * 0.9,
      growth: baseGrowth * 1.5,
      probability: '20%',
      label: 'Escenario Optimista'
    }
  };
}

/**
 * Validate financial assumptions against benchmarks
 */
export function validateAgainstBenchmarks(projections, industry = 'saas') {
  const warnings = [];
  
  const benchmarks = {
    saas: {
      maxCac: 200,
      minLtvCac: 3,
      maxChurn: 5,
      typicalGrowth: 10
    },
    ecommerce: {
      maxCac: 50,
      minLtvCac: 2,
      maxChurn: 10,
      typicalGrowth: 15
    },
    marketplace: {
      maxCac: 100,
      minLtvCac: 2.5,
      maxChurn: 8,
      typicalGrowth: 20
    }
  };
  
  const benchmark = benchmarks[industry] || benchmarks.saas;
  
  // Check CAC
  if (projections.cac && projections.cac > benchmark.maxCac * 1.5) {
    warnings.push(`⚠️ CAC (${projections.cac}) es >50% sobre benchmark (${benchmark.maxCac})`);
  }
  
  // Check LTV:CAC
  if (projections.ltvCacRatio && projections.ltvCacRatio < benchmark.minLtvCac) {
    warnings.push(`⚠️ LTV:CAC (${projections.ltvCacRatio}) bajo benchmark mínimo (${benchmark.minLtvCac})`);
  }
  
  // Check churn
  if (projections.churnRate && projections.churnRate > benchmark.maxChurn) {
    warnings.push(`⚠️ Churn rate (${projections.churnRate}%) alto vs benchmark (${benchmark.maxChurn}%)`);
  }
  
  // Check growth
  if (projections.growthRate && projections.growthRate > benchmark.typicalGrowth * 2) {
    warnings.push(`⚠️ Crecimiento (${projections.growthRate}%) muy agresivo vs benchmark (${benchmark.typicalGrowth}%)`);
  }
  
  return {
    benchmark,
    warnings,
    isValid: warnings.length === 0
  };
}

// All functions exported via export keyword
