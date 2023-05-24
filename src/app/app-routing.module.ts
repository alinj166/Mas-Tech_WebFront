import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './pages/profil/profil.component';
import { LoginComponent } from './pages/login/login.component';
import { ListChefProjetComponent } from './pages/admin/gestionChefProjet/list-chefProjet/list-chefProjet.component';
import { ListChefChantierComponent } from './pages/admin/gestionChefChantier/list-chef-chantier/list-chef-chantier.component';
import { ListChantierComponent } from './pages/chantier/list-chantier/list-chantier.component';
import { ListEtageComponent } from './pages/etage/list-etage/list-etage.component';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { ErrorComponent } from './pages/error/error.component';
import { CombinedAuthGuardGuard } from './guard/combined-auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'listChefProjet', component: ListChefProjetComponent,canActivate: [AdminAuthGuard] },
  { path: 'listChefChantier', component: ListChefChantierComponent ,canActivate: [AdminAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'listChantier', component: ListChantierComponent,canActivate: [CombinedAuthGuardGuard]  },
  { path: 'listEtage/:id', component: ListEtageComponent ,canActivate: [CombinedAuthGuardGuard] },
  { path: 'profil', component: ProfilComponent,canActivate: [CombinedAuthGuardGuard]  },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
