import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { GameListComponent } from './game-list/game-list.component';
import { VideoSliderComponent } from './video-slider/video-slider.component';
import {CommonService} from './services/common.service';
import { MonthListComponent } from './month-list/month-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {RouterParamService} from './services/router-param.service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {CarouselModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FavouriteListComponent,
    GameListComponent,
    VideoSliderComponent,
    MonthListComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule
  ],
  providers: [CommonService, RouterParamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
