import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Car } from '../models/car';

@Injectable()
export class CarService{

  private url: string;

  constructor(
    public _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  pruebas(){
    return 'Hola Mundo';
  }
  create(token, car: Car): Observable<any>{
    let json = JSON.stringify(car);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.post(this.url + 'cars', params, {headers: headers});
  }
  getCars(token): Observable<any>
  {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.get(this.url + 'cars', {headers: headers});

  }
  getCar(id, token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.get(this.url + 'cars/'+id, {headers: headers});
  }
  update(car, token): Observable<any>{
    let id = car.id;
    let json = JSON.stringify(car);
    let params = 'json='+json;
    console.log(token);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.put(this.url + 'cars/'+id, {headers: headers});
  }
}
