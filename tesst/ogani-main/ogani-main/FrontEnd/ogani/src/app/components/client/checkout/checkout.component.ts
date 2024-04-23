import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_class/order';
import { OrderDetail } from 'src/app/_class/order-detail';

import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// @ts-ignore
// import { Socket } from 'ngx-socket-io';
import { Socket } from 'ngx-socket-io';
import {io} from "socket.io-client";
// import {VnpayService} from "../../../_service/vnpay.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {VnpayService} from "../../../_service/vnpay.service";
import {HttpClient} from "@angular/common/http";
import * as http from "http";




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]

})
export class CheckoutComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] =[];
  username !: string;
  isFirstNameInvalid: boolean = false
  isLastNameInvalid: boolean = false;
  // isCountryInvalid: boolean = false;
  isAddressInvalid: boolean = false;
  isTownInvalid: boolean = false;
  isPhoneInvalid : boolean = false;
  isEmailInvalid: boolean = false
  private socket: Socket;



  orderForm :any ={
    firstname: null,
    lastname : null,
    // country : null,
    addrest : null,
    town : null,
    state : null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }
  private Swal: any;
  private price: number | undefined;
  private id: number | undefined;

  constructor(public cartService: CartService,private orderService:OrderService,private storageService: StorageService, private router:Router, private messageService:MessageService,
              private formBuilder: FormBuilder, public vnpayService:VnpayService){
  }
   // user = this.storageService.getUser();
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.cartService.getItems();
    console.log(this.username);
    this.orderForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      note: ['']
    });
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  placeOrder() {
    const {firstname, lastname, country, address, town, state, postCode, phone, email, note, paymentStatus } = this.orderForm;
    this.isFirstNameInvalid = !firstname;
    this.isLastNameInvalid = !lastname;
    this.isAddressInvalid = !address;
    this.isTownInvalid = !town;
    this.isPhoneInvalid = !phone;

    if (firstname && lastname && address && town && phone) {
      this.cartService.items.forEach(res => {
        let orderDetail: OrderDetail = new OrderDetail();
        orderDetail.name = res.name;
        orderDetail.price = res.price;
        orderDetail.quantity = res.quantity;
        orderDetail.subTotal = res.subTotal;
        this.listOrderDetail.push(orderDetail);
      });

      const cashElement = document.getElementById('cash') as HTMLInputElement;
      const vnpayElement = document.getElementById('vnpay') as HTMLInputElement;

      if (cashElement && cashElement.checked) {
        const cashLabel = cashElement.parentElement;
        const cashLabelText = cashLabel && cashLabel.textContent ? cashLabel.textContent.trim() : null;

        if (cashLabelText === 'Thanh toán khi nhận hàng') {
          this.orderForm.paymentStatus = 'Thanh toán khi nhận hàng';
        } else {
          this.orderForm.paymentStatus = cashLabelText;
        }

        this.processOrder('cash');
      } else if (vnpayElement && vnpayElement.checked) {
        const vnpayLabel = vnpayElement.parentElement;
        const vnpayLabelText = vnpayLabel && vnpayLabel.textContent ? vnpayLabel.textContent.trim() : null;

        if (vnpayLabelText === 'Thanh toán trực tuyến VNPAY') {
          this.orderForm.paymentStatus = 'Thanh toán Online';
        } else {
          this.orderForm.paymentStatus = vnpayLabelText;
        }

        this.processOrder('vnpay');
      }
    }
  }

  processOrder(paymentMethod: string) {
    const { paymentStatus, firstname, lastname, address, town, state, postCode, phone, email, note } = this.orderForm;
    this.orderService.placeOrder(paymentStatus, firstname, lastname, address, town, state, postCode, phone, email, note, this.listOrderDetail, this.username).subscribe({
      next: res => {
        if (paymentMethod === 'cash') {
          this.handleCashPayment(res);
        } else if (paymentMethod === 'vnpay') {
          this.handleVNPAYPayment(res);
        }
      },
      error: err => {
        console.log(err);
        this.showSuccess(err.error.message);
      }
    });
  }

  handleCashPayment(order: any) {
    this.showSuccess("Đặt hàng thành công!");
    this.cartService.clearCart();
    setTimeout(() => {
      this.router.navigate(['/my-order']);
    }, 1500);
  }

  handleVNPAYPayment(order: any) {
    let total: number = 0;
    this.cartService.items.forEach(res => {
      total += res.subTotal;
    });

    this.vnpayService.getPayment(total, order).subscribe({
      next: res => {
        window.location.href = res;
        // this.cartService.clearCart();
        // this.showSuccess("Thanh toán thành công!");
      },
      error: err => {
        console.log(err);
        this.showSuccess(err.error.message);
      }
    });
  }
  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success',detail: text});
  }

}
