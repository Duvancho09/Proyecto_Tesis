import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { identifier: string; password_hash: string }): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  updateUser(id: number, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
