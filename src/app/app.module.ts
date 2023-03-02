import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListChefComponent } from './pages/chef/list-chef/list-chef.component';
import { ListProjetComponent } from './pages/projet/list-projet/list-projet.component';
import { AjouterProjetComponent } from './pages/projet/ajouter-projet/ajouter-projet.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddChefProjetComponent } from './pages/chef/add-chef-projet/add-chef-projet.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProjetComponent } from './pages/projet/edit-projet/edit-projet.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ListChefComponent,
    ListProjetComponent,
    AjouterProjetComponent,
    AddChefProjetComponent,
    EditProjetComponent,
    SideBarComponent,
    NavBarComponent,
    
    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    


  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
