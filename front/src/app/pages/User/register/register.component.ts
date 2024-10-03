import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/dto/UserRegister';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserRegister = {
    username: '',
    email: '',
    password: ''
  };
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.user.username && this.user.email && this.user.password) {
      this.userService.register(this.user);
      console.log('Formulaire soumis avec succès :');
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  

}
