import { Simulation } from 'global';
import { SimulationOperator } from '@entities/simulation-operator';
import { Wallet } from '@entities/wallet';
import { WalletMock } from './wallet.mock';

const SimulationOperatorSUT = new SimulationOperator(WalletMock as unknown as Wallet);

describe('SimulationOperator class', () => {
  describe('(public) run method', () => {
    it('should detect buy operations and call correct wallet method', () => {
      const simulation: Simulation = [
        { operation: 'buy', 'unit-cost': 10.00, quantity: 10000 },
      ];

      WalletMock.buy.mockReturnValueOnce({ tax: 0 });

      SimulationOperatorSUT.run(simulation);

      expect(WalletMock.buy).toHaveBeenCalled();
    });
    it('should detect buy operations and call correct wallet method using provided'
    + ' parameters', () => {
      const simulation: Simulation = [
        { operation: 'buy', 'unit-cost': 10.00, quantity: 10000 },
      ];

      WalletMock.buy.mockReturnValueOnce({ tax: 0 });

      SimulationOperatorSUT.run(simulation);

      expect(WalletMock.buy).toHaveBeenCalledWith(
        simulation[0]['unit-cost'],
        simulation[0].quantity,
      );
    });
    it('should detect sell operations and call correct wallet method', () => {
      const simulation: Simulation = [
        { operation: 'sell', 'unit-cost': 10.00, quantity: 10000 },
      ];

      WalletMock.sell.mockReturnValueOnce({ tax: 0 });

      SimulationOperatorSUT.run(simulation);

      expect(WalletMock.sell).toHaveBeenCalled();
    });
    it('should detect sell operations and call correct wallet method using provided'
    + ' parameters', () => {
      const simulation: Simulation = [
        { operation: 'sell', 'unit-cost': 10.00, quantity: 10000 },
      ];

      WalletMock.sell.mockReturnValueOnce({ tax: 0 });

      SimulationOperatorSUT.run(simulation);

      expect(WalletMock.sell).toHaveBeenCalledWith(
        simulation[0]['unit-cost'],
        simulation[0].quantity,
      );
    });
    it('should store and return operation taxes as output', () => {
      const simulation: Simulation = [
        { operation: 'buy', 'unit-cost': 10.00, quantity: 10000 },
        { operation: 'sell', 'unit-cost': 10.00, quantity: 10000 },
      ];

      WalletMock.buy.mockReturnValueOnce({ tax: 0 });
      WalletMock.sell.mockReturnValueOnce({ tax: 0 });

      const expectedResult = [{ tax: 0 }, { tax: 0 }];

      const result = SimulationOperatorSUT.run(simulation);

      expect(result).toEqual(expectedResult);
    });
  });
});
