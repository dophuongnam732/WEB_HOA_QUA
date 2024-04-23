import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// @ts-ignore
import { Chart } from 'chart.js';

// @ts-ignore
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// @ts-ignore
import { Color, Label } from 'ng2-charts';

import {faFaceLaughWink, faPhotoFilm, faStore, faTag} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import {faSearch} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faBell} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faReceipt} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faRocket} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faUser} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faBars} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faGear} from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import { Socket } from 'ngx-socket-io';
import {io} from "socket.io-client";

// import { Socket } from 'socket.io-client';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


  private socket: Socket;
  public notificationCount = 0;
  public notifications: string[] = [];
  totalOrders: number | undefined;
  totalAccounts: number | undefined;
  monthlyRevenue: number | undefined;
  postInteractions: number | undefined;

  faceLaugh = faFaceLaughWink;
  search = faSearch;
  store = faStore;
  bell = faBell;
  photo = faPhotoFilm;
  evelope =faEnvelope;
  tachometer = faTachometerAlt;
  bookmark = faBookmark;
  receipt = faReceipt;
  cart= faCartShopping;
  rocket = faRocket;
  userIcon = faUser;
  paperPlane = faPaperPlane;
  bars = faBars;
  gear = faGear;
  logoutIcon = faRightFromBracket;
  tag = faTag;
  selectedMonth: string | undefined;
  months: string[] = ['January', 'February', 'March']; // Thêm các tháng khác vào đây
  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(private storageService:StorageService,private authService:AuthService,private router: Router, config: NgbDropdownConfig){
    config.placement = 'bottom-right';
  }


  faBell = faBell;


  // toggleNotifications() {
  //   this.showNotifications = !this.showNotifications;
  // }
  registeredAccounts: any;
  ngOnInit(): void {
    // this.socket = io('http://localhost:8080'); // Replace with the actual socket server URL

    // Listen for the "orderPlaced" event from the socket server
    // this.socket.on('orderPlaced', (data: any) => {
    //   this.notificationCount++;
    //   this.notifications.push('Có người đặt hàng');
    // });
    const lineChart = new Chart('line-chart', {
      type: this.lineChartType,
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData,
      },
      options: this.lineChartOptions,
      plugins: this.lineChartPlugins,
    });
    this.selectedMonth = 'January'; // Thiết lập tháng ban đầu là January
    this.onMonthChange(); // Gọi hàm onMonthChange để cập nhật dữ liệu ban đầu
    // this.totalOrders = 100;
    // this.totalAccounts = 500;
    // this.monthlyRevenue = 2000;
    // this.postInteractions = 1000;
    // this.socket.on('order-updates', (message: string) => {
    //   this.notifications.unshift(message); // Thêm thông báo mới vào đầu mảng
    //   this.notificationCount++; // Tăng số lượng thông báo
    // });
  }


  logout(){
    this.authService.logout().subscribe({
      next: res =>{
        this.storageService.clean();
        this.router.navigate(['/']);
      }
    })
  }
  showOrder(){
    console.log('showOrder() called');
    this.router.navigate(['order'])
  }
  onMonthChange() {
    // Xử lý sự kiện khi thay đổi tháng
    const data = this.getMonthlyData(this.selectedMonth);

    if (data) {
      this.totalOrders = data.totalOrders;
      this.registeredAccounts = data.registeredAccounts;
      this.monthlyRevenue = data.revenue;
      this.postInteractions = data.postInteractions;
    }
  }

  getMonthlyData(month: string | undefined) {
    // Dữ liệu fix cứng cho các doanh số theo tháng
    const monthlyData = {
      January: {
        totalOrders: "192",
        registeredAccounts: "23",
        revenue: "12,740,000 đ",
        postInteractions: "3000"
      },
      February: {
        totalOrders: "70",
        registeredAccounts: "56",
        revenue: "19,606,000 đ",
        postInteractions: "4500"
      },
      March: {
        totalOrders: "152",
        registeredAccounts: "74",
        revenue: "32,705,000 đ",
        postInteractions: "6000"
      }
      // Thêm các tháng khác vào đây với dữ liệu tương ứng
    };
    // @ts-ignore
    return monthlyData[month];
  }



}
