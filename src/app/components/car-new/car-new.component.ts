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
  public status_car: string;
  public message_car:string;
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

          if(response.status== 'success'){
            this.status_car = response.status;
            this.message_car = response.message;
            this.car = response.car;
            form.reset();
          }
          else{
            this.status_car = 'error';
            this.message_car = response.message.title;
          }
        },
        error => {

            console.log(error);

        }
    );
  }

}
