import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://your-backend-url'; // Thay thế bằng URL của backend của bạn

  constructor(private http: HttpClient) { }

  createPayment(price: number) {
    const url = `${this.baseUrl}/pay`;
    const body = { price };

    return this.http.post(url, body);
  }

  executePayment(paymentId: string, payerId: string) {
    const url = `${this.baseUrl}/pay/success?paymentId=${paymentId}&PayerID=${payerId}`;

    return this.http.get(url);
  }
}
