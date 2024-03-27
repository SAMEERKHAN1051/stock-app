import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent{
  options: string[] = ['React', 'Angular', 'Vue'];
  // constructor(private stockService: StockService) {}


}
