export class StockAverageValueCalculator {
  public execute(
    currentStocks: number,
    currentStocksAverageValue: number,
    newPurchasedStocks: number,
    newPurchasedStocksValue: number,
  ): number {
    const newStockAverageValue = (
      (currentStocks * currentStocksAverageValue)
      + (newPurchasedStocks * newPurchasedStocksValue))
      / (currentStocks + newPurchasedStocks);

    return newStockAverageValue;
  }
}
