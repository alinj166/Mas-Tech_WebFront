import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListProjetComponent } from './pages/chantier/list-chantier/list-chantier.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ListEtageComponent } from './pages/etage/list-etage/list-etage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListChefProjetComponent } from './pages/gestionChefProjet/list-chefProjet/list-chefProjet.component';
import { ListChefChantierComponent } from './pages/gestionChefChantier/list-chef-chantier/list-chef-chantier.component';
import { ModalBoxChefProjetComponent } from './pages/gestionChefProjet/modal-box-chef-projet/modal-box-chef-projet.component';
import { ModalBoxChefChantierComponent } from './pages/gestionChefChantier/modal-box-chef-chantier/modal-box-chef-chantier.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalBoxComponent } from './pages/chantier/modal-box/modal-box.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    ListChefProjetComponent,
    ListProjetComponent,
    ModalBoxChefProjetComponent,
    ModalBoxChefChantierComponent,
    SideBarComponent,
    NavBarComponent,
    ListEtageComponent,
    ListChefChantierComponent,
    ModalBoxComponent,
  ],

  imports: [
    NgbModalModule,
    NgxPaginationModule,
    ReactiveFormsModule,

    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),


    


  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
