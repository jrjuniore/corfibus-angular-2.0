import { ApiRouteType } from "../types/apiRoute.type";

export interface IApiContainer {
  list?: ApiRouteType,
  save?: ApiRouteType,
  delete?: Function
}