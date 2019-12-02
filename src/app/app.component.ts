import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Service';

  constructor(private gameService: CommonService) {}

  ngOnInit() {
    this.gameService.loadGames();
  }
}
