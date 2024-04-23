import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";

import {UserService} from 'src/app/_service/user.service';
@Component({
  selector: 'app-tag',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    this.getList();
  }

  constructor(private userService: UserService ,private messageService:MessageService){

  }
  listUser: any

  statusUser(id : number){
    this.userService.statusUser(id).subscribe({
      next: res =>{
        this.getList();
        this.showSuccess("Cập nhật thành công !");

      },error: err=>{
        this.showError(err.message);
      }
    })
  }

  getList(){
    this.userService.getListUser().subscribe({
      next : res =>{
        this.listUser = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
