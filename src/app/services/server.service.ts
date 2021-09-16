import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _serverResponse = new BehaviorSubject<ServerResponse>({servers: [], total: 0});
  get servers(): ServerResponse {
    return this._serverResponse.value;
  }

  constructor(private httpService: HttpService) { }
  
  getServers(pageIndex: number, pageOffset: number, query: string) {
    const param = 'pageIndex=' + pageIndex + '&pageOffset=' + pageOffset + '&query=' + query;
    return this.httpService.get<ServerResponse>('servers?' + param)
  }

  export() {
    return this.httpService.get<ExportResponse>('servers/export');
  }

  check(id: string) {
    return this.httpService.get<ServerCheckResponse>(`servers/${id}/check`)
  }

  validate(id: string) {
    return this.httpService.get<ServerValidateResponse>(`servers/${id}/validate`)
  }

  log(id: string, start: string, end: string, date: string, month: string) {
    return this.httpService.get<ServerLogResponse>(`servers/${id}/log?start=${start}&end=${end}&date=${date}&month=${month}`)
  }

}

export interface Server {
  id: string,
  ip: string,
  port: number,
  username: string,
  password: string,
  validate: boolean,
  status: boolean,
  description: string,
}

export interface ServerResponse {
  servers: Server[];
  total: number;
}

export interface ExportResponse {
  downloadUrl: string
}

export interface ServerCheckResponse {
  status: boolean;
}

export interface ServerValidateResponse {
  validated: boolean;
}

export interface ServerLogResponse {
  logs: [
    {
      time: string,
      status: string,
    }
  ],
  changeLogs: [
    {
      start: string,
      end: string,
      total: string,
    }
  ]
}
