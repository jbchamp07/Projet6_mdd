import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  logginWork: boolean = false;
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username && this.password) {
      this.userService.login(this.username,this.password);
      this.logginWork = true;
    } else {
      alert('Le formulaire est invalide');
    }
  }

}
