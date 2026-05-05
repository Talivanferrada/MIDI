# Calculadoras Financieras - Referencia

## Índice

1. [Introducción](#introducción)
2. [Importación](#importación)
3. [Punto de Equilibrio](#punto-de-equilibrio)
4. [Flujo de Caja](#flujo-de-caja)
5. [Proyecciones de Ingresos](#proyecciones-de-ingresos)
6. [CAC y LTV](#cac-y-ltv)
7. [Runway](#runway)
8. [Inversión Requerida](#inversión-requerida)
9. [Escenarios](#escenarios)
10. [Validación contra Benchmarks](#validación-contra-benchmarks)

---

## Introducción

El módulo de calculadoras financieras proporciona funciones para realizar análisis financiero automatizado. Diseñado para ser usado por `midi-financial-agent` pero también disponible para uso programático.

---

## Importación

```javascript
import {
  calculateBreakEven,
  calculateCashFlow,
  calculateRevenueProjections,
  calculateCAC,
  calculateLTV,
  calculateLtvCacRatio,
  calculateRunway,
  calculateInvestmentRequired,
  calculateScenarios,
  validateAgainstBenchmarks
} from 'midi-framework';
```

---

## Punto de Equilibrio

### calculateBreakEven()

Calcula el punto de equilibrio en unidades y revenue.

**Sintaxis:**
```javascript
const result = calculateBreakEven(fixedCosts, pricePerUnit, variableCostPerUnit);
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `fixedCosts` | number | Costos fijos mensuales |
| `pricePerUnit` | number | Precio por unidad |
| `variableCostPerUnit` | number | Costo variable por unidad |

**Retorno:**
```javascript
{
  units: 125,           // Unidades para break-even
  revenue: 12500,       // Revenue en break-even
  contributionMargin: 80, // Margen de contribución
  message: "125 unidades para cubrir costos"
}
```

**Ejemplo:**
```javascript
// Cafetería con costos fijos de $1.000.000 mensuales
// Café a $2.500, costo variable $800
const breakEven = calculateBreakEven(1000000, 2500, 800);
// Resultado: 588 cafés/mes para cubrir costos
```

---

## Flujo de Caja

### calculateCashFlow()

Proyecta flujo de caja mensual.

**Sintaxis:**
```javascript
const result = calculateCashFlow({
  initialInvestment,
  monthlyRevenue,       // Array de 12 valores
  monthlyFixedCosts,
  variableCostPercent,
  months
});
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `initialInvestment` | number | Inversión inicial (mes 0) |
| `monthlyRevenue` | number[] | Array de ingresos por mes |
| `monthlyFixedCosts` | number | Costos fijos mensuales |
| `variableCostPercent` | number | % de costo variable sobre ingresos |
| `months` | number | Meses a proyectar (default: 12) |

**Retorno:**
```javascript
{
  projections: [
    { month: 1, revenue: 10000, fixedCosts: 5000, variableCosts: 2000, netFlow: 3000, cumulative: -47000 }
  ],
  peakCashNeed: 50000,        // Máxima necesidad de efectivo
  positiveCashMonth: 8,       // Mes con flujo positivo acumulado
  totalRevenue: 120000,       // Total ingresos año 1
  totalCosts: 100000,         // Total costos año 1
  finalPosition: 20000        // Posición final acumulada
}
```

**Ejemplo:**
```javascript
const cashFlow = calculateCashFlow({
  initialInvestment: 50000,
  monthlyRevenue: [5000, 8000, 12000, 15000, 18000, 20000, 22000, 24000, 25000, 26000, 27000, 28000],
  monthlyFixedCosts: 8000,
  variableCostPercent: 20,
  months: 12
});

console.log(`Flujo positivo en mes ${cashFlow.positiveCashMonth}`);
console.log(`Necesidad máxima: $${cashFlow.peakCashNeed}`);
```

---

## Proyecciones de Ingresos

### calculateRevenueProjections()

Proyecta clientes y revenue con growth rate y churn.

**Sintaxis:**
```javascript
const result = calculateRevenueProjections({
  initialClients,
  growthRate,      // % mensual
  churnRate,       // % mensual
  pricePerClient,
  months
});
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `initialClients` | number | Clientes al inicio |
| `growthRate` | number | Tasa de crecimiento mensual (%) |
| `churnRate` | number | Tasa de pérdida mensual (%) |
| `pricePerClient` | number | Ingreso promedio por cliente |
| `months` | number | Meses a proyectar |

**Retorno:**
```javascript
{
  projections: [
    { month: 1, clients: 105, newClients: 10, lostClients: 5, revenue: 10500 }
  ],
  year1Revenue: 150000,
  finalClients: 180,
  averageMonthlyRevenue: 12500
}
```

**Ejemplo:**
```javascript
// SaaS con 100 clientes iniciales
// Crece 10%/mes, pierde 3%/mes, cobra $100/mes
const projections = calculateRevenueProjections({
  initialClients: 100,
  growthRate: 10,
  churnRate: 3,
  pricePerClient: 100,
  months: 12
});

console.log(`Ingresos año 1: $${projections.year1Revenue}`);
console.log(`Clientes finales: ${projections.finalClients}`);
```

---

## CAC y LTV

### calculateCAC()

Calcula el costo de adquisición de cliente.

**Sintaxis:**
```javascript
const result = calculateCAC({
  marketingSpend,
  salesTeamCost,
  toolsAndSoftware,
  newCustomersAcquired
});
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `marketingSpend` | number | Gasto en marketing |
| `salesTeamCost` | number | Costo equipo de ventas |
| `toolsAndSoftware` | number | Herramientas y software |
| `newCustomersAcquired` | number | Clientes nuevos |

**Retorno:**
```javascript
{
  totalAcquisitionCost: 16000,
  cac: 160,              // Costo por cliente
  breakdown: {
    marketing: 10000,
    sales: 5000,
    tools: 1000
  }
}
```

### calculateLTV()

Calcula el valor de vida del cliente.

**Sintaxis:**
```javascript
const result = calculateLTV({
  averageRevenuePerCustomer,
  grossMargin,           // %
  averageCustomerLifespanMonths,  // opcional si hay churn
  churnRate             // opcional si hay lifespan
});
```

**Retorno:**
```javascript
{
  ltv: 1920,             // Valor de vida
  averageLifespanMonths: 24,
  grossMarginPercent: 80,
  ltvToCacRatio: null    // Setear externamente con CAC
}
```

### calculateLtvCacRatio()

Evalúa la relación LTV:CAC.

**Sintaxis:**
```javascript
const result = calculateLtvCacRatio(ltv, cac);
```

**Retorno:**
```javascript
{
  ratio: 3,
  interpretation: "✅ Excelente - Escalable"
}
```

**Interpretaciones:**

| Ratio | Interpretación |
|-------|----------------|
| ≥3 | ✅ Excelente - Escalable |
| 1-3 | ⚠️ Aceptable - Monitorear |
| <1 | 🔴 Problemático - No sostenible |

**Ejemplo:**
```javascript
const cac = calculateCAC({
  marketingSpend: 100000,
  salesTeamCost: 50000,
  newCustomersAcquired: 100
});

const ltv = calculateLTV({
  averageRevenuePerCustomer: 500,
  grossMargin: 80,
  churnRate: 4
});

const ratio = calculateLtvCacRatio(ltv.ltv, cac.cac);
// ratio.ratio = 5.7 (Excelente)
```

---

## Runway

### calculateRunway()

Calcula meses de runway disponibles.

**Sintaxis:**
```javascript
const result = calculateRunway({
  cashBalance,
  monthlyBurnRate,
  monthlyRevenue
});
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `cashBalance` | number | Efectivo disponible |
| `monthlyBurnRate` | number | Quema mensual |
| `monthlyRevenue` | number | Ingresos mensuales |

**Retorno:**
```javascript
{
  months: 10,            // Meses de runway
  netBurn: 5000,        // Quema neta
  status: "caution",    // healthy | good | caution | critical | profitable
  message: "10 meses de runway"
}
```

**Estados:**

| Estado | Condición |
|--------|-----------|
| `profitable` | Revenue >= Burn |
| `healthy` | Runway >= 18 meses |
| `good` | Runway >= 12 meses |
| `caution` | Runway >= 6 meses |
| `critical` | Runway < 6 meses |

---

## Inversión Requerida

### calculateInvestmentRequired()

Calcula inversión total necesaria hasta rentabilidad.

**Sintaxis:**
```javascript
const result = calculateInvestmentRequired({
  initialInvestment,
  monthlyBurn,
  monthsToProfitability,
  bufferMonths,        // default: 3
  contingencyPercent   // default: 10
});
```

**Retorno:**
```javascript
{
  initialInvestment: 50000,
  operationalCosts: 120000,
  bufferCosts: 30000,
  contingency: 20000,
  totalRequired: 220000,
  breakdown: {
    'Inversión inicial': 50000,
    'Operación hasta rentabilidad': 120000,
    'Buffer de seguridad': 30000,
    'Contingencia': 20000
  }
}
```

---

## Escenarios

### calculateScenarios()

Genera análisis de 3 escenarios.

**Sintaxis:**
```javascript
const result = calculateScenarios({
  baseRevenue,
  baseCosts,
  baseGrowth
});
```

**Retorno:**
```javascript
{
  pessimistic: {
    revenue: 50000,       // 50% del base
    costs: 96000,         // +20% del base
    growth: 5,            // 50% del base
    probability: '20%',
    label: 'Escenario Pesimista'
  },
  realistic: {
    revenue: 100000,
    costs: 80000,
    growth: 10,
    probability: '60%',
    label: 'Escenario Realista'
  },
  optimistic: {
    revenue: 150000,      // +50% del base
    costs: 72000,         // -10% del base
    growth: 15,
    probability: '20%',
    label: 'Escenario Optimista'
  }
}
```

---

## Validación contra Benchmarks

### validateAgainstBenchmarks()

Valida proyecciones contra benchmarks de industria.

**Sintaxis:**
```javascript
const result = validateAgainstBenchmarks(projections, industry);
```

**Industrias disponibles:**
- `'saas'` - Software as a Service
- `'ecommerce'` - E-commerce
- `'marketplace'` - Marketplace

**Benchmarks por industria:**

| Métrica | SaaS | E-commerce | Marketplace |
|---------|------|------------|-------------|
| CAC máximo | $200 | $50 | $100 |
| LTV:CAC mínimo | 3:1 | 2:1 | 2.5:1 |
| Churn máximo | 5% | 10% | 8% |
| Crecimiento típico | 10%/mes | 15%/mes | 20%/mes |

**Retorno:**
```javascript
{
  benchmark: {
    maxCac: 200,
    minLtvCac: 3,
    maxChurn: 5,
    typicalGrowth: 10
  },
  warnings: [
    "⚠️ CAC ($500) es >100% sobre benchmark ($200)",
    "⚠️ Crecimiento (50%) muy agresivo vs benchmark (10%)"
  ],
  isValid: false
}
```

**Ejemplo completo:**
```javascript
// Evaluar startup SaaS
const projections = {
  cac: 150,
  ltvCacRatio: 4,
  churnRate: 3,
  growthRate: 12
};

const validation = validateAgainstBenchmarks(projections, 'saas');

if (validation.isValid) {
  console.log('✅ Proyecciones dentro de benchmarks');
} else {
  console.log('⚠️ Advertencias:');
  validation.warnings.forEach(w => console.log(w));
}
```

---

## Ejemplos Prácticos

### Ejemplo 1: Startup SaaS

```javascript
import {
  calculateBreakEven,
  calculateCashFlow,
  calculateCAC,
  calculateLTV,
  calculateLtvCacRatio,
  validateAgainstBenchmarks
} from 'midi-framework';

// 1. Calcular CAC
const cac = calculateCAC({
  marketingSpend: 2000000,      // $2M CLP
  salesTeamCost: 1000000,       // $1M CLP
  toolsAndSoftware: 200000,     // $200K CLP
  newCustomersAcquired: 50
});
// CAC: $64.000 CLP por cliente

// 2. Calcular LTV
const ltv = calculateLTV({
  averageRevenuePerCustomer: 50000,  // $50K CLP/mes
  grossMargin: 85,
  churnRate: 3
});
// LTV: $1.416.667 CLP

// 3. Evaluar ratio
const ratio = calculateLtvCacRatio(ltv.ltv, cac.cac);
// Ratio: 22.1 (¡Excelente!)

// 4. Validar contra benchmarks
const validation = validateAgainstBenchmarks({
  cac: cac.cac / 1000,  // Convertir a USD aprox
  ltvCacRatio: ratio.ratio,
  churnRate: 3,
  growthRate: 10
}, 'saas');
```

### Ejemplo 2: Restaurante

```javascript
import { calculateBreakEven, calculateCashFlow } from 'midi-framework';

// Break-even
const breakEven = calculateBreakEven(
  3000000,   // $3M CLP costos fijos mensuales
  15000,     // Ticket promedio $15K CLP
  5000       // Costo variable $5K CLP por plato
);
// Necesita vender 300 platos/mes

// Flujo de caja
const cashFlow = calculateCashFlow({
  initialInvestment: 50000000,  // $50M CLP
  monthlyRevenue: Array(12).fill(15000000),
  monthlyFixedCosts: 3000000,
  variableCostPercent: 35,
  months: 12
});
```

---

## Notas Importantes

### Supuestos y Limitaciones

1. **Modelo simplificado:** Las calculadoras usan modelos lineales. La realidad puede ser más compleja.

2. **Moneda:** Las funciones son agnósticas de moneda. Asegúrate de usar valores consistentes.

3. **Porcentajes:** Siempre usar forma decimal (0.1) o entero (10) según el parámetro.

4. **Validación:** Siempre validar inputs antes de calcular:
   - Números positivos
   - Arrays con longitud correcta
   - Porcentajes en rango 0-100

### Integración con Agentes

El `midi-financial-agent` usa estas calculadoras para:
- Generar análisis automáticos
- Validar proyecciones contra benchmarks
- Calcular métricas clave
- Identificar inconsistencias

---

*Documentación generada para MIDI Framework v0.1.0*
