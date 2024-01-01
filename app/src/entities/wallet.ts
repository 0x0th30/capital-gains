import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';

export class Wallet {
  public stocks = 0;

  public stockAverageValue = 0;

  public balance = 0;

  public operations: Array<any> = [];

  public taxes: Array<any> = [];

  constructor(
    private readonly StockAverageValueCalculatorService: StockAverageValueCalculator,
  ) {}

  public buy(unitCost: number, quantity: number): void {
    if (this.stocks === 0 || this.stockAverageValue === 0) {
      this.balance = 0;
      this.stockAverageValue = unitCost;
    }

    this.stockAverageValue = this.StockAverageValueCalculatorService
      .execute(this.stocks, this.stockAverageValue, quantity, unitCost);
    this.stocks += quantity;

    this.taxes.push({ tax: 0 });
  }

  public sell(unitCost: number, quantity: number): void {
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

    let tax = 0;
    if (operationBalance > 0
      && this.balance > 0
      && operationTotalCost > 20000
    ) tax = this.balance * 0.2;

    this.taxes.push({ tax });
  }
}
