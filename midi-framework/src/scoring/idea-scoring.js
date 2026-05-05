/**
 * MIDI Framework - Idea Scoring Module
 * Automated scoring for creative ideas
 */

/**
 * Score a single idea against criteria
 */
export function scoreIdea(idea, userContext = {}) {
  const scores = {
    clarity: scoreClarity(idea),
    feasibility: scoreFeasibility(idea, userContext),
    alignment: scoreAlignment(idea, userContext),
    market: scoreMarket(idea),
    differentiation: scoreDifferentiation(idea),
    fundability: scoreFundability(idea, userContext)
  };

  // Calculate weighted total
  const weights = {
    clarity: 0.15,
    feasibility: 0.20,
    alignment: 0.20,
    market: 0.15,
    differentiation: 0.15,
    fundability: 0.15
  };

  const total = Object.entries(scores).reduce((sum, [key, score]) => {
    return sum + (score * weights[key]);
  }, 0);

  return {
    scores,
    total: Math.round(total * 10) / 10,
    recommendation: getRecommendation(total),
    weaknesses: identifyWeaknesses(scores)
  };
}

/**
 * Score multiple ideas and rank them
 */
export function rankIdeas(ideas, userContext = {}) {
  const scoredIdeas = ideas.map(idea => ({
    idea,
    scoring: scoreIdea(idea, userContext)
  }));

  // Sort by total score descending
  scoredIdeas.sort((a, b) => b.scoring.total - a.scoring.total);

  return {
    ranked: scoredIdeas,
    top3: scoredIdeas.slice(0, 3),
    averageScore: scoredIdeas.reduce((sum, i) => sum + i.scoring.total, 0) / scoredIdeas.length,
    distribution: getScoreDistribution(scoredIdeas)
  };
}

/**
 * Score clarity of problem definition
 */
export function scoreClarity(idea) {
  let score = 50; // Base score

  // Check if problem is clearly defined
  if (idea.problem && idea.problem.length > 20) score += 10;
  if (idea.problem && idea.problem.length > 50) score += 5;
  
  // Check if solution is clearly defined
  if (idea.solution && idea.solution.length > 20) score += 10;
  if (idea.solution && idea.solution.length > 50) score += 5;
  
  // Check if customer is identified
  if (idea.customer && idea.customer.length > 10) score += 10;
  
  // Check if differentiation is clear
  if (idea.differentiation && idea.differentiation.length > 10) score += 10;

  return Math.min(100, Math.max(0, score));
}

/**
 * Score technical feasibility
 */
export function scoreFeasibility(idea, userContext) {
  let score = 50;

  const difficulty = (idea.difficulty || 'media').toLowerCase();
  
  if (difficulty === 'baja') score += 30;
  else if (difficulty === 'media') score += 15;
  else if (difficulty === 'alta') score -= 10;

  // Check if user has relevant skills
  if (userContext.skills && idea.requiredSkills) {
    const matchingSkills = idea.requiredSkills.filter(s => 
      userContext.skills.includes(s)
    );
    const skillMatch = matchingSkills.length / Math.max(1, idea.requiredSkills.length);
    score += skillMatch * 20;
  }

  // Check if budget is adequate
  if (userContext.budget && idea.estimatedBudget) {
    if (userContext.budget >= idea.estimatedBudget) score += 10;
    else score -= 20;
  }

  // Check time availability
  if (userContext.timeAvailable && idea.estimatedTime) {
    if (userContext.timeAvailable >= idea.estimatedTime) score += 10;
    else score -= 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Score alignment with user resources and goals
 */
export function scoreAlignment(idea, userContext) {
  let score = 50;

  // Check goal alignment
  if (userContext.objectives && idea.objectives) {
    const matchingObjectives = idea.objectives.filter(o => 
      userContext.objectives.includes(o)
    );
    score += matchingObjectives.length * 10;
  }

  // Check risk tolerance match
  if (userContext.riskTolerance && idea.riskLevel) {
    const riskMatch = userContext.riskTolerance === idea.riskLevel;
    if (riskMatch) score += 20;
    else if (
      (userContext.riskTolerance === 'alto' && idea.riskLevel === 'medio') ||
      (userContext.riskTolerance === 'medio' && idea.riskLevel === 'bajo')
    ) {
      score += 10;
    }
  }

  // Check if user has relevant network
  if (userContext.network && idea.sector) {
    if (userContext.network.includes(idea.sector)) score += 15;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Score market potential
 */
export function scoreMarket(idea) {
  let score = 50;

  // Market size
  if (idea.marketSize) {
    if (idea.marketSize === 'grande') score += 30;
    else if (idea.marketSize === 'medio') score += 15;
    else if (idea.marketSize === 'pequeño') score -= 10;
  }

  // Growth trend
  if (idea.marketTrend) {
    if (idea.marketTrend === 'creciente') score += 20;
    else if (idea.marketTrend === 'estable') score += 5;
    else if (idea.marketTrend === 'decreciente') score -= 20;
  }

  // Competition level
  if (idea.competition) {
    if (idea.competition === 'baja') score += 20;
    else if (idea.competition === 'media') score += 5;
    else if (idea.competition === 'alta') score -= 10;
  }

  // Revenue model clarity
  if (idea.revenueModel) score += 15;

  return Math.min(100, Math.max(0, score));
}

/**
 * Score differentiation potential
 */
export function scoreDifferentiation(idea) {
  let score = 50;

  // Innovation level
  if (idea.innovation) {
    if (idea.innovation === 'radical') score += 30;
    else if (idea.innovation === 'incremental') score += 15;
    else score += 5;
  }

  // Clear differentiation
  if (idea.differentiation) {
    const diffLength = idea.differentiation.length;
    if (diffLength > 100) score += 20;
    else if (diffLength > 50) score += 10;
    else if (diffLength > 20) score += 5;
  }

  // Defensibility
  if (idea.defensibility) {
    if (idea.defensibility === 'alto') score += 20;
    else if (idea.defensibility === 'medio') score += 10;
  }

  // Framework used
  if (idea.framework === 'Blue Ocean') score += 15;
  else if (idea.framework === 'Ten Types') score += 10;

  return Math.min(100, Math.max(0, score));
}

/**
 * Score fundability potential
 */
export function scoreFundability(idea, userContext) {
  let score = 50;

  // Does user seek funding?
  if (userContext.seekingFunding) {
    // Check if idea fits funding criteria
    if (idea.innovation === 'radical') score += 20;
    if (idea.marketSize === 'grande') score += 15;
    if (idea.scalability === 'alta') score += 15;
    
    // Check if has impact
    if (idea.impact && idea.impact !== 'ninguno') score += 10;
  } else {
    // User not seeking funding, lower importance
    score += 10; // Neutral
  }

  // Postulability score if provided
  if (idea.postulabilityScore) {
    score = (score + idea.postulabilityScore) / 2;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Get recommendation based on score
 */
export function getRecommendation(score) {
  if (score >= 8) return 'Altamente recomendada para desarrollo';
  if (score >= 7) return 'Recomendada con mejoras menores';
  if (score >= 6) return 'Considerar con mejoras significativas';
  if (score >= 5) return 'Requiere más desarrollo antes de evaluar';
  return 'No recomendada en estado actual';
}

/**
 * Identify weaknesses from scores
 */
export function identifyWeaknesses(scores) {
  const weaknesses = [];
  const threshold = 60;

  if (scores.clarity < threshold) {
    weaknesses.push('Claridad del problema/solución necesita mejora');
  }
  if (scores.feasibility < threshold) {
    weaknesses.push('Factibilidad técnica o de recursos es baja');
  }
  if (scores.alignment < threshold) {
    weaknesses.push('Alineación con recursos/objetivos del usuario es limitada');
  }
  if (scores.market < threshold) {
    weaknesses.push('Potencial de mercado necesita validación');
  }
  if (scores.differentiation < threshold) {
    weaknesses.push('Diferenciación competitiva es débil');
  }
  if (scores.fundability < threshold) {
    weaknesses.push('Potencial de financiamiento es limitado');
  }

  return weaknesses;
}

/**
 * Get score distribution statistics
 */
export function getScoreDistribution(scoredIdeas) {
  const scores = scoredIdeas.map(i => i.scoring.total);
  
  return {
    high: scoredIdeas.filter(i => i.scoring.total >= 8).length,
    good: scoredIdeas.filter(i => i.scoring.total >= 7 && i.scoring.total < 8).length,
    medium: scoredIdeas.filter(i => i.scoring.total >= 6 && i.scoring.total < 7).length,
    low: scoredIdeas.filter(i => i.scoring.total < 6).length,
    average: scores.reduce((a, b) => a + b, 0) / scores.length,
    max: Math.max(...scores),
    min: Math.min(...scores)
  };
}

/**
 * Generate TOP3 selection justification
 */
export function generateTop3Justification(rankedIdeas) {
  const top3 = rankedIdeas.slice(0, 3);
  
  return top3.map((item, index) => {
    const { idea, scoring } = item;
    const strengths = Object.entries(scoring.scores)
      .filter(([_, score]) => score >= 70)
      .map(([key, _]) => key);
    
    return {
      rank: index + 1,
      name: idea.name || `Idea ${index + 1}`,
      score: scoring.total,
      strengths,
      mainWeakness: scoring.weaknesses[0] || 'Ninguna crítica',
      recommendation: scoring.recommendation
    };
  });
}

// All functions exported via export keyword
