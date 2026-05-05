/**
 * Lean Canvas Visual Generator
 * Generates ASCII and Mermaid diagrams for Lean Canvas
 */

/**
 * Generate ASCII representation of Lean Canvas
 */
export function ascii(leanData) {
  const { 
    problem = [],
    solution = [],
    uniqueValueProposition = '',
    unfairAdvantage = '',
    customerSegments = [],
    existingAlternatives = [],
    channels = [],
    revenueStreams = [],
    costStructure = [],
    keyMetrics = []
  } = leanData;

  const truncate = (arr, maxLines = 2) => {
    const items = arr.slice(0, maxLines);
    return items.map(item => `• ${item}`.substring(0, 22).padEnd(24)).join('\n');
  };

  const textTruncate = (text, maxLen = 24) => {
    return text.substring(0, maxLen).padEnd(maxLen);
  };

  return `
┌────────────────────────────────────────────────────────────────────────────────┐
│                              LEAN CANVAS                                        │
├────────────────────┬────────────────────┬────────────────────┬─────────────────┤
│   PROBLEM          │   SOLUTION         │  UVP               │  UNFAIR         │
│                    │                    │                    │  ADVANTAGE      │
│ ${truncate(problem).split('\n')[0] || ' '.padEnd(18)} │ ${truncate(solution).split('\n')[0] || ' '.padEnd(18)} │ ${textTruncate(uniqueValueProposition).split('\n')[0]} │ ${textTruncate(unfairAdvantage).split('\n')[0]} │
│ ${truncate(problem).split('\n')[1] || ' '.padEnd(18)} │ ${truncate(solution).split('\n')[1] || ' '.padEnd(18)} │                    │                 │
├────────────────────┤                    ├────────────────────┼─────────────────┤
│  EXISTING          │                    │  CUSTOMER          │  CHANNELS       │
│  ALTERNATIVES      │                    │  SEGMENTS          │                 │
│ ${truncate(existingAlternatives).split('\n')[0] || ' '.padEnd(18)} │                    │ ${truncate(customerSegments).split('\n')[0] || ' '.padEnd(18)} │ ${truncate(channels).split('\n')[0] || ' '.padEnd(15)} │
│ ${truncate(existingAlternatives).split('\n')[1] || ' '.padEnd(18)} │                    │ ${truncate(customerSegments).split('\n')[1] || ' '.padEnd(18)} │ ${truncate(channels).split('\n')[1] || ' '.padEnd(15)} │
├────────────────────┴────────────────────┼────────────────────┴─────────────────┤
│  KEY METRICS                             │  HIGH-LEVEL CONCEPT                  │
│ ${truncate(keyMetrics).split('\n')[0] || ' '.padEnd(40)} │                                      │
│ ${truncate(keyMetrics).split('\n')[1] || ' '.padEnd(40)} │                                      │
├──────────────────────────────────────────┼──────────────────────────────────────┤
│  COST STRUCTURE                          │  REVENUE STREAMS                     │
│ ${truncate(costStructure).split('\n')[0] || ' '.padEnd(40)} │ ${truncate(revenueStreams).split('\n')[0] || ' '.padEnd(40)} │
│ ${truncate(costStructure).split('\n')[1] || ' '.padEnd(40)} │ ${truncate(revenueStreams).split('\n')[1] || ' '.padEnd(40)} │
└──────────────────────────────────────────┴──────────────────────────────────────┘
`;
}

/**
 * Generate Mermaid diagram for Lean Canvas
 */
export function mermaid(leanData) {
  const { 
    problem = [],
    solution = [],
    uniqueValueProposition = '',
    unfairAdvantage = '',
    customerSegments = [],
    channels = [],
    revenueStreams = [],
    costStructure = [],
    keyMetrics = []
  } = leanData;

  return `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#FFF3E0'}}}%%
flowchart TB
    subgraph PROB[Problem]
        ${problem.slice(0, 2).map((p, i) => `P${i}["${p.substring(0, 25)}"]`).join('\n        ')}
    end

    subgraph SOL[Solution]
        ${solution.slice(0, 2).map((s, i) => `S${i}["${s.substring(0, 25)}"]`).join('\n        ')}
    end

    subgraph UVP[Unique Value Proposition]
        UVP1["${uniqueValueProposition.substring(0, 35)}"]
    end

    subgraph UA[Unfair Advantage]
        UA1["${unfairAdvantage.substring(0, 35)}"]
    end

    subgraph CS[Customer Segments]
        ${customerSegments.slice(0, 2).map((c, i) => `CS${i}["${c.substring(0, 25)}"]`).join('\n        ')}
    end

    subgraph CH[Channels]
        ${channels.slice(0, 2).map((c, i) => `CH${i}["${c.substring(0, 25)}"]`).join('\n        ')}
    end

    subgraph KM[Key Metrics]
        ${keyMetrics.slice(0, 2).map((m, i) => `KM${i}["${m.substring(0, 25)}"]`).join('\n        ')}
    end

    subgraph COST[Cost Structure]
        ${costStructure.slice(0, 2).map((c, i) => `COST${i}["${c.substring(0, 25)}"]`).join('\n        ')}
    end

    subgraph REV[Revenue Streams]
        ${revenueStreams.slice(0, 2).map((r, i) => `REV${i}["${r.substring(0, 25)}"]`).join('\n        ')}
    end

    PROB --> SOL
    SOL --> UVP
    UVP --> CS
    UVP --> UA
    CS --> CH
    KM --> SOL
    COST -.-> SOL
    REV -.-> CS
`;
}

/**
 * Generate Markdown table for Lean Canvas
 */
export function markdown(leanData) {
  const { 
    problem = [],
    solution = [],
    uniqueValueProposition = '',
    unfairAdvantage = '',
    customerSegments = [],
    existingAlternatives = [],
    channels = [],
    revenueStreams = [],
    costStructure = [],
    keyMetrics = []
  } = leanData;

  return `
## Lean Canvas

| Problem | Solution | Unique Value Proposition | Unfair Advantage | Customer Segments |
|---------|----------|-------------------------|------------------|-------------------|
| ${problem.map(p => `- ${p}`).join('<br>')} | ${solution.map(s => `- ${s}`).join('<br>')} | ${uniqueValueProposition} | ${unfairAdvantage} | ${customerSegments.map(c => `- ${c}`).join('<br>')} |
| **Existing Alternatives** | | | **Channels** | |
| ${existingAlternatives.map(a => `- ${a}`).join('<br>')} | | | ${channels.map(c => `- ${c}`).join('<br>')} | |
| **Key Metrics** | | **Cost Structure** | **Revenue Streams** | |
| ${keyMetrics.map(m => `- ${m}`).join('<br>')} | | ${costStructure.map(c => `- ${c}`).join('<br>')} | ${revenueStreams.map(r => `- ${r}`).join('<br>')} | |
`;
}


// All functions exported via export keyword
