import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChefProjetAuthGuard implements CanActivate {
  constructor(private token:TokenStorageService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn =this.token.getUser() // check if user is logged in or has valid session
       if (isLoggedIn.role=="chefProjet") {
        return true; // User is authenticated, allow access to the route
      } else {
        return false;
      }
      }
  
    
  }
