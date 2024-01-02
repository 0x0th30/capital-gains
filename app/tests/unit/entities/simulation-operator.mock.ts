import { SimulationOperator } from '@entities/simulation-operator';

export const SimulationOperatorMock = {
  run: jest.spyOn(SimulationOperator.prototype, 'run'),
};
