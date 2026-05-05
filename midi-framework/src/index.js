export { logger } from './cli/logger.js';
export { getInitOptions } from './cli/prompts.js';
export { start as workflowStart, explore as workflowExplore, financeable as workflowFinanceable } from './cli/workflow.js';
export { ProgressDisplay } from './cli/progress.js';
export * from './installer/index.js';
export * from './utils/fileSystem.js';
export * from './utils/pathUtils.js';
export { WorkflowExecutor, STAGES, STAGE_NAMES } from './workflow/executor.js';
export { StateManager } from './workflow/stateManager.js';
export { StageValidator } from './workflow/stageValidator.js';

// Visualization Module
export { Visualizer } from './visualization/index.js';
export { generateBMCVisual } from './visualization/bmc-visual.js';
export { generateLeanCanvasVisual } from './visualization/lean-canvas-visual.js';
export { generateFinancialCharts } from './visualization/financial-charts.js';
export { generateRiskMatrix } from './visualization/risk-matrix.js';
export { generateScorecardVisual } from './visualization/scorecard-visual.js';

// Calculators Module
export * as FinancialCalculators from './calculators/financial.js';

// Scoring Module
export { scoreIdea, rankIdeas, generateTop3Justification } from './scoring/idea-scoring.js';
export { buildBMC, buildLeanCanvas, validateBMC, validateLeanCanvas, bmcToLeanCanvas } from './scoring/canvas-builder.js';
