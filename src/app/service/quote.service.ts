import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private customHttp: CustomHttpService) {}

  getQuote(symbol: any): any {
    return this.customHttp.get(`quote?symbol=${symbol}`);
  }

  getNews(symbol: any): any {
    return this.customHttp.get(
      `company-news?symbol=${symbol}&from=2024-03-28&to=2024-03-29`
    );
  }
}
