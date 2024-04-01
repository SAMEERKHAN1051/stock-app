export class BarChartData {
  name: string;
  data: number[];
  stack: string;

  constructor(name: string, data: number[], stack: string) {
    this.name = name;
    this.data = data;
    this.stack = stack;
  }
}

export interface chartApiModel {
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number,
  symbol: string;
}
