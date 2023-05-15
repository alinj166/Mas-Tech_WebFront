import { createHostListener } from '@angular/compiler/src/core';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';


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
  constructor() { }

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

  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
  }

  menus = [
    { name: 'Dashboard', route: '/dashboard', icon: 'fal fa-tachometer', active: false },
    { name: 'Chefs Projet ', route: '/listChefProjet', icon: 'fal fa-users', active: false },
    { name: 'Chefs Chantier ', route: '/listChefChantier', icon: 'fal fa-users', active: false },
    { name: 'Les Chantiers', route: '/listChantier', icon: 'fal fa-building', active: false },
  ];

}