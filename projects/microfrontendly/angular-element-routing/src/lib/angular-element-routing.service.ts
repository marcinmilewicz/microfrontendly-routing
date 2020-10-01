import { Inject, Injectable, InjectionToken } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { RouteChangedEvent } from './angular-element-routing.model';

export const MICRO_APP_NAME = new InjectionToken<string>('microAppName');
export const ROUTE_CHANGE_EVENT_NAME = new InjectionToken<string>('routeChangeEventName');

@Injectable()
export class AngularElementRoutingService {
  private routeChange$: Observable<any>;

  constructor(
    @Inject(MICRO_APP_NAME) private microApp,
    @Inject(ROUTE_CHANGE_EVENT_NAME) routeChangeEvent,
    private router: Router,
    private location: Location
  ) {
    this.routeChange$ = fromEvent(document, routeChangeEvent).pipe(
      map((event: CustomEvent<RouteChangedEvent>) => event.detail.route),
      filter((event) => event.app === this.microApp)
    );
  }

  initRouting(): void {
    this.routeChange$.subscribe((event) => {
      this.router.navigateByUrl(`${event.path}`);
    });

    this.router.navigateByUrl(this.location.path(true));
  }
}
