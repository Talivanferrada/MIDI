/**
 * Tests for Idea Scoring Module
 */

import { describe, it, expect } from 'vitest';
import {
  scoreIdea,
  rankIdeas,
  generateTop3Justification
} from '../src/scoring/idea-scoring.js';

describe('scoreIdea', () => {
  it('should score an idea with default values', () => {
    const idea = {
      name: 'Test Idea',
      problem: 'This is a test problem that needs to be solved',
      solution: 'This is a test solution that addresses the problem',
      customer: 'Small businesses'
    };

    const result = scoreIdea(idea);

    expect(result.scores).toBeDefined();
    expect(result.scores.clarity).toBeGreaterThanOrEqual(0);
    expect(result.scores.feasibility).toBeGreaterThanOrEqual(0);
    expect(result.scores.alignment).toBeGreaterThanOrEqual(0);
    expect(result.scores.market).toBeGreaterThanOrEqual(0);
    expect(result.scores.differentiation).toBeGreaterThanOrEqual(0);
    expect(result.scores.fundability).toBeGreaterThanOrEqual(0);
    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.recommendation).toBeDefined();
  });

  it('should score a complete idea higher', () => {
    const completeIdea = {
      name: 'Complete Idea',
      problem: 'A well-defined problem that affects many people in their daily lives',
      solution: 'An innovative solution that addresses the root cause effectively',
      customer: 'SME owners in Chile',
      differentiation: 'Unique approach using AI and local market knowledge',
      revenueModel: 'SaaS subscription',
      marketSize: 'grande',
      marketTrend: 'creciente',
      competition: 'baja',
      innovation: 'radical',
      difficulty: 'baja'
    };

    const incompleteIdea = {
      name: 'Incomplete Idea'
    };

    const completeScore = scoreIdea(completeIdea);
    const incompleteScore = scoreIdea(incompleteIdea);

    expect(completeScore.total).toBeGreaterThan(incompleteScore.total);
  });

  it('should consider user context in scoring', () => {
    const idea = {
      name: 'Tech Startup',
      requiredSkills: ['programming', 'marketing'],
      estimatedBudget: 50000,
      estimatedTime: 6,
      objectives: ['profitability'],
      riskLevel: 'alto',
      sector: 'technology'
    };

    const userContextGood = {
      skills: ['programming', 'marketing'],
      budget: 100000,
      timeAvailable: 12,
      objectives: ['profitability'],
      riskTolerance: 'alto',
      network: ['technology'],
      seekingFunding: true
    };

    const userContextBad = {
      skills: ['cooking'],
      budget: 10000,
      timeAvailable: 2,
      objectives: ['social impact'],
      riskTolerance: 'bajo',
      network: [],
      seekingFunding: false
    };

    const scoreGood = scoreIdea(idea, userContextGood);
    const scoreBad = scoreIdea(idea, userContextBad);

    expect(scoreGood.scores.alignment).toBeGreaterThan(scoreBad.scores.alignment);
    expect(scoreGood.scores.feasibility).toBeGreaterThan(scoreBad.scores.feasibility);
  });

  it('should identify weaknesses', () => {
    const idea = {
      name: 'Weak Idea'
    };

    const result = scoreIdea(idea);

    expect(result.weaknesses).toBeDefined();
    expect(result.weaknesses.length).toBeGreaterThan(0);
  });

  it('should provide recommendation based on score', () => {
    const goodIdea = {
      problem: 'A'.repeat(100),
      solution: 'B'.repeat(100),
      customer: 'C'.repeat(50),
      differentiation: 'D'.repeat(100),
      marketSize: 'grande',
      marketTrend: 'creciente',
      competition: 'baja',
      innovation: 'radical'
    };

    const result = scoreIdea(goodIdea);

    expect(result.recommendation).toBeDefined();
    expect(result.total).toBeGreaterThan(5);
  });
});

describe('rankIdeas', () => {
  it('should rank multiple ideas', () => {
    const ideas = [
      { name: 'Idea 1', problem: 'Problem 1', solution: 'Solution 1', customer: 'Customer 1' },
      { name: 'Idea 2', problem: 'Problem 2', solution: 'Solution 2', customer: 'Customer 2' },
      { name: 'Idea 3', problem: 'Problem 3', solution: 'Solution 3', customer: 'Customer 3' }
    ];

    const result = rankIdeas(ideas);

    expect(result.ranked).toHaveLength(3);
    expect(result.ranked[0].scoring.total).toBeGreaterThanOrEqual(result.ranked[1].scoring.total);
    expect(result.ranked[1].scoring.total).toBeGreaterThanOrEqual(result.ranked[2].scoring.total);
  });

  it('should identify top 3 ideas', () => {
    const ideas = [
      { name: 'Idea A' },
      { name: 'Idea B' },
      { name: 'Idea C' },
      { name: 'Idea D' },
      { name: 'Idea E' }
    ];

    const result = rankIdeas(ideas);

    expect(result.top3).toHaveLength(3);
    expect(result.ranked[0]).toBe(result.top3[0]);
  });

  it('should calculate distribution statistics', () => {
    const ideas = [
      { name: 'Idea 1', marketSize: 'grande', innovation: 'radical' },
      { name: 'Idea 2', marketSize: 'medio', innovation: 'incremental' },
      { name: 'Idea 3', marketSize: 'pequeño', innovation: 'incremental' }
    ];

    const result = rankIdeas(ideas);

    expect(result.distribution).toBeDefined();
    expect(result.distribution.average).toBeGreaterThanOrEqual(0);
    expect(result.distribution.max).toBeGreaterThanOrEqual(result.distribution.min);
  });

  it('should handle empty ideas array', () => {
    const result = rankIdeas([]);

    expect(result.ranked).toHaveLength(0);
    expect(result.top3).toHaveLength(0);
    expect(result.averageScore).toBeNaN();
  });
});

describe('generateTop3Justification', () => {
  it('should generate justification for top 3 ideas', () => {
    const rankedIdeas = [
      {
        idea: { name: 'Best Idea' },
        scoring: {
          total: 8.5,
          scores: { clarity: 90, feasibility: 85, alignment: 80, market: 85, differentiation: 90, fundability: 75 },
          weaknesses: ['Weakness 1']
        }
      },
      {
        idea: { name: 'Second Idea' },
        scoring: {
          total: 7.5,
          scores: { clarity: 80, feasibility: 80, alignment: 75, market: 75, differentiation: 80, fundability: 70 },
          weaknesses: ['Weakness 2']
        }
      },
      {
        idea: { name: 'Third Idea' },
        scoring: {
          total: 7.0,
          scores: { clarity: 75, feasibility: 75, alignment: 70, market: 70, differentiation: 75, fundability: 65 },
          weaknesses: ['Weakness 3']
        }
      }
    ];

    const result = generateTop3Justification(rankedIdeas);

    expect(result).toHaveLength(3);
    expect(result[0].rank).toBe(1);
    expect(result[0].name).toBe('Best Idea');
    expect(result[0].score).toBe(8.5);
    expect(result[0].strengths).toBeDefined();
  });

  it('should handle fewer than 3 ideas', () => {
    const rankedIdeas = [
      {
        idea: { name: 'Only Idea' },
        scoring: {
          total: 7.0,
          scores: { clarity: 70, feasibility: 70, alignment: 70, market: 70, differentiation: 70, fundability: 70 },
          weaknesses: []
        }
      }
    ];

    const result = generateTop3Justification(rankedIdeas);

    expect(result).toHaveLength(1);
  });
});

describe('Scoring edge cases', () => {
  it('should handle idea with all empty fields', () => {
    const idea = {};
    const result = scoreIdea(idea);

    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.weaknesses.length).toBeGreaterThan(0);
  });

  it('should handle very long text fields', () => {
    const longText = 'A'.repeat(1000);
    const idea = {
      problem: longText,
      solution: longText,
      customer: longText,
      differentiation: longText
    };

    const result = scoreIdea(idea);

    expect(result.scores.clarity).toBeGreaterThan(50);
  });

  it('should score Blue Ocean ideas higher for differentiation', () => {
    const blueOceanIdea = {
      framework: 'Blue Ocean',
      differentiation: 'Creates new market space'
    };

    const regularIdea = {
      framework: 'Standard',
      differentiation: 'Regular approach'
    };

    const blueScore = scoreIdea(blueOceanIdea);
    const regularScore = scoreIdea(regularIdea);

    expect(blueScore.scores.differentiation).toBeGreaterThan(regularScore.scores.differentiation);
  });
});
