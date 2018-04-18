import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  private title;
  private message;
  private user: User;
  private status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registrate';
    this.user = new User(1, 'USER', '','','','');
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response =>{
        this.status = response.status;
        if(response.status == 'success'){
          this.status = response.status;
          this.user = new User(1, 'USER', '','','','');
          form.reset();
        }
        else
        {
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
