import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MICRO_APP_NAME, AngularElementRoutingService, ROUTE_CHANGE_EVENT_NAME } from './angular-element-routing.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AngularElementRouteModule {
  static forRoot(microElementApplication: string, routeChangeEventName: string): ModuleWithProviders<AngularElementRouteModule> {
    return {
      ngModule: AngularElementRouteModule,
      providers: [
        AngularElementRoutingService,
        { provide: MICRO_APP_NAME, useValue: microElementApplication },
        { provide: ROUTE_CHANGE_EVENT_NAME, useValue: routeChangeEventName },
      ],
    };
  }

  constructor(private microRoutingService: AngularElementRoutingService) {
    microRoutingService.initRouting();
  }
}
