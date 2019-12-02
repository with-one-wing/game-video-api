import { Component, OnInit } from '@angular/core';
import {race} from 'rxjs';
import {CommonService} from '../services/common.service';
import {Month} from '../interfaces';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-month-list',
  templateUrl: './month-list.component.html',
  styleUrls: ['./month-list.component.css']
})
export class MonthListComponent implements OnInit {

  private _loadedData = false;

  constructor(
    private gameService: CommonService,
    private route: ActivatedRoute
  ) {}

  private _monthListWithGames: Array<Month> = [];

  ngOnInit() {
    this.filterMonths();
  }

  async filterMonths() {
    const monthList = this.gameService.getMonthList();
    for (const monthNum in monthList) {
      const key: string = ('' + (+monthNum + 1)).padStart(2, '0');
      const name: string = monthList[monthNum];
      const {gameId} = this.route.snapshot.params;
      try {
        await this.gameService.getIsVideosAvailablePromise(gameId, key);
        this._monthListWithGames.push({key, name});
      } catch (e) {
        console.log(`No videos found at month ${monthNum}`);
      }
    }
    this._loadedData = true;
  }

  get monthListWithGames(): Array<Month> {
    return this._monthListWithGames;
  }

  get loadedData(): boolean {
    return this._loadedData;
  }

}
