/**
 * Tests for Canvas Builder Module
 */

import { describe, it, expect } from 'vitest';
import {
  buildBMC,
  buildLeanCanvas,
  validateBMC,
  validateLeanCanvas,
  bmcToLeanCanvas
} from '../src/scoring/canvas-builder.js';

describe('buildBMC', () => {
  it('should build a complete BMC from project data', () => {
    const projectData = {
      valueProposition: 'We help SMEs automate their invoicing',
      customerSegments: ['Small businesses', 'Freelancers'],
      channels: ['Direct sales', 'Online'],
      customerRelationships: ['Personal support', 'Self-service'],
      revenueStreams: ['Monthly subscription', 'Setup fee'],
      keyResources: ['Platform', 'Team'],
      keyActivities: ['Development', 'Sales'],
      keyPartners: ['Accounting firms', 'Banks'],
      costStructure: ['Development', 'Marketing', 'Operations']
    };

    const bmc = buildBMC(projectData);

    expect(bmc.valuePropositions).toContain('We help SMEs automate their invoicing');
    expect(bmc.customerSegments).toHaveLength(2);
    expect(bmc.channels).toHaveLength(2);
    expect(bmc.generatedAt).toBeDefined();
  });

  it('should handle missing data with defaults', () => {
    const bmc = buildBMC({});

    expect(bmc.valuePropositions).toBeDefined();
    expect(bmc.customerSegments).toBeDefined();
    expect(bmc.valuePropositions[0]).toContain('Definir');
  });

  it('should convert arrays to formatted strings', () => {
    const projectData = {
      customerSegments: ['Segment A', 'Segment B', 'Segment C']
    };

    const bmc = buildBMC(projectData);

    expect(bmc.customerSegments).toHaveLength(3);
  });
});

describe('buildLeanCanvas', () => {
  it('should build a complete Lean Canvas from project data', () => {
    const projectData = {
      problem: ['High costs', 'Time consuming'],
      solution: ['Automation', 'AI-powered'],
      uniqueValueProposition: 'Cut invoicing time by 80%',
      unfairAdvantage: 'Proprietary AI model',
      customerSegments: ['SMEs'],
      channels: ['Online'],
      revenueStreams: ['Subscription'],
      costStructure: ['Development'],
      keyMetrics: ['CAC', 'LTV', 'MRR'],
      existingAlternatives: ['Excel', 'Manual']
    };

    const lean = buildLeanCanvas(projectData);

    expect(lean.problem).toHaveLength(2);
    expect(lean.uniqueValueProposition).toBe('Cut invoicing time by 80%');
    expect(lean.unfairAdvantage).toBe('Proprietary AI model');
    expect(lean.generatedAt).toBeDefined();
  });

  it('should handle string inputs for UVP and unfair advantage', () => {
    const projectData = {
      uniqueValueProposition: 'Simple value prop',
      unfairAdvantage: 'Hard to copy'
    };

    const lean = buildLeanCanvas(projectData);

    expect(lean.uniqueValueProposition).toBe('Simple value prop');
    expect(lean.unfairAdvantage).toBe('Hard to copy');
  });
});

describe('validateBMC', () => {
  it('should validate a complete BMC', () => {
    const bmc = {
      valuePropositions: ['Clear value'],
      customerSegments: ['Defined segment'],
      channels: ['Channel'],
      customerRelationships: ['Relationship'],
      revenueStreams: ['Revenue'],
      keyResources: ['Resource'],
      keyActivities: ['Activity'],
      keyPartners: ['Partner'],
      costStructure: ['Cost']
    };

    const result = validateBMC(bmc);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.completeness).toBe(100);
  });

  it('should detect missing required blocks', () => {
    const bmc = {
      valuePropositions: ['Value'],
      // Missing customerSegments, revenueStreams, costStructure
    };

    const result = validateBMC(bmc);

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.some(e => e.includes('customerSegments'))).toBe(true);
  });

  it('should warn on missing recommended blocks', () => {
    const bmc = {
      valuePropositions: ['Value'],
      customerSegments: ['Segment'],
      revenueStreams: ['Revenue'],
      costStructure: ['Cost']
      // Missing keyPartners, keyActivities, keyResources, channels, customerRelationships
    };

    const result = validateBMC(bmc);

    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('should detect inconsistencies', () => {
    const bmc = {
      valuePropositions: ['Value'],
      revenueStreams: ['Subscription'],
      // No customer segments but has revenue
    };

    const result = validateBMC(bmc);

    // Should have errors for missing customer segments
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.isValid).toBe(false);
  });

  it('should calculate completeness percentage', () => {
    const partialBmc = {
      valuePropositions: ['Value'],
      customerSegments: ['Segment'],
      revenueStreams: ['Revenue']
    };

    const result = validateBMC(partialBmc);

    expect(result.completeness).toBeGreaterThan(0);
    expect(result.completeness).toBeLessThan(100);
  });
});

describe('validateLeanCanvas', () => {
  it('should validate a complete Lean Canvas', () => {
    const lean = {
      problem: ['Clear problem'],
      solution: ['Clear solution'],
      uniqueValueProposition: 'Strong UVP with enough detail',
      unfairAdvantage: 'Clear advantage',
      customerSegments: ['Segment'],
      channels: ['Channel'],
      revenueStreams: ['Revenue'],
      costStructure: ['Cost'],
      keyMetrics: ['Metric']
    };

    const result = validateLeanCanvas(lean);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect missing problem', () => {
    const lean = {
      solution: ['Solution'],
      uniqueValueProposition: 'UVP'
    };

    const result = validateLeanCanvas(lean);

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('Problema'))).toBe(true);
  });

  it('should warn on missing unfair advantage', () => {
    const lean = {
      problem: ['Problem'],
      solution: ['Solution'],
      uniqueValueProposition: 'Clear UVP',
      customerSegments: ['Segment']
    };

    const result = validateLeanCanvas(lean);

    expect(result.warnings.some(w => w.includes('Unfair advantage'))).toBe(true);
  });

  it('should require UVP of minimum length', () => {
    const lean = {
      problem: ['Problem'],
      solution: ['Solution'],
      uniqueValueProposition: 'Short', // Too short
      customerSegments: ['Segment']
    };

    const result = validateLeanCanvas(lean);

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('UVP'))).toBe(true);
  });
});

describe('bmcToLeanCanvas', () => {
  it('should convert BMC to Lean Canvas', () => {
    const bmc = {
      valuePropositions: ['We automate invoicing'],
      customerSegments: ['SMEs'],
      channels: ['Online'],
      revenueStreams: ['Subscription'],
      costStructure: ['Development'],
      keyResources: ['Platform'],
      keyActivities: ['Build'],
      keyPartners: ['Banks']
    };

    const lean = bmcToLeanCanvas(bmc);

    expect(lean.uniqueValueProposition).toBe('We automate invoicing');
    expect(lean.customerSegments).toEqual(['SMEs']);
    expect(lean.channels).toEqual(['Online']);
    expect(lean.revenueStreams).toEqual(['Subscription']);
  });

  it('should infer problems from customer segments', () => {
    const bmc = {
      customerSegments: ['SMEs in Chile'],
      valuePropositions: ['Save time']
    };

    const lean = bmcToLeanCanvas(bmc);

    expect(lean.problem).toBeDefined();
    expect(lean.problem.length).toBeGreaterThan(0);
  });

  it('should infer solutions from value propositions', () => {
    const bmc = {
      valuePropositions: ['Fast automation', 'Easy setup']
    };

    const lean = bmcToLeanCanvas(bmc);

    expect(lean.solution).toContain('Fast automation');
    expect(lean.solution).toContain('Easy setup');
  });

  it('should infer unfair advantage from key resources', () => {
    const bmc = {
      keyResources: ['Proprietary AI', 'Unique data']
    };

    const lean = bmcToLeanCanvas(bmc);

    expect(lean.unfairAdvantage).toContain('Proprietary AI');
  });

  it('should infer key metrics', () => {
    const bmc = {
      revenueStreams: ['Subscription'],
      customerSegments: ['SMEs']
    };

    const lean = bmcToLeanCanvas(bmc);

    expect(lean.keyMetrics).toContain('Ingresos mensuales');
    expect(lean.keyMetrics).toContain('Clientes activos');
    expect(lean.keyMetrics).toContain('CAC');
    expect(lean.keyMetrics).toContain('LTV');
  });
});

describe('Edge cases', () => {
  it('should handle null values', () => {
    const bmc = buildBMC({
      valueProposition: null,
      customerSegments: null
    });

    expect(bmc.valuePropositions).toBeDefined();
  });

  it('should handle mixed array types', () => {
    const bmc = buildBMC({
      customerSegments: [
        'String segment',
        { description: 'Object segment', name: 'Test' }
      ]
    });

    expect(bmc.customerSegments).toBeDefined();
  });
});
