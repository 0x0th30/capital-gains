import { Wallet } from '@entities/wallet';

export const WalletMock = {
  updateEmptyWallet: jest.spyOn((Wallet as any).prototype, 'updateEmptyWallet'),
  updateWalletAfterBuy: jest.spyOn((Wallet as any).prototype, 'updateWalletAfterBuy'),
  buy: jest.spyOn(Wallet.prototype, 'buy'),
  sell: jest.spyOn(Wallet.prototype, 'sell'),
  calculateSellBalance: jest.spyOn((Wallet as any).prototype, 'calculateSellBalance'),
  updateWalletAfterSell: jest.spyOn((Wallet as any).prototype, 'updateWalletAfterSell'),
  calculateTax: jest.spyOn((Wallet as any).prototype, 'calculateTax'),
};
