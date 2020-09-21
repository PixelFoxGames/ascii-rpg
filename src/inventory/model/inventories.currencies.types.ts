export class Currency {
  max?: number = 0;
  current?: number = 0;
}

export class CurrencyInventory {
  private readonly _gold?: Currency = new Currency();

  constructor(currencies?: CurrencyInventory) {
    this._gold = currencies ? currencies._gold : new Currency();
  }

  get gold() {
    return this._gold.current;
  }

  set gold(value: number) {
    this._gold.current = value;
  }
}
