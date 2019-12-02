import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class RouterParamService {

  constructor(
    private readonly router: Router,
    private readonly rootRoute: ActivatedRoute,
  ) {}

  public startNavigation() {
    return this.router.events.pipe(
      filter(e => e instanceof NavigationStart)
    );
  }

  public getParameters(): Observable<{[key: string]: string}> {
    return this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.collectParams(this.rootRoute))
    );
  }

  private collectParams(route: ActivatedRoute) {
    let params = route.snapshot.params;
    params = { ...route.snapshot.queryParams, ...params};
    if (route.children) {
      for (const r of route.children) {
        params = {...this.collectParams(r), ...params};
      }
    }
    return params;
  }

}
