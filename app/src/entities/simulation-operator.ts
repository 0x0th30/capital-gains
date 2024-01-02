/* eslint-disable max-len */
import { Simulation, SimulationResults } from 'global';
import { Wallet } from '@entities/wallet';

export class SimulationOperator {
  constructor(
    private readonly WalletEntity: Wallet,
  ) {}

  public run(simulation: Simulation): SimulationResults {
    const results: SimulationResults = [];

    const operationTypeMap = {
      buy: this.WalletEntity.buy.bind(this.WalletEntity),
      sell: this.WalletEntity.sell.bind(this.WalletEntity),
    };

    simulation.forEach((operation) => {
      const tax = operationTypeMap[operation.operation](
        operation['unit-cost'],
        operation.quantity,
      );

      results.push(tax);
    });

    return results;
  }
}
