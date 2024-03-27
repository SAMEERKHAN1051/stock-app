import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.getStock();
  }
  getStock(): any {
    this.stockService.getStock().subscribe((response: any) => {
      console.log(response);
    });
  }
}
