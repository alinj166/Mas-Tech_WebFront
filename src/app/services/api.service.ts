 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chantier } from '../models/chantier';
import { chefProjet } from '../models/ChefProjet';
import { Etage } from '../models/etage';
import { Plan } from '../models/plan';
import { ChefChantier } from '../models/chef-chantier';

const URL=environment.apiUrl;

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});





 const requestOptions = { headers: headers };
 @Injectable({
   providedIn: 'root'
 })
export class ApiService {

  constructor(   private http:HttpClient ) { }



// Get All getAllChantier
 public getAllChantier():Observable <Chantier[]> {
  return this.http.get<Chantier[]>(URL+'/chantiers')
  
}


// Get  chantiers by Id
public getChantierById(id:string):Observable <Chantier> {
  return this.http.get<Chantier>(URL+'/chantiers/'+id)
  
}
// Delete chantier 
public deleteChantier(id:number) {
  return this.http.delete<Chantier>(URL+'/chantiers/'+id);

}

// put Chantier
public putChantier(service:Chantier,id:string):Observable <Chantier> {
  return this.http.put<Chantier>(URL+'/chantiers/'+id,service,requestOptions);
}
// cloturer Chantier
public cloturerChantier(id:string):Observable <Chantier> {
  return this.http.put<Chantier>(URL+'/chantiers/'+id+"/cloturer",requestOptions);
}

// Get ALL chefProjet
public getAllChefProjet():Observable <chefProjet[]> {
  return this.http.get<chefProjet[]>(URL+'/chefProjets')
}
// Get ALL chefChantier
public getAllChefChantier():Observable <ChefChantier[]> {
  return this.http.get<ChefChantier[]>(URL+'/chefChantiers')
}

// Get chefProjet By id 
public getChefProjetById(id:any):Observable <chefProjet> {
  return this.http.get<chefProjet>(URL+'/chefProjets/'+id)
}
// Add ChefProjet
public addChefProjet(service:chefProjet):Observable <chefProjet> {
  return this.http.post<chefProjet>(URL+'/chefProjets',service,requestOptions) 
   
}
// Add ChefProjet
public addChefChantier(service:ChefChantier):Observable <ChefChantier> {
  return this.http.post<ChefChantier>(URL+'/chefChantiers',service,requestOptions) 
   
}

// put ChefProjet
public putChefProjet(service:chefProjet,id:number):Observable <chefProjet> {
  return this.http.put<chefProjet>(URL+'/chefProjets/'+id,service,requestOptions);
}
// put ChefChantier
public putChefChantier(service:ChefChantier,id:number):Observable <ChefChantier> {
  return this.http.put<ChefChantier>(URL+'/chefChantiers/'+id,service,requestOptions);
}

// Delete chefProjet
 public deleteChefProjet(id:number):Observable <chefProjet> {
  return this.http.delete<chefProjet>(URL+'/chefProjets/'+id );

}
// Delete chefChantier
public deleteChefChantier(id:number):Observable <ChefChantier> {
  return this.http.delete<ChefChantier>(URL+'/chefChantiers/'+id );

}
// Get ALL Chantiers by chef
public getAllChantierByChef(id:any):Observable <Chantier[]> {
  return this.http.get<Chantier[]>(URL+'/chefProjets/'+id+'/chantiers');
}
// Get ALL Chantiers by chef
public getAllEtageByChantier(id:any):Observable <Etage[]> {
  return this.http.get<Etage[]>(URL+'/chantiers/'+id+'/etages');
}
// Get plan by etage
public getPlanByEtage(id:any):Observable <Plan> {
  return this.http.get<Plan>(URL+'/etages/'+id+'/plan');

}
// Post plan 
public postPlan(service:any):Observable <any> {
  return this.http.post<any>(URL+'/plans',service);

}
}




