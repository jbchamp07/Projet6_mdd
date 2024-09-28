import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.username && this.email && this.password) {
      // Action à effectuer lors de la soumission du formulaire
      console.log('Formulaire soumis avec succès :');
      console.log('Nom d\'utilisateur : ', this.username);
      console.log('Email : ', this.email);
      console.log('Mot de passe : ', this.password);
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
