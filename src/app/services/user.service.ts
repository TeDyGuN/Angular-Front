import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{

  private url: string;
  private identity: any;
  private token: any;
  constructor(
    public _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  pruebas(){
    return 'Hola Mundo';
  }
  register(user): Observable<any>{
    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'register', params, {headers: headers});
  }
  signUp(user, gettoken = null): Observable<any>{
    if(gettoken != null)
    {
      user.getToken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'login', params, {headers: headers});
  }
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined"){
      this.identity = identity
    }
    else{
      this.identity = null;
    }
    return this.identity;
  }
  getToken(){
    let token = localStorage.getItem('token');
    if(token != "undefined"){
      this.token = token
    }
    else{
      this.token = null;
    }
    return this.token;
  }
}
