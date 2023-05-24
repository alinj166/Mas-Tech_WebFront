import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProfilComponent } from './pages/profil/profil.component';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { ListChefProjetComponent } from './pages/admin/gestionChefProjet/list-chefProjet/list-chefProjet.component';
import { ModalBoxChefProjetComponent } from './pages/admin/gestionChefProjet/modal-box-chef-projet/modal-box-chef-projet.component';
import { ModalBoxChefChantierComponent } from './pages/admin/gestionChefChantier/modal-box-chef-chantier/modal-box-chef-chantier.component';
import { ListEtageComponent } from './pages/etage/list-etage/list-etage.component';
import { ListChefChantierComponent } from './pages/admin/gestionChefChantier/list-chef-chantier/list-chef-chantier.component';
import { ModalBoxComponent } from './pages/chantier/modal-box/modal-box.component';
import { ErrorComponent } from './pages/error/error.component';
import { ListChantierComponent } from './pages/chantier/list-chantier/list-chantier.component';


@NgModule({
  declarations: [
    AppComponent,
    ListChefProjetComponent,
    ModalBoxChefProjetComponent,
    ModalBoxChefChantierComponent,
    SideBarComponent,
    NavBarComponent,
    ListEtageComponent,
    ListChefChantierComponent,
    ModalBoxComponent,
    ProfilComponent,
    BodyComponent,
    LoginComponent,
    ErrorComponent,
    ListChantierComponent,
  ],
 
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModalModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

   
  ],
  providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
