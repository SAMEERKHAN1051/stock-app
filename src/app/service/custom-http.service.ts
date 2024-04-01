import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { apiToken, environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpService {
  baseUrl = environments.baseUrl;
  polyBaseUrl = environments.polyBaseUrl;

  constructor(private http: HttpClient) {}

  private handleErrors(error: HttpErrorResponse) {
    // Check if it's an unauthorized error (401 or 403 status code)
    if (error.status === 401 || error.status === 403) {
      console.log('You Have Got Error');
    }
    return throwError(error);
  }

  get<T>(url: string) {
    let token = apiToken.token;
    return this.http
      .get<T>(`${this.baseUrl}${url}&token=${token}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleErrors(error)));
  }
  getApi<T>(url: string) {
    return this.http
      .get<T>(url)
      .pipe(catchError((error: HttpErrorResponse) => this.handleErrors(error)));
  }

  postApi<T>(url: string, body: any) {
    return this.http
      .post<T>(url, body)
      .pipe(catchError((error: HttpErrorResponse) => this.handleErrors(error)));
  }

  getchart<T>(url: string) {
    let token = apiToken.polyToken;
    return this.http
      .get<T>(`${this.polyBaseUrl}${url}&apiKey=${token}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleErrors(error)));
  }
}
