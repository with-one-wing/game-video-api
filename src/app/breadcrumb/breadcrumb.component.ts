import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterParamService} from '../services/router-param.service';
import {CommonService} from '../services/common.service';
import {combineLatest} from 'rxjs';
import {BreadCrumbItem, Game, RouterParams} from '../interfaces';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {

  private _monthList: Array<string> = [];
  private _gameList: Array<Game> = [];
  private _breadcrumbList: Array<BreadCrumbItem> = [];
  private _routerParams: RouterParams;

  constructor(private routerParamService: RouterParamService,
              private gameService: CommonService
  ) {}

  ngOnInit() {

    this._monthList = this.gameService.getMonthList();

    this.routerParamService.startNavigation().subscribe(() => {
      this._breadcrumbList = [];
    });

    combineLatest(
      this.gameService.getGames(),
      this.routerParamService.getParameters()
    ).subscribe((data) => {
      // console.log('getParameters', data);
      [this._gameList, this._routerParams] = data;
      this.generateMenu();
    });
  }

  private generateMenu() {

    this._breadcrumbList.push({label: 'Main', url: '/'});

    if (this._routerParams.gameId) {
      const gameId: number = +this._routerParams.gameId;
      const game: Game = this.getGameById(gameId);

      const label: string = game.game_name;
      const url: Array<string> = [
        'game', this._routerParams.gameId
      ];
      this._breadcrumbList.push({label, url});
    }

    if (this._routerParams.month) {
      const monthKey: number = +this._routerParams.month - 1;
      const label: string = this._monthList[monthKey];
      const url: Array<string> = [
        'game', this._routerParams.gameId,
        'month', this._routerParams.month
      ];
      this._breadcrumbList.push({label, url});
    }
  }

  getGameById(id: number) {
    return this._gameList.find(gameItem => gameItem.game_id === id);
  }

  get breadcrumbList(): Array<BreadCrumbItem> {
    return this._breadcrumbList;
  }


}
