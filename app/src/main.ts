import { Controller } from '@controllers/controller';
import { SimulationOperator } from '@entities/simulation-operator';
import { Wallet } from '@entities/wallet';
import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';

new Controller(
  new SimulationOperator(
    new Wallet(
      new StockAverageValueCalculator(),
    ),
  ),
).start();
