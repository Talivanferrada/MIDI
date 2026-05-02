import fs from 'fs-extra';
import path from 'path';
import { generateBMCVisual } from './bmcVisual.js';
import { generateFinancialCharts } from './financialCharts.js';
import { generateRiskMatrixVisual } from './riskMatrixVisual.js';
import { generateScorecardVisual } from './scorecardVisual.js';

export class Visualizer {
  constructor(outputPath) {
    this.outputPath = outputPath;
  }
  
  /**
   * Generate all visualizations
   * @param {Object} data - All project data
   * @returns {Promise<Object>} Generated visualizations
   */
  async generateAll(data) {
    const visualizations = {};
    
    if (data.bmc) {
      visualizations.bmc = await this.generateBMC(data.bmc);
    }
    
    if (data.leanCanvas) {
      visualizations.leanCanvas = await this.generateLeanCanvas(data.leanCanvas);
    }
    
    if (data.financials) {
      visualizations.financials = await this.generateFinancialCharts(data.financials);
    }
    
    if (data.risks) {
      visualizations.risks = await this.generateRiskMatrix(data.risks);
    }
    
    if (data.evaluation) {
      visualizations.evaluation = await this.generateScorecard(data.evaluation);
    }
    
    return visualizations;
  }
  
  /**
   * Generate BMC visualization
   * @param {Object} bmcData - Business Model Canvas data
   * @returns {Promise<string>} Markdown visualization
   */
  async generateBMC(bmcData) {
    return generateBMCVisual(bmcData);
  }
  
  /**
   * Generate Lean Canvas visualization
   * @param {Object} leanData - Lean Canvas data
   * @returns {Promise<string>} Markdown visualization
   */
  async generateLeanCanvas(leanData) {
    // Lean Canvas is similar to BMC but with different structure
    return generateBMCVisual({
      ...leanData,
      type: 'lean'
    });
  }
  
  /**
   * Generate financial charts
   * @param {Object} financialData - Financial projections data
   * @returns {Promise<string>} Markdown visualization
   */
  async generateFinancialCharts(financialData) {
    return generateFinancialCharts(financialData);
  }
  
  /**
   * Generate risk matrix
   * @param {Array} risks - Risk data array
   * @returns {Promise<string>} Markdown visualization
   */
  async generateRiskMatrix(risks) {
    return generateRiskMatrixVisual(risks);
  }
  
  /**
   * Generate evaluation scorecard
   * @param {Object} scorecard - Evaluation data
   * @returns {Promise<string>} Markdown visualization
   */
  async generateScorecard(scorecard) {
    return generateScorecardVisual(scorecard);
  }
  
  /**
   * Save visualizations to file
   * @param {Object} visualizations - Generated visualizations
   * @param {string} filename - Output filename
   */
  async saveVisualizations(visualizations, filename = 'VISUALIZATIONS.md') {
    const content = Object.entries(visualizations)
      .map(([key, value]) => value)
      .join('\n\n---\n\n');
    
    await fs.writeFile(path.join(this.outputPath, filename), content, 'utf8');
  }
}
