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

    const parsedNewStockAverageValue = parseFloat(newStockAverageValue.toFixed(2));
    return parsedNewStockAverageValue;
  }
}
