import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  getServerById(id: string) {
    return this.httpService.get<Server>('servers/' + id)
  }

  add(server: Server) {
    const requestBody = {
      server: server
    }
    return this.httpService.post<Server>('servers', requestBody)
  }

  update(id: string, server: Server) {
    server.id = id;
    const requestBody = {
      id: id,
      server: server
    }
    return this.httpService.put<Server>('servers/' + id, requestBody)
  }

  delete(id: string) {
    return this.httpService.delete<DeleteServerResponse>('servers/' + id)
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

  checkServerExists(ip: string, port: number) {
    return this.httpService.get<CheckServerExist>(`servers/check_server_exists?ip=${ip}&port=${port}`)
  }
}

export interface Server {
  id: string,
  ip: string,
  name: string,
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

export interface DeleteServerResponse {
  deleted: string
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

export interface CheckServerExist {
  exists: boolean;
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
