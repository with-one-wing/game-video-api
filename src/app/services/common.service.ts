import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Game} from '../interfaces';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _games: Observable<Array<Game>>;

  constructor(private apiService: HttpClient) {}

  loadGames() {
   this._games = this.apiService.get<Array<Game>>(`${environment.apiUrl}status/statuses.json`);
  }

  getMonthList(): Array<string> {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  getRange(n: number): Array<string> {
    return Array.from(Array(n), (val, i) => ('' + (i + 1)).padStart(2, '0'));
  }

  getGames(): Observable<Array<Game>> {
    return this._games;
  }

  getVideoUrl(gameId: string, month: string, index: string) {
    return `${environment.apiUrl}${gameId}/${month}/${index}.${environment.videoExt}`;
  }

  getVideos(gameId, month) {
    return this.getRange(environment.videoCountPerFolder).map(
      index =>
        this.apiService.head(
          this.getVideoUrl(gameId, month, index)
        ).toPromise()
    );
  }

  getIsVideosAvailablePromise(gameId, month: string): any {
    const cancelReq: Subject<boolean> = new Subject<boolean>();

    const promises = this.getRange(environment.videoCountPerFolder).map(
      index =>
        this.apiService.head(
          this.getVideoUrl(gameId, month, index)
        ).pipe(
          takeUntil(cancelReq)
        ).toPromise()
    );

    let numberOfNotFoundVideos = 0;

    return new Promise(
      (resolve, reject) =>
        promises.forEach(
          (promise, index) => {
              promise.then(() => {
                  resolve();
                  cancelReq.next(true);
                }
              ).catch(
              () => {
                console.log(`Not found video with index #${index} at month folder ${month}`);
                if (++numberOfNotFoundVideos === promises.length) {
                  reject();
                }
              }
            );
          }
        )
    );
  }
}
