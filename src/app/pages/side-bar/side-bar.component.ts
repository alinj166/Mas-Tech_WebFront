import { createHostListener } from '@angular/compiler/src/core';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() onToggleSidenav:EventEmitter<SideNavToggle>=new EventEmitter();
collapsed=false;
screenWidth=0;
menusAdmin:any
menusChef:any
isAdmin!: boolean;
constructor(private token:TokenStorageService ) { }


@HostListener('window:resize',['$event'])
onResize()
{
  this.screenWidth=window.innerWidth;
  if(this.screenWidth<=768)
  {
    this.collapsed=false;
    this.onToggleSidenav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})

  }
}

  closeSidenav()
  {
    this.collapsed=false;
    this.onToggleSidenav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})

  }

  toggleCollapse()
  {
    this.collapsed=!this.collapsed;
    this.onToggleSidenav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }
  isLogin()
{
  this.isAdmin=this.token.isAdmin()
  return this.token.getToken()!=null;
}

  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
   
      this.menusAdmin = [
        { name: 'Chefs Projet ',   route: '/listChefProjet',   icon: 'fal fa-users',    active: false },
        { name: 'Chefs Chantier ', route: '/listChefChantier', icon: 'fal fa-users',    active: false },
        { name: 'Les Chantiers',   route: '/listChantier',     icon: 'fal fa-building', active: false },
      ];
      this.menusChef = [
        { name: 'Les Chantiers',   route: '/listChantier',     icon: 'fal fa-building', active: false },
      ];
      
    
  }


  
}