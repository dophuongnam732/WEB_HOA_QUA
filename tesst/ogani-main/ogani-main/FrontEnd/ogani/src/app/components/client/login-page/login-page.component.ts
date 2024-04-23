import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]

})
export class LoginPageComponent implements OnInit {

  ForgotForm: any = {
    email: null
  }
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null

  }
  isUsernameInvalid: boolean = false;
  isPasswordInvalid: boolean = false;
  isEmailInvalid: boolean = false;
  showPassword: any;
  email: any;
  displayForm: boolean = false;
  onUpdate : boolean = false;

  constructor(private authService:AuthService,private storageService: StorageService,private messageService:MessageService,private router:Router, private toastr: ToastrService ){}

  ngOnInit(): void {
  }
  login(): void {
    const { username, password } = this.loginForm;
    console.log(this.loginForm);
    this.isUsernameInvalid = !username;
    this.isPasswordInvalid = !password;
    if (username && password) {
      this.authService.login(username, password).subscribe({
        next: res => {
          this.storageService.saveUser(res);
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.roles = this.storageService.getUser().roles
          this.showSuccess('Đăng nhập thành công !');
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 1500)
           localStorage.setItem("username", this.storageService.getUser().username)
        },
        error: err => {
          if (err.status === 400 && err.error.message === "Tài khoản chưa được mở !") {
            this.showError(err.error.message);
            // Xử lý thêm nếu cần thiết
          } else {
            this.showError("Tài khoản hoặc mật khẩu không chính xác !");
          }
          this.isLoggedIn = false;
          this.isLoginFailed = true;
        }
      });
    }
  }
  sendForgotPasswordRequest() {
    const {email} = this.ForgotForm;
    // Gửi yêu cầu quên mật khẩu
    console.log('Email:', this.email);  // In ra email để kiểm tra
    if(email) {
      this.authService.forgotPassword(email).subscribe({
        next: res => {
          this.ForgotForm.email = email;
          this.showSuccess("Gửi thành công !")
          this.showSuccess("Vui lòng vào email để lấy mật khẩu !")
          this.displayForm = false;
        }, error: err => {
          this.showError(err.error.message);
          this.errorMessage = err.error.message;
        }
      })
    }
    this.displayForm = false;
  }
  register(): void {
    const { username, email, password, confirmPassword } = this.registerForm;
    console.log(this.registerForm);
    this.isUsernameInvalid = !username;
    this.isPasswordInvalid = !password;
    this.isEmailInvalid = !email;

    if (email && password && username && password === confirmPassword) {
      this.authService.register(username, email, password).subscribe({
        next: res => {
          console.log(res);
          this.showSuccess('Đăng ký thành công');
          this.showSuccess('Vui lòng vào email vừa đăng ký để kích hoạt tài khoản!');
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.loginForm.username = username;
          this.loginForm.password = password;
          // this.login();
        },
        error: err => {
          // this.showError(err.message);
          this.showError(err.error.message);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    } else {
      this.isSignUpFailed = true;
      this.errorMessage = "Vui lòng kiểm tra lại thông tin đăng ký và xác nhận mật khẩu.";
    }
  }

  loginFormChange(){


    document.getElementById('container')?.classList.remove("right-panel-active");
  }
  registerFormChange(){

    document.getElementById('container')?.classList.add("right-panel-active");
  }


  showSuccess(message: string) {
    this.toastr.success(message, '', {
      toastClass: 'custom-toast-success'
    });
  }

  showWarning(message: string) {
    this.toastr.warning(message, '', {
      toastClass: 'custom-toast-warning'
    });
  }

  showError(message: string) {
    this.toastr.error(message, '');
  }


  showForm(){
    this.ForgotForm ={
      email : null
    }
    this.displayForm = true;
  }
}
