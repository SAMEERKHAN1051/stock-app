import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environments.apiUrl;
  constructor(private customHttp: CustomHttpService) {}

  getWallet(): Observable<any> {
    return this.customHttp.getApi<any>(`${this.apiUrl}/api/wallets`);
  }

  getPortfolio(): Observable<any> {
    return this.customHttp.getApi<any>(`${this.apiUrl}/api/portfolio`);
  }

  buySellStock(body: any): Observable<any> {
    return this.customHttp.postApi<any>(`${this.apiUrl}/api/portfolio`, body);
  }

  getWishlist(): Observable<any> {
    return this.customHttp.getApi<any>(`${this.apiUrl}/api/wishlist`);
  }
}
