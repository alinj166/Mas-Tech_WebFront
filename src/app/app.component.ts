import { Component } from '@angular/core';
import { ListChefProjetComponent } from './pages/gestionChefProjet/list-chefProjet/list-chefProjet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ListChefProjetComponent]
})
export class AppComponent {
  title = 'webFront';
}
