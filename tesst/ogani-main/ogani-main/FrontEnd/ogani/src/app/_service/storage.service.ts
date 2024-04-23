import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean():void{
    window.sessionStorage.clear();
  }


  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  // isAdminPermission(): boolean{
  //   const userString = window.sessionStorage.getItem(USER_KEY);
  //   const user = JSON.parse(userString);
  //   for(let i = 0; i < user.roles.length; i++){
  //     if(user[i] === 'ROLE_ADMIN') {
  //       return true
  //     }
  //   }

  //   return false;
  // }
}
