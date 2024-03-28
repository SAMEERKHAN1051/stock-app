import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiToken, environments } from 'src/environments/environment';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private customHttp: CustomHttpService) {}

  getStock(symbol: any): Observable<any> {
    return this.customHttp.get<any>(`stock/profile2?symbol=${symbol}`);
  }
}
