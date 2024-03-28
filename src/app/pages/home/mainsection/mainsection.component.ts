import {
  Component,
  OnInit,
} from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service';
import { SearchService } from 'src/app/service/search.service';
import { StockService } from 'src/app/service/stock.service';


@Component({
  selector: 'app-mainsection',
  templateUrl: './mainsection.component.html',
  styleUrls: ['./mainsection.component.scss'],
})
export class MainsectionComponent implements OnInit {
  searchText: string = '';
  stockDetail: any;
  searchList: any[] = [];
  quoteDetail: any;
  closeResult: string = '';

  constructor(
    private searchService: SearchService,
    private stockService: StockService,
    private quateService: QuoteService,
  ) {}

  ngOnInit() {
    this.getstockDetail();
    console.log(this.stockDetail);
  }

  getstockDetail(): any {
    return this.searchService
      .getSearch(this.searchText)
      .subscribe((data: any) => {
        this.searchList = data;
        console.log(this.searchList);
      });
  }

  onSelectStock() {
    console.log('onSelectStock');
    this.stockDetail = [];
    this.getStockDetail();
    this.getQuote();
  }

  getStockDetail(): any {
    return this.stockService
      .getStock(this.searchText)
      .subscribe((data: any) => {
        this.stockDetail = data;
        console.log(this.stockDetail);
      });
  }

  getQuote(): any {
    return this.quateService
      .getQuote(this.searchText)
      .subscribe((data: any) => {
        this.quoteDetail = data;
        console.log(this.quoteDetail);
      });
  }
  model(){
    document.getElementById("modal")
  }
}
