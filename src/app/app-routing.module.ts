import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjetComponent } from './pages/chantier/list-chantier/list-chantier.component';
import { ListEtageComponent } from './pages/list-etage/list-etage.component';
import { ListChefProjetComponent } from './pages/gestionChefProjet/list-chefProjet/list-chefProjet.component';
import { ListChefChantierComponent } from './pages/gestionChefChantier/list-chef-chantier/list-chef-chantier.component';


const routes: Routes = [
  { path: '', redirectTo: 'listChefProjet', pathMatch: 'full' },
  { path: 'listChefProjet', component: ListChefProjetComponent },
  { path: 'listChefChantier', component: ListChefChantierComponent },
  { path: 'listChantier', component: ListProjetComponent },
  { path: 'listEtage', component: ListEtageComponent },
  { path: '**', component: ListChefProjetComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
