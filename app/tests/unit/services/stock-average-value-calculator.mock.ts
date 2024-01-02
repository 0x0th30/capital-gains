import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';

export const StockAverageValueCalculatorMock = {
  execute: jest.spyOn(StockAverageValueCalculator.prototype, 'execute'),
};
