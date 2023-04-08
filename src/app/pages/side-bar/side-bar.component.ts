import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  menus = [
    { name: 'Dashboard', route: '/dashboard', icon: 'fa fa-tachometer', active: false },
    { name: 'Chefs Projet ', route: '/listChefProjet', icon: 'fa fa-users', active: false },
    { name: 'Chefs Chantier ', route: '/listChefChantier', icon: 'fa fa-users', active: false },
    { name: 'Les Chantiers', route: '/listChantier', icon: 'fa fa-list', active: false },
    { name: 'Orders', route: '/orders', icon: 'fas-shopping-bag', active: false }
  ];

  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}