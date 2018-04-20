import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: [],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {

  private page_title:string;
  private identity:any;
  private token:any;
  private car:Car;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService :UserService,
    private _carService: CarService
  ) {
    this.page_title = 'Crear Nuevo Coche';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      this.car = new Car(1,'','',0,'',null, null);
    }
  }
  onSubmit(form){
    this._carService.create(this.token, this.car).subscribe(
        response => {
          console.log(response);
          this.car = response.car;
        },
        error => {
          console.log(<any>error);
        }
    );
  }

}
