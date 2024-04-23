import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class VnpayService{

  constructor(private http: HttpClient, private router: Router) {

  }

  getPayment(price: number, orderId: number): Observable<string>{
    let params = new HttpParams().set('price', price.toString()).set('orderId', orderId.toString());
    return this.http.get(('http://localhost:8080/api/v1/pay'), {params, responseType: 'text'});

  }
  getPaymentService(price: number , id: number): Observable<any>{
    let params = new HttpParams().set('price', price.toString()).set('registerServiceId', id.toString());
    return this.http.get(('http://localhost:8080/api/v1/pay-service'),{params, responseType: 'text'});
  }
}
