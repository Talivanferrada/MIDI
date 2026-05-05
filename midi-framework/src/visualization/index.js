/**
 * MIDI Framework - Visualization Module
 * Generates ASCII charts, Mermaid diagrams, and visual representations
 * for BMC, Lean Canvas, Financial Analysis, Risk Matrix, and Scorecards.
 */

import { generateBMCVisual } from './bmc-visual.js';
import { generateLeanCanvasVisual } from './lean-canvas-visual.js';
import { generateFinancialCharts } from './financial-charts.js';
import { generateRiskMatrix } from './risk-matrix.js';
import { generateScorecardVisual } from './scorecard-visual.js';

class Visualizer {
  constructor(outputPath = null) {
    this.outputPath = outputPath;
  }

  /**
   * Generate all visualizations from project data
   * @param {Object} data - Project data containing all analysis results
   * @returns {Object} Generated visualizations
   */
  async generateAll(data) {
    const visualizations = {};

    if (data.bmc) {
      visualizations.bmc = this.generateBMC(data.bmc);
    }

    if (data.leanCanvas) {
      visualizations.leanCanvas = this.generateLeanCanvas(data.leanCanvas);
    }

    if (data.financials) {
      visualizations.financials = this.generateFinancials(data.financials);
    }

    if (data.risks) {
      visualizations.risks = this.generateRisks(data.risks);
    }

    if (data.evaluation) {
      visualizations.evaluation = this.generateEvaluation(data.evaluation);
    }

    return visualizations;
  }

  /**
   * Generate Business Model Canvas visualization
   */
  generateBMC(bmcData) {
    return {
      ascii: generateBMCVisual.ascii(bmcData),
      mermaid: generateBMCVisual.mermaid(bmcData),
      markdown: generateBMCVisual.markdown(bmcData)
    };
  }

  /**
   * Generate Lean Canvas visualization
   */
  generateLeanCanvas(leanData) {
    return {
      ascii: generateLeanCanvasVisual.ascii(leanData),
      mermaid: generateLeanCanvasVisual.mermaid(leanData),
      markdown: generateLeanCanvasVisual.markdown(leanData)
    };
  }

  /**
   * Generate financial charts
   */
  generateFinancials(financialData) {
    return {
      revenue: generateFinancialCharts.revenue(financialData),
      cashFlow: generateFinancialCharts.cashFlow(financialData),
      scenarios: generateFinancialCharts.scenarios(financialData),
      burnRate: generateFinancialCharts.burnRate(financialData),
      breakeven: generateFinancialCharts.breakeven(financialData)
    };
  }

  /**
   * Generate risk matrix visualization
   */
  generateRisks(riskData) {
    return {
      matrix: generateRiskMatrix.matrix(riskData),
      distribution: generateRiskMatrix.distribution(riskData),
      timeline: generateRiskMatrix.timeline(riskData),
      summary: generateRiskMatrix.summary(riskData)
    };
  }

  /**
   * Generate evaluation scorecard visualization
   */
  generateEvaluation(evaluationData) {
    return {
      overall: generateScorecardVisual.overall(evaluationData),
      dimensions: generateScorecardVisual.dimensions(evaluationData),
      strengths: generateScorecardVisual.strengths(evaluationData),
      weaknesses: generateScorecardVisual.weaknesses(evaluationData),
      radar: generateScorecardVisual.radar(evaluationData)
    };
  }
}

export {
  Visualizer,
  generateBMCVisual,
  generateLeanCanvasVisual,
  generateFinancialCharts,
  generateRiskMatrix,
  generateScorecardVisual
};
