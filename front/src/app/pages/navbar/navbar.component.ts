import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn!: boolean ;
  constructor(private tokenService: TokenService,private userService: UserServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.Islogged();
  }

  logOut() {
    this.userService.logout();
    this.isLoggedIn = false;
    }

}
