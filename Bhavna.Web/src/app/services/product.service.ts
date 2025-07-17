import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Product } from '../models/product';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private readonly baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

 getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.baseUrl + 'getproducts', {
    observe: 'response' // Get full response
  }).pipe(
    tap(response => console.log('Full response:', response)),
    map(response => response.body || []), // Handle possible null body
    //catchError(this.handleError)
  );
}
  handleError(handleError: any): import("rxjs").OperatorFunction<Product[], any> {
    throw new Error('Method not implemented.');
  }
}
