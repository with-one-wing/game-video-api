import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service';
import {Game} from '../interfaces';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private _gameList = [];

  private _loadedData = false;

  constructor(private gameService: CommonService) { }

  ngOnInit() {
    this.gameService.getGames().subscribe(data => {
      this._gameList = data.filter(game => !game.disabled);
      this._loadedData = true;
    });
  }

  get gameList(): Array<Game> {
    return this._gameList;
  }

  get loadedData(): boolean {
    return this._loadedData;
  }

}
