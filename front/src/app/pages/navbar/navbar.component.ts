import { Component, HostListener, OnInit } from '@angular/core';
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
  constructor(public tokenService: TokenService) { }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit(): void {
  }
// Écouteur d'événements pour fermer le menu lorsqu'on clique en dehors de la navbar
@HostListener('document:click', ['$event'])
closeMenuOnClickOutside(event: MouseEvent) {
  const clickedElement = event.target as HTMLElement;
  const menu = document.querySelector('.nav-links');
  const menuButton = document.querySelector('.menu-toggle');

  // Fermer le menu si le clic est en dehors du menu ou du bouton hamburger
  if (menu && menuButton && !menu.contains(clickedElement) && !menuButton.contains(clickedElement)) {
    this.menuOpen = false;
  }
}

}
