import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiToken, environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  baseUrl = environments.baseUrl;
  token = apiToken.token;

  constructor(private http: HttpClient) {}

  getStock(): Observable<any> {
    return this.http.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&q=cn3tp81r01qtsta45bp0cn3tp81r01qtsta45bpg`
      // `${this.baseUrl}stock/profile2?symbol=AAPL&token=${this.token}`
    );
  }
}
