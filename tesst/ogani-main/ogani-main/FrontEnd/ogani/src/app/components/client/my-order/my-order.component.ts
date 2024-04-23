import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';
import {MessageService} from "primeng/api";
import {CartService} from "../../../_service/cart.service";
import {text} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderDetails: any[] | undefined;
  listOrder:any;
  displayForm: boolean = false;
  username: any;
  cancelDisabled = false;
  statusCount = 0;
  id: any
  private _value: any;

  constructor(private orderService: OrderService,private storageService: StorageService, private messageService:MessageService, public cartService: CartService){

  }
  getOrderDetails(id: any) {
    this.orderService.getOrderDetails(id).subscribe((data: any) => {
      this.orderDetails = data;
      console.log(this.orderDetails)
    });
  }
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getListOrder();

  }
  showForm(order: any){
    this.displayForm = true;
    this.getOrderDetails(order.id)
  }
  getListOrder(){
    this.orderService.getListOrderByUser(this.username).subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }
  handleCancel(orderId: number, orderStatus: number) {
    if (orderStatus === 0) {
      this.cancelDisabled = true;
    } else {
    }
  }
  filterGlobal(value: any, contains: string) {
    this._value = value;

  }
  destroy(id : number, status: number){
    this.statusCount++
    if(this.statusCount >= 3){
      this.showError("Chỉ cho phép hủy đơn 1 lần !")
      return
    }
    this.orderService.destroyOrder(id).subscribe({
      next: res=>{
        this.getListOrder()
        if(status !== 0){
          this.showSuccess("Hủy đơn thành công !")
        } else {
          this.showSuccess("Đặt lại đơn thành công !")

        }
        console.log(res)
      }, error: err => {
        console.log(err);

      }
    })
  }
  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError(text: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: text});
  }



}
