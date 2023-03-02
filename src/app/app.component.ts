import { Component } from '@angular/core';
import { ListChefComponent } from './pages/chef/list-chef/list-chef.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ListChefComponent]
})
export class AppComponent {
  title = 'webFront';
}
