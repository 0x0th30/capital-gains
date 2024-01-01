declare global {
  type Operation = {
    operation: 'buy' | 'sell',
    'unit-cost': number,
    quantity: number,
  }

  type Tax = { tax: number }
}

export {};
