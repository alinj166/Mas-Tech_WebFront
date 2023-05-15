import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './pages/profil/profil.component';
import { LoginComponent } from './pages/login/login.component';
import { ListChefProjetComponent } from './pages/admin/gestionChefProjet/list-chefProjet/list-chefProjet.component';
import { ListChefChantierComponent } from './pages/admin/gestionChefChantier/list-chef-chantier/list-chef-chantier.component';
import { ListProjetComponent } from './pages/chefProjet/chantier/list-chantier/list-chantier.component';
import { ListEtageComponent } from './pages/chefProjet/etage/list-etage/list-etage.component';

const routes: Routes = [
  { path: '', redirectTo: 'listChefProjet', pathMatch: 'full' },
  { path: 'listChefProjet', component: ListChefProjetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listChefChantier', component: ListChefChantierComponent },
  { path: 'listChantier', component: ListProjetComponent },
  { path: 'listEtage/:id', component: ListEtageComponent },
  { path: 'profil', component: ProfilComponent },

  { path: '**', component: ListChefProjetComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
