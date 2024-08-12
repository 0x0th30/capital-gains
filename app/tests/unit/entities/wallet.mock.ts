import { Wallet } from '@entities/wallet';

export const WalletMock = {
  buy: jest.spyOn(Wallet.prototype, 'buy'),
  sell: jest.spyOn(Wallet.prototype, 'sell'),
  isAccountBlocked: jest.spyOn((Wallet as any).prototype, 'isAccountBlocked'),
  updateEmptyWallet: jest.spyOn((Wallet as any).prototype, 'updateEmptyWallet'),
  updateWalletAfterBuy: jest.spyOn((Wallet as any).prototype, 'updateWalletAfterBuy'),
  calculateSellBalance: jest.spyOn((Wallet as any).prototype, 'calculateSellBalance'),
  updateWalletAfterSell: jest.spyOn((Wallet as any).prototype, 'updateWalletAfterSell'),
  hasWalletSufficientStocksToSell: jest
    .spyOn((Wallet as any).prototype, 'hasWalletSufficientStocksToSell'),
  calculateTax: jest.spyOn((Wallet as any).prototype, 'calculateTax'),
};
