import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 
  constructor(private http: HttpClient) { }
  private  apiURL="http://localhost:3000/employees";

  getEmployees():Observable<any>
  {
    return this.http.get<any>(this.apiURL).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse) {
  // Your error handling logic
  return throwError('Something went wrong');
}
}
