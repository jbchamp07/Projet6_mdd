import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  constructor(public tokenService: TokenService,private userService: UserServiceService) { }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit(): void {
  }

  logOut() {
    this.userService.logout();
    }

}
