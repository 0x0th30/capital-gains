import { Tax } from 'global';
import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';

export class Wallet {
  private readonly MINIMUM_OPERATION_COST_TO_TAX = 20000;

  private readonly TAX_PERCENT = 0.2;

  private stocks = 0;

  private stockAverageValue = 0;

  private balance = 0;

  constructor(
    private readonly StockAverageValueCalculatorService: StockAverageValueCalculator,
  ) {}

  public buy(unitCost: number, quantity: number): Tax {
    if (this.stocks === 0 || this.stockAverageValue === 0) {
      this.balance = 0;
      this.stockAverageValue = unitCost;
    }

    this.stockAverageValue = this.StockAverageValueCalculatorService
      .execute(this.stocks, this.stockAverageValue, quantity, unitCost);
    this.stocks += quantity;

    return { tax: 0 };
  }

  public sell(unitCost: number, quantity: number): Tax {
    let operationBalance = 0;
    if (unitCost < this.stockAverageValue) {
      operationBalance = 0 - ((this.stockAverageValue - unitCost) * quantity);
    }
    if (unitCost > this.stockAverageValue) {
      operationBalance = (unitCost - this.stockAverageValue) * quantity;
    }

    this.stocks -= quantity;
    this.balance += operationBalance;
    const operationTotalCost = unitCost * quantity;

    let tax: number | string = 0;
    if (operationBalance > 0
      && this.balance > 0
      && operationTotalCost > this.MINIMUM_OPERATION_COST_TO_TAX
    ) tax = parseFloat((this.balance * this.TAX_PERCENT).toFixed(2));

    return { tax };
  }
}
