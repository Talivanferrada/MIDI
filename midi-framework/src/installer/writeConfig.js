import fs from 'fs-extra';
import path from 'path';

export async function writeConfig(targetDir, answers) {
  const configDir = path.join(targetDir, '.midi', 'config');
  const now = new Date().toISOString();

  const midiConfig = {
    framework: 'MIDI',
    framework_full_name: 'Modelo Inteligente de Desarrollo de Innovación',
    version: '0.1.0',
    project_name: answers.projectName || '',
    country: answers.country || '',
    region: answers.region || '',
    language: 'es',
    default_mode: answers.mode || 'full',
    funding_focus: true,
    legal_tax_country: answers.country || '',
    risk_level: 'medium',
    output_depth: 'deep',
    require_sources: true,
    human_approval_gates: true,
    agent_platform: answers.platform || 'generic',
    created_at: now,
    updated_at: now,
  };

  await fs.writeJson(path.join(configDir, 'midi.config.json'), midiConfig, { spaces: 2 });

  const agentRouting = {
    version: '0.1.0',
    description: 'Agent routing configuration for MIDI framework',
    routing: {
      exploration: {
        sequence: [
          'midi-intake-agent',
          'midi-global-research-agent',
          'midi-local-adaptation-agent',
          'midi-benchmark-agent',
          'midi-insight-agent',
          'midi-creative-agent',
          'midi-hybridization-agent',
        ],
      },
      financeable: {
        sequence: [
          'midi-market-agent',
          'midi-business-model-agent',
          'midi-technical-agent',
          'midi-financial-agent',
          'midi-legal-tax-agent',
          'midi-risk-agent',
          'midi-devil-advocate-agent',
          'midi-validation-agent',
          'midi-funding-match-agent',
          'midi-evaluator-agent',
          'midi-application-optimizer-agent',
          'midi-writer-agent',
        ],
      },
      full: {
        sequence: [
          'midi-intake-agent',
          'midi-global-research-agent',
          'midi-local-adaptation-agent',
          'midi-benchmark-agent',
          'midi-insight-agent',
          'midi-creative-agent',
          'midi-hybridization-agent',
          'midi-market-agent',
          'midi-business-model-agent',
          'midi-technical-agent',
          'midi-financial-agent',
          'midi-legal-tax-agent',
          'midi-risk-agent',
          'midi-devil-advocate-agent',
          'midi-validation-agent',
          'midi-funding-match-agent',
          'midi-evaluator-agent',
          'midi-application-optimizer-agent',
          'midi-writer-agent',
        ],
      },
    },
    rules: [
      'midi-devil-advocate-agent must run before final document generation',
      'midi-evaluator-agent must run before project closure',
      'midi-legal-tax-agent is mandatory when legal_risk > low',
      'midi-funding-match-agent is mandatory when funding_focus = true',
    ],
  };

  await fs.writeJson(path.join(configDir, 'agent-routing.json'), agentRouting, { spaces: 2 });

  const scoringRubric = {
    version: '0.1.0',
    description: 'Scoring rubric for MIDI evaluation',
    dimensions: {
      innovation: {
        weight: 0.15,
        description: 'Degree of innovation and differentiation',
        criteria: [
          'Novelty of the solution',
          'Differentiation from competitors',
          'Use of new technologies or methods',
          'Potential for disruption',
        ],
      },
      market: {
        weight: 0.20,
        description: 'Market opportunity and fit',
        criteria: [
          'Market size and growth',
          'Target segment clarity',
          'Competitive advantage',
          'Customer demand validation',
        ],
      },
      scalability: {
        weight: 0.15,
        description: 'Potential for growth and expansion',
        criteria: [
          'Scalability of the business model',
          'Geographic expansion potential',
          'Product/service replication',
          'Operations scalability',
        ],
      },
      feasibility: {
        weight: 0.20,
        description: 'Technical and operational feasibility',
        criteria: [
          'Technical complexity',
          'Resource availability',
          'Timeline realism',
          'Team capabilities',
        ],
      },
      financial: {
        weight: 0.15,
        description: 'Financial viability',
        criteria: [
          'Revenue model clarity',
          'Profitability potential',
          'Investment requirement',
          'Break-even timeline',
        ],
      },
      legal: {
        weight: 0.05,
        description: 'Legal and regulatory compliance',
        criteria: [
          'Regulatory requirements',
          'Legal risks',
          'Intellectual property',
          'Permits and licenses',
        ],
      },
      narrative: {
        weight: 0.05,
        description: 'Story and presentation quality',
        criteria: [
          'Clarity of problem statement',
          'Compelling solution narrative',
          'Team story',
          'Impact articulation',
        ],
      },
      postulability: {
        weight: 0.05,
        description: 'Suitability for funding applications',
        criteria: [
          'Alignment with funding criteria',
          'Documentation completeness',
          'Track record',
          'Regional alignment',
        ],
      },
    },
    thresholds: {
      excellent: 85,
      good: 70,
      acceptable: 55,
      poor: 40,
    },
  };

  await fs.writeJson(path.join(configDir, 'scoring-rubric.json'), scoringRubric, { spaces: 2 });
}
