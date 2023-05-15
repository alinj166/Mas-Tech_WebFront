import { Component, HostListener } from '@angular/core';
import { ListChefProjetComponent } from './pages/admin/gestionChefProjet/list-chefProjet/list-chefProjet.component';
import { TokenStorageService } from './services/token-storage.service';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ListChefProjetComponent]
})
export class AppComponent {
  title = 'webFront';
isSideNavCollapsed=false;
showSidebarAndNavbar: boolean;

screenWidth=0;
  onToggleSidenav(data:SideNavToggle){
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;

  }
  constructor(private tokenService:TokenStorageService) {
      this.showSidebarAndNavbar =this.tokenService.getToken()!=null;
    this.updateSidebarAndNavbarVisibility();

  }

  @HostListener('window:sessionStorage', ['$event'])
  onSessionStorageChange(event: StorageEvent) {
    this.updateSidebarAndNavbarVisibility();
  }
  private updateSidebarAndNavbarVisibility() {
        // Check if localStorage has items
    this.showSidebarAndNavbar =this.tokenService.getToken()!=null;
  }
}
