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
  }

}
