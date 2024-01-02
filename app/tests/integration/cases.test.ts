import { Controller } from '@controllers/controller';
import { SimulationOperator } from '@entities/simulation-operator';
import { Wallet } from '@entities/wallet';
import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';
import { ControllerMock } from '@tests/unit/controllers/controller.mock';

let ControllerSUT = new Controller(
  new SimulationOperator(
    new Wallet(
      new StockAverageValueCalculator(),
    ),
  ),
);

beforeEach(() => {
  ControllerSUT = new Controller(
    new SimulationOperator(
      new Wallet(
        new StockAverageValueCalculator(),
      ),
    ),
  );
});

describe('Integration', () => {
  test('Case 1', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 100},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 50},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 50}]';
    const expectedOutput = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }]];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 2', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]';
    const expectedOutput = [[{ tax: 0.00 }, { tax: 10000.00 }, { tax: 0.00 }]];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 1 + 2', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 100},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 50},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 50}]\n'
    + '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]';
    const expectedOutput = [
      [{ tax: 0 }, { tax: 0 }, { tax: 0 }],
      [{ tax: 0.00 }, { tax: 10000.00 }, { tax: 0.00 }],
    ];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 3', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":5.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 3000}]';
    const expectedOutput = [[{ tax: 0.00 }, { tax: 0.00 }, { tax: 1000.00 }]];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 4', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"buy", "unit-cost":25.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 10000}]';
    const expectedOutput = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }]];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 5', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"buy", "unit-cost":25.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":25.00, "quantity": 5000}]';
    const expectedOutput = [
      [{ tax: 0.00 }, { tax: 0.00 }, { tax: 0.00 }, { tax: 10000.00 }],
    ];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 6', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":2.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 2000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 2000},'
    + '{"operation":"sell", "unit-cost":25.00, "quantity": 1000}]';
    const expectedOutput = [
      [{ tax: 0.00 }, { tax: 0.00 }, { tax: 0.00 }, { tax: 0.00 }, { tax: 3000.00 }],
    ];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 7', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":2.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 2000},'
    + '{"operation":"sell", "unit-cost":20.00, "quantity": 2000},'
    + '{"operation":"sell", "unit-cost":25.00, "quantity": 1000},'
    + '{"operation":"buy", "unit-cost":20.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":15.00, "quantity": 5000},'
    + '{"operation":"sell", "unit-cost":30.00, "quantity": 4350},'
    + '{"operation":"sell", "unit-cost":30.00, "quantity": 650}]';
    const expectedOutput = [
      [{ tax: 0.00 }, { tax: 0.00 }, { tax: 0.00 }, { tax: 0.00 }, { tax: 3000.00 },
        { tax: 0.00 }, { tax: 0.00 }, { tax: 3700.00 }, { tax: 0.00 }],
    ];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
  test('Case 8', () => {
    const input = '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":50.00, "quantity": 10000},'
    + '{"operation":"buy", "unit-cost":20.00, "quantity": 10000},'
    + '{"operation":"sell", "unit-cost":50.00, "quantity": 10000}]';
    const expectedOutput = [
      [{ tax: 0.00 }, { tax: 80000.00 }, { tax: 0.00 }, { tax: 60000.00 }],
    ];

    (ControllerSUT as any).stdinCallback(input);
    expect(ControllerMock.runSimulations).toHaveReturnedWith(expectedOutput);
  });
});
