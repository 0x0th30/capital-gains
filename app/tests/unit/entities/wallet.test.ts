import { Wallet } from '@entities/wallet';
import { StockAverageValueCalculator } from '@services/stock-average-value-calculator';
import { StockAverageValueCalculatorMock }
  from '@tests/unit/services/stock-average-value-calculator.mock';
import { WalletMock } from './wallet.mock';

let WalletSUT = new Wallet(
  StockAverageValueCalculatorMock as unknown as StockAverageValueCalculator,
);

beforeEach(() => {
  WalletSUT = new Wallet(
    StockAverageValueCalculatorMock as unknown as StockAverageValueCalculator,
  );
});

describe('Wallet class', () => {
  describe('(private) updateEmptyWallet method', () => {
    it('should update "balance" and "stockAverageValue" attributes', () => {
      const newStockAverageValue = 20;
      const expectedNewBalance = 0;
      const expectedNewStockAverageValue = 20;

      (WalletSUT as any).updateEmptyWallet(newStockAverageValue);

      expect((WalletSUT as any).balance).toEqual(expectedNewBalance);
      expect((WalletSUT as any).stockAverageValue)
        .toEqual(expectedNewStockAverageValue);
    });
  });
  describe('(private) updateWalletAfterBuy method', () => {
    it('should update "stocks" and "stockAverageValue" attributes', () => {
      (WalletSUT as any).stocks = 10;
      (WalletSUT as any).stockAverageValue = 10;

      const newStocks = 15;
      const newStockAverageValue = 20;
      const expectedStocks = 25;
      const expectedNewStockAverageValue = 20;

      (WalletSUT as any).updateWalletAfterBuy(newStocks, newStockAverageValue);

      expect((WalletSUT as any).stocks).toEqual(expectedStocks);
      expect((WalletSUT as any).stockAverageValue)
        .toEqual(expectedNewStockAverageValue);
    });
  });
  describe('(public) buy method', () => {
    it('should call ".updateEmptyWallet()" method if wallet has no stock average value'
    + ' defined', () => {
      (WalletSUT as any).stockAverageValue = 0;

      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletSUT.buy(unitCost, quantity);

      expect(WalletMock.updateEmptyWallet).toHaveBeenCalled();
    });
    it('should call ".updateEmptyWallet()" method if wallet has no stocks', () => {
      (WalletSUT as any).stocks = 0;

      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletSUT.buy(unitCost, quantity);

      expect(WalletMock.updateEmptyWallet).toHaveBeenCalled();
    });
    it('should call "StockAverageValueCalculatorService.execute()" at every buy', () => {
      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletMock.updateEmptyWallet.mockImplementation();

      WalletSUT.buy(unitCost, quantity);

      expect(StockAverageValueCalculatorMock.execute).toHaveBeenCalled();
    });
    it('should call "StockAverageValueCalculatorService.execute()" at every buy using'
    + ' correct data', () => {
      const currentStocks = 10;
      const currentStocksAverageValue = 20;
      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      (WalletSUT as any).stocks = currentStocks;
      (WalletSUT as any).stockAverageValue = currentStocksAverageValue;

      WalletSUT.buy(unitCost, quantity);

      expect(StockAverageValueCalculatorMock.execute).toHaveBeenCalledWith(
        currentStocks,
        currentStocksAverageValue,
        unitCost,
        quantity,
      );
    });
    it('should call ".updateWalletAfterBuy()" at every buy', () => {
      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletSUT.buy(unitCost, quantity);

      expect(WalletMock.updateWalletAfterBuy).toHaveBeenCalled();
    });
    it('should call ".updateWalletAfterBuy()" at every buy using correct data', () => {
      const unitCost = 10;
      const quantity = 10;
      const newStockAverageValue = 10;

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletSUT.buy(unitCost, quantity);

      expect(WalletMock.updateWalletAfterBuy).toHaveBeenCalledWith(
        quantity,
        newStockAverageValue,
      );
    });
    it('should return no taxes to buy operations', () => {
      const unitCost = 10;
      const quantity = 10;
      const expectedTax = { tax: 0 };

      WalletMock.updateEmptyWallet.mockReturnValueOnce(null);
      StockAverageValueCalculatorMock.execute.mockReturnValueOnce(10);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      const tax = WalletSUT.buy(unitCost, quantity);

      expect(tax).toEqual(expectedTax);
    });
  });
  describe('(private) calculateSellBalance method', () => {
    it('should return positive balance if unit cost was bigger than stock average'
    + ' value', () => {
      const unitCost = 20;
      const quantity = 10;
      const expectedSellBalance = 100;

      (WalletSUT as any).stockAverageValue = 10;

      const sellBalance = (WalletSUT as any).calculateSellBalance(unitCost, quantity);

      expect(sellBalance).toEqual(expectedSellBalance);
    });
    it('should return negative balance if stock average value was bigger than unit'
    + ' cost', () => {
      const unitCost = 10;
      const quantity = 10;
      const expectedSellBalance = -100;

      (WalletSUT as any).stockAverageValue = 20;

      const sellBalance = (WalletSUT as any).calculateSellBalance(unitCost, quantity);

      expect(sellBalance).toEqual(expectedSellBalance);
    });
  });
  describe('(private) updateWalletAfterSell method', () => {
    it('should update "stocks" and "balance" attributes', () => {
      (WalletSUT as any).stocks = 20;
      (WalletSUT as any).balance = 10;

      const soldStocks = 5;
      const sellBalance = -15;
      const expectedStocks = 15;
      const expectedNewBalanace = -5;

      (WalletSUT as any).updateWalletAfterSell(soldStocks, sellBalance);

      expect((WalletSUT as any).stocks).toEqual(expectedStocks);
      expect((WalletSUT as any).balance).toEqual(expectedNewBalanace);
    });
  });
  describe('(private) calculateTax method', () => {
    it('should apply 20% tax over wallet balance if operation satisfy all tax'
    + ' conditions', () => {
      (WalletSUT as any).balance = 30000;

      const operationBalance = 25000;
      const operationTotalost = 25000;
      const expectedTax = 6000;

      const tax = (WalletSUT as any).calculateTax(operationBalance, operationTotalost);

      expect(tax).toEqual(expectedTax);
    });
    it('should return no taxes if negative operation balance', () => {
      (WalletSUT as any).balance = 30000;

      const operationBalance = -25000;
      const operationTotalost = 25000;
      const expectedTax = 0;

      const tax = (WalletSUT as any).calculateTax(operationBalance, operationTotalost);

      expect(tax).toEqual(expectedTax);
    });
    it('should return no taxes if negative wallet balance', () => {
      (WalletSUT as any).balance = -10000;

      const operationBalance = 25000;
      const operationTotalost = 25000;
      const expectedTax = 0;

      const tax = (WalletSUT as any).calculateTax(operationBalance, operationTotalost);

      expect(tax).toEqual(expectedTax);
    });
    it('should return no taxes if operation cost wasnt bigger than taxed limit', () => {
      (WalletSUT as any).balance = 30000;

      const operationBalance = 25000;
      const operationTotalost = 1000;
      const expectedTax = 0;

      const tax = (WalletSUT as any).calculateTax(operationBalance, operationTotalost);

      expect(tax).toEqual(expectedTax);
    });
  });
  describe('(public) sell method', () => {
    it('should call ".calculateSellBalance()" at every sell', () => {
      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);
      WalletMock.calculateTax.mockReturnValueOnce(0);

      WalletSUT.sell(unitCost, quantity);

      expect(WalletMock.calculateSellBalance).toHaveBeenCalled();
    });
    it('should call ".calculateSellBalance()" at every sell using correct data', () => {
      const unitCost = 10;
      const quantity = 10;

      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);
      WalletMock.calculateTax.mockReturnValueOnce(0);

      WalletSUT.sell(unitCost, quantity);

      expect(WalletMock.calculateSellBalance).toHaveBeenCalledWith(unitCost, quantity);
    });
    it('should call ".updateWalletAfterSell()" at every sell', () => {
      const unitCost = 10;
      const quantity = 10;

      WalletMock.calculateSellBalance.mockReturnValueOnce(0);
      WalletMock.calculateTax.mockReturnValueOnce(0);

      WalletSUT.sell(unitCost, quantity);

      expect(WalletMock.updateWalletAfterSell).toHaveBeenCalled();
    });
    it('should call ".updateWalletAfterSell()" at every sell using correct data', () => {
      const unitCost = 10;
      const quantity = 10;
      const sellBalance = 15;

      WalletMock.calculateSellBalance.mockReturnValueOnce(sellBalance);
      WalletMock.calculateTax.mockReturnValueOnce(0);

      WalletSUT.sell(unitCost, quantity);

      expect(WalletMock.updateWalletAfterSell).toHaveBeenCalledWith(
        quantity,
        sellBalance,
      );
    });
    it('should call ".calculateTax()" at every sell', () => {
      const unitCost = 10;
      const quantity = 10;

      WalletMock.calculateSellBalance.mockReturnValueOnce(0);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletSUT.sell(unitCost, quantity);

      expect(WalletMock.calculateTax).toHaveBeenCalled();
    });
    it('should call ".calculateTax()" at every sell using correct data', () => {
      const unitCost = 10;
      const quantity = 10;
      const operationTotalCost = unitCost * quantity;
      const sellBalance = 15;

      WalletMock.calculateSellBalance.mockReturnValueOnce(sellBalance);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);

      WalletSUT.sell(unitCost, quantity);

      expect(WalletMock.calculateTax).toHaveBeenCalledWith(
        sellBalance,
        operationTotalCost,
      );
    });
    it('should return calculated tax', () => {
      const unitCost = 10;
      const quantity = 10;
      const expectedTax = { tax: 20 };

      WalletMock.calculateSellBalance.mockReturnValueOnce(0);
      WalletMock.updateWalletAfterBuy.mockReturnValueOnce(null);
      WalletMock.calculateTax.mockReturnValueOnce(expectedTax.tax);

      const tax = WalletSUT.sell(unitCost, quantity);

      expect(tax).toEqual(expectedTax);
    });
  });
});
