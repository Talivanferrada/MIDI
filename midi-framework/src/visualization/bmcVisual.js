/**
 * Generate Business Model Canvas visualizations
 * @param {Object} bmcData - BMC data object
 * @returns {string} Markdown formatted visualization
 */
export function generateBMCVisual(bmcData) {
  const isLean = bmcData.type === 'lean';
  
  return `
## ${isLean ? 'Lean Canvas' : 'Business Model Canvas'} - Visual

### ASCII Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KEY PARTNERS                                       │
│  ${(bmcData.keyPartners || 'Not defined').substring(0, 65).padEnd(65)}│
├───────────────────┬───────────────────┬───────────────────┬─────────────────┤
│ KEY ACTIVITIES    │ KEY RESOURCES     │ VALUE PROPOSITIONS│ CUSTOMER        │
│ ${(bmcData.keyActivities || '').substring(0, 16).padEnd(16)}│ ${(bmcData.keyResources || '').substring(0, 16).padEnd(16)}│ ${(bmcData.valueProposition || '').substring(0, 17).padEnd(17)}│ RELATIONSHIPS   │
│                   │                   │                   │ ${(bmcData.customerRelationships || '').substring(0, 15).padEnd(15)}│
├───────────────────┴───────────────────┤                   ├─────────────────┤
│ COST STRUCTURE                        │                   │ CHANNELS        │
│ ${(bmcData.costStructure || '').substring(0, 37).padEnd(37)}│                   │ ${(bmcData.channels || '').substring(0, 15).padEnd(15)}│
├───────────────────────────────────────┴───────────────────┴─────────────────┤
│                              CUSTOMER SEGMENTS                               │
│  ${(bmcData.customerSegments || 'Not defined').substring(0, 65).padEnd(65)}│
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Key Components

#### Value Proposition
${bmcData.valueProposition || 'Not defined'}

#### Customer Segments
${bmcData.customerSegments || 'Not defined'}

#### Channels
${bmcData.channels || 'Not defined'}

#### Customer Relationships
${bmcData.customerRelationships || 'Not defined'}

#### Revenue Streams
${bmcData.revenueStreams || 'Not defined'}

#### Key Resources
${bmcData.keyResources || 'Not defined'}

#### Key Activities
${bmcData.keyActivities || 'Not defined'}

#### Key Partners
${bmcData.keyPartners || 'Not defined'}

#### Cost Structure
${bmcData.costStructure || 'Not defined'}

### Mermaid Diagram

\`\`\`mermaid
graph TB
    KP[Key Partners] --> KA[Key Activities]
    KP --> KR[Key Resources]
    KA --> VP[Value Proposition]
    KR --> VP
    VP --> CR[Customer Relationships]
    VP --> CH[Channels]
    CR --> CS[Customer Segments]
    CH --> CS
    RS[Revenue Streams] --> CS
    CS --> RS
    CS --> CO[Cost Structure]
    KA --> CO
    
    style VP fill:#4CAF50,stroke:#2E7D32,color:#fff
    style CS fill:#2196F3,stroke:#1565C0,color:#fff
    style KP fill:#FF9800,stroke:#EF6C00,color:#fff
    style KR fill:#FF9800,stroke:#EF6C00,color:#fff
    style KA fill:#FF9800,stroke:#EF6C00,color:#fff
\`\`\`

### Canvas Interconnections

| From | To | Relationship |
|------|----|--------------| 
| Key Partners | Key Activities | Partners enable activities |
| Key Partners | Key Resources | Partners provide resources |
| Key Activities | Value Proposition | Activities create value |
| Key Resources | Value Proposition | Resources support value delivery |
| Value Proposition | Customer Segments | Value delivered to customers |
| Channels | Customer Segments | Channels reach customers |
| Customer Relationships | Customer Segments | Relationships built with segments |
`;
}
