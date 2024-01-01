export class StockAverageValueCalculator {
  public execute(
    currentStocks: number,
    currentStocksAverageValue: number,
    newPurchasedStocks: number,
    newPurchasedStocksValue: number,
  ): number {
    // eslint-disable-next-line max-len
    const newStockAverageValue = ((currentStocks * currentStocksAverageValue) + (newPurchasedStocks * newPurchasedStocksValue)) / (currentStocks + newPurchasedStocks);

    return newStockAverageValue;
  }
}
