import { OperationError, Stock, Tax } from 'global';
import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';

export class Wallet {
  private readonly MINIMUM_OPERATION_COST_TO_TAX = 20000;

  private readonly TAX_PERCENT = 0.2;

  private stocks: Array<Stock> = [];

  private _stocks = 0;

  private _stockAverageValue = 0;

  private _balance = 0;

  private errorCounter = 0;

  constructor(
    private readonly StockAverageValueCalculatorService: StockAverageValueCalculator,
  ) {}

  public buy(unitCost: number, quantity: number, ticker: string): Tax | OperationError {
    const isAccountBlocked = this.isAccountBlocked();
    if (isAccountBlocked) return { error: 'Your account is blocked' };

    const isWalletEmpty = this.isWalletEmpty(ticker);
    if (isWalletEmpty) this.updateEmptyWallet(unitCost);

    const newStockAverageValue = this.StockAverageValueCalculatorService
      .execute(this.stocks, this.stockAverageValue, quantity, unitCost);

    this.updateWalletAfterBuy(quantity, newStockAverageValue);

    return { tax: 0 };
  }

  public sell(unitCost: number, quantity: number, ticker: string): Tax | OperationError {
    const isAccountBlocked = this.isAccountBlocked();
    if (isAccountBlocked) return { error: 'Your account is blocked' };

    const hasWalletSufficientStocksToSell = this
      .hasWalletSufficientStocksToSell(quantity);
    if (!hasWalletSufficientStocksToSell) {
      this.errorCounter += 1;
      return { error: 'Can\'t sell more stocks than you have' };
    }

    const operationTotalCost = unitCost * quantity;
    const operationBalance = this.calculateSellBalance(unitCost, quantity);

    this.updateWalletAfterSell(quantity, operationBalance);

    const tax = this.calculateTax(operationBalance, operationTotalCost);

    return { tax };
  }

  private isWalletEmpty(ticker: string): boolean {
    const stocks = this.stocks.find((stock) => stock.ticker === ticker);
    if (!stocks || stocks.stockAverageValue === 0) return true;

    return false;
  }

  private isAccountBlocked(): boolean {
    if (this.errorCounter >= 3) return true;
    return false;
  }

  private updateEmptyWallet(ticker: string, stockAverageValue: number): void {
    this.stocks.forEach((stock) => {
      if (stock.ticker === ticker) {
        // eslint-disable-next-line no-param-reassign
        stock.balance = 0;
        // eslint-disable-next-line no-param-reassign
        stock.stockAverageValue = stockAverageValue;
      }
    });
  }

  private updateWalletAfterBuy(newStocks: number, newStockAverageValue: number): void {
    this.stocks += newStocks;
    this.stockAverageValue = newStockAverageValue;
  }

  private calculateSellBalance(unitCost: number, soldStocks: number): number {
    let operationBalance = 0;
    if (unitCost < this.stockAverageValue) {
      operationBalance = 0 - ((this.stockAverageValue - unitCost) * soldStocks);
    }
    if (unitCost > this.stockAverageValue) {
      operationBalance = (unitCost - this.stockAverageValue) * soldStocks;
    }

    return operationBalance;
  }

  private updateWalletAfterSell(soldStocks: number, sellBalance: number): void {
    this.stocks -= soldStocks;
    this.balance += sellBalance;
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

  private hasWalletSufficientStocksToSell(quantity: number): boolean {
    if (quantity <= this.stocks) return true;
    return false;
  }
}
