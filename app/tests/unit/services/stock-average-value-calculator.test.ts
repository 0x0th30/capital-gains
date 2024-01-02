import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';

const StockAverageValueCalculatorSUT = new StockAverageValueCalculator();

describe('StockAverageValueCalculator class', () => {
  describe('(public) execute method', () => {
    it('should calculate and return new stock average value', () => {
      const currentStocks = 5;
      const currentStocksAverageValue = 20.00;
      const newPurchasedStocks = 5;
      const newPurchasedStocksValue = 10.00;

      const newStockAverageValue = StockAverageValueCalculatorSUT.execute(
        currentStocks,
        currentStocksAverageValue,
        newPurchasedStocks,
        newPurchasedStocksValue,
      );
      const expectedNewStocksAverageValue = 15.00;

      expect(newStockAverageValue).toEqual(expectedNewStocksAverageValue);
    });
    it('should round value and limit it to 2 decimal cases', () => {
      const currentStocks = 10;
      const currentStocksAverageValue = 20.00;
      const newPurchasedStocks = 5;
      const newPurchasedStocksValue = 10.00;

      const newStockAverageValue = StockAverageValueCalculatorSUT.execute(
        currentStocks,
        currentStocksAverageValue,
        newPurchasedStocks,
        newPurchasedStocksValue,
      );
      const expectedNewStocksAverageValue = 16.67;

      expect(newStockAverageValue).toEqual(expectedNewStocksAverageValue);
    });
  });
});
