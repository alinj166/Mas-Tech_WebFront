 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chantier } from '../models/chantier';
import { Etage } from '../models/etage';
import { Plan } from '../models/plan';
import { TokenStorageService } from './token-storage.service';
import { Utilisateur } from '../models/utilisateur';


const URL=environment.apiUrl;

 @Injectable({
   providedIn: 'root'
 })
 
export class ApiService {
  private headers: HttpHeaders;
  private requestOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    const token = this.tokenService.getToken(); // Replace with your actual token

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    this.requestOptions = { headers: this.headers };
  }  

  // Get All getAllChantier
 public getAllChantier():Observable <Chantier[]> {
  return this.http.get<Chantier[]>(URL+'/chantiers',this.requestOptions)
  
}

// Get  getChantier
public getChantier(id:any):Observable <Chantier> {
  return this.http.get<Chantier>(URL+'/chantiers/'+id,this.requestOptions)
  
}

// Get  chantiers by Id
public getChantierById(id:string):Observable <Chantier> {
  return this.http.get<Chantier>(URL+'/chantiers/'+id,this.requestOptions)
  
}
// Delete chantier 
public deleteChantier(id:number) {
  return this.http.delete<Chantier>(URL+'/chantiers/'+id,this.requestOptions);

}

// put Chantier
public putChantier(service:Chantier,id:string):Observable <Chantier> {
  return this.http.put<Chantier>(URL+'/chantiers/'+id,service,this.requestOptions);
}
// cloturer Chantier
public cloturerChantier(id:string):Observable <Chantier> {
  return this.http.put<Chantier>(URL+'/chantiers/'+id+"/cloturer",'',this.requestOptions);
}

// Get ALL chefProjet
public getAllChefProjet():Observable <Utilisateur[]> {
  return this.http.get<Utilisateur[]>(URL+'/chefProjets',this.requestOptions)
}
// Get ALL chefChantier
public getAllChefChantier():Observable <Utilisateur[]> {
  return this.http.get<Utilisateur[]>(URL+'/chefChantiers',this.requestOptions)
}

// Get chefProjet By id 
public getChefProjetById(id:any):Observable <Utilisateur> {
  return this.http.get<Utilisateur>(URL+'/chefProjets/'+id,this.requestOptions)
}
// Add ChefProjet
public addChefProjet(service:Utilisateur):Observable <Utilisateur> {
  return this.http.post<Utilisateur>(URL+'/chefProjets/register',service,this.requestOptions) 
   
}
// Add ChefProjet
public addChefChantier(service:any):Observable <Utilisateur> {
  return this.http.post<Utilisateur>(URL+'/chefChantiers/register',service,this.requestOptions) 
   
}

// put Account
public  putAccount(service:any,id:any):Observable <Utilisateur> {
  return this.http.put<Utilisateur>(URL+'/auth/'+id,service,this.requestOptions);
}
// put ChefProjet
public  putChefProjet(service:any,id:any):Observable <Utilisateur> {
  return this.http.put<Utilisateur>(URL+'/chefProjets/'+id,service,this.requestOptions);
}
// put ChefChantier
public putChefChantier(service:any,id:any):Observable <Utilisateur> {
  return this.http.put<Utilisateur>(URL+'/chefChantiers/'+id,service,this.requestOptions);
}

// Delete chefProjet
 public deleteChefProjet(id:number){
  return this.http.delete<Utilisateur>(URL+'/chefProjets/'+id,this.requestOptions );

}
// Delete chefChantier
public deleteChefChantier(id: number | undefined) {
  return this.http.delete<Utilisateur>(URL+'/chefChantiers/'+id,this.requestOptions );

}
// Get ALL Chantiers by chef
public getAllChantierByChef(id:any):Observable <Chantier[]> {
  return this.http.get<Chantier[]>(URL+'/chefProjets/'+id+'/chantiers',this.requestOptions);
}
// Get ALL Chantiers by chef
public getAllEtageByChantier(id:any):Observable <Etage[]> {
  return this.http.get<Etage[]>(URL+'/chantiers/'+id+'/etages',this.requestOptions);
}

// Get all plan 
public getAllPlan():Observable <Plan[]> {
  return this.http.get<Plan[]>(URL+'/plans',this.requestOptions);

}

// Get plan by etage
public getPlanByEtage(id:any):Observable <Plan> {
  return this.http.get<Plan>(URL+'/etages/'+id+'/plan',this.requestOptions);

}
// Post plan 
public postPlan(service:any):Observable <any> {
  return this.http.post<any>(URL+'/plans',service,this.requestOptions);
}
// Post plan 
public removePlan(id:any){
  return this.http.delete(URL+'/plans/'+id,this.requestOptions);
}

//affecte plan 
public affecterPlan(idEtage:any,idPlan:any):Observable <Plan> {
  return this.http.put<Plan>(URL+'/etages/'+idEtage+'/plans/'+idPlan,'',this.requestOptions);
}

//affecte ChefProjet 
public affecterChefProjet(idChantier:any,idChefProjet:any):Observable <Utilisateur> {
  return this.http.put<Utilisateur>(URL+'/chefProjets/'+idChefProjet+'/chantiers/'+idChantier,'',this.requestOptions);
}

//login  
public login(service:any):Observable <Utilisateur> {
  return this.http.post<Utilisateur>(URL+'/auth/login',service,this.requestOptions);
}

}




