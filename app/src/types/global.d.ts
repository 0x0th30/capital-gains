export type Operation = {
  operation: 'buy' | 'sell',
  'unit-cost': number,
  quantity: number,
};

export type Tax = { tax: number };

export type Simulation = Array<Operation>;

export type SimulationResults = Array<Tax>;
