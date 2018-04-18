import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  private title;
  private user: User;

  constructor() {
    this.title = 'Registrate';
    this.user = new User(1, 'USER', '','','','');
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.user);
  }
}
