import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  styleUrls: [],
  providers: [UserService, CarService]
})
export class CarEditComponent implements OnInit {
  private page_title;
  private car: Car;
  private token:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {

        this.token = this._userService.getToken();
        this.page_title = 'Editar ';
  }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this.getCar(id);
    });
    this.car = new Car(1,'','',0,'',null, null);
  }
  getCar(id){
      this._carService.getCar(id, this.token).subscribe(
        response=>{
          if(response.status == 'success'){
            this.car = response.car;
          }
          else{
            this._router.navigate(['home']);
          }
        },
        error =>{
          console.log(error);
        }
      );
  }
  onSubmit(form){
    this._carService.update(this.car, this.token).subscribe(
      response => {
        console.log(response);
      },
      error => {

          console.log(error);
      }
    )
  }

}
