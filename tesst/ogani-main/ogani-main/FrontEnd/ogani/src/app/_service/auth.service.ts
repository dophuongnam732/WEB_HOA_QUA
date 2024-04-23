import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:8080/api/auth/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(username: string, email: string, password: string):Observable<any>{
    return this.http.post(AUTH_API + 'register',{username,email,password},httpOptions);
  }

  login(username: string,password: string):Observable<any>{
    return this.http.post(AUTH_API+ "login",{username,password},httpOptions);
  }

  forgotPassword(email: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', email)
    return this.http.get(AUTH_API + 'forgotPassword', { params: params });
  }

  logout():Observable<any>{
    return this.http.post(AUTH_API + "logout",{},httpOptions);
  }

  isAdmin(): boolean {
    const user = sessionStorage.getItem('auth-user');
    if (user) {
      const roles = JSON.parse(user).roles;
      return roles.includes('ROLE_ADMIN');
    }
    return false;
  }
}
