import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user!:Utilisateur|null

  constructor(private tokenService:TokenStorageService,private router: Router)  { }
logout()
{
  this.tokenService.signOut()
  this.router.navigate(['./login']);
}

  ngOnInit(): void {

  }
  isLogin()
  {    this.user=this.tokenService.getUser()
  
      return this.tokenService.getToken()!=null;

  }
}
