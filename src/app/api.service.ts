import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseURL = "https://cms.bettorlogic.com/api/BetBuilder/";

  // makePostRequest(requestName: String, rawBody: any) {
  //   return this.http.post(this.baseURL + requestName + '?sports=1', rawBody)
  // }
  makeGetRequest(requestName: String, params:string='') {
    return this.http.get(this.baseURL + requestName + '?sports=1'+params)
  }

}
