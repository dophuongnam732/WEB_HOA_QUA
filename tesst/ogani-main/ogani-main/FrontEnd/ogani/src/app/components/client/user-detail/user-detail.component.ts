import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import {MessageService} from "primeng/api";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username: any;
  user :any;

  changePassword : boolean = false;

  updateForm: any ={
    firstname: null,
    lastname: null,
    email: null,
    country: null,
    state:null,
    address: null,
    phone: null
  }
  changePasswordForm: any = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword:null
}
  isOldPasswordValid: boolean = true;
  isNewPasswordValid: boolean = true;
  isConfirmPasswordValid: boolean = true;



  constructor(private storageService: StorageService,private userService: UserService, private messageService: MessageService,  private formBuilder: FormBuilder){}

  validateOldPassword() {
    const oldPassword = this.changePasswordForm.oldPassword;
    if (oldPassword.length >= 6 && oldPassword.length <= 15 && oldPassword.trim() !== '') {
      this.isOldPasswordValid = true;
    } else {
      this.isOldPasswordValid = false;
    }}
  validateNewPassword() {
    const newPassword = this.changePasswordForm.newPassword;
    if (newPassword.length >= 6 && newPassword.length <= 15 && newPassword.trim() !== '') {
      this.isNewPasswordValid = true;
    } else {
      this.isNewPasswordValid = false;
    }}
  validateConfirmPassword() {
    const confirmPassword = this.changePasswordForm.confirmNewPassword;
    if (confirmPassword.length >= 6 && confirmPassword.length <= 15 && confirmPassword.trim() !== '') {
      this.isConfirmPasswordValid = true;
    } else {
      this.isConfirmPasswordValid = false;
    }}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getUser();
    this.updateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getUser(){
    this.userService.getUser(this.username).subscribe({
      next: res=>{
        this.user = res;
        this.updateForm.firstname = res.firstname;
        this.updateForm.lastname = res.lastname;
        this.updateForm.email = res.email;
        this.updateForm.country = res.country;
        this.updateForm.state = res.state;
        this.updateForm.address = res.address;
        this.updateForm.phone = res.phone;
      },error : err =>{
        console.log(err);
      }
    })
  }

  updateProfile(){
    const{firstname,lastname,email,country,state,address,phone} = this.updateForm;
    this.userService.updateProfile(this.username,firstname,lastname,email,country,state,address,phone).subscribe({
      next: res =>{
        this.getUser();
        this.showSuccess("Cập nhật thành công !")
      },error: err=>{
        console.log(err);

      }
    })
  }


  showChangePassword(){
    this.changePassword =true;
  }
  changePasswordFunc() {
    const { oldPassword, newPassword, confirmNewPassword } = this.changePasswordForm;
    const valid: string = this.userService.validatePassword(oldPassword, newPassword, confirmNewPassword)
          // Mật khẩu cũ hợp lệ, tiếp tục thay đổi mật khẩu
         if(valid === 'OK'){
           this.userService.changePassword(this.username, oldPassword, newPassword, confirmNewPassword).subscribe({
             next: res => {
               console.log(res)
               this.getUser();
               this.storageService.getUser().password
               this.showSuccess("Thay đổi mật khẩu thành công!")
               this.changePassword = false;
             }, error: err => {
                 this.showError(err.error.message)
             }
           });
         } else {
           this.showError(valid)
         }
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
