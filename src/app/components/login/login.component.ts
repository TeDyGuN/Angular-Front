import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({

  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public token: any;
  private message;
  public identity: any;
  private status: string;
  constructor(

    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Identificate';
    this.user = new User(1, 'USER', '','','','');
  }

  ngOnInit() {
    console.log("LoginComponent Cargado");
    this.logout();
  }
  onSubmit(form){
    this._userService.signUp(this.user).subscribe(

      response =>{
        console.log(response);
        this.status = response.status;
        if(response.status == 'error'){
          this.status = 'error';
          this.message = response.message;
        }
        else
        {




          //token
          this.token = response;
          localStorage.setItem('token', this.token);
          //Usuario Identificado
          this._userService.signUp(this.user, true).subscribe(
            response =>{

              console.log(response);
              this.identity = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this._router.navigate(['home']);
            },
            error => {
              console.log(<any>error);
            }
          );
        }


      },
      error => {
        console.log(<any>error);
      }
    );
  }
  logout(){
    this._route.params.subscribe(params=> {
      let logout = +params['sure'];
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        this._router.navigate(['login']);
      }
    })
  }
}
