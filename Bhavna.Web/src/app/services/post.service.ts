import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getPosts(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts');
    console.log('Fetching posts from API');
  }
}
