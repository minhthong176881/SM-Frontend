import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  
  getServers(){
    return this.httpService.get<ServerResponse>('servers');
  }

  export() {
    return this.httpService.get<ExportResponse>('servers/export');
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
