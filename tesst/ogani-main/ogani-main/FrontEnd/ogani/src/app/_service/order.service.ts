import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_class/order';
import { OrderDetail } from '../_class/order-detail';

const ORDER_API = "http://localhost:8080/api/order/";
const ORDER_API2 = "http://localhost:8080/api/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }


  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }

  getOrderDetails(id: number):Observable<any>{
    return this.http.get(ORDER_API2 + 'orderDetailByOrder/'+ id , httpOptions)
  }


  placeOrder(paymentStatus: string, firstname: string,lastname:string, address: string,town: string,state:string,postCode: string,phone:string,email:string,note:string,orderDetails: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'create',{paymentStatus, firstname,lastname, address,town,state,postCode,phone,email,note,orderDetails,username},httpOptions);
  }
  changeStatusOrder(id: number):Observable<any>{
    return this.http.post(ORDER_API+ "changeStatus/" + id, httpOptions );
  }
  destroyOrder(id: number):Observable<any>{
    return this.http.post(ORDER_API+ "destroyOrder/" + id, httpOptions );
  }

  sendOrderNotification(đãNhậnĐơnHàngMới: string) {

  }
}
