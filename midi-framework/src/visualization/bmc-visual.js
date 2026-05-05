/**
 * BMC Visual Generator
 * Generates ASCII and Mermaid diagrams for Business Model Canvas
 */

/**
 * Generate ASCII representation of Business Model Canvas
 */
export function ascii(bmcData) {
  const { 
    keyPartners = [],
    keyActivities = [],
    keyResources = [],
    valuePropositions = [],
    customerRelationships = [],
    channels = [],
    customerSegments = [],
    costStructure = [],
    revenueStreams = []
  } = bmcData;

  const truncate = (arr, maxLines = 3) => {
    const items = arr.slice(0, maxLines);
    const remaining = arr.length - maxLines;
    const lines = items.map(item => `• ${item}`.substring(0, 30).padEnd(32));
    if (remaining > 0) lines.push(`• ... y ${remaining} más`.padEnd(32));
    return lines.join('\n');
  };

  return `
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              BUSINESS MODEL CANVAS                                   │
├────────────────────┬────────────────────┬────────────────────┬──────────────────────┤
│   KEY PARTNERS     │   KEY ACTIVITIES   │  VALUE PROP.       │  CUSTOMER            │
│                    │                    │                    │  RELATIONSHIPS       │
│ ${truncate(keyPartners).split('\n')[0] || ' '.padEnd(18)} │ ${truncate(keyActivities).split('\n')[0] || ' '.padEnd(18)} │ ${truncate(valuePropositions).split('\n')[0] || ' '.padEnd(18)} │ ${truncate(customerRelationships).split('\n')[0] || ' '.padEnd(20)} │
│ ${truncate(keyPartners).split('\n')[1] || ' '.padEnd(18)} │ ${truncate(keyActivities).split('\n')[1] || ' '.padEnd(18)} │ ${truncate(valuePropositions).split('\n')[1] || ' '.padEnd(18)} │ ${truncate(customerRelationships).split('\n')[1] || ' '.padEnd(20)} │
│ ${truncate(keyPartners).split('\n')[2] || ' '.padEnd(18)} │ ${truncate(keyActivities).split('\n')[2] || ' '.padEnd(18)} │ ${truncate(valuePropositions).split('\n')[2] || ' '.padEnd(18)} │ ${truncate(customerRelationships).split('\n')[2] || ' '.padEnd(20)} │
├────────────────────┼────────────────────┤                    ├──────────────────────┤
│                    │   KEY RESOURCES    │                    │  CHANNELS            │
│                    │                    │                    │                      │
│                    │ ${truncate(keyResources).split('\n')[0] || ' '.padEnd(18)} │                    │ ${truncate(channels).split('\n')[0] || ' '.padEnd(20)} │
│                    │ ${truncate(keyResources).split('\n')[1] || ' '.padEnd(18)} │                    │ ${truncate(channels).split('\n')[1] || ' '.padEnd(20)} │
│                    │ ${truncate(keyResources).split('\n')[2] || ' '.padEnd(18)} │                    │ ${truncate(channels).split('\n')[2] || ' '.padEnd(20)} │
├────────────────────┴────────────────────┴────────────────────┼──────────────────────┤
│  CUSTOMER SEGMENTS                                          │                      │
│ ${truncate(customerSegments).split('\n')[0] || ' '.padEnd(60)} │                      │
│ ${truncate(customerSegments).split('\n')[1] || ' '.padEnd(60)} │                      │
├─────────────────────────────────────────────────────────────┴──────────────────────┤
│  COST STRUCTURE                          │  REVENUE STREAMS                        │
│ ${truncate(costStructure).split('\n')[0] || ' '.padEnd(40)} │ ${truncate(revenueStreams).split('\n')[0] || ' '.padEnd(40)} │
│ ${truncate(costStructure).split('\n')[1] || ' '.padEnd(40)} │ ${truncate(revenueStreams).split('\n')[1] || ' '.padEnd(40)} │
└──────────────────────────────────────────┴─────────────────────────────────────────┘
`;
}

/**
 * Generate Mermaid diagram for Business Model Canvas
 */
export function mermaid(bmcData) {
  const { 
    keyPartners = [],
    keyActivities = [],
    keyResources = [],
    valuePropositions = [],
    customerRelationships = [],
    channels = [],
    customerSegments = [],
    costStructure = [],
    revenueStreams = []
  } = bmcData;

  return `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#E3F2FD'}}}%%
flowchart TB
    subgraph KP[Key Partners]
        ${keyPartners.slice(0, 3).map((p, i) => `KP${i}["${p.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph KA[Key Activities]
        ${keyActivities.slice(0, 3).map((a, i) => `KA${i}["${a.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph KR[Key Resources]
        ${keyResources.slice(0, 3).map((r, i) => `KR${i}["${r.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph VP[Value Propositions]
        ${valuePropositions.slice(0, 3).map((v, i) => `VP${i}["${v.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph CR[Customer Relationships]
        ${customerRelationships.slice(0, 3).map((c, i) => `CR${i}["${c.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph CH[Channels]
        ${channels.slice(0, 3).map((c, i) => `CH${i}["${c.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph CS[Customer Segments]
        ${customerSegments.slice(0, 3).map((s, i) => `CS${i}["${s.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph COST[Cost Structure]
        ${costStructure.slice(0, 2).map((c, i) => `COST${i}["${c.substring(0, 30)}"]`).join('\n        ')}
    end

    subgraph REV[Revenue Streams]
        ${revenueStreams.slice(0, 2).map((r, i) => `REV${i}["${r.substring(0, 30)}"]`).join('\n        ')}
    end

    KP --> KA
    KA --> VP
    KR --> VP
    VP --> CR
    VP --> CH
    CR --> CS
    CH --> CS
    COST -.-> KA
    REV -.-> VP
`;
}

/**
 * Generate Markdown table for Business Model Canvas
 */
export function markdown(bmcData) {
  const { 
    keyPartners = [],
    keyActivities = [],
    keyResources = [],
    valuePropositions = [],
    customerRelationships = [],
    channels = [],
    customerSegments = [],
    costStructure = [],
    revenueStreams = []
  } = bmcData;

  return `
## Business Model Canvas

| Key Partners | Key Activities | Value Propositions | Customer Relationships | Customer Segments |
|--------------|----------------|-------------------|----------------------|-------------------|
| ${keyPartners.map(p => `- ${p}`).join('<br>')} | ${keyActivities.map(a => `- ${a}`).join('<br>')} | ${valuePropositions.map(v => `- ${v}`).join('<br>')} | ${customerRelationships.map(c => `- ${c}`).join('<br>')} | ${customerSegments.map(s => `- ${s}`).join('<br>')} |
| | Key Resources | | Channels | |
| | ${keyResources.map(r => `- ${r}`).join('<br>')} | | ${channels.map(c => `- ${c}`).join('<br>')} | |
| **Cost Structure** | | **Revenue Streams** | | |
| ${costStructure.map(c => `- ${c}`).join('<br>')} | | ${revenueStreams.map(r => `- ${r}`).join('<br>')} | | |
`;
}

// All functions are exported via export keyword above
