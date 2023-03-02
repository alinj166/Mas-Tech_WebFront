import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChefComponent } from './pages/chef/list-chef/list-chef.component';
import { AjouterProjetComponent } from './pages/projet/ajouter-projet/ajouter-projet.component';
import { EditProjetComponent } from './pages/projet/edit-projet/edit-projet.component';
import { ListProjetComponent } from './pages/projet/list-projet/list-projet.component';


const routes: Routes = [
  { path: 'listChef', component: ListChefComponent },
  { path: '', redirectTo: 'listChef', pathMatch: 'full' },
  { path: 'listProjet', component: ListProjetComponent },
  { path: 'addProjet', component: AjouterProjetComponent },
  { path: 'updateProjet/:id', component: EditProjetComponent },
  { path: '**', component: ListChefComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
