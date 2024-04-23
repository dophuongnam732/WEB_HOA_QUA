import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { ProductComponent } from './components/admin/product/product.component';
import { OrderComponent } from './components/admin/order/order.component';
import { BlogComponent } from './components/admin/blog/blog.component';
import { AccountComponent } from './components/admin/account/account.component';

import { IndexComponent } from './components/client/index/index.component';
// @ts-ignore
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// @ts-ignore
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import {CardModule} from 'primeng/card';
// @ts-ignore
import {DialogModule} from 'primeng/dialog';
// @ts-ignore
import {ToastModule} from 'primeng/toast';
// @ts-ignore
import {ButtonModule} from 'primeng/button';
// @ts-ignore
import {TableModule} from 'primeng/table';
// @ts-ignore
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// @ts-ignore
import {ToolbarModule} from 'primeng/toolbar';
// @ts-ignore
import {FileUploadModule} from 'primeng/fileupload';
// @ts-ignore
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// @ts-ignore
import {InputTextareaModule} from 'primeng/inputtextarea';
// @ts-ignore
import {InputTextModule} from 'primeng/inputtext';
// @ts-ignore
import {RadioButtonModule} from 'primeng/radiobutton';
// @ts-ignore
import {DividerModule} from 'primeng/divider';
// @ts-ignore
import {CarouselModule} from 'primeng/carousel';
import { HomeComponent } from './components/client/home/home.component';
// @ts-ignore
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ShopComponent } from './components/client/shop/shop.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
// @ts-ignore
import {TabViewModule} from 'primeng/tabview';
// @ts-ignore
import {PasswordModule} from 'primeng/password';
// @ts-ignore
import {SliderModule} from 'primeng/slider';
// @ts-ignore
import {DataViewModule} from 'primeng/dataview';
import { TagComponent } from './components/admin/tag/tag.component';
// @ts-ignore
import {MultiSelectModule} from 'primeng/multiselect';
import { BlogClientComponent } from './components/client/blog-client/blog-client.component';
import { BlogDetailComponent } from './components/client/blog-detail/blog-detail.component';
import { UserDetailComponent } from './components/client/user-detail/user-detail.component';
import { MyOrderComponent } from './components/client/my-order/my-order.component';
import { SearchComponent } from './components/client/search/search.component';
import { LoginPageComponent } from './components/client/login-page/login-page.component';
import {UserComponent} from "./components/admin/user/user.component";
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
import { ToastrModule } from 'ngx-toastr';
import {PaginatorModule} from "primeng/paginator";







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    OrderComponent,
    BlogComponent,
    AccountComponent,
    IndexComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    ProductDetailComponent,
    TagComponent,
    UserComponent,
    BlogClientComponent,
    BlogDetailComponent,
    UserDetailComponent,
    MyOrderComponent,
    SearchComponent,
    LoginPageComponent,

    // ContactModalComponent,
    // ContactModalContentComponent,



  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        NgbModule,
        CardModule,
        DialogModule,
        ToastModule,
        ButtonModule,
        TableModule,
        InputNumberModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToolbarModule,
        FileUploadModule,
        ConfirmDialogModule,
        InputTextareaModule,
        InputTextModule,
        RadioButtonModule,
        DividerModule,
        CarouselModule,
        OverlayPanelModule,
        TabViewModule,
        PasswordModule,
        SliderModule,
        DataViewModule,
        MultiSelectModule,
        ToastrModule.forRoot(),
        PaginatorModule,
        PaginatorModule
        // SocketIoModule.forRoot({ url: 'http://localhost:8080', options: {} })
        // SocketIoModule.forRoot(config)

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
