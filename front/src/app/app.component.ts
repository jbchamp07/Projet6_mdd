import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Appeler la méthode souhaitée lors de la fermeture de l'application
    localStorage.clear();
  }

}
