/**
 * Tests for Financial Calculators
 */

import { describe, it, expect } from 'vitest';
import {
  calculateBreakEven,
  calculateCashFlow,
  calculateRevenueProjections,
  calculateCAC,
  calculateLTV,
  calculateLtvCacRatio,
  calculateRunway,
  calculateInvestmentRequired,
  calculateScenarios,
  validateAgainstBenchmarks
} from '../src/calculators/financial.js';

describe('calculateBreakEven', () => {
  it('should calculate break-even point correctly', () => {
    const result = calculateBreakEven(10000, 100, 20);
    
    expect(result.contributionMargin).toBe(80);
    expect(result.units).toBe(125);
    expect(result.revenue).toBe(12500);
  });

  it('should handle zero variable cost', () => {
    const result = calculateBreakEven(10000, 100, 0);
    
    expect(result.contributionMargin).toBe(100);
    expect(result.units).toBe(100);
  });

  it('should handle invalid inputs (price <= variable cost)', () => {
    const result = calculateBreakEven(10000, 50, 60);
    
    expect(result.units).toBe(Infinity);
    expect(result.message).toContain('mayor');
  });
});

describe('calculateCashFlow', () => {
  it('should calculate 12-month cash flow projections', () => {
    const params = {
      initialInvestment: 50000,
      monthlyRevenue: Array(12).fill(20000),
      monthlyFixedCosts: 10000,
      variableCostPercent: 20,
      months: 12
    };

    const result = calculateCashFlow(params);
    
    expect(result.projections).toHaveLength(12);
    expect(result.projections[0].revenue).toBe(20000);
    expect(result.projections[0].fixedCosts).toBe(10000);
    expect(result.projections[0].variableCosts).toBe(4000); // 20% of 20000
    expect(result.totalRevenue).toBe(240000);
  });

  it('should identify positive cash month', () => {
    const params = {
      initialInvestment: 10000,
      monthlyRevenue: [5000, 10000, 15000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000],
      monthlyFixedCosts: 5000,
      variableCostPercent: 0,
      months: 12
    };

    const result = calculateCashFlow(params);
    
    expect(result.positiveCashMonth).not.toBe('No alcanza en 12 meses');
    expect(result.finalPosition).toBeGreaterThan(0);
  });
});

describe('calculateRevenueProjections', () => {
  it('should project revenue with growth and churn', () => {
    const params = {
      initialClients: 100,
      growthRate: 10,
      churnRate: 5,
      pricePerClient: 100,
      months: 12
    };

    const result = calculateRevenueProjections(params);
    
    expect(result.projections).toHaveLength(12);
    expect(result.year1Revenue).toBeGreaterThan(0);
    expect(result.finalClients).toBeGreaterThan(0);
  });

  it('should handle zero churn', () => {
    const params = {
      initialClients: 50,
      growthRate: 10,
      churnRate: 0,
      pricePerClient: 200,
      months: 12
    };

    const result = calculateRevenueProjections(params);
    
    expect(result.finalClients).toBeGreaterThan(50);
  });
});

describe('calculateCAC', () => {
  it('should calculate customer acquisition cost', () => {
    const params = {
      marketingSpend: 10000,
      salesTeamCost: 5000,
      toolsAndSoftware: 1000,
      newCustomersAcquired: 100
    };

    const result = calculateCAC(params);
    
    expect(result.totalAcquisitionCost).toBe(16000);
    expect(result.cac).toBe(160);
    expect(result.breakdown.marketing).toBe(10000);
  });

  it('should handle zero customers', () => {
    const result = calculateCAC({
      marketingSpend: 10000,
      newCustomersAcquired: 0
    });
    
    expect(result.cac).toBe(10000); // Total cost / 1 to avoid division by zero
  });
});

describe('calculateLTV', () => {
  it('should calculate lifetime value', () => {
    const params = {
      averageRevenuePerCustomer: 100,
      grossMargin: 80,
      averageCustomerLifespanMonths: 24
    };

    const result = calculateLTV(params);
    
    expect(result.ltv).toBe(1920); // 100 * 0.8 * 24
  });

  it('should calculate lifespan from churn rate', () => {
    const params = {
      averageRevenuePerCustomer: 100,
      grossMargin: 100,
      churnRate: 10 // 10% churn = 10 month average lifespan
    };

    const result = calculateLTV(params);
    
    expect(result.averageLifespanMonths).toBe(10);
    expect(result.ltv).toBe(1000); // 100 * 1 * 10
  });
});

describe('calculateLtvCacRatio', () => {
  it('should calculate LTV:CAC ratio', () => {
    const result = calculateLtvCacRatio(300, 100);
    
    expect(result.ratio).toBe(3);
    expect(result.interpretation).toContain('Excelente');
  });

  it('should warn on low ratio', () => {
    const result = calculateLtvCacRatio(50, 100);
    
    expect(result.ratio).toBe(0.5);
    expect(result.interpretation).toContain('Problemático');
  });
});

describe('calculateRunway', () => {
  it('should calculate runway in months', () => {
    const params = {
      cashBalance: 100000,
      monthlyBurnRate: 10000,
      monthlyRevenue: 0
    };

    const result = calculateRunway(params);
    
    expect(result.months).toBe(10);
    expect(result.status).toBe('caution');
  });

  it('should identify profitable status', () => {
    const params = {
      cashBalance: 50000,
      monthlyBurnRate: 10000,
      monthlyRevenue: 15000
    };

    const result = calculateRunway(params);
    
    expect(result.status).toBe('profitable');
  });
});

describe('calculateInvestmentRequired', () => {
  it('should calculate total investment needed', () => {
    const params = {
      initialInvestment: 50000,
      monthlyBurn: 10000,
      monthsToProfitability: 12,
      bufferMonths: 3,
      contingencyPercent: 10
    };

    const result = calculateInvestmentRequired(params);
    
    expect(result.initialInvestment).toBe(50000);
    expect(result.operationalCosts).toBe(120000);
    expect(result.bufferCosts).toBe(30000);
    expect(result.totalRequired).toBeGreaterThan(200000);
  });
});

describe('calculateScenarios', () => {
  it('should generate pessimistic, realistic, and optimistic scenarios', () => {
    const result = calculateScenarios({
      baseRevenue: 100000,
      baseCosts: 80000,
      baseGrowth: 10
    });

    expect(result.pessimistic.revenue).toBe(50000);
    expect(result.realistic.revenue).toBe(100000);
    expect(result.optimistic.revenue).toBe(150000);
    expect(result.pessimistic.probability).toBe('20%');
  });
});

describe('validateAgainstBenchmarks', () => {
  it('should validate SaaS benchmarks', () => {
    const projections = {
      cac: 150,
      ltvCacRatio: 4,
      churnRate: 3,
      growthRate: 12
    };

    const result = validateAgainstBenchmarks(projections, 'saas');
    
    expect(result.isValid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it('should warn on high CAC', () => {
    const projections = {
      cac: 500, // 2.5x benchmark
      ltvCacRatio: 1,
      churnRate: 10,
      growthRate: 50
    };

    const result = validateAgainstBenchmarks(projections, 'saas');
    
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings.some(w => w.includes('CAC'))).toBe(true);
  });

  it('should warn on aggressive growth', () => {
    const projections = {
      cac: 100,
      ltvCacRatio: 3,
      churnRate: 5,
      growthRate: 50 // 5x typical
    };

    const result = validateAgainstBenchmarks(projections, 'saas');
    
    expect(result.warnings.some(w => w.includes('crecimiento') || w.includes('Crecimiento'))).toBe(true);
  });
});
