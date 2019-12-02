import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameListComponent} from './game-list/game-list.component';
import {MonthListComponent} from './month-list/month-list.component';
import {VideoSliderComponent} from './video-slider/video-slider.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {
    path: '',
    component: GameListComponent,
  },
  {
    path: 'game/:gameId',
    component: MonthListComponent,
  },
  {
    path: ':game/:gameId/month/:month',
    component: VideoSliderComponent,
    outlet: 'primary'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]})
export class AppRoutingModule { }
