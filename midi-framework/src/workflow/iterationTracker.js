/**
 * Iteration Tracker
 * Tracks all iterations, decisions, and their outcomes
 */

import fs from 'fs-extra';
import path from 'path';
import { fileExists, ensureDir } from '../utils/fileSystem.js';

export class IterationTracker {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.decisionLogPath = path.join(projectPath, 'midi-project', 'DECISION_LOG.md');
    this.iterations = [];
    this.metrics = {
      totalIterations: 0,
      explorationDecisions: 0,
      financeableDecisions: 0,
      revertedDecisions: 0,
      avgTimePerIteration: 0,
      discardedIdeas: 0,
      improvedIdeas: 0
    };
  }

  /**
   * Load existing decision log and parse iterations
   */
  async load() {
    if (await fileExists(this.decisionLogPath)) {
      const content = await fs.readFile(this.decisionLogPath, 'utf8');
      this.iterations = this.parseIterations(content);
      this.metrics = this.calculateMetrics();
      return { iterations: this.iterations, metrics: this.metrics };
    }
    return { iterations: [], metrics: this.getEmptyMetrics() };
  }

  /**
   * Parse iterations from decision log content
   */
  parseIterations(content) {
    const iterations = [];
    const iterRegex = /### Iteración (\d+): (.+?)(?=\n)/g;
    let match;

    while ((match = iterRegex.exec(content)) !== null) {
      const iterNum = parseInt(match[1]);
      const title = match[2];
      const iterSection = this.extractSection(content, `### Iteración ${iterNum}:`);
      
      if (iterSection) {
        iterations.push({
          id: iterNum,
          title,
          date: this.extractField(iterSection, '\\*\\*Fecha:\\*\\*'),
          agent: this.extractField(iterSection, '\\*\\*Agente:\\*\\*'),
          stage: this.extractField(iterSection, '\\*\\*Etapa:\\*\\*'),
          decision: this.extractDecision(iterSection),
          status: this.extractStatus(iterSection),
          reverted: iterSection.includes('- [x] Revertida')
        });
      }
    }

    return iterations;
  }

  /**
   * Extract a section from markdown
   */
  extractSection(content, startMarker) {
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return null;
    
    const nextSection = content.indexOf('\n### Iteración', startIndex + 1);
    const nextPattern = content.indexOf('\n## ', startIndex + 1);
    
    let endIndex = content.length;
    if (nextSection !== -1) endIndex = Math.min(endIndex, nextSection);
    if (nextPattern !== -1) endIndex = Math.min(endIndex, nextPattern);
    
    return content.substring(startIndex, endIndex);
  }

  /**
   * Extract a field value from markdown
   */
  extractField(section, fieldPattern) {
    const regex = new RegExp(fieldPattern + '\\s*(.+?)(?:\\n|$)');
    const match = section.match(regex);
    return match ? match[1].trim() : '';
  }

  /**
   * Extract decision from section
   */
  extractDecision(section) {
    const selMatch = section.match(/\*\*Selección:\*\*\s*(.+?)(?:\n|$)/);
    return selMatch ? selMatch[1].trim() : '';
  }

  /**
   * Extract status from section
   */
  extractStatus(section) {
    if (section.includes('- [x] Implementada')) return 'implementada';
    if (section.includes('- [x] Pendiente')) return 'pendiente';
    if (section.includes('- [x] Revertida')) return 'revertida';
    return 'sin_estado';
  }

  /**
   * Calculate metrics from iterations
   */
  calculateMetrics() {
    const total = this.iterations.length;
    if (total === 0) return this.getEmptyMetrics();

    const exploration = this.iterations.filter(i => i.stage === 'exploración').length;
    const financeable = this.iterations.filter(i => i.stage === 'financiable').length;
    const reverted = this.iterations.filter(i => i.reverted).length;
    const discarded = this.iterations.filter(i => 
      i.decision?.toLowerCase().includes('descartar')
    ).length;
    const improved = this.iterations.filter(i => 
      i.decision?.toLowerCase().includes('iterar') || 
      i.decision?.toLowerCase().includes('mejorar')
    ).length;

    return {
      totalIterations: total,
      explorationDecisions: exploration,
      financeableDecisions: financeable,
      revertedDecisions: reverted,
      avgTimePerIteration: 0, // Would need timestamps to calculate
      discardedIdeas: discarded,
      improvedIdeas: improved
    };
  }

  /**
   * Get empty metrics object
   */
  getEmptyMetrics() {
    return {
      totalIterations: 0,
      explorationDecisions: 0,
      financeableDecisions: 0,
      revertedDecisions: 0,
      avgTimePerIteration: 0,
      discardedIdeas: 0,
      improvedIdeas: 0
    };
  }

  /**
   * Record a new iteration
   */
  async recordIteration(data) {
    const {
      decision,
      agent,
      stage = 'exploración',
      title = decision,
      context = '',
      alternatives = [],
      justification = '',
      assumptions = [],
      impact = ''
    } = data;

    const timestamp = new Date().toISOString();
    const iterationId = this.iterations.length + 1;

    const iterationEntry = this.formatIterationEntry({
      id: iterationId,
      timestamp,
      title,
      agent,
      stage,
      context,
      alternatives,
      decision,
      justification,
      assumptions,
      impact
    });

    await this.appendToDecisionLog(iterationEntry, iterationId, title, agent, decision);

    this.iterations.push({
      id: iterationId,
      title,
      date: timestamp,
      agent,
      stage,
      decision,
      status: 'pendiente',
      reverted: false
    });

    this.metrics = this.calculateMetrics();

    return {
      iterationId,
      recorded: true,
      summary: `Iteración ${iterationId}: ${title}`
    };
  }

  /**
   * Format iteration entry for markdown
   */
  formatIterationEntry(data) {
    const { id, timestamp, title, agent, stage, context, alternatives, decision, justification, assumptions, impact } = data;
    
    let md = `\n### Iteración ${id}: ${title}\n\n`;
    md += `**Fecha:** ${timestamp}\n`;
    md += `**Agente:** ${agent}\n`;
    md += `**Etapa:** ${stage}\n\n`;
    
    if (context) {
      md += `#### Contexto\n${context}\n\n`;
    }
    
    if (alternatives && alternatives.length > 0) {
      md += `#### Alternativas Consideradas\n`;
      alternatives.forEach((alt, idx) => {
        md += `${idx + 1}. **${alt.name}:** ${alt.description}\n`;
        if (alt.pros && alt.pros.length > 0) {
          md += `   - Pros: ${alt.pros.join(', ')}\n`;
        }
        if (alt.cons && alt.cons.length > 0) {
          md += `   - Contras: ${alt.cons.join(', ')}\n`;
        }
      });
      md += '\n';
    }
    
    md += `#### Decisión Tomada\n`;
    md += `**Selección:** ${decision}\n\n`;
    md += `**Justificación:**\n${justification || 'No especificada'}\n\n`;
    
    if (assumptions && assumptions.length > 0) {
      md += `#### Supuestos\n`;
      assumptions.forEach(a => {
        md += `- ${a}\n`;
      });
      md += '\n';
    }
    
    if (impact) {
      md += `#### Impacto\n${impact}\n\n`;
    }
    
    md += `#### Estado\n`;
    md += `- [ ] Implementada\n`;
    md += `- [x] Pendiente\n`;
    md += `- [ ] Revertida\n\n`;
    
    md += `#### Follow-up Required\n`;
    md += `- [ ] Validar resultados\n`;
    md += `- [ ] Revisitar si condiciones cambian\n\n`;
    md += `---\n\n`;

    return md;
  }

  /**
   * Append iteration to decision log
   */
  async appendToDecisionLog(entry, iterId, title, agent, decision) {
    await ensureDir(path.dirname(this.decisionLogPath));
    
    let content = '';
    if (await fileExists(this.decisionLogPath)) {
      content = await fs.readFile(this.decisionLogPath, 'utf8');
    } else {
      content = this.getDefaultTemplate();
    }

    // Update iteration summary table
    const tableEntry = `| ${iterId} | ${new Date().toISOString().split('T')[0]} | ${decision} | ${agent} | Pendiente | Pendiente |\n`;
    
    // Find the table header and insert after separator
    const tableMatch = content.match(/(\|---.*\|\n)/);
    if (tableMatch) {
      const insertPos = tableMatch.index + tableMatch[0].length;
      content = content.slice(0, insertPos) + tableEntry + content.slice(insertPos);
    }

    // Insert iteration detail before patterns section
    const patternsIndex = content.indexOf('## Patrones Detectados');
    if (patternsIndex !== -1) {
      content = content.slice(0, patternsIndex) + entry + content.slice(patternsIndex);
    } else {
      content += entry;
    }

    // Update metrics
    content = this.updateMetricsInContent(content);

    // Update last update timestamp
    content = content.replace(
      /\*\*Última actualización:\*\*.*\n/,
      `**Última actualización:** ${new Date().toISOString().split('T')[0]}\n`
    );

    await fs.writeFile(this.decisionLogPath, content, 'utf8');
  }

  /**
   * Update metrics in content
   */
  updateMetricsInContent(content) {
    const metrics = this.calculateMetrics();
    
    return content.replace(
      /## Métricas de Iteración[\s\S]*?(?=##|$)/,
      `## Métricas de Iteración

| Métrica | Valor |
|---------|-------|
| Total iteraciones | ${metrics.totalIterations} |
| Decisiones por etapa exploración | ${metrics.explorationDecisions} |
| Decisiones por etapa financiable | ${metrics.financeableDecisions} |
| Decisiones revertidas | ${metrics.revertedDecisions} |
| Tiempo promedio por iteración | ${metrics.avgTimePerIteration} min |
| Ideas descartadas | ${metrics.discardedIdeas} |
| Ideas mejoradas | ${metrics.improvedIdeas} |

`
    );
  }

  /**
   * Get default template for decision log
   */
  getDefaultTemplate() {
    return `# Decision Log

**Proyecto:** [nombre]
**Creado:** ${new Date().toISOString().split('T')[0]}
**Última actualización:** ${new Date().toISOString().split('T')[0]}

---

## Resumen de Iteraciones

| # | Fecha | Decisión | Agente | Resultado | Estado |
|---|-------|----------|--------|-----------|--------|
| 1 | [fecha] | [decisión] | [agente] | [resultado] | [estado] |

---

## Detalle de Decisiones

---

## Patrones Detectados

### Patrones de Decisión
[Análisis de patrones en las decisiones tomadas]

### Sesgos Identificados
[Sesgos potenciales en el proceso de decisión]

### Lecciones Aprendidas
[Qué funcionó y qué no]

---

## Métricas de Iteración

| Métrica | Valor |
|---------|-------|
| Total iteraciones | 0 |
| Decisiones por etapa exploración | 0 |
| Decisiones por etapa financiable | 0 |
| Decisiones revertidas | 0 |
| Tiempo promedio por iteración | 0 min |
| Ideas descartadas | 0 |
| Ideas mejoradas | 0 |

---

## Próximas Decisiones Pendientes

- [ ] [Decisión pendiente 1]
- [ ] [Decisión pendiente 2]
`;
  }

  /**
   * Mark an iteration as reverted
   */
  async revertIteration(iterationId, reason) {
    if (await fileExists(this.decisionLogPath)) {
      let content = await fs.readFile(this.decisionLogPath, 'utf8');
      
      // Find the iteration section
      const iterRegex = new RegExp(
        `(### Iteración ${iterationId}:.*?#### Estado[\\s\\S]*?)(- \\[x\\] Pendiente|\\- \\[ \\] Pendiente)`,
        'g'
      );
      
      content = content.replace(iterRegex, (match, before, status) => {
        return before + '- [x] Revertida';
      });
      
      // Add revert reason
      const revertNote = `\n\n**Revertida:** ${reason}\n**Fecha reversión:** ${new Date().toISOString()}\n`;
      content = content.replace(
        new RegExp(`(### Iteración ${iterationId}:.*?)(---)`),
        `$1${revertNote}\n$2`
      );
      
      // Update status in summary table
      content = content.replace(
        new RegExp(`\\| ${iterationId} \\|([^|]*\\|){4} Pendiente \\|`),
        `| ${iterationId} | $1 Revertida |`
      );
      
      await fs.writeFile(this.decisionLogPath, content, 'utf8');
      
      // Update local state
      const iter = this.iterations.find(i => i.id === iterationId);
      if (iter) {
        iter.reverted = true;
        iter.status = 'revertida';
      }
      this.metrics = this.calculateMetrics();
      
      return { reverted: true, iterationId, reason };
    }
    
    return { reverted: false, error: 'Decision log not found' };
  }

  /**
   * Detect patterns in decisions
   */
  async detectPatterns() {
    await this.load();
    
    const patterns = {
      commonAgents: {},
      commonDecisions: {},
      revertedRate: 0,
      stageDistribution: {},
      timePatterns: []
    };

    // Agent frequency
    this.iterations.forEach(iter => {
      patterns.commonAgents[iter.agent] = (patterns.commonAgents[iter.agent] || 0) + 1;
    });

    // Decision patterns
    this.iterations.forEach(iter => {
      const decKey = iter.decision?.toLowerCase() || 'unknown';
      patterns.commonDecisions[decKey] = (patterns.commonDecisions[decKey] || 0) + 1;
    });

    // Revert rate
    if (this.iterations.length > 0) {
      patterns.revertedRate = (this.metrics.revertedDecisions / this.iterations.length * 100).toFixed(1);
    }

    // Stage distribution
    patterns.stageDistribution = {
      exploration: this.metrics.explorationDecisions,
      financeable: this.metrics.financeableDecisions
    };

    return patterns;
  }

  /**
   * Get metrics summary
   */
  async getMetrics() {
    await this.load();
    return this.metrics;
  }

  /**
   * Export decision log to different formats
   */
  async export(format = 'json') {
    await this.load();

    switch (format.toLowerCase()) {
      case 'json':
        return {
          iterations: this.iterations,
          metrics: this.metrics,
          exportDate: new Date().toISOString()
        };
      
      case 'csv':
        const header = 'ID,Fecha,Titulo,Agente,Etapa,Decisión,Estado\n';
        const rows = this.iterations.map(i => 
          `${i.id},${i.date},"${i.title}",${i.agent},${i.stage},"${i.decision}",${i.status}`
        ).join('\n');
        return header + rows;
      
      case 'markdown':
        if (await fileExists(this.decisionLogPath)) {
          return await fs.readFile(this.decisionLogPath, 'utf8');
        }
        return '';
      
      default:
        return { iterations: this.iterations, metrics: this.metrics };
    }
  }
}

export default IterationTracker;
