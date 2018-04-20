import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, CarService]
})
export class HomeComponent implements OnInit {
  private title;
  private cars: Array<Car>;
  private token:any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {

    this.token = this._userService.getToken();
    this.title = 'Inicio';
  }
  ngOnInit() {
    this._carService.getCars(this.token).subscribe(
      response=>{
        if(response.status = 'success'){
          this.cars = response.cars;
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

}
