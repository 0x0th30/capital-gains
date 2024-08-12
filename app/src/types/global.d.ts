export type Operation = {
  operation: 'buy' | 'sell',
  'unit-cost': number,
  quantity: number,
  ticker: string,
};

export type Stock = {
  ticker: string,
  quantity: number,
  stockAverageValue: number,
  balance: number,
}

export type Tax = { tax: number };

export type OperationError = { error: string };

export type Simulation = Array<Operation>;

export type SimulationResults = Array<Tax | OperationError>;
