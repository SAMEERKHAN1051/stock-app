import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service';
import { SearchService } from 'src/app/service/search.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private stockService: StockService,
    private searchService: SearchService,
    private quateService: QuoteService
  ) {}

  ngOnInit() {
  }
 
}
