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

  private updateEmptyWallet(stockAverageValue: number): void {
    this.balance = 0;
    this.stockAverageValue = stockAverageValue;
  }

  public buy(unitCost: number, quantity: number): Tax {
    if (this.stocks === 0 || this.stockAverageValue === 0) {
      this.updateEmptyWallet(unitCost);
    }

    this.stockAverageValue = this.StockAverageValueCalculatorService.execute(
      this.stocks,
      this.stockAverageValue,
      quantity,
      unitCost,
    );
    this.stocks += quantity;

    return { tax: 0 };
  }

  private calculateOperationBalance(unitCost: number, quantity: number): number {
    let operationBalance = 0;
    if (unitCost < this.stockAverageValue) {
      operationBalance = 0 - ((this.stockAverageValue - unitCost) * quantity);
    }
    if (unitCost > this.stockAverageValue) {
      operationBalance = (unitCost - this.stockAverageValue) * quantity;
    }

    return operationBalance;
  }

  private updateWalletAfterSell(quantity: number, operationBalance: number): void {
    this.stocks -= quantity;
    this.balance += operationBalance;
  }

  private calculateTax(operationBalance: number, operationTotalCost: number): number {
    const isOperationBalancePositive = (operationBalance > 0);
    const isWalletBalancePositive = (this.balance > 0);
    const isOperationTaxed = (operationTotalCost > this.MINIMUM_OPERATION_COST_TO_TAX);

    let tax = 0;
    if (isOperationBalancePositive && isWalletBalancePositive && isOperationTaxed) {
      tax = parseFloat((this.balance * this.TAX_PERCENT).toFixed(2));
    }

    return tax;
  }

  public sell(unitCost: number, quantity: number): Tax {
    const operationTotalCost = unitCost * quantity;
    const operationBalance = this.calculateOperationBalance(unitCost, quantity);

    this.updateWalletAfterSell(quantity, operationBalance);

    const tax = this.calculateTax(operationBalance, operationTotalCost);

    return { tax };
  }
}
