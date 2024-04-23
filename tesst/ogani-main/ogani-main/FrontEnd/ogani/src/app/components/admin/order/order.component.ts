import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service'
import { MessageService } from 'primeng/api';
import {CartService} from "../../../_service/cart.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {

  listOrder : any;
  status: number = 1;

  constructor(private orderService: OrderService, private messageService:MessageService, public cartService: CartService){

  }

  ngOnInit(): void {
    this.getListOrder();
    this.cartService.getItems();

  }
  orderDetails: any[] | undefined;
  order = {
    orderDetails: [
      { name: 'Product 1' },
      { name: 'Product 2' },
      { name: 'Product 3' }
    ]
  };
  getListOrder(){
    this.orderService.getListOrder().subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }
  changeStatus(id: number, status: number): void {
    if (status === 0) {
      return;
    }

    this.orderService.changeStatusOrder(id).subscribe({
      next: res => {
        this.getListOrder();

        // Sửa giá trị "status" sau khi cập nhật thành công
        if (status === 1) {
          this.status = 2; // Thay đổi giá trị "status" thành 2
          this.showSuccess("Xác nhận đơn thành công !");
        } else if (status === 2) {
          this.status = 3; // Thay đổi giá trị "status" thành 3
          this.showSuccess("Đóng hàng xong !");
        } else if (status === 3) {
          this.status = 4; // Thay đổi giá trị "status" thành 4
          this.showSuccess("Giao hàng thành công !");
        }

        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Đợi xác nhận đơn hàng';
      case 2:
        return 'Xác nhận đơn than công';
      case 3:
        return 'Đang đóng hàng';
      case 4:
        return 'Đang giao hàng';
      case 5:
        return 'Giao hàng thành công';
      default:
        return 'Đơn bị hủy';
    }
  }
  displayModal = false;
  selectedProductName = '';
  userIcon: any;
  displayForm: boolean = false;


  getOrderDetails(id: any) {
    this.orderService.getOrderDetails(id).subscribe((data: any) => {
      this.orderDetails = data;
      console.log(this.orderDetails)
    });
  }
  showForm(order: any){
    this.displayForm = true;
    this.getOrderDetails(order.id)
  }
  showModal() {
    this.displayModal = true;
  }

  showProductForm() {

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

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  canPressButton(status: number): boolean {
    // Thực hiện logic để xác định xem nút có thể được nhấn hay không, dựa trên giá trị "status"
    // Trả về true nếu nút có thể được nhấn, false nếu nút không thể được nhấn
    return status !== 1 && status !== 2 && status !==3 && status !==4 ; // Ví dụ: Nút sẽ không thể nhấn nếu status là 1
  }
}
