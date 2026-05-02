import { describe, it, expect, beforeEach } from 'vitest';
import { Visualizer } from '../src/visualization/visualizer.js';
import { generateBMCVisual } from '../src/visualization/bmcVisual.js';
import { generateFinancialCharts } from '../src/visualization/financialCharts.js';
import { generateRiskMatrixVisual } from '../src/visualization/riskMatrixVisual.js';
import { generateScorecardVisual } from '../src/visualization/scorecardVisual.js';
import fs from 'fs-extra';
import path from 'path';

describe('Visualization Module', () => {
  let visualizer;
  const testOutputPath = './test-output';

  beforeEach(() => {
    visualizer = new Visualizer(testOutputPath);
  });

  describe('Visualizer Class', () => {
    it('should instantiate with output path', () => {
      expect(visualizer).toBeInstanceOf(Visualizer);
      expect(visualizer.outputPath).toBe(testOutputPath);
    });

    it('should generate all visualizations', async () => {
      const data = {
        bmc: {
          keyPartners: 'Technology providers, Local businesses',
          keyActivities: 'Product development, Sales',
          keyResources: 'Team, Technology platform',
          valueProposition: 'Affordable AI solutions for SMEs',
          customerRelationships: 'Direct sales, Support',
          channels: 'Online, Direct sales',
          customerSegments: 'Small and medium enterprises',
          costStructure: 'Development, Marketing, Operations',
          revenueStreams: 'Subscriptions, Professional services'
        },
        financials: {
          month12: { revenue: 150000 },
          realistic: { year1: 150000, breakEven: 12, investment: 200000 },
          optimistic: { year1: 250000, breakEven: 9, investment: 200000 },
          pessimistic: { year1: 80000, breakEven: 18, investment: 300000 },
          peakNeed: { amount: 150000, month: 6 },
          breakEvenMonth: 12
        },
        risks: [
          { name: 'Market competition', probability: 'Alto', impact: 'Medio', severity: 'Alto', mitigation: 'Differentiate through quality' },
          { name: 'Technical debt', probability: 'Medio', impact: 'Bajo', severity: 'Medio', mitigation: 'Regular refactoring sprints' }
        ],
        evaluation: {
          totalScore: 78,
          baseScore: 80,
          riskModifier: 2,
          dimensions: {
            problema: 8,
            solucion: 7,
            innovacion: 8,
            mercado: 7,
            modelo: 8,
            tecnica: 7,
            financiera: 8,
            legal: 6,
            impacto: 8,
            escalabilidad: 7,
            equipo: 7,
            narrativa: 8,
            postulabilidad: 7
          }
        }
      };

      const visualizations = await visualizer.generateAll(data);

      expect(visualizations).toHaveProperty('bmc');
      expect(visualizations).toHaveProperty('financials');
      expect(visualizations).toHaveProperty('risks');
      expect(visualizations).toHaveProperty('evaluation');
    });
  });

  describe('BMC Visual', () => {
    it('should generate BMC visualization', () => {
      const bmcData = {
        keyPartners: 'Technology providers',
        keyActivities: 'Development',
        keyResources: 'Platform',
        valueProposition: 'AI for SMEs',
        customerRelationships: 'Direct',
        channels: 'Online',
        customerSegments: 'SMEs',
        costStructure: 'Fixed and variable',
        revenueStreams: 'Subscription'
      };

      const result = generateBMCVisual(bmcData);

      expect(result).toContain('Business Model Canvas');
      expect(result).toContain('ASCII Diagram');
      expect(result).toContain('Mermaid Diagram');
      expect(result).toContain('Technology providers');
      expect(result).toContain('AI for SMEs');
    });

    it('should handle lean canvas type', () => {
      const leanData = {
        type: 'lean',
        keyPartners: 'Partners',
        valueProposition: 'Value',
        customerSegments: 'Customers'
      };

      const result = generateBMCVisual(leanData);

      expect(result).toContain('Lean Canvas');
    });

    it('should handle missing fields gracefully', () => {
      const result = generateBMCVisual({});

      expect(result).toContain('Not defined');
    });
  });

  describe('Financial Charts', () => {
    it('should generate financial visualization', () => {
      const financialData = {
        month12: { revenue: 200000 },
        realistic: { year1: 200000, breakEven: 12, investment: 250000 },
        optimistic: { year1: 350000, breakEven: 9, investment: 250000 },
        pessimistic: { year1: 100000, breakEven: 18, investment: 350000 },
        peakNeed: { amount: 180000, month: 6 },
        breakEvenMonth: 12
      };

      const result = generateFinancialCharts(financialData);

      expect(result).toContain('Financial Projections');
      expect(result).toContain('Revenue Projection');
      expect(result).toContain('Scenario Comparison');
      expect(result).toContain('Cash Flow Analysis');
    });

    it('should calculate ROI correctly', () => {
      const result = generateFinancialCharts({
        realistic: { year1: 200000, investment: 100000 },
        optimistic: { year1: 300000, investment: 100000 },
        pessimistic: { year1: 100000, investment: 100000 }
      });

      expect(result).toContain('ROI Potential');
    });

    it('should handle missing financial data', () => {
      const result = generateFinancialCharts({});

      expect(result).toContain('Financial Projections');
    });
  });

  describe('Risk Matrix', () => {
    it('should generate risk matrix visualization', () => {
      const risks = [
        { name: 'Market risk', probability: 'Alto', impact: 'Alto', severity: 'Alto', mitigation: 'Strategy A' },
        { name: 'Tech risk', probability: 'Medio', impact: 'Medio', severity: 'Medio', mitigation: 'Strategy B' },
        { name: 'Low risk', probability: 'Bajo', impact: 'Bajo', severity: 'Bajo', mitigation: 'Monitor' }
      ];

      const result = generateRiskMatrixVisual(risks);

      expect(result).toContain('Risk Matrix');
      expect(result).toContain('Probability vs Impact Matrix');
      expect(result).toContain('Risk Distribution');
      expect(result).toContain('Top 5 Risks');
    });

    it('should handle empty risk array', () => {
      const result = generateRiskMatrixVisual([]);

      expect(result).toContain('No Risks Identified');
    });

    it('should handle null/undefined risks', () => {
      const result = generateRiskMatrixVisual(null);

      expect(result).toContain('No Risks Identified');
    });

    it('should categorize risks by severity', () => {
      const risks = [
        { name: 'High risk', severity: 'Alto' },
        { name: 'Medium risk', severity: 'Medio' },
        { name: 'Low risk', severity: 'Bajo' }
      ];

      const result = generateRiskMatrixVisual(risks);

      expect(result).toContain('Alto');
      expect(result).toContain('Medio');
      expect(result).toContain('Bajo');
    });
  });

  describe('Scorecard Visual', () => {
    it('should generate scorecard visualization', () => {
      const scorecard = {
        totalScore: 85,
        baseScore: 87,
        riskModifier: 2,
        dimensions: {
          problema: 9,
          solucion: 8,
          innovacion: 9,
          mercado: 8,
          modelo: 8,
          tecnica: 8,
          financiera: 9,
          legal: 7,
          impacto: 9,
          escalabilidad: 8,
          equipo: 8,
          narrativa: 9,
          postulabilidad: 8
        }
      };

      const result = generateScorecardVisual(scorecard);

      expect(result).toContain('Evaluation Scorecard');
      expect(result).toContain('TOTAL SCORE: 85/100');
      expect(result).toContain('Dimension Scores');
      expect(result).toContain('EXCELENTE');
    });

    it('should handle different score ranges', () => {
      const lowScore = generateScorecardVisual({ totalScore: 35, dimensions: {} });
      expect(lowScore).toContain('NO VIABLE');

      const weakScore = generateScorecardVisual({ totalScore: 45, dimensions: {} });
      expect(weakScore).toContain('DÉBIL');

      const regularScore = generateScorecardVisual({ totalScore: 60, dimensions: {} });
      expect(regularScore).toContain('REGULAR');

      const goodScore = generateScorecardVisual({ totalScore: 75, dimensions: {} });
      expect(goodScore).toContain('BUENO');
    });

    it('should handle null scorecard', () => {
      const result = generateScorecardVisual(null);

      expect(result).toContain('No Evaluation Data Available');
    });

    it('should identify strengths and weaknesses', () => {
      const scorecard = {
        totalScore: 70,
        dimensions: {
          problema: 8,
          solucion: 3,
          innovacion: 9,
          mercado: 4,
          modelo: 7,
          tecnica: 6
        }
      };

      const result = generateScorecardVisual(scorecard);

      expect(result).toContain('Strengths');
      expect(result).toContain('Areas for Improvement');
    });
  });
});
