import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


const USER_API = "http://localhost:8080/api/user/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  getUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(USER_API,{params: params})
  }

  updateProfile(username: string,firstname: string,lastname:string,email:string,country:string,state:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'update',{username,firstname,lastname,email,country,state,address,phone},httpOptions);
  }
  // lien ket back end bang api
  changePassword(username: string, oldPassword: string, newPassword:string, confirmNewPassword:string): Observable<any>{
      return this.http.put(USER_API + 'changePassword',{username, oldPassword,newPassword, confirmNewPassword},httpOptions);
  }

  validatePassword(oldPassword: string, newPassword: string, confirmNewPassword: string): string {
    // Gửi yêu cầu kiểm tra mật khẩu cũ đến backend
    if (oldPassword === newPassword) {
      return "Mật khẩu mới phải khác mật khẩu cũ!"
    } else if (newPassword !== confirmNewPassword) {
      return "Mật khẩu mới không giống nhau!"
    }
    return "OK"
  }

  getListUser():Observable<any>{
    return this.http.get(USER_API + 'all',httpOptions);
  }
  statusUser(id: number){
    return this.http.put(USER_API + 'changeStatus/' + id,httpOptions);
  }
}
