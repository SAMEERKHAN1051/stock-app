import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(private customHttp: CustomHttpService) {}

  getQuote(symbol:any):any{
    return this.customHttp.get(`quote?symbol=${symbol}`)
  }

}
