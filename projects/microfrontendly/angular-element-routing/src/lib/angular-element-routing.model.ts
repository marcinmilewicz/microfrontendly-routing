export type RouteChangedEvent<RouteData = never> = {
  route: {
    path: string;
    app: string;
    data?: RouteData;
  };
};
