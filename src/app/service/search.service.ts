import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private customHttp: CustomHttpService) {}
  getSearch(searchText: any): Observable<any> {
    return this.customHttp.get<any>(`search?q=${searchText}`).pipe(
      map((resp: any) => {
        return resp.result.filter((x: any) => x.type == "Common Stock");
      })
    );
  }
}
