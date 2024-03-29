import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private customHttp: CustomHttpService) {}

  getChart(searchText: any): any {
    return this.customHttp.getchart(
      `ticker/${searchText}/range/1/day/2023-01-09/2023-07-09?adjusted=true&sort=asc`
    );
  }
}
